<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="nav">
		<a-space size="large">
			<span class="nav-title">Yumu Site</span>
			<a-menu class="nav-bar" v-model:selectedKeys="current" mode="horizontal">
				<a-menu-item key="home">
					<router-link to="/">主页</router-link>
				</a-menu-item>
				<a-menu-item key="function">
					功能
				</a-menu-item>
				<a-menu-item key="feature">
					特色
				</a-menu-item>
				<a-menu-item key="realtime">
					实时
				</a-menu-item><a-menu-item key="about">
					<router-link to="/about">关于</router-link>
				</a-menu-item>
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

<script setup>
import { AntDesignOutlined } from '@ant-design/icons-vue';
import { ref } from "vue"
const current = ref(['home']);


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
	margin-bottom: 6px;
	// margin-right: 20px;
}

.user-name {
	font-size: large;
	// padding-right: 10px;
}
</style>