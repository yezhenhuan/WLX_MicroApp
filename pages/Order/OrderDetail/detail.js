Page({
  data: {
    orderId:0
  },
  onLoad: function (option) {
    var orderId = option.orderId; 
    this.setData({
      orderId: orderId
    });
    //请求接口获取数据
  },
  onShareAppMessage: function () {
  
  }
})