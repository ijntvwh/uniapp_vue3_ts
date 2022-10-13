export const pageCtx = () => {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}
