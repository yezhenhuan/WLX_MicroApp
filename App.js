var siteconfig = require('/config/config.js');
var apiUrl = require('/config/apiUrl.js');
var request = require('helpers/requestService.js')
App({
  onLaunch: function (options) {
    this.getUserInfo('');
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
          wx.request({
            url: siteconfig.officialPath + '/WxOpen/OnLogin',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (json) {
              var result = json.data;
              if (result.success) {
                wx.setStorageSync('sessionId', result.sessionId);
                wx.setStorage({
                  key: 'openId',
                  data: result.openId,
                })
                //获取userInfo并校验
                wx.getUserInfo({
                  success: function (userInfoRes) {
                    that.globalData.userInfo = userInfoRes.userInfo
                  }
                })
              } else {
                console.log('储存session失败！', json);
              }
            }
          })
        }
      })
    }
  },
  SiteDomain: siteconfig.officialPath,
  ApiUrl: apiUrl,
  WxService: request
})
