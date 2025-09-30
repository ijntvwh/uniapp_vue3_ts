import type { PageMetaDatum } from '@uni-helper/vite-plugin-uni-pages'
import { clone } from 'ramda'
import parseURL from 'url-parse'
import { pages } from 'virtual:uni-pages'
import { useAppStore } from '@/store/app'

export const HOME_PAGE = `/${pages.find(page => page.type === 'home')?.path || pages[0].path}`

const FUNC_TABLE = {
  to: (opt: UniApp.NavigateToOptions) => uni.navigateTo(opt),
  redirect: (opt: UniApp.RedirectToOptions) => uni.redirectTo(opt),
  launch: (opt: UniApp.ReLaunchOptions) => uni.reLaunch(opt),
  tab: (opt: UniApp.SwitchTabOptions) => uni.switchTab(opt),
} as const

export type NavKey = keyof typeof FUNC_TABLE
type NavOptions<T extends NavKey> = Parameters<(typeof FUNC_TABLE)[T]>[0]

export async function navTo<T extends NavKey>(
  to: string | NavOptions<T>,
  type: T = 'to' as T,
  query?: Record<string, string | number>,
): Promise<void> {
  const func = FUNC_TABLE[type]
  let to2
  if (typeof to === 'string') {
    const url = /^\/?pages\//.test(to) ? to : `/pages/${to.replace(/^\//, '')}`
    to2 = { url }
  } else {
    to2 = clone(to)
  }
  if (query) {
    const hasQuestionMark = to2.url.includes('?')
    Object.keys(query).forEach((k, idx) => {
      const seq = idx === 0 && !hasQuestionMark ? '?' : '&'
      to2.url += `${seq}${k}=${encodeURIComponent(query[k])}`
    })
  }
  return func(to2)
}

export function navBack() {
  const pageStack = getCurrentPages()
  const curPage = pageStack.at(-1)
  const homePath = pages[0].path
  if (pageStack.length === 1) {
    if (curPage?.route !== homePath) navTo(`/${homePath}`, 'launch')
    return
  }
  uni.navigateBack()
}

const authencated = () => !!useAppStore().$state.accessToken
type NavApi = 'navigateTo' | 'reLaunch' | 'redirectTo' | 'switchTab'
function buildIntercepor(api: NavApi): [NavApi, UniApp.InterceptorOptions] {
  const interceptor: UniApp.InterceptorOptions = {
    invoke: args => {
      // TODO: 登录拦截
      const target = parseURL(args.url, true)
      const query = { ...target.query, ...args.query }
      console.log('nav', api, target.pathname, query)
      const page = pages.find(p => target.pathname === `/${p.path}`) as PageMetaDatum
      if (page?.needLogin) {
        if (!authencated()) {
          const origin = target.pathname
          const search = Object.keys(query)
            .map(k => `${k}=${query[k]}`)
            .join('&')
          const r = origin + (search ? `?${search}` : '')
          navTo(`login?r=${encodeURIComponent(r)}`)
          return false
        }
      }
      return true
    },
  }
  return [api, interceptor]
}
export const Router = {
  install() {
    uni.addInterceptor(...buildIntercepor('navigateTo'))
    uni.addInterceptor(...buildIntercepor('reLaunch'))
    uni.addInterceptor(...buildIntercepor('redirectTo'))
    uni.addInterceptor(...buildIntercepor('switchTab'))
  },
}
