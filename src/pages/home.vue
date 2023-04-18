<template>
  <view>
    <button @click="navUser">跳转到用户页</button>
    <button @click="testApi()">{{ fetcher ? '取消' : '网络请求' }}</button>
    <button @click="testApi(true)">网络请求Full</button>
    <button @click="navTo('/xr/pages/basic')">xr-frame</button>
    <view>{{ res }}</view>
  </view>
</template>

<script setup lang="ts">
import { Api } from '@/api'
import { navTo } from '@/router'
import { useAppStore } from '@/store/app'
import { AjaxRequestConfig, Fetcher, FetcherInstance, RequestTask } from 'uni-ajax'
import { Ref } from 'vue'

const appStore = useAppStore()
const navUser = () => navTo('user')
const res = ref('')
const fetcher: Ref<FetcherInstance<RequestTask> | null> = ref(null)
function testApi(fullData = false) {
  if (fetcher.value) {
    fetcher.value.abort()
    return
  }
  fetcher.value = new Fetcher()
  const config: AjaxRequestConfig = { params: { code: 654028207203 }, fetcher: fetcher.value }
  if (fullData) config.custom = ['fullData']
  Api.get('https://zj.v.api.aa1.cn/api/xz/', {}, config)
    .then(response => {
      res.value = JSON.stringify(response)
    })
    .finally(() => (fetcher.value = null))
}
</script>
<style lang="scss" scoped>
.res {
  color: #dddddd;
}
</style>
