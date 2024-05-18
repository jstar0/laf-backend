const mongoose = require('mongoose');

// 连接mongodb数据库
mongoose.connect("mongodb://127.0.0.1:27017/loseMg")
.then(() => {
    console.log("数据库连接成功!")
})
.catch((err) => {
    console.log("数据库连接失败!", err);
})

// 丢失物品表
const LoseSchema = new mongoose.Schema({
    openid: {           // 用户ID
        type: String
    },
    type: {             // 物品类型
        type: Number,
    },
    classify1: {        // 物品一级分类
        type: String
    },
    classify2: {        // 物品二级分类
        type: String
    },
    name: {             // 物品名称
        type: String
    },
    date: {             // 丢失/拾取时间
        type: String
    },
    region: {           // 丢失/拾取地点
        type: String
    },
    phone: {            // 联系方式
        type: String
    },
    desc: {             // 描述
        type: String,
        default: ''
    },
    imgList: {          // 相关照片
        type: Array,
        default: []
    },
    time: {             // 发布时间
        type: Number
    },
    commentList: {      // 评论列表
        type: Array,
        default: []
    },
    claimInfo: {        // 认领信息
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    state: {            // 认领状态, 0未认领, 1认领中, 2已认领
        type: Number,
        default: 0
    }
})

// 收藏物品
const CollectionSchema = new mongoose.Schema({
    openid: {           // 谁收藏的
        type: String
    },
    id: {               // 收藏的什么, 对应Lose表的_id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lose'
    }
})

// 用户账号
const UserSchema = new mongoose.Schema({
    openid: {           // 用户ID
        type: String
    },
    username: {         // 用户名
        type: String
    },
    password: {         // 密码
        type: String
    },
    date: {             // 注册时间
        type: Number
    } 
})


// 管理员账号
const AdminSchema = new mongoose.Schema({
    username: {         // 用户名
        type: String
    },
    password: {         // 密码
        type: String
    },
    create_time: {      // 账号创建时间
        type: Number
    },
    role: {             // 角色, 0 超级管理员 1 管理员
        type: Number
    },
    nickname: {         // 昵称
        type: String
    }
})

const Lose = mongoose.model("Lose", LoseSchema);
const Collection = mongoose.model("Collection", CollectionSchema);
const User = mongoose.model("User", UserSchema);
const Admin = mongoose.model("Admin", AdminSchema);

// for (let i = 0; i < 10; i++) {
//     Lose.create({
//         openid: 'o1rUR5dHCRwTftgzmc6sh4hE8bwM',
//         type: 0,
//         classify1: '卡片、证件类',
//         classify2: '身份证',
//         name: '1',
//         date: '2',
//         region: '3',
//         phone: '4',
//         desc: '5',
//         imgList: [ "http://localhost:3001/file/b4109e31-00e7-44e9-af83-e7eaeb56f50d.png" ],
//         time: 1669212404681
//     })
// }

module.exports = {
    Lose,
    Collection,
    User,
    Admin,
}