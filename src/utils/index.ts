export const isDev = import.meta.env.VITE_USER_NODE_ENV === 'development'
export const isIOS = uni.getSystemInfoSync().platform === 'ios'
export const pageCtx = () => getCurrentPages().at(-1)
