<template>
	<div class="ppm-page">
		<div class="search-bar">
			<a-input placeholder="请输入用户名" enter-button="点击查询" size="large" style="width:810px;" v-model:value=username
				allow-clear @keyup.enter="getPPM">
			</a-input>
			<a-select style="width:110px;" :options="modes" size="large" v-model:value=mode>
				<a-select-option v-for="(item, index) in modes" :key="index" :label="item.label"
					:value="item.value"></a-select-option>
			</a-select>
			<a-tooltip :title=PPMCommand arrow-point-at-center>
				<a-button style="width: 130px;" size="large" @mouseenter="getPPMCommand(mode, username)">复制到剪贴板</a-button>
			</a-tooltip>
			<a-button style="width: 70px;" size="large" @click="getPPM">生成!</a-button>
		</div>
		<SearchResultBanner :status="status" :imgUrl="imgUrl" :spinning="spinning"></SearchResultBanner>
	</div>
</template>

<script>
import { getPPM } from '../../api/data_api';
import { message } from 'ant-design-vue';
import SearchResultBanner from '../../components/SearchResult/SearchResultBanner.vue';
export default {
	data() {
		return {
			username: "",
			imgUrl: "",
			spinning: false,
			status: "fetching",
			loaded: false,
			preImgUrl: "",
			mode: "osu",
			modes: [
				{ label: "osu", value: "osu", id: "0" },
				{ label: "taiko", value: "taiko", id: "1" },
				{ label: "catch", value: "catch", id: "2" },
				{ label: "mania", value: "mania", id: "3" },
			],
			PPMCommand: ""
		}
	}, props: {

	}, components: {
		SearchResultBanner,
	}
	, methods: {
		//查询ppm
		async getPPM() {
			// 表单验证
			if (this.username === "") {
				message.warning("用户名不能为空")
			} else {
				this.spinning = true;
				this.status = "loading";
				let paramsObj = {
					u1: this.username,
					mode: this.mode,
				}
				await getPPM(paramsObj).then((res) => {
					this.preImgUrl = this.imgUrl;
					if (res.status === 200) {
						this.imgUrl = "";
						// console.log(res)
						let url = `https://bot.365246692.xyz/pub/ppm?u1=${paramsObj.u1}&mode=${paramsObj.mode}`;
						this.imgUrl = url;
						console.log(this.imgUrl);
						this.status = "success";
						this.spinning = false;
					} else {

					}
				}).catch((e) => {
					message.warning("用户不存在");
					this.spinning = false;
					this.status = "error";
					// console.log(e)
				}).finally(() => {
				})
			}

		},
		// 获取文字指令
		getPPMCommand(mode, username) {
			let modeId;
			for (let i = 0; i < this.modes.length; i++) {
				if (this.modes[i].value === mode) {
					modeId = this.modes[i].id;
				}
			}
			this.PPMCommand = "!ppm:" + modeId + " " + username;
		}
	}
}
</script>

<style lang="scss" scoped>
.ppm-page {
	width: 100%;
}

.search-bar {
	padding: 10px 0;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between; // flex:1;
	width: inherit;
	background-color: #54454C;
}
</style>