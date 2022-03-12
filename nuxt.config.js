export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000',
  },
  server: { port: 8000 },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Lamp Reader',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Lamp Reader' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // SCSS file in the project
    '~/assets/scss/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: 'Lamp Reader',
      short_name: 'Lamp Reader',
    },
    meta: {
      name: 'Lamp Reader',
      author: 'Sajjad Shirazy <shirazy.sajjad@gmail.com>',
    },
    icon: {
      source: 'static/icon.png',
      filename: 'icon.png',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true,
  },

  bootstrapVue: {
    icons: false,
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    componentPlugins: [
      // 'LayoutPlugin',
      // 'FormPlugin',
      // 'FormCheckboxPlugin',
      // 'FormInputPlugin',
      // 'FormRadioPlugin',
      // 'ToastPlugin',
      // 'ModalPlugin'
    ],
    directivePlugins: [
      // 'VBPopoverPlugin',
      // 'VBTooltipPlugin',
      // 'VBScrollspyPlugin',
    ],
  },
};
