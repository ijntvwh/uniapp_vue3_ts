import App from '@/App.vue'
import { Router } from '@/router'
import { Pinia } from '@/store'
import { createSSRApp } from 'vue'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia)
  app.use(Router)
  return { app, Pinia }
}
