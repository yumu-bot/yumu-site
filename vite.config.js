import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'
import { resolve } from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform:true
    }),
    alias(),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@': resolve(__dirname, "./src"),
      '*':resolve('')
    }
  },
  // 代理配置
  server: {
    // host: "0.0.0.0",
    // cors: true,
    // port: 5173,
    // open: false,
    proxy: {
      "/pub": {
        target: "https://bot.365246692.xyz/pub",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/pub/, '')
        
      }
    }
  },
  css: {
    // ant designer v4以前的自定义主题引入方案(使用less) 
    // preprocessorOptions: {
    //   less: {
    //     modifyVars: {
    //       'primary-color': '#2A2226',//全局主色
    //       // 'primary-color':'#fff',//全局主色
    //       // 'link-color': 'red',//链接色
    //       'border-radius-base': '2px',
    //       'component-background':'#46393F',//组件背景色
    //       // 'border-color-split':'#2A2226'//边框分割线色
    //       'text-color': '#fff',//主文本色
    //         'heading-color':'#fff'//标题色
    //       },
    //       javascriptEnabled: true,
    //     }, 
     },
  esbuild: {
    drop:['console','debugger']
  }
    },
)


