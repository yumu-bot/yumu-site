<!-- 
 * @description: 玩家对比查询页组件
 * @fileName: UserVS.vue 
 * @author: SIyuyuko 
 * @date: 2023-10-23 11:29:30
 * @others: --
!-->
<template>
	<div class="uservs-page">
		<!-- 玩家对比查询搜索框 -->
		<UserVSRequestBar :data="state" :init="init"></UserVSRequestBar>
		<!-- 搜索结果banner -->
		<SearchResultBanner :status="state.status" :imgUrl="state.imgUrl" :spinning="state.spinning"
			@changeStatus="changeStatus" @isSpinning="isSpinning"></SearchResultBanner>
	</div>
</template>

<script setup name="UserVS">
import { message } from 'ant-design-vue';
import SearchResultBanner from '../../components/SearchResult/SearchResultBanner.vue';
import UserVSRequestBar from '../../components/SearchBar/UserVSRequestBar.vue';
import { onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const state = reactive({
	baseUrl: "",
	imgUrl: "",//图片地址
	spinning: false,//加载状态
	status: "waiting",//查询状态
	userA: "",
	userB: "",
	// 游戏模式列表
	modes: [
		{ label: "osu", value: "osu", id: "0" },
		{ label: "taiko", value: "taiko", id: "1" },
		{ label: "catch", value: "catch", id: "2" },
		{ label: "mania", value: "mania", id: "3" },
	],
	mode: "",
});

//发送查询请求
async function sendRequest() {
	// 表单验证
	if (state.userA === "" || state.userB === "") {
		message.warning(t('notification.blankUservs'));
	} else {
		state.spinning = true;//图片正在加载
		state.status = "loading";
		getUserVS();
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
};
//修改查询状态(emit)
function changeStatus(status) {
	state.status = status;
};
// 修改加载状态(emit)
function isSpinning() {
	state.spinning = false;//图片加载成功
};
// 初始化传递参数,触发查询
function init(data) {
	state.userA = data.userA;
	state.userB = data.userB;
	state.mode = data.mode;
	sendRequest();
};
// 查询玩家对比
function getUserVS() {
	let paramsObj = {
		u1: state.userA,
		u2: state.userB,
		mode: state.mode
	}
	state.imgUrl = state.baseUrl + `/ppmvs?u1=${paramsObj.u1}&u2=${paramsObj.u2}&mode=${paramsObj.mode}`
};
onMounted(() => {
	state.imgUrl = "";
	state.baseUrl = import.meta.env.VITE_BASEURL;
}); 
</script>

<style></style>