import 'uni-ajax'

declare module 'uni-ajax' {
  type ReqCustomKey = 'noToast' | 'noLogin' | 'fullData'
  interface AjaxRequestConfig {
    custom?: ReqCustomKey[]
  }
  interface AjaxInvoke {
    <T = any>(config?: AjaxRequestConfig): Promise<T>
    <T = any>(url?: string, data?: Data, config?: AjaxRequestConfig): Promise<T>
  }
}
