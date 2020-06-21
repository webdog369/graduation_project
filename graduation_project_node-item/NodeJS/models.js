const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/user',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
// 建立数据库数据表
const Schema = new mongoose.Schema({
    userName:{ type: String },
    password:{ type: String },
    userImg:{ type: String },
    userSex:{ type: Number },
    userSay:{ type: String },
    userTag:{ type: Array }
});

const User = mongoose.model("User",Schema);

// 导出User
module.exports = { User };