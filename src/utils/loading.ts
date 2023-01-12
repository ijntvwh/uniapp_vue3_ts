import { Ref } from 'vue'

export const watchShow = (ing: Ref<boolean>, title = '加载中') =>
  watchEffect(() => {
    ing.value ? uni.showLoading({ title }) : uni.hideLoading()
  })

export const wrapPromise = <T>(p: () => Promise<T>, ingRef: Ref<boolean>) => {
  return ingCheck(ingRef)
    .then(() => (ingRef.value = true))
    .then(p)
    .finally(() => (ingRef.value = false))
}

export const ingCheck = (ingRef: Ref<boolean>) => {
  return ingRef.value ? Promise.reject('ing') : Promise.resolve()
}
