<!-- 
 * @description: 浮动组件
 * @fileName: FloatButtons.vue 
 * @author: SIyuyuko 
 * @date: 2023-11-20 15:20:33
 * @others: 
!-->
<template>
	<!-- 谱面播放器 -->
	<div class="beatmap-player">
		<div class="beatmap-query">
			<a-input-search class="ant-input-search" v-model:value="bid" placeholder="请输入谱面ID" @search="onSearch"
				:bordered="true" allow-clear enter-button />
		</div>
		<vue-plyr ref="plyr">
			<audio controls crossorigin playsinline autoplay source=url>
				<source :src="url" type="audio/mp3" />
				<!-- <source src="https://sp.365246692.xyz/api/file/map/song/4092433" type="audio/mp3" /> -->
			</audio>
		</vue-plyr>
	</div>
	<!-- 浮动按钮组 -->
	<a-float-button-group>
		<a-float-button class="backtop-btn" />
		<a-back-top class="backtop-btn" :visibilityHeight="30" />
	</a-float-button-group>
</template>
<script setup name="FloatButtons">
import { onMounted, ref, watch } from 'vue';
let plyr = ref();
let title = ref("");
let bid = ref("");
let url = ref("")
const onSearch = ref(() => { })
function initPlyr(url) {
	// 音频信息配置
	plyr.value.player.source = {
		type: 'audio',
		title: 'Example title',
		sources: [
			{
				src: url,
				type: 'audio/mp3',
			},
		],
	};
	console.log(plyr.value);
}
onMounted(() => {
	// initPlyr();
	console.log(plyr.value);
});
watch(bid, (val) => {
	if (!isNaN(val)) {
		let param = "https://sp.365246692.xyz/api/file/map/song/" + val;
		onSearch.value = (val) => {
			if (val !== "" && !isNaN(val)) {
				url.value = param;
				console.log(url.value);
				initPlyr(url.value);
			}
		}
	}
})
</script>
<style lang="scss" scoped>
.beatmap-player {
	height: auto;
	width: 400px;
	position: fixed;
	z-index: 3;
	right: 0;
	top: 685px;
	color: #ffffff;
	background-color: #2A2226;

	.beatmap-query {
		display: flex;
		column-gap: 20px;

		:deep(.ant-input-search .ant-input-group .ant-input-affix-wrapper:not(:last-child)) {
			border-start-start-radius: 0px;
			border-end-start-radius: 0px;
		}

		:deep(.ant-input-search >.ant-input-group >.ant-input-group-addon:last-child .ant-input-search-button) {
			padding-top: 0;
			padding-bottom: 0;
			border-start-start-radius: 0;
			border-start-end-radius: 0px;
			border-end-end-radius: 0px;
			border-end-start-radius: 0;
			border-color: rgb(255, 255, 255, .6);
		}

		:deep(.ant-input-search .ant-input-group .ant-input-affix-wrapper:not(:last-child)) {
			background-color: #2A2226;
			border-color: rgb(255, 255, 255, .6);
		}

		:deep(.ant-input-clear-icon) {
			color: rgb(255, 255, 255, .6);
		}

		:deep(.ant-input) {
			background-color: #2A2226;
			color: #ffffff;
		}

		::placeholder {
			color: rgb(255, 255, 255, .6);
		}

	}
}

.backtop-btn {
	:deep(.ant-float-btn-body) {
		background-color: #2A2226;

		.ant-float-btn-icon {
			color: #ffffff;
		}
	}

	:deep(.ant-float-btn-body:hover) {
		background-color: #54454C;
	}
}
</style>