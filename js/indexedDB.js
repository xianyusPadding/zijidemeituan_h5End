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
			//console.log(db);
			var transaction = db.transaction("restaurant", "readwrite");
			var store = transaction.objectStore("restaurant");
			//console.log(store);
			store.openCursor().onsuccess = function(event){
				var cursor = event.target.result;
				if(cursor){
					//console.log(cursor.key + cursor.value.res_title);
					var fl_main2_addres = $("#fl-main2 .container-fluid").html();	
					//console.log(fl_main2_addres);
					if(cursor){
						fl_main2_addres += "<div class='row'><div class='col-xs-3'><img class='fl-restaurentImg' src='" +
										cursor.value.res_img + "' alt='restaurant' /></div><div class='col-xs-9'><div class='row fl-main2-rightTop'><h4>"+
										cursor.value.res_title + "</h4><div class='fl-start'><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><spanclass='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><p>" +
										cursor.value.res_price + "</p></div></div><div class='row'><p class='fl-restaurant-intro'>" +
										cursor.value.res_activity + "</p></div></div></div>"
						
						$("#fl-main2 .container-fluid").html(fl_main2_addres);
						//console.log(fl_main2_addres);
						cursor.continue();
					}	
				}
			}
		}
		show_res();
	}

	req.onerror = function(e){
		alert("打开数据库错误" + e.target.errorCode);
	}
	//onupgradeneeded事件
	req.onupgradeneeded = function(e){
		//创建objectStore
		var objectStore = e.target.result.createObjectStore("restaurant",{keyPath: "res_img"});
		objectStore.createIndex("res_title", "res_title", {unique: false});
		objectStore.createIndex("res_price", "res_price", {unique: false});
		objectStore.createIndex("res_activity", "res_activity", {unique: false});
		//要增加的数据Array1
		const restaurantData = [
			{res_img:"images/restaurant2.jpg", res_title:"餐中饮重庆烤鱼店",res_price:"￥45/人",res_activity:"双人套餐68，4人套餐88元，6人套餐108元"},
			{res_img:"images/restaurant3.jpg", res_title:"黑龙茶",res_price:"￥10/人",res_activity:"5.9元抹绿奶茶，14.8元优惠饮品双杯"},
			{res_img:"images/restaurant4.jpg", res_title:"万岁",res_price:"￥16/人",res_activity:"12元超值单人A餐，14元超值单人B餐，15元..."}
		];
		for (var i in restaurantData) {
			objectStore.add(restaurantData[i]);
		}
	};
})
