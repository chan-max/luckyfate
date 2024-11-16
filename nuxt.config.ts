import config from './config'

export default defineNuxtConfig({
  ssr: false,
  // ssr:true,target:'static',
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
  modules: [
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    "@nuxt/image",
    // '@zadigetvoltaire/nuxt-gtm',
    "@stefanobartoletti/nuxt-social-share"
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
})