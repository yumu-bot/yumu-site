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
		<div class="result" v-show="loaded" v-if="imgUrl">
			<a-spin :spinning="spinning" tip="Loading...">
				<img :src=imgUrl class="result-image" @load="imgLoaded" @error="imgLoadError">
			</a-spin>
		</div>
		<div class="progress-icon" v-show="!loaded">
			<div v-show="status === 'waiting'">
				<!-- 等待用户查询 -->
				<a-image src="/img/component/Index_Waiting.svg" :preview="false"></a-image>
			</div>
			<div class="progress-icon-loading" v-show="status === 'loading'">
				<!-- 查询中&加载中 -->
				<a-image src="/img/component/Index_Loading.svg" :preview="false"></a-image>
				<a-spin :spinning="status === 'loading'" />
			</div>
			<div v-show="status === 'error'">
				<!-- 查询失败 -->
				<a-image src="/img/component/Index_Error.svg" :preview="false"></a-image>
			</div>
		</div>
	</div>
</template>
<script setup name="SearchResultBanner">
import { message } from 'ant-design-vue';
import { ref } from 'vue';
const loaded = ref(false);//图片是否加载成功
const props = defineProps({
	// 查询状态
	status: {
		type: String,
		default: "waiting"
	},
	// 图片地址
	imgUrl: {
		type: String,
		default: "#"
	},
	// 是否正在加载
	spinning: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits();
// 图片加载成功时调用
function imgLoaded() {
	loaded.value = true;
	emit("isSpinning");
	let status = "";//改变status状态,隐藏loading
	emit("changeStatus", status);
};
//图片加载失败时
function imgLoadError(event) {
	message.error("用户不存在或查询失败");
	loaded.value = false;
	let status = "error";//改变status状态,显示error
	emit("changeStatus", status);
};
</script>
<style lang="scss" scoped>
.search-result {
	text-align: center;
	background-color: #54454C;
	padding: 10px 0px;
	height: 712px;
	// overflow: hidden;

	.result :deep(.ant-spin) {
		position: unset;
	}
}

.result-image {
	width: -webkit-fill-available;
	border-radius: 14px;
}

.progress-icon {
	padding-top: 250px;
	display: inline-flex;
	flex-direction: column;

	.progress-icon-loading {
		display: inline-flex;
		flex-direction: column;
	}
}
</style>