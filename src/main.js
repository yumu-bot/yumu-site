import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import antd from 'ant-design-vue'
// import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import { createPinia } from 'pinia' // 引入状态管理
import '@/assets/css/index.scss' // 无需在此处引入全局样式，默认已经引入
// import '@/assets/iconfont/iconfont.css' // 引入矢量图标样式
// import '@/assets/iconfont/iconfont.js'
import 'swiper'
import VuePlyr from 'vue-plyr'
import i18n from './language'
import { createPinia } from 'pinia'
const app = createApp(App)
const pinia=createPinia()
app.use(router)
app.use(antd)
app.use(VuePlyr, {
	plyr: {
	
	}
})
app.use(i18n)
app.use(pinia)
i18n.global.locale.value = '简体中文'
// app.config.globalProperties.$bus = bus;
app.mount('#app')

