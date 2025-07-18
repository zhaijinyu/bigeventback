//导入验证规则的包
const joi = require('joi')

//定义文章分类别名和名字的验证规则

const name = joi.string().required()
const alias = joi.string().alphanum().required()

exports.art_cate_schema = {
  body: {
    name,
    alias
  }
}

//id验证规则

const id = joi.number().integer().min(1).required()

exports.delete_cate_schema = {
  params: {
    id
  }
}

//验证表单数据
exports.update_cate_schema = {
  body: {
    id,
    name,
    alias
  }
}