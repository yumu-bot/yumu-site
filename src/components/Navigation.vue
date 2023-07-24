<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="nav">
		<a-space size="large">
			<span class="nav-title">Yumu Site</span>
			<a-menu class="nav-bar" :selectedKeys="currentMenu" mode="horizontal">
				<a-menu-item v-for="(item) in menuList" :key="item.title"
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
				src="src\assets\img\avatar\Head_yuyuko_Qiqi.png">
			</a-avatar>
		</a-space>
	</div>
</template>

<script>
import { AntDesignOutlined } from '@ant-design/icons-vue';
import { ref, provide, onMounted, onUnmounted, defineProps, watch, watchEffect, reactive, inject } from "vue"
import bus from '../utils/bus';
export default {
	data() {
		return {
			menuList: [{ key: "0", title: "home", path: "/home", header: "主页" },
			{ key: "1", title: "function", path: "/ppm", header: "功能" },
			// { key: "2", title: "feature", path: "/feature", header: "特色" },
			// { key: "3", title: "realtime", path: "/realtime", header: "实时" },
			{ key: "4", title: "about", path: "/about", header: "关于" }],
			currentMenu: ["home"], // 配合antd的:selectedKeys属性，定义currentMenu为字符串数组，home是默认值
			navIndex: 0,
		}
	}, methods: {
		// 任意处路由跳转切换导航栏高亮
		changeMenuByRandom() {
			// bus.$on("currentMenu", (res) => { this.currentMenu.pop(); this.currentMenu.push(res) });//兄弟组件事件总线通信
		},
		// 导航栏切换高亮
		changeMenuByNavbar(selectedMenu, path) {
			// console.log(this.currentMenu);
			// console.log(menu);
			this.currentMenu.pop();
			this.currentMenu.push(selectedMenu);
			this.$router.push(path);
		},
	}, mounted() {
		this.changeMenuByRandom();
	}, watch: {
		"$route"() {
			// 监听路由是否前进/后退，发生变化则触发导航栏切换高亮
			if (this.$router.push) {
				console.log(this.$route.name, this.$route.path);
				let selectedMenu = this.$route.name;
				let path = this.$route.path;
				this.changeMenuByNavbar(selectedMenu, path);
			}
		}
	}
}


</script>

<style lang="less" scoped>
.nav {
	// display: inline-flex;
	background-color: #54454C;
	// color: #ffffff;
	text-align: center;
	width: 100%;
	// left:395.04px;
	height: auto;
	position: fixed;
	display: inline;
	z-index: 2;
}

.nav-bar {
	background-color: #54454C;
	color: #ffffff;
	// text-align: center;
	display: inline-block;
	font-size: x-large;
	border: #54454C;
	width: 790px;
	// font-weight: 500;
	// position:relative;
	// left: 395.04px;
	// z-index: 4;
}

.nav-title {
	font-size: xx-large;
	// position: relative;
	// background-color: #54454C;
	// left: 395.04px;
}

.user-avatar {
	// padding-bottom: -2px;
	margin-top: 6px;
	margin-bottom: 6px;
	// margin-right: 20px;
}

.user-name {
	font-size: large;
	// padding-right: 10px;
}

@media screen and (min-width: 1921px) {
	.nav-bar {
		width: 650px;
	}
}
</style>