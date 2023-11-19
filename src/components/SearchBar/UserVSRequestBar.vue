<!-- 
 * @description: 玩家对比搜索框(支持功能：ppmvs)
 * @fileName: UserVSRequestBar.vue 
 * @author: SIyuyuko 
 * @date: 2023-10-23 11:34:02
 * @others: 查询参数格式：用户名1+用户名2+游戏模式切换
!-->
<template>
	<div class="search-bar">
		<!-- 玩家1输入框 -->
		<div>
			<a-input class="input-bar" placeholder="请输入要对比的玩家1" size="large" v-model:value=state.userA allow-clear
				@keyup.enter="emitParams()">
			</a-input>
		</div>
		<FireFilled class="vs-icon" style="font-size: xx-large;" />
		<!-- 玩家2输入框 -->
		<div>
			<a-input class="input-bar" placeholder="请输入要对比的玩家2" size="large" v-model:value=state.userB allow-clear
				@keyup.enter="emitParams()">
			</a-input>
		</div>
		<div class="query-bar">
			<!-- 游戏模式切换 -->
			<a-select style="width:110px;" :options="data.modes" size="large" v-model:value=state.mode>
				<a-select-option v-for="(item, index) in data.modes" :key="index" :label="item.label"
					:value="item.value"></a-select-option>
			</a-select>
			<!-- 查询按钮 -->
			<a-button style="width: 112px;" size="large" @click="emitParams()">生成!</a-button>
		</div>
	</div>
</template>
<script setup name="UserVSRequestBar">
import { FireOutlined, FireTwoTone, FireFilled } from '@ant-design/icons-vue';
import { reactive, inject } from 'vue';
const state = reactive({
	userA: "",
	userB: "",
	mode: "osu",
});
const props = defineProps({
	data: {
		type: Object,
		default: {}
	},
	// 数据初始化
	init: {
		type: Function,
		default: () => { }
	}
});

// 传递请求参数
function emitParams() {
	let data = {
		userA: state.userA,
		userB: state.userB,
		mode: state.mode,
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
	width: -webkit-fill-available;
	height: auto;
	background-color: #54454C;
	column-gap: 20px;

	.input-bar {
		width: 413px;
	}

	.query-bar {
		display: flex;
		// margin-left: auto;
		column-gap: 20px;
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
			width: 355px;
		}

		.vs-icon {
			margin: auto;
		}

		.query-bar {
			justify-content: flex-end;
			display: flex;
			margin-left: auto;
			column-gap: 10px;
		}
	}

}
</style>