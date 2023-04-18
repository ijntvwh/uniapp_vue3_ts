Component({
  data: {
    width: 300,
    height: 300,
    renderWidth: 300,
    renderHeight: 300,
  },
  lifetimes: {
    ready() {
      console.log('onload')
      const info = wx.getSystemInfoSync()
      const width = info.windowWidth
      const height = info.windowHeight
      const dpi = info.pixelRatio
      this.setData({
        width,
        height,
        renderWidth: width * dpi,
        renderHeight: height * dpi,
      })
    },
  },
})
