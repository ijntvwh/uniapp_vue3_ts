import { hasCustomKey } from '@/api'
import { AjaxResponse } from 'uni-ajax'

export type BaseResult<T = any> = { data: T; code: number; msg: string }

// TODO 数据解析
export const extractResData = (res: AjaxResponse<BaseResult>): Promise<any> => {
  console.log('res', res)
  return res.data?.code === 200
    ? Promise.resolve(hasCustomKey(res.config, 'fullData') ? res.data : res.data.data)
    : Promise.reject(res)
}
