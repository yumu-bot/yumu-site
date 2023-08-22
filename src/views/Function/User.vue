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
				{ label: "PP-", value: "ppm" },
				{ label: "分析最好成绩", value: "bpa" },
				{ label: "查询单个成绩", value: "score" },
				{ label: "查询多个成绩", value: "scores" },
			],
			nowfunction: "ppm",//指定查询功能,默认为ppm
			type: 0,//功能类型
			key: 0,//
			bid: "",//
			scoreType: "",//成绩功能类型
			mod: ""
		}
	}, props: {

	}, components: {
		SearchResultBanner,
		UserRequestBar,
	}
	, methods: {
		//发送查询请求
		async sendRequest() {
			// 表单验证
			if (this.username === "") {
				message.warning("用户名不能为空")
			} else {
				this.spinning = true;//图片正在加载
				this.status = "loading";
				// 支持用户名+mode查询传参
				if (this.type === 0) {
					this.getPerformancePoint();
				}
				// 支持用户名+mode+可选附加项传参
				if (this.type === 1) {
					this.getScore();
				}
				// 图片加载超时切换状态为error,超时限制为1分钟
				let timer = setTimeout(() => {
					if (this.status !== "") {
						this.status = "error";
						message.warning("图片加载超时,请稍后再试(可尝试连接vpn改善网络状况)")
					} else {
						// 若加载成功,清除定时器
						clearTimeout(timer);
					}
				}, 60000);
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
		init(data) {
			this.username = data.username;
			this.mode = data.mode;
			this.nowfunction = data.nowfunction;
			this.type = data.type;
			this.scoreType = data.scoreType;
			this.key = data.key;
			this.bid = data.bid;
			this.mod = data.mod;
			this.sendRequest();
		},
		// 查询ppm/bpa
		getPerformancePoint() {
			let paramsObj = {
				u1: this.username,
				mode: this.mode,
			}
			this.imgUrl = this.baseUrl + `/${this.nowfunction}?u1=${paramsObj.u1}&mode=${paramsObj.mode}`;
		},
		// 查询score/scores
		getScore() {
			let paramsObj = {
				u1: this.username,
				mode: this.mode,
				scoreType: this.scoreType,//score类型:pr/re/bp/score scores类型:bp-days/bp-range/pr/re
				value: this.key,//查询序号/范围(1-x) x为100或999
				bid: parseInt(this.bid),//谱面id
				mod: this.mod,//游玩mod
			}
			//发送查询请求
			if (paramsObj.scoreType === this.nowfunction) {
				let mod = paramsObj.mod === [] ? "" : paramsObj.mod.toString().replaceAll(/,/g, "");
				// 查询谱面成绩
				if (mod === "") {
					// 不查询指定mod(默认查询分数最高成绩)
					this.imgUrl = this.baseUrl + `/${this.nowfunction}?u1=${paramsObj.u1}&mode=${paramsObj.mode}&bid=${paramsObj.bid}`;
				} else {
					// 查询指定mod
					this.imgUrl = this.baseUrl + `/${this.nowfunction}?u1=${paramsObj.u1}&mode=${paramsObj.mode}&bid=${paramsObj.bid}&mods=${mod}`;
				}
			} else {
				// 查询pr/re/bp/bp-days/bp-range
				this.imgUrl = this.baseUrl + `/${this.nowfunction}/${paramsObj.scoreType}?u1=${paramsObj.u1}&mode=${paramsObj.mode}&n=${paramsObj.value}`;
			}
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