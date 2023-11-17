<!-- 
 * @description: 首页内容，为主页的二级嵌套组件
 * @fileName: HomeContent.vue 
 * @author: SIyuyuko 
 * @date: 2023-10-20 15:03:51
 * @version: V1.0.0 
!-->
<!-- 首页内容展示 -->
<template>
  <div class="home-content">
    <!-- 图片滑动展示 -->
    <div class="image-swiper">
      <ImageSwiper></ImageSwiper>
    </div>
    <div class="main-content">
      <!-- <a-space direction="vertical"> -->
      <!-- 功能快捷入口 -->
      <h3 class="content-header" style="">功能</h3>
      <div class="content-box">
        <div class="function-content-left">
          <a-tooltip title="玩家数据">
          <img class="large-item" title="玩家数据" src="/img/function/Function_Map.jpg" @click="jumpPage('user')">
          </a-tooltip>
        </div>
        <div class="function-content-right">
          <a-tooltip v-for="(item, index) in state.functionItems" :key="index" :title=item.title>
          <img class="small-item" :src="item.src" @click="jumpPage(item.headMenu)" style="object-fit: cover;">
            </a-tooltip>
        </div>
      </div>
      <!-- 推荐快捷入口 -->
      <h3 class="content-header">推荐</h3>
      <div class="content-box">
        <div class="suggest-content">
          <a-tooltip v-for="(item, index) in state.suggestList" :key="index" :title=item.title>
          <img class="small-item" :src="item.src" @click="jumpSite(item)" style="object-fit: cover;">
            </a-tooltip>
        </div>
      </div>
      <!-- 未完成面板 -->
      <!-- 活跃数据展示(静态) -->
      <!-- <h3 class="content-header">活跃</h3>
      <div class="content-box">
        <div class="active-content">
          <div style="width: 520px;height: 100px;border-radius: 20px;background-color: #382E32;"></div>
          <div style="width: 520px;height: 100px;border-radius: 20px;background-color: #382E32;"></div>
        </div>
      </div> -->
    </div>
    <!-- </a-space> -->
    <!-- <button>{{ current1 }}</button> -->
  </div>
</template>

<script setup name="HomeContent">
import ImageSwiper from '@/components/ImageSwiper.vue';
import { useRouter } from 'vue-router';
import { inject, onMounted, onUnmounted, ref, reactive } from 'vue';
import bus from '../utils/bus';
const state = reactive({
  headMenu: "",//目标跳转路由(目录)
  //功能快捷键集合
  functionItems: [
    { title: "玩家对比", src: "/img/function/b119.png", headMenu: "uservs" },
    { title: "比赛查询", src: "/img/function/b121.png", headMenu: "match" },
    { title: "谱面查询", src: "/img/function/b128.png", headMenu: "beatmap" },
    { title: "娱乐功能", src: "/img/function/b106.png", headMenu: "entertainment" },
  ],
  //开发文档快捷键集合
  devItems: [
    { title: "Ant Design Vue", src: "/img/suggest/ant_design.png", link: "https://antdv.com/components/overview-cn" },
    { title: "Vite | 下一代的前端工具链", src: "/img/suggest/vite.png", link: "https://cn.vitejs.dev/" },
    { title: "渐进式 JavaScript 框架 | Vue.js", src: "/img/suggest/vue.jpg", link: "https://cn.vuejs.org/" },
    { title: "MDN Web Docs", src: "/img/suggest/mdn.jpg", link: "https://developer.mozilla.org/zh-CN/" },
  ],
  //推荐快捷键集合
  suggestItems: [
    { title: "o!tsu - 国内滴osu!比赛服务小站~", src: "/img/suggest/Recommend_Otsu.jpg", link: "http://otsu.fun/home" },
    { title: "osu! - 萌娘百科 万物皆可萌的百科全书", src: "/img/suggest/Recommend_Moegirl.jpg", link: "https://zh.moegirl.org.cn/Osu!" },
    { title: "你好osu", src: "/img/suggest/Recommend_Hiosu.jpg", link: "https://www.hiosu.com/" },
    { title: "Sayobot osu! 镜像站 | Beatmap mirror", src: "/img/suggest/Recommend_Sayo.jpg", link: "https://osu.sayobot.cn/home" },
  ],
  suggestList: null,//推荐列表
});
const router = useRouter();

// 快捷入口跳转(站内)
function jumpPage(headMenu) {
  state.headMenu = headMenu;
  // router.push({ path: `/function/${headMenu}` });
  bus.$emit("currentMenu", headMenu);
  router.push({ path: "/function" });
  // console.log("ok", headMenu);
}
// 外部网站跳转
function jumpSite(item) {
  window.open(item.link, "_blank");
}
onMounted(() => {
  state.suggestList = window.location.href.includes("bot") ? state.suggestItems : state.devItems;
}
);
onUnmounted(() => {
  let headMenu = state.headMenu;
  // 功能页的默认组件显示逻辑交给触发方法，传递默认值以便在onBeforeMount()中一起渲染
  if (headMenu === "") {
    headMenu = "user";
  }
  // 只有不是导航栏之间跳转时才触发快捷入口跳转方法
  if (!router.push) {
    jumpPage(state.headMenu);
  } else {
    state.headMenu = headMenu;
    bus.$emit("currentMenu", headMenu);
  }
});

</script>
