<!-- 
 * @description: 玩家查询个人信息类：ppm/bpa
 * @fileName: Infos.vue 
 * @author: SIyuyuko 
 * @date: 2023-10-22 14:49:34
 * @others: 查询参数格式：用户名+游戏模式切换
!-->
<template>
	<!-- 用户名输入框 -->
	<div>
		<a-input class="input-bar" :class="state.isWideScreen" :placeholder="$t('placeholder.username')" size="large"
			v-model:value=state.username allow-clear @keyup.enter="emitParams()">
		</a-input>
	</div>
	<!-- 游戏模式切换 -->
	<a-select class="mode-select" :options="modes" size="large" v-model:value=state.mode>
		<a-select-option v-for="(item, index) in modes" :key="index" :label="item.label"
			:value="item.value"></a-select-option>
	</a-select>
	<!-- 静态指令复制 -->
	<div v-show="state.type === 0">
		<a-tooltip :title=state.command arrow-point-at-center>
			<a-button style="width: 130px;" size="large"
				@mouseenter="getCommand(state.nowfunction, state.mode, state.username)">
				<div class="copy-button">
					<span>{{ $t('tool.clipboard') }}</span>
					<a-typography-paragraph :copyable="{ tooltip: false, text: state.command }">
					</a-typography-paragraph>
				</div>
			</a-button>
		</a-tooltip>
	</div>
	<!-- 查询按钮 -->
	<a-button class="query-button" size="large" @click="emitParams()" >{{ $t('tool.search')
	}}</a-button>
</template>
<script setup name="Infos">
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
	getCommand: {
		type: Function,
		default: () => { }
	},
});
const modes = inject("modes");
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
		width: 570px;
	}

	.mode-select {
		width: 110px;
	}

	.query-button {
		width: 110px;
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

@media screen and (max-width:420px) {
	.search-bar {
		.function-bar {
			width: 140px;
		}

		.input-bar {
			width: 200px;
		}

		.mode-select {
			width: 134px
		}

		.query-button {
			width: 67px;
		}
	}
}
</style>