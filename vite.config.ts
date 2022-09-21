import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import autoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('env', env)
  const pUni = uni()
  const pImport = autoImport({ imports: ['vue', 'pinia'], dts: 'types/autoImport.d.ts' })
  const pWindi = WindiCSS()
  return {
    plugins: [pUni, pImport, pWindi],
    resolve: {
      alias: { '@': '/src/' },
      extensions: ['.mjs', '.js', '.ts', '.json', '.vue'],
    },
  }
})
