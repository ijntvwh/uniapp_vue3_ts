import type { Plugin } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
}

export const Query: Plugin = {
  install(app) {
    app.use(VueQueryPlugin, { queryClientConfig })
  },
}
