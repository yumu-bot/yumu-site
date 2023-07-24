<template>
	<div class="ppm-page">
		<div class="search-bar">
			<a-input placeholder="请输入用户名" enter-button="点击查询" size="large" style="width: 80%;">
			</a-input>
			<a-select style="width: 10%;" placeholder="default" size="large">
				<a-select-option value="osu">osu</a-select-option>
				<a-select-option value="taiko">taiko</a-select-option>
				<a-select-option value="catch">catch</a-select-option>
				<a-select-option value="mania">mania</a-select-option>
			</a-select>
			<a-button :icon="h(SearchOutlined)" style="width: 10%;" size="large">Search</a-button>
		</div>
		<div class="search-result">
			<!-- <a-spin /> -->
		</div>
	</div>
</template>

<script setup>
import { h } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';

</script>

<style lang="less" scoped>
.search-bar {
	padding-top: 5px;
	display: flex;
	flex-direction: row;
}

.search-result {
	text-align: center;
	background: rgba(0, 0, 0, 0.05);
	border-radius: 4px;
	margin-bottom: 20px;
	padding: 30px 50px;
	margin: 20px 0;
}
</style>