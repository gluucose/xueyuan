// pages/article/article.js
const app = getApp();
const api = require("../../api/api");

Page({
    data: {
      pid: "",
      article: "",
      is_collected:true,
    },

    // 加载时获取传入的帖子ID
    onLoad: function (e) {
      console.log(e) 
      var flag
      if(e.collected=="false"){
        flag = false
      }
      else{
        flag = true
      }
      this.setData({
        pid: e.text,
        is_collected: flag,
      })
      console.log("e.collected",e.collected)
      // 请求帖子全部信息
      let url = app.globalData.url + "/article/view_detail?article_id=" + e.text
      api.get(url).then((res)=>{  
        this.setData({
          article: res.data,
          // is_collected: res.data.is_collected,
        })
        console.log('article', res.data)
      }).catch((err)=>{
        console.log(err)
      })
    },

    onShareAppMessage: function () {
        return {
            title: this.data.article.title,
            path: '/pages/article/article'
          }
    },

    // 用户修改收藏状态
    changeCollect: function(){
      console.log(this.data.is_collected)
      // 添加用户收藏文章
      if(!this.data.is_collected){
        let url = app.globalData.url + '/collect/add'
        api.post(url,{
          user_id: wx.getStorageSync('openid'),
          article_id: this.data.pid,
        }).then((res) => {
          this.setData({
            is_collected: !this.data.is_collected,
          })
          wx.showToast({
            title: '已收藏',
          })
        }).catch((err) => {
          console.log(err)
        })
      }else{  // 删除收藏
        let url = app.globalData.url + '/collect/delete'
        api.post(url,{
          user_id: wx.getStorageSync('openid'),
          article_id: this.data.pid,
        }).then((res) => {
          this.setData({
            // is_collected: !this.data.is_collected,
            is_collected: !this.data.is_collected,
          })
          wx.showToast({
            title: '取消收藏',
          })
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    
})