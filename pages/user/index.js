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
    wx.getUserInfo({
      success: function (userInfoRes) {
        var userInfo = userInfoRes.userInfo
        this.setData({
          userAvatarUrl: userInfo.avatarUrl,
          userNickName: userInfo.nickName
        })
        //todo  更新到数据库中
      }
    })
  },

  // 进入绑定手机号界面
  bindMobileShow: function (event){
    wx.navigateTo({
      url: "/pages/Phone/index"
    })
  }
})