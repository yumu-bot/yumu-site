<template>
	<!-- Ant Design v4 全局自定义主题 -->
	<a-config-provider :theme="{
		token: {
			colorPrimary: '#2a2226',
			// colorInfo: '#2a2226',
			fontSize: 14,
			wireframe: true,
			borderRadius: 14,
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
				colorText: '#ffffff',
				// colorPrimary: '#2a2226',
				colorBgContainer: '#2A2226',
				colorTextPlaceholder: '#ffffff',
				// colorPrimaryHover: '#ffffff',
				// controlItemBgActive: '#ffffff',
				colorTextQuaternary: '#ffffff',
				// colorTextTertiary: '#46393F',
				controlItemBgHover: 'rgba(255,255,255,0.45)',
				controlItemBgActive: 'rgba(255,255,255,0.65)',
				colorBgElevated: '#46393F'
			},
			Menu: {
				// borderRadius:16
				colorItemBg: '#54454C',
				colorPrimary: '#ffffff',
				colorItemText: '#ffffff'
			},
			Button: {
				colorBgContainer: '#2A2226',
				colorText: '#ffffff'
			}
		}
	}">
	</a-config-provider>
</template>

<script setup>
import { Button, Menu, Select, theme } from 'ant-design-vue';
</script>

<style></style>