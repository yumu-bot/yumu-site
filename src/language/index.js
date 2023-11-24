import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en_US'

const i18n = createI18n({
  legacy: false,
  locale: 'zh', // 默认显示语言
  messages: {
    '简体中文': zhCN,
    'English': enUS
  }
})

export default i18n