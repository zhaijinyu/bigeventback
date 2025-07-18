//导入express
const express = require('express')
// 创建服务器的实例对象
const app = express()
//导入joi
const joi = require('joi')
// 导入express-jwt
const expressJwt = require('express-jwt')
const config = require('./config')

//解决跨域问题
//导入cors中间件
const cors = require('cors')
//挂载全局中间件
app.use(cors())

//配置解析表单数据的中间件，注意：这个中间件只能解析x-www-from-unlencoded格式的表单数据
app.use(express.urlencoded({extended:false}))

//挂载路由之前声明全局中间件处理错误信息
app.use((req, res, next) => {
  //status默认值为1表示失败的情况
  //err的值可能是一个错误对象也可能是一个错误字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      //判断err是否为Error实例对象，如果是返回err.message如果不是返回err
      msg:err instanceof Error ? err.message : err
    })
  }
  
  next()
})

//配置解析token的中间件 **一定要在导入路由之前
app.use(expressJwt.expressjwt({secret:config.jwtSecretKey,algorithms:['HS256']}).unless({path:[/^\/api\//]}))

//导入并使用用户操作路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
//导入用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
//导入文章操作模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)
//导入发布文章模块
const articleRouter = require('./router/article')
app.use('/my/article',articleRouter)

//定义错误级别的中间件
app.use((err, req, res, next) => {
  //验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  //未知错误
  
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  res.cc('未知错误')
})

//启动服务器
app.listen(3007, () => {
  console.log('app sever running at  http://127.0.0.1:3007')
})