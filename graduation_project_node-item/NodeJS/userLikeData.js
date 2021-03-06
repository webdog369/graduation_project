const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/user-like-data',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

// 建立数据库数据表
const Schema = new mongoose.Schema({
    userId:{ type: String },
    title:{ type: String },
    videoId:{ type: String },
    author:{ type: String },
    authorImg:{ type: String },
    videoImg:{ type: String },
    description:{ type: String },
    url:{ type: String },
    likeNum:{ type: Number },
    commentNum:{ type: Number },
    shareNum:{ type: Number },
    videoKey:{ type: String}
});
const UserLikeData = mongoose.model("UserLikeData",Schema);

// 导出User
module.exports = { UserLikeData };