<!-- 
 * @description: 玩家查询搜索框(支持功能：ppm/bpa/score/scores)
 * @fileName: UserRequestBar.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-19 14:22:38
 * @others:--
!-->
<template>
	<div class="search-bar">
		<!-- 查询功能切换 -->
		<div>
			<a-select class="function-bar" :options="functions" size="large" v-model:value=state.nowfunction>
				<a-select-option v-for="(item, index) in functions" :key="index"
					:label="item.label" :value="item.value"></a-select-option>
			</a-select>
		</div>
		<Infos v-if="state.type === 0" :state="state" :emitParams="emitParams" :getCommand="getCommand"></Infos>
		<Scores v-if="state.type === 1" :state="state" :emitParams="emitParams"></Scores>
		<MapScore v-if="state.type === 2" :state="state" :emitParams="emitParams">
		</MapScore>
	</div>
</template>
<script setup name="UserRequestBar">
import { message } from 'ant-design-vue';
import { reactive, onMounted, watch } from 'vue';
import Infos from '../UserRequest/Infos.vue';
import Scores from '../UserRequest/Scores.vue';
import MapScore from '../UserRequest/MapScore.vue';
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
import { findMod, check } from '@/utils/util.js';
const state = reactive({
	username: "",//用户名
	nowfunction: "ppm",//指定查询功能,默认为ppm
	mode: "osu",//指定查询mode,默认为osu
	key: "",//bp/pr/re序号
	bid: "",//谱面id
	mod: [],//选定mod
	isScore: false,//score功能是否为查询谱面成绩,默认false
	scoreType: "pr",//成绩类型
	command: "",//静态指令
	type: 0,//功能类型
	//功能列表
	functionList: [
		["ppm", "bp/analysis"],//支持用户名+mode查询 type:0
		["score", "scores"],//支持用户名+mode+可选附加参数查询 type:1
		["mapScore"],
	],
	//单个成绩查询类型
	scoreTypes: [
		{ label: "最近", value: "score/recent" },
		{ label: "最近通过", value: "score/pass" },
		{ label: "最好成绩", value: "bp" },
		// { label: "谱面成绩", value: "score" },
	],
	//多个成绩查询类型
	scoresTypes: [
		{ label: "最近", value: "score/recents" },
		{ label: "最近通过", value: "score/passes" },
		{ label: "最好(bp范围)", value: "bp/scores" },
		{ label: "最好(天数范围)", value: "bp/today" },
	],
	scoreTypeList: [],
	// 游玩模组列表 disabled默认为false,表示启用
	mods: [
		{ label: "NM", value: "NM", disabled: false, bit: 0 },
		{ label: "DT", value: "DT", disabled: false, bit: 1 << 6 },
		{ label: "HD", value: "HD", disabled: false, bit: 1 << 3 },
		{ label: "HR", value: "HR", disabled: false, bit: 1 << 4 },
		{ label: "NC", value: "NC", disabled: false, bit: 1 << 9 },
		{ label: "SO", value: "SO", disabled: false, bit: 1 << 12 },
		{ label: "NF", value: "NF", disabled: false, bit: 1 },
		{ label: "EZ", value: "EZ", disabled: false, bit: 1 << 1 },
		{ label: "SD", value: "SD", disabled: false, bit: 1 << 5 },
		{ label: "HT", value: "HT", disabled: false, bit: 1 << 8 },
		{ label: "PF", value: "PF", disabled: false, bit: 1 << 14 },
		{ label: "FL", value: "FL", disabled: false, bit: 1 << 18 },
		{ label: "FI", value: "FI", disabled: true, bit: 1 << 20 },//mania限定 Fade In
		{ label: "MR", value: "MR", disabled: true, bit: 1 << 30 },//mania限定 Mirror

	],
	maxRange: 100,//查询范围上限 bp-days时为999,其余情况为100
	isInvalid: false,//是否满足请求条件
	screenWidth: null,
	isWideScreen: true,
	inputBarStyle: {
		width: "570px",
	}
});
const props = defineProps({
	//游戏模式列表
	modes: {
		type: Array,
		default: []
	},
	// 功能列表
	functions: {
		type: Array,
		default: []
	},
	// 数据初始化
	init: {
		type: Function,
		default: () => { }
	}

});

