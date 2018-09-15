//index.js
//获取应用实例
const app = getApp()
import config from './config';
import utilConfig from '../../utils/config';
import wxService from '../../utils/wxService';
const PATHS = utilConfig.PATHS;
const TOKEN = utilConfig.TOKEN;

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    picArray: config.picArray,
    count: 2000255
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    const cacheToken = wx.getStorageSync(TOKEN);
    const me = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if (!cacheToken) {
      me.getOpenID();
    } else {
      me.getSignNumber();
    }
  },
  onShow: function () {
    this.getSignNumber();
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getOpenID: function () {
    var me = this;
    wx.login({
      success: function (res) {
        wxService.sendWxRequest({
          url: utilConfig.SERVER_HOST + PATHS.GET_OPENID,
          data: {
            code: res.code,
            wxmicro_id: 2
          },
          doneHandler: function (backendData) {
            var token = backendData.token;
            wx.setStorageSync(TOKEN, token);
            me.getSignNumber();
          }
        });
      }
    });
  },

  getSignNumber: function () {
    const me = this;
    const token = wx.getStorageSync(TOKEN);
    if (token) {
      wxService.sendWxRequest({
        url: utilConfig.SERVER_HOST + PATHS.GET_LUCK_SIGN,
        data: {
          token: token
        },
        doneHandler: function (responeseDate) {
          const count = responeseDate.count;
          me.data.count = count ? count : 2000255;
        }
      });
    } 
  },
  btnGoNextPage: function (e) {
    const me = this;
    const currentTarget = e.currentTarget;
    const dataKey = currentTarget.dataset.key;
    const data = me.data;
    wx.navigateTo({
      url: '/pages/luckDetail/index?picKey=' + dataKey + '&count=' + data.count
    });
  },

  btnClick: function () {
    const me = this;
    const token = wx.getStorageSync(TOKEN);
    wxService.sendWxRequest({
      url: utilConfig.SERVER_HOST + PATHS.GET_KEFU_MSG,
      data: {
        token: token
      },
      doneHandler: function () {

      }
    });
  },
  onShareAppMessage: function (options) {
    const data = this.data;
    return {
      title: '已有2349427人通过云祝福送出祝福！',
      path: '/pages/index/index',
      imageUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a7d5a70d582b.jpg',
      success: function () {

      },
      fail: function () {

      },
      complete: function () {

      }
    };
  }
});
