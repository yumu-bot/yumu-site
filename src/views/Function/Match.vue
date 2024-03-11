<!-- 
 * @description: 比赛查询页组件
 * @fileName: Match.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-22 16:52:13
 * @version: V1.0.0 
!-->
<template>
  <div class="match-page">
    <!-- 比赛查询搜索框(支持比赛id+可附加参数查询) -->
    <MatchRequestBar :functions="state.functions" :init="init"></MatchRequestBar>
    <!-- 搜索结果banner -->
    <SearchResultBanner :status="state.status" :imgUrl="state.imgUrl" :spinning="state.spinning"
      @changeStatus="changeStatus" @isSpinning="isSpinning"></SearchResultBanner>
  </div>
</template>

<script setup name="Match">
import { message } from 'ant-design-vue';
import SearchResultBanner from '../../components/SearchResult/SearchResultBanner.vue';
import MatchRequestBar from '../../components/SearchBar/MatchRequestBar.vue';
import { onMounted, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n();
const state = reactive({
  baseUrl: "",
  matchId: "",//比赛id
  imgUrl: "",//图片地址
  spinning: false,//加载状态
  status: "waiting",//查询状态
  // 功能列表
  functions: [
    { label: "浏览比赛结果", value: "now" },
    { label: "计算斗力", value: "rating" },
  ],
  nowfunction: "now",//指定查询功能,默认为now
  skipBegin: 0,//跳过开头对局
  skipEnd: 0,//跳过结尾对局
  includeFail: false,//是否包含失败对局
  includeRestart: false,//是否包含重赛对局
});

//发送查询请求
async function sendRequest() {
  // 表单验证
  if (state.matchId === "") {
    message.warning(t('notification.blankMatchid'));
  } else {
    state.spinning = true;//图片正在加载
    state.status = "loading";
    getMatchInfo();
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
  state.matchId = data.matchId;
  state.skipBegin = data.skipBegin;
  state.skipEnd = data.skipEnd;
  state.includeFail = data.includeFail;
  state.includeRestart = data.includeRestart;
  state.nowfunction = data.nowfunction;
  sendRequest();
};
// 查询比赛信息
function getMatchInfo() {
  let paramsObj = {
    id: state.matchId,
    k: state.skipBegin,
    d: state.skipEnd,
    f: state.includeFail,
    r: state.includeRestart
  }
    state.imgUrl = state.baseUrl + `/match/${state.nowfunction}?id=${paramsObj.id}&k=${paramsObj.k}&d=${paramsObj.d}&f=${paramsObj.f}&r=${paramsObj.r}`
};
onMounted(() => {
  state.imgUrl = "";
  state.baseUrl = import.meta.env.VITE_BASEURL;
}); 
// 国际化
watch(locale, (val) => {
	for (let item of state.functions) {
		item.label = t(`matchRequestOptions.${item.value}`);
	};
}, { immediate:true,deep: true })
</script>

<style></style>