import 'uni-ajax'

declare module 'uni-ajax' {
  type ReqCustomKey = 'noToast' | 'noLogin' | 'fullData'
  interface AjaxRequestConfig {
    custom?: ReqCustomKey[]
  }
  interface AjaxInvoke {
    <T = any>(config?: AjaxRequestConfig): Request<T>
    <T = any>(config?: AjaxCallbackConfig<T>): Request<void>
    <T = any>(url?: string, data?: Data, config?: AjaxRequestConfig): Request<T>
  }
}
