// var vrData = require('../../data/orderListData.js');
var siteconfig = require('../../config/config.js');
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

  // 左右滑动
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  // 切换顶部tab
  swichNav: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return;
    } 
   that.setData({
     currentTab: e.target.dataset.current
    })
    var selectTabIndex = that.data.currentTab;
    var orderType = that.data.orderType;
    that.getOrderList(orderType[selectTabIndex]);
  },

  // 进入订单详情页
  showOrderDetail: function (event){
    if (!this.data.currentTab){
      return;
    } 
    var orderInfo = event.currentTarget.dataset.orderinfo;
    wx.navigateTo({
      url: "/pages/Order/OrderDetail/detail?orderInfo=" + JSON.stringify(orderInfo)
    })
  },

  // 获取订单数据
  getOrderList: function (type){
    var that = this;

    // 模拟数据
    // var list = vrData.orderList;
    // console.log(vrData);
    // that.setData({
    //   orderList: list
    // })

    wx.showLoading({
    title: '加载中',
    })
    setTimeout(function(){
      wx.hideLoading()
    },2000)

    wx.request({
      url: siteconfig.officialPath + '/order/getuserorderlist',
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
      },
      fail: function (res) {

      }
    })
  }
})