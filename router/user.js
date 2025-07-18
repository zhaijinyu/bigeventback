const express = require('express')
//创建路由对象
const router = express.Router()
//导入处理函数模块
const userHandler = require('../router_handler/user')


//导入验证数据的中间件
const expressjoi = require('@escook/express-joi')
//导入需要的验证规则对象
const {reg_login_schema} = require('../schema/user')

//注册新用户
router.post('/reguser', expressjoi(reg_login_schema), userHandler.reguser)

//登录
router.post('/login', expressjoi(reg_login_schema), userHandler.login)



module.exports = router