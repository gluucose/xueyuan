// pages/authorize/authorize.js
const api = require("../../api/api");
const app = getApp();

Page({
    data: {
        openid: "",
    },

    onLoad: function () {
        // 如果有本地缓存的openid，就直接登录
        if(wx.getStorageSync('openid')){
          app.globalData.openid = wx.getStorageSync('openid')
          wx.reLaunch({
            url: '/pages/mine/mine',
          })
        }
    },

    // 点击授权按钮
    bindGetUserInfo: function(){
        wx.login({
            success (res) {
              if (res.code) {
                let url = app.globalData.url + '/user/add'
                // 请求 openid
                api.post(url, {code: res.code}).then((res)=>{  
                    console.log(res.data)
                    app.globalData.openid = res.data,
                    wx.setStorageSync('openid', res.data) // 缓存openid
                    wx.reLaunch({  // 跳转到用户界面
                      url: '/pages/mine/mine',
                    })
                }).catch((err)=>{
                    console.log(err)
                })
              }
            }
        })
    },

})