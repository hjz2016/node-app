var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

// login模块
var login_module = require('../data/login-data')
// regi模块
var regi_module = require('../data/regi-data')

// 创建 application/json 解析
var jsonParser = bodyParser.json()

// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* login页面 */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'dawdawdawddawd' });
});

/* login请求*/
router.get('/login.req', function(req, res, next) {
  // 调用查询函数
  login_module.queryDb(req,res)
});

/* regi页面 */
router.get('/regi', function(req, res, next) {
  res.render('regi', { title: 'dawdawdawddawd' });
});

/* regi请求*/
router.post('/regi.req', jsonParser , function(req, res, next) {
  // 调用查询函数
  regi_module.queryDb(req,res)
});

module.exports = router;
