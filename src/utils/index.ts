export const isDev = import.meta.env.VITE_USER_NODE_ENV === 'development'
export const isIOS = uni.getSystemInfoSync().platform === 'ios'
export const pageCtx = () => getCurrentPages<{ $routeParams: Record<string, string> }>().at(-1)
export const pageParams = () => pageCtx()?.$routeParams ?? {}
