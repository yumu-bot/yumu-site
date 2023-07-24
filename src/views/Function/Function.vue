<template>
	<div class="function-nav">
		<a-menu :selectedKeys="currentMenu" mode="horizontal">
			<a-menu-item v-for="(item) in menuList" :key="item.title" @click="changeMenuByNavbar(item.title, item.path)">{{
				item.header }}
			</a-menu-item>
		</a-menu>
	</div>
	<router-view></router-view>
</template>

<script>
import bus from '../../utils/bus';
export default {
	data() {
		return {
			menuList: [{ key: "0", title: "ppm", path: "/ppm", header: "ppm" },
			{ key: "1", title: "bpht", path: "/bpht", header: "bpht" },
			{ key: "2", title: "info", path: "/info", header: "info" }],
			currentMenu: [""], // 配合antd的:selectedKeys属性，定义currentMenu为字符串数组，home是默认值
		}
	}, methods: {
		// 任意处路由跳转切换导航栏高亮
		changeMenuByRandom() {
			bus.$on("currentMenu", (res) => {
				this.currentMenu.pop();
				this.currentMenu.push(res);
				console.log(this.currentMenu)
			});//兄弟组件事件总线通信
		},
		// 导航栏切换高亮
		changeMenuByNavbar(selectedMenu, path) {
			// console.log(this.currentMenu);
			// console.log(menu);
			this.currentMenu.pop();
			this.currentMenu.push(selectedMenu);
			this.$router.push(path);
		},
	}, mounted() {
		this.changeMenuByRandom();
	}
	, watch: {
		"$route"() {
			// 监听路由是否前进/后退，发生变化则触发导航栏切换高亮
			if (this.$router.push) {
				console.log(this.$route.name, this.$route.path);
				let selectedMenu = this.$route.name;
				let path = this.$route.path;
				this.changeMenuByNavbar(selectedMenu, path);
			}
		}
	}

}
</script>

<style lang="less" scoped></style>