Page({
  data: {
    orderInfo:0
  },
  onLoad: function (option) {
    var orderInfo = JSON.parse(option.orderInfo) ; 
    this.setData({
      orderInfo: orderInfo
    });
  },

  saveImg: function (event) {
    var url = event.currentTarget.dataset.url;
     wx.previewImage({
        current: 'http://assets.jiangwoo.com/activity50.png', // 当前显示图片的http链接
       urls: ['http://assets.jiangwoo.com/activity50.png', 'http://assets.jiangwoo.com/activity100.png'] // 需要预览的图片http链接列表
      })
    },

  onShareAppMessage: function () {
  
  }
})