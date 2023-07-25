<template>
	<!-- Ant Design v4 全局自定义主题 -->
	<a-config-provider :theme="{
		token: {
			colorPrimary: '#2a2226',
			// colorInfo: '#2a2226',
			fontSize: 14,
			wireframe: true,
			borderRadius: 0,
			// colorBgContainer: '#2A2226',
			// colorText: '#ffffff',
			// colorItemText:'#ffffff',
		},
		components: {
			Input: {
				// colorBgContainer: '#2A2226',
				// colorTextPlaceholder: 'rgba(255,255,255,0.45)'
			},
			Select: {
				// colorText: 'rgba(42,34,38,0.5)',
				// colorTextPlaceholder: '#ffffff',
				// colorPrimaryHover: '#ffffff',
				// controlItemBgActive: '#ffffff',
				// colorTextQuaternary: '#ffffff'
			},
			Menu: {
				// borderRadius:16
				// colorItemBg: '#2A2226',
				// colorText: '#ffffff',
			}
		}
	}">
	</a-config-provider>
</template>

<script setup>
import { Menu, Select, theme } from 'ant-design-vue';
</script>

<style></style>