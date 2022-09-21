export const uniShowModal = uni.showModal as UniPromisify<UniNamespace.ShowModalOptions>
export const uniGetUserProfile = uni.getUserProfile as UniPromisify<UniNamespace.GetUserProfileOptions>
export const uniLogin = uni.login as UniPromisify<UniNamespace.LoginOptions>
export const uniNavigateTo = uni.navigateTo as UniPromisify<UniNamespace.NavigateToOptions>
export const uniStartCompass = uni.startCompass as UniPromisify<UniNamespace.StartCompassOptions>
export const uniOpenLocation = uni.openLocation as UniPromisify<UniNamespace.OpenLocationOptions>
export const uniGetImageInfo = uni.getImageInfo as UniPromisify<UniNamespace.GetImageInfoOptions>
export const uniCanvasToTempFilePath =
  uni.canvasToTempFilePath as UniPromisify<UniNamespace.CanvasToTempFilePathOptions>
export const uniSaveImageToPhotosAlbum =
  uni.saveImageToPhotosAlbum as UniPromisify<UniNamespace.SaveImageToPhotosAlbumOptions>
export const uniGetSetting = uni.getSetting as UniPromisify<UniNamespace.GetSettingOptions>
export const uniAuthorize = uni.authorize as UniPromisify<UniNamespace.AuthorizeOptions>

export const showToast = (title: string, icon: 'none' | 'success' | 'loading' | 'error' = 'none') => {
  if (!title) return Promise.resolve()
  return uni.showToast({ title, icon, duration: 2000 })
}

export const queryCanvas = (selector: string): Promise<WechatMiniprogram.Canvas> =>
  new Promise(resolve =>
    uni
      .createSelectorQuery()
      .select(selector)
      .node(res => resolve(res.node))
      .exec()
  )

type PermScope = keyof UniNamespace.AuthSetting extends `scope.${infer T}` ? `${T}` : never

export function requestPerm(perm: PermScope, desc: string) {
  const scope: keyof UniNamespace.AuthSetting = `scope.${perm}`
  return uniGetSetting({})
    .then(res => !res.authSetting[scope] && uniAuthorize({ scope }))
    .catch(err => {
      uniShowModal({ title: '', content: `您已拒绝授权${desc}，请打开${desc}权限` }).then(
        res => res.confirm && uni.openSetting({})
      )
      return Promise.reject(err)
    })
}
