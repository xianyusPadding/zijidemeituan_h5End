$(function(){
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
					$("#fl-orderMain-1 .container-fluid").empty();
					var fl_main_content = $("#fl-orderMain-1 .container-fluid").html();	
					if(cursor){
						fl_main_content += "<div class='row fl-orderTop'><p>我的订单</p><p><a href='#'>全部订单 <span class='glyphicon glyphicon-menu-right'></span></a></p></div><div class='row fl-order-style'>" 
										+ "<ul><li><a href='#'><span class='glyphicon glyphicon-credit-card'></span>待付款</a></li><li><a href='#'><span class='glyphicon glyphicon-credit-card'></span>待使用</a></li>" 
										+ "<li><a href='#'><span class='glyphicon glyphicon-credit-card'></span>待评价</a></li><li><a href='#'><span class='glyphicon glyphicon glyphicon-yen'></span>退款/售后</a></li></ul>"
										+ "</div><div class='row fl-order-lately'><p class='fl-latelyTop'>最近订单</p><div class='row'><div class='col-xs-2 col-sm-2 col-md-1'><img src='images/mian1-icon1.jpg' alt='' />"
										+ "</div><div class='col-xs-8 col-sm-9 col-md-10'><h4>"
										+ cursor.res_title + "</h4><p>有效期至：2017-07-31</p><p>数量：" +localStorage.costNum +"</p><p>总价：" + localStorage.secondCost + "</p></div><p class='col-xs-2 col-sm-1'>待消费</p></div></div>"
										
										
						$("#fl-orderMain-1 .container-fluid").html(fl_main_content);
						console.log($("#fl-orderMain-1 .container-fluid").html());
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
							window.location.href="order.html";
						})
					})
					
				}

			}
		}
		show_res();
		
	}
})
