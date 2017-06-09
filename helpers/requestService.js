// 本服务用于封装请求
// 返回的是一个promisepromise
var siteDomain = require('../config/config.js')
var sendRrquest = function (url, method, data, isUrlencoded) {
  var requestHeader = "";
  if (isUrlencoded) {
    requestHeader = {
      'content-type': 'application/x-www-form-urlencoded',
      AccessToken: wx.getStorageSync("AccessToken")
    }
  } else {
    requestHeader = {
      AccessToken: wx.getStorageSync("AccessToken")
    }
  };
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: siteDomain.officialPath + url,
      data: data,
      method: method,
      header: requestHeader,
      success: resolve,
      fail: reject
    })
  });
  return promise;
};

module.exports.sendRrquest = sendRrquest 