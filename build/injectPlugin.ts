import fs from 'fs-extra'
import path from 'path'
import { Plugin } from 'vite'

export function injectPlugin(): Plugin {
  let envPluginId: string
  let envPluginVersion: string
  return {
    name: 'injectPlugin',
    configResolved(config) {
      if (config.define && config.define['process.env.UNI_PLATFORM'] !== '"mp-weixin"') return
      envPluginId = config.env.VITE_PLUGIN_ID
      envPluginVersion = config.env.VITE_PLUGIN_VERSION
    },
    writeBundle(options) {
      const dir = options.dir!
      if (!envPluginId || !envPluginVersion) return
      const appJsonPath = path.resolve(dir, 'app.json')
      const appJson = fs.readJSONSync(appJsonPath)
      appJson.plugins = {
        myPlugin: {
          version: envPluginVersion,
          provider: envPluginId,
        },
      }
      fs.writeJsonSync(appJsonPath, appJson)
    },
  }
}
