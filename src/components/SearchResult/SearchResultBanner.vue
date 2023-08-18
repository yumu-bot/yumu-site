<!-- 
 * @description: 搜索结果banner图片组件
 * @fileName: SearchResultBanner.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-18 11:42:18
 * @version: V1.0.0 
!-->
<template>
	<div class="search-result">
		<!-- 加载成功 -->
		<div v-show="loaded === true">
			<img class="result-image" @load="imgLoaded" :src=imgUrl>
		</div>
		<!-- 查询成功&加载中 -->
		<div class="progress-icon" v-if="visible === true">
			<a-image class="result-image" src="/img/component/Index_Loading.png" :preview="false">
			</a-image>
			<a-spin />
		</div>
		<div class="progress-icon" v-if="status !== 'success'">
			<!-- 等待用户发送请求 -->
			<a-image v-if="status === 'fetching'" src="/img/component/Index_Fetching.png" :preview="false"></a-image>
			<!-- 查询中 -->
			<a-image v-if="status === 'loading'" src="/img/component/Index_Waiting.png" :preview="false"></a-image>
			<a-spin :spinning="spinning" />
			<!-- 查询失败 -->
			<a-image v-if="status === 'error'" src="/img/component/Index_Error.png" :preview="false"></a-image>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			loaded: false,
			visible: false,//图片加载时是否展示loading(false:查询中)
		}
	},
	props: {
		status: {
			type: String,
			default: "fetching"
		},
		imgUrl: {
			type: String,
			default: ""
		},
		spinning: {
			type: Boolean,
			default: false,
		},
		// loaded: {
		// 	type: Boolean,
		// 	default: null,
		// }
	}, methods: {
		// 图片加载成功时调用
		imgLoaded() {
			this.loaded = true;
			this.visible = false;
		}
	},
	watch: {
		status: {
			handler(val) {
				this.visible = val === "success" ? true : false;//监听查询状态,若查询成功则触发loading显示
				if (val !== "success") {
					this.loaded = false;
				}
			}, immediate: true
		}
	}
}
</script>
<style lang="scss" scoped>
.search-result {
	text-align: center;
	background-color: #54454C;
	padding: 10px 0px;
	height: 712px;
	overflow: hidden;
}

.result-image {
	width: -webkit-fill-available;

}

.progress-icon {
	padding-top: 250px;
	display: inline-flex;
	flex-direction: column;
}
</style>