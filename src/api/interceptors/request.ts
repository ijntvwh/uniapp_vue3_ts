import type { AjaxRequestConfig } from 'uni-ajax'
import { useAppStore } from '@/store/app'

export function injectToken(config: AjaxRequestConfig): Promise<AjaxRequestConfig> {
  const token = useAppStore().accessToken
  if (token) config.header = { ...config.header, Authorization: `Bearer ${token}` }
  return Promise.resolve(config)
}
