/*
 * @Author: changcheng
 * @LastEditTime: 2020-02-22 15:24:49
 * @Description: 
 */
const {User} = require('../db/model/User')
async  function isExist(username){
    const result = await User.findOne({
        where: {
          userName: username
        }
      })
}

module.exports = {
    isExist
}

 