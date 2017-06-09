var app = getApp();

Page({
  data: {
    userAvatarUrl: '',
    userNickName: '',
    bindMobile: true,
    userInfo: ''
  },
  onLoad: function (options) {
    this.getUserInfo();

    
  },
  // 获取个人信息
  getUserInfo: function () {
    var that = this;
    wx.getUserInfo({
      success: function (userInfoRes) {
        var userInfo = userInfoRes.userInfo
        console.log(userInfo.avatarUrl);
        that.setData({
          userInfo: userInfoRes.userInfo,
          userAvatarUrl: userInfoRes.userInfo.avatarUrl
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
