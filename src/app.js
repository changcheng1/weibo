const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const redisStore = require('koa-redis')
const logger = require('koa-logger')
const {isProd} = require('./utils/env')
const {REDIS_CONF} = require('./conf/db')
const index = require('./routes/index')
const users = require('./routes/users')
const jwtKoa = require('koa-jwt')
const {SECRET} = require('../conf/index')
const session = require('koa-generic-session')
const errorViewRouters = require('./routes/view/error')

// error handler
let onerrorCong = {}
if(isProd){
    onerrorCong = {
        redirect:'/error'
    }
}
app.keys = ['keys123_091_+Uio0']
// session 配置
app.use(session({
    key:'sessionId',  //cookie name
    prefix:'weibo:sess:',  //redis key的前缀
    cookie:{
        path:'/',
        httpOnly:true,   // 不允许客户端修改cookie
        maxAge:24 * 60 * 60 * 1000   // 设置cookie过期时间
    },
    ttl:24 * 60 * 60 * 1000 ,  // session过期时间(可以不写)
    store:redisStore({
        all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))
onerror(app,onerrorCong)
// app.use(jwtKoa({
//     secret:SECRET
// }).unless({
//     path: [/^\/users\/login/]
// }))
// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouters.routes(), errorViewRouters.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
