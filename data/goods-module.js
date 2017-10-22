const goods_module = {
	getGoods(query_obj,cb,opts,one){
		var MongoClient = require('mongodb').MongoClient;
	    var url = 'mongodb://localhost:27017/web_server';
	    MongoClient.connect(url, function(err, db) {
	        if(err) throw err; 
	        var collection = db.collection('goods');

	        if(opts){
	        	let start = (opts.pageNum-1) * opts.pageSize
	        	console.log(start,start+opts.pageSize)
	        	collection.find({}).skip(start).limit(opts.pageSize).toArray(function(err, docs) {
		            // console.log(docs)
		            cb(docs)

		        }); 
	        }else{
	        	if(one){
	        		collection.find({goodsId:one}).toArray(function(err, docs) {
			            cb(docs)
			        }); 
	        	}else{
	        		collection.find({}).toArray(function(err, docs) {
			            cb(docs)
			        }); 
	        	}
	        }
	        
	        db.close();
        });
	},
	addCart(query_obj,cb){
		var MongoClient = require('mongodb').MongoClient;
	    var url = 'mongodb://localhost:27017/web_server';
	    MongoClient.connect(url, function(err, db) {
	        if(err) throw err; 
	        var collection = db.collection('user_info');
	        var goods_col = db.collection('goods')

	        collection.find({usn:query_obj.usn}).toArray(function(err, docs) {
	        	
	        	let aGoods = docs[0].goods || []
	        	let goodNum = parseFloat(query_obj.goodNum)
	        	let imgsrc = query_obj.imgsrc
	        	let price = 0;
	        	let goodId = parseFloat(query_obj.goodId)

		goods_col.find({goodId:goodId}).toArray(function(err,res){
	        		price = res[0].price
	        		console.log(price)
	        		if(aGoods.length > 0){
		        		// console.log(aGoods[0].goodId)
		        		// 如果有购物车数组 遍历
		        		
		        		// 存在相同商品flag
		        		var flag = false;
		        		var total = 0;
		        		aGoods.forEach(function(good,i){
		        			if(good.goodId == query_obj.goodId){
		        				good.num = Number(good.num) + goodNum;
		        				flag = true;
		        			}
		        			total += good.num
		        		})

		        		// console.log(aGoods)

		        		// 如果遍历未找到此次加入的商品类型 则创建新的商品对象
		        		if(!flag){
		        			// 加入数组
		        			aGoods.push({
		        				goodId:query_obj.goodId,
			        			num:goodNum,
			        			tt:query_obj.goodtt,
			        			imgsrc:imgsrc,
			        			price:price
		        			})

		        			total++;
		        		}

	        			// 更新
	        			console.log('开始更新购物车')
		        		collection.update(
						    {
						        "usn" : query_obj.usn
						    },
						    // update 
						    {	
						    	$set:{
									goods:aGoods
						    	}
						    },
						    // options 
						    {
						        "multi" : true,
						        "upsert" : false
						    }
		        		)
	        			console.log('更新购物车结束')

	        			cb(JSON.stringify(aGoods))
		        	}else{
		        		// 如果没有购物车数组
		        		
		        		aGoods = [{
							    		goodId:query_obj.goodId,
					        			num:goodNum,
					        			tt:query_obj.goodtt,
					        			imgsrc:imgsrc,
					        			price:price
							    	}]
		        		console.log('开始加入购物车')
		        		collection.update(
						    {
						        "usn" : query_obj.usn
						    },
						    // update 
						    {	
						    	$set:{
									goods:aGoods
						    	}
						    },
						    // options 
						    {
						        "multi" : true,
						        "upsert" : false
						    }
		        		)
		        		console.log('加入购物车结束',aGoods)

		        		cb(JSON.stringify(aGoods))
		        	}

		        	db.close();
		        })
	        	// console.log(query_obj)

	        }); 
	        
        });
	},
	// 删除商品
	deleteItem(query_obj,cb){
		var MongoClient = require('mongodb').MongoClient;
	    var url = 'mongodb://localhost:27017/web_server';
	    MongoClient.connect(url, function(err, db) {
	        if(err) throw err;

	        var user_info =  db.collection('user_info')

	        user_info.find({usn:query_obj.usn}).toArray(function(err,docs){
	        	var aGoods = docs[0].goods;
	        	var id_arr = JSON.parse(query_obj.id_arr)
	        	// console.log(JSON.parse(query_obj.id_arr))
	        	
	        	for(var i = 0 ; i < aGoods.length ; i++){
	        		for(var j = 0 ; j < id_arr.length ; j++){
	        			// console.log(aGoods[i].goodId,id_arr[j])
	        			if(Number(aGoods[i].goodId) == id_arr[j]){
	        				aGoods.splice(i,1)
	        				i--;
	        				break;
	        			}
	        		}
	        	}

	        	console.log('开始删除')
	        	
	        	user_info.update(
				    {
				        "usn" : query_obj.usn
				    },
				    // update 
				    {	
				    	$set:{
							goods:aGoods
				    	}
				    },
				    // options 
				    {
				        "multi" : true,
				        "upsert" : false
				    }
        		)

        		console.log('删除成功')
	        	cb(JSON.stringify(aGoods))
        		
	        })
	    })
		
	}
}

module.exports = goods_module;