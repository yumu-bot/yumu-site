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

<style lang="less" scoped>
.home-page {
	// min-width: 1024px;
	// min-height: 960px;
	// display: flex;
	// position: relative;
	// left:395.04px;
	// overflow: hidden;
	// z-index: auto;
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
}

@media screen and (max-width: 480px) {
	.page-content {
		width: 100%;
		padding-top: 22.208333vw;
	}
}

@media screen and (min-width: 481px) and (max-width: 640px) {
	.page-content {
		width: 100%;
		padding-top: 120px;
	}
}

@media screen and (min-width: 641px) and (max-width: 768px) {
	.page-content {
		width: 86%;
		padding-top: 90px;
	}
}

@media screen and (min-width: 769px) and (max-width: 960px) {
	.page-content {
		width: 77%;
		padding-top: 60px;
	}
}

@media screen and (min-width: 961px) and (max-width: 1098px) {
	.page-content {
		width: 73%;
		padding-top: 50px;
	}
}

@media screen and (min-width: 1099px) and (max-width:1280px) {
	.page-content {
		width: 69%;
		padding-top: 40px;
	}
}

@media screen and (min-width: 1281px) and (max-width:1536px) {
	.page-content {
		width: 64%;
	}
}

@media screen and (min-width: 1537px) and (max-width:1919px) {
	.page-content {
		width: 61%;
	}
}

@media screen and (min-width: 1921px) {
	.page-content {
		width: 50%;
	}
}
</style>