var siteconfig = require('../../config/config.js');
var app = getApp();

Page({
  data: {
    pickedShopIndex: 0,//选取的下拉框index
    pickedShopId: 0,//选取的店铺ID  *
    pickedShopName: '',//选取的店铺名称
    shopList: null,//店铺列表 
    isAnyShopOpen: true,//是否有店铺营业

    totalMoney: '',
    rateDiscount: '0',
    unRebateMoney: '',
    useScore: 0,
    scoreDiscountMoney: '0',
    rateDiscountMoney: 0,
    realPayMoney: 0,
    totalScore: '0',
    maxUseScore: '0',
    scoreCanDisCount: '0',
    score2Money: '0',
    balance: '0.00',
    useBalance: 0,
    chkUnrebate: false,
    chkUseScore: true,
    chkUseBalance: true,

    isBalancePay: true
  },
  onLoad: function (options) {
    this.getShopList();
    this.getUserFinance();
  },
  onShareAppMessage: function () {

  },
  getShopList: function () {
    wx.showLoading({
      title: '加载数据中',
    })
    var that = this;
    //发送请求，请求店铺数据
    var url = app.ApiUrl.getShopList;
    app.WxService.sendRrquest(url, 'GET', {})
      .then(function (response) {
        that.setData({
          shopList: response.data.data
        });
        if (that.data.shopList) {
          var pickedId = that.data.shopList[0].ShopID
          that.setData({
            pickedShopId: pickedId
          });
          var pickedShopName = that.data.shopList[0].ShopName;
          that.setData({
            pickedShopName: pickedShopName
          });
        } else {
          that.setData({
            isAnyShopOpen: false,
            pickedShopName: '暂无店铺营业'
          })
        }
      }, function () {
        that.setData({
          isAnyShopOpen: false,
          pickedShopName: '暂无店铺营业'
        })
      });
  },
  getUserFinance: function () {
    wx.showLoading({
      title: '加载数据中',
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
            rateDiscount: res.data.rateDiscount,
            score2Money: res.data.score2Money,
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
  //店铺改变
  bindShopChange: function (e) {
    this.setData({
      pickedShopIndex: e.detail.value
    });
    var pickedId = this.data.shopList[this.data.pickedShopIndex].ShopID
    this.setData({
      pickedShopId: pickedId
    });
    var pickedShopName = this.data.shopList[this.data.pickedShopIndex].ShopName;
    this.setData({
      pickedShopName: pickedShopName
    });
    console.log(this.data.pickedShopId);
  },
  //消费金额输入框数值改变
  totalMoneyChange: function (event) {
    this.clearNoNum(event, 'totalMoney', false);
    this.setData({
      unRebateMoney: ''
    });
    this.calcPayMoney();
  },
  //消费金额输入框失去焦点
  totalMoneyBlur: function (event) {
    this.clearNoNum(event, 'totalMoney', true);
    this.calcPayMoney();
  },
  //选取不可优惠金额
  checkUndiscount: function () {
    var isCheck = !this.data.chkUnrebate;
    this.setData({
      chkUnrebate: isCheck
    });
    if (!isCheck) {
      this.setData({
        unRebateMoney: ''
      });
    }
    this.calcPayMoney();
  },
  //不可优惠输入框数值改变
  unRebateMoneyChange: function (event) {
    this.clearNoNum(event, 'unRebateMoney', false);
    if (this.data.totalMoney != "") {
      if (this.data.unRebateMoney != "") {
        if (isNaN(this.data.unRebateMoney)) {
          this.data.unRebateMoney = '';
        }
        if (parseFloat(this.data.unRebateMoney) > parseFloat(this.data.totalMoney)) {
          wx.showToast({
            title: '不可优惠金额不能大于消费总额！',
            image: '/assets/images/Icon/warning.png',
            mask: true
          });
          this.setData({
            unRebateMoney: this.data.totalMoney
          });
          this.calcPayMoney();
          return {
            value: this.data.totalMoney
          }
        }
        this.calcPayMoney();
      }
    } else {
      wx.showToast({
        title: '请先输入消费金额！',
        mask: false,
        image: '/assets/images/Icon/warning.png',
      });
      this.setData({
        unRebateMoney: ''
      });
    }
  },
  //不可优惠输入框失去焦点
  unRebateMoneyBlur: function (event) {
    this.clearNoNum(event, 'unRebateMoney', true);
    this.calcPayMoney();
  },
  //使用积分勾选变化
  chkUseScoreChange: function () {
    var chkUseScore = !this.data.chkUseScore;
    this.setData({
      chkUseScore: chkUseScore
    });
    if (!chkUseScore) {
      this.setData({
        useScore: 0,
        scoreDiscountMoney: 0
      });
    }
    this.calcPayMoney();
  },
  //使用余额勾选变化
  chkUseBalanceChange: function () {
    var chkUseBalance = !this.data.chkUseBalance;
    this.setData({
      chkUseBalance: chkUseBalance
    });
    if (!chkUseBalance) {
      this.setData({
        useBalance: 0
      });
    }
    this.calcPayMoney();
  },
  //计算支付金额
  calcPayMoney: function () {
    var rateDiscountMoney = parseFloat((this.data.totalMoney) * this.data.rateDiscount).toFixed(2);
    this.setData({
      rateDiscountMoney: rateDiscountMoney
    })
    if (this.data.rateDiscountMoney < 0.01) {
      this.setData({
        rateDiscountMoney: 0
      })
    }

    if (this.data.chkUnrebate) {
      var rateDiscountMoney = parseFloat((this.data.totalMoney - this.data.unRebateMoney) * this.data.rateDiscount).toFixed(2);
      this.setData({
        rateDiscountMoney: rateDiscountMoney
      })
    }

    var maxUseScore = parseInt((this.data.totalMoney - this.data.rateDiscountMoney) / this.data.score2Money);
    if (parseInt(maxUseScore) > parseInt(this.data.totalScore)) {
      maxUseScore = this.data.totalScore;
    }
    this.setData({
      maxUseScore: maxUseScore
    })
    var scoreCanDisCount = parseFloat(this.data.maxUseScore * this.data.score2Money).toFixed(2);
    this.setData({
      scoreCanDisCount: scoreCanDisCount
    })
    if (this.data.chkUseScore) {
      var scoreDiscountMoney = parseFloat(this.data.useScore * this.data.score2Money).toFixed(2);
      this.setData({
        useScore: maxUseScore,
        scoreDiscountMoney: scoreDiscountMoney
      })
    } else {
      this.setData({
        useScore: 0,
        scoreDiscountMoney: 0
      })
    }

    var realPayMoney = parseFloat(this.data.totalMoney - this.data.rateDiscountMoney - this.data.scoreDiscountMoney).toFixed(2);
    this.setData({
      realPayMoney: realPayMoney
    })
    if (this.data.chkUseBalance) {
      if (this.data.realPayMoney >= 0) {
        var maxUseBalance = parseFloat(this.data.totalMoney - this.data.rateDiscountMoney - this.data.scoreDiscountMoney).toFixed(2);
        if (parseFloat(maxUseBalance) > parseFloat(this.data.balance)) {
          maxUseBalance = this.data.balance;
        }
        this.setData({
          useBalance: maxUseBalance
        })
      }
    } else {
      this.setData({
        useBalance: 0.00
      })
    }
    var realPayMoney = parseFloat((parseFloat(this.data.totalMoney).toFixed(2) * 100 - parseFloat(this.data.rateDiscountMoney).toFixed(2) * 100 - parseFloat(this.data.scoreDiscountMoney).toFixed(2) * 100 - parseFloat(this.data.useBalance).toFixed(2) * 100) / 100).toFixed(2);
    if (isNaN(realPayMoney) || realPayMoney < 0) {
      this.setData({
        realPayMoney: 0.00
      })
    } else {
      this.setData({
        realPayMoney: realPayMoney
      })
    }
    if (realPayMoney > 0) {
      this.setData({
        isBalancePay: false
      })
    } else {
      this.setData({
        isBalancePay: true
      })
    }
  },
  //清除多余的小数点
  clearNoNum: function (event, objNum, isFix) {
    var money = event.detail.value;
    money = money.replace(/^\./g, ""); //验证第一个字符是数字而不是.
    money = money.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.
    money = money.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    if (isFix) {
      money = parseFloat(money).toFixed(2);
    }
    if (isNaN(money)) {
      money = '';
    }
    if (objNum === 'totalMoney') {
      this.setData({
        totalMoney: money
      })
    }
    if (objNum === 'unRebateMoney') {
      this.setData({
        unRebateMoney: money
      })
    }
  },
  goPay: function () {
    wx.showLoading({
      title: '创建订单中',
    });
    var that = this;
    if (this.data.isBalancePay) {
      if (this.data.realPayMoney <= 0) {
        wx.showToast({
          title: '请输入消费的金额',
        })
      } else {
        var chkUnrebate = that.data.chkUnrebate ? '1' : '0';
        var chkUseScore = that.data.chkUseScore ? '1' : '0';
        var chkUseBalance = that.data.chkUseBalance ? '1' : '0';

        var url = app.ApiUrl.goPay;
        app.WxService.sendRrquest(url, 'POST', {
          txtTotalMoney: that.data.totalMoney,
          txtUnRebateMoney: that.data.unRebateMoney,
          txtRateDiscountMoney: that.data.rateDiscountMoney,
          txtUseBalance: that.data.useBalance,
          txtUseScore: that.data.useScore,
          chkUnRebate: chkUnrebate,
          chkUseScore: chkUseScore,
          chkBalance: chkUseBalance,
          pickedShopId: that.data.pickedShopId
        }).then(function (response) {
          wx.hideLoading();
          var res = response.data;
          if (res.success && res.status == "paySuccess") {
            wx.showToast({
              title: '支付成功',
            })
          } else {
            wx.showToast({
              title: res.msg,
            })
          }
        }, function () {
          wx.showToast({
            title: '获取用户财务信息失败！',
          })
        });
      }
    } else {
      var chkUnrebate = that.data.chkUnrebate ? '1' : '0';
      var chkUseScore = that.data.chkUseScore ? '1' : '0';
      var chkUseBalance = that.data.chkUseBalance ? '1' : '0';

      var url = app.ApiUrl.goPay;
      app.WxService.sendRrquest(url, 'POST', {
        txtTotalMoney: that.data.totalMoney,
        txtUnRebateMoney: that.data.unRebateMoney,
        txtRateDiscountMoney: that.data.rateDiscountMoney,
        txtUseBalance: that.data.useBalance,
        txtUseScore: that.data.useScore,
        chkUnRebate: chkUnrebate,
        chkUseScore: chkUseScore,
        chkBalance: chkUseBalance,
        pickedShopId: that.data.pickedShopId
      }).then(function (response) {
        wx.hideLoading();
        var res = response.data;
        if (res.success) {
          var data = res.data;
          wx.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': 'MD5',
            'paySign': data.paySign,
            'success': function (res) {
              wx.showToast({
                title: '支付成功',
              })
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败',
                image: '/assets/images/Icon/error.png',
                title: '支付已取消',
              })
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '请求支付失败！',
            image: '/assets/images/Icon/error.png',
            title: '',
          })
        }

      }, function () {
        wx.showToast({
          title: '获取用户财务信息失败！',
        })
      });
    }
  }
})