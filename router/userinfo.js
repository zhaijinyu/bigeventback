const express = require('express')
const router = express.Router()

//导入路由处理函数模块
const userinfoHandler = require('../router_handler/userinfo')

//导入验证数据合法性的中间件
const expressjoi = require('@escook/express-joi')
//导入验证规则对象
const {update_userinfo_schema,update_password_schema,update_avatar_schema} = require('../schema/user')



router.get('/userinfo',userinfoHandler.getUserInfo)

router.post('/userupdate', expressjoi(update_userinfo_schema), userinfoHandler.updateUserInfo)

router.post('/updatepassword', expressjoi(update_password_schema),userinfoHandler.updatePassword)

router.post('/updateavatar', expressjoi(update_avatar_schema),userinfoHandler.updateAvatar)

module.exports = router