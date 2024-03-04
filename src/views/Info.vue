<!--
* @description: 用户信息展示页
* @fileName: Info.vue
* @author: SIyuyuko
* @date: 2024-03_01
* @others: 已验证玩家才能访问该页面
!-->

<template>
    <!-- 个人横幅 -->
    <div class="banner">
        <img class="cover" :src="user.cover_url" />
        <div class="statistics-bar">
            <img class="avatar" :src="user.avatar_url" />
            <div class="statistics">
                <p class="name">{{ user.username }}
                    <a-tooltip class="old-usernames-bar" placement="right">
                        <IdcardFilled style="width:18px" v-show="user.previous_usernames" />
                        <template #title>
                            <span style="font-size: 10px;">{{ t('userInfo.previousUsernames') }}</span><br>
                            <span>{{ previousUsernames }}</span>
                        </template>
                    </a-tooltip>
                </p>
                <p class="country-bar">
                    <span class="flag" :style="{ 'background-image': `url(${flagUrl})` }"></span>
                    <span class="country">{{ user.location ?? user.country.name }}</span>
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
        </div>
    </div>
    <!-- 详情面板 -->
    <div class="panel">
        <a-card :title="t('userInfo.playerInfo')" :bordered="false">
            <a-card-grid><a-statistic :title="t('userInfo.rankedScore')"
                    :value="user.statistics.ranked_score" /></a-card-grid>
            <a-card-grid><a-statistic :title="t('userInfo.totalScore')"
                    :value="user.statistics.total_score" /></a-card-grid>
            <a-card-grid><a-statistic :title="t('userInfo.playCount')"
                    :value="user.statistics.play_count" /></a-card-grid>
            <a-card-grid><a-statistic :title="t('userInfo.playTime')"
                    :value="playTime.day + `d ` + playTime.hour + `h ` + playTime.minute + `m`" /></a-card-grid>
            <a-card-grid><a-statistic :title="t('userInfo.accuracy')" :value="user.accuracy" :precision="2"
                    suffix="%" /></a-card-grid>
            <a-card-grid><a-statistic :title="t('userInfo.replaysBeingWatched')"
                    :value="user.statistics.replays_watched_by_others" /></a-card-grid>
            <a-card-grid><a-statistic :title="t('userInfo.followers')" :value="user.follower_count" /></a-card-grid>
            <a-card-grid><a-statistic :title="t('userInfo.totalHits')"
                    :value="user.statistics.total_hits" /></a-card-grid>
        </a-card>
    </div>
</template>

<script setup name="Info">
import { ref, onMounted, onBeforeMount } from 'vue';
import { IdcardFilled } from '@ant-design/icons-vue'
import { resolveTime } from '../utils/util';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const I18n = useI18n();
const { locale, t } = useI18n();
const router = useRouter();
let user = ref();
let playTime = ref();
let previousUsernames = ref("");
let flagUrl = ref("");
onBeforeMount(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    user.value = userInfo.data;
    console.log(user.value);
    // 
    playTime.value = resolveTime(user.value.play_time);
    // 
    for (let i of user.value.previous_usernames) {
        if (i !== user.value.previous_usernames[user.value.previous_usernames.length - 1]) {
            previousUsernames.value += i + ", ";
        } else {
            previousUsernames.value += i;
        }
    };
    // 
    let bitFlag = 0x1f1e6;
    let bitA = 65;
    let countryChar1 = (bitFlag + user.value.country_code.charCodeAt(0) - bitA).toString(16);
    let countryChar2 = (bitFlag + user.value.country_code.charCodeAt(1) - bitA).toString(16);
    flagUrl.value = `https://osu.ppy.sh/assets/images/flags/${countryChar1}-${countryChar2}.svg`
})
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
        padding: 80px 120px 20px 120px;
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

            p.name {
                font-size: 30px;
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
        box-shadow: 1px 0 0 0 rgba(42, 34, 38, 0.1), 0 1px 0 0 rgba(42, 34, 38, 0.1), 1px 1px 0 0 rgba(42, 34, 38, 0.1), 1px 0 0 0 rgba(42, 34, 38, 0.1) inset, 0 1px 0 0 rgba(42, 34, 38, 0.1) inset
    }
}
</style>