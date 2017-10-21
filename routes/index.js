var express = require('express');
var router = express.Router();
var goods_module = require('../data/goods-module')


/* 渲染页面. */
router.get('/', function(req, res, next) {
   // 请求
  let query_obj = req.query;

  goods_module.getGoods(query_obj,(results)=>{
  	// console.log(results)
  	res.render('index', { title: 'dawdawdawddawd',goods:results });
  },{
  	pageNum : 1,
  	pageSize : 4
  })
});





module.exports = router;
