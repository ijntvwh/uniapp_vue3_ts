import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup'
import uni from '@dcloudio/vite-plugin-uni'
import { visualizer } from 'rollup-plugin-visualizer'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import { buildTime } from './build/time'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const pUni = uni()
  const pImport = autoImport({ imports: ['vue', 'pinia'], dts: 'types/autoImport.d.ts' })
  const pWindi = WindiCSS()
  const pWindiFix = MiniProgramTailwind({ enableRpx: false })
  const pVisualizer = visualizer()
  return {
    plugins: [pUni, pImport, pWindi, pWindiFix, buildTime, pVisualizer],
    resolve: {
      alias: { '@': '/src/' },
      extensions: ['.mjs', '.js', '.ts', '.json', '.vue'],
    },
  }
})
