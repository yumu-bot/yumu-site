<!-- 
 * @description: 玩家查询页组件
 * @fileName: User.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-19 14:37:35
 * @version: V1.0.0 
!-->
<template>
	<div class="user-page">
		<!-- 玩家查询搜索框(支持用户名+mode查询) -->
		<UserRequestBar :modes="state.modes" :functions="state.functions" :init="init">
		</UserRequestBar>
		<!-- 搜索结果banner -->
		<SearchResultBanner :status="state.status" :imgUrl="state.imgUrl" :spinning="state.spinning"
			@changeStatus="changeStatus" @isSpinning="isSpinning"></SearchResultBanner>
	</div>
</template>

<script setup name="User">
import { message } from 'ant-design-vue';
import SearchResultBanner from '../../components/SearchResult/SearchResultBanner.vue';
import UserRequestBar from '../../components/SearchBar/UserRequestBar.vue'
import { watch, provide, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
const state = reactive({
	baseUrl: "",
	username: "",//用户名
	imgUrl: "",//图片地址
	spinning: false,//加载状态
	status: "waiting",//查询状态
	mode: "osu",//指定查询mode,默认为osu
	// 游戏模式列表
	modes: [
		{ label: "osu", value: "osu", id: "0" },
		{ label: "taiko", value: "taiko", id: "1" },
		{ label: "catch", value: "catch", id: "2" },
		{ label: "mania", value: "mania", id: "3" },
	],
	// 功能列表
	functions: [
		{ label: t('userRequestOptions.ppm'), value: "ppm" },
		{ label: t('userRequestOptions.bpa'), value: "bpa" },
		{ label: t('userRequestOptions.score'), value: "score" },
		{ label: t('userRequestOptions.scores'), value: "scores" },
		{ label: t('userRequestOptions.mapScore'), value: "mapScore" },
	],
	nowfunction: "ppm",//指定查询功能,默认为ppm
	type: 0,//功能类型
	key: 0,//
	bid: "",//
	scoreType: "",//成绩功能类型
	mod: "",
	isInvalid: false,
});
//发送查询请求
async function sendRequest() {
	debugger
	// 表单验证
	if (state.nowfunction === "mapScore") {
		state.isInvalid = state.bid === "" || state.username === "" ? true : false;// 谱面查询双重验证
		if (state.username === "") {
			message.warning(t('notification.blankUsername'));
		}
		if (state.bid === "") {
			message.warning(t('notification.blankBeatmapid'));
		}
	} else {
		state.isInvalid = state.username === "" ? true : false;
		if (state.username === "") {
			message.warning(t('notification.blankUsername'));
		}
	}
	if (state.isInvalid === false) {
		state.spinning = true;//图片正在加载
		state.status = "loading";
		// 支持用户名+mode查询传参
		if (state.type === 0) {
			getPerformancePoint();
		}
		// 支持用户名+mode+可选附加项传参
		if (state.type === 1 || state.type === 2) {
			getScore();
		}
		// 图片加载超时切换状态为error,超时限制为1分钟
		let timer = setTimeout(() => {
			if (state.status !== "") {
				state.status = "error";
				message.warning(t('notification.timeout'));
				clearTimeout(timer);
			} else {
				// 若加载成功,清除定时器
				clearTimeout(timer);
			}
		}, 60000);
	}
};
provide("modes", state.modes);

//修改查询状态(emit)
function changeStatus(status) {
	state.status = status;
};
// 修改加载状态(emit)
function isSpinning() {
	state.spinning = false;//图片加载成功
};
// 初始化传递参数,触发查询
function init(data) {
	state.username = data.username;
	state.mode = data.mode;
	state.nowfunction = data.nowfunction;
	state.type = data.type;
	state.scoreType = data.scoreType;
	state.key = data.key;
	state.bid = data.bid;
	state.mod = data.mod;
	sendRequest();
};
// 查询ppm/bpa
function getPerformancePoint() {
	let paramsObj = {
		u1: state.username,
		mode: state.mode,
	}
	state.imgUrl = state.baseUrl + `/${state.nowfunction}?u1=${paramsObj.u1}&mode=${paramsObj.mode}`;
};
// 查询score/scores
function getScore() {
	let paramsObj = {
		u1: state.username,
		mode: state.mode,
		scoreType: state.scoreType,//score类型:pr/re/bp/score scores类型:bp-days/bp-range/pr/re
		value: state.key,//查询序号/范围(1-x) x为100或999
		bid: parseInt(state.bid),//谱面id
		mod: state.mod,//游玩mod
	}
	//发送查询请求
	// debugger
	if (state.nowfunction === "mapScore") {
		let mod = paramsObj.mod === "" ? "" : paramsObj.mod.toString().replaceAll(/,/g, "");
		// 查询谱面成绩
		if (mod === "") {
			// 不查询指定mod(默认查询分数最高成绩)
			// state.imgUrl = state.baseUrl + `/${state.nowfunction}?u1=${paramsObj.u1}&mode=${paramsObj.mode}&bid=${paramsObj.bid}`;
			state.imgUrl = state.baseUrl + `/score?u1=${paramsObj.u1}&mode=${paramsObj.mode}&bid=${paramsObj.bid}`;
		} else {
			// 查询指定mod
			// state.imgUrl = state.baseUrl + `/${state.nowfunction}?u1=${paramsObj.u1}&mode=${paramsObj.mode}&bid=${paramsObj.bid}&mods=${mod}`;
			state.imgUrl = state.baseUrl + `/score?u1=${paramsObj.u1}&mode=${paramsObj.mode}&bid=${paramsObj.bid}&mods=${mod}`;
		}
	} else {
		// 查询pr/re/bp/bp-days/bp-range
		if (state.nowfunction === 'score') {
			state.imgUrl = state.baseUrl + `/${state.nowfunction}/${paramsObj.scoreType}?u1=${paramsObj.u1}&mode=${paramsObj.mode}&n=${paramsObj.value}`;
		} else {
			state.imgUrl = state.baseUrl + `/${state.nowfunction}/${paramsObj.scoreType}?u1=${paramsObj.u1}&mode=${paramsObj.mode}&m=${paramsObj.value}`;
		}
	}
};
onMounted(() => {
	state.imgUrl = "";
	state.baseUrl = import.meta.env.VITE_BASEURL;
});
// 国际化
watch(locale, (val) => {
	for (let item of state.functions) {
		item.label = t(`userRequestOptions.${item.value}`);
	}
}, { immediate: true, deep: true })

</script>

<style lang="scss" scoped>
.user-page {
	width: 100%;
}
</style>