export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'efitness-web',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/i18n.js',
    '@/plugins/fragment.js',
    '@/plugins/swiper.js'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  axios: {
    serverBaseUrl: 'http://adminefitness.test',
    browserBaseUrl: 'http://adminefitness.test',
    baseURL: 'http://adminefitness.test',
    debug: false
  },
  auth: {
    redirect: {
      login: '/user/account/login',
    },
    strategies: {
      local: {
        token: {
          propertyName: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        endpoints: {
          login: { 
            url: 'http://adminefitness.test/api/auth/user/login',
            method: 'post',
            propertyName: 'access_token'
          },
          user: {
            url: 'api/auth/user',
            method: 'get',
            propertyName: false
          },
          logout: false
        }
      },
    }
},
  router: {
    middleware: ['auth'],
    routeNameSplitter: '/',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    vendor: ['aframe'],
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  }
}
