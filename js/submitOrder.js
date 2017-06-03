$(function(){
	var orderNum = $('#orderNumber').val();	
	var str = $('.perPrice').html().split('￥');
	
	$('.fl-addBtn').click(function(){
		orderNum++;
		$('#orderNumber').val(orderNum);
//		console.log(str[1] * orderNum);
		$('.firstCost').html('￥' + str[1] * orderNum);
		$('.secondCost').html('￥' + str[1] * orderNum);
	})
	$('.fl-subBtn').click(function(){
		orderNum--;
		$('#orderNumber').val(orderNum);
		$('.firstCost').html('￥' + str[1] * orderNum);
		$('.secondCost').html('￥' + str[1] * orderNum);
	})

	$('#fl-submitOrder').dialog({
		autoOpen:false
	});
	
	$('.fl-submitOrder-btn').click(function(){
		$('#fl-submitOrder').dialog('open');
		$('#fl-submitOrder').html("订单：" + $('.fl-orderTitle').html() +  "<br>共消费：" + $('.secondCost').html() + "<br><button class='btn btn-default fl-orderSubmit2' style='background:#50BBA1;width:100%;margin-top:10px'>确定</button>");
		$('.fl-orderSubmit2').click(function(){
			window.location.href="order.html";
		})
	})
	
	//创建IndexDB数据库
	var req = window.indexedDB.open("myDatabase");
	req.onsuccess = function(e){
		db = this.result;
		
		function show_res(){
			var transaction = db.transaction("restaurant", "readwrite");
			var store = transaction.objectStore("restaurant");
			
			//key是主键的某一个值
			var request = store.get(localStorage.keyId);
			request.onerror=function(e){
			    alert("发生错误：" + request.error);
			};
			request.onsuccess=function(e){
			    var cursor=e.target.result;
			    console.log(cursor);
			    if(cursor){
					$("#fl-main .container-fluid").empty();
					var fl_main_content = $("#fl-main .container-fluid").html();	
					if(cursor){
						fl_main_content += "<div class='row fl-main-row1'><p class='col-xs-9 fl-orderTitle'>" 
										+ cursor.res_title + "</p><p class='col-xs-3 perPrice'>"
										+ cursor.res_perPrice + "</p><p class='col-xs-8'>数量</p><div class='col-xs-4 input-group'><div class='input-group-btn'><button class='btn btn-default"
										+ " fl-subBtn'>-</button></div><input type='text' class='form-control' id='orderNumber' value='1'/><div class='input-group-btn'>" 
										+ "<button class='btn btn-default fl-addBtn' style='color: #50BBA1;'>+</button></div></div><p class='col-xs-9'>小计</p><p class='col-xs-3 firstCost' style='color:#E9A254;'>"
										+ cursor.res_perPrice + "</p></div><div class='row fl-main-row2'><p class='col-xs-8'>抵用卷</p><p class='col-xs-4' style='padding-left: 0;'>使用抵用卷" 
										+ "<span class='glyphicon glyphicon-menu-right'></span></p><p class='col-xs-9'>总价</p><p class='col-xs-3 secondCost' style='color:#E9A254 ;'>"
										+ cursor.res_perPrice + "</p></div>"
										
						$("#fl-main .container-fluid").html(fl_main_content);
						console.log($("#fl-main .container-fluid").html());
					}
					var orderNum = $('#orderNumber').val();	
					var str = $('.perPrice').html().split('￥');
					
					$('.fl-addBtn').click(function(){
						orderNum++;
						$('#orderNumber').val(orderNum);
//						console.log(str[1] * orderNum);
						$('.firstCost').html('￥' + str[1] * orderNum);
						$('.secondCost').html('￥' + str[1] * orderNum);
					})
					$('.fl-subBtn').click(function(){
						orderNum--;
						$('#orderNumber').val(orderNum);
						$('.firstCost').html('￥' + str[1] * orderNum);
						$('.secondCost').html('￥' + str[1] * orderNum);
					})
				
					$('#fl-submitOrder').dialog({
						autoOpen:false
					});
					
					$('.fl-submitOrder-btn').click(function(){
						$('#fl-submitOrder').dialog('open');
						$('#fl-submitOrder').html("订单：" + $('.fl-orderTitle').html() +  "<br>共消费：" + $('.secondCost').html() + "<br><button class='btn btn-default fl-orderSubmit2' style='background:#50BBA1;width:100%;margin-top:10px'>确定</button>");
						$('.fl-orderSubmit2').click(function(){
							var _this=$(this);
							localStorage.secondCost =$('.secondCost').html();
							localStorage.costNum = $('#orderNumber').val();
//							alert(localStorage.secondCost + localStorage.costNum);
							window.location.href="order.html";
						})
					})
					
				}

			}
		}
		show_res();
		
	}
	
})
