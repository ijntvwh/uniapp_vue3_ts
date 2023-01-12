import { useAppStore } from '@/store/app'
import { AjaxRequestConfig } from 'uni-ajax'

export const injectToken = (config: AjaxRequestConfig): Promise<AjaxRequestConfig> => {
  const appStore = useAppStore()
  const token = appStore.accessToken
  // TODO 请求中的token处理
  token && (config.header = { ...config.header, Authorization: `Bearer ${token}` })
  return Promise.resolve(config)
}
