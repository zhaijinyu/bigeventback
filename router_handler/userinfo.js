//导入数据库操作模块
const db = require('../db/index')
//导入密码加密解密模块
const bcrypt = require('bcryptjs')



//获取用户基本信息的函数
exports.getUserInfo = function (req, res) {
  //定义sql语句
  const selectsql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
  //执行
  db.query(selectsql, req.auth.id, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1) return res.cc('获取用户信息失败')
    res.send({
      status: 0,
      msg: '获取用户信息成功',
      data:result[0]
    })
  })
}

//更新用户基本信息的函数
exports.updateUserInfo = function (req, res) {
  //定义sql语句
  const updatesql = 'update ev_users set ? where id=?'
  db.query(updatesql, [{...req.body},req.auth.id], (err, result) => {
    
    if (err) return res.cc(err)
    
    if (result.affectedRows !== 1) return res.cc('更新用户信息失败')
    res.cc('更新用户信息成功',0)
  })
}

//修改用户密码的函数
exports.updatePassword = function (req, res) {
  //查询用户信息
  const selectsql = 'select * from ev_users where id=?'
  db.query(selectsql, req.auth.id, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1) return res.cc('用户信息不存在')
  
  
  // 判断用户输入的旧密码是否正确
  const comparepwd = bcrypt.compareSync(req.body.oldPwd, result[0].password)
  
  
  if (!comparepwd) return res.cc('旧密码错误')
  // 更新数据库中密码
  const updatesql = 'update ev_users set password=? where id=?'
  //对新密码进行加密
  const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
  
    db.query(updatesql, [newPwd,req.auth.id], (err, result) => {
    if (err) return res.cc(err)
    if(result.affectedRows !== 1) return res.cc('更新密码失败')
    res.cc('更新密码成功', 0)
    }) 
  })
}

//修改用户头像的函数
exports.updateAvatar = function (req, res) {
  const sqlstr = 'update ev_users set user_pic=? where id=?'
  db.query(sqlstr, [req.body.avatar, req.auth.id], (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc('更换失败')
    res.cc('更换成功',0)
  })
}