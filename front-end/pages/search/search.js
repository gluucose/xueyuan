const api = require("../../api/api");

// pages/search/search.js
const app = getApp();

Page({
    data: {
        url: " ",
        noneview: "",
        openid: "",
        collected: false,
        article: [],
        keyword: ""
      },

   // 搜索加载时清空结果
   onLoad: function(){
    this.setData({
      noneview: "",
    })
   },

   onShow:function(){
    let keyword = this.data.keyword
    let openid = wx.getStorageSync('openid')
    let url = app.globalData.url + '/collect/search?keyword='+ keyword + '&user_id=' + openid
    api.get(url).then((res)=>{
     this.setData({
       article: res.data,
       keyword:keyword,
     })
     // 如果有搜索结果（article非空）
     if(this.data.article){
       this.setData({
         noneview: false
       })
     }else{    // 如果没有搜索结果
       this.setData({
         noneview: true
       })
     }
     console.log(this.data.article)
   }).catch((err)=>{
     console.log(err)
   })
  },


  // 点击搜索
  onSearch: function(key){
     console.log('searchKey', key)
     console.log('url', app.globalData.url)
     let keyword = key.detail
     let openid = wx.getStorageSync('openid')
     let url = app.globalData.url + '/collect/search?keyword='+ keyword + '&user_id=' + openid
    api.get(url).then((res)=>{
      this.setData({
        article: res.data,
        keyword:keyword,
      })
      // 如果有搜索结果（article非空）
      if(this.data.article){
        this.setData({
          noneview: false
        })
      }else{    // 如果没有搜索结果
        this.setData({
          noneview: true
        })
      }
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },

  // 跳转到全文页面，传递帖子ID参数
  toFullArticle: function(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    var collected
    for(var i=0;i<this.data.article.length;i++){
      if(this.data.article[i].article_id==index){
        collected = this.data.article[i].is_collected;
      }
    }
      wx.navigateTo({
        url: `/pages/article/article?text=${index}&collected=${collected}`,
      })
  },

})