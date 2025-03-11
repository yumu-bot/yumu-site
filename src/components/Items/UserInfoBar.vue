<!--
* @description: 用户信息栏组件
* @fileName: UserInfoBar.vue
* @author: SIyuyuko
* @date: 2024-02_27
* @others: 嵌套在导航栏右侧
!-->

<template>
    <!-- 用户信息展示 -->
    <div class="user-info">
        <!-- 切换语言 -->
        <div class="locale-changer">
            <a-button v-show="userInfo.isLogin" type="plain" shape="circle" @click="showDrawer()">
                <SearchOutlined />
            </a-button>
            <!-- <select v-model="$i18n.locale">
						<option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
							{{ lang }}
						</option>
					</select> -->
            <a-button type="text" v-model="$i18n.locale" @click="toggleLang($i18n.locale)">{{ locale
            }}</a-button>
        </div>
        <span class="user-name">{{ user.name }}</span>
        <!-- 用户菜单 -->
        <a-dropdown class="user-info-list" v-model:open="isOpen" placement="bottomRight">
            <a-avatar class="user-avatar" :size="48" :src=user.avatar>
            </a-avatar>
            <template #overlay>
                <a-menu>
                    <!-- 用户卡片 -->
                    <a-card :bordered="true" style="width: 200px" v-show="userInfo.isLogin">
                        <template #cover>
                            <img :src=user.cover />
                        </template>

                        <template #actions>
                            <setting-outlined :title="$t('menuList.settings')" />
                            <UserOutlined :title="$t('menuList.userInfo')" @click="router.push(`/info/${user.uid}`)" />
                            <LogoutOutlined @click="toggleShow()" :title="$t('menuList.logout')" />
                        </template>
                        <a-card-meta :title=user.name :description=user.description>

                            <template #avatar>
                                <a-avatar :size="48" :src=user.avatar />
                            </template>
                        </a-card-meta>
                    </a-card>
                    <a-menu-item v-if="userInfo === null || !userInfo.isLogin">
                        <a @click="login()">{{ $t('menuList.login') }}</a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
    <!-- 全局通知窗口 -->
    <!-- 登出 -->
    <a-modal class="logout-modal" v-if="userInfo.data" v-model:open="isVisible" :title=noteTitle>
        <p>{{ $t('notification.quitText') }}</p>

        <template #footer>
            <a-button @click="isVisible = false">{{ $t('tool.backButton') }}</a-button>
            <a-button @click="logout()">{{ $t('tool.quitButton') }}</a-button>
        </template>
    </a-modal>
    <!-- 首次登入 -->
    <a-modal class="login-modal" v-else v-model:open="isVisible" :title=noteTitle destroyOnClose>
        <p>{{ $t('notification.logText') }}</p><br>
        <a-input v-model:value="logCode" size="large" @keyup.enter="getLogCode()"
            :placeholder="$t('placeholder.logCode')" allow-clear :maxlength="6">

            <template #suffix>
                <LoadingOutlined v-show="isLoading" style="color: rgba(0, 0, 0, 0.45)" />
            </template>
        </a-input>

        <template #footer>
            <a-button @click="isVisible = false; logCode = ''">{{ $t('tool.backButton') }}</a-button>
            <a-button @click="getLogCode()">{{ $t('tool.confirmButton') }}</a-button>
        </template>
    </a-modal>
    <!-- 搜索抽屉 -->
    <a-drawer title="搜索玩家" placement="top" :closable="false" :open="drawerVisible" :keyboard="false" height="225px"
        @close="drawerVisible = false">
        <a-input v-model:value="searchText" size="large" placeholder="键入以搜索" allow-clear
            @keyup.enter="searchUser()"></a-input>
        <a-spin v-show="isLoading" style="margin-top: 20px;" />
        <div class="user-result" v-if="aimUser && !isLoading" @click="jumpUserInfo()">
            <a-avatar :size="48" :src="aimUser.avatar_url"></a-avatar>
            <span style="margin-left: 20px;">{{ aimUser.username }}</span>
        </div>
        <div class="user-result-error" v-show="aimUser === null && !isLoading">
            <a-empty image="/img/component/Index_Error.svg" description="玩家不存在" />
        </div>
    </a-drawer>
</template>

<script setup name="UserInfoBar">
import { SettingOutlined, UserOutlined, LogoutOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ref, watch, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useUserInfoStore } from '../../stores/userInfo';
import { getLogin, getUserInfo } from '../../api/data_api';
import { resolveString } from '../../utils/util';
import { useI18n } from 'vue-i18n';
const I18n = useI18n();
const { locale, t } = useI18n();
const langs = ref(['简体中文', 'English']);// 多语言

