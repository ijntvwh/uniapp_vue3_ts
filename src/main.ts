import { createSSRApp } from 'vue'
import App from '@/App.vue'
import { Pinia } from '@/store'
import { Router } from '@/router'

// import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia)
  app.use(Router)
  return { app, Pinia }
}
