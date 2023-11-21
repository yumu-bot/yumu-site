<!-- eslint-disable vue/multi-word-component-names -->
<!-- 首页路由 -->
<template>
	<div class="home-page">
		<!-- 主页内容展示 -->
		<!-- 二级路由 -->
		<div class="page-content">
			<router-view></router-view>
		</div>
		<FloatButtons></FloatButtons>
	</div>
</template>

<script setup name="Home">
import FloatButtons from '../components/Items/FloatButtons.vue';
</script>
