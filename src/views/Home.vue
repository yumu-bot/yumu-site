<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="home-page">
		<div class="nav">
			<div class="nav-bar">
			<Navigation></Navigation>
			</div>
		</div>
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
.nav {
	// display: inline-flex;
	background-color: #54454C;
	// color: #ffffff;
	text-align: center;
width:100%;
// left:395.04px;
// height: 60px;
position:relative;
z-index: 0;
}
.home-page{
	// min-width: 1024px;
	// min-height: 960px;
	// display: inline;
	 position: relative;
// left:395.04px;
}
.page-content{
	background-color: #2A2226;
	// width:50%;
	height:1000px;
	// position:fixed;
	// background-size:50% 100%;
	// flex-grow: 1;
	// width: 1129.92px;
//   position:relative;
// left:395.04px;
// right: inherit;
top:50.28px;
// text-align: center;
z-index: -1;
}
</style>