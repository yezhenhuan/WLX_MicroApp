var app = getApp();

Page({
  data: {
    userAvatarUrl: '',
    userNickName: '',
    bindMobile: true
  },
  onLoad: function (options) {

    this.data.userAvatarUrl = app.globalData.userInfo.avatarUrl;
    this.setData({
      userAvatarUrl: app.globalData.userInfo.avatarUrl,
      userNickName: app.globalData.userInfo.nickName
    })

  },

  // 获取个人信息
  getUserInfo: function () {

  },

  // 进入绑定手机号界面
  bindMobileShow: function (event){
    wx.navigateTo({
      url: "/pages/Phone/index"
    })
  }
})