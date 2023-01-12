import dayjs from 'dayjs'
import dotenv from 'dotenv'
import fs from 'fs-extra'

function readEnv(files: string[]): string {
  let appid: string
  for (let index = 0; index < files.length; index++) {
    const element = files[index]
    appid = dotenv.parse(fs.readFileSync(element))['VITE_MP_APPID']
    if (appid) return
  }
  if (!appid) throw new Error('appid not found')
  return appid
}

export function readProfile() {
  try {
    const profile = process.argv[2] ?? ''
    const envFiles = ['.env']
    profile && envFiles.unshift(`.env.${profile === 'prod' ? 'production' : profile}`)

    const privateKeyPath = `./ci/${profile}.key`
    const projectPath = `./dist/build/mp-weixin/`

    // appid
    const appid = readEnv(envFiles)

    const projectConfigJson = fs.readJsonSync(projectPath + 'project.config.json')
    if (projectConfigJson.appid !== appid) throw new Error('appid not match')

    // version
    const packageJson = fs.readJsonSync('package.json')
    const version = packageJson.version + dayjs().format('.MMDD.HHmm')

    return { appid, projectPath, privateKeyPath, version }
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}
readProfile()
