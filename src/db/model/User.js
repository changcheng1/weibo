/*
 * @Author: changcheng
 * @LastEditTime: 2020-02-24 09:58:50
 * @Description: 用户数据模型
 */

const seq = require('../seq')
const {STRING,DECIMAL} = require('../types')
// users 模型数据表
const User = seq.define('User',{
    userName:{
        type:STRING,
        allowNull:false,
        // 唯一性
        unique:true,
        comment:'用户名,唯一'
    },
    passWord:{
        type:STRING,
        allowNull:false,
        comment:'密码'
    },
    nickName:{
        type:STRING,
        allowNull:false,
        comment:'昵称'
    },
    gender:{
        type:DECIMAL,
        allowNull:false,
        defaultValue:3,
        comment:'性别(1.男性2.女性3.保密)'
    },
    picture:{
        type:STRING,
        comment:'图片存的是地址'
    },
    city:{
        type:STRING,
        comment:'城市'
    }
})
module.exports = {
    User
}
