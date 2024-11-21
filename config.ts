
import { defineConfig } from "./common/config"

export default defineConfig({
    tailwindColors: {
        'custom': {
            '50': '#f5e8ff',   // 非常浅的背景色
            '100': '#e7c8ff',  // 浅紫色
            '200': '#d0a3ff',  // 较浅的紫色
            '300': '#b278ff',  // 明亮的中间色
            '400': '#914fff',  // 亮紫色
            '500': '#6900ff',  // 主色
            '600': '#5800d9',  // 略深
            '700': '#4500b4',  // 更深
            '800': '#340092',  // 深紫色
            '900': '#270078',  // 最深的主色
            '950': '#150045',  // 极深色，适合暗主题背景
        },
        primary: {
            '50': '#f5e8ff',   // 非常浅的背景色
            '100': '#e7c8ff',  // 浅紫色
            '200': '#d0a3ff',  // 较浅的紫色
            '300': '#b278ff',  // 明亮的中间色
            '400': '#914fff',  // 亮紫色
            '500': '#6900ff',  // 主色
            '600': '#5800d9',  // 略深
            '700': '#4500b4',  // 更深
            '800': '#340092',  // 深紫色
            '900': '#270078',  // 最深的主色
            '950': '#150045',  // 极深色，适合暗主题背景
        }
    },


    brandName: "funny word",
    tagline: 'Your guide to fate, zodiac, and wisdom.',
    apiKey: '',
    apiURL: '',

    gtmID: '',

    favicon: '/favicon.svg',

    metaDescription: ``,

    metaKeywords: ``,
})