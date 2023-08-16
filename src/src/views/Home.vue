<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="home-page">
		<!-- <div class="nav">
			<Navigation></Navigation>
		</div> -->
		<div class="page-content">
		<HomeContent></HomeContent>
		</div>
	</div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
import HomeContent from '@/components/HomeContent.vue';
import { windowResize } from '../utils/windowResize.js';
import { onMounted } from 'vue';
// onMounted(()=>{windowResize();});
</script>

<style lang="scss" scoped>
.nav {
	// display: inline-flex;
	background-color: #54454C;
	color: #ffffff;
	text-align: center;

}
.home-page{
	// min-width: 1024px;
	// min-height: 960px;
	// display: flex;
}
.page-content{
	// padding:
    // env(safe-area-inset-top, 20px)
    // env(safe-area-inset-right, 20px)
    // env(safe-area-inset-bottom, 20px)
    // env(safe-area-inset-left, 20px);
	background-color: #2A2226;
	// width:50%;
	height:100%;
	position:fixed;
	// background-size:50% 100%;
	flex-grow: 1;
}
</style>