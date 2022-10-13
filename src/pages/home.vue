<template>
  <view>
    <button @click="navUser">{{ title }}</button>
    <button @click="navThree">three</button>
    <view> {{ appStore.accessToken }} </view>
  </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { navTo } from '@/router'

const title = ref('Hello')
const appStore = useAppStore()
const navUser = () => navTo('user')
const navThree = () => navTo('three')
</script>
