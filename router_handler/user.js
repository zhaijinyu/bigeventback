//导入数据库操作模块
const db = require('../db/index')
//导入密码加密模块
const bcrypt = require('bcryptjs')
//导入生成token的包
const jwt = require('jsonwebtoken')
//导入密钥
const config = require('../config')

//注册处理函数
exports.reguser = (req, res) => {
  //获取表单数据
  const userinfo = req.body
  //对表单数据进行合法校验
  // if (!userinfo.username || !userinfo.password) {
  //   // return res.send({status: 1,msg:'用户名或密码不合法'})
  //   return res.cc('用户名或密码不合法')
  // }
  console.log(userinfo)
  

  //定义sql语句查询用户名是否有重复
  const selectsql = 'select * from ev_users where username = ?'
  db.query(selectsql, userinfo.username, (err, result) => {
    //sql语句执行错误
    if (err) {
      // return res.send({status: 1,msg:err.message})
      return res.cc(err)
    }
    //用户名重复
    if (result.length > 0) {
      // return res.send({status: 1,msg:'用户名被占用，请使用其他用户名'})
      return res.cc('用户名被占用，请使用其他用户名')
    }
    //调用bcrypt.hashSync()对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    //插入注册的新用户
    //定义sql语句
    const addsql = 'insert into ev_users set ?'
    db.query(addsql, userinfo, (err, result) => {
      if (err) {
        // return res.send({status: 1,msg:err.message})
        return res.cc(err)
      }
      //判断影响行数是否为1
      if (result.affectedRows !== 1) {
        // return res.send({status: 1,msg:'注册用户失败，请稍后再试'})
        return res.cc('注册用户失败，请稍后再试')
      }
      //注册用户成功
      res.send({status: 0,msg:'注册成功'})
    })
  })
}

//登录处理函数
exports.login = (req, res) => { 
  //接收表单数据
  const userinfo = req.body
  //定义sql语句
  const selectsql = 'select * from ev_users where username=?'
  //执行sql语句
  db.query(selectsql, userinfo.username, (err, result) => {
    //执行失败
    if (err) return res.cc(err)
    //执行成功但是获取数据条数不等于1
    if (result.length !== 1) return res.cc('登陆失败')
    //验证密码是否正确
    //bcrypt.compareSync(客户端提供数据，数据库中数据)用于比较密码是否相同，因数据库中密码存在加密所以不能直接比较
    const comparepass = bcrypt.compareSync(userinfo.password, result[0].password)
    
    
    if (!comparepass) return res.cc('密码错误')
    
    //在服务器端生成token字符串
    const user = { ...result[0],password:' ',user_pic:' ' }
    //对用户信息进行加密生成一个token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    //调用res.send响应给客户端
    res.send({
      status: 0,
      msg: '登陆成功',
      token:'bearer '+tokenStr
    })
  })
}