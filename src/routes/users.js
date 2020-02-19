const router = require('koa-router')()
const {SECRET} = require('../../conf/index')
const util = require('util')
const jwt = require('jsonwebtoken')
const verify = util.promisify(jwt.verify)

router.prefix('/users')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
    
})
router.post('/login', async (ctx, next)=> {
    const { username, password } = ctx.request.body
    console.log('ctx',ctx)
  
    let userInfo
    if(username === 'zhangsan' && password === 'abc'){
        userInfo = {
            username:'zhangsan',
            nickName:'张三',
            password:'123'
        }
    }
    let token
    if(userInfo){
        token = jwt.sign(userInfo,SECRET,{expiresIn:'1h'})
    }
    if(userInfo == null){
        ctx.body = {
            errCode:-1,
            msg:'登录失败'
        }
    }else{
        ctx.body = {
            errCode:0,
            data:token
        }
    }
})

// 获取用户信息
router.get('/getUserInfo', async (ctx, next)=> {
    const token = ctx.header.authorization
    try{
        const payload = await verify(token.split(' ')[1],SECRET)
        ctx.body = {
            errno:0,
            userInfo:payload
        }
    }catch(err){
        console.log('err',err)
        ctx.body = {
            errno:1,
            masg : 'verify token failed'
        }
    }
})

module.exports = router
