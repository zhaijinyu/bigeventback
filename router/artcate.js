const express = require('express') 
const router = express.Router()
const artCate_handler = require('../router_handler/artcate')
const expressjoi = require('@escook/express-joi')
const { art_cate_schema,delete_cate_schema,update_cate_schema } = require('../schema/artcate')


router.get('/cate', artCate_handler.getArtCates)
router.post('/addcates', expressjoi(art_cate_schema), artCate_handler.addArtCates)
router.get('/deletecate/:id', expressjoi(delete_cate_schema), artCate_handler.deleteArtCate)
router.get('/cates/:id', expressjoi(delete_cate_schema), artCate_handler.getArtCateById)
router.post('/updatecate',expressjoi(update_cate_schema),artCate_handler.updateArtCate)

module.exports = router