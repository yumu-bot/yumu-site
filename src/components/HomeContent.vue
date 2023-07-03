<template>
  <div class="home-content">
    <div class="image-swiper">
      <ImageSwiper></ImageSwiper>
    </div>
    <!-- <a-space direction="vertical"> -->
    <span style="padding: 20px;">功能</span>
    <div class="function-content">
      <img src="src\assets\img\function\Function_Map.jpg">
      <div class="function-item">
        <a-row :gutter="[32, 16]">
          <a-col :span="12"><img class="small-item" src="src\assets\img\function\Function_Map.jpg"></a-col>
          <a-col :span="12"><img class="small-item" src="src\assets\img\function\Function_Map.jpg"></a-col>
        </a-row>
        <a-row :gutter="[32, 16]" style="padding-top: 60px;">
          <a-col :span="12"><img class="small-item" src="src\assets\img\function\Function_Map.jpg"></a-col>
          <a-col :span="12"><img class="small-item" src="src\assets\img\function\Function_Map.jpg"></a-col>
        </a-row>
      </div>
    </div>
    <div class="suggest-content">
      <span>推荐</span>
      <a-row :gutter="[44, 8]">
        <a-col :span="6"><img class="small-item" src="src\assets\img\function\Function_Map.jpg"></a-col>
        <a-col :span="6"><img class="small-item" src="src\assets\img\function\Function_Map.jpg"></a-col>
        <a-col :span="6"><img class="small-item" src="src\assets\img\function\Function_Map.jpg"></a-col>
        <a-col :span="6"><img class="small-item" src="src\assets\img\function\Function_Map.jpg"></a-col>
      </a-row>
    </div>
    <div class="activity-show">
      <span>活跃</span>
    </div>
    <!-- </a-space> -->
  </div>
</template>

<script setup>
import ImageSwiper from '@/components/ImageSwiper.vue';
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
  display: flex;
  flex-wrap: wrap;
  padding-right: 20px;
  padding-left: 20px;
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
  // top: 5px;

}

img {
  border-radius: 20px;
}

.small-item {
  width: 240px;
}
</style>