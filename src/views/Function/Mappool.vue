<!-- 
 * @description: 图池制作组件
 * @fileName: Mappool.vue 
 * @author: SIyuyuko 
 * @date: 2023-12-04 19:29:11
 * @others: 
!-->
<template>
	<div class="mappool-page">
		<div class="query-bar">
			<a-input v-model:value="poolName" size="large" :placeholder="$t('placeholder.mappool')" allow-clear></a-input>
			<a-button type="primary" size="large" @click="submit(poolForm)" style="width: 175px;">{{
				t('tool.search')
			}}</a-button>
		</div>
		<a-form ref="formRef" :model="poolForm">
			<!-- 模组表单 -->
			<a-space class="mod-space" v-for="(mod, index) in poolForm.poolMods" :key="mod.id"
				style="display: flex; margin-bottom: 8px" align="baseline">
				<a-form-item class="mod-bar" :name="['poolMods', index, 'mod']" :rules="{ required: true }">
					<a-select v-model:value="mod.mod" :placeholder="$t('placeholder.mod')" allowClear style="width: 175px;"
						@change="changeMod" showSearch>
						<a-select-option v-for="(item, index) in poolForm.mods" :key=index :value=item.value
							:label=item.label :disabled=item.disabled>{{ item.label }}</a-select-option>
						<!--#region 自定义模组名称 -->
						<template #dropdownRender="{ menuNode: menu }">
							<v-nodes :vnodes="menu" />
							<a-divider style="margin: 4px 0" />
							<a-space style="padding: 4px 8px">
								<a-input ref="inputRef" v-model:value="customMod" :placeholder="$t('tool.addCustomMod')"
									@keydown.enter="addCustomMod" @change="mod.mod = customMod.toUpperCase()" :maxlength="4"/>
								<a-button type="text" @click="addCustomMod">
									<template #icon>
										<plus-outlined />
									</template>
								</a-button>
							</a-space>
						</template>
						<!-- #endregion -->
					</a-select>
				</a-form-item>
				<a-tooltip :title="t('tool.removeMod')">
				<MinusCircleOutlined class="mod-bar" @click="removeMods(mod)" />
				</a-tooltip>
				<!-- 谱面列表(嵌套) -->
				<div class="beatmap-list">
					<a-form ref="mapFormRef" :model="mod" layout="inline">
						<a-form-item>
							<a-button type="dashed" block @click="addBeatmap(mod)" style="width: 178px;">
								<PlusOutlined />
								{{ t('tool.addBeatmap') }}
							</a-button>
						</a-form-item>
						<a-space v-for="(map, index) in mod.beatmaps" :key="map.id"
							style="display: flex; margin-bottom: 8px" align="baseline">
							<a-form-item :name="['beatmaps', index, 'bid']"
								:rules="{ required: true, pattern: /^[0-9]*$/, message: '' }" hasFeedback>
								<a-input v-model:value="map.bid" :placeholder="$t('placeholder.bid')" allow-clear
									style="width: 178px;">
									<template #addonAfter class="remove-btn">
										<a-button type="link" size="small" @click="removeBeatmap(mod.beatmaps, map)"
											style="color: #fff;">
											<DeleteOutlined />
										</a-button>
									</template>
								</a-input>
							</a-form-item>
						</a-space>
					</a-form>
				</div>
			</a-space>
			<a-form-item>
				<a-button type="dashed" block @click="addMods">
					<PlusOutlined />
					{{ t('tool.addMod') }}
				</a-button>
			</a-form-item>
		</a-form>
		<SearchResultBanner :status="state.status" :imgUrl="state.imgUrl" :spinning="state.spinning"
			@changeStatus="changeStatus" @isSpinning="isSpinning" ></SearchResultBanner>
	</div>
