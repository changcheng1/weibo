const router = require('koa-router')()
router.get('/', async (ctx, next) => {
    ctx.cookies.set(
        'username','zyb'
    )
    next()
    ctx.body = 'cookie is ok'
})

router.get('/string', async (ctx, next) => {
    ctx.body = {
        title:'koa2 string'
    }
})

router.get('/json', async (ctx, next) => {
    const session = ctx.session
    if(session == null){
        session.num = 0
    }
    session.num ++
    ctx.body = {
        num:session.num
    }
})
module.exports = router
