/*
 * @Author: changcheng
 * @LastEditTime : 2020-01-03 16:16:26
 * @Description: 同步数据库
 */
const seq = require('./seq')
// require('./model')

// 测试连接
seq.authenticate().then(() => {
    console.lo9g('auth ok')
}).catch(() => {
    console.log('auto err')
})
// 执行同步 force:true 清空表重新建表
seq.sync({
    force: true
}).then(() => {
    console.log('sync ok')
    process.exit()
})