
import { defineConfig } from "./common/config"

export default defineConfig({
    tailwindColors: {
        'custom': {
            '50': '#1a1a1a',  // 浅黑色，适合作为较亮的背景或卡片背景
            '100': '#2b2b2b',  // 深黑色背景，用于次要区域
            '200': '#3d3d3d',  // 较亮的灰黑色，用于分隔线或边框
            '300': '#525252',  // 中性灰色，适合作为文本色
            '400': '#696969',  // 更亮的灰色，用于图标或次要按钮
            '500': '#000000',  // 主色，纯黑
            '600': '#4a004d',  // 深紫点缀色，用于高亮元素
            '700': '#5a005f',  // 更深的紫色点缀，用于按钮悬停状态
            '800': '#6a0073',  // 明亮的紫色，用于强调色
            '900': '#7a0086',  // 强烈的亮紫色，用于视觉冲击
            '950': '#0d0d0d'   // 极深的黑灰色，适合作为深色主题的主背景
        },
        primary: {
            '50': '#1a1a1a',  // 浅黑色，适合作为较亮的背景或卡片背景
            '100': '#2b2b2b',  // 深黑色背景，用于次要区域
            '200': '#3d3d3d',  // 较亮的灰黑色，用于分隔线或边框
            '300': '#525252',  // 中性灰色，适合作为文本色
            '400': '#696969',  // 更亮的灰色，用于图标或次要按钮
            '500': '#000000',  // 主色，纯黑
            '600': '#4a004d',  // 深紫点缀色，用于高亮元素
            '700': '#5a005f',  // 更深的紫色点缀，用于按钮悬停状态
            '800': '#6a0073',  // 明亮的紫色，用于强调色
            '900': '#7a0086',  // 强烈的亮紫色，用于视觉冲击
            '950': '#0d0d0d'   // 极深的黑灰色，适合作为深色主题的主背景
        }
    },


    brandName: "Chinese Mystic Knowledge",
    tagline: "Discover the ancient wisdom of Chinese mysticism, blending tradition with modern insights to unlock life's secrets.",
    apiKey: '',
    apiURL: '',

    gtmID: '',

    favicon: '/favicon.svg',

    metaDescription: ``,

    metaKeywords: ``,
})