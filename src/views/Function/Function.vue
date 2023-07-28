<template>
	<div class="function-nav">
		<a-menu :selectedKeys="currentMenu" mode="horizontal" style="font-size: large;">
			<a-menu-item v-for="(item) in menuList" :key="item.title" @click="changeMenuByNavbar(item.title, item.path)">{{
				item.header }}
			</a-menu-item>
		</a-menu>
	</div>
	<!-- <router-views></router-views> -->
	<div>
		<PPM v-show="current[0] === 'ppm'"></PPM>
		<BPHT v-if="current[0] === 'bpht'"></BPHT>
		<INFO v-if="current[0] === 'info'"></INFO>
	</div>
</template>

<script>
import bus from '../../utils/bus';
import PPM from './PPM.vue';
import BPHT from './BPHT.vue';
import INFO from './INFO.vue';
import { nextTick } from 'vue';
export default {
	data() {
		return {
			menuList: [{ key: "0", title: "ppm", path: "/function/ppm", header: "ppm" },
			{ key: "1", title: "bpht", path: "/function/bpht", header: "bpht" },
			{ key: "2", title: "info", path: "/function/info", header: "info" }],
			currentMenu: [], // 配合antd的:selectedKeys属性，定义currentMenu为字符串数组，home是默认值
			current: ["ppm"],
		}
	},
	components: {
		PPM,
		BPHT,
		INFO
	}, methods: {
		// 任意处路由跳转切换导航栏高亮
		changeMenuByRandom() {
			//兄弟组件事件总线通信
			bus.$on("currentMenu", (res) => {
				this.changeMenuByNavbar(res);
			})
		},
		// 导航栏切换高亮
		changeMenuByNavbar(selectedMenu) {
			// console.log(this.currentMenu);
			// console.log(menu);
			this.current.pop();
			this.current.push(selectedMenu);
			// console.log(this.current);
		}
	}, created() {
	},
	onBeforeMount() {
		// bus.$off("currentMenu")
	}, mounted() {
		this.changeMenuByRandom();
	}, watch: {
		// current: {
		// 	handler(oldVal, newVal) {
		// 		console.log("watching:" + oldVal, newVal);
		// 		// this.changeMenuByNavbar(newVal);
		// 	},
		// 	immediate: true
		// }
	},
}
</script>

<style lang="scss" scoped>
.function-nav {
	background-color: #54454C;
	padding-bottom: 10px;
}
</style>