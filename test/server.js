/*
 * @Author: changcheng
 * @LastEditTime: 2020-02-20 13:41:42
 * @Description: jset server
 */
const server = require('../src/app').callback()
const request = require('supertest')

module.exports = request(server)