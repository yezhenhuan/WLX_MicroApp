var siteconfig = require('/config/config.js');
var apiUrl = require('/config/apiUrl.js');
var request = require('helpers/requestService.js')

App({
  onLaunch: function (options) {
    var accessToken = wx.getStorageSync("AccessToken");
    var expriesTime = wx.getStorageSync("ExpiresTime")
    if (!accessToken || !expriesTime) {
      this.getUserInfo('');
    } else {
      var date = new Date(parseInt(expriesTime.slice(6)));
      var now = new Date();
      if (date < now) {
        wx.clearStorage();
        this.getUserInfo('');
      }
    }
  },
  onShow: function (options) {
  },
  globalData: {
    userInfo: null,
    errorCount: 0
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          //换取openid & session_key
          var url = that.ApiUrl.onLogin;
          that.WxService.sendRrquest(url, 'POST', { code: res.code })
            .then(function (response) {
              var res = response.data;
              if (res.success) {
                wx.hideLoading();
                that.globalData.errorCount = 0;
                wx.setStorageSync('AccessToken', res.accessToken);
                wx.setStorageSync('ExpiresTime', res.expiresTime);
              } else {
                that.globalData.errorCount++;
                wx.hideLoading();
                if (that.globalData.errorCount <= 3) {
                  wx.showLoading({
                    title: '与服务器通信过程发生错误，正在重新连接',
                  })
                  that.getUserInfo('');
                } else {
                  wx.showToast({
                    title: '服务器出小差了，请稍后再试吧！',
                  })
                }
              }
            }, function (error) {
              wx.showToast({
                title: '获取用户信息失败！',
              })
            });
        }
      })
    }
  },
  SiteDomain: siteconfig.officialPath,
  ApiUrl: apiUrl,
  WxService: request
})
