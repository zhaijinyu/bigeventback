const express = require('express')
const router = express.Router()
const expressjoi = require('@escook/express-joi')
const article_handler = require('../router_handler/article')
const multer = require('multer')



router.post('/add',article_handler.addArticle)

module.exports = router