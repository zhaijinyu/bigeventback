const db = require('../db/index')


exports.getArtCates = (req, res) => {
  const sqlstr = 'select * from ev_article_cate where is_delete=0 order by id asc'
  db.query(sqlstr, (err, result) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      data: result,
      msg:'获取成功'
    })
  })
}

exports.addArtCates = (req, res) => {
  const selectsql = 'select * from ev_article_cate where name=? or alias=?'
  db.query(selectsql, [req.body.name, req.body.alias], (err, result) => {
    if (err) return res.cc(err)
    if (result.length === 2) return res.cc('分类名称和别名被占用')
    if (result.length === 1) {
      if (result[0].name === req.body.name && result[0].alias === req.body.alias) return res.cc('分类名称和别名被占用')
      if (result[0].name === req.body.name) return res.cc('分类名称被占用')
      if (result[0].alias === req.body.alias) return res.cc('分类别名被占用')
    } 
    const addsql = 'insert into ev_article_cate set ?'
    db.query(addsql,{...req.body}, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc('新增失败')
      res.cc('新增成功',0)
    })
    
  })
}

exports.deleteArtCate = (req, res) => {
  const sql = 'update ev_article_cate set is_delete=1 where id=?'
  db.query(sql,req.params.id, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) res.cc('删除失败')
    res.cc('删除成功',0)
  })
}

exports.getArtCateById = (req, res) => {
  const sql = 'select * from ev_article_cate where id=?'
  db.query(sql, req.params.id, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1) return res.cc('获取失败')
    res.send({
      status: 0,
      msg: '获取文章分类成功',
      data:result[0]
    })
  })
}

exports.updateArtCate = (req, res) => {
  const selectsql = 'select * from ev_article_cate where id<>? and (name=? or alias=?)'
  db.query(selectsql, [req.body.id, req.body.name, req.body.alias], (err, result) => {
    if (err) return res.cc(err)
    if (result.length === 2) return res.cc('分类名称和别名被占用')
    if (result.length === 1) {
      if (result[0].name === req.body.name && result[0].alias === req.body.alias) return res.cc('分类名称和别名被占用')
      if (result[0].name === req.body.name) return res.cc('分类名称被占用')
      if (result[0].alias === req.body.alias) return res.cc('分类别名被占用')
    }
    const updatesql = 'update ev_article_cate set ? where id=?'
    db.query(updatesql, [{ ...req.body }, req.body.id], (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc('更新失败')
      res.cc('更新成功',0)
    })
  })
}