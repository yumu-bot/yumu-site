<template>
	<div class="ppm-page">
		<div class="search-bar">
			<a-input placeholder="请输入用户名" enter-button="点击查询" size="large" style="width:810px;" v-model:value=username>
			</a-input>
			<a-select style="width:110px;" placeholder="游戏模式" size="large">
				<a-select-option value="osu">osu</a-select-option>
				<a-select-option value="taiko">taiko</a-select-option>
				<a-select-option value="catch">catch</a-select-option>
				<a-select-option value="mania">mania</a-select-option>
			</a-select>
			<a-button style="width: 130px;" size="large">复制到剪贴板</a-button>
			<a-button style="width: 70px;" size="large" @click="getPPM">生成!</a-button>
		</div>
		<div class="search-result">
			<a-spin :spinning="spinning">
				<a-image class="result-image" :src=imgUrl></a-image>
			</a-spin>
		</div>
	</div>
</template>

<script>
import { getPPM } from '../../api/data_api';
export default {
	data() {
		return {
			username: "",
			imgUrl: "",
			spinning: false,
		}
	}, methods: {
		async getPPM() {
			this.spinning = true;
			let paramsObj = {
				u1: this.username,
			}
			await getPPM(paramsObj).then((res) => {
				if (res.status === 200) {
					// console.log(res)
					// let blob = new Blob([res.data], { type: "image/png" });
					let url = `https://bot.365246692.xyz/pub/ppm?u1=${paramsObj.u1}`;
					this.imgUrl = url;
					console.log(this.imgUrl);
					this.spinning = false;
				}
			}).catch(() => {

			})
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

.search-result {
	text-align: center;
	background-color: #54454C;
	padding: 10px 0px;
	height: 712px;
}

.result-image {
	width: -webkit-fill-available;

}
</style>