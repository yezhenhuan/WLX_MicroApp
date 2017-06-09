var siteconfig = require('/config/config.js');
var apiUrl = require('/config/apiUrl.js');
var request = require('helpers/requestService.js')

App({
  onLaunch: function (options) {
    if (!wx.getStorageSync("AccessToken")) {
      this.getUserInfo('');
    } else {
      wx.navigateBack({
        url: 'pages/Start/index'
      })
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
              console.log("返回的数据为：" + res);
              if (res.success) {
                wx.setStorageSync('AccessToken', res.accessToken);                
              } else {
                wx.showToast({
                  title: '与服务器通信过程发生错误，请稍后再试！',
                  complete:function(){
                    wx.navigateBack({
                      url:'pages/Start/index'
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
