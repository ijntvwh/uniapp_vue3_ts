<template>
  <button v-if="!appStore.accessToken" @click="doLogin">登录</button>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { navBack, navTo } from '@/router'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const redirectRef = shallowRef('')

function doLogin() {
  appStore.updateToken('abc')
  const r = redirectRef.value
  r ? navTo(r, 'redirect') : navBack()
}
onLoad((options: any) => (redirectRef.value = options.r ? decodeURIComponent(options.r) : ''))
</script>
