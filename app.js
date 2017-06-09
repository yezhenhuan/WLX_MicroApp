var siteconfig = require('/config/config.js');
var apiUrl = require('/config/apiUrl.js');
var request = require('helpers/requestService.js')

App({
  onLaunch: function (options) {
    var accessToken = wx.getStorageSync("AccessToken");
    var expriesTime = wx.getStorageSync("ExpiresTime")
    if (!accessToken || !expriesTime) {      
        this.getUserInfo('');
    }else{
      var date = new Date(parseInt(expriesTime.slice(6)));
      var now = new Date();
      if(date<now){
        wx.clearStorage();
        this.getUserInfo('');
      }
    }
  },
  onShow: function (options) {
  },
  globalData: {
    userInfo: null
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
                wx.setStorageSync('AccessToken', res.accessToken);
                wx.setStorageSync('ExpiresTime', res.expiresTime);
              } else {
                wx.showToast({
                  title: '与服务器通信过程发生错误，请稍后再试！',
                  complete: function () {
                    wx.navigateBack({
                      url: 'pages/Start/index'
                    })
                  }
                })
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
