import uni from '@dcloudio/vite-plugin-uni'
import { visualizer } from 'rollup-plugin-visualizer'
import unocss from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { mpHooks } from './build/mpHooks'
import { buildTime } from './build/time'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('env', mode, env)
  const pImport = autoImport({ imports: ['vue', 'pinia'], dts: 'types/autoImport.d.ts' })
  const pInspect = Inspect({ build: env.VITE_USER_NODE_ENV === 'production', outputDir: 'dist/.vite-inspect' })
  return {
    plugins: [
      // 根据环境变量注入appid, 根据package.json的name和version写入project.config.json
      mpHooks(),
      uni(),
      unocss(),
      visualizer(),
      pImport,
      buildTime,
      pInspect,
    ],
    resolve: {
      alias: { '@': '/src/' },
      extensions: ['.mjs', '.js', '.ts', '.json', '.vue'],
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  }
})
