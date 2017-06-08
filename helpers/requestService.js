// 本服务用于封装请求
// 返回的是一个promisepromise
var siteDomain = require('../config/config.js')


var sendRrquest = function (url, method, data,token) {
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: siteDomain.officialPath + url,
      data: data,
      method: method,
      header: {
        // accessToken: wx.getStorageSync('token')
        accessToken:'85518b16655d42a18669214359ca1763'
      },
      success: resolve,
      fail: reject
    })
  });
  return promise;
};

module.exports.sendRrquest = sendRrquest 