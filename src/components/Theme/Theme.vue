<template>
	<!-- Ant Design v4 全局自定义主题 -->
	<!-- 在线主题编辑器：https://antdv.com/theme-editor-cn  -->
	<a-config-provider :theme="{
		// 全局配置
		token: {
			colorPrimary: '#2a2226',//主色
			// colorInfo: '#2a2226',
			fontSize: 14,//默认字号
			wireframe: true,
			borderRadius: 14,//基础圆角
			// colorPrimaryText:'fff',//主色文本
			// colorBgContainer: '#2A2226',
			// colorText: '#ffffff',
			// colorItemText:'#ffffff',
		},
		components: {
			// 输入框
			Input: {
				// colorBgContainer: '#2A2226',
				// colorTextPlaceholder: 'rgba(255,255,255,0.45)'
			},
			// 选择框
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
			// 目录菜单
			Menu: {
				// borderRadius:16
				colorItemBg: '#54454C',
				colorPrimary: '#ffffff',
				colorItemText: '#ffffff'
			},
			// 按钮
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