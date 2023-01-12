<template>
  <button v-if="!appStore.accessToken" @click="doLogin">登录</button>
</template>
<script setup lang="ts">
import { navBack } from '@/router'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const doLogin = () => {
  appStore.updateToken('abc')
  navBack()
}
</script>
