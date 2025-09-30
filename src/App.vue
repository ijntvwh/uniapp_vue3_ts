<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { focusManager, onlineManager } from '@tanstack/vue-query'

onLaunch(() => {
  console.log('App Launch')
  uni.onNetworkStatusChange(({ isConnected, networkType }) =>
    onlineManager.setOnline(isConnected != null ? isConnected : networkType !== 'none'),
  )
})
onShow(() => {
  console.log('App Show')
  focusManager.setFocused(true)
})
onHide(() => {
  console.log('App Hide')
  focusManager.setFocused(false)
})
</script>
