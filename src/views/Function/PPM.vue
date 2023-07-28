<template>
	<div class="ppm-page">
		<div class="search-bar">
			<a-space direction="horizontal">
				<a-input placeholder="请输入用户名" enter-button="点击查询" size="large" style="width: 810px;">
				</a-input>
				<a-select style="width:110px;" placeholder="游戏模式" size="large">
					<a-select-option value="osu">osu</a-select-option>
					<a-select-option value="taiko">taiko</a-select-option>
					<a-select-option value="catch">catch</a-select-option>
					<a-select-option value="mania">mania</a-select-option>
				</a-select>
				<a-button style="width: auto;" size="large">复制到剪贴板</a-button>
				<a-button style="width: auto;" size="large">生成!</a-button>
			</a-space>
		</div>
		<div class="search-result">
			少女祈祷中……
		</div>
	</div>
</template>

<script>
import { h } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
export default {

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
	// flex:1;
	width: inherit;
	background-color: #54454C;
}

.search-result {
	text-align: center;
	background-color: #54454C;
	// border-radius: 4px;
	// margin-bottom: 20px;
	padding: 30% 0px;
	margin: 10px 0;
}
</style>