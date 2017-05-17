$(function(){
	var db;
	window.indexedDB = window.indexedDB || window.mozIndexedDB || 	window.webkitIndexedDB || window.msIndexedDB;
	if (!window.indexedDB) {
	    alert("你的浏览器不支持indexedDB");
	}
	
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
						fl_main_content += "<div class='row fl-main-row1'><img src='"
										+ cursor.res_img + "' alt='' /></div><div class='row fl-main-row2'><h3>"
										+ cursor.res_title + "</h3><div class='fl-start'><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span>"
										+ "<span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><p>免费提供wifi，免预约</p></div></div><div class='row fl-main-row3'><p class='col-xs-6 fl-perPrice'>"
										+ cursor.res_perPrice + "</p><button class='col-xs-5 btn btn-danger fl-immediateCost-btn'>立即抢购</button><ul class='col-xs-6'><li style='color:#6DCD34'><span class='glyphicon glyphicon-ok-circle'></span> 随时退</li><li style='color:#6DCD34'><span class='glyphicon glyphicon-ok-circle'></span> 过期自动退</li></ul><p class='col-xs-5'  style='color:#adadad'><span class='glyphicon glyphicon-ok-sign'></span> 已售182</p></div>"
										

//						console.log(cursor);
						$("#fl-main .container-fluid").html(fl_main_content);
						console.log($("#fl-main .container-fluid").html());
//						cursor.continue();
					}
					$(".fl-main-row3").on('click','.fl-immediateCost-btn',function(){
						var _this=$(this);
						localStorage.keyId1=_this.prev().html();
						console.log(localStorage.keyId);
						window.location.href="submitOrder.html";
					})
					
				}

			}
		}
		show_res();
		
	}

	req.onerror = function(e){
		alert("打开数据库错误" + e.target.errorCode);
	}
	
	$(".fl-main-row3").on('click','.fl-immediateCost-btn',function(){
		window.location.href="submitOrder.html";
	})
})
