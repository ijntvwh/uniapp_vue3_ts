import transformerDirectives from '@unocss/transformer-directives'
import presetWeapp from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer'

export default {
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({ whRpx: false }),
  ],
  shortcuts: [
    {
      screen: 'w-screen h-screen',
      'flex-center': 'flex justify-center items-center',
    },
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
    transformerDirectives(),
  ],
}
