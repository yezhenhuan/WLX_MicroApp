var virData = require('../../data/orderListData.js')
var app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 1,
    tabTitle: ['待付款', '已付款', '已消费', '待退款', '已退款'],
    orderList:null,
    oneList: null
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
      return;
    } 

    if (e.target.dataset.current == 1) {

      that.setData({
       currentTab: e.target.dataset.current,
       orderList: virData.oneOrder
      })

    } else if (e.target.dataset.current == 4) {
      that.setData({
       currentTab: e.target.dataset.current,
       orderList: null
      })

    } else {
      that.setData({
       currentTab: e.target.dataset.current,
       orderList: virData.orderList
      })
    }
  },
  showOrderDetail: function (event){
    if (!this.data.currentTab){
      return;
    } 
    var orderInfo = event.currentTarget.dataset.orderinfo;
    wx.navigateTo({
      url: "/pages/Order/OrderDetail/detail?orderInfo=" + JSON.stringify(orderInfo)
    })
  }
})