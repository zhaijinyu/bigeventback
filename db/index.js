//导入mysql数据库模块
const mysql = require('mysql')


const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password:'z20041215',
  database:'my_db_01'
})


module.exports = db