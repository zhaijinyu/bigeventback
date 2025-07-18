//导入验证规则的包
const joi = require('joi')


//定义用户名和密码的验证规则
//1-10位数字字母组合 必填项
const username = joi.string().alphanum().min(1).max(10).required()
//不能有空白字符 6-12位 必填项
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//定义验证登录和注册验证表单数据的规则对象
exports.reg_login_schema = {
  body: {
    username,
    password
  }
}

//定义更新用户信息模块数据验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()


exports.update_userinfo_schema = {
  //需要对body里面的数据进行验证
  body: {
    id,
    nickname,
    email
  }
}

//更新密码验证规则
exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd:joi.not(joi.ref('oldPwd')).concat(password)
  }
}

//定义头像的验证规则
const avatar = joi.string().base64().required()


exports.update_avatar_schema = {
  body: {
    avatar
  }
}