<!--
* @description: 用户信息展示页
* @fileName: Info.vue
* @author: SIyuyuko
* @date: 2024-03_01
* @others: 已验证玩家才能访问该页面
!-->

<template>
    <!-- 个人横幅 -->
    <div class="banner" v-if="user">
        <!-- 封面 -->
        <img class="cover" :src="user.cover_url" />
        <!-- 信息栏 -->
        <div class="statistics-bar">
            <!-- 头像 -->
            <img class="avatar" :src="user.avatar_url" />
            <!-- 信息 -->
            <div class="statistics">
                <p class="name-bar">{{ user.username }}
                    <!-- 曾用名 -->
                    <a-tooltip class="old-usernames-bar" placement="top">
                        <IdcardFilled style="width:18px" v-show="user.previous_usernames[0]" />
                        <template #title>
                            <span style="font-size: 10px;">{{ t('userInfo.previousUsernames') }}</span><br>
                            <span>{{ previousUsernames }}</span>
                        </template>
                    </a-tooltip>
                    <!-- 官网主页跳转 -->
                    <a :href="`https://osu.ppy.sh/users/` + user.uid" target="_blank" title="官网主页">
                        <ShareAltOutlined style="width:18px;color: #ffffff;" />
                    </a>
                </p>
                <p class="country-bar">
                    <span class="flag" :style="{ 'background-image': `url(${flagUrl})` }"></span>
                    <span class="country">{{ user.country.name }}</span>
                </p>
                <div class="short-info">
                    <a-statistic :title="t('userInfo.globalRank')" :value="`#` + user.global_rank" />
                    <a-statistic :title="t('userInfo.countryRank')" :value="`#` + user.country_rank" />
                    <a-statistic :title="t('userInfo.medals')" :value="user.user_achievements.length" />
                    <a-statistic title="pp" :value="user.pp" />
                </div>
                <div class="level-bar">
                    <span>Lv.{{ user.level_current }}</span>
                    <a-progress :percent="user.level_progress" size="small" strokeColor="rgb(255,205,34)"></a-progress>
                </div>
            </div>
            <!-- 游戏模式 -->
            <div class="mode-list">
                <img class="mode" v-for="i in modeList" :key="i" :src="i.src"
                    :class="aimMode === i.name ? 'active' : 'inactive'" :alt="i.name" @click="changeMode(i.name)" />
            </div>
        </div>
    </div>
    <!-- 详情面板 -->
    <div class="panel" v-if="user">
        <a-card :title="t('userInfo.playerInfo')" :bordered="false">
            <!-- 进榜总分 -->
            <a-card-grid>
                <img src="/img/component/object-score-max.png">
                <a-statistic :title="t('userInfo.rankedScore')" :value="user.statistics.ranked_score">
                </a-statistic></a-card-grid>
            <!-- 总分 -->
            <a-card-grid>
                <img src="/img/component/object-score-aimpp.png">
                <a-statistic :title="t('userInfo.totalScore')" :value="user.statistics.total_score" /></a-card-grid>
            <!-- 游戏次数 -->
            <a-card-grid>
                <img src="/img/component/object-score-combo.png">
                <a-statistic :title="t('userInfo.playCount')" :value="user.statistics.play_count" /></a-card-grid>
            <!-- 游玩时间 -->
            <a-card-grid>
                <img src="/img/component/object-score-length.png">
                <a-statistic :title="t('userInfo.playTime')"
                    :value="playTime.day + `d ` + playTime.hour + `h ` + playTime.minute + `m`" /></a-card-grid>
            <!-- 准确率 -->
            <a-card-grid>
                <img src="/img/component/object-score-accuracy.png">
                <a-statistic :title="t('userInfo.accuracy')" :value="user.accuracy" :precision="2"
                    suffix="%" /></a-card-grid>
            <!-- 回放被观看次数 -->
            <a-card-grid>
                <img src="/img/component/object-score-circlesize.png">
                <a-statistic :title="t('userInfo.replaysBeingWatched')"
                    :value="user.statistics.replays_watched_by_others" /></a-card-grid>
            <!-- 粉丝 -->
            <a-card-grid>
                <img src="/img/component/object-score-healthpoint.png">
                <a-statistic :title="t('userInfo.followers')" :value="user.follower_count" /></a-card-grid>
            <!-- 总命中次数 -->
            <a-card-grid>
                <img src="/img/component/object-score-overalldifficulty.png">
                <a-statistic :title="t('userInfo.totalHits')" :value="user.statistics.total_hits" /></a-card-grid>
        </a-card>
    </div>
</template>

