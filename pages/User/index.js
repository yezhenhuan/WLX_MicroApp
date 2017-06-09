var app = getApp();

Page({
  data: {
    userAvatarUrl: '',
    userNickName: '',
    balance: '0',
    totalScore: '0',
    bindMobile: false
  },
  onLoad: function (options) {
    if (this.data.userAvatarUrl == '' || this.data.userNickName) {
      this.getUserInfo();
    }

  },
  // 获取个人信息
  getUserInfo: function () {
    var that = this;
    wx.getUserInfo({
      success: function (userInfoRes) {
        var userInfo = userInfoRes.userInfo
        that.setData({
          userAvatarUrl: userInfo.avatarUrl,
          userNickName: userInfo.nickName
        });
        //todo  更新到数据库中

      }
    })
  },
  getUserFinance: function () {
    wx.showLoading({
      title: '加载数据中...',
    });
    var that = this;
    var url = app.ApiUrl.getUserFinance;
    app.WxService.sendRrquest(url, 'GET', {}, )
      .then(function (response) {
        wx.hideLoading();
        var res = response.data;
        if (res.success) {
          that.setData({
            balance: res.data.balance,
            totalScore: res.data.totalScore
          });
        } else {

        }
      }, function () {
        wx.showToast({
          title: '获取用户财务信息失败！',
        })
      });
  },
  // 进入绑定手机号界面
  bindMobileShow: function (event) {
    wx.navigateTo({
      url: "/pages/Phone/index"
    })
  }
})