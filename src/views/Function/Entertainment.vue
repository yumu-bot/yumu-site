<template>
	<div class="chat-window">
		<div ref="chat" class="chat-area">
			<div v-for=" i in chatList" :key="i">
				<p class="userchat" v-if="i.input">
					<span class="timeline" v-if="i.isShow">{{ i.time }}</span>
					<a-space style="margin-left: auto;" :size="16">
						<div class="border">
							<span style="margin-left: auto;">Muziyami</span>
							<span class="chatline">{{ i.input }}</span>
						</div>
						<div style="margin-bottom: auto;">
							<a-avatar :size="64" src="/img/avatar/Head_yuyuko_Qiqi.png"></a-avatar>
						</div>
					</a-space>
				</p>
				<div class="spinbar" v-if="i.isSpinning">
					<a-spin></a-spin>
				</div>
				<p class="botchat" v-if="i.output">
					<a-space class="botchat" :size="16">
						<a-avatar :size="64" src="/img/avatar/avatar-guest@2x.png"></a-avatar>
						<div class="border">
							<span>YumuBot</span>
							<span class="chatline">{{ i.output }}</span>
						</div>
					</a-space>
				</p>
			</div>
		</div>
		<div class="chat-bar">
			<a-input v-model:value="input" @keydown.enter="sendChat()" allowClear size="large"
				placeholder="请输入你想说的话"></a-input>
			<a-button type="primary" @click="sendChat()" size="large">发送</a-button>
			<a-button @click="clearChat()" size="large">清屏</a-button>
		</div>

	</div>
</template>

<script setup name="Entertainment">
import dayjs from "dayjs";
import { nextTick, ref, watch } from "vue";
import { getDice } from "../../api/data_api"
import { useI18n } from 'vue-i18n'
const I18n = useI18n()
const { locale, t } = useI18n()
let chatList = ref([]);// 聊天列表
let isShow = ref(true);
let isSpinning = ref(true);

const chat = ref();
const now = ref(dayjs().format("YYYY-MM-DD HH:mm:ss"));

let input = ref("");
// 发送消息
function sendChat() {
	isSpinning.value = true;
	if (input.value) {
		chatList.value.push({ input: input.value, time: now.value, isShow: isShow.value, isSpinning: isSpinning.value });
		//消息处理逻辑
		getDice({ compare: input.value }).then((res) => {
			if (res.data) {
				let output = res.data;
				isSpinning.value = false;
				chatList.value[chatList.value.length - 1].isSpinning = false;//接收消息后停止加载
				chatList.value.push({ output: output });
				scrollToBottom();
			}
		}).catch((e) => {
			chatList.value[chatList.value.length - 1].isSpinning = false;//接收消息后停止加载
		});
		input.value = "";// 清空输入框
		scrollToBottom();
		updateTimeline();
	};
};
// 监听滚动事件
function scrollToBottom() {
	nextTick(() => {
		chat.value.scrollTo({
			top: chat.value.scrollHeight,
			behavior: "smooth"
		});
	});
}
// 更新时间戳
function updateTimeline() {
	if (isShow.value) {
		isShow.value = false;
		setTimeout(() => {
			isShow.value = true;
			now.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
		}, 120000);
	}
};
// 清空聊天记录
function clearChat() {
	chatList.value.length = 0
	isShow.value = true;
	now.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
}
</script>

<style lang="scss" scoped>
.chat-window {
	padding: 20px;
	border: #54454c 20px solid;
}

.chat-area {
	width: 100%;
	height: 600px;
	overflow: auto;
	display: flex;
	flex-direction: column;
	row-gap: 20px;

	.userchat {
		display: flex;
		padding: 0 10px;
		flex-direction: column;

		:deep(.ant-space .ant-space-item):last-child {
			margin-bottom: auto;
		}
	}

	.botchat {
		padding: 0 10px;
	}
}

.chat-bar {
	display: flex;
	margin-top: 20px;
	column-gap: 10px;
}

.border {
	display: flex;
	flex-direction: column;
	row-gap: 5px;
}

.spinbar {
	text-align: center;
}

.chatline {
	background-color: #909090;
	width: auto;
	height: auto;
	display: flex;
	border-radius: 10px;
	font-size: large;
	padding: 10px;
}

.timeline {
	text-align: center;
	font-size: medium;
}

:deep(.ant-spin .ant-spin-dot-item) {
	background-color: #fff;
}
</style>