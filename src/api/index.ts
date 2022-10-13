import ajax, { AjaxResponse } from 'uni-ajax'
import { clearToken, fillEmptyBody, extractResData, injectToken, ReqConfig, toastError, navLogin } from './interceptors'

const instance = ajax.create({ baseURL: import.meta.env.VITE_API_HOST })

const reqChain: ((_config: ReqConfig) => Promise<ReqConfig>)[] = [fillEmptyBody, injectToken]
const resChain: ((_res: any) => Promise<any>)[] = [extractResData]
const errChain: ((_err: Error | AjaxResponse) => Promise<never>)[] = [clearToken, navLogin, toastError]

const onRejected = (err: Error | AjaxResponse) => errChain.reduce((pre, cur) => pre.catch(cur), Promise.reject(err))

instance.interceptors.request.use(
  config => reqChain.reduce((pre, cur) => pre.then(cur), Promise.resolve(config)).catch(onRejected),
  onRejected
)

instance.interceptors.response.use(
  res => resChain.reduce((pre, cur) => pre.then(cur), Promise.resolve(res)).catch(onRejected),
  onRejected
)

export default instance
