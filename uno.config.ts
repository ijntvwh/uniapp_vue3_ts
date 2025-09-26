import { presetUni } from '@uni-helper/unocss-preset-uni'
import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUni({ attributify: { prefixedOnly: true } }),
    // presetAttributify(),
    presetIcons({
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  shortcuts: [
    {
      screen: 'w-screen h-screen',
      'flex-c': 'flex justify-center items-center',
      'flex-ac': 'flex justify-around items-center',
      'flex-bc': 'flex justify-between items-center',
    },
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {},
  },
})
