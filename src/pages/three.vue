<template>
  <canvas
    id="canvas"
    type="webgl"
    class="screen"
    @touchstart="touchEvent"
    @touchmove="touchEvent"
    @touchend="touchEvent"
  />
</template>

<script setup lang="ts">
import { addOrbit, disposeTHREE, initTHREE, loadModel, renderLoop } from '@/three'
import { loadAnime, startAnime } from '@/three/anime'
import { queryCanvas } from '@/utils/uni'
import { onReady, onUnload } from '@dcloudio/uni-app'

const url = 'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb'

let canvas: any = null
onReady(() => {
  queryCanvas('#canvas').then(c => {
    canvas = c
    initTHREE(c, { ar: false, draco: false })
    loadModel(url).then(m => {
      addOrbit()
      renderLoop()
      loadAnime(m.animations)
      startAnime(m.scene, 'Running')
      console.log('model', m)
    })
  })
})
onUnload(() => disposeTHREE())
const touchEvent = (e: TouchEvent) => canvas?.dispatchTouchEvent(e)
</script>
