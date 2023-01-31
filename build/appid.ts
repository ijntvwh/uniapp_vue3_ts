import { JSON_JS_MAP } from '@dcloudio/uni-cli-shared/dist/constants'
import { Plugin } from 'vite'

const JSON_JS = JSON_JS_MAP['manifest.json']

export const writeAppid: Plugin = {
  name: 'write-appid',
  configResolved(config) {
    if (config.define['process.env.UNI_PLATFORM'] !== 'mp-weixin') return
    const _appid = config.env.VITE_MP_APPID
    if (!_appid) {
      console.log('环境变量 VITE_MP_APPID 未配置')
      process.exit(1)
    }
    const p = config.plugins.find(p => p.name === 'uni:mp-manifest-json')
    const transform1 = p.transform as any
    p.transform = function (...args) {
      const id = args[1]
      if (id && id.endsWith(JSON_JS)) {
        const jsonObj = JSON.parse(args[0])
        jsonObj['mp-weixin'].appid = _appid
        return transform1.call(this, JSON.stringify(jsonObj), ...args.slice(1))
      }
      return transform1.apply(this, args)
    }
  },
}
