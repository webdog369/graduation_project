//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentTab:'myVideos',
    userName:'未登录',
    userImg:'/images/userImg.png',
    userSay:'',
    userTag:'',
    myVideos:'',
    likeVideos:""
  },
  goUpData:function(){
  wx.navigateTo({
    url: '../up-data/up-data',
  })
  },
  // 我的作品
  myVideos:function(ev){
    let id = ev.currentTarget.dataset.id;
    this.setData({
      currentTab:id
    })
  },
  // 喜欢作品
  likeVideos:function(ev){
    let id = ev.currentTarget.dataset.id;
    this.setData({
      currentTab: id
    })
  },
  // 编辑资料
  upData:function(res){
   wx.navigateTo({
     url: '../up-data/up-data',
     success: function(res) {},
     fail: function(res) {
     },
     complete: function(res) {},
   })
  },
  // 发布视频
    setVideo:function(){
      wx.navigateTo({
       url: '../set-video/set-video',
     })
  },
  // 视频详情页查看
  showVideo:function(ev){
    // 获取到当前被点击的视频的url
    let url = ev.currentTarget.dataset.url; 
    // 页面跳转的时候将url作为参数传到被跳转的页面
    wx.navigateTo({
      url: '../show-video/show-video?url='+url,
    })
  },
  // 切换账号
  loginOut:function(){
  wx.reLaunch({
    url: '/pages/register/register'
  })
  },


   onLoad:function(){

   },
  //  页面显示时触发
   onShow:function(){ 
     //  读取缓存
     let that = this;
     wx.getStorage({
       key: 'userToken',
       success: function (res) {
         console.log(res,'index页面')
         let userId = res.data.userId;
        //  向服务器发送请求获取最新数据
          wx.request({
            url: 'http://127.0.0.1:3000/user/search/'+userId,
            method:"GET",
            success(res){
              let userName = res.data.userName;
              let userImg = res.data.userImg;
              let userSay = res.data.userSay
              let userTag = res.data.userTag
              that.setData({
                userName: userName,
                userImg: userImg,
                userSay: userSay,
                userTag: userTag
              })
            }
          })

          // 获取当前作品
          wx.request({
            url: 'http://127.0.0.1:3000/video/search/'+ userId,
            success(res){
              console.log(res)
              let myVideos = res.data;
              that.setData({
                myVideos: myVideos
              })
            }
          })

        // 获取收藏的作品
        wx.request({
          url: 'http://127.0.0.1:3000/userLikeVideo/search/'+ userId,
          success(res){
            let likeVideos = res.data;
            that.setData({
              likeVideos:likeVideos
            })
          }
        })


       },
     })
   }
})
