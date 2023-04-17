import dayjs from 'dayjs'
import parseURL from 'url-parse'

const fsm = wx.getFileSystemManager()
const WX_FILE_PREFIX = wx.env.USER_DATA_PATH
const URL_PREFIX = 'url'
type WxPath = string

function checkWxFile(filePath: WxPath) {
  return new Promise<string>((resolve, reject) =>
    fsm.getFileInfo({ filePath, success: () => resolve(filePath), fail: reject })
  )
}

export function writeFile(filePath: string, data: string | ArrayBuffer, encoding: 'base64' | 'binary') {
  return new Promise<void>((resolve, reject) =>
    fsm.writeFile({ filePath, data, encoding, success: () => resolve(), fail: reject })
  )
}

export function toWxPath(p: string): WxPath {
  if (p.startsWith(WX_FILE_PREFIX)) return p as WxPath
  return `${WX_FILE_PREFIX}${p.startsWith('/') ? '' : '/'}${p}` as WxPath
}

function checkWxDir(filePath: WxPath): Promise<void> {
  const dirPath = filePath.substring(0, filePath.lastIndexOf('/'))
  return new Promise<void>((resolve, reject) =>
    fsm.stat({
      path: dirPath,
      success(res: WechatMiniprogram.StatSuccessCallbackResult) {
        const stats = res.stats as WechatMiniprogram.Stats
        // console.log('stats', stats)
        stats.isDirectory() ? resolve() : reject(new Error('dir is File'))
      },
      fail() {
        fsm.mkdir({ dirPath, recursive: true, success: () => resolve(), fail: reject })
      },
    })
  )
}

function downWxFile(url: string, filePath: WxPath) {
  return checkWxDir(filePath).then(
    () =>
      new Promise<string>((resolve, reject) => {
        wx.downloadFile({ url, filePath, success: () => resolve(filePath), fail: reject })
      })
  )
}

let last = 0
const CLEAN_CACHE_INTERVAL = 10
const URL_MAX = 20
function cleanCacheFiles(prefix = URL_PREFIX, count = URL_MAX) {
  const now = dayjs().unix()
  if (last && now - last < CLEAN_CACHE_INTERVAL) return Promise.resolve()
  last = now
  const path = toWxPath(prefix)
  return new Promise<void>(resolve => {
    fsm.stat({
      path,
      recursive: true,
      success: ({ stats }) => {
        try {
          const statsArray = stats as unknown as [{ path: string; stats: WechatMiniprogram.Stats }]
          const statsFile = statsArray.filter(f => f.stats.isFile())
          statsFile.sort((a, b) => b.stats.lastAccessedTime - a.stats.lastAccessedTime)
          statsFile.slice(count).forEach(s => fsm.unlink({ filePath: path + s.path }))
        } finally {
          resolve()
        }
      },
      fail: () => resolve(),
    })
  })
}

function urlToPath(s: string, prefix: string) {
  const { hostname, pathname } = parseURL(s, false)
  return [prefix, hostname.replaceAll('.', '_'), pathname.substring(1)].join('/')
}

export const loadUrl = (url: string, prefix = URL_PREFIX) => {
  const pCache = prefix === URL_PREFIX ? cleanCacheFiles() : Promise.resolve()
  const wxFile = toWxPath(urlToPath(url, prefix))
  return pCache.then(() => checkWxFile(wxFile)).catch(() => downWxFile(url, wxFile))
}
