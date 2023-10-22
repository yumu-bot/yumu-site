<!-- 
 * @description: 玩家查询搜索框(支持功能：ppm/bpa/score/scores)
 * @fileName: UserRequestBar.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-19 14:22:38
 * @version: V1.0.0 
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
		<!-- 用户名输入框 -->
		<div>
			<a-input class="input-bar" :class="state.isWideScreen" :style="state.inputBarStyle" placeholder="请输入用户名"
				size="large" v-model:value=state.username allow-clear @keyup.enter="emitParams()">
			</a-input>
		</div>
		<!-- score/scores功能附加项  -->
		<div class="plus-bar" v-show="state.type === 1">
			<!-- 子功能类型:pr/re/bp/score -->
			<a-select :options="state.scoreTypeList" size="large" style="width:155px;" v-model:value=state.scoreType>
				<a-select-option v-for="(item, index) in state.scoreTypeList" :key="index" :label="item.label"
					:value="item.value"></a-select-option>
			</a-select>
			<!-- pr/bp范围查询 -->
			<a-tooltip :title="'查询范围(1-' + state.maxRange + ')'" arrow-point-at-center>
				<a-input-number v-model:value=state.key :min="1" :max="state.maxRange" v-show="state.scoreType !== 'score'"
					style="width:80px;" size="large" @keyup.enter="emitParams()" placeholder="1"></a-input-number>
			</a-tooltip>
			<!-- 谱面成绩查询 -->
			<a-input placeholder="谱面id" v-model:value=state.bid v-show="state.scoreType === 'score'" size="large"
				style="width:130px;" allow-clear @keyup.enter="emitParams()"></a-input>
			<!-- 附加参数:游玩mods(仅支持谱面成绩查询) -->
			<a-select mode="multiple" :options="state.mods" size="large" style="width:150px;" v-model:value=state.mod
				v-show="state.scoreType === 'score'" :max-tag-count="1" :max-tag-text-length="2" allow-clear
				placeholder="游玩mod">
				<a-select-option v-for="(item, index) in state.mods" :key="index" :label="item.label"
					:value="item.value"></a-select-option>
			</a-select>
		</div>
		<!-- 游戏模式切换 -->
		<a-select style="width:110px;" :options="props.modes" size="large" v-model:value=state.mode>
			<a-select-option v-for="(item, index) in props.modes" :key="index" :label="item.label"
				:value="item.value"></a-select-option>
		</a-select>
		<!-- 静态指令复制 -->
		<div v-show="state.type === 0">
			<a-tooltip :title=state.command arrow-point-at-center>
				<a-button style="width: 130px;" size="large"
					@mouseenter="getCommand(state.nowfunction, state.mode, state.username)">
					<div class="copy-button">
						<span>复制到剪贴板</span>
						<a-typography-paragraph :copyable="{ tooltip: false, text: state.command }">
						</a-typography-paragraph>
					</div>
				</a-button>
			</a-tooltip>
		</div>
		<!-- 查询按钮 -->
		<a-button style="width: 70px;" size="large" @click="emitParams()" :disabled="state.isInvalid">生成!</a-button>
	</div>
</template>
<script setup>
import { message } from 'ant-design-vue';
import { reactive, onMounted, watch } from 'vue';
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
	],
	//单个成绩查询类型
	scoreTypes: [
		{ label: "最近", value: "re" },
		{ label: "最近通过", value: "pr" },
		{ label: "最好成绩", value: "bp" },
		{ label: "谱面成绩", value: "score" },
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
watch(() => state.nowfunction, (val) => {
	getFunctionType();
	if (val === "score") {
		state.scoreTypeList = state.scoreTypes;
	};
	if (val === "scores") {
		state.scoreTypeList = state.scoresTypes;
	};
});
watch(() => state.mod, (val) => {
	checkMods(val);
})
watch(() => state.scoreType, (val) => {
	state.maxRange = val === 'bp-days' ? 999 : 100;
	if (state.isWideScreen) {
		state.inputBarStyle.width = val === 'score' ? "200px" : "460px";
	};
});
watch(() => state.bid, (val) => {
	if (isNaN(val)) {
		// console.log(parseInt(val))
		message.warning("谱面id应该为纯数字");
	};
});
watch(() => state.type, (val) => {
	if (state.isWideScreen) {
		state.inputBarStyle.width = val === 1 ? "460px" : "570px";
	}
});
watch(() => state.isWideScreen, (val) => {
	if (!val) {
		state.inputBarStyle = {};
	} else {
		state.inputBarStyle.width = state.type === 1 ? "460px" : "570px";
		if (state.type === 1) {
			state.inputBarStyle.width = state.scoreType === 'score' ? "200px" : "460px";
		}
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

	.input-bar {
		width: 570px;
	}

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