import { useAppStore } from '@/store/app'
import { AjaxRequestConfig, AjaxResponse } from 'uni-ajax'
import { showToast } from '@/utils/uni'
import { navTo } from '@/router'

type ReqCustomKey = 'noToast' | 'noLogin' | 'fullData'
export const ERROR_OVERWRITE: Record<string, string> = {
  // '011003': '用户未注册',
  // '003000': '不合法的Token',
  // '003001': 'Token过期',
  // '003002': 'Token不适用的平台',
  // '003003': '未获取到Token用户信息',
  // '003004': '不合法的Token发行者',
  // '003005': '不合法的Token类型',
  // '003006': '',
  // // '003006': 'Token不能为空',
  // '003007': '不合法的Token用户',
  // '003008': 'RefreshToken过期',
}
const appStore = useAppStore()

type BaseResult<T = any> = { code: string; msg: string; success: false } | { success: true; data: T }
export type ReqConfig = AjaxRequestConfig & { custom?: ReqCustomKey[] }

const hasCustomKey = (config: AjaxRequestConfig | null, key: ReqCustomKey): boolean | undefined => {
  return (config as ReqConfig)?.custom?.includes(key)
}

export const injectToken = (config: AjaxRequestConfig): Promise<AjaxRequestConfig> => {
  const token = appStore.accessToken
  token && (config.header = { ...config.header, Authorization: `Bearer ${token}` })
  return Promise.resolve(config)
}

export const fillEmptyBody = (config: AjaxRequestConfig): Promise<AjaxRequestConfig> => {
  if (!config.data) config.data = {}
  return Promise.resolve(config)
}

export const extractResData = (res: AjaxResponse<BaseResult>): Promise<any> => {
  return res.data?.success
    ? Promise.resolve(hasCustomKey(res.config, 'fullData') ? res.data : res.data.data)
    : Promise.reject(res)
}

export const toastError = (err: Error | AjaxResponse) => {
  console.log('toast err', err)
  const isError = err instanceof Error
  if (isError || !hasCustomKey(err.config, 'noToast')) {
    const title = isError ? err.message : ERROR_OVERWRITE[err.data?.code] ?? (err.data?.msg || '系统错误')
    setTimeout(() => showToast(title), 100)
  }
  return Promise.reject(err)
}

export const clearToken = (err: Error | AjaxResponse) => {
  if (err instanceof Error) return Promise.reject(err)
  err.data?.code?.startsWith('003') && appStore.updateToken('')
  return Promise.reject(err)
}

export const navLogin = (err: Error | AjaxResponse) => {
  const errPromise = Promise.reject(err)
  if (!(err instanceof Error) && !hasCustomKey(err.config, 'noLogin') && !appStore.accessToken)
    return navTo('login')
      .then(() => errPromise)
      .catch(() => errPromise)
  return errPromise
}
