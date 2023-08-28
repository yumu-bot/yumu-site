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
    <MatchRequestBar :functions="functions" :init="init"></MatchRequestBar>
    <!-- 搜索结果banner -->
    <SearchResultBanner :status="status" :imgUrl="imgUrl" :spinning="spinning" @changeStatus="changeStatus"
      @isSpinning="isSpinning"></SearchResultBanner>
  </div>
</template>

<script>
import { message } from 'ant-design-vue';
import SearchResultBanner from '../../components/SearchResult/SearchResultBanner.vue';
import MatchRequestBar from '../../components/SearchBar/MatchRequestBar.vue'
export default {
  data() {
    return {
      baseUrl: "",
      matchId: "",//比赛id
      imgUrl: "",//图片地址
      spinning: false,//加载状态
      status: "waiting",//查询状态
      // 功能列表
      functions: [
        { label: "浏览比赛结果", value: "match" },
        { label: "计算斗力", value: "rating" },
      ],
      nowfunction: "match",//指定查询功能,默认为match
      skipBegin: 0,//跳过开头对局
      skipEnd: 0,//跳过结尾对局
      includeFail: false,//是否包含失败对局
      includeRestart: false,//是否包含重赛对局
    }
  }, components: {
    MatchRequestBar,
    SearchResultBanner,
  }, methods: {
    //发送查询请求
    async sendRequest() {
      // 表单验证
      if (this.matchId === "") {
        message.warning("比赛id不能为空")
      } else {
        this.spinning = true;//图片正在加载
        this.status = "loading";
        this.getMatchInfo();
        // 图片加载超时切换状态为error,超时限制为1分钟
        let timer = setTimeout(() => {
          if (this.status !== "") {
            this.status = "error";
            message.warning("图片加载超时,请稍后再试(可尝试连接vpn改善网络状况)");
            clearTimeout(timer);
          } else {
            // 若加载成功,清除定时器
            clearTimeout(timer);
          }
        }, 60000);
      }
    },
    //修改查询状态(emit)
    changeStatus(status) {
      this.status = status;
    },
    // 修改加载状态(emit)
    isSpinning() {
      this.spinning = false;//图片加载成功
    },
    // 初始化传递参数,触发查询
    init(data) {
      this.matchId = data.matchId;
      this.skipBegin = data.skipBegin;
      this.skipEnd = data.skipEnd;
      this.includeFail = data.includeFail;
      this.includeRestart = data.includeRestart;
      this.nowfunction = data.nowfunction;
      this.sendRequest();
    },
    // 查询比赛信息
    getMatchInfo() {
      let paramsObj = {
        id: this.matchId,
        k: this.skipBegin,
        d: this.skipEnd,
        f: this.includeFail,
        r: this.includeRestart
      }
      this.imgUrl = this.baseUrl + `/${this.nowfunction}?id=${paramsObj.id}&k=${paramsObj.k}&d=${paramsObj.d}&f=${paramsObj.f}&r=${paramsObj.r}`
    }

  }, created() {
    this.imgUrl = "";
    this.baseUrl = import.meta.env.VITE_BASEURL;
  }
}
</script>

<style></style>