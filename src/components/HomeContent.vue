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
      <h3 class="home-header function-header" style="">功能</h3>
      <div class="function-content">
        <img class="large-item" :title="`ppm`" src="src\assets\img\function\Function_Map.jpg" @click="jumpPage('ppm')">
        <div class="function-content-right">
          <!-- 使用antd的flex布局(UI内置) -->
          <a-row :gutter="[51, 16]">
            <a-col :span="12"><img class="small-item" :title="`bpht`" src="src\assets\img\function\Function_Map.jpg"
                @click="jumpPage('bpht')"></a-col>
            <a-col :span="12"><img class="small-item" :title="`ymra`"
                src="src\assets\img\function\Function_Map.jpg"></a-col>
          </a-row>
          <a-row :gutter="[51, 16]" style="padding-top: 40px;">
            <a-col :span="12"><img class="small-item" :title="`ymmn`"
                src="src\assets\img\function\Function_Map.jpg"></a-col>
            <a-col :span="12"><img class="small-item" :title="`info`" src="src\assets\img\function\Function_Map.jpg"
                @click="jumpPage('info')"></a-col>
          </a-row>
          <!-- 未使用antd的flex布局 -->
          <!-- <img class="small-item" :title="`bpht`" src="src\assets\img\function\Function_Map.jpg"
          @click="jumpPage('function')">
        <img class="small-item" :title="`ymra`" src="src\assets\img\function\Function_Map.jpg">
        <img class="small-item" :title="`ymmn`" src="src\assets\img\function\Function_Map.jpg">
        <img class="small-item" :title="`info`" src="src\assets\img\function\Function_Map.jpg"> -->
        </div>
      </div>
      <!-- 推荐快捷入口 -->
      <div class="suggest-content">
        <h3 class="home-header">推荐</h3>
        <a-row :gutter="[44, 8]">
          <a-col :span="6"><img class="small-item" :title="`Baidu`"
              src="src\assets\img\function\Function_Map.jpg"></a-col>
          <a-col :span="6"><img class="small-item" :title="`Bilibili`"
              src="src\assets\img\function\Function_Map.jpg"></a-col>
          <a-col :span="6"><img class="small-item" src="src\assets\img\function\Function_Map.jpg"></a-col>
          <a-col :span="6"><img class="small-item" src="src\assets\img\function\Function_Map.jpg"></a-col>
        </a-row>
      </div>
      <!-- 活跃数据展示 -->
      <div class="activity-show">
        <h3 class="home-header">活跃</h3>
        <a-row :gutter="[8, 8]">
          <a-col :span="12" style="width: 100.47px;height: 100px;border-radius: 20px;background-color: #382E32;"></a-col>
          <a-col :span="12" style="width: 100.47px;height: 100px;border-radius: 20px;background-color: #382E32;"></a-col>
        </a-row>
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
      headMenu: "",
    }
  }, methods: {
    // 路由跳转
    jumpPage(headMenu) {
      this.headMenu = headMenu;
      // router.push({ path: `/function/${headMenu}` });
      router.push({ path: "/function" });
      bus.$emit("currentMenu", headMenu);
      // console.log("ok", headMenu);

    },
  }, unmounted() {
    let headMenu = this.headMenu;
    // 功能页的默认组件显示逻辑交给触发方法，传递默认值以便在created()中一起渲染
    if (headMenu === "") {
      headMenu = "ppm";
    }
    this.jumpPage(headMenu);
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

.function-header {
  padding-left: 20px;
}

.function-content {
  display: flex;
  flex-wrap: nowrap;
  // flex-grow: 5;
}

.function-content-right {
  //功能入口键
  display: flex;
  flex-wrap: wrap;
  padding-right: 10px;
  padding-left: 47.5px;
  // padding-left: 2.6875vw;
  // // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // // overflow: hidden;
  // flex-grow: 6;
  // flex-shrink: 10;
}

.function-content,
.suggest-content,
.activity-show {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 1px;

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