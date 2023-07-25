<template>
	<!-- Ant Design v4 全局自定义主题 -->
	<a-config-provider :theme="{
		token: {
			colorPrimary: '#2a2226',
			colorInfo: '#2a2226',
			fontSize: 14,
			wireframe: true
		},
	}">
	</a-config-provider>
</template>

<script setup>
import { theme } from 'ant-design-vue';
</script>

<style></style>