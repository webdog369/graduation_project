const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/video-data',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

// 建立数据库数据表
const Schema = new mongoose.Schema({
    title:{ type: String },
    videoId:{ type: String },
    author:{ type: String },
    authorImg:{ type: String },
    videoImg:{ type: String },
    description:{ type: String },
    url:{ type: String },
    likeNum:{ type: Number },
    commentNum:{ type: Number },
    shareNum:{ type: Number }
});

const VideoData = mongoose.model("VideoData",Schema);

// 导出User
module.exports = { VideoData };