// pages/mine/mine.js
const api = require("../../api/api")

// pages/mine/mine.js
const app = getApp();

Page({
  data: {
    index: -1,
    array: ['计算机学院', '软件学院', '网安学院', '其他'],
    objectArray: [
      {
        id: 0,
        name: '计算机学院'
      },
      {
        id: 1,
        name: '软件学院'
      },
      {
        id: 2,
        name: '网安学院'
      },
      {
        id: 3,
        name: '其他'
      },
    ],
  },

  // 选择学院
  bindPickerChange: function (e) {
    // 保存index和prof到本地缓存和全局变量
    console.log('picker', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    wx.setStorageSync('index', e.detail.value)
    app.globalData.prof = this.data.array[this.data.index],
    wx.setStorageSync('prof', app.globalData.prof)
    console.log(this.data.array[this.data.index])
    // 请求更改学院
    let url = app.globalData.url + "/user/prof"
    api.post(url,{
      user_id: wx.getStorageSync('openid'),
      prof: wx.getStorageSync('prof'),
    })
  },

  onLoad: function(){
    if(wx.getStorageSync('prof')){
      app.globalData.prof = wx.getStorageSync('prof')
      this.setData({
        index: wx.getStorageSync('index')
      })
    }else{

    }

  },
})

