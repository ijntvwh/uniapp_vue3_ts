import { defineConfig } from 'windicss/helpers'
import LineClamp from 'windicss/plugin/line-clamp'
import Forms from 'windicss/plugin/forms'

export default defineConfig({
  plugins: [Forms, LineClamp],
  separator: '_',
  extract: {
    include: ['src/**/*.{vue,html,ts}'],
    exclude: ['node_modules', '.git', 'src/lib', 'types'],
  },
  shortcuts: {
    screen: 'w-screen h-screen',
    'flex-center': 'flex justify-center items-center',
    'fixed-tl': 'fixed top-0 left-0',
  },
})
