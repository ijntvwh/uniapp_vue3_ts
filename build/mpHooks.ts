import { JSON_JS_MAP } from '@dcloudio/uni-cli-shared/dist/constants'
import fs from 'fs-extra'
import path from 'path'
import { Plugin } from 'vite'

const JSON_KEY_MANIFEST = JSON_JS_MAP['manifest.json']

let envPluginId: string
let envPluginVersion: string
export const mpHooks: Plugin = {
  name: 'mp-hooks',
  configResolved(config) {
    // console.log('plugins', config.plugins.map(p => p.name))
    if (config.define && config.define['process.env.UNI_PLATFORM'] !== '"mp-weixin"') return
    const envAppId = config.env.VITE_MP_APPID
    envPluginId = config.env.VITE_PLUGIN_ID
    envPluginVersion = config.env.VITE_PLUGIN_VERSION
    if (!envAppId) {
      console.log('环境变量 VITE_MP_APPID 未配置')
      // process.exit(1)
    }
    const p = config.plugins.find(p => p.name === 'uni:mp-manifest-json')!
    const transform1 = p.transform as any
    p.transform = function (...args) {
      const id = args[1]
      if (id && id.endsWith(JSON_KEY_MANIFEST)) {
        const jsonObj = JSON.parse(args[0])
        // jsonObj.description = jsonObj.versionName
        if (envAppId) jsonObj['mp-weixin'].appid = envAppId
        return transform1.call(this, JSON.stringify(jsonObj), ...args.slice(1))
      }
      return transform1.apply(this, args)
    }
  },
  writeBundle(options) {
    const dir = options.dir!

    const appJsonPath = path.resolve(dir, 'app.json')
    const appJson = fs.readJSONSync(appJsonPath)

    if (envPluginId && envPluginVersion) {
      appJson.plugins = {
        myPlugin: {
          version: envPluginVersion,
          provider: envPluginId,
        },
      }
      fs.writeJsonSync(appJsonPath, appJson)
    }
    if (dir?.endsWith('/build/mp-weixin')) {
      const projectConfigPath = path.resolve(dir, 'project.config.json')
      const projectJson = fs.readJsonSync(projectConfigPath)
      const packageJson = fs.readJsonSync(path.resolve(process.cwd(), 'package.json'))
      projectJson.projectname = packageJson.name
      projectJson.description = packageJson.version
      fs.writeJsonSync(projectConfigPath, projectJson)
    }
  },
}
