<template>
	<div class="about-page" :style="{ height: contentHeight }">
		<!-- 关于内容展示 -->
		<a-image src="src\assets\img\avatar\Head_yuyuko_Qiqi.png" alt="关于页图片说明" :width="300" preview="false"></a-image>
		<h1>关于Yumu Site</h1>
		<h2>Main Designer: Muziyami</h2>
		<h2>Developer: -Spring Night- Truncle SIyuyuko</h2>
		<footer>
			<span>Copyright © 2021-2023 Yumubot, All Rights Reserved.</span>
		</footer>
	</div>
</template>

<script setup>
import { ref } from "vue";

const contentHeight = window.outerHeight;
</script>

<style lang="less" scoped>
.about-page {
	text-align: center;
	line-height: 400%;
	vertical-align: middle;
}
</style>