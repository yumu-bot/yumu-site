<!-- 首页内容展示 -->
<template>
  <div class="home-content">
    <!-- 图片滑动展示 -->
    <div class="image-swiper">
      <ImageSwiper></ImageSwiper>
    </div>
    <!-- <a-space direction="vertical"> -->
    <!-- 功能快捷入口 -->
    <h3 class="home-header" style="padding-left: 20px;">功能</h3>
    <div class="function-content">
      <img class="large-item" :title="`ppm`" src="src\assets\img\function\Function_Map.jpg" @click="jumpPage('about')">
      <div class="function-item">
        <a-row :gutter="[51, 16]">
          <a-col :span="12"><img class="small-item" :title="`bpht`" src="src\assets\img\function\Function_Map.jpg"
              @click="jumpPage('function')"></a-col>
          <a-col :span="12"><img class="small-item" :title="`ymra`"
              src="src\assets\img\function\Function_Map.jpg"></a-col>
        </a-row>
        <a-row :gutter="[51, 16]" style="padding-top: 40px;">
          <a-col :span="12"><img class="small-item" :title="`ymmn`"
              src="src\assets\img\function\Function_Map.jpg"></a-col>
          <a-col :span="12"><img class="small-item" :title="`info`"
              src="src\assets\img\function\Function_Map.jpg"></a-col>
        </a-row>
      </div>
    </div>
    <!-- 推荐快捷入口 -->
    <div class="suggest-content">
      <h3 class="home-header">推荐</h3>
      <a-row :gutter="[44, 8]">
        <a-col :span="6"><img class="small-item" :title="`Baidu`" src="src\assets\img\function\Function_Map.jpg"></a-col>
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
  data() {
    return {
      headMenu: "",

    }
  }, methods: {
    // 路由跳转
    jumpPage(headMenu) {
      router.push({ path: `/${headMenu}` });
      // console.log("jumped to " + headMenu);
      this.handleClick(headMenu);
    },
    // 路由传值(通过事件总线传值给导航栏组件)
    handleClick(headMenu) {
      bus.$emit("currentMenu", headMenu);
    }
  }
}


</script>

<style lang="less" scoped>
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

.function-content {
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 5;
}

.function-item {
  //功能入口键
  display: flex;
  flex-wrap: wrap;
  padding-right: 10px;
  padding-left: 42px;
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
}

.large-item {
  width: 523.47px;
}
</style>