// pages/menu/menu.js
const util = require('../../utils/util');
const config = require('./config');
const cloud = require('../../utils/cloud');
const auth = require('../../utils/auth');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,
    menuBreakList: [],
    menuLunchList: [],
    menuDinnerList: []
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const self = this;
    auth.auth(token => {
      util.fAjax(
        config.menuListUrl,
        {
          entity: 'FoodMenu'
        },
        function (pagation, data) {
          let imgList = data;
          let brakFastList = [];
          let lunchList = [];
          let dinnerList = [];
          imgList.forEach(item => {
            let temp = {
              name: item.name,
              imgUrl: config.showImgUrl + '?appid=' + cloud.appid
              + '&token=' + token + '&uuid=' + item.foodImg
            };
            if (+item.foodType === 0) {
              brakFastList.push(temp);
            }
            else if (+item.foodType === 1) {
              lunchList.push(temp);
            }
            else {
              dinnerList.push(temp);
            }
          });
          self.setData({
            menuBreakList: brakFastList,
            menuLunchList: lunchList,
            menuDinnerList: dinnerList
          });
        },
        function (err) {
          console.log(err);
        }
      );
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})