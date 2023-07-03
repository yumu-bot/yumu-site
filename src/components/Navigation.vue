<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="nav">
		<a-space size="large">
			<span class="nav-title">Yumu Site</span>
			<a-menu class="nav-bar" v-model:selectedKeys="current" mode="horizontal">
				<a-menu-item key="home">
					主页
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
					关于
				</a-menu-item>
				<!-- <a-menu-item key="alipay">
					<a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
						Navigation Four - Link
					</a>
				</a-menu-item> -->
			</a-menu>
		</a-space>
	</div>
</template>

<script setup>
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
	// height: 60px;
	position: fixed;
	z-index: inherit;
}

.nav-bar {
	background-color: #54454C;
	color: #ffffff;
	// text-align: center;
	display: inline-block;
	font-size: x-large;
	border: #54454C;
	width: 960px;
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
</style>