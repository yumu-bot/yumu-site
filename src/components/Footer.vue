<!-- 
 * @description: 网站页脚
 * @fileName: Footer.vue 
 * @author: SIyuyuko 
 * @date: 2023-11-19 10:04:50
 * @others: 
!-->
<template>
	<!-- <a-layout>
		  <a-layout-footer class="footer-body">123456</a-layout-footer>
		</a-layout> -->
	<footer class="footer-body">
		<p>
			<a-space>
				<a href="https://docs.365246692.xyz/" target="_blank">帮助文档</a>
				<a href="https://panel.365246692.xyz/status/public" target="_blank">服务器状态</a>
			</a-space>
		</p>
		<p>Copyright © 2021-2023 Yumubot, All Rights Reserved.</p>
	</footer>
</template>
<script setup name="Footer">
</script>
<style lang="scss" scoped>
.footer-body {
	z-index: 2;
	color: #ffffff;
	text-align: center;
	width: 100%;
	margin-top: 20px;
	font-size: small;

	a {
		color: #ffffff;
		text-decoration: none;
		font-size: small;
	}

	a:hover {
		color: #54454C;
	}

	a:active {
		color: rgb(84, 69, 76, 0.5);
	}
}

// AutoResize for phone
@media screen and (max-width:420px) {
	.footer-body {
		font-size: xx-small;

		a {
			font-size: xx-small;
		}
	}
}
</style>