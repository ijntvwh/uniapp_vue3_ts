<template>
  <web-view :src="urlRef" class="screen" @error="onError" />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
const urlRef = ref()
onLoad(options => {
  urlRef.value = decodeURIComponent(options?.src)
})
function onError(e) {
  console.log(e)
}
onMounted(() => {
  if (!urlRef.value) {
    console.log('url为空')
  }
})
</script>

<style scoped></style>
