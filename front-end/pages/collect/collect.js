// pages/collect/collect.js
const app = getApp();
const api = require("../../api/api");

Page({
    data: {
        article: "",
        openid: "",
    },

    // 加载页面时请求收藏的文章
    // onLoad: function () {
    //     console.log('onLoad')
    //     let url = app.globalData.url + "/collect/record" + "?user_id=" + wx.getStorageSync('openid')
    //     api.get(url).then((res)=>{  
    //       this.setData({
    //         article:res.data,
    //       })
    //       console.log('article', res.data)
    //   }).catch((err)=>{
    //       console.log(err)
    //   })
    // },

    onShow: function(){
        console.log('onLoad')
        let url = app.globalData.url + "/collect/record" + "?user_id=" + wx.getStorageSync('openid')
        api.get(url).then((res)=>{  
          this.setData({
            article:res.data,
          })
          console.log('article', res.data)
      }).catch((err)=>{
          console.log(err)
      })
    },

    // 聚焦搜索框时跳转到搜索页面
    onClick: function(){
        wx.navigateTo({
          url: '/pages/search/search',
        })
    },

    // 跳转到全文页面，传递帖子ID参数
    toFullArticle: function(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index;
        wx.navigateTo({
          url: `/pages/article/article?text=${index}&collected=${true}`,
        })
    },
})