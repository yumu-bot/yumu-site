<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="nav">
		<div class="nav-bar">
			<a-space size="large" style="flex: 1;">
				<div class="nav-title">Yumu Site</div>
				<a-menu class="nav-menu" :selectedKeys="state.currentMenu" mode="horizontal">
					<a-menu-item v-for="(item, index) in state.menuList" :key="index"
						@click="changeMenuByNavbar(item.title, item.path)">{{ $t(`menuList.${item.title}`) }}
					</a-menu-item>
					<!-- 暂未实现的页面 -->
					<!-- <a-menu-item key="function">
					功能
				</a-menu-item>
				<a-menu-item key="feature">
					特色
				</a-menu-item>
				<a-menu-item key="realtime">
					实时
				</a-menu-item><a-menu-item key="about">
					<router-link to="/about">关于</router-link>
				</a-menu-item> -->
					<!-- <a-menu-item key="alipay">
					<a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
						Navigation Four - Link
					</a>
				</a-menu-item> -->
				</a-menu>
				<!-- 用户信息展示 -->
				<div class="user-info">
					<!-- 切换语言 -->
					<div class="locale-changer">
						<!-- <select v-model="$i18n.locale">
						<option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
							{{ lang }}
						</option>
					</select> -->
						<a-button type="text" v-model="$i18n.locale" @click="toggleLang($i18n.locale)">{{ locale
						}}</a-button>
					</div>
					<span class="user-name">{{ username }}</span>
					<a-dropdown placement="bottomRight">
						<a-avatar class="user-avatar" :size="48" :src=avatar>
						</a-avatar>
						<template #overlay>
							<a-menu>
								<a-menu-item v-if="!username">
									<a @click="login()">{{ $t(`menuList.login`) }}</a>
								</a-menu-item>
								<a-menu-item>
									<a href="javascript:;">{{ $t(`menuList.settings`) }}</a>
								</a-menu-item>
								<a-menu-item v-if="username">
									<a @click="isVisible = true">{{ $t(`menuList.logout`) }}</a>
								</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</div>
			</a-space>
		</div>
	</div>
	<a-modal v-model:open="isVisible" :title="$t(`notification.quit`)">
		<p>{{ $t(`notification.quitText`) }}</p>
		<template #footer>
			<a-button @click="isVisible = false">{{ $t(`notification.backButton`) }}</a-button>
			<a-button @click="logout()">{{ $t(`notification.quitButton`) }}</a-button>
		</template>
	</a-modal>
</template>

<script setup name="Navigation">
import { CloseSquareOutlined } from '@ant-design/icons-vue';
import { ref, provide, onMounted, onUnmounted, watch, watchEffect, reactive, inject } from "vue";
import { useRoute, useRouter } from 'vue-router';
import bus from '../utils/bus';
import { useUserInfoStore } from '../stores/userInfo';
import { useI18n } from 'vue-i18n'
const I18n = useI18n()
const { locale } = useI18n()
console.warn('locale', locale.value);
const langs = ref(['简体中文', 'English']);
const state = reactive({
	menuList: [
		{ key: "0", title: "home", path: "/home", header: "主页" },
		{ key: "1", title: "function", path: "/function", header: "功能" },
		// { key: "2", title: "feature", path: "/feature", header: "特色" },
		// { key: "3", title: "realtime", path: "/realtime", header: "实时" },
		{ key: "4", title: "about", path: "/about", header: "关于" }
	],
	currentMenu: ["home"], // 配合antd的:selectedKeys属性，定义currentMenu为字符串数组，home是默认值
	navIndex: 0,
});
const route = useRoute();
const router = useRouter();
const userInfoStore = useUserInfoStore();

let username = ref();
let avatar = ref("/img/avatar/avatar-guest@2x.png");
let isVisible = ref(false)

//切换网页语言
function toggleLang(currentLang) {
	locale.value = currentLang === "简体中文" ? "English" : "简体中文";
	console.warn('locale', locale.value);
	userInfoStore.changeLanguage(locale.value);
}

// 任意处路由跳转切换导航栏高亮
function changeMenuByRandom() {
	// bus.$on("currentMenu", (res) => { this.currentMenu.pop(); this.currentMenu.push(res) });//兄弟组件事件总线通信
};
// 导航栏切换高亮
function changeMenuByNavbar(selectedMenu, path) {
	// console.log(this.currentMenu);
	// console.log(menu);
	state.currentMenu.pop();
	state.currentMenu.push(selectedMenu);
	router.push(path);
};
// 用户登陆
function login() {
	username.value = userInfoStore.username;
	avatar.value = userInfoStore.avatar;
	userInfoStore.changeLogState();
	userInfoStore.$state = { isLogin: true };
};
// 用户登出
function logout() {
	username.value = null;
	avatar.value = "/img/avatar/avatar-guest@2x.png";
	userInfoStore.changeLogState();
	userInfoStore.$state = { isLogin: false };
	isVisible.value = false;
}
onMounted(() => {
	changeMenuByRandom();
	let userInfo = JSON.parse(localStorage.getItem("userInfoState"));
	if (userInfo && userInfo.isLogin) {
		login();
	}
	if (userInfo) {
		locale.value = userInfo.lang;
	}
})
watch((route), () => {
	if (router.push) {
		console.log(route.name, route.path);
		let selectedMenu = route.name;
		let path = route.path;
		changeMenuByNavbar(selectedMenu, path);
	}
});
watch(
	userInfoStore.$state,
	(state) => {
		// 每当它发生变化时，将整个状态持久化到本地存储
		state.lang=locale.value;// 刷新页面多语言不变
		localStorage.setItem('userInfoState', JSON.stringify(state))
	},
	{ deep: true }
)

</script>
<style lang="scss" scoped></style>
