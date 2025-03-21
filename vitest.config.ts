import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
    reporters: ['verbose'],
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: '../logs/coverage',
      all: false,
    },
  },
});
