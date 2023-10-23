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
		<FireFilled style="font-size: xx-large;" />
		<!-- 玩家2输入框 -->
		<div>
			<a-input class="input-bar" placeholder="请输入要对比的玩家2" size="large" v-model:value=state.userB allow-clear
				@keyup.enter="emitParams()">
			</a-input>
		</div>
		<!-- 游戏模式切换 -->
		<a-select style="width:110px;" :options="data.modes" size="large" v-model:value=state.mode>
			<a-select-option v-for="(item, index) in data.modes" :key="index" :label="item.label"
				:value="item.value"></a-select-option>
		</a-select>
		<!-- 查询按钮 -->
		<a-button style="width: 70px;" size="large" @click="emitParams()">生成!</a-button>
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
	height: 40px;
	background-color: #54454C;
	column-gap: 20px;

	.switch-bar {
		width: 140px;
	}

	.input-bar {
		width: 413px;
	}

	.check-bar {
		width: 130px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}


// 媒体查询
@media screen and (max-width:$xl) {
	.search-bar {
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: flex-start;
		row-gap: 20px;

		.input-bar {
			width: 700px;
		}

		.check-bar {
			width: 90px;
		}
	}
}

@media screen and (max-width:$lg) {}

@media screen and (max-width:$md) {
	.search-bar {
		.input-bar {
			width: 400px;
		}
	}
}

@media screen and (max-width:$sm) {
	.search-bar {
		.input-bar {
			width: 370px;
		}
	}
}

@media screen and (max-width:$xs) {
	.search-bar {
		.input-bar {
			width: 265px;
		}
	}
}
</style>