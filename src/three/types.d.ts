declare module 'threejs-miniprogram'
declare module '@/lib/three/loader.js' {
  const registerGLTFLoader: (THREE: any) => void
}

declare module '@/lib/three/orbit.js' {
  const registerOrbit: (THREE: any) => any
}

declare module '@/lib/three/gl.js' {
  const initGL: (renderer: any) => void
  const renderGL: (frame: WechatMiniprogram.VKFrame) => void
  const disposeGL: () => void
}
