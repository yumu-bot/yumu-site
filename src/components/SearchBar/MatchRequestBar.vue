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
		<div class="switch-bar">
			<a-select style="width:140px;" :options="functions" size="large" v-model:value=nowfunction>
				<a-select-option v-for="(item, index) in functions" :key="index" :label="item.label"
					:value="item.value"></a-select-option>
			</a-select>
		</div>
		<!-- 比赛id输入框 -->
		<a-input placeholder="请输入比赛id" size="large" style="width:600px;" v-model:value=matchId allow-clear
			@keyup.enter="emitParams()">
		</a-input>
		<!-- 跳过开头对局 -->
		<a-tooltip title="跳过开头对局" arrow-point-at-center>
			<a-input-number v-model:value=skipBegin :min="0" style="width:80px;" size="large" @keyup.enter="emitParams()"
				placeholder="0"></a-input-number>
		</a-tooltip>
		<!-- 跳过结尾对局 -->
		<a-tooltip title="跳过结尾对局" arrow-point-at-center>
			<a-input-number v-model:value=skipEnd :min="0" style="width:80px;" size="large" @keyup.enter="emitParams()"
				placeholder="0"></a-input-number>
		</a-tooltip>
		<div class="check-bar">
			<!-- 是否包含失败对局 -->
			<a-checkbox v-model:checked="includeFail">失败对局</a-checkbox>
			<!-- 是否包含重赛对局 -->
			<a-checkbox v-model:checked="includeRestart">重赛对局</a-checkbox>
		</div>
		<!-- 静态指令复制 -->
		<div>
			<a-tooltip :title=command arrow-point-at-center>
				<a-button style="width: 130px;" size="large"
					@mouseenter="getCommand(matchId, skipBegin, skipEnd, includeFail, includeRestart)">
					<div class="copy-button">
						<span>复制到剪贴板</span>
						<a-typography-paragraph :copyable="{ tooltip: false, text: command }">
						</a-typography-paragraph>
					</div>
				</a-button>
			</a-tooltip>
		</div>
		<!-- 查询按钮 -->
		<a-button style="width: 70px;" size="large" @click="emitParams()" :disabled="isInvalid">生成!</a-button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			matchId: "",//比赛Id
			nowfunction: "match",//指定查询功能,默认为match
			skipBegin: 0,//跳过开头对局
			skipEnd: 0,//跳过结尾对局
			includeFail: false,//是否包含失败对局
			includeRestart: false,//是否包含重赛对局
			command: "",
		}
	}, props: {
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
	}, methods: {
		// 获取静态指令
		// match -> !ymmn 123456 0 0 r f
		// rating -> !ymra 123456 0 0 r f
		getCommand(matchId, k, d, r, f) {
			let functionName = this.nowfunction === "match" ? "ymmn" : "ymra";
			let isRestart = r ? " r" : "";
			let isFail = f ? " f" : "";
			this.command = `!${functionName} ${matchId}` + ` ${k} ${d}${isRestart}${isFail}`;
		},
		// 传递请求参数
		emitParams() {
			let data = {
				matchId: this.matchId,
				skipBegin: this.skipBegin,
				skipEnd: this.skipEnd,
				includeFail: this.includeFail,
				includeRestart: this.includeRestart,
				nowfunction: this.nowfunction,
			}
			this.init(data);
		},
	}
}
</script>
<style lang="scss" scoped>
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

	.check-bar {
		width: 125px;
		display: flex;
		flex-direction: column;
		justify-content: center;
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
</style>