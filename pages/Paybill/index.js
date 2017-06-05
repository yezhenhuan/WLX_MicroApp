var virData = require('../../data/shopListData.js')

Page({
  data: {
    pickedShopIndex: 0,
    pickedShopId: 0,
    pickedShopName: '',
    shopList: null,
    totalScore: 560,
    totalBalance: 168.00,
    useScore: 20,
    useBalance: 10,
    payType: 1,
    isCheckUndiscount: false
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
    console.log(this.data.isCheckUndiscount);
    var isCheck = !this.data.isCheckUndiscount;
    this.setData({
      isCheckUndiscount: isCheck
    });
  }
})