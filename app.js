var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 引入路由配置文件
var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');

// 初始化服务
var app = express();

// 设置模板文件路径 为app.js路径+views/
app.set('views', path.join(__dirname, 'views'));
// 利用ejs引擎渲染模板文件
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置路由 每个路由字符串对应哪个路由配置文件
app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
