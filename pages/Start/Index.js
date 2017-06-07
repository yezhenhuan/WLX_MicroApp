Page({
  data: {
    indicatorDots: !1,
    autoplay: !1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: !1,
  },
  onLoad() { },
  onShow() { },
  bindload(e) {
    setTimeout(true ? this.goIndex : this.goLogin, 3000)
  },
  goIndex() {
    wx.setStorage({
      key: 'isShowLoad',
      data: 'true',
    })
    wx.switchTab({
      url: '/pages/Paybill/index',
    })
  },
  goLogin() {
    console.log('goLogin')
    wx.switchTab({
      url: '/pages/User/index',
    })
  }
})
