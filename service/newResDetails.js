$(function(){
	
	var db;
	var req = window.indexedDB.open("myDatabase");
	req.onsuccess = function(e){
		db = this.result;
		
//		function showMain2Details(){
//			var transaction = db.transaction("restaurant", "readwrite");
//			var store = transaction.objectStore("restaurant");
//			console.log(store);
//			store.openCursor().onsuccess = function(event){				
//				var cursor = event.target.result;
//				if(cursor){
//					$("#fl-main .container-fluid").empty();
//					var fl_main_content = $("#fl-main .container-fluid").html();	
//					if(cursor){
//						fl_main_content += cursor.value.res_img + cursor.value.res_title;
//						console.log(cursor);
//						$("#fl-main .container-fluid").html(fl_main_content);
//						console.log($("#fl-main .container-fluid").html());
//						cursor.continue();
//					}
//					
//				}
//			}
//		}
//		showMain2Details();
		
		$('#fl-main2').on("click",'.fl-indexMain2-details',function(e){
			var _this=$(this);
			localStorage.keyId =_this.find('input').val();
			window.location.href = "indexMain2Details.html";
		})
	}
	req.onerror = function(e){
		alert("打开数据库错误" + e.target.errorCode);
	}
	

})