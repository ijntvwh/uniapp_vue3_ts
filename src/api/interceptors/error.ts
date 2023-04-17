import { hasCustomKey } from '@/api'
import { navTo } from '@/router'
import { useAppStore } from '@/store/app'
import { showToast } from '@/utils/uni'
import { AjaxResponse } from 'uni-ajax'

export const ERROR_OVERWRITE: Record<string, string> = {
  // 重写错误代码对应的toast消息内容
  '003000': '不合法的Token',
}

export const toastError = (err: Error | AjaxResponse) => {
  console.log('toast err', err)
  if ((err as { errMsg: string })?.errMsg === 'request:fail abort') {
    // request abort
    return Promise.reject(err)
  }
  const isError = err instanceof Error
  if (isError || !hasCustomKey(err.config, 'noToast')) {
    const title = isError ? err.message : ERROR_OVERWRITE[err.data?.code] ?? (err.data?.msg || '系统错误')
    setTimeout(() => showToast(title), 100)
  }
  return Promise.reject(err)
}

export const navLogin = (err: Error | AjaxResponse) => {
  const errPromise = Promise.reject(err)
  if (err instanceof Error) return errPromise
  // TODO 未登录判断
  if (err.data?.code?.startsWith('003')) {
    useAppStore().updateToken()
    if (!hasCustomKey(err.config, 'noLogin'))
      return navTo('login')
        .then(() => errPromise)
        .catch(() => errPromise)
  }
  return errPromise
}
