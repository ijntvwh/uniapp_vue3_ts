import { authorize, getSetting, showModal } from '@uni-helper/uni-promises'

export function showToast(title: string, icon: 'none' | 'success' | 'loading' | 'error' = 'none') {
  if (!title) return Promise.resolve()
  return uni.showToast({ title, icon, duration: 2000 })
}

export function queryCanvas(selector: string): Promise<WechatMiniprogram.Canvas> {
  return new Promise(resolve =>
    uni
      .createSelectorQuery()
      .select(selector)
      .node(res => resolve(res.node))
      .exec(),
  )
}

type PermScope = keyof UniNamespace.AuthSetting extends `scope.${infer T}` ? `${T}` : never

export async function requestPerm(perm: PermScope, modalContent: string) {
  const scope: keyof UniNamespace.AuthSetting = `scope.${perm}`
  return getSetting({})
    .then(res => !res.authSetting[scope] && authorize({ scope }))
    .catch((err: Error) => {
      showModal({ title: '', content: modalContent }).then(res => res.confirm && uni.openSetting({}))
      return Promise.reject(err)
    })
}

export async function wxLoginCode() {
  return uni.login().then(res => res.code)
  // return new Promise<string>((resolve, reject) =>
  //   wx.login({
  //     success: (res: WechatMiniprogram.LoginSuccessCallbackResult) => resolve(res.code),
  //     fail: reject,
  //   }),
  // )
}
