<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="nav">
		<div class="nav-bar">
			<a-space size="large">
				<span class="nav-title">Yumu Site</span>
				<a-menu class="nav-menu" :selectedKeys="state.currentMenu" mode="horizontal">
					<a-menu-item v-for="(item, index) in state.menuList" :key="index"
						@click="changeMenuByNavbar(item.title, item.path)">{{
							item.header }}
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
				<span class="user-name">Muziyami</span>
				<a-avatar class="user-avatar" :size="{ xs: 24, sm: 32, md: 40, lg: 48, xl: 48, xxl: 48 }"
					src="/img/avatar/Head_yuyuko_Qiqi.png">
				</a-avatar>
			</a-space>
		</div>
	</div>
</template>

<script setup>
import { AntDesignOutlined } from '@ant-design/icons-vue';
import { ref, provide, onMounted, onUnmounted, watch, watchEffect, reactive, inject } from "vue";
import { useRoute, useRouter } from 'vue-router';
import bus from '../utils/bus';
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
onMounted(() => {
	changeMenuByRandom();
})
watch((route), () => {
	if (router.push) {
		console.log(route.name, route.path);
		let selectedMenu = route.name;
		let path = route.path;
		changeMenuByNavbar(selectedMenu, path);
	}
});

</script>
