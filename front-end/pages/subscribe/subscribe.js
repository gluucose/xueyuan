const api = require("../../api/api")
const app = getApp();

// pages/subscribe/subscribe.js
Page({
    data: {
        allSite: "",
        allSiteList: [],
        subList: [],
    },

    // isSubscribed
    Website: function(name, url, category, imgurl){
        this.name=name;
        this.url=url;
        this.category = category;
        this.imgurl = imgurl;
        this.isSubscribed = false;
    },

    GetAllSite: function(){
        var allsite = new Array();
        allsite[0] = new this.Website('教务处',"https://jwc.scu.edu.cn",
        "行政管理网站", "/statics/images/jwc.png");
        allsite[1] = new this.Website('图书馆', "http://lib.scu.edu.cn",
        "行政管理网站","")
        allsite[2] = new this.Website('计算机学院',"https://cs.scu.edu.cn",
        "学院网站", "/statics/images/cs.jpg");
        allsite[3] = new this.Website('软件学院',"https://sw.scu.edu.cn",
        "学院网站", "/statics/images/se.jpg");
        allsite[4] = new this.Website('网安学院', "https://ccs.scu.edu.cn",
        "学院网站","")
        var allSite = ['教务处','图书馆','计算机学院','软件学院','网安学院']
        this.setData({
            allSiteList: allsite,
            allSite: allSite,
        })
    },

    // 更改isSubscribed
    CheckSub: function(subname){
        for(var i = 0 ; i < this.data.allSiteList.length ; i++){
            if(subname.includes(this.data.allSiteList[i].name)){
                var tmpList = new Array();
                tmpList = this.data.allSiteList.concat([])
                tmpList[i].isSubscribed = true
                this.setData({
                    allSiteList: tmpList,
                })
            }
        }
    },

    onShow: function () {
        this.GetAllSite();
        console.log('allSiteList', this.data.allSiteList)
        let url = app.globalData.url + "/subscribe/view" + "?user_id=" + app.globalData.openid
        var that = this
        api.get(url, {
        }).then((res)=>{  // 返回已订阅网站全部信息
            console.log(res)
            app.globalData.subscribedWeb = res.data
            var tmpList = new Array();
            for (var i = 0 ; i < res.data.length ; i++) {
                tmpList.push(res.data[i].name)
            }
            console.log(tmpList)
            that.setData({
                subList: tmpList,
            })
            that.CheckSub(that.data.subList);
        }).catch((err)=>{
            console.log(err)
        })
    },

    tobeExtend: function(){
        wx.showToast({
          title: '未开放订阅',
          icon: 'none',
        })
    },

    toSubscribe: function(e){
        console.log(e)
        var tmpSiteList = this.data.allSiteList
        tmpSiteList[e.currentTarget.dataset.id].isSubscribed = true
        this.setData({
             allSiteList: tmpSiteList,
         })
        let url = app.globalData.url + "/subscribe/add"
        api.post(url, {
            user_id: app.globalData.openid,
            website_url: this.data.allSiteList[e.currentTarget.dataset.id].url,
        })
    },

    unsubscribe: function(e){
        console.log(e)
        var tmpSiteList = this.data.allSiteList
        tmpSiteList[e.currentTarget.dataset.id].isSubscribed = false
        this.setData({
             allSiteList: tmpSiteList,
         })
        let url = app.globalData.url + "/subscribe/delete"
        api.post(url, {
            user_id: app.globalData.openid,
            website_url: this.data.allSiteList[e.currentTarget.dataset.id].url,
        })
    }
   
})