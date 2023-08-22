<!-- 
 * @description: 玩家查询搜索框(支持功能：ppm/bpa/score/scores)
 * @fileName: UserRequestBar.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-19 14:22:38
 * @version: V1.0.0 
!-->
<template>
	<div class="search-bar">
		<!-- 查询功能切换 -->
		<a-select style="width:150px;" :options="functions" size="large" v-model:value=nowfunction>
			<a-select-option v-for="(item, index) in functions" :key="index" :label="item.label"
				:value="item.value"></a-select-option>
		</a-select>
		<!-- 用户名输入框 -->
		<a-input placeholder="请输入用户名" size="large" style="width:600px;" v-model:value=username allow-clear
			@keyup.enter="emitParams()">
		</a-input>
		<!-- score/scores功能附加项  -->
		<div class="plus-bar" v-show="type === 1">
			<!-- 子功能类型:pr/re/bp/score -->
			<a-select :options="scoreTypeList" size="large" style="width:220px;" v-model:value=scoreType>
				<a-select-option v-for="(item, index) in scoreTypeList" :key="index" :label="item.label"
					:value="item.value"></a-select-option>
			</a-select>
			<!-- pr/bp范围查询 -->
			<a-tooltip :title="'查询范围(1-' + maxRange + ')'" arrow-point-at-center>
				<a-input-number v-model:value=key :min="1" :max="maxRange" v-show="scoreType !== 'score'"
					style="width:80px;" size="large" @keyup.enter="emitParams()"></a-input-number>
			</a-tooltip>
			<!-- 谱面成绩查询 -->
			<a-input placeholder="谱面id" v-model:value=bid v-show="scoreType === 'score'" size="large" style="width:130px;"
				allow-clear @keyup.enter="emitParams()"></a-input>
			<!-- 附加参数:游玩mods(仅支持谱面成绩查询) -->
			<a-select mode="multiple" :options="mods" size="large" style="width:150px;" v-model:value=mod
				v-show="scoreType === 'score'" :max-tag-count="1" :max-tag-text-length="2" allow-clear placeholder="游玩mod">
				<a-select-option v-for="(item, index) in mods" :key="index" :label="item.label"
					:value="item.value"></a-select-option>
			</a-select>
		</div>
		<!-- 游戏模式切换 -->
		<a-select style="width:110px;" :options="modes" size="large" v-model:value=mode>
			<a-select-option v-for="(item, index) in modes" :key="index" :label="item.label"
				:value="item.value"></a-select-option>
		</a-select>
		<!-- 静态指令复制 -->
		<div v-show="type === 0">
			<a-tooltip :title=command arrow-point-at-center>
				<a-button style="width: 130px;" size="large" @mouseenter="getCommand(nowfunction, mode, username)">
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
import { message } from 'ant-design-vue';

