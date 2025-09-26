import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execPromise = promisify(exec)

// 定义要执行的命令
const dependencies = [
  '@dcloudio/uni-app-harmony',
  '@dcloudio/uni-h5',
  '@dcloudio/uni-mp-alipay',
  '@dcloudio/uni-mp-baidu',
  '@dcloudio/uni-mp-jd',
  '@dcloudio/uni-mp-kuaishou',
  '@dcloudio/uni-mp-lark',
  '@dcloudio/uni-mp-qq',
  '@dcloudio/uni-mp-toutiao',
  '@dcloudio/uni-mp-xhs',
  '@dcloudio/uni-mp-harmony',
  '@dcloudio/uni-quickapp-webview',
  '@dcloudio/uni-automator',
  '@dcloudio/uni-stacktracey',
  // i18n模板要注释掉下面的
  'vue-i18n',
]

const log = (s: any) => console.log(s)

async function uninstallDependency(deps: string[]) {
  try {
    log(`开始卸载依赖: ${deps.join(',')}`)
    const { stdout, stderr } = await execPromise(`pnpm un ${deps.join(' ')}`)
    if (stdout) {
      log(`stdout [${deps}]: ${stdout}`)
    }
    if (stderr) {
      log(`stderr [${deps}]: ${stderr}`)
    }
    log(`卸载依赖成功`)
    return true
  } catch (error: any) {
    // 单个依赖卸载失败不影响其他依赖
    console.error(error)
    return false
  }
}

uninstallDependency(dependencies).catch(err => console.log(err))
