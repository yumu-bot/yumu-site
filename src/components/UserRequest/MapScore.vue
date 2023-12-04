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
		<a-input class="input-bar" :class="state.isWideScreen" :placeholder="$t('placeholder.username')" size="large"
			v-model:value=state.username allow-clear @keyup.enter="emitParams()">
		</a-input>
	</div>
	<!-- score/scores功能附加项  -->
	<div class="plus-bar">
		<!-- 谱面成绩查询 -->
		<a-input :placeholder="$t('placeholder.bid')" v-model:value=state.bid size="large" style="width:130px;" allow-clear
			@keyup.enter="emitParams()"></a-input>
		<!-- 附加参数:游玩mods(仅支持谱面成绩查询) -->
		<a-select class="mod-select" mode="multiple" :options="state.mods" size="large" v-model:value=state.mod
			:max-tag-count="4" :max-tag-text-length="2" allow-clear :placeholder="$t('placeholder.mod')">
			<a-select-option v-for="(item, index) in state.mods" :key="index" :label="item.label"
				:value="item.value"></a-select-option>
		</a-select>
	</div>
	<!-- 游戏模式切换 -->
	<a-select class="mode-select" :options="modes" size="large" v-model:value=state.mode>
		<a-select-option v-for="(item, index) in modes" :key="index" :label="item.label"
			:value="item.value"></a-select-option>
	</a-select>
	<!-- 查询按钮 -->
	<a-button class="query-button" size="large" @click="emitParams()" >{{ $t('tool.search')
	}}</a-button>
</template>
<script setup name="MapScore">
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

	.input-bar {
		width: 229px;
	}

	.plus-bar {
		display: flex;
		flex-direction: row;
		column-gap: 20px;
	}

	.mod-select {
		width: 321px;
	}

	.mode-select {
		width: 110px;
	}

	.query-button {
		width: 110px;
	}
}

// 媒体查询
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

		.mod-select {
			width: 210px;
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