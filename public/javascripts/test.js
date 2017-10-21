function handler(res){
    // 设置cookie
    $.cookie('usn',res.usn,{expires:1,path:'/'})
    $.cookie('nickname',res.nn,{expires:1,path:'/'})

    if(res.goods){
    	$.cookie('cart',JSON.stringify(res.goods),{expires:1,path:'/'})
    }
    
    
    // 跳转
    location.href = '/'
	checkCartInfo()
}

function checkCookie(){
	if($.cookie('nickname')){
		// 存在cookie
		$('#nickname').html($.cookie('nickname'))
		$('#cart').html($.cookie('cart'))

		$('#ctr').addClass('hidden')
		$('#info').removeClass('hidden')
	}else{
		// 不存在cookie
		$('#info').addClass('hidden')
		$('#ctr').removeClass('hidden')
		
	}

	checkCartInfo()
	// console.log('haha')
}

function checkCartInfo(){
	if($.cookie('cart')){
		// 存在cookie
		var res = $.cookie('cart') || '';

		if(res == '[]' || res == ''){
			$('.dropdown-menu').html(`<img 
				class='empty' src="/images/cart.jpg" title='购物车为空' alt="" />
				<span>购物车是空的</span>`)
			return;			
		}

		var goods_arr = JSON.parse(res)
		var str = '';
		var total_num = 0;
		var total_money = 0;



		// console.log(goods_arr)
		str += `
				<div class='clearfix item_tt'>
					
					<button class='btn-xs btn-danger pull-right delete_sel'>删除</button>
					
					<button class='btn-xs btn-primary pull-right reverse_sel'>反选</button>
					<button class='btn-xs btn-success pull-right all_sel'>全选</button>
				</div>
		`

		goods_arr.forEach(function(good,i){
			str += `<li class='item clearfix'>
						<div class='sel' style='transform: translate(0,100%);float:left;'>
							<input type="checkbox" />
						</div>
						<p>
							<a class='img' href="/goods/detail?goodid=${good.goodId}">
								<img src=${good.imgsrc} title='${good.tt}' class='cart-item' style=
								'' alt="" />
							</a>
						</p>
						<div>
							<p class='tt' data-tt=${good.tt} data-num=${good.num}>
								<span>品名：${good.tt} </span>
							</p>
							<p class='tt' data-tt=${good.tt} data-num=${good.num}>
								
								<span>数量：${good.num} </span>
							</p>
							<p class='tt' data-tt=${good.tt} data-num=${good.num}>
								
								<span>价格：${good.price} </span>
							</p>
							<p class='ctr'>
								<button class="btn-info btn-xs minus">-</button>
								 <input class="text-center cartnum" type="text" value="1" style="width:30px;height:20px;">
								 <button class="btn-info btn-xs plus">+</button>
								 <button class='save btn-danger btn-xs' data-id=${good.goodId}>保存</button>
							</p>
						</div>
						
						
						 
					</li>`

			total_num += good.num
			total_money += good.num * good.price
		})

		str += `
				<div class='clearfix'>
					<div class='' style='padding-left:20px;'>
							<span style='font-weight:bold;'>总价：</span>
							<span class='total_price' style='margin-right:5px;'>${total_money}</span>
							<span style='font-weight:bold;'>总数量：</span>
							<span class='total_num' style='margin-right:5px;'>${total_num}</span>
					</div>
				</div>
		`
		$('.dropdown-menu').html(str)
		
	}else{
		$('#cart').html('无购物车数据');
		return;
	}

}


function tabs(){
	// 判断页面
    if(location.href.indexOf('list') > -1){
    	$($('.tabs')[1]).addClass('active')
    }else if(location.href.indexOf('login') > -1){
    	$($('.tabs')[2]).addClass('active')
    }else if(location.href.indexOf('regi') > -1){
    	$($('.tabs')[3]).addClass('active')
    }else if(location.href.indexOf('detail') > -1){
    	$($('.tabs')[4]).addClass('active')
    }else{
    	$($('.tabs')[0]).addClass('active')
    }

	$('.tabs').click(function() {
		$('.tabs').removeClass('active')
		$(this).addClass('active')
	});

	// 退出事件
    $('#leave').click(function() {
		// 删除cookie
		$.cookie('nickname',null,{path:'/'})
		$.cookie('usn',null,{path:'/'})
		$.cookie('cart',null,{path:'/'})
		// console.log(1)
		checkCookie()
		// location.reload(true)
	});


	// 购物车点击出现
	// $('#dropdownMenu1').dropdown()
    
    var cartFlag = false;

	$('#dropdownMenu1').click(function(event) {
			$('.dropdown').removeClass('open');
		
		if(cartFlag){
			$('.dropdown-menu').hide();
			cartFlag = false;
			$('.dropdown').removeClass('open');
		}else{
			$('.dropdown-menu').show();
			cartFlag = true;
			$('.dropdown').addClass('open');
		}

		$(document).click(function(e) {
			var $t = $(e.target)
			
			if($t.parents('.dropdown').length == 0 && cartFlag){
				// console.log(1)
				$('.dropdown-menu').hide()
				$('.dropdown').removeClass('open');
				cartFlag = false
				return;
			}
			$('.dropdown').removeClass('open');
			
			
		});
		
	});

	
}


tabs();

checkCookie();
