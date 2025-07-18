const db = require('../db/index')

exports.getArtList = (req, res) => {
  const sqlstr = 'select * from ev_articles where is_delete=0 order by id asc'
  db.query(sqlstr, (err, result) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      data: result,
      msg: '获取成功'
    })
  })
}

exports.addArticle = (req, res) => {
  const sql = 'insert into ev_article set ?'
  db.query(sql, { ...req.body }, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc('发布失败')
    res.cc('发布成功',0)
  })
}

exports.deleteArticle = (req, res) => {
  const sql = 'update ev_articles set is_delete=1 where id=?'
  db.query(sql, req.params.id, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) res.cc('删除失败')
    res.cc('删除成功', 0)
  })
}
