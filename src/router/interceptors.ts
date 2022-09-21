import { useAppStore } from '@/store/app'
import { navTo } from '@/router'
import uniCrazyRouter from 'uni-crazy-router'

const authPages = ['user']
const authPages1 = authPages.map(s => `pages/${s}`)

export const loginCheck = (router: uniCrazyRouter) => {
  const appStore = useAppStore()
  router.beforeEach(async (to, from, next) => {
    if (!appStore.accessToken && authPages1.includes(to.url)) {
      from?.url !== 'pages/login' && router.afterNotNext(() => navTo('login'))
      return
    }
    next()
  })
}