const userInfoStore = useUserInfoStore();// 用户状态(pinia)
const guestAvatar = "/img/avatar/avatar-guest@2x.png";// 游客头像
const router = useRouter();

let userInfo = ref();//用户状态数据(ref)
// 用户信息
let user = ref({
    name: "",// 用户名
    avatar: "",// 头像
    cover: "",// 主页封面
    description: "",// 简介，展示pp
    uid: "",// id
});
let isVisible = ref(false);// 全局通知窗口是否显示
let isOpen = ref();// 下拉菜单是否弹出
let noteTitle = ref();// 全局通知窗口标题
let logCode = ref("");// 登录验证码
let isLoading = ref(false);// 登录验证loading
let drawerVisible = ref(false);// 抽屉是否显示
let searchText = ref("");// 搜索文字
let aimUser = ref();// 指定搜索用户

//切换网页语言
function toggleLang(currentLang) {
    locale.value = currentLang === "简体中文" ? "English" : "简体中文";
    userInfoStore.$state = { lang: locale.value };
    console.warn('locale', locale.value);
};

// 用户登陆
function login() {
    // 登录验证
    if (!userInfo.value.data) {
        noteTitle.value = t('tool.firstLog');
        isVisible.value = true;
    } else {
        showUserData();
    }
};
// 获取验证码登录
function getLogCode() {
    if (logCode.value) {
        isLoading.value = true;
        getLogin({ code: logCode.value }).then((res) => {
            // console.log(res);
            if (res.status === 200 && res.data) {
                localStorage.setItem('userData', JSON.stringify(res.data));
                showUserData();
                isLoading.value = false;
                isVisible.value = false;
            }
        }).catch((e) => {
            message.error(t('notification.wrongLogCode'));
            isLoading.value = false;
            logCode.value = "";
        });
    } else {
        message.warning(t('notification.blankLogCode'));
    }
};
// 用户数据展示
function showUserData() {
    let data = JSON.parse(localStorage.getItem('userData'));// 获取本地玩家数据
    // 通过uid更新玩家数据
    getUserInfo({ uid: data.uid }).then((res) => {
        if (res.status && res.data) {
            userInfoStore.getUserData(res.data);
            user.value = {
                name: res.data.username,
                avatar: res.data.avatar_url,
                cover: res.data.cover_url,
                description: res.data.pp + " pp ",
                uid: res.data.user_id,
            };
            userInfoStore.$state = { isLogin: true };
        };
    });
};
// 用户登出
function logout() {
    user.value = {
        name: null,
        avatar: guestAvatar,
        cover: null,
        description: null,
        uid: null
    }
    userInfoStore.$state = { isLogin: false };
    isVisible.value = false;
    router.push("home");
};
// 触发下拉菜单时切换通知窗口显示
function toggleShow() {
    noteTitle.value = t('tool.quit');
    isVisible.value = true;
    isOpen.value = false;
};
// 显示搜索抽屉
function showDrawer() {
    drawerVisible.value = true;
};
// 根据用户名查询指定用户 
function searchUser() {
    if (searchText.value !== "") {
        isLoading.value = true;
        let name = resolveString(searchText.value);
        getUserInfo({ name: name }).then((res) => {
            if (res.status && res.data) {
                isLoading.value = false;
                aimUser.value = res.data;
            }
        }).catch((e) => {
            isLoading.value = false;
            aimUser.value = null;
        });
    };
};
// 
function jumpUserInfo() {
    const uid = aimUser.value.user_id;
    router.push({ name: "info", params: { uid } });
    drawerVisible.value = false;
    // window.history.go(0);
    // location.reload();
}

onBeforeMount(() => {
    // 校验用户状态
    userInfo.value = JSON.parse(localStorage.getItem("userInfo"));// 获取本地session
    // 已验证用户
    if (userInfo.value) {
        locale.value = userInfo.value.lang;
        if (userInfo && userInfo.value.isLogin) {
            login();
        };
    };
    // 未验证用户/首次登录
    if (!userInfo.value || !userInfo.value.isLogin) {
        logout();
        userInfo.value = JSON.parse(localStorage.getItem("userInfo"));// 再次获取初始状态
    };
});

// 监听pinia
watch(
    userInfoStore.$state,
    (state) => {
        // 每当它发生变化时，将整个状态持久化到本地存储
        // console.log(state)
        // state.lang = locale.value;// 刷新页面多语言不变
        userInfo.value = state;// 更新用户状态数据
        // console.log(userInfo.value.data)
    },
    { deep: true }
)

</script>

<style lang="scss" scoped></style>