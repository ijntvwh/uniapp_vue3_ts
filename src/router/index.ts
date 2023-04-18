import pagesJson from '@/pages.json'
import uniCrazyRouter from 'uni-crazy-router'
import { loginCheck } from './interceptors'

type NavToOptions = UniApp.NavigateToOptions | UniNamespace.NavigateToOptions
type NavRedirectOptions = UniApp.RedirectToOptions | UniNamespace.RedirectToOptions
type NavLaunchOptions = UniApp.ReLaunchOptions | UniNamespace.ReLaunchOptions
type NavTabOptions = UniApp.SwitchTabOptions | UniNamespace.SwitchTabOptions

type CommonOptions = NavToOptions | NavRedirectOptions | NavLaunchOptions | NavTabOptions

export type NavKey = 'to' | 'redirect' | 'launch' | 'tab'
export const navTo = (to: string | CommonOptions, type: NavKey = 'to'): Promise<void> => {
  const NavFuncMap = { to: uni.navigateTo, redirect: uni.redirectTo, launch: uni.reLaunch, tab: uni.switchTab }
  const func = NavFuncMap[type]
  if (typeof to === 'string') {
    // 自动添加 /pages/ 的前缀
    const url = to.startsWith('/') ? to : `/pages/${to}`
    // @ts-ignore
    return func({ url })
  }
  // @ts-ignore
  return func(to)
}

export const navBack = () => {
  const pageStack = getCurrentPages()
  const curPage = pageStack.at(-1)
  const homePath = pagesJson.pages[0].path
  if (pageStack.length === 1) {
    if (curPage?.route !== homePath) navTo(`/${homePath}`, 'launch')
    return
  }
  uni.navigateBack()
}

const installFunc = uniCrazyRouter.install
uniCrazyRouter.install = (...args: any[]) => {
  installFunc(...args)
  loginCheck(uniCrazyRouter)
}
export const Router = uniCrazyRouter