export default {
	data() {
		return {
			username: "",//用户名
			nowfunction: "ppm",//指定查询功能,默认为ppm
			mode: "osu",//指定查询mode,默认为osu
			key: "",//bp/pr/re序号
			bid: "",//谱面id
			mod: [],//选定mod
			isScore: false,//score功能是否为查询谱面成绩,默认false
			scoreType: "pr",//成绩类型
			command: "",//静态指令
			type: 0,//功能类型
			//功能列表
			functionList: [
				["ppm", "bpa"],//支持用户名+mode查询 type:0
				["score", "scores"],//支持用户名+mode+可选附加参数查询 type:1
			],
			//单个成绩查询类型
			scoreTypes: [
				{ label: "最近成绩", value: "re" },
				{ label: "最近通过成绩", value: "pr" },
				{ label: "最好成绩", value: "bp" },
				{ label: "谱面成绩", value: "score" },
			],
			//多个成绩查询类型
			scoresTypes: [
				{ label: "最近成绩", value: "re" },
				{ label: "最近通过成绩", value: "pr" },
				{ label: "最好成绩(指定bp范围)", value: "bp-range" },
				{ label: "最好成绩(指定天数范围)", value: "bp-days" },
			],
			scoreTypeList: [],
			// 游玩模组列表
			mods: [
				{ label: "NM", value: "NM", disabled: false },
				{ label: "DT", value: "DT", disabled: false },
				{ label: "HD", value: "HD", disabled: false },
				{ label: "HR", value: "HR", disabled: false },
				{ label: "NC", value: "NC", disabled: false },
				{ label: "EZ", value: "EZ", disabled: false },
				{ label: "SO", value: "SO", disabled: false },
				{ label: "NF", value: "NF", disabled: false },
				{ label: "SD", value: "SD", disabled: false },
				{ label: "HT", value: "HT", disabled: false },
				{ label: "PF", value: "PF", disabled: false },
				{ label: "FL", value: "FL", disabled: false },

			],
			maxRange: 100,//查询范围上限 bp-days时为999,其余情况为100
			isInvalid: false,//是否满足请求条件
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
		// 当前支持指令:ppm/bpa
		getCommand(nowfunction, mode, username) {
			let modeId;
			for (let i = 0; i < this.modes.length; i++) {
				if (this.modes[i].value === mode) {
					modeId = this.modes[i].id;
				}
			}
			if (this.type === 0) {
				// 指令:ppm/bpa
				this.command = `!${nowfunction}:` + modeId + " " + username;
			} else {
				// 指令:score/scores(主程序功能未完成)
				let key = this.key === 0 ? "" : this.key;
				let scoreParam = this.scoreType === "score" ? this.bid : key;
				this.command = `!${this.scoreType} ${scoreParam}:` + modeId;
			}

		},
		// 传递请求参数
		emitParams() {
			if (this.isInvalid) {

			} else {
				let data = {
					username: this.username,
					mode: this.mode,
					nowfunction: this.nowfunction,
					type: this.type,
					scoreType: this.scoreType,
					key: this.key === "" ? 1 : this.key,
					bid: this.bid,
					mod: this.mod,
				}
				this.init(data);
			}
		},
		// 获取选定功能类型
		getFunctionType() {
			for (let i = 0; i < this.functionList.length; i++) {
				if (this.functionList[i].includes(this.nowfunction)) {
					this.type = i;
				}
			}
		},
		// mod组合验证
		// nm- sd / pf
		// ez- hr
		// ht - dt / nc
		// fl - hd(骂娘特供)(暂不支持mania)
		checkMods(val) {
			for (let i = 0; i < this.mods.length; i++) {
				// NM不能与其他mod组合
				if (val.length >= 1 && val.includes("NM")) {
					if (this.mods[i].value !== "NM") {
						this.mods[i].disabled = true;
						this.isInvalid = val.length > 1 ? true : false;//选择包含NM的其他mod组合禁止请求
					}
				} else if (val.includes("DT") || val.includes("NC")) {
					let e;
					this.mods.map((item) => {
						if (item.value === "HT") {
							e = this.mods.indexOf(item)
						}
					})
					//DT/NC不能共存，不能与HT组合
					if (val.includes("DT")) {
						this.mods[i].disabled = this.mods[i].value === "NC" ? true : false;
						this.mods[e].disabled = true;
					} else {
						this.mods[i].disabled = this.mods[i].value === "DT" ? true : false;
						this.mods[e].disabled = true;
					}
				} else if (val.includes("HR") || val.includes("EZ")) {
					//EZ/HR不能组合
					if (val.includes("HR")) {
						this.mods[i].disabled = this.mods[i].value === "EZ" ? true : false;

					} else {
						this.mods[i].disabled = this.mods[i].value === "HR" ? true : false;
					}
				} else if(val.includes("SD") || val.includes("PF")){
					let e;
					this.mods.map((item) => {
						if (item.value === "NM") {
							e = this.mods.indexOf(item)
						}
					})
					//SD/PF不能共存，不能与NM组合
					if (val.includes("SD")) {
						this.mods[i].disabled = this.mods[i].value === "PF" ? true : false;
						this.mods[e].disabled = true;
					} else {
						this.mods[i].disabled = this.mods[i].value === "SD" ? true : false;
						this.mods[e].disabled = true;
					}
				}
				else {
					this.mods[i].disabled = false;
					this.isInvalid = false;
				}
			}
		}
	},
	created() {
	},
	watch: {
		nowfunction: {
			handler(val) {
				this.getFunctionType();
				if (val === "score") {
					this.scoreTypeList = this.scoreTypes;
				}
				if (val === "scores") {
					this.scoreTypeList = this.scoresTypes;
				}
			},
		},
		mod: {
			handler(val) {
				this.checkMods(val);
			}
		},
		scoreType: {
			handler(val) {
				this.maxRange = val === 'bp-days' ? 999 : 100;
			}
		},
		bid: {
			handler(val) {
				if (isNaN(val)) {
					console.log(parseInt(val))
					message.warning("谱面id应该为纯数字");
				}
			},
		}

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

	.plus-bar {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		column-gap: 5px;
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