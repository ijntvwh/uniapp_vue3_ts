import { uniStorage } from '@/store'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({ accessToken: '' }),
  // getters: {},
  actions: {
    updateToken(s = '') {
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
