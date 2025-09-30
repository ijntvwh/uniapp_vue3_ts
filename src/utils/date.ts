import { format, parse } from 'date-fns'

export const DATE_FORMAT = 'yyyy-MM-dd'
export const WEEK_STR = '一二三四五六日'
export const formatDate = (d = new Date(), formatStr = DATE_FORMAT) => format(d, formatStr)
export const parseDate = (s: string, formatStr = DATE_FORMAT) => parse(s, formatStr, new Date())
