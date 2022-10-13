const HOST = import.meta.env.VITE_OSS_HOST
export const ossURL = (path: string) => `${HOST}/${path}`
