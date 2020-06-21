const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser= require('body-parser');
const {User} = require('./models');
const {VideoData} = require('./videoData');
const { UserLikeData } =require('./userLikeData');
const { Comments } =require('./comment');


// 创建express实例
const app = express();

// 使用跨域请求中间件
app.use(cors());


//设置静态资源目录
app.use('/data/videos',express.static("data/videos"));
app.use('/data',express.static("data"));
app.use('/data/user',express.static("data/userData"));

// 使用body-Parser中间件 允许处理json数据
app.use(bodyParser.json());

// 注册接口
app.post('/user/reg',async (req,res)=>{
    const SearchUser = await User.findOne({userName:req.body.userName});
    if (SearchUser) return res.status(402).send({err:'用户名已被注册'});
    const user = await User.create({
       userName:req.body.userName,
       password:req.body.password,
       userImg:'/images/userImg.png'
      });
        res.send({msg:'注册成功!', data:user});
});

// 登录接口
app.post('/user/login',async (req,res)=>{
    const user = await User.findOne({userName:req.body.userName});
    if (!user){
        return res.status(402).send({err:'用户名不存在'})
    } else{
        let userPassword = user.password;
       if (userPassword !== req.body.password){
           return res.status(403).send({err:'密码输入错误'});
       }
    }
    res.send({user, token:'login-ok'});
});

// 用户查询接口
app.get('/user/search/all',async (req,res)=>{
   const user = await User.find();
   res.send(user)
});

// 查询个人数据接口
app.get('/user/search/:id',async (req,res)=>{
    const user = await User.findById(req.params.id);
    res.send(user)
});

// 修改个人数据接口
app.put('/user/upData',async (req,res)=>{
    const newUserData = req.body;
    const userId = newUserData.userId;
    const oldUser = await User.findById(userId);
    oldUser.userName = newUserData.userName;
    oldUser.userSex = newUserData.userSex;
    oldUser.userTag = newUserData.userTag.split(",");
    oldUser.userImg = newUserData.userImg;
    oldUser.userSay = newUserData.userSay;
    await oldUser.save();
    res.send(oldUser)
});

// 视频上传接口
app.post('/user/setVideo',async (req,res)=>{
    // console.log(req.body);
    const videoData = await VideoData.create({
        title:req.body.title,
        videoId:req.body.videoId,
        author:req.body.author,
        authorImg:req.body.authorImg,
        description:req.body.description,
        url:req.body.url,
        videoImg:req.body.videoImg,
        likeNum:req.body.likeNum,
        commentNum:req.body.commentNum,
        shareNum:req.body.shareNum
    });
    res.send(videoData)
});

// 查找所有视频接口
app.get('/video/search/all',async (req,res)=>{
    // 查找所有视频并倒序排序
    const videoData = await VideoData.find().sort({_id: -1 });
    res.send(videoData)
});

// 查找个人作品接口
app.get('/video/search/:id',async (req,res)=>{
    const videos = await VideoData.find().where({
        videoId:req.params.id
    }).sort({_id: -1 });
    res.send(videos)
});

// 视频点赞接口
app.put('/video/like/:id',async (req,res)=>{
    const video = await VideoData.findById(req.params.id);
    video.title = req.body.title;
    video.id = req.body.videoId;
    video.author = req.body.author;
    video.authorImg = req.body.authorImg;
    video.description = req.body.description;
    video.url = req.body.url;
    video.videoImg = req.body.videoImg;
    video.likeNum = req.body.likeNum;
    video.commentNum = req.body.commentNum;
    video.shareNum = req.body.shareNum;
    await video.save();
    res.send(video)
});

// 删除所有视频接口
app.delete('/video/delete/all', async (req,res)=>{
    const videoData = await VideoData.remove();
    res.send('delete OK')
});

// 视频收藏接口
app.post('/user/like/video',async (req,res)=>{
    // 防止重复收藏判定
    const videoKey = req.body.videoKey;
    const userId = req.body.userId;
    let flag = await UserLikeData.findOne({
        videoKey:videoKey,
        userId:userId
    });
    if (!flag){
        const userLikeVideo = await UserLikeData.create({
            userId:req.body.userId,
            title:req.body.title,
            videoId:req.body.videoId,
            author:req.body.author,
            authorImg:req.body.authorImg,
            description:req.body.description,
            url:req.body.url,
            videoImg:req.body.videoImg,
            likeNum:req.body.likeNum,
            commentNum:req.body.commentNum,
            shareNum:req.body.shareNum,
            videoKey:req.body.videoKey
        });
        res.send(userLikeVideo);
        return ;
    }
    res.status(511).send("该视频已被收藏")
});

// 取消收藏视频接口
app.delete('/userLikeVideo/delete/:userId/:key',async (req,res)=>{
   const userId = req.params.userId;
   const videoKey = req.params.key;
   const removeLikeVideo = await UserLikeData.findOne({
       userId:userId,
       videoKey:videoKey
   });
    // console.log(removeLikeVideo);
    if(removeLikeVideo){
       removeLikeVideo.remove();
       res.send('取消收藏成功')
   }else {
       res.send('取消收藏失败')
   }
});

// 所有收藏视频查询接口
app.get('/userLikeVideo/search/all',async (req,res)=>{
    const userLikeData = await UserLikeData.find();
    res.send(userLikeData);
});

// 删除所有收藏视频接口
app.delete('/userLikeVideo/delete/all', async (req,res)=>{
    const userLikeData = await UserLikeData.remove();
    res.send('delete OK')
});

// 单个用户收藏视频查询接口
app.get('/userLikeVideo/search/:id',async (req,res)=>{
   let userId = req.params.id;
   const uerLikeVideo = await UserLikeData.find().where({
       userId:userId
   }).sort({_id:-1});
    res.send(uerLikeVideo)
});

// 发送评论接口
app.post('/comment/set',async (req,res)=>{
 const comment = await Comments.create({
     videoId:req.body.videoId,
     userId:req.body.userId,
     comment:req.body.comment,
     time:req.body.time,
     likeNum:0,
 });
    res.send(comment);
});

// 查询所有评论接口
app.get('/comment/search/all',async (req,res)=>{
    const allComments = await Comments.find();
    res.send(allComments)
});

// 单条视频评论查询接口
app.get('/comment/search/:id',async (req,res)=>{
   const comments = await Comments.find().where({
       videoId:req.params.id
   }).sort({_id:-1});
    res.send(comments)
});

// 单条视频单条评论点赞接口
app.put('/likeComment/:id',async (req,res)=>{
   const id = req.params.id;
   const currentComment = await Comments.findById(id);
    currentComment.videoId = req.body.videoId;
    currentComment.userId = req.body.userId;
    currentComment.comment = req.body.comment;
    currentComment.time = req.body.time;
    currentComment.likeNum = req.body.likeNum;
    currentComment.save();
    res.send(currentComment)

});

// 删除所有评论接口
app.delete('/comment/delete/all',async (req,res)=>{
   const allComments = await Comments.remove();
   res.send('delete ok')
});

// 指定服务器监听端口
app.listen(3000,()=>{
    console.log('服务器http://localhost:3000已启动!');
});