import { format } from 'date-fns'

export const buildTime = {
  name: 'build-time',
  closeBundle() {
    console.log(`-------------------- ${format(new Date(), 'HH:mm:ss')} --------------------`)
  },
}
