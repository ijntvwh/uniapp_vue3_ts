import type { AjaxResponse } from 'uni-ajax'
import { hasCustomKey } from '@/api'

export interface BaseResult<T = any> {
  data: T
  code: number
  msg: string
}

export function extractResData(res: AjaxResponse<BaseResult>): Promise<any> {
  return res.data?.code === 200
    ? Promise.resolve(hasCustomKey(res, 'fullData') ? res.data : res.data.data)
    : Promise.reject(res)
}
