import { defineStore } from 'pinia'
import { uniStorage } from '@/store'

export const useAppStore = defineStore('app', {
  state: () => ({ accessToken: '' }),
  actions: {
    updateToken(s = '') {
      console.log('token', s)
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
