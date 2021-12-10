const api = require("../../api/api");

// pages/searchFull/searchFull.js
const app = getApp();

Page({
    data: {
        page:1,
        hasMore:true,
        url: " ",
        noneview: false,
        openid: "",
        collected: false,
        article: [],
        keyword: ""
      },

   // 搜索加载时清空结果
   onLoad: function(){
    // this.setData({
    //   noneview: "",
    // })
   },

    // 上拉刷新
scrolltolower() {
  if (!this.data.hasMore) {
    wx.showToast({
      title: '已经到底了！',
      icon: 'none'
    })
    return
  }
  this.data.page++
    
    //刷新
    this.query(this.data.keyword)

},

   onShow:function(){
    this.setData({
      article:[],
    })
    this.query(this.data.keyword)
   },

  query:function(keyword){
    let openid = wx.getStorageSync('openid')
     let url = app.globalData.url + '/article/search?keyword='+ keyword + '&user_id=' + openid
     wx.showLoading({
      title: '加载中',
    })
     api.get(url).then((res)=>{
      console.log(res)
      // 如果有搜索结果（article非空）
      if(res.data){
        this.setData({
          noneview: false
        })
      }else{    // 如果没有搜索结果
        this.setData({
          noneview: true
        })
        wx.hideLoading()
        return
      }
      if (res.data.length<20) {
        wx.hideLoading()
        wx.showToast({
          title: '已经到底了！',
          icon: 'none'
        })
        this.setData({
          hasMore: false
        })
        return
      }
      wx.hideLoading()
      var tmpList = [...this.data.article, ...res.data]    //取数组里的一个值，后再赋值到一个新数组里
      this.setData({
        article: tmpList,
        keyword:keyword,
      }) 
     
      console.log(this.data.article)
    }).catch((err)=>{
      console.log(err)
    })
  },

  // 点击搜索
  onSearch: function(key){
     console.log('searchKey', key)
     console.log('url', app.globalData.url)
     this.setData({
      article:[],
      page:1,
      hasMore:true
    });
     let keyword = key.detail
     this.query(keyword)
     
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