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
					:label="$t(`userRequestOptions.${item.value}`)" :value="item.value"></a-select-option>
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
import { findMod } from '@/utils/util.js';
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
		["ppm", "bpa"],//支持用户名+mode查询 type:0
		["score", "scores"],//支持用户名+mode+可选附加参数查询 type:1
		["mapScore"],
	],
	//单个成绩查询类型
	scoreTypes: [
		{ label: "最近", value: "re" },
		{ label: "最近通过", value: "pr" },
		{ label: "最好成绩", value: "bp" },
		// { label: "谱面成绩", value: "score" },
	],
	//多个成绩查询类型
	scoresTypes: [
		{ label: "最近", value: "re" },
		{ label: "最近通过", value: "pr" },
		{ label: "最好(bp范围)", value: "bp-range" },
		{ label: "最好(天数范围)", value: "bp-days" },
	],
	scoreTypeList: [],
	// 游玩模组列表 disabled默认为false,表示启用
	mods: [
		{ label: "NM", value: "NM", disabled: false },
		{ label: "DT", value: "DT", disabled: false },
		{ label: "HD", value: "HD", disabled: false },
		{ label: "HR", value: "HR", disabled: false },
		{ label: "NC", value: "NC", disabled: false },
		{ label: "EZ", value: "EZ", disabled: false },
		{ label: "SO", value: "SO", disabled: false },
		{ label: "NF", value: "NF", disabled: false },
		{ label: "SD", value: "SD", disabled: false },
		{ label: "HT", value: "HT", disabled: false },
		{ label: "PF", value: "PF", disabled: false },
		{ label: "FL", value: "FL", disabled: false },
		{ label: "FI", value: "FI", disabled: true },//mania限定 Fade In
		{ label: "MR", value: "MR", disabled: true },//mania限定 Mirror

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
// fl - hd(骂娘特供)(暂不支持mania)
function checkMods(val) {
	let e;
	if (state.mode === "mania") {
		findMod(e, "FI", false, state);
		findMod(e, "MR", false, state);
	} else {
		findMod(e, "FI", true, state);
		findMod(e, "MR", true, state);
	}
	// i 为当前被选择的mod
	for (let i = 0; i < state.mods.length; i++) {
		// NM不能与其他mod组合
		if (val.length >= 1 && val.includes("NM")) {
			if (state.mods[i].value !== "NM") {
				state.mods[i].disabled = true;
				state.isInvalid = val.length > 1 ? true : false;//选择包含NM的其他mod组合禁止请求
			}
		} else if (val.includes("DT") || val.includes("NC")) {
			findMod(e, "HT", true, state);
			//DT/NC不能共存，不能与HT组合
			if (val.includes("DT")) {
				state.mods[i].disabled = state.mods[i].value === "NC" ? true : false;
				if (val.includes("HR")) {
					findMod(e, "EZ", true, state);
				};
				if (val.includes("EZ")) {
					findMod(e, "HR", true, state);
				};
			} else if (val.includes("NC")) {
				state.mods[i].disabled = state.mods[i].value === "DT" ? true : false;
				if (val.includes("HR")) {
					findMod(e, "EZ", true, state);
				};
				if (val.includes("EZ")) {
					findMod(e, "HR", true, state);
				};
			}
		} else if (val.includes("HR") || val.includes("EZ")) {
			//EZ/HR不能组合
			if (val.includes("HR")) {
				state.mods[i].disabled = state.mods[i].value === "EZ" ? true : false;

			} else {
				state.mods[i].disabled = state.mods[i].value === "HR" ? true : false;
			}
		} else if (val.includes("SD") || val.includes("PF")) {
			findMod(e, "NM", true, state);
			//SD/PF不能共存，不能与NM组合
			if (val.includes("SD")) {
				state.mods[i].disabled = state.mods[i].value === "PF" ? true : false;
			} else {
				state.mods[i].disabled = state.mods[i].value === "SD" ? true : false;
			}
		} else if (val.includes("FL") || val.includes("HD")) {
			if (state.mode === "mania") {
				// FL/HD不能共存(mania限定)
				if (val.includes("FL")) {
					state.mods[i].disabled = state.mods[i].value === "HD" ? true : false;

				} else {
					state.mods[i].disabled = state.mods[i].value === "FL" ? true : false;
				}
			}
		}
		else {
			if (state.mode === "mania") {
				findMod(e, "FI", false, state);
				findMod(e, "MR", false, state);
			} else {
				findMod(e, "FI", true, state);
				findMod(e, "MR", true, state);
			}
			state.mods[i].disabled = false;
			state.isInvalid = false;
		}
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
		state.scoreType = "pr";//默认选择最近通过项
	};
	if (val === "scores") {
		state.scoreTypeList = state.scoresTypes;
		state.scoreType = "bp-range";//默认选择最好成绩(bp范围)项
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
		item.label = t(`scoreTypeOptions.${item.value}`);
	}
}, { immediate:true,deep: true })
</script>
<style lang="scss" scoped></style>