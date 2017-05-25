/**
 * 配置聚云应用密钥与安全码
 */
const cloud = require('./cloud');
const config = {
    appkey: cloud.appkey,
    appsecret: cloud.appsecret
};

function reqTOken(cb) {
  wx.request({
    method: 'GET',
    url: 'https://v2.mashupcloud.cn/developer/auth.do',
    data: config,
    success(res) {
        const status = res.statusCode;
        if (status === 200) {
            const token = res.data[1];
            wx.setStorage({
                key: 'token',
                data: token
            });
            cb && cb(token);
        }
    },
    fail(err) {
      console.log(err);
    }
  });
}

function auth(suc, fail) {
  const storageToken = wx.getStorage({
    key: 'token',
    success(res) {
      let token = res.data;
      if (!token) {
        reqTOken(suc);
      }
      else {
        suc(token);
      }
    },
    fail() {
      reqTOken(suc);
    }
  });
}

module.exports = {
  auth
};