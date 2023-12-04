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
		<a-input class="input-bar" :class="state.isWideScreen" :placeholder="$t('placeholder.username')" size="large"
			v-model:value=state.username allow-clear @keyup.enter="emitParams()">
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
		<a-tooltip :title="$t('placeholder.range')+'(1-' + state.maxRange + ')'" arrow-point-at-center>
			<a-input-number class="range-select" v-model:value=state.key :min="1" :max="state.maxRange"
				v-show="state.scoreType !== 'score'" size="large" @keyup.enter="emitParams()"
				placeholder="1"></a-input-number>
		</a-tooltip>
	</div>
	<!-- 游戏模式切换 -->
	<a-select class="mode-select" :options="modes" size="large" v-model:value=state.mode>
		<a-select-option v-for="(item, index) in modes" :key="index" :label="item.label"
			:value="item.value"></a-select-option>
	</a-select>
	<!-- 查询按钮 -->
	<div class="query-bar">
		<a-button class="query-button" size="large" @click="emitParams()" >{{ $t('tool.search')
		}}</a-button>
	</div>
</template>
<script setup name="Scores">
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
	height: auto;
	background-color: #54454C;
	column-gap: 20px;

	.function-bar {
		width: 160px;
	}

	.input-bar {
		width: 445px;
	}

	.plus-bar {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		column-gap: 20px;

		.range-select {
			width: 80px
		}
	}

	.mode-select {
		width: 110px;
	}

	.query-button {
		width: 110px;
	}
}

@media screen and (max-width:420px) {
	.search-bar {
		.function-bar {
			width: 140px;
		}

		.input-bar {
			width: 200px;
		}

		.plus-bar {
			column-gap: 10px;

			.range-select {
				width: 65px;
			}
		}

		.query-bar {
			display: flex;
			margin-left: auto;

			.query-button {
				width: 67px;
			}
		}

	}
}
</style>