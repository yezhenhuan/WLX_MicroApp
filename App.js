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
            url: 'https://microapp.love0371.com/WxOpen/OnLogin',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (json) {
              var result = json.data;
              if (result.success) {
                wx.setStorageSync('sessionId', result.sessionId);

                //获取userInfo并校验
                wx.getUserInfo({
                  success: function (userInfoRes) {
                    // console.log('get userinfo', userInfoRes);
                    that.globalData.userInfo = userInfoRes.userInfo
                    //校验
                    wx.request({
                      url: 'https://microapp.love0371.com/WxOpen/CheckWxOpenSignature',
                      method: 'POST',
                      data: {
                        sessionId: wx.getStorageSync('sessionId'),
                        rawData: userInfoRes.rawData,
                        signature: userInfoRes.signature
                      },
                      success: function (json) {
                        // console.log(json.data);
                      }
                    });
                    //解密数据（建议放到校验success回调函数中，此处仅为演示）
                    // wx.request({
                    //   url: 'https://microapp.love0371.com/WxOpen/DecodeEncryptedData',
                    //   method: 'POST',
                    //   data: {
                    //     'type': "userInfo",
                    //     sessionId: wx.getStorageSync('sessionId'),
                    //     encryptedData: userInfoRes.encryptedData,
                    //     iv: userInfoRes.iv
                    //   },
                    //   success: function (json) {
                    //     console.log(json.data);
                    //   }
                    // });
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
  }
})
