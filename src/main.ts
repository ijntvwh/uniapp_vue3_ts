import { createSSRApp } from 'vue'
import App from '@/App.vue'
import { Router } from '@/router'
import { Pinia } from '@/store'
import { Query } from './api/tanstack'
// https://github.com/uni-helper/uni-promises?tab=readme-ov-file#构建
import 'core-js/actual/array/iterator'
import 'core-js/actual/object/assign'
import 'core-js/actual/promise'
import 'core-js/actual/promise/finally'

import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia)
  app.use(Router)
  app.use(Query)
  return { app, Pinia }
}
