<!-- 
 * @description: 玩家查询搜索框(支持用户名+mode查询)
 * @fileName: UserRequestBar.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-19 14:22:38
 * @version: V1.0.0 
!-->
<template>
	<div class="search-bar">
		<!-- 查询功能切换 -->
		<a-select style="width:110px;" :options="functions" size="large" v-model:value=nowfunction>
			<a-select-option v-for="(item, index) in functions" :key="index" :label="item.label"
				:value="item.value"></a-select-option>
		</a-select>
		<!-- 用户名输入框 -->
		<a-input placeholder="请输入用户名" size="large" style="width:700px;" v-model:value=username allow-clear
			@keyup.enter="emitParams()">
		</a-input>
		<!-- 游戏模式切换 -->
		<a-select style="width:110px;" :options="modes" size="large" v-model:value=mode>
			<a-select-option v-for="(item, index) in modes" :key="index" :label="item.label"
				:value="item.value"></a-select-option>
		</a-select>
		<!-- 静态指令复制 -->
		<a-tooltip :title=command arrow-point-at-center>
			<a-button style="width: 130px;" size="large" @mouseenter="getCommand(nowfunction, mode, username)">
				<div class="copy-button">
					<span>复制到剪贴板</span>
					<a-typography-paragraph :copyable="{ tooltip: false, text: command }">
					</a-typography-paragraph>
				</div>
			</a-button>
		</a-tooltip>
		<!-- 查询按钮 -->
		<a-button style="width: 70px;" size="large" @click="emitParams()">生成!</a-button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			username: "",//用户名
			nowfunction: "ppm",//指定查询功能,默认为ppm
			mode: "osu",//指定查询mode,默认为osu
			command: "",//静态指令
		}
	},
	props: {
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
	},
	methods: {
		// 获取静态指令
		getCommand(nowfunction, mode, username) {
			let modeId;
			for (let i = 0; i < this.modes.length; i++) {
				if (this.modes[i].value === mode) {
					modeId = this.modes[i].id;
				}
			}
			this.command = `!${nowfunction}:` + modeId + " " + username;
		},
		// 传递请求参数
		emitParams() {
			this.init(this.username, this.mode, this.nowfunction)
		}
	},
	created() {
	}
}

</script>
<style lang="scss" scoped>
.search-bar {
	padding: 10px 0;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	width: inherit;
	background-color: #54454C;
	column-gap: 5px;
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