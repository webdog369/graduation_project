// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    password:'',
    errTitle:'',
    isRegister:false,
    isLogin:true,
    msg:'重新输入'
  },
  userNameValue:function(e){
    let userName = e.detail.value.replace(/\s+/g, "");
    this.setData({
      userName:userName
    })
  },
  passwordValue: function (e) {
    let password = e.detail.value.replace(/\s+/g, "");
    this.setData({
      password: password
    })
  },
  // 注册页面
  submitData:function(res){
    let userData = res.detail.value;
    let that = this;
    wx.request({
      url: 'http://localhost:3000/user/reg',
      method:"POST",
      data:userData,
      success(res){
        if(res.statusCode === 402){
          that.setData({
            userName: '',
            password: '',
            errTitle:'用户名已被注册，请重新输入!'
          })
        }else{
          that.setData({
            userName: '',
            password: '',
            errTitle: '注册成功!欢迎你'+userData.userName,
            msg:'去登录',
            isRegister: false,
            isLogin:true
          })
        }
      }
    })
  },
  // 登录页面
  submitDataLogin:function(res){
    let userData = res.detail.value;
    let that = this;
       // 发送登录验证请求
        wx.request({
          url: 'http://localhost:3000/user/login',
          method: "POST",
          data: userData,
          success(res) {
            if (res.statusCode === 200) {
              let user = res.data.user;
              console.log(res)
              let userDatas = {
                userName: user.userName,
                userImg: user.userImg,
                userId: user._id,
                userSay: user.userSay,
                userTag: user.userTag,
                userSex: user.userSex
              }
              // 利用缓存保存用户数据
              wx.setStorage({
                key:'userToken',
                data:userDatas,
              })
              wx.switchTab({
                url: '/pages/homePage/homePage',
              })
            } else if (res.statusCode === 402) {
              that.setData({
                userName: '',
                password: '',
                errTitle: '用户名不存在，请重新输入!'
              })
            } else {
              that.setData({
                password: '',
                errTitle: '密码输入错误，请重新输入!'
              })
            }
          }
        })
  },
  // 没账号,去注册
  goReg:function(){
    this.setData({
      isRegister: true,
      isLogin:false,
      userName:'',
      password:''
    })
  },
  // 有账号,去登录
  goLogin:function(){
    this.setData({
      isRegister: false,
      isLogin:true,
      userName: '',
      password: ''
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