<!-- 
 * @description: 玩家查询页组件
 * @fileName: User.vue 
 * @author: SIyuyuko 
 * @date: 2023-08-19 14:37:35
 * @version: V1.0.0 
!-->
<template>
	<div class="user-page">
		<!-- 玩家查询搜索框(支持用户名+mode查询) -->
		<UserRequestBar :modes="modes" :functions="functions" :init="init"></UserRequestBar>
		<!-- 搜索结果banner -->
		<SearchResultBanner :status="status" :imgUrl="imgUrl" :spinning="spinning" @changeStatus="changeStatus"
			@isSpinning="isSpinning"></SearchResultBanner>
	</div>
</template>

<script>
import { message } from 'ant-design-vue';
import SearchResultBanner from '../../components/SearchResult/SearchResultBanner.vue';
import UserRequestBar from '../../components/SearchBar/UserRequestBar.vue'
export default {
	data() {
		return {
			baseUrl: "",
			username: "",//用户名
			imgUrl: "",//图片地址
			spinning: false,//加载状态
			status: "fetching",//查询状态
			mode: "osu",//指定查询mode,默认为osu
			// 游戏模式列表
			modes: [
				{ label: "osu", value: "osu", id: "0" },
				{ label: "taiko", value: "taiko", id: "1" },
				{ label: "catch", value: "catch", id: "2" },
				{ label: "mania", value: "mania", id: "3" },
			],
			// 功能列表
			functions: [
				{ label: "ppm", value: "ppm" },
				{ label: "bpa", value: "bpa" },
			],
			nowfunction: "ppm",//指定查询功能,默认为ppm
		}
	}, props: {

	}, components: {
		SearchResultBanner,
		UserRequestBar,
	}
	, methods: {
		//查询ppm
		async sendRequest() {
			// 表单验证
			if (this.username === "") {
				message.warning("用户名不能为空")
			} else {
				this.spinning = true;//图片正在加载
				this.status = "loading";
				let paramsObj = {
					u1: this.username,
					mode: this.mode,
				}
				this.imgUrl = this.baseUrl + `/${this.nowfunction}?u1=${paramsObj.u1}&mode=${paramsObj.mode}`;
				// 图片加载超时切换状态为error,超时限制为1分钟
				let timer = setTimeout(() => {
					if (this.status !== "") {
						this.status = "error";
						message.error("图片加载超时,请稍后再试(可尝试连接vpn改善网络状况)")
					}
				}, 10000);
				// 若加载成功,清除定时器
				if (this.status === "") {
					clearTimeout(timer);
				}
			}
		},
		//修改查询状态(emit)
		changeStatus(status) {
			this.status = status;
		},
		// 修改加载状态(emit)
		isSpinning() {
			this.spinning = false;//图片加载成功
		},
		// 初始化传递参数,触发查询
		init(username, mode, nowfunction) {
			this.username = username;
			this.mode = mode;
			this.nowfunction = nowfunction;
			this.sendRequest();
		}
	},
	created() {
		this.imgUrl = "";
		this.baseUrl = import.meta.env.VITE_BASEURL;
	}
}
</script>

<style lang="scss" scoped>
.user-page {
	width: 100%;
}
</style>