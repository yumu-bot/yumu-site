<!-- 
 * @description: 功能展示页
 * @fileName: Function.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-19 14:45:10
 * @version: V1.0.0 
!-->
<template>
	<!-- 功能导航栏 -->
	<div class="function-nav">
		<a-menu :selectedKeys="currentMenu" mode="horizontal" style="font-size: large;color: #ffffff;">
			<a-menu-item v-for="(item) in menuList" :key="item.title" @click="changeMenuByNavbar(item.title, item.path)">{{
				item.header }}
			</a-menu-item>
		</a-menu>
	</div>
	<!-- 功能组件展示 -->
	<div>
		<User v-show="current[0] === 'user'"></User>
		<UserVS v-if="current[0] === 'uservs'"></UserVS>
		<Match v-if="current[0] === 'match'"></Match>
		<Beatmap v-if="current[0] === 'beatmap'"></Beatmap>
		<Entertainment v-if="current[0] === 'entertainment'"></Entertainment>
	</div>
</template>

<script>
import bus from '../../utils/bus';
import User from './User.vue';
import UserVS from './UserVS.vue';
import Match from './Match.vue';
import Beatmap from './Beatmap.vue';
import Entertainment from './Entertainment.vue';
export default {
	data() {
		return {
			// 功能导航栏列表
			menuList: [
				{ key: "0", title: "user", path: "/function/user", header: "user" },
				{ key: "1", title: "uservs", path: "/function/uservs", header: "uservs" },
				{ key: "2", title: "match", path: "/function/match", header: "match" },
				{ key: "3", title: "beatmap", path: "/function/beatmap", header: "beatmap" },
				{ key: "4", title: "entertainment", path: "/function/entertainment", header: "entertainment" },
			],
			currentMenu: [], // 配合antd的:selectedKeys属性，定义currentMenu为字符串数组，home是默认值
			current: ["user"],
		}
	},
	components: {
		User,
		UserVS,
		Match,
		Beatmap,
		Entertainment,
	}, methods: {
		// 任意处路由跳转切换导航栏高亮
		changeMenuByRandom() {
			//兄弟组件事件总线通信
			bus.$on("currentMenu", (res) => {
				if (res === undefined) {
					this.changeMenuByNavbar("user");
				} else {
					this.changeMenuByNavbar(res);
				}
			})
		},
		// 导航栏切换高亮
		changeMenuByNavbar(selectedMenu) {
			this.current.pop();
			this.current.push(selectedMenu);
		}
	}, created() {
		this.changeMenuByRandom();
	}, unmounted() {
	}
	, watch: {

	},
}
</script>

<style lang="scss" scoped>
.function-nav {
	background-color: #54454C;
	padding-bottom: 10px;
}
</style>