<!-- eslint-disable vue/multi-word-component-names -->
<!-- 首页路由 -->
<template>
	<div class="home-page">
		<!-- 主页内容展示 -->
		<!-- 二级路由 -->
		<div class="page-content">
			<router-view></router-view>
		</div>

	</div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
import HomeContent from '@/components/HomeContent.vue';
// import { windowResize } from '../utils/windowResize.js';
import { onMounted } from 'vue';
// onMounted(()=>{windowResize();});
</script>

<style lang="scss" scoped>
@import "../assets/css/variables.scss";

.home-page {
	// min-width: 1024px;
	// min-height: 960px;
	// display: flex;
	// position: relative;
	// left:395.04px;
	// overflow: hidden;
	// z-index: auto;
	color: #ffffff;

	@media screen and (min-width: 1921px) {
		width: 90%;
		margin: 0 auto;
	}
}

.page-content {
	background-color: #2A2226;
	// width:50%;
	height: auto;
	// position:fixed;
	// background-size:50% 100%;
	// flex-grow: 1;
	// width: 1129.92px;
	width: 60%;
	position: relative;
	// left:395.04px;
	// right: inherit;
	top: 50.28px;
	// text-align: center;
	z-index: 1;
	margin: 0 auto; //高度自适应实现垂直居中,父级元素设置display: flex;
	padding-top: 30px;

	// display: inline-block;
	@media screen and (min-width:$xxl) and (max-width:1919px) {
		width: 66%;
	}

	@media screen and (max-width:$xxl) {
		width: 67%;
	}

	@media screen and (max-width:$xl) {
		width: 70%;
	}

	@media screen and (max-width:$lg) {
		width: 73%;
	}

	@media screen and (max-width:$md) {
		width: 85%;
	}

	@media screen and (max-width:$sm) {
		width: 100%;
	}

	@media screen and (max-width:$xs) {
		width: 100%;
	}
}
</style>