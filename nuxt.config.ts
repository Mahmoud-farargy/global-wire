// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      'autoprefixer': {},
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxt/eslint',
    '@nuxt/image',
  ],
  css: [
    '~/assets/main.css',
    '~/assets/fonts/fonts.css'
  ],
  app: {
    head: {
      meta: [
          {
          name: "theme-color",
          content: "#fff1e5",
        },
      ]
    }
  },
  runtimeConfig: {
    newsApiKey: import.meta.env.VITE_NEWS_API_KEY,
    public: {
      baseNewsApiUrl: import.meta.env.VITE_BASE_NEWSAPI_URL,
    }
  },
    image: {
    provider: 'ipx',
    domains: [],
    presets: {},
  },
  ui: {
    colorMode: false
  },
  nitro: {
    preset: 'netlify'
  }
})