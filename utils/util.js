const auth = require('./auth');
const cloud = require('./cloud');

let token = '';

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getAjax(url, params, suc, fail, method) {
    params.appid = cloud.appid;
    params.token = token;
    wx.request({
        method: method || 'GET',
        url: url,
        data: params || {} ,
        dataType: "json",
        success(res) {
            const status = res.statusCode;
            if (status === 200) {
                suc(res.data[1], res.data[2]);
            }
            else {
                fail(res.data);
            }
        },
        fail() {
            fail(res.data);
        }
    });
}

function fAjax(url, params, suc, fail, method) {
  wx.getStorage({
    key: 'token',
    success: function(res) {
        token = res.data;
        getAjax(url, params, suc, fail, method);
    },
    fail() {
        auth.auth((token) => {
            token = token;
            getAjax(url, params, suc, fail, method);
        });
    }
  })
}

module.exports = {
  formatTime: formatTime,
  fAjax
}
