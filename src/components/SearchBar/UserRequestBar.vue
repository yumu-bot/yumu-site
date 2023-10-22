<!-- 
 * @description: 玩家查询搜索框(支持功能：ppm/bpa/score/scores)
 * @fileName: UserRequestBar.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-19 14:22:38
 * @others:
!-->
<template>
	<div class="search-bar">
		<!-- 查询功能切换 -->
		<div>
			<a-select class="function-bar" :options="functions" size="large" v-model:value=state.nowfunction>
				<a-select-option v-for="(item, index) in functions" :key="index" :label="item.label"
					:value="item.value"></a-select-option>
			</a-select>
		</div>
		<Infos v-if="state.type === 0" :state="state" :emitParams="emitParams" :getCommand="getCommand"></Infos>
		<Scores v-if="state.type === 1" :state="state" :emitParams="emitParams"></Scores>
		<MapScore v-if="state.type === 2" :state="state" :emitParams="emitParams">
		</MapScore>
	</div>
</template>
<script setup>
import { message } from 'ant-design-vue';
import { reactive, onMounted, watch } from 'vue';
import Infos from '../UserRequest/Infos.vue';
import Scores from '../UserRequest/Scores.vue';
import MapScore from '../UserRequest/MapScore.vue';
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
	// 游玩模组列表
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
	for (let i = 0; i < state.mods.length; i++) {
		// NM不能与其他mod组合
		if (val.length >= 1 && val.includes("NM")) {
			if (state.mods[i].value !== "NM") {
				state.mods[i].disabled = true;
				state.isInvalid = val.length > 1 ? true : false;//选择包含NM的其他mod组合禁止请求
			}
		} else if (val.includes("DT") || val.includes("NC")) {
			let e;
			state.mods.map((item) => {
				if (item.value === "HT") {
					e = state.mods.indexOf(item)
				}
			})
			//DT/NC不能共存，不能与HT组合
			if (val.includes("DT")) {
				state.mods[i].disabled = state.mods[i].value === "NC" ? true : false;
				state.mods[e].disabled = true;
			} else {
				state.mods[i].disabled = state.mods[i].value === "DT" ? true : false;
				state.mods[e].disabled = true;
			}
		} else if (val.includes("HR") || val.includes("EZ")) {
			//EZ/HR不能组合
			if (val.includes("HR")) {
				state.mods[i].disabled = state.mods[i].value === "EZ" ? true : false;

			} else {
				state.mods[i].disabled = state.mods[i].value === "HR" ? true : false;
			}
		} else if (val.includes("SD") || val.includes("PF")) {
			let e;
			state.mods.map((item) => {
				if (item.value === "NM") {
					e = state.mods.indexOf(item)
				}
			})
			//SD/PF不能共存，不能与NM组合
			if (val.includes("SD")) {
				state.mods[i].disabled = state.mods[i].value === "PF" ? true : false;
				state.mods[e].disabled = true;
			} else {
				state.mods[i].disabled = state.mods[i].value === "SD" ? true : false;
				state.mods[e].disabled = true;
			}
		}
		else {
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
})
// 监听切换查询范围
watch(() => state.scoreType, (val) => {
	state.maxRange = val === 'bp-days' ? 999 : 100;
	if (state.isWideScreen) {
		state.inputBarStyle.width = val === 'score' ? "200px" : "460px";
	};
});
// 监听谱面id规范(表单验证)
watch(() => state.bid, (oldVal, newVal) => {
	if (isNaN(newVal)) {
		message.warning("谱面id应该为纯数字");
		state.isInvalid = true;
	} else if (oldVal == "" || newVal === "") {
		state.isInvalid = true;
	} else {
		state.isInvalid = false;
	};
});
watch(() => state.type, (val) => {
	if (state.isWideScreen) {
		state.inputBarStyle.width = val === 1 ? "460px" : "570px";
	}
	if (val === 2) {
		state.inputBarStyle.width = "400px";
	}
});
watch(() => state.isWideScreen, (val) => {
	if (!val) {
		state.inputBarStyle = {};
	} else {
		// state.inputBarStyle.width = state.type === 1 ? "460px" : "570px";
		if (state.type === 1) {
			state.inputBarStyle.width = state.scoreType === 'score' ? "200px" : "460px";
		};
	}
});

</script>
<style lang="scss" scoped>
@import "src/assets/css/variables.scss";

.search-bar {
	padding: 10px 20px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	width: -webkit-fill-available;
	background-color: #54454C;
	column-gap: 20px;

	.function-bar {
		width: 160px;
	}

	// .input-bar {
	// 	width: 570px;
	// }

	.plus-bar {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		column-gap: 20px;
	}
}

.copy-button {
	display: flex;
	justify-content: space-around;

	:deep(.anticon) {
		color: #ffffff;

		:hover {
			color: #ffffff79;
		}

		:active {
			color: #ffffff28;
		}

		svg {
			padding-top: 6px;
		}
	}
}

// 媒体查询
@media screen and (max-width:$xl) {
	.search-bar {
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: flex-start;
		row-gap: 20px;

		.function-bar {
			width: 140px;
		}

		.input-bar {
			width: 300px;
		}
	}
}

@media screen and (max-width:$lg) {}

@media screen and (max-width:$md) {}

@media screen and (max-width:$sm) {
	.search-bar {
		.function-bar {
			width: 140px;
		}

		.input-bar {
			width: 370px;
		}

		.plus-bar {
			flex-wrap: wrap;
			justify-content: flex-start;
			column-gap: 20px;
			row-gap: 20px;
		}
	}
}

@media screen and (max-width:$xs) {
	.search-bar {
		.function-bar {
			width: 140px;
		}

		.input-bar {
			width: 265px;
		}
	}
}
</style>