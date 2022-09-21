import { defineStore } from 'pinia'
import { uniStorage } from '@/store'

export const useAppStore = defineStore('app', {
  state: () => ({ accessToken: '' }),
  // getters: {},
  actions: {
    updateToken(s: string) {
      this.accessToken = s
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: uniStorage,
        paths: ['accessToken'],
      },
    ],
  },
})
