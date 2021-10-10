export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'barber-force-frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // SSR
  ssr: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/vue-awesome-swiper.js', mode: 'client' }, '@/plugins/api.js', '@/plugins/auth.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Barber Force',
      lang: 'ko',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Dotenv
  env: {
    kakaoRestKey: process.env.KAKAO_REST_KEY,
    kakaoRedirectURI: process.env.KAKAO_REDIRECT_URI || 'https://api.barberforce.shop/kakao/callback',
    backendURL: process.env.BACKEND_URL || 'https://api.barberforce.shop',
  },

  // Nuxt Toast
  toast: {
    position: 'top-right',
    duration: 3000,
    keepOnHover: true,
  },
};