<script setup name="Info">
import { ref, onMounted, onBeforeMount, nextTick, watch } from 'vue';
import { IdcardFilled, ShareAltOutlined } from '@ant-design/icons-vue';
import { getUserInfo } from '../api/data_api';
import { resolveTime } from '../utils/util';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
const I18n = useI18n();
const { locale, t } = useI18n();
const router = useRouter();
const route = useRoute();
let user = ref();// 玩家
let playTime = ref();// 游玩时间
let previousUsernames = ref("");// 曾用名
let flagUrl = ref("");// 旗帜url
let aimMode = ref("");// 指定模式
// 游戏模式列表
let modeList = ref([
    { name: "osu", src: "/img/component/mode-osu-med.svg" },
    { name: "taiko", src: "/img/component/mode-taiko-med.svg" },
    { name: "fruits", src: "/img/component/mode-fruits-med.svg" },
    { name: "mania", src: "/img/component/mode-mania-med.svg" },
]);
// 玩家数据初始化
function init() {
    // 游玩时间格式化
    playTime.value = resolveTime(user.value.play_time);
    // 曾用名字符串处理
    for (let i of user.value.previous_usernames) {
        previousUsernames.value = "";// 初始化清空
        if (i !== user.value.previous_usernames[user.value.previous_usernames.length - 1]) {
            previousUsernames.value += i + ", ";
        } else {
            previousUsernames.value += i;
        }
    };
    // 地区旗帜url获取
    let bitFlag = 0x1f1e6;
    let bitA = 65;
    let countryChar1 = (bitFlag + user.value.country_code.charCodeAt(0) - bitA).toString(16);
    let countryChar2 = (bitFlag + user.value.country_code.charCodeAt(1) - bitA).toString(16);
    flagUrl.value = `https://osu.ppy.sh/assets/images/flags/${countryChar1}-${countryChar2}.svg`;
};
// 切换游戏模式
let modeName = "";// 选中模式
function changeMode(mode) {
    modeName = mode;
    let obj = {
        uid: user.value.uid,
        mode: mode,
    };
    getUserInfo(obj).then((res) => {
        if (res.status && res.data) {
            user.value = res.data;
            init();
        };
    });
};
let isInit = false;
onBeforeMount(() => {
    // debugger
    if (!isInit) {
        let uid = parseInt(route.params.uid);
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (uid === userInfo.data.uid) {
            user.value = userInfo.data;
            init();
        } else {
            getUserInfo({ uid: uid }).then((res) => {
                nextTick(() => {
                    res = res.data;
                    user.value = res;
                    console.log(user.value);
                    init();
                });
            });
        };
        isInit = true;// 页面挂载前，数据初始化一次后结束该循环
    };
});
onMounted(() => {

});
// 监听路由重载玩家信息页
watch((route), (val) => {
    if (val.name === "info") {
        location.reload();
    }
});
// 监听游戏模式切换
watch((user), (val) => {
    // 若无排名历史说明该玩家几乎不玩这个模式导致没有排名
    // 需要将指定模式赋值为选中模式
    aimMode.value = val.rank_history ? val.rank_history.mode : modeName;
});


</script>

<style lang="scss" scoped>
.banner {
    height: 300px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;

    .cover {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        filter: brightness(0.5);
    }

    .statistics-bar {
        z-index: 2;
        position: absolute;
        display: flex;
        padding: 50px 120px 20px 120px;
        column-gap: 100px;
        width: -webkit-fill-available;

        .avatar {
            border-radius: 20px;
            width: 120px;
            margin: auto 0;
        }

        .statistics {
            display: flex;
            flex-direction: column;
            row-gap: 6px;
            font-size: 24px;
            width: -webkit-fill-available;
            margin-top: auto;

            p.name-bar {
                font-size: 30px;
                display: flex;
                column-gap: 10px;
            }

            .country-bar {
                display: flex;
                column-gap: 5px;

                .flag {
                    display: inline-flex;
                    width: 1em;
                    height: 1em;
                }

                .country {
                    font-size: 18px;
                    vertical-align: text-top;
                }
            }

            .short-info {
                display: flex;
                column-gap: 50px;
            }

            .level-bar {
                display: flex;
                column-gap: 50px;
            }
        }

        .mode-list {
            text-align: center;
            display: flex;
            flex-direction: column;
            row-gap: 10px;

            img {
                height: 40px;
                width: 40px;
            }

            .active {
                opacity: 1;
            }

            .inactive {
                opacity: 0.5;
            }

            .mode:hover {
                opacity: 0.7;
            }

            .mode:active {
                opacity: 0.9;
            }
        }
    }
}

.panel {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: relative;
    z-index: 0;
    margin-top: -20px;
    background-color: #2A2226;
    padding: 20px;
}

:deep(.ant-statistic) {
    .ant-statistic-title {
        color: rgba(255, 255, 255, 0.8);
    }

    .ant-statistic-content {
        color: #ffffff;
        font-size: 22px;
    }
}

:deep(.ant-progress) {
    margin: auto;

    .ant-progress-text {
        color: rgba(255, 255, 255, 0.8);
    }

    .ant-progress-inner {
        background-color: #2A2226;
    }
}

:deep(.ant-card) {
    color: #ffffff;
    background-color: #1c1719;

    .ant-card-head {
        border-bottom: #1c1719;
        color: #ffffff;
    }

    .ant-card-head-title {
        font-size: 20px;
    }

    .ant-card-grid {
        width: 25%;
        text-align: center;
        box-shadow: 1px 0 0 0 rgba(42, 34, 38, 0.1), 0 1px 0 0 rgba(42, 34, 38, 0.1), 1px 1px 0 0 rgba(42, 34, 38, 0.1), 1px 0 0 0 rgba(42, 34, 38, 0.1) inset, 0 1px 0 0 rgba(42, 34, 38, 0.1) inset;
        display: flex;
        column-gap: 20px;
        text-align: start;

        img {
            height: 40px;
            margin: auto 0;
        }
    }
}
</style>