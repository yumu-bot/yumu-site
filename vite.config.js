import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
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
     }
      
    },
  }
)
