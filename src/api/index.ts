import type { AjaxRequestConfig, AjaxResponse, ReqCustomKey } from 'uni-ajax'
import ajax from 'uni-ajax'
import { navLogin, toastError } from '@/api/interceptors/error'
import { injectToken } from '@/api/interceptors/request'
import { extractResData } from '@/api/interceptors/response'

const instance = ajax.create({ baseURL: import.meta.env.VITE_API_HOST })

const reqChain: ((_config: AjaxRequestConfig) => Promise<AjaxRequestConfig>)[] = [injectToken]
const resChain: ((_res: any) => Promise<any>)[] = [extractResData]
const errChain: ((_err: Error | AjaxResponse) => Promise<never>)[] = [navLogin, toastError]

const onRejected = (err: Error | AjaxResponse) => errChain.reduce((pre, cur) => pre.catch(cur), Promise.reject(err))

instance.interceptors.request.use(
  config => reqChain.reduce((pre, cur) => pre.then(cur), Promise.resolve(config)).catch(onRejected),
  onRejected,
)

instance.interceptors.response.use(
  res => resChain.reduce((pre, cur) => pre.then(cur), Promise.resolve(res)).catch(onRejected),
  onRejected,
)

export const Api = instance

export function hasCustomKey(res: Error | AjaxResponse, key: ReqCustomKey): boolean | undefined {
  if (res instanceof Error) return false
  return res?.config?.custom?.includes(key)
}
