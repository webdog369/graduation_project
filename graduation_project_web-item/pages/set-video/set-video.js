// pages/set-video/set-video.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoPath: '',
    videoImgPath: '',
    title:'',
    description:'',
    tag:'',
    subFlag:false,
    errTitle:''
  },
  // 添加视频
  addVideo:function(){
    let that = this;
   wx.chooseVideo({
     sourceType: ['album', 'camera'],
     success(res){
       const videoPath = res.tempFilePath;
       const videoImgPath = res.thumbTempFilePath;
       console.log(videoPath)
       console.log(res.thumbTempFilePath)
       that.setData({
         videoPath: videoPath,
         videoImgPath: videoImgPath
       })
     } 
   })
  },
  // 发布视频
  submitData:function(res){ 
    let that = this;
    let videoTitle = res.detail.value.title;
    let videoDescription = res.detail.value.description;
    let videoTag = res.detail.value.tag;
    let videoPath = that.data.videoPath;
    let subFlag = this.data.subFlag;
    if(subFlag){
      //  读取用户数据缓存
      wx.getStorage({
        key: 'userToken',
        success: function (res) {
          console.log(res, '我是用户登录缓存')
          let userName = res.data.userName;
          let userId = res.data.userId;
          let userImg = res.data.userImg;
          let videoData = {
            title: videoTitle,
            videoId: userId,
            author: userName,
            authorImg: userImg,
            description: videoDescription,
            url: that.data.videoPath,
            videoImg: that.data.videoImgPath,
            likeNum: 0,
            commentNum: 0,
            shareNum: 0,
          }
          // 发送请求
          wx.request({
            url: 'http://127.0.0.1:3000/user/setVideo',
            method: "POST",
            data: videoData,
            success(res) {
              wx.switchTab({
                url: '/pages/index/index'
              })
              console.log(res)
            }
          })
        }
      }) 
    }
   // 错误弹窗部分 
    if (!videoPath) {
      this.setData({
        errTitle: '请添加视频!'
      })
    }
    if (!videoTitle) {
      this.setData({
        errTitle: '请添加视频标题!'
      })
    }
  },
  // 视频标题输入监测
  titleValue:function(e){
    let title = e.detail.value
    this.setData({
      title: title
    })
    let videoPath = this.data.videoPath;
    if (title && videoPath) {
      this.setData({
        subFlag: true
      })
    }else{
      this.setData({
        subFlag:false
      })
    }
  },
  // 视频描述输入监测
  descriptionValue: function (e) {
    let description = e.detail.value
    this.setData({
      description: description
    })
  },
  // 视频标签输入监测
  tagValue: function (e) {
    let tag = e.detail.value
    this.setData({
      tag: tag
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})