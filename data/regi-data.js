var MongoClient = require('mongodb').MongoClient

// Connection URL
var url = 'mongodb://localhost:27017/web_server';

/* 注册模块 */
var regi_module = {
	queryDb(req,res){
		// 查询字符串
	    var query_obj = req.body
	    // console.log(query_obj)
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
			  collection.find({usn:query_obj.usn}).toArray(function(err, docs) {
				   if(err) throw err;

				   if(docs.length > 0){
				   	  // 找到数据 说明已存在用户名
				   	  cb('1')
				   }else{
				   	  // 没找到 说明可以注册
				   	  
				   	  // 开始注册
				   	  collection.insertMany([{
				   	  	    usn:query_obj.usn,
				            pwd:query_obj.pwd,
				            nn:query_obj.nn
				      }],function(err,res){
				      	 if(err) throw err;

				      	 if(res.insertedCount == '1'){
				      	 	// 注册成功
				      	 	cb('2')
				      	 }

				      	 // 关闭连接		 
						  db.close();
				      })
				   }
			  });
			  
		});
	}
}



module.exports = regi_module