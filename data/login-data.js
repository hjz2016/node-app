var MongoClient = require('mongodb').MongoClient

// Connection URL
var url = 'mongodb://localhost:27017/web_server';

/* 登录模块 */
var login_module = {
	queryDb(req,res){
		// 查询字符串
	    var query_obj = req.query

	    if(query_obj){
		   // 获得请求 开始连接数据库
		   this.db_handler(query_obj,function(str){
		  	 console.log('查询结束',str)
		  	 res.send(str)
		   })	
	    }
	},
	db_handler(query_obj,cb){
		// 连接
		MongoClient.connect(url, function(err, db) {
			  // 选择表
			  var collection = db.collection('user_info');
			  // 找到数据
			  collection.find({usn:query_obj.usn,pwd:query_obj.pwd}).toArray(function(err, docs) {
				   if(err) throw err;

				   if(docs.length > 0){
				   	  // 找到数据 返回
				   	  cb(docs[0])
				   }else{
				   	  // 没找到 返回1
				   	  cb('1')
				   }
			  });
			  // 关闭连接		 
			  db.close();
		});
	}
}



module.exports = login_module