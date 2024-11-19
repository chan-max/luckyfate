import en from './lang/en.json'
import zh from './lang/zh.json'

export default defineI18nConfig(() => ({
    legacy: false,  // 是否兼容之前
    fallbackLocale: 'zh',  // 区配不到的语言就用en
    messages: {
        en: en,
        zh: zh,
    }
}))