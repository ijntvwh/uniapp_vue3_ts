import { createSSRApp } from 'vue'
import App from '@/App.vue'
import { Router } from '@/router'
import { Pinia } from '@/store'
import 'core-js/actual/array/iterator'
import 'core-js/actual/promise'
import 'core-js/actual/object/assign'
import 'core-js/actual/promise/finally'
import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia)
  app.use(Router)
  return { app, Pinia }
}
