import type { AjaxRequestConfig } from 'uni-ajax'
import { useAppStore } from '@/store/app'

export function injectToken(config: AjaxRequestConfig): Promise<AjaxRequestConfig> {
  const appStore = useAppStore()
  const token = appStore.accessToken
  if (token) config.header = { ...config.header, Authorization: `Bearer ${token}` }
  return Promise.resolve(config)
}
