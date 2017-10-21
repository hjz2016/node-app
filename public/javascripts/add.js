// 加入购物车请求
function add(){
	$('.row').delegate('#addCart', 'click', function() {
		var that = this;
		// console.log($(that).parents('.thumbnail').find('.good_img').attr('src'))
		if($.cookie('usn')){
			$.ajax({
				url:'/goods/list.addCart',
				type:'post',
				data:{
					usn:$.cookie('usn'),
					goodId:$(that).data('id'),
					goodtt:$(that).parents('.caption').find('h3').text(),
					goodNum:parseFloat($(that).siblings('.cartnum').val()),
					imgsrc:$(that).parents('.thumbnail').find('.good_img').attr('src')
				}
			})
			.then(function(res){
				alert('加入购物车成功')
				saveCart(res)
			},function(xhr,err){
				console.log(err)
			})
		}else{
			alert('还没登录')
		}
	});
}

// 加入购物车商品数量处理
function num_handle(){
	$('.menu').on('click','.minus',function(){
		var num = parseFloat($(this).siblings('.cartnum').val()) - 1
		if(num == 0) num = 1;
		$(this).siblings('.cartnum').val(num)
	}).on('click','.plus',function(){
		var num = parseFloat($(this).siblings('.cartnum').val()) + 1
		if(num == 101) num = 100;
		$(this).siblings('.cartnum').val(num)
	})


	$('.thumbnail').on('click','.minus',function(){
		var num = parseFloat($(this).siblings('.cartnum').val()) - 1
		if(num == 0) num = 1;
		$(this).siblings('.cartnum').val(num)
	}).on('click','.plus',function(){
		var num = parseFloat($(this).siblings('.cartnum').val()) + 1
		if(num == 101) num = 100;
		$(this).siblings('.cartnum').val(num)
	})
	
}

// 存入购物车cookie
function saveCart(res){
	// var goods_obj = JSON.parse(res)
	// console.log(res)
    // 设置cookie
    $.cookie('cart',res,{expires:1,path:'/'})

    checkCartInfo()
}

// 购物车内逻辑
function cart_cal(){
	// 更新购物车
	$('.menu').on('click','.save',function(){
		var val = $(this).siblings('.cartnum').val()
		
		var that = this;
		
		// 请求
		$.ajax({
			url:'/goods/list.addCart',
			type:'post',
			data:{
				usn:$.cookie('usn'),
				goodId:$(that).data('id'),
				goodtt:$(that).parent().siblings('.tt').data('tt'),
				goodNum:parseFloat(val),
				imgsrc:$(that).parent().siblings('.img').find('img').attr('src')
			}
		})
		.then(function(res){
			saveCart(res)
		},function(xhr,err){
			console.log(err)
		})
		
	})

	//删除商品

	//全选
	$('.menu').on('click','.all_sel',function() {
		$('.item .sel input').each(function(i,item){
			$(this)[0].checked = true
		})
	});

	//反选
	$('.menu').on('click','.reverse_sel',function() {
		$('.item .sel input').each(function(i,item){
			console.log($(this))
			if($(this)[0].checked == true){
				$(this)[0].checked = false
			}else{
				$(this)[0].checked = true
			}
		})
	});

	//删除
	$('.menu').on('click','.delete_sel',function() {
		var flag = false;
		var arr = [];
		$('.item .sel input').each(function(i,item){
			if($(this)[0].checked == true){
				flag = true;
				arr.push($(this).parents('.item').find('.save').data('id'))
			}
		})

		if(flag){
			// 选中的删除
			if(confirm('是否真的要删除？')){
				deleteItem(arr)
			}

		}
	});
}

// 删除请求
function deleteItem(idArr){
	var id_arr = JSON.stringify(idArr)
	// 请求
	$.ajax({
		url:'/goods/list.deleteItem',
		type:'post',
		data:{
			usn:$.cookie('usn'),
			id_arr:id_arr
		}
	})
	.then(function(res){
		console.log('删除成功')
		// 刷新购物车
		saveCart(res)
	},function(xhr,err){
		console.log(err)
	})
}

function init(){
	add();
	num_handle();
	cart_cal();
}

init();


