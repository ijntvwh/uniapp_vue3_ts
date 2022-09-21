import uniCrazyRouter from 'uni-crazy-router'
import { loginCheck } from './interceptors'

type NavFuncMapType = {
  to: UniPromisify<UniNamespace.NavigateToOptions>
  redirect: UniPromisify<UniNamespace.RedirectToOptions>
  launch: UniPromisify<UniNamespace.ReLaunchOptions>
  tab: UniPromisify<UniNamespace.SwitchTabOptions>
}
let NavFuncMap: NavFuncMapType
export type NavKey = keyof NavFuncMapType
export const navTo = (
  to: string | UniNamespace.RedirectToOptions | UniNamespace.NavigateToOptions,
  type: NavKey = 'to'
): Promise<UniNamespace.NavigateToSuccessOptions | void> => {
  if (!NavFuncMap) return Promise.reject(new Error('nav not init'))
  const func = NavFuncMap[type]
  if (typeof to === 'string') {
    const url = /^\/?pages\//.test(to) ? to : `/pages/${to}`
    return func({ url }) as unknown as Promise<UniNamespace.NavigateToSuccessOptions | void>
  }
  return func(to)
}

// uniCrazyRouter.afterEach((to, from) => {
//   console.log('router afterEach', to, from)
// })

// uniCrazyRouter.onError((to, from) => {
//   console.log('router onError', to, from)
// })

const installFunc = uniCrazyRouter.install
uniCrazyRouter.install = (...args: any[]) => {
  installFunc(...args)
  loginCheck(uniCrazyRouter)
  initNavFunc()
}
export const Router = uniCrazyRouter

function initNavFunc() {
  NavFuncMap = {
    to: uni.navigateTo,
    redirect: uni.redirectTo,
    launch: uni.reLaunch,
    tab: uni.switchTab,
  } as NavFuncMapType
}
