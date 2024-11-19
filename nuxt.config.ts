import config from './config'

import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineNuxtConfig({
  ssr: false,
  // ssr:true,target:'static',
  vite: {
    plugins: [vueJsx()], // 加载 Vue JSX 插件
  },
  typescript: {
    shim: false, // 禁用 shim，提高类型推断能力
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: `${config.brandName} - ${config.tagline}`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: config.metaDescription },
        { hid: 'keywords', name: 'keywords', content: config.metaKeywords },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: config.favicon },
        { rel: 'preconnect', href: 'https://securepubads.g.doubleclick.net' },
        { rel: 'dns-prefetch', href: 'https://securepubads.g.doubleclick.net' },
        { rel: 'preload', href: 'https://www.googletagservices.com/tag/js/gpt.js', as: 'script' }
      ],
      script: [
        { src: 'https://securepubads.g.doubleclick.net/tag/js/gpt.js', async: false, defer: false },
      ]
    }
  },
  runtimeConfig: {
    public: {
      appEnv: process.env.NODE_ENV || 'development',
      baseURL: process.env.BASE_URL || 'http://localhost:3000',
      apiURL: process.env.API_URL || config.apiURL,
      apiKey: process.env.API_KEY || config.apiKey,
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/main.scss'],
  build: {
    transpile: ['element-plus'], // 确保正确编译 Element Plus
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    "@nuxt/image",
    '@ant-design-vue/nuxt',
    "@stefanobartoletti/nuxt-social-share",
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],
  // gtm: {
  //   id: config.gtmID,
  //   defer: false,
  // },
  site: {
    url: process.env.BASE_URL || 'http://localhost:1234',
  },
  sitemap: {
    cacheMaxAgeSeconds: 60 * 60 * 24,
    xsl: false,
    sitemaps: true,
    autoLastmod: true,
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
  colorMode: {
    preference: 'light'
  },
  i18n: {
    lazy: true, // Enable lazy loading
    strategy: 'no_prefix', // URL strategy
    vueI18n: './i18n.config.ts', // Path to Vue I18n configuration
    locales: ["en", "zh"], //配置语种
  },
})