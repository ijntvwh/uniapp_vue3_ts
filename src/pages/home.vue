<template>
  <view>
    <button @click="navUser">跳转到用户页</button>
    <button @click="testApi()">网络请求</button>
    <button @click="testApi(true)">网络请求Full</button>
    <view>{{ res }}</view>
  </view>
</template>

<script setup lang="ts">
import { Api } from '@/api'
import { navTo } from '@/router'
import { useAppStore } from '@/store/app'
import { AjaxRequestConfig } from 'uni-ajax'

const appStore = useAppStore()
const navUser = () => navTo('user')
const res = ref('')
function testApi(fullData = false) {
  const config: AjaxRequestConfig = { params: { code: 654028207203 } }
  if (fullData) config.custom = ['fullData']
  Api.get('https://zj.v.api.aa1.cn/api/xz/', {}, config).then(response => {
    res.value = JSON.stringify(response)
  })
}
</script>
<style lang="scss" scoped>
.res {
  color: #dddddd;
}
</style>
