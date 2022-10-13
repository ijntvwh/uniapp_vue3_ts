import { registerGLTFLoader } from '@/lib/three/loader.js'
import { registerOrbit } from '@/lib/three/orbit.js'
import { ossURL } from '@/utils/oss'
import { AnimationClip, Camera, Object3D, Scene, WebGL1Renderer } from 'three'
import { createScopedThreejs } from 'threejs-miniprogram'
import { disposeAnime, updateAnime } from './anime'

export type ThreeContainer = {
  THREE: any
  camera: Camera
  scene: Scene
  renderer: WebGL1Renderer
  gltfLoader: any
  controls?: any
}

export const canvasSize: () => ISize = () => {
  const { devicePixelRatio: dpr, windowWidth: w, windowHeight: h } = uni.getSystemInfoSync()
  return { w: w * dpr, h: h * dpr, dpr }
}

let container: ThreeContainer

export function threeContainer() {
  return container
}

export function addHelper() {
  const { THREE, camera, scene } = container
  const cameraHelper = new THREE.CameraHelper(camera)
  scene.add(cameraHelper)
  const axesHelper = new THREE.AxesHelper(3)
  scene.add(axesHelper)
}

type ISize = { w: number; h: number; dpr: number }

function initRenderer(THREE: any, size: ISize) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(size.dpr)
  renderer.setSize(size.w, size.h)
  // gamma色彩空间校正，以适应人眼对亮度的感觉
  renderer.gammaOutput = true
  renderer.gammaFactor = 2.2
  return renderer
}

function initCamera(THREE: any, size: ISize, ar: boolean) {
  if (ar) return new THREE.Camera()
  return new THREE.PerspectiveCamera(60, size.w / size.h, 0.1, 500)
}

function addCube() {
  const { THREE, scene } = container
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2)
  const material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xff00ff })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

export function addOrbit() {
  const { THREE, camera, renderer } = container
  const { OrbitControls } = registerOrbit(THREE)
  const controls = new OrbitControls(camera, renderer.domElement)
  camera.position.set(4, 7, 9)
  controls.rotateSpeed = 8
  container.controls = controls
}
export type ThreeOptions = { draco: boolean; ar: boolean }
export const initTHREE = (c: WechatMiniprogram.Canvas, opts: ThreeOptions) => {
  const size = canvasSize()
  c.width = size.w
  c.height = size.h
  const THREE = createScopedThreejs(c)
  registerGLTFLoader(THREE)
  const camera = initCamera(THREE, size, opts.ar)
  const scene = new THREE.Scene()
  const renderer = initRenderer(THREE, size)
  const gltfLoader = new THREE.GLTFLoader()
  if (opts.draco) {
    const dracoLoader = new THREE.DRACOLoader()
    dracoLoader.setDecoderPath(ossURL('three/'))
    gltfLoader.setDRACOLoader(dracoLoader)
  }
  container = { THREE, camera, scene, renderer, gltfLoader }
  addHelper()
  // addCube()
  initLight(THREE, scene)
  return container
}

function initLight(THREE: any, scene: Scene) {
  scene.add(new THREE.AmbientLight(0xffffff))
  const light2 = new THREE.DirectionalLight(0xffffff)
  light2.position.set(0, 100, 30)
  scene.add(light2)
}

export function renderLoop() {
  if (!container) return
  const { controls, renderer, scene, camera } = container
  ;(renderer.domElement as unknown as WechatMiniprogram.Canvas).requestAnimationFrame(renderLoop)
  controls?.update()
  updateAnime()
  renderer.render(scene, camera)
}

function modelSize(model: Object3D) {
  const THREE = container.THREE
  const box = new THREE.Box3()
  box.expandByObject(model)
  const v = new THREE.Vector3()
  box.getSize(v)
  console.log('model size', v)
}

type GLTF = { animations: AnimationClip[]; scene: Scene }

const onLoad = (gltf: GLTF, resolve: (_g: GLTF) => void) => {
  const model = gltf.scene
  container.scene?.add(model)
  // loadAnime(gltf.animations)
  modelSize(model)
  resolve(gltf)
}

export const loadModel = (url: string): Promise<GLTF> => {
  if (!url) return Promise.reject('url empty')
  if (!container.THREE) return Promise.reject('threejs not init')
  return new Promise((resolve, reject) => {
    const loader = new container.THREE.GLTFLoader()
    // url, onLoad, onProgress, onError
    loader.load(url, (gltf: GLTF) => onLoad(gltf, resolve), null, reject)
  })
}

export const disposeTHREE = () => {
  container?.controls?.dispose()
  container?.renderer?.dispose()
  disposeAnime()
}

export function cloneModel(gltf: GLTF) {
  return { animations: gltf.animations, scene: gltf.scene.clone(true) as Scene }
}
