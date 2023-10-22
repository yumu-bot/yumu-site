<!-- 
 * @description: 玩家查询指定谱面成绩
 * @fileName: MapScore.vue 
 * @author: SIyuyuko 
 * @date: 2023-10-22 15:31:32
 * @others: 查询参数格式：用户名+谱面id+游玩mod+游戏模式切换
!-->
<template>
	<!-- 用户名输入框 -->
	<div>
		<a-input class="input-bar" :class="state.isWideScreen" :style="state.inputBarStyle" placeholder="请输入用户名"
			size="large" v-model:value=state.username allow-clear @keyup.enter="emitParams()">
		</a-input>
	</div>
	<!-- score/scores功能附加项  -->
	<div class="plus-bar">
		<!-- 谱面成绩查询 -->
		<a-input placeholder="谱面id" v-model:value=state.bid size="large" style="width:130px;" allow-clear
			@keyup.enter="emitParams()"></a-input>
		<!-- 附加参数:游玩mods(仅支持谱面成绩查询) -->
		<a-select mode="multiple" :options="state.mods" size="large" style="width:150px;" v-model:value=state.mod
			:max-tag-count="1" :max-tag-text-length="2" allow-clear placeholder="游玩mod">
			<a-select-option v-for="(item, index) in state.mods" :key="index" :label="item.label"
				:value="item.value"></a-select-option>
		</a-select>
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