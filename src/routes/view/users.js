/*
 * @Author: changcheng
 * @LastEditTime: 2020-02-21 11:48:43
 * @Description: 
 */
const router = require('koa-router')()

// 登录页面
router.get('/login', async (ctx, next)=> {
    await ctx.render('login',{})
})

// 注册页面
router.get('/register', async (ctx, next)=> {
    await ctx.render('register',{})
})
module.exports = router
