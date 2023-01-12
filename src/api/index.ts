import { navLogin, toastError } from '@/api/interceptors/error'
import { injectToken } from '@/api/interceptors/request'
import { extractResData } from '@/api/interceptors/response'
import ajax, { AjaxRequestConfig, AjaxResponse, ReqCustomKey } from 'uni-ajax'

const instance = ajax.create({ baseURL: import.meta.env.VITE_API_HOST })

const reqChain: ((_config: AjaxRequestConfig) => Promise<AjaxRequestConfig>)[] = [injectToken]
const resChain: ((_res: any) => Promise<any>)[] = [extractResData]
const errChain: ((_err: Error | AjaxResponse) => Promise<never>)[] = [navLogin, toastError]

const onRejected = (err: Error | AjaxResponse) => errChain.reduce((pre, cur) => pre.catch(cur), Promise.reject(err))

instance.interceptors.request.use(
  config => reqChain.reduce((pre, cur) => pre.then(cur), Promise.resolve(config)).catch(onRejected),
  onRejected
)

instance.interceptors.response.use(
  res => resChain.reduce((pre, cur) => pre.then(cur), Promise.resolve(res)).catch(onRejected),
  onRejected
)

export const Api = instance

export const hasCustomKey = (config: AjaxRequestConfig | null, key: ReqCustomKey): boolean | undefined => {
  return config?.custom?.includes(key)
}
