<template>
	<div class="about-page" :style="{ height: contentHeight }">
		<!-- 关于内容展示 -->
		<a-image src="/img/avatar/Head_yuyuko_Qiqi.png" alt="关于页图片说明" :width="300" :preview="false"></a-image>
		<h1>关于Yumu Site</h1>
		<h2>Main Designer: Muziyami</h2>
		<h2>Developer: -Spring Night- Truncle SIyuyuko</h2>
		<div class="website-list">
			<h3>
				<a href="http://git.365246692.xyz/bot/yumu-site" target="_blank">Git</a>
			</h3>
			<h3 v-if="isDevelopment">
				<a href="https://bot.365246692.xyz/" target="_blank">yumu site(online)</a>
			</h3>
			<h3 v-if="isDevelopment">
				<a href="http://disk.365246692.xyz/" target="_blank">Web Disk</a>
			</h3>
		</div>
		<footer>
			<span>Copyright © 2021-2023 Yumubot, All Rights Reserved.</span>
		</footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isDevelopment: true,//是否处于开发环境
		}
	},
	created() {
		this.isDevelopment = window.location.href.includes("bot") ? false : true;
	}
}
</script>

<style lang="scss" scoped>
.about-page {
	text-align: center;
	vertical-align: middle;
	line-height: 300%;
	padding-bottom: 12%;
	overflow: hidden;

	a {
		color: #ffffff;
	}

	a:hover {
		color: #54454C;
	}

	a:active {
		color: rgb(84, 69, 76, 0.5);
	}
}

.website-list {
	display: flex;
	justify-content: center;
	column-gap: 20px;
}
</style>