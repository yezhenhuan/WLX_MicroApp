
Page({
  data: {
    orderInfo: '',
    payInfoShow: true,
    orderUseShow: true,
    orderUnuseShow: true,
    backInfoShow: true,
    vrDesc: ['¥23', '微信帐户', '七个工作日'],
    demo1:[ '2017-04-12 13:10:01', '2017-04-12 12:22:11'],
    demo2:['商家正在审核退款信息' ,'申请退款'],
    demo3:['付款金额', '商品', '商户名称', '当前状态', '支付时间', '支付方式', '交易单号'],
    demo3data:[]
  },
  onLoad: function (option) {
    var orderInfo = JSON.parse(option.orderInfo) ; 
    console.log(orderInfo);
    var that = this;
    that.setData({
        orderInfo: orderInfo,
    });

    var orderState = that.data.orderInfo.OrderState;

    if (orderState == 9) {
      var state = orderInfo.OrderProducts[0];
      if (state.ShopState == 1) {
        that.setData({
          payInfoShow: false,
        });
      } else {
        that.setData({
          orderUseShow: false
        });
      }
    }

    if (orderState == 1) {
      that.setData({
        orderUnuseShow: false,
      });
    }

    if (orderState == 10) {
      that.setData({
        backInfoShow: false,
      });
    }

    // if (orderState == 11) {
    //   that.setData({
    //     backInfoShow: false,
    //   });
    // }





  }

})