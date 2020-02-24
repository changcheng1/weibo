const Sequelize = require('sequelize')
const {MYSQL_CONF} = require('../conf/db')
const { host,user,password,database} = MYSQL_CONF
const {isProd,isTest} = require('../utils/env')
const conf = {
    host,
    dialect:'mysql'
}
// 如果是测试环境不打印日志
if(isTest){
    conf.logging = ()=>{}
}
//线上环境的连接池
if(isProd){
    conf.pool = {
        max:5,  //连接池中的最大连接数
        min:0,  //最小
        idle:10000  //如果一个连接池10s内没有使用，则释放
    }
}
const req = new Sequelize(database,user,password,conf)

module.exports = req