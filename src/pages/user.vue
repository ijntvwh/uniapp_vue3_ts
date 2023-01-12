<template>
  <view>
    <view> token: {{ appStore.accessToken }} </view>
    <button @click="logout">退出登录</button>
  </view>
</template>
<script setup lang="ts">
import { navTo } from '@/router'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
function logout() {
  appStore.updateToken('')
  navTo('home', 'launch')
}
</script>
