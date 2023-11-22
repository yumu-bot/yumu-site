<!-- 
 * @description: 浮动组件
 * @fileName: FloatButtons.vue 
 * @author: SIyuyuko 
 * @date: 2023-11-20 15:20:33
 * @others: 
!-->
<template>
	<!-- 谱面播放器 -->
	<div class="beatmap-player" :style="playerStyle">
		<div class="beatmap-query">
			<a-input-search class="ant-input-search" v-model:value="bid" placeholder="请输入谱面ID" @search="onSearch"
				:bordered="true" allow-clear enter-button />
		</div>
		<vue-plyr ref="plyr">
			<audio controls crossorigin playsinline autoplay source=url>
				<source :src="url" type="audio/mp3" />
			</audio>
		</vue-plyr>
	</div>
	<!-- 浮动按钮组 -->
	<a-float-button-group>
		<a-float-button class="backtop-btn" tooltip="听音乐" @click="togglePlayer()">
			<template #icon>
				<CustomerServiceOutlined :spin="isPlaying?true:false"/>
			</template>
		</a-float-button>
		<a-back-top class="backtop-btn" tooltip="回到顶部" :visibilityHeight="30" />
	</a-float-button-group>
</template>
<script setup name="FloatButtons">
import { CustomerServiceOutlined } from '@ant-design/icons-vue';
import { onMounted, ref, watch } from 'vue';
let plyr = ref();// 播放器实例
let bid = ref("");// 谱面ID
let url = ref("");// 音乐url
let playerStyle = ref({}); // 播放器样式
let isPlaying = ref(false);// 是否正在播放
let isShow = ref(false);// 是否显示播放器
const onSearch = ref(() => { });// 搜索事件钩子
// 是否显示播放器
function togglePlayer() {
	playerStyle.value = isShow.value ? {
		// 折叠播放器
		right: "-400px",
		transition: "right 0.5s ease"
	} : {
		// 展开播放器
		right: "0px",
		transition: "right 0.5s ease"
	}
	isShow.value = !isShow.value;
}
// 播放器初始化
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
	isPlaying.value = plyr.value.player.playing;
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
	right: -400px;
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