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
										+ cursor.res_title + "</h3><div class='fl-start'><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'>"
										+ "</span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><p>"
										+ cursor.res_price + "</p></div></div><div class='row fl-main-row3'><span class='col-xs-1 glyphicon glyphicon-map-marker'></span><p class='col-xs-9'>"
										+ "赤坎区新华路14号(赤坎步行街新华书店旁)</p><span class='col-xs-1 glyphicon glyphicon-earphone'></span></div><div class='row fl-main-row4'><p class='col-xs-10'>"
										+ "<span class='glyphicon glyphicon-tower'></span>&nbsp;&nbsp;外卖</p><span class='col-xs-1 glyphicon glyphicon-menu-right'></span></div><div class='row fl-main-row5'>"
										+ "<p class='col-xs-12'><span class='glyphicon glyphicon-cutlery' style='color: #50BBA1;'></span>&nbsp;&nbsp;堂食套餐</p><ul class='col-xs-10'><li style='white-space:nowrap;overflow:hidden'>"
										+ cursor.res_activity + "</li></ul><p class='col-xs-1' style='text-align: right;'><span class='glyphicon glyphicon-menu-right' style='line-height: 50px;'></p></div>"

//						console.log(cursor);
						$("#fl-main .container-fluid").html(fl_main_content);
						console.log($("#fl-main .container-fluid").html());
//						cursor.continue();
					}
					
				}

			}
		}
		show_res();
		
	}

	req.onerror = function(e){
		alert("打开数据库错误" + e.target.errorCode);
	}
	
	$("#fl-main").on('click','.fl-main-row5',function(){
//		var _this=$(this);
//		localStorage.keyId1=_this.find('ul li').html();
//		console.log(localStorage.keyId1);
		window.location.href="setmealDetails.html";
	})
})
