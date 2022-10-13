import { Clock, Object3D, AnimationMixer, AnimationClip } from 'three'
import { threeContainer } from '.'

let animeObj: { clock: Clock; mixer: AnimationMixer } | null

const animations: AnimationClip[] = []

export function loadAnime(arr: AnimationClip[]) {
  animations.length = 0
  animations.push(...arr)
}

export function startAnime(model: Object3D, clipName: string) {
  disposeAnime()
  const { THREE } = threeContainer()
  const clock: Clock = new THREE.Clock()
  const mixer = new THREE.AnimationMixer(model)
  animations
    .filter(c => c.name === clipName)
    .map(c => mixer.clipAction(c))
    .forEach(a => a.play())
  animeObj = { clock, mixer }
}

export function updateAnime() {
  if (!animeObj) return
  const { clock, mixer } = animeObj
  const dt = clock.getDelta()
  mixer.update(dt)
}

export function disposeAnime() {
  animeObj?.clock?.stop()
  animeObj?.mixer?.stopAllAction()
  animeObj = null
}
