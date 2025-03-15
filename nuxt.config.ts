// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'src/',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/test-utils/module', '@pinia/nuxt'],
  typescript: {
    typeCheck: true,
  },
});
