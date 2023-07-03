import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
// import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import { createPinia } from 'pinia' // 引入状态管理
import '@/assets/css/index.less' // 无需在此处引入全局样式，默认已经引入
// import '@/assets/iconfont/iconfont.css' // 引入矢量图标样式
// import '@/assets/iconfont/iconfont.js'
import 'swiper'

const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
// 	app.component(key, component)
// }
app.use(router)
app.use(antd)
app.mount('#app')

// const debounce = (fn, delay) => {
//   let timer = null;
//   return function () {
//     let context = this;
//     let args = arguments;
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//       fn.apply(context, args);
//     }, delay);
//   }
// }
// const _ResizeObserver = window.ResizeObserver;
// window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
//   constructor(callback) {
//     callback = debounce(callback, 16);
//     super(callback);
//   }
// }
