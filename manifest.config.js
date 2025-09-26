import process from 'node:process'
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

const env = process.env
const name = env.npm_package_name
const versionName = env.npm_package_version
const versionCode = versionName.replace(/\./g, '')
console.log(name, versionName, versionCode)
export default defineManifestConfig({
  name,
  appid: '',
  description: '',
  versionName,
  versionCode,
  transformPx: false,
  'mp-weixin': {
    appid: 'wx70b99e62f7a3a62c',
    setting: {
      es6: false,
      es7: false,
      urlCheck: false,
    },
    styleIsolation: 'shared',
    mergeVirtualHostAttributes: true,
    // usingComponents: true,
    // componentFramework: 'glass-easel',
    // lazyCodeLoading: 'requiredComponents',
  },
  uniStatistics: { enable: false },
  vueVersion: '3',
})
