import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'

export const uniStorage: Storage = {
  length: 0,
  key: () => '',
  getItem(key: string): string | null {
    return uni.getStorageSync(key)
  },
  setItem(key: string, value: string) {
    uni.setStorageSync(key, value)
  },
  clear() {
    uni.clearStorageSync()
  },
  removeItem(key: string) {
    uni.removeStorageSync(key)
  },
}

const pinia = createPinia()
pinia.use(piniaPersist)
export const Pinia = pinia
