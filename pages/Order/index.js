var app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 1,
    tabTitle: ['待付款', '已付款', '已消费', '待退款', '已退款'],
    orderType: ["0", "1", "9", "10", "11"],
    orderList:null,
    oneList: null,

  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          currentTab: 1
        });
      }
    });

    var selectTabIndex = that.data.currentTab;
    var orderType = that.data.orderType
    that.getOrderList(orderType[selectTabIndex]);
    
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
     that.setData({
       currentTab: e.target.dataset.current
      })

   
    var selectTabIndex = that.data.currentTab;
    var orderType = that.data.orderType;
    that.getOrderList(orderType[selectTabIndex]);
  },

  showOrderDetail: function (event){
    if (!this.data.currentTab){
      return;
    } 
    var orderInfo = event.currentTarget.dataset.orderinfo;
    wx.navigateTo({
      url: "/pages/Order/OrderDetail/detail?orderInfo=" + JSON.stringify(orderInfo)
    })
  },

  getOrderList: function (type){
    var that = this;
    wx.showLoading({
    title: '加载中',
    })

    setTimeout(function(){
      wx.hideLoading()
    },2000)
    wx.request({
      url: 'https://microapp.love0371.com/order/getuserorderlist',
      data: {"orderstate": type,"startnum": "0","requestnum": "20"},
      method: 'GET',
      header: {'Accept': 'application/json'},
      success: function(res){
        wx.hideLoading()
        var orderList = res.data.data.Datalist;
        if (!orderList.length) {
          that.setData({
            orderList: null
          })
        }else {
          that.setData({
            orderList: res.data.data.Datalist
          })
        }
      }
    })
  }
})