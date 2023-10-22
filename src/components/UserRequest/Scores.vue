<!-- 
 * @description: 玩家查询成绩类:pr/re
 * @fileName: Scores.vue 
 * @author: SIyuyuko 
 * @date: 2023-10-22 14:53:05
 * @others: 查询参数格式：用户名+成绩子功能+游戏模式切换
!-->
<template>
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
	</div>
	<!-- 游戏模式切换 -->
	<a-select style="width:110px;" :options="modes" size="large" v-model:value=state.mode>
		<a-select-option v-for="(item, index) in modes" :key="index" :label="item.label"
			:value="item.value"></a-select-option>
	</a-select>
	<!-- 查询按钮 -->
	<a-button style="width: 70px;" size="large" @click="emitParams()" :disabled="state.isInvalid">生成!</a-button>
</template>
<script setup>
import { inject } from 'vue';
const props = defineProps({
	state: {
		type: Object,
		default: {}
	},
	emitParams: {
		type: Function,
		default: () => { }
	},
});
const modes = inject("modes")
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