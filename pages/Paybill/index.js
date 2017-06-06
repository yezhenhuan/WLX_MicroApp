var virData = require('../../data/shopListData.js')

Page({
  data: {
    pickedShopIndex: 0,//选取的下拉框index
    pickedShopId: 0,//选取的店铺ID  *
    pickedShopName: '',//选取的店铺名称
    shopList: null,//店铺列表 

    rateDiscountMoney: 0,//等级折扣金额 *

    totalMoney: '',//消费金额 *
    totalScore: 1000,//总积分 *
    totalBalance: 168.00,//总余额 *
    totalUndiscountMoney: '',//不优惠金额 *

    useScore: 20,//使用积分 *
    useBalance: 10,//使用余额 *
    payType: 1,//支付类型，微信内支付

    isCheckUndiscount: false,//是否选中不优惠金额
    isCheckUseScore: true,//是否选中使用积分
    isCheckUseBalance: true,//是否选中使用余额

    rateDiscount:0.1,//等级折扣 *
    balancePayText: true
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
  checkUndiscount: function () {
    var isCheck = !this.data.isCheckUndiscount;
    this.setData({
      isCheckUndiscount: isCheck
    });
  },
  totalMoneyChange: function (event) {
    this.clearNoNum(event, 'totalMoney', false);
    this.setData({
      totalUndiscountMoney: ''
    })
  },
  totalMoneyBlur: function (event) {
    this.clearNoNum(event, 'totalMoney', true);
  },
  totalUndiscountMoneyChange: function (event) {
    if (this.data.totalMoney != "") {
      if (this.data.totalUndiscountMoney != "") {
        if (isNaN(this.data.totalUndiscountMoney)) {
          this.data.unRebateMoney = '';
        }
        if (parseFloat(this.data.totalUndiscountMoney) > parseFloat(this.data.totalMoney)) {
          this.setData({
            totalUndiscountMoney: this.data.totalMoney
          });
        }
        this.clearNoNum(event, 'totalUndiscountMoney', false);
      }
    } else {
      wx.showToast({
        title: '请先输入消费金额！',
        mask: false
      });
      this.setData({
        totalUndiscountMoney: ''
      });
    }
  },
  totalUndiscountMoneyBlur: function (event) {
    this.clearNoNum(event, 'totalUndiscountMoney', true);
    this.calcPayMoney();
  },
  calcPayMoney: function () {
    // this.data.rateDiscountMoney = parseFloat((this.data.totalMoney) * this.data.rateDiscount).toFixed(2);
    // if (this.data.rateDiscountMoney < 0.01) {
    //   this.data.rateDiscountMoney = 0;
    // }

    // if (this.data.isCheckUndiscount == 1) {
    //   this.data.rateDiscountMoney = parseFloat((this.data.totalMoney - this.data.unRebateMoney) * this.data.rateDiscount).toFixed(2);
    // }

    // var maxUseScore = parseInt((this.data.totalMoney - this.data.rateDiscountMoney) / this.data.score2Money);
    // if (parseInt(maxUseScore) > parseInt(this.data.totalScore)) {
    //   maxUseScore = this.data.totalScore;
    // }
    // this.data.maxUseScore = maxUseScore;
    // this.data.scoreCanDisCount = parseFloat(this.data.maxUseScore * this.data.score2Money).toFixed(2);

    // if (this.data.chkUseScore == 1) {
    //   this.data.useScore = maxUseScore;
    // } else {
    //   this.data.useScore = 0;
    // }

    // this.data.realPayMoney = parseFloat(this.data.totalMoney - this.data.rateDiscountMoney - this.data.scoreDiscountMoney).toFixed(2);
    // if (this.data.chkUseBalance == 1) {
    //   if (this.data.realPayMoney >= 0) {
    //     var maxUseBalance = parseFloat(this.data.totalMoney - this.data.rateDiscountMoney - this.data.scoreDiscountMoney).toFixed(2);
    //     if (parseFloat(maxUseBalance) > parseFloat(this.data.balance)) {
    //       maxUseBalance = this.data.balance;
    //     }
    //     this.data.useBalance = maxUseBalance;
    //   }
    // } else {
    //   this.data.useBalance = 0;
    // }

    // this.data.scoreDiscountMoney = parseFloat(this.data.useScore * this.data.score2Money).toFixed(2);
    // var realPayMoney = parseFloat((parseFloat(this.data.totalMoney).toFixed(2) * 100 - parseFloat(this.data.rateDiscountMoney).toFixed(2) * 100 - parseFloat(this.data.scoreDiscountMoney).toFixed(2) * 100 - parseFloat(this.data.useBalance).toFixed(2) * 100) / 100).toFixed(2);
    // this.data.realPayMoney = realPayMoney;
    // var payText = this.data.realPayMoney;
    // if (isNaN(this.data.realPayMoney)) {
    //   payText = 0;
    // }
    // if (realPayMoney > 0) {
    //   this.setData({
    //     balancePayText: false
    //   })
    // } else {
    //   this.setData({
    //     balancePayText: true
    //   })
    // }
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
    if (objNum === 'totalUndiscountMoney') {
      this.setData({
        totalUndiscountMoney: money
      })
    }
  }
})