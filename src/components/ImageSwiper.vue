<!-- 图片滑动展示组件 -->
<template>
	<div class="swiperbox">
		<swiper :slidesPerView="1" :spaceBetween="30" :loop="true" :centeredSlides="true" :pagination="{
			clickable: true
		}" :autoplay="{
	delay: 2500,
	disableOnInteraction: false
}" :navigation="true" :modules="modules" class="mySwiper">
			<swiper-slide><img src="src/assets/img/swiper/Banner_1.jpg" alt="" /></swiper-slide>
			<swiper-slide><img src="src/assets/img/swiper/Banner_2.jpg" alt="" /></swiper-slide>
			<swiper-slide><img src="src/assets/img/swiper/Banner_3.jpg" alt="" /></swiper-slide>
		</swiper>
	</div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'; // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from 'swiper';
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//默认滑动效果（这里面注释掉的可以不要）
// const onSwiper = swiper => {
// 	console.log(swiper);
// };
// const onSlideChange = e => {
// 	// swiper切换的时候执行的方法
// 	console.log('slide change', e.activeIndex);
// };
// setup语法糖只需要这样创建一个变量就可以正常使用分页器和对应功能，如果没有这个数组则无法使用对应功能
const modules = [Autoplay, Pagination, Navigation, A11y];
</script>

<style lang="less" scoped>
.mySwiper {
	width: inherit;
	height: 250px;
}

.swiper-slide {
	text-align: center;
	font-size: 18px;
	background: #fff;
	/* Center slide text vertically */
	display: -webkit-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
}

.mySwiper img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

//这里使用的:deep样式穿透
:deep(.swiper-pagination) .swiper-pagination-bullet.swiper-pagination-bullet-active {
	background-color: rgb(229, 180, 127);
}

:deep(.swiper-pagination-bullet) {
	width: 14px;
	height: 14px;
	background-color: #fff;
}

.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
:deep(.swiper-pagination-horizontal.swiper-pagination-bullets) .swiper-pagination-bullet {
	margin: 0 8px;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
	color: rgb(229, 180, 127);
}
</style>