</template>
<script setup name="Mappool">
import { reactive, ref, onMounted, defineComponent } from 'vue';
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import SearchResultBanner from '../../components/SearchResult/SearchResultBanner.vue';
import { getMappool } from '../../api/data_api';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
import { findMod } from '../../utils/util.js';
//#region 常规需求
const { t } = useI18n();
const state = reactive({
	baseUrl: "",
	imgUrl: "",//图片地址
	spinning: false,//加载状态
	status: "waiting",//查询状态
});
let poolName = ref("");// 图池名称
const formRef = ref({});
const mapFormRef = ref({});
const poolForm = reactive({
	poolMods: [],// 图池模组
	// 模组列表（比赛图池用）
	mods: [
		{ label: "NoMod(NM)", value: "NM", disabled: false },
		{ label: "Hidden(HD)", value: "HD", disabled: false },
		{ label: "HardRock(HR)", value: "HR", disabled: false },
		{ label: "DoubleTime(DT)", value: "DT", disabled: false },
		{ label: "FreeMod(FM)", value: "FM", disabled: false },
		{ label: "Easy(EZ)", value: "EZ", disabled: false },
		{ label: "LongNote(LN)", value: "LN", disabled: false },
		{ label: "Rice(RC)", value: "RC", disabled: false },
		{ label: "Hybrid(HB)", value: "HB", disabled: false },
		{ label: "Extra(EX)", value: "EX", disabled: false },
		{ label: "SpeedVariation(SV)", value: "SV", disabled: false },
		{ label: "TieBreaker(TB)", value: "TB", disabled: false },
	]
});
// 增加模组
function addMods() {
	poolForm.poolMods.push({
		mod: null,
		beatmaps: [],
		id: Date.now(),
	});
};
// 移除模组
function removeMods(item) {
	const index = poolForm.poolMods.indexOf(item);
	if (index !== -1) {
		poolForm.poolMods.splice(index, 1);
	}
};
// 增加谱面
function addBeatmap(item) {
	item?.beatmaps.push({
		bid: "",
		id: Date.now(),
	})
};
// 移除谱面
function removeBeatmap(arr, item) {
	const index = arr.indexOf(item);
	if (index !== -1) {
		arr.splice(index, 1);
	}
};
// 表单数据处理
function getMappoolData(poolForm) {
	let modArr = poolForm.poolMods;
	let dataObj = {};
	for (let i = 0; i < modArr.length; i++) {
		let beatmapArr = modArr[i].beatmaps;
		let beatmapList = [];
		for (let j = 0; j < beatmapArr.length; j++) {
			beatmapList.push(beatmapArr[j].bid);
			let obj = {};
			obj[modArr[i].mod] = beatmapList;
			dataObj = Object.assign(dataObj, obj)
		}
	};
	return dataObj;
};
// 提交表单
async function submit(poolForm) {
	if (poolForm.poolMods.length === 0) {
		message.warning(t('notification.blankPoolModList'));
	}
	// 表单验证
	await formRef.value.validate().then(() => {
		let valid = false;
		for (let i = 0; i < mapFormRef.value.length; i++) {
			mapFormRef.value[i].validate().then((res) => {
				let arr = Object.values(res);
				if (arr.length > 0) {
					valid = true;
				} else {
					valid = false;
					message.warning(t('notification.blankPoolBeatmap'));
				}
			}).catch((e) => {
				valid = false;
				let arr = e.values?.beatmaps;
				arr.map((i) => {
					if (i.bid === '') {
						message.warning(t('notification.blankBeatmapid'));
					} else {
						message.warning(t('notification.badBeatmapid'));
					}
				});
			});
		};
		setTimeout(() => {
			// 验证通过时逻辑
			if (valid) {
				state.spinning = true;//图片正在加载
				state.status = "loading";
				let data = getMappoolData(poolForm);
				let name = poolName.value === "" ? "" : poolName.value;
				// 请求生成图池
				getMappool({ data, name }).then(res => {
					if (res.status === 200 && res.data) {
						state.imgUrl = URL.createObjectURL(res.data);
					}
				});
				// 图片加载超时切换状态为error,超时限制为1分钟
				let timer = setTimeout(() => {
					if (state.status !== "") {
						state.status = "error";
						message.warning(t('notification.timeout'));
						clearTimeout(timer);
					} else {
						// 若加载成功,清除定时器
						clearTimeout(timer);
					}
				}, 60000);
			}
		}, 300)
	}).catch(() => {
		message.warning(t('notification.blankPoolMod'));
	});
};
//修改查询状态(emit)
function changeStatus(status) {
	state.status = status;
};
// 修改加载状态(emit)
function isSpinning() {
	state.spinning = false;//图片加载成功
};
// 清空选择时重置禁用状态
function resetMods() {
	poolForm.mods.map((item) => {
		item.disabled = false;
	});
};
let oldMod = "";// 旧模组
// 切换模组时切换禁用状态
function changeMod(val) {
	if (val !== undefined) {
		poolForm.mods.map((i) => {
			if (i.value === val) {
				i.disabled = true;
				oldMod = val;// 更新旧模组
			} else {
				i.disabled = false;
			}
		});
	} else {
		poolForm.mods.map((i) => {
			if (i.value === oldMod) {
				i.disabled = false;// 切换为新模组时，恢复旧模组的禁用状态
			}
		});
	}
}
onMounted(() => {
	state.imgUrl = "";
	state.baseUrl = import.meta.env.VITE_BASEURL;
});
// 监听图池模组，动态切换禁用状态
watch(poolForm.poolMods, val => {
	if (val.length > 0) {
		for (let item of val) {
			let e;
			if (item.mod !== (null || undefined)) {
				findMod(e, item.mod, true, poolForm);// 启用已选择的模组的禁用状态
			}
		};
	} else {
		resetMods();
	};
});
//#endregion
//#region 定制需求
const VNodes = defineComponent({
	props: {
		vnodes: {
			type: Object,
			required: true,
		},
	},
	render() {
		return this.vnodes;
	},
});
// 自定义模组名称
const inputRef = ref({});
const customMod = ref("");
const addCustomMod = e => {
	if (customMod.value !== "") {
		e.preventDefault();
		let customModName = customMod.value.toUpperCase();
		poolForm.mods.push({ label: customModName, value: customModName, disabled: false });
		customMod.value = '';
		setTimeout(() => {
			inputRef.value[0].focus();
		}, 0);
	} else {
		message.warning(t('notification.blankCustomMod'));
	};
};
//#endregion
</script>
<style lang="scss" scoped>
.mappool-page {
	padding: 10px 20px;
	// display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: -webkit-fill-available;
	height: calc(100% + 500px);
	background-color: #54454C;
	column-gap: 20px;

	.query-bar {
		display: flex;
		margin-bottom: 8px;
		column-gap: 10px;
	}

	.beatmap-list {
		width: 985px;
	}

	.ant-space-item:has(.mod-bar) {
		margin: auto;
	}

	.mod-space :deep(.ant-space-item:has(.mod-bar)) {
		margin: auto;

		.mod-bar {
			margin: auto;
		}
	}

	:deep(.ant-input-group-addon):hover {

		background-color: #2A2226;
	}

	:deep(.ant-input-group-addon):active {

		background-color: #54454C;
	}

	:deep(.ant-space-item .ant-form-item-control-input+div:has(.ant-form-item-explain-error)) {
		display: none;
		visibility: hidden;
		height: 0;
	}
}
</style>