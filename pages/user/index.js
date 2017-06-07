var app = getApp();

Page({
  data: {
    userAvatarUrl: '',
    userNickName: ''
  },
  onLoad: function (options) {
    this.data.userAvatarUrl = app.globalData.userInfo.avatarUrl;
    this.setData({
      userAvatarUrl: app.globalData.userInfo.avatarUrl,
      userNickName: app.globalData.userInfo.nickName
    })

  },
  onShareAppMessage: function () {

  },

  bindMobile: function (event){
    wx.navigateTo({
      url: "/pages/Phone/index"
    })
  }
})