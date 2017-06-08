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

  // 获取验证码
  getCode: function (e) {
    var mobile = this.data.mobileValue;
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    var correct = reg.test(mobile);
    if (!correct) {
      wx.showToast({
        title: '请输入正确的手机号',
        image: '/assets/images/Icon/error.png',
        duration: 2000
      })
      return;
    }


    // 发送请求获取验证码接口


     wx.showToast({
        title: '已发送',
        icon: 'success',
        duration: 2000
      })

     this.timerStart(60);

  },

  // 绑定手机号
  bindMobile: function (){
    // 发送请求,绑定手机号





    wx.showModal({
      title: '手机号已注册',
      content: '该手机号已是会员, 是否将小程序帐号与原帐号合并',
      success: function(res) {
        if (res.confirm) {
          // 确认合并

        } else if (res.cancel) {
          // 取消

        }
      }
    })
  },


  // 处理 手机号 输入框事件
  verifyMobile: function (e){
    var that = this;
    var disabled = e.detail.value.length < 11;
    that.setData({
      mobileValue: e.detail.value,
      btnEnable: true,
      smsCodeDisabled: disabled
    })
  },

  // 处理 验证码 输入框事件
  verifyCode: function (e) {
    var that = this;
    var code = e.detail.value;
    var mobile = this.data.mobileValue;
    // var changeMobile = this.data.sendMobile != this.data.mobileValue;
    var enable = mobile.length < 11 || code.length == 0 ;
    that.setData({
      btnEnable: enable
    })
  },

  // 重新获取验证码倒计时
  timerStart: function (second) {
    var that = this;
    // that.setData({
    //   sendMobile: mobile
    // })
    var count = second;
    var timer = setInterval(function(){
    if(count > 0){
      count--;
      that.setData({
        codeBtnText:count+' s后获取',
        smsCodeDisabled: true
      });
    } else {
      that.setData({
        codeBtnText:"获取验证码",
        smsCodeDisabled: false
      });
        count = 60;
        clearInterval(timer);
      }
    },1000);
  }
})