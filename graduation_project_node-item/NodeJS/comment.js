const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/comments',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

// 建立数据库数据表
const Schema = new mongoose.Schema({
    videoId:{ type: String },
    userId:{ type: String },
    comment:{type: String },
    time:{type: String },
    likeNum:{ type: Number },
});
const Comments = mongoose.model("Comments",Schema);

// 导出User
module.exports = { Comments };