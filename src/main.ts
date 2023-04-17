import { createSSRApp } from 'vue'
import App from '@/App.vue'
import { Pinia } from '@/store'
import { Router } from '@/router'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia)
  app.use(Router)
  return { app, Pinia }
}
