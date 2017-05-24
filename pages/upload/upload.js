// upload.js
const auth = require('../../utils/auth');
const cloud = require('../../utils/cloud');
const util = require('../../utils/util');
const config = require('./config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodname: '',
    foodImgId: '',
    currentType: 0,
    foodType: ['早餐', '午餐', '晚餐'],
    msImgUrl: './img/photo.png'
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
  
  },

  /**
   * 聚云显示图片接口
   */
  showImage(uuid) {
    auth.auth((token) => {
      let imgUrl = config.showImgUrl + '?appid=' + cloud.appid
                 + '&token=' + token + '&uuid=' + uuid;
      this.setData({
        msImgUrl: imgUrl
      });
    });
  },

/**
 * 更新菜单表
 */
  updateFoodTable() {
    const data = this.data;
    let params = {
      name: data.foodname,
      foodImg: data.foodImgId,
      foodType: data.currentType
    };
    let updateUrl = config.updateUrl + '?appid=' + cloud.appid;
    util.fAjax(
      updateUrl,
      params,
      function (data) {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 3000,
          success() {
            wx.navigateTo({
              url: '/pages/menu/menu'
            })
          }
        });
      },
      function (err) {
        wx.showToast({
          title: '上传失败',
          icon: 'warn',
          duration: 2000
        });
      }
    );
  },

  /**
   * 上传图片
   */
  uploadImg() {
    const self = this;
    auth.auth((token) => {
      wx.chooseImage({
        // 默认9
        count: 1,
        // 可以指定是原图还是压缩图，默认二者都有
        sizeType: ['original', 'compressed'],
        // 可以指定来源是相册还是相机，默认二者都有
        sourceType: ['album', 'camera'],
        success: function (res) {
          // 返回选定照片的本地文件路径列表，
          // tempFilePath可以作为img标签的src属性显示图片
          let tempFilePath = res.tempFilePaths[0];
          let uploadUrl = config.uploadUrl + '?appid=' + cloud.appid;
          wx.uploadFile({
            url: uploadUrl,
            filePath: tempFilePath,
            name: 'uploadfile',
            formData: {
              appid: cloud.appid,
              token: token
            },
            success(res) {
              const data = JSON.parse(res.data);
              if (data[0] === 'OK') {
                self.setData({
                  foodImgId: data[2]
                });
                self.showImage(data[2]);
              }
            },
            fail(err) {
              console.log(err);
            }
          });
        }
      });
    });
  },
  // 菜名输入变化事件处理函数
  changeFoodName(e) {
    const detail = e.detail;
    this.setData({
      foodname: detail.value
    });
  },
  // 选择菜所属类型
  changeType(e) {
    let index = +e.detail.value;
    this.setData({
      currentType: index
    });
  }
});