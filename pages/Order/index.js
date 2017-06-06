var virData = require('../../data/orderListData.js')
var app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    tabTitle:['待付款', '已付款', '已消费', '待退款', '已退款'],
    orderList:null,
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          orderList: virData.orderList
        });

        console.log(that.data.orderList);
      }
    });

    
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  showOrderDetail: function (event){
    var orderId = event.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: "/pages/Order/OrderDetail/detail?orderId=" + orderId
    })
  }
})