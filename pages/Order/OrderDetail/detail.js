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
    //  wx.previewImage({
    //     current: 'http://assets.jiangwoo.com/activity50.png', // 当前显示图片的http链接
    //    urls: ['http://assets.jiangwoo.com/activity50.png', 'http://assets.jiangwoo.com/activity100.png'] // 需要预览的图片http链接列表
    //   })

    // wx.saveImageToPhotosAlbum({
    //   filePath: "http://assets.jiangwoo.com/activity50.png",
    //    success: function (res) {
    //         console.info(res)
    //   },
    //   fail:function(res){
    //        console.info(res)    
    //   }
    // })

    // wx.downloadFile({
    //   url: 'http://assets.jiangwoo.com/activity50.png',
    //   success: (res) => {
    //     wx.saveImageToPhotosAlbum({
    //       filePath: res.tempFilePath,
    //       success: () => {
    //         console.log('gg')
    //       },
    //       fail: (e) => {
    //         console.log('fail')
    //       }
    //     })
    //   }
    // })



    var date = new Date(1398250549490);
     var Y = date.getFullYear() + '-';
     var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
     var D = date.getDate() + ' ';
     var h = date.getHours() + ':';
     var m = date.getMinutes() + ':';
     var s = date.getSeconds(); 
      console.log(Y+M+D+h+m+s); //呀麻碟


    },

    // Date.prototype.Format = function (fmt) {  
    //   var o = {
    //       "M+": this.getMonth() + 1, //月份 
    //       "d+": this.getDate(), //日 
    //       "h+": this.getHours(), //小时 
    //       "m+": this.getMinutes(), //分 
    //       "s+": this.getSeconds(), //秒 
    //       "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    //       "S": this.getMilliseconds() //毫秒 
    //   };
    //   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    //   for (var k in o)
    //   if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    //   return fmt;
    // }





})