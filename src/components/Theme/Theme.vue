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
			fontFamily:'torus,puhui',//全局UI字体
		},
		components: {
			// 输入框
			Input: {
				colorBgContainer: '#2A2226',
				colorTextPlaceholder: 'rgba(255,255,255,0.45)',
				colorText:'#fff'
			},
			// 数字输入框
			InputNumber: {
				colorBgContainer: '#2A2226',
				colorTextPlaceholder: 'rgba(255,255,255,0.45)',
				colorText: '#fff'
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
				// colorItemText: '#ffffff',//目录菜单主文本色
			},
			// 按钮
			Button: {
				colorBgContainer: '#2A2226',//按钮背景填充色
				colorText: '#ffffff',//按钮文本色
				colorPrimaryActive: 'rgba(255,255,255,0.65)',//按钮激活色(含文本)
				colorPrimaryHover: 'rgba(255,255,255,0.45)',//按钮悬浮色
				// colorBgTextActive: 'rgba(255,255,255,0.65)',//按钮背景文本激活色
				// colorBgTextHover: 'rgba(255,255,255,0.45)',//按钮背景文本悬浮色
			},
			// 多选框
			Checkbox: {
				colorText: '#ffffff',//文本色
			}
		}
	}">
	</a-config-provider>
</template>

<script setup>
</script>

<style></style>