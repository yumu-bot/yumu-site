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
		<div class="beatmap-info" :style="bgStyle" @click="jumpBeatmap(bid)" title="点击查看谱面信息">
			<div v-if="info && !spinning" class="beatmap-title">
				<span class="title">{{ info.beatmapset?.title }}</span>
				<span class="artist">{{ info.beatmapset?.artist }}</span>
			</div>
			<div v-else="spinning" class="beatmap-title">
				<a-spin :spinning="spinning" tip="Loading..." size="small" style="color: inherit;"></a-spin>
			</div>
		</div>
		<div class="beatmap-query">
			<a-input-search class="ant-input-search" v-model:value="bid" placeholder="请输入谱面ID" @search="onSearch"
				:bordered="true" allow-clear enter-button />
		</div>
		<vue-plyr ref="plyr">
			<audio controls crossorigin playsinline autoplay source=songUrl>
				<source :src="songUrl" type="audio/mp3" />
			</audio>
		</vue-plyr>
	</div>
	<!-- 浮动按钮组 -->
	<a-float-button-group>
		<a-float-button class="backtop-btn" tooltip="听音乐" @click="togglePlayer()">
			<template #icon>
				<CustomerServiceOutlined :spin="isPlaying ? true : false" />
			</template>
		</a-float-button>
		<a-back-top class="backtop-btn" tooltip="回到顶部" :visibilityHeight="30" />
	</a-float-button-group>
</template>
<script setup name="FloatButtons">
import { CustomerServiceOutlined } from '@ant-design/icons-vue';
import { onMounted, ref, watch } from 'vue';
import { getBeatmapInfo, getBeatmapBg } from '@/api/data_api.js'
let plyr = ref();// 播放器实例
let bid = ref("");// 谱面ID
let songUrl = ref("");// 音乐url
let bgUrl = ref("");// 谱面背景url
let info = ref();// 谱面信息
let playerStyle = ref({}); // 播放器样式
let bgStyle = ref({});// 封面样式
let isPlaying = ref(false);// 是否正在播放
let isShow = ref(false);// 是否显示播放器
let spinning = ref(false);// 是否正在加载
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
function initPlyr(songUrl) {
	// 音频信息配置
	plyr.value.player.source = {
		type: 'audio',
		title: 'Example title',
		sources: [
			{
				src: songUrl,
				type: 'audio/mp3',
			},
		],
	};
	// 监听是否播放
	plyr.value.player.on('play', (playing) => {
		isPlaying.value = playing.detail.plyr.playing;
	});
	// 监听是否暂停
	plyr.value.player.on('pause', (playing) => {
		isPlaying.value = playing.detail.plyr.playing;
	})
	console.log(plyr.value);
};
// 获取谱面信息
async function getBeatMap(bid) {
	spinning.value = true;
	await getBeatmapInfo(bid).then(res => {
		if (res.status === 200 && res.data) {
			info.value = res.data.data;
		}
	});
	await getBeatmapBg(bid).then(res => {
		bgUrl.value = res.request.responseURL;
		bgStyle.value = {
			"background-image": `url(${bgUrl.value})`,
			"background-position": "center",
			"background-size": "cover",
			"margin-bottom": "0px",
			"transition": "margin-bottom 0.5s ease"
		}
	});
	spinning.value = false;
};
// 谱面信息官网跳转
function jumpBeatmap(bid) {
	let url = "http://osu.ppy.sh/b/" + bid;
	window.open(url, "_blank");
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
				getBeatMap(val);
				songUrl.value = param;
				initPlyr(songUrl.value);
			}
		}
	}
});
</script>
<style lang="scss" scoped>
.beatmap-player {
	height: auto;
	width: 400px;
	position: fixed;
	z-index: 3;
	right: -400px;
	top: 625px;
	color: #ffffff;
	background-color: #2A2226;

	.beatmap-info {
		display: flex;
		height: 60px;
		z-index: -1;
		margin-bottom: -60px;
		position: relative;

		:hover {
			border-width: 1px;
			border-style: solid;
			border-color: rgb(255, 255, 255, .6);

			:not(div) {
				border: none;
			}

		}

		:active {
			border-color: rgb(255, 255, 255);
		}

		.beatmap-title {
			width: 100%;
			display: flex;
			flex-direction: column;
			text-align: center;
			justify-content: center;
			backdrop-filter: brightness(0.4) blur(0.4px);

			.title {
				font-size: 16px;
			}

			.artist {
				font-size: 14px;
			}

			:deep(.ant-spin) {
				position: unset;
				color: inherit;

				.ant-spin-dot-item {
					background-color: #ffffff;
				}

			}


			:hover {
				border: none;
			}

		}
	}

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