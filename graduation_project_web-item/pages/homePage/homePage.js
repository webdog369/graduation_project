import { getDataFn} from 'getDataFn.js';
import { formatTime } from '../../utils/util.js';

Page({
  data: {
    videos:null,
    currentPage:'',
    preVideo:'',
    play:false,
    commentShow:false,
    commentPage:null,
    inputValue:'',
    likeCommentFlag:false,
    userName:'',
    userImg:'',
    userId:'',
    videoId:'',
    likeFlag:false,
    titles:'',
    comments:'',
    currentComment:'',
    commentLikeList:''
  },

  // 页面改变时监听事件
  videoChange:function(event){
    let currentIndex = event.detail.current;
    this.setData({
      currentPage:currentIndex
    })
  },
  // 翻页自动播放视频
  autoPlayVideo:function(res){
    let currentPage = res.detail.current;
    let that = this;
    // console.log(res.detail.currentItemId)
    let index = res.detail.currentItemId;
    index.toString();
    this.setData({
      preVideo:index,
      currentPage: currentPage
    })
    this.videoContext = wx.createVideoContext(index);
    // 指定视频跳转位置
    this.videoContext.seek(0)
    this.videoContext.play()

    // 翻页自动获取评论 
    wx.request({
      url: 'http://127.0.0.1:3000/comment/search/' + index,
      success(res){
        // console.log(res,'我才是最新最新的数据')
       let comments = res.data;
        if(comments.length == 0){
         that.setData({
           comments:''
         })
        }else{
          for (let i = 0; i < comments.length; i++) {
            let userId = comments[i].userId;
            // console.log(userId, '我是用户id')
            wx.request({
              url: 'http://127.0.0.1:3000/user/search/' + userId,
              success(res) {
                // console.log(res, '我是用户数据')
                let userName = res.data.userName;
                let userImg = res.data.userImg;
                comments[i].userName = userName;
                comments[i].userImg = userImg;
                that.setData({
                  comments: comments
                })
              }
            })
          }
        }
        // console.log(that.data.comments, '看我看我')
      }
    })
  },
  // 被翻页后自动暂视频
  autoPauseVideo:function(res){
    let currentVideo = res.currentTarget.id;
    let preVideo = this.data.preVideo;
    currentVideo.toString();
    if (preVideo != currentVideo ){
      this.videoContext = wx.createVideoContext(currentVideo);
      this.videoContext.pause();
    }
    // console.log(currentVideo)
  },
  // 单击 播放/暂停 视频
  playVideo:function(res){
    let currentVideo = res.currentTarget.id;
    currentVideo.toString();
    this.videoContext = wx.createVideoContext(currentVideo)
    if (this.data.play) {
      //开始播放
      this.videoContext.play()//开始播放
      this.setData({
        play: false
      })
    } else {
      this.videoContext.pause()//暂停播放
      this.setData({
        play: true
      })
    }
  },
  // 视频点赞的方法
  likeIt:function(ev){
    // console.log(ev,'被点击的小红❤')
    // let currentLikeId = ev.currentTarget.dataset.id;
    // let currentItemId = this.data.preVideo;
    let videoKey = ev.currentTarget.dataset.key;
    let taht = this;
    let i = this.data.currentPage;
    let videos = this.data.videos;
    // console.log(videos,'wowowowo')
    let currentVideo = videos[i];
    let id = currentVideo._id;
    let userId = this.data.userId;
    currentVideo.userId = userId; 
    currentVideo.videoKey = videoKey; 

    // console.log(this.data.userId,'点赞的userid')
      // 修改视频点赞数
    if (!this.data.titles[i].flag) {
      this.data.titles[i].flag = true;
      let newTitles = taht.data.titles;
        currentVideo.likeNum += 1;
        wx.request({
          url: 'http://127.0.0.1:3000/video/like/' + id,
          method: "PUT",
          data: currentVideo,
          success(res) {
            taht.setData({
              titles: newTitles
            })
            // 保存用户点赞缓存
            let userName = taht.data.userName;
            wx.setStorage({
              key: userName +'LikeVideos',
              data: newTitles
            })
          }
        })
        // 发送收藏方法请求
        wx.request({
          url: 'http://127.0.0.1:3000/user/like/video',
          method: "POST",
          data: currentVideo,
          success(res) {
            console.log(res)
          }
        })

      } else {
      this.data.titles[i].flag = false;
      let newTitles = taht.data.titles;
        currentVideo.likeNum -= 1;
        wx.request({
          url: 'http://127.0.0.1:3000/video/like/' + id,
          method: "PUT",
          data: currentVideo,
          success(res) {
            taht.setData({
              titles: newTitles
            })
            // 保存用户点赞缓存
            let userName = taht.data.userName;
            wx.setStorage({
              key: userName + 'LikeVideos',
              data: newTitles
            })
          }
        })
  
      // 取消收藏
      wx.request({
        url: 'http://127.0.0.1:3000/userLikeVideo/delete/'+userId+'/'+videoKey,
        method:"DELETE",
        success(res){
          console.log(res)
        }
      })

      }
  },
  // 打开评论页面
  openComment:function(ev){
    let that = this;
    let videoId = ev.currentTarget.dataset.id;
    that.setData({
      commentShow: true,
      commentPage: videoId
    })

    // 评论点赞列表
    let comments = this.data.comments;
    let commentLikeList = []
    for (let i = 0; i < comments.length; i++) {
      let obj = {
        likeNum: comments[i].likeNum,
        flag: false
      }
      commentLikeList.push(obj);
    }
    this.setData({
      commentLikeList: commentLikeList
    })
  },
  // 关闭评论页面
  closeComment:function(){
    this.setData({
      commentShow: false
    })
  },
  // 表单内容监控
  claerValue: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
  },

  // 评论方法
  sayComment:function(event){   
    let that = this;
    let id = event.currentTarget.dataset.id;
    let comment = event.detail.value.commontValue;
    let videoId = this.data.commentPage;
    let userId = this.data.userId;
    let time = formatTime(new Date());
    if (comment !== ''){
      let obj = {
        videoId:videoId,
        userId:userId,
        comment:comment,
        time:time,
        likeNum: 0,
      }
      // this.data.comments.unshift(obj);
      this.setData({
        inputValue:''
      })
      // 把评论数据发送到服务器
      wx.request({
        url: 'http://127.0.0.1:3000/comment/set',
        method:"POST",
        data: obj,
        success(res){
          let videoId = res.data.videoId;
          wx.request({
            url: 'http://127.0.0.1:3000/comment/search/' + videoId ,
            success(res) {
              let comments = res.data;
              for (let i = 0; i < comments.length; i++) {
                let userId = comments[i].userId;
                // console.log(userId, '我是用户id')
                wx.request({
                  url: 'http://127.0.0.1:3000/user/search/' + userId,
                  success(res) {
                    // console.log(res, '我是用户数据')
                    let userName = res.data.userName;
                    let userImg = res.data.userImg;
                    comments[i].userName = userName;
                    comments[i].userImg = userImg;
                    that.setData({
                      comments: comments
                    })
                  }
                })
              }
            }
          })
        }
      })
    }
  },

  // 评论点赞的方法
  likeComment:function(ev){
     console.log(ev)
    let commentLikeList = this.data.commentLikeList;
    let i = ev.currentTarget.dataset.index;
    let id = ev.currentTarget.dataset.id;
    commentLikeList[i].flag = !commentLikeList[i].flag;
    this.setData({
      currentComment:id,
      commentLikeList: commentLikeList
    })
      let data = {
        videoId: ev.currentTarget.dataset.videoid,
        userId: ev.currentTarget.dataset.userid,
        comment: ev.currentTarget.dataset.comment,
        time: ev.currentTarget.dataset.time,
        likeNum: ev.currentTarget.dataset.likenum + 1
      }
      // 根据id向服务器发送点赞数据
      wx.request({
        url: 'http://127.0.0.1:3000/likeComment/' + id,
        method: "PUT",
        data: data,
        success(res) {}
      })
  },

  // 页面加载完毕后执行的函数

  onLoad: function () {

  },

  // 页面加载完毕后执行(只执行一次)

  onReady:function(){
    console.log('ON READY')
    console.log(this.data.videos)
    let that = this;
    let videos = that.data.videos;
    if(videos){
      // 存一个点赞的数据
      let titles = [];
      for (let i = 0; i < videos.length; i++) {
        let title = {
          title: videos[i]._id,
          likeNum: videos[i].likeNum,
          flag: false
        }
        titles.push(title)
      }
      // 此处解决了在没有视频的情况下发布第一个视频后无法点赞的bug
      if (videos.length == 0) {
        let title = {
          title: 'no.1',
          likeNum: 0,
          flag: false
        }
        titles.push(title)
      }
      // 把缓存存入data里
      that.setData({
        titles: titles
      })
    }
    
    // 获取用户登录数据
      wx.getStorage({
        key: 'userToken',
        success: function (res) {
          // console.log(res, 'homepage')
          let userId = res.data.userId;
          // let videoId = res.data._id;
          //  向服务器发送请求获取最新数据
          wx.request({
            url: 'http://127.0.0.1:3000/user/search/' + userId,
            method: "GET",
            success(res) {
              // console.log(res, '用户最新数据')
              let userName = res.data.userName;
              let userImg = res.data.userImg;
              that.setData({
                userName: userName,
                userImg: userImg,
                userId: userId
              })
            }
          })
        },
      })

  },



  // 页面被打开时触发(多次执行)

  onShow:function(){
    let that = this ;
    console.log('ON SHOW')
    console.log(this.data.videos)
    // 获取服务端的视频数据
    getDataFn.getVideos({
      success: function (videos) {
        // 获取用户最新头像
        for(let i = 0; i < videos.length; i++){
         let userId = videos[i].videoId;
          wx.request({
            url: 'http://127.0.0.1:3000/user/search/' + userId,
            success(res) {
              // console.log(res, '我是用户数据')
              let author = res.data.userName;
              let authorImg = res.data.userImg;
              videos[i].author = author;
              videos[i].authorImg = authorImg;
              that.setData({
                videos: videos
              })
            }
          })
        }
    //  console.log(videos,'最新的视频条数')
    //  获取点赞缓存
    let userName = that.data.userName;
     wx.getStorage({
       key: userName +'LikeVideos',
       success: function(res) {
         console.log(res,'我是点赞缓存')
        /* 此处是获取最新的视频数据,若新增num个视频 则会在titles前面新增num个元素*/  
         let num = videos.length - res.data.length;
         if(videos.length > res.data.length){
          for(let i = 0; i < num ; i++){
            res.data.unshift({
              title: videos[0]._id,
              likeNum: videos[0].likeNum,
              flag: false
            })
            that.setData({
              titles: res.data
            })
          }
         }else{
           that.setData({
             titles: res.data
           })
         }
         console.log(res.data,'读取到的缓存时的视频条数')
       },fail(){
        /* 获取失败的原因可能是个新账号 找不到对应的缓存 所以在此直接建立一个模拟数据
         否则会导致flag为undefined 从而无法完成点赞收藏事件
        */
         let num = videos.length;
         let titles = [];
         for (let i = 0; i < num; i++) {
           let title = {
             title: videos[i]._id,
             likeNum: videos[i].likeNum,
             flag: false
           }
           titles.push(title)
           that.setData({
             titles: titles
           })
         }
       }
      })
      }
    })
  }
})