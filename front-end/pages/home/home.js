const api = require("../../api/api");

// pages/home/home.js
const app = getApp();

Page({
    data: {
        page:1,
        hasMore:true,
        url: " ",
        navTab: ["行政管理网站", "学院网站"],
        currentNavtab: 0,
        article: [],
    },

    // 切换顶部导航栏
    switchTab: function(e){
      this.setData({
        currentNavtab: e.currentTarget.dataset.idx,
        article:[],
        page:1,
        hasMore:true
      });
      this.refresh();
    },

// 加载页面时请求所有与标题类别相关的帖子
onLoad: function () {
  
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
  this.refresh()

},

//刷新
refresh:function(){
  let user_id = wx.getStorageSync('openid')
  let web_category = this.data.navTab[this.data.currentNavtab]
  let url = app.globalData.url + "/article/scan?user_id=" + user_id + "&web_category=" + web_category + "&page=" + this.data.page;
  wx.showLoading({
    title: '加载中',
  })
  api.get(url).then((res)=>{  
        console.log(res)
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
  var tmpList = [...this.data.article, ...res.data]    //取数组里的个值，后再赋值到一个新数组里
  this.setData({
    article: tmpList
  }) 
  console.log(this.data)
  }).catch((err)=>{
      console.log(err)
  })
},

onShow:function(){
  this.setData({
    article:[],
  })
  this.refresh()
},

  // 跳转到全文页面，传递帖子ID参数
  toFullArticle: function(e) {
    console.log("e",e)
    let index = e.currentTarget.dataset.index;
    var collected
    for(var i=0;i<this.data.article.length;i++){
      if(this.data.article[i].article_id==index){
        collected = this.data.article[i].is_collected;
      }
    }
    console.log('collected', collected)
      wx.navigateTo({
        url: `/pages/article/article?text=${index}&collected=${collected}`,
      })
  },

  // 聚焦搜索框时跳转
  onClick: function(){
    wx.navigateTo({
      url: '/pages/searchFull/searchFull',
    })
  },

})