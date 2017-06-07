var app = getApp();

Page({
  data: {
    mobileValue: '',
    sendMobile: '',
    msgCode: '',
    btnEnable: true,
    codeBtnText: '获取验证码',
    smsCodeDisabled: true
  },
  onLoad: function (options) {
    this.data.userAvatarUrl = app.globalData.userInfo.avatarUrl;
    this.setData({
      userAvatarUrl: app.globalData.userInfo.avatarUrl,
      userNickName: app.globalData.userInfo.nickName
    })

  },

  verifyMobile: function (e){
    var that = this;
    var disabled = e.detail.value.length < 11;
    that.setData({
      mobileValue: e.detail.value,
      btnEnable: true,
      smsCodeDisabled: disabled
    })
  },

  getCode: function (e) {
    var mobile = this.data.mobileValue;
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    var correct = reg.test(mobile);
    if (!correct) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'fail',
        duration: 2000
      })
      return;
    }
   wx.showToast({
      title: '已发送',
      icon: 'success',
      duration: 2000
    })
    var that = this;
    that.setData({
      sendMobile: mobile
    })

    var count = 60;
    setInterval(function(){
      if(count > 0){
        count--;
        that.setData({
          codeBtnText:count+' s后获取',
          smsCodeDisabled: true
        });
      }else{
        that.setData({
          codeBtnText:"获取验证码",
          smsCodeDisabled: false
        });
          count = 60;
          clearInterval(si);
        }
      },1000);
    
  },

  verifyCode: function (e) {
    var that = this;
    var code = e.detail.value;
    var mobile = this.data.mobileValue;
    // var changeMobile = this.data.sendMobile != this.data.mobileValue;
    var enable = mobile.length < 11 || code.length == 0 ;
    that.setData({
      btnEnable: enable
    })
  }
})