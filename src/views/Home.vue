<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="home-page">
		<Navigation></Navigation>
		<div class="page-content">
			<HomeContent></HomeContent>
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
	display: flex;
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
	width: 1129.92px;
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
</style>