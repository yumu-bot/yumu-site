import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.less'
// import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import { createPinia } from 'pinia' // 引入状态管理
import '@/assets/css/index.scss' // 无需在此处引入全局样式，默认已经引入
// import '@/assets/iconfont/iconfont.css' // 引入矢量图标样式
// import '@/assets/iconfont/iconfont.js'
import 'swiper'
// import bus from '../src/utils/bus.js'

const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
// 	app.component(key, component)
// }
app.use(router)
app.use(antd)
// app.config.globalProperties.$bus = bus;
app.mount('#app')

