<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="nav">
	<a-affix :offset-top="top">
		<a-space size="large">
			<a-span class="nav-title">Yumu Site</a-span>
			<a-menu class="nav-bar" v-model:selectedKeys="current" mode="horizontal">
				<a-sub-menu key="home">
					<template #title>主页</template>
					<a-menu-item key="setting:1">欢迎页</a-menu-item>
					<a-menu-item key="setting:2">用户页</a-menu-item>
				</a-sub-menu>
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
	</a-affix>
	</div>
</template>

<script setup>
import { ref } from "vue"
import HomeContent from '@/components/HomeContent.vue';
const activeIndex = ref('1')
const activeIndex2 = ref('1')

</script>

<style lang="less" scoped>
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

}

.nav-title {
	font-size: xx-large;
	// position: relative;
	
	// background-color: #54454C;
	// left: 395.04px;
}
</style>