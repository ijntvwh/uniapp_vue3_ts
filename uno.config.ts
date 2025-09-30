import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { presetUni } from '@uni-helper/unocss-preset-uni'
import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUni({ attributify: { prefixedOnly: true } }),
    // presetAttributify(),
    presetIcons({
      warn: true,
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        file: FileSystemIconLoader('./src/icons'),
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  shortcuts: [
    {
      modal1: 'fixed bottom-0 left-0 right-0 top-0 z100 flex flex-col bg-#fff',
      screen: 'w-screen h-screen',
      'flex-c': 'flex justify-center items-center',
      'flex-ac': 'flex justify-around items-center',
      'flex-bc': 'flex justify-between items-center',
      abtl: 'absolute top-0 left-0 bottom-0',
    },
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {},
  },
  preflights: [
    {
      getCSS: _context => '',
    },
  ],
})
