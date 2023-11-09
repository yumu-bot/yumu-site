<!-- 
 * @description: 比赛查询搜索框
 * @fileName: MatchRequestBar.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-19 14:21:45
 * @version: V1.0.0 
!-->
<template>
	<div class="search-bar">
		<!-- 查询功能切换 -->
		<div>
			<a-select class="switch-bar" :options="props.functions" size="large" v-model:value=state.nowfunction>
				<a-select-option v-for="(item, index) in props.functions" :key="index" :label="item.label"
					:value="item.value"></a-select-option>
			</a-select>
		</div>
		<!-- 比赛id输入框 -->
		<div>
			<a-input class="input-bar" placeholder="请输入比赛id" size="large" v-model:value=state.matchId allow-clear
				@keyup.enter="emitParams()">
			</a-input>
		</div>
		<!-- 跳过开头对局 -->
		<a-tooltip title="跳过开头对局" arrow-point-at-center>
			<a-input-number class="number-bar" v-model:value=state.skipBegin :min="0" size="large"
				@keyup.enter="emitParams()" placeholder="0"></a-input-number>
		</a-tooltip>
		<!-- 跳过结尾对局 -->
		<a-tooltip title="跳过结尾对局" arrow-point-at-center>
			<a-input-number class="number-bar" v-model:value=state.skipEnd :min="0" size="large" @keyup.enter="emitParams()"
				placeholder="0"></a-input-number>
		</a-tooltip>
		<div class="check-bar">
			<!-- 是否包含失败对局 -->
			<a-checkbox v-model:checked="state.includeFail">失败对局</a-checkbox>
			<!-- 是否包含重赛对局 -->
			<a-checkbox v-model:checked="state.includeRestart">重赛对局</a-checkbox>
		</div>
		<div class="query-bar">
			<!-- 静态指令复制 -->
			<div>
				<a-tooltip :title=state.command arrow-point-at-center>
					<a-button style="width: 130px;" size="large"
						@mouseenter="getCommand(state.matchId, state.skipBegin, state.skipEnd, state.includeFail, state.includeRestart)">
						<div class="copy-button">
							<span>复制到剪贴板</span>
							<a-typography-paragraph :copyable="{ tooltip: false, text: state.command }">
							</a-typography-paragraph>
						</div>
					</a-button>
				</a-tooltip>
			</div>
			<!-- 查询按钮 -->
			<a-button style="width: 70px;" size="large" @click="emitParams()">生成!</a-button>
		</div>
	</div>
</template>
<script setup name="MatchRequestBar">
import { reactive } from 'vue';
const state = reactive({
	matchId: "",//比赛Id
	nowfunction: "match",//指定查询功能,默认为match
	skipBegin: 0,//跳过开头对局
	skipEnd: 0,//跳过结尾对局
	includeFail: false,//是否包含失败对局
	includeRestart: false,//是否包含重赛对局
	command: "",
});
const props = defineProps({
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
// match -> !ymmn 123456 0 0 r f
// rating -> !ymra 123456 0 0 r f
function getCommand(matchId, k, d, r, f) {
	let functionName = state.nowfunction === "match" ? "ymmn" : "ymra";
	let isRestart = r ? " r" : "";
	let isFail = f ? " f" : "";
	if (matchId !== "") {
		state.command = `!${functionName} ${matchId}` + ` ${k} ${d}${isRestart}${isFail}`;
	}
};
// 传递请求参数
function emitParams() {
	let data = {
		matchId: state.matchId,
		skipBegin: state.skipBegin,
		skipEnd: state.skipEnd,
		includeFail: state.includeFail,
		includeRestart: state.includeRestart,
		nowfunction: state.nowfunction,
	}
	props.init(data);
};
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
	height: 40px;
	background-color: #54454C;
	column-gap: 20px;

	.switch-bar {
		width: 140px;
	}

	.input-bar {
		width: 435px;
	}

	.check-bar {
		width: 130px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.number-bar {
		width: 80px;
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

// AutoResize for phone
@media screen and (max-width:420px) {
	.search-bar {
		padding: 10px 10px;
		justify-content: unset;
		flex-wrap: wrap;
		column-gap: 10px;
		row-gap: 10px;

		.input-bar {
			width: 200px;
			display: flex;
			margin-left: auto;
		}

		.number-bar {
			width: 115px;
		}


		.check-bar {
			width: 100px;
			margin-left: auto;
		}

		.query-bar {
			display: flex;
			margin-left: auto;
			column-gap: 10px;
		}

	}

}
</style>