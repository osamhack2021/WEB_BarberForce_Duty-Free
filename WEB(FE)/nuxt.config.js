export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'BarberForce',
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
    script: [
      {
        src: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_KEY}&libraries=services`,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/transition.css'],

  // SSR
  ssr: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-awesome-swiper.js', mode: 'client' },
    '@/plugins/api.js',
    '@/plugins/auth.js',
    '@/plugins/vee-validate.js',
  ],

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
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      name: 'BarberForce',
      author: 'Duty-Free',
      description: '군 장병 미용시설 예약 서비스',
      lang: 'ko',
      ogHost: process.env.FRONT_URL || 'https://barberforce.shop',
    },
    manifest: {
      name: 'BarberForce',
      short_name: 'BarberForce',
      description: '군 장병 미용시설 예약 서비스',
      lang: 'ko',
      background_color: '#406D96',
      start_url: '/',
    },
    workbox: {
      offline: false, // no offline support yet.
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

  // nuxt router (for global middleware (fetch-user))
  router: {
    middleware: 'fetch-user',
  },

  // Nuxt onesignal module
  oneSignal: {
    init: {
      appId: '1c70b40b-aa5d-438c-a9cf-7f7e92cd5f99',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true,
      },
    },
  },
};
