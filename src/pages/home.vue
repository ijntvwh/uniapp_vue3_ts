<template>
  <view>
    <view @click="nav"> {{ title }} </view>
    <view> {{ appStore.accessToken }} </view>
  </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { navTo } from '@/router'

const title = ref('Hello')
const appStore = useAppStore()
const nav = () => navTo('user?q=1')
</script>
