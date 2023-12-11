<!-- 
 * @description: 功能展示页
 * @fileName: Function.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-19 14:45:10
 * @others：展示所有功能的主页面
!-->
<template>
	<!-- 功能导航栏 -->
	<div class="function-nav">
		<a-menu :selectedKeys="state.current" mode="horizontal" style="font-size: large;color: #ffffff;">
			<a-menu-item class="function-item" v-for="(item) in state.menuList" :key="item.title"
				@click="changeMenuByNavbar(item.title, item.path)">{{ $t(`functionTooltip.${item.title}`) }}
			</a-menu-item>
		</a-menu>
	</div>
	<!-- 功能组件展示 -->
	<div style="height:auto;">
		<User v-show="state.current[0] === 'user'"></User>
		<UserVS v-if="state.current[0] === 'uservs'"></UserVS>
		<Match v-if="state.current[0] === 'match'"></Match>
		<Beatmap v-if="state.current[0] === 'beatmap'"></Beatmap>
		<Mappool v-if="state.current[0] === 'mappool'"></Mappool>
		<Entertainment v-if="state.current[0] === 'entertainment'"></Entertainment>
	</div>
</template>

<script setup name="Function">
import bus from '../../utils/bus';
import User from './User.vue';
import UserVS from './UserVS.vue';
import Match from './Match.vue';
import Beatmap from './Beatmap.vue';
import Mappool from './Mappool.vue';
import Entertainment from './Entertainment.vue';
import { watch, reactive, onUnmounted, onBeforeMount } from 'vue';
const state = reactive({
	// 功能导航栏列表
	menuList: [
		{ key: "0", title: "user", path: "/function/user", header: "玩家数据" },
		{ key: "1", title: "uservs", path: "/function/uservs", header: "玩家对比" },
		{ key: "2", title: "match", path: "/function/match", header: "比赛查询" },
		{ key: "3", title: "beatmap", path: "/function/beatmap", header: "谱面查询" },
		{ key: "4", title: "mappool", path: "/function/mappool", header: "图池制作" },
		{ key: "5", title: "entertainment", path: "/function/entertainment", header: "娱乐功能" },
	],
	currentMenu: [], // 配合antd的:selectedKeys属性，定义currentMenu为字符串数组，home是默认值
	current: ["user"],
});
// 任意处路由跳转切换导航栏高亮
function changeMenuByRandom() {
	//兄弟组件事件总线通信
	bus.$on("currentMenu", (res) => {
		if (res === undefined) {
			changeMenuByNavbar("user");
		} else {
			changeMenuByNavbar(res);
			bus.$off("currentMenu");//通信结束后移除该事件
		}
	})
};
// 导航栏切换高亮
function changeMenuByNavbar(selectedMenu) {
	state.current.pop();
	state.current.push(selectedMenu);
};
onBeforeMount(() => {
	changeMenuByRandom();
});
onUnmounted(() => {
	state.current = []
});
</script>

<style lang="scss" scoped></style>