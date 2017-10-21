

function initPag(){
	$('.prev').click(function() {
		var curPage = $('.badge').text()
		// console.log(curPage)
		if(curPage == '1') return;
		$.ajax({
			url:'/goods/list',
			data:{
				minus:true
			}
		})
		.then(function(res){
			console.log(res)
		},function(xhr,err){
			console.log(err)
		})
	});

	$('.next').click(function() {
		var curPage = $('.badge').text()
		if(curPage == '2') return;
		$.ajax({
			url:'/goods/list',
			data:{
				plus:true
			}
		})
		.then(function(res){
			console.log(res)
		},function(xhr,err){
			console.log(err)
		})
	});
}