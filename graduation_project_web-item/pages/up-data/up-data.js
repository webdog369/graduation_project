// pages/up-data/up-data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subOk:false,
    sex: ['男','女','保密'],
    sexId:0,
    userImg:'',
    userName: '',
    userId:'',
    userTag:'',
    userSay:'',
    errTitle:''
  },
  // 修改头像
  changeUserImg:function(){
    let that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
         that.setData({
           userImg:tempFilePaths
         })
        console.log(tempFilePaths,that.data.userImg)
      }
    })
  },
  // 修改性别
  changeSex:function(res){
   let sexId = res.detail.value;
   this.setData({
     sexId:sexId
   })
  },
  // 提交数据
  submitUserData:function(res){
    let that = this;
    let userData = res.detail.value;
    if(!this.data.userImg){
      userData.userImg = this.data.userImg[0];
    }else{
      userData.userImg = this.data.userImg;
    }
    userData.userId = this.data.userId;
    console.log(userData,'userData')
    wx.request({
      url: 'http://127.0.0.1:3000/user/upData',
      method:"PUT",
      data:userData,
      success(res){
      let user = res.data;
       that.setData({
         userName:user.userName,
         userTag:user.userTag,
         sexId:user.userSex,
         userSay:user.userSay,
         userImg:user.userImg,
         subOK:true
       })
      }
    })
    
    wx.switchTab({
      url: '/pages/index/index',
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
    //  读取缓存
    let that = this;
    wx.getStorage({
      key: 'userToken',
      success: function (res) {
        // console.log(res, '修改信息页面')
        let userId = res.data.userId;
        //  向服务器发送请求获取最新数据
        wx.request({
          url: 'http://127.0.0.1:3000/user/search/' + userId,
          method: "GET",
          success(res) {
            let userImg = res.data.userImg;
            let userName = res.data.userName;
            let userSay = res.data.userSay;
            let userTag = res.data.userTag;
            let userSex = res.data.userSex;
            that.setData({
              userName: userName,
              userImg: userImg,
              userSay: userSay,
              userTag: userTag,
              sexId: userSex,
              userId: userId
            })
          }
        })
      },
    })
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