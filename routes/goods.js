var express = require('express');
var router = express.Router();
var goods_module = require('../data/goods-module')


let pageNum = 1,
    pageSize = 4;

/* 渲染页面. */
router.get('/', function(req, res, next) {
 
});

//渲染列表
router.get('/list', function(req, res, next) {
  // 请求
  let query_obj = req.query;

  if(query_obj.plus){
     pageNum++;

  }else if(query_obj.minus){
     pageNum--;
     
  }

  goods_module.getGoods(query_obj,(results)=>{
  	console.log(results)
  	res.render('list', { title: 'dawdawdawddawd',goods:results,curPage:pageNum});
  },{
    pageNum : pageNum,
    pageSize : pageSize
  })
});

//加入 更新 购物车请求
router.post('/list.addCart', function(req, res, next) {
  // 请求
  let query_obj = req.body;

  goods_module.addCart(query_obj,(results)=>{
  	res.send(results)
  })
});

// 删除购物车商品请求
router.post('/list.deleteItem', function(req, res, next) {
  // 请求
  let query_obj = req.body;
  
  goods_module.deleteItem(query_obj,(results)=>{
    res.send(results)
  })
});

//详情页
router.get('/detail', function(req, res, next) {
  // 请求
  let query_obj = req.query;
  let goodId = query_obj.goodid

  goods_module.getGoods(query_obj,(results)=>{
    console.log(results)
    res.render('detail', { title: 'dawdawdawddawd',goodinfo:results[0]});
  },null,goodId)
  
});





module.exports = router;
