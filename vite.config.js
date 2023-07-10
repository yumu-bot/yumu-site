import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import postcsspxtoviewport from 'postcss-px-to-viewport'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  , css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#2A2226',//全局主色
          // 'primary-color':'#fff',//全局主色
          'link-color': 'red',//链接色
          'border-radius-base': '2px',
          'component-background':'#46393F',//组件背景色
          // 'border-color-split':'#2A2226'//边框分割线色
          'text-color': '#fff',//主文本色
            'heading-color':'#fff'//标题色
          },
          javascriptEnabled: true,
        }, 
     },
      postcss: {
        plugins: [
          // 屏幕自适应
          postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 1920, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['a-'], // 指定不转换为视窗单位的类名,例如van-（vantUI组件），
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配，最好不要排除node_modules 文件，排除后在项目中会发现字体不能跟随页面放大
          exclude: [],
          landscape: false // 是否处理横屏情况
        })
        ]
      }
    },
  }
)