// 获取静态指令
// 当前支持指令:ppm/bpa
function getCommand(nowfunction, mode, username) {
	let modeId;
	for (let i = 0; i < props.modes.length; i++) {
		if (props.modes[i].value === mode) {
			modeId = props.modes[i].id;
		}
	}
	if (state.type === 0) {
		// 指令:ppm/bpa
		state.command = `!${nowfunction}:` + modeId + " " + username;
	} else {
		// 指令:score/scores(主程序功能未完成)
		let key = state.key === 0 ? "" : state.key;
		let scoreParam = state.scoreType === "score" ? state.bid : key;
		state.command = `!${state.scoreType} ${scoreParam}:` + modeId;
	}

};
// 传递请求参数
function emitParams() {
	if (state.isInvalid) {

	} else {
		let data = {
			username: state.username,
			mode: state.mode,
			nowfunction: state.nowfunction,
			type: state.type,
			scoreType: state.scoreType,
			key: state.key === "" ? 1 : state.key,
			bid: state.bid,
			mod: state.mod,
		}
		props.init(data);
	}
};
// 获取选定功能类型
function getFunctionType() {
	for (let i = 0; i < state.functionList.length; i++) {
		if (state.functionList[i].includes(state.nowfunction)) {
			state.type = i;
		}
	}
};
// mod组合验证
// nm- sd / pf
// ez- hr
// ht - dt / nc
// fl - hd(骂娘特供)
function checkMods(val) {
	// mode为mania时的额外判断
	let isMania = state.mode === "mania" ? false : true;
	let e;
	findMod(e, "FI", isMania, state);
	findMod(e, "MR", isMania, state);
	// 位运算判断
	if (val.length > 0) {
		let arr = Object.keys(val);
		let selectModName = val[arr[arr.length - 1]];
		let e;
		state.mods?.map((item) => {
			if (item.value === selectModName) {
				e = state.mods.indexOf(item);//找到指定modName对象
			};
		});
		let selectMod = state.mods[e];
		for (let i of state.mods) {
			check(i, selectMod, state);
		};
		// 选择mod为SD/PF的额外判断
		// SD/PF不能共存，不能与NM组合
		if (selectModName === "SD" || "PF") {
			findMod(e, "NM", true, state);
		};
	} else {
		// 清空选择时重置禁用状态
		state.mods?.map((item) => {
			item.disabled = false;
		});
		findMod(e, "FI", isMania, state);
		findMod(e, "MR", isMania, state);
	}
};

function getScreenWidth() {
	state.screenWidth = window.screen.width;
	state.isWideScreen = state.screenWidth === 1920 || state.screenWidth > 1920 ? true : false;
};
onMounted(() => {
	setInterval(() => {
		getScreenWidth();
	}, 1000);
});
// 监听功能列表选择切换下拉项
watch(() => state.nowfunction, (val) => {
	getFunctionType();
	if (val === "score") {
		state.scoreTypeList = state.scoreTypes;
		state.scoreType = "score/pass";//默认选择最近通过项
	};
	if (val === "scores") {
		state.scoreTypeList = state.scoresTypes;
		state.scoreType = "bp/scores";//默认选择最好成绩(bp范围)项
	};
});
// 监听游玩mod选项进行mod组合校验
watch(() => state.mod, (val) => {
	checkMods(val);
});
watch(() => state.mode, (val) => {
	let e;
	if (val === "mania") {
		findMod(e, "FI", false, state);
		findMod(e, "MR", false, state);
	} else {
		findMod(e, "FI", true, state);
		findMod(e, "MR", true, state);
	}
	state.mod = [];// 重置以初始化游玩模组列表
});
// 监听切换查询范围
watch(() => state.scoreType, (val) => {
	state.maxRange = val === 'bp-days' ? 999 : 100;
	if (state.isWideScreen) {
		// state.inputBarStyle.width = val === 'score' ? "200px" : "445px";
	};
});
// 监听谱面id规范(表单验证)
watch(() => state.bid, (oldVal, newVal) => {
	if (isNaN(newVal)) {
		message.warning(t('notification.badBeatmapid'));
		state.isInvalid = true;
	} else if (oldVal == "" || newVal === "") {
		state.isInvalid = true;
	} else {
		state.isInvalid = false;
	};
});
watch(() => state.type, (val) => {
	if (state.isWideScreen) {
		// state.inputBarStyle.width = val === 1 ? "445px" : "570px";
	}
	if (val === 2) {
		// state.inputBarStyle.width = "400px";
	}
});
watch(() => state.isWideScreen, (val) => {
	if (!val) {
		state.inputBarStyle = {};
	} else {
		// state.inputBarStyle.width = state.type === 1 ? "445px" : "570px";
		if (state.type === 1) {
			// state.inputBarStyle.width = state.scoreType === 'score' ? "200px" : "445px";
		};
	}
});
// 国际化
watch(locale, (val) => {
	for (let item of state.scoreTypes) {
		item.label = t(`scoreTypeOptions.${item.value}`);
	};
	for (let item of state.scoresTypes) {
		item.label = t(`scoresTypeOptions.${item.value}`);
	}
}, { immediate: true, deep: true })
</script>
<style lang="scss" scoped></style>