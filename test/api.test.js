/*
 * @Author: changcheng
 * @LastEditTime: 2020-02-20 13:45:56
 * @Description: 接口测试
 */
const server = require('./server')

 test('测试string接口返回的数据格式是否正确',async () =>{
    const res = await server.get('/string')
   expect(res.body.title).toEqual('koa2 string')
 })
