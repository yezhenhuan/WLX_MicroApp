var virData = require('../../data/shopListData.js')

Page({
  data: {
    pickedShopIndex: 0,//选取的下拉框index
    pickedShopId: 0,//选取的店铺ID  *
    pickedShopName: '',//选取的店铺名称
    shopList: null,//店铺列表 

    totalMoney: '',
    rateDiscount: '0.2',
    unRebateMoney: '',
    useScore: 0,
    scoreDiscountMoney: '0',
    rateDiscountMoney: 0,
    realPayMoney: 0,
    totalScore: '1500',
    maxUseScore: '0',
    scoreCanDisCount: '0',
    score2Money: '0.1',
    balance: '500.00',
    useBalance: 0,
    totalBalance: '650',
    realMoney: '0',
    payType: '1',
    chkUnrebate: false,
    chkUseScore: true,
    chkUseBalance: true,

    isBalancePay: true
  },
  onLoad: function (options) {
    //发送请求，请求实际数据
    this.setData({
      shopList: virData.shopList
    });
    var pickedId = this.data.shopList[0].shopId
    this.setData({
      pickedShopId: pickedId
    });
    var pickedShopName = this.data.shopList[0].shopName;
    this.setData({
      pickedShopName: pickedShopName
    });
  },
  onShareAppMessage: function () {

  },
  //店铺改变
  bindShopChange: function (e) {
    this.setData({
      pickedShopIndex: e.detail.value
    });
    var pickedId = this.data.shopList[this.data.pickedShopIndex].shopId
    this.setData({
      pickedShopId: pickedId
    });
    var pickedShopName = this.data.shopList[this.data.pickedShopIndex].shopName;
    this.setData({
      pickedShopName: pickedShopName
    });
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
  },
  //不可优惠输入框数值改变
  unRebateMoneyChange: function (event) {
    if (this.data.totalMoney != "") {
      if (this.data.unRebateMoney != "") {
        if (isNaN(this.data.unRebateMoney)) {
          this.data.unRebateMoney = '';
        }
        if (parseFloat(this.data.unRebateMoney) > parseFloat(this.data.totalMoney)) {
          this.setData({
            unRebateMoney: this.data.totalMoney
          });
        }
        this.clearNoNum(event, 'unRebateMoney', false);
        this.calcPayMoney();
      }
    } else {
      wx.showToast({
        title: '请先输入消费金额！',
        mask: false
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
  chkUseScoreChange: function () {
    var chkUseScore = !this.data.chkUseScore;
    this.setData({
      chkUseScore: false
    });
    this.calcPayMoney();
  },
  chkUseBalanceChange: function () {
    var chkUseBalance = !this.data.chkUseBalance;
    this.setData({
      chkUseBalance: chkUseBalance
    });
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
        rateDiscountMoney: 0
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
      this.setData({
        useScore: maxUseScore
      })

    } else {
      this.setData({
        useScore: 0
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
        useBalance: 0
      })
    }

    var scoreDiscountMoney = parseFloat(this.data.useScore * this.data.score2Money).toFixed(2);
    this.setData({
      scoreDiscountMoney: scoreDiscountMoney
    })
    var realPayMoney = parseFloat((parseFloat(this.data.totalMoney).toFixed(2) * 100 - parseFloat(this.data.rateDiscountMoney).toFixed(2) * 100 - parseFloat(this.data.scoreDiscountMoney).toFixed(2) * 100 - parseFloat(this.data.useBalance).toFixed(2) * 100) / 100).toFixed(2);
    if (isNaN(realPayMoney) || realPayMoney<0) {
      this.setData({
        realPayMoney: 0
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
  }
})