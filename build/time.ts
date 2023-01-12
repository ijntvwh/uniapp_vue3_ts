import dayjs from 'dayjs'

export const buildTime = {
  name: 'build-time',
  closeBundle() {
    console.log(`-------------------- ${dayjs().format('HH:mm:ss')} --------------------`)
  },
}
