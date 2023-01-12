import dayjs from 'dayjs'
import path from 'path-browserify'
import parseURL from 'url-parse'

const { dirname, join } = path
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
  const dirPath = dirname(filePath)
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
  const url = parseURL(s, false)
  return join(prefix, url.hostname.replaceAll('.', '_'), url.pathname)
}

export const loadUrl = (url: string, prefix = URL_PREFIX) => {
  const pCache = prefix === URL_PREFIX ? cleanCacheFiles() : Promise.resolve()
  const wxFile = toWxPath(urlToPath(url, prefix))
  return pCache.then(() => checkWxFile(wxFile)).catch(() => downWxFile(url, wxFile))
}

/**
 * 七牛上传
 */
export const qiniuUpload = (obj: { tempFiles: any }) => {
  let successCount = 0
  let failCount = 0

  return new Promise((resolve, reject) => {
    // for 循环 上传七牛 start -----------------------------------------------------------

    obj.tempFiles.forEach((element: any, index: number) => {
      // 文件名
      const fileName = element.path.split('/')[element.path.split('/').length - 1]
      // 获取七牛上传凭证
      resourceQiniuAccessToken({
        bucketType: 0,
        fileName: fileName,
      }).then(res => {
        // 上传文件 到 七牛
        uni.uploadFile({
          url: 'https://up.qiniup.com', //华东地区上传
          filePath: element.path,
          name: 'file',
          fileType: 'image', // 此参数为了兼容支付宝小程序
          formData: {
            key: res.data.key, //key值
            token: res.data.upToken, //七牛云 token 值
            // 'token': res.data.noKeyUpToken, //七牛云 noKeyUpToken 值
          },
          success: uploadFileRes => {
            // url 赋值
            element.url = res.data.domainName + '/' + JSON.parse(uploadFileRes.data).key
            successCount++
          },
          fail: fail => {
            // 可根据 fail 值进行判断 是终止上传还是 上传出错 进而进行业务场景跟踪
            console.log('七牛上传失败', fail)
            failCount++ // 应用于上传失败场合继续后面任务 进行记述 使用
            // 出错直接结束此次上传操作，并且返回错误结果
            console.log('上传终端******')
            reject({
              code: '100000',
              msg: '失败',
              data: obj.tempFiles,
            })
          },
        })
      })
    })

    // for 循环 上传七牛 end -----------------------------------------------------------

    // 判断是否全部请求，并且返回给调用函数 start
    const interval = setInterval(() => {
      if (successCount + failCount == obj.tempFiles.length) {
        // 失败数 + 成功数 == 总数量 上传调用全部返回结果
        console.log('图片上传成功')
        resolve({
          code: '000000',
          msg: '成功',
          data: obj.tempFiles,
        })
        clearInterval(interval)
      }
    }, 100)
    // 判断是否全部请求，并且返回给调用函数 end
  })
}
