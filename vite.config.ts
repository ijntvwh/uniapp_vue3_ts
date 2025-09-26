import process from 'node:process'
import Uni from '@uni-helper/plugin-uni'
import { VitePluginUniManifest } from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'
import openDevTools from './scripts/devtool'
import { buildTime } from './scripts/time'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('env', mode, env)
  return {
    plugins: [
      VitePluginUniManifest(),
      UniPages({
        dts: 'types/uni-pages.d.ts',
        exclude: ['**/comp/**/*.*'],
        dir: 'src/pages',
        outDir: 'src',
        // onBeforeWriteFile(ctx) {
        //   ctx.pages.forEach(page => {
        //     console.log('pppp', page.path, page.getPageMeta())
        //   })
        // },
      }),
      Uni(),
      UnoCSS(),
      visualizer({ filename: 'generated/stats.html' }),
      Inspect({
        build: env.VITE_USER_NODE_ENV === 'production',
        outputDir: 'generated/.vite-inspect',
      }),
      autoImport({
        imports: ['vue', 'pinia'],
        dts: 'types/auto-import.d.ts',
      }),
      buildTime,
      openDevTools(),
    ],
    resolve: {
      alias: { '@': '/src/' },
    },
    build: { target: 'es6', cssTarget: 'chrome61' },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  }
})
