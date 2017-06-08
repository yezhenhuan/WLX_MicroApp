var dateFormat = require('./dateFormat.js');

Page({
  data: {
    orderInfo: '',
    orderInfoHidden: false,
    vrDesc: ['¥23', '微信帐户', '七个工作日'],
    demo1:[ '2017-04-12 13:10:01', '2017-04-12 12:22:11'],
    demo2:['商家正在审核退款信息' ,'申请退款']
  },
  onLoad: function (option) {
    var orderInfo = JSON.parse(option.orderInfo) ; 
    var hidden = orderInfo.OrderState == 1 || orderInfo.OrderState == 9 ?  false : true;
    var that = this;
    that.setData({
      orderInfo: orderInfo,
      orderInfoHidden: hidden
    });

  }

})