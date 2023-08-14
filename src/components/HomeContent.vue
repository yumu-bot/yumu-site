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
        <img class="large-item" title="ppm" src="src\assets\img\function\Function_Map.jpg" @click="jumpPage('ppm')">
        <div class="function-content-right">
          <img class="small-item" v-for="(item, index) in functionItems" :key="index" :title=item.title :src="item.src"
            @click="jumpPage(item.headMenu)">
        </div>
      </div>
      <!-- 推荐快捷入口 -->
      <h3 class="content-header">推荐</h3>
      <div class="content-box">
        <div class="suggest-content">
          <img class="small-item" v-for="(item, index) in suggestItems" :key="index" :title=item.title :src="item.src"
            link="" @click="jumpSite(item)">
        </div>
      </div>
      <!-- 活跃数据展示(静态) -->
      <h3 class="content-header">活跃</h3>
      <div class="content-box">
        <div class="active-content">
          <div style="width: 520px;height: 100px;border-radius: 20px;background-color: #382E32;"></div>
          <div style="width: 520px;height: 100px;border-radius: 20px;background-color: #382E32;"></div>
        </div>
      </div>
    </div>
    <!-- </a-space> -->
    <!-- <button>{{ current1 }}</button> -->
  </div>
</template>

<script>
import ImageSwiper from '@/components/ImageSwiper.vue';
import router from '../router/index.js'
import { inject, onMounted, ref } from 'vue';
import bus from '../utils/bus';
export default {
  components: {
    ImageSwiper,
  },
  data() {
    return {
      headMenu: "",//目标跳转路由(目录)
      //功能快捷键集合
      functionItems: [
        { title: "bpht", src: "src/assets/img/function/Function_Map.jpg", headMenu: "bpht" },
        { title: "ymra", src: "src/assets/img/function/Function_Map.jpg", headMenu: "ymra" },
        { title: "ymmn", src: "src/assets/img/function/Function_Map.jpg", headMenu: "" },
        { title: "info", src: "src/assets/img/function/Function_Map.jpg", headMenu: "info" },
      ],
      // 推荐快捷键集合
      suggestItems: [
        { title: "Ant Design Vue", src: "src/assets/img/function/Function_Map.jpg", link: "https://antdv.com/components/overview-cn" },
        { title: "Vite | 下一代的前端工具链", src: "src/assets/img/function/Function_Map.jpg", link: "https://cn.vitejs.dev/" },
        { title: "渐进式 JavaScript 框架 | Vue.js", src: "src/assets/img/function/Function_Map.jpg", link: "https://cn.vuejs.org/" },
        { title: "MDN Web Docs", src: "src/assets/img/function/Function_Map.jpg", link: "https://developer.mozilla.org/zh-CN/" },
      ]
    }
  }, methods: {
    // 快捷入口跳转(站内)
    jumpPage(headMenu) {
      this.headMenu = headMenu;
      // router.push({ path: `/function/${headMenu}` });
      router.push({ path: "/function" });
      bus.$emit("currentMenu", headMenu);
      // console.log("ok", headMenu);
    },
    // 外部网站跳转
    jumpSite(item) {
      window.open(item.link, "_blank");
    }

  }, unmounted() {
    let headMenu = this.headMenu;
    // 功能页的默认组件显示逻辑交给触发方法，传递默认值以便在created()中一起渲染
    if (headMenu === "") {
      headMenu = "ppm";
    }
    // 只有不是导航栏之间跳转时才触发快捷入口跳转方法
    if (!this.$router.push) {
      this.jumpPage(headMenu);
    }
  }
}


</script>

<style lang="scss" scoped>
@import "../assets/css/variables.scss";

.home-content {
  // color: #fff;
  font-size: large;
  // width: 960px;
  // border-block-width: 20px;
  // position: relative;
  // text-align: left;
  // left:395.04px;
  // z-index: -3;

}

.content-header {
  padding-left: 20px;
}

.content-box {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 20px;

  .suggest-content {
    justify-content: space-between;
    display: flex;
    width: 100%;
  }

  .active-content {
    justify-content: space-between;
    display: flex;
    width: 100%;
  }
}

.function-content-right {
  //功能入口键
  display: flex;
  flex-wrap: wrap;
  padding-left: 43px;
  justify-content: space-between;
  row-gap: 40px;
}

img {
  border-radius: 20px;
  // css过渡
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  transition-delay: 0s;
}

img:hover {
  transform: scale(1.03);
  // 图片高亮
  -webkit-filter: brightness(90%);
  filter: brightness(90%);
}

.small-item {
  width: 240px;

  @media screen and (max-width:$xxl) {
    width: 210px;
  }

  @media screen and (max-width:$xl) {
    width: 140px;
  }

  @media screen and (max-width:$lg) {
    width: 121px;
  }

  @media screen and (max-width:$md) {
    width: 120px;
  }

  @media screen and (max-width:$sm) {}

  @media screen and (max-width:$xs) {
    width: 80px;
  }

  @media screen and (max-width:$xxs) {
    width: 60px;
  }
}

.large-item {
  width: 527.3px;

  @media screen and (max-width:$xxl) {
    width: 465px;
  }

  @media screen and (max-width:$xl) {
    width: 330px;
  }

  @media screen and (max-width:$lg) {
    width: 293px;
  }

  @media screen and (max-width:$md) {
    width: 278px;
  }

  @media screen and (max-width:$sm) {}

  @media screen and (max-width:$xs) {
    width: 193px;
  }

  @media screen and (max-width:$xxs) {
    width: 152px;
  }
}
</style>