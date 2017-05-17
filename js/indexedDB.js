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
					var fl_main2_addres = $("#fl-main2 .container-fluid").html();	
					if(cursor){
						fl_main2_addres += "<div class='row'><div class='col-xs-3'><img class='fl-restaurentImg' src='" +
										cursor.value.res_img + "' alt='restaurant' /></div><div class='col-xs-9'><div class='row fl-main2-rightTop'><h4>"+
										cursor.value.res_title + "</h4><div class='fl-start'><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><spanclass='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><p>" +
										cursor.value.res_price + "</p></div></div><div class='row'><p class='fl-restaurant-intro'>" +
										cursor.value.res_activity + "</p></div></div></div>"
						
						$("#fl-main2 .container-fluid").html(fl_main2_addres);
						cursor.continue();
					}	
				}
			}
		}
		show_res();
		function show_nearRes(){
			//console.log(db);
			var transaction = db.transaction("nearbyRes", "readwrite");
			var store = transaction.objectStore("nearbyRes");

			store.openCursor().onsuccess = function(event){
				var cursor = event.target.result;
				if(cursor){
					var fl_main1_addres = $("#fl-main-1 .container-fluid").html();	
					if(cursor){
						fl_main1_addres += "<div class='row fl-row2'><div class='col-xs-3 col-sm-2 fl-left'><img class='fl-nearbyResImg' src='" + 
										cursor.value.nearRes_img + "' alt='nearbyRes1' /></div><div class='col-xs-6 col-sm-7'><div class='row fl-main-rightTop'><h4>" +
										cursor.value.nearRes_title + " <span class='fl-icon'>付</span></h4><p class='fl-icon1Content'>" + 
										cursor.value.nearRes_distri + "</p><div class='fl-start'><p class='fl-startContent'><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span>月售" + 
										cursor.value.nearRes_num + "单</p></div></div><div class='row'><p class='fl-priceContent'>起送价￥" + 
										cursor.value.nearRes_price + " | 配送￥0</p></div></div><div class='col-xs-3 take-outAbout'><p class='take-outDistance'>" + 
										cursor.value.nearRes_distance + "</p><p class='take-outTime'>" + 
										cursor.value.nearRes_time + "</p></div></div>" 
										
						$("#fl-main-1 .container-fluid").html(fl_main1_addres);
						cursor.continue();
					}	
				}
			}
		}
		show_nearRes();
	}

	req.onerror = function(e){
		alert("打开数据库错误" + e.target.errorCode);
	}
	//onupgradeneeded事件
	req.onupgradeneeded = function(e){
		//创建首页 restaurant'objectStore
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
		
		//创建附近 nearbyRes'objectStore
		var objectStoreNear = e.target.result.createObjectStore("nearbyRes",{keyPath: "nearRes_img"});
		objectStoreNear.createIndex("nearRes_title", "nearRes_title", {unique: false});
		objectStoreNear.createIndex("nearRes_distri", "nearRes_distri", {unique: false});
		objectStoreNear.createIndex("nearRes_num", "nearRes_num", {unique: false});
		objectStoreNear.createIndex("nearRes_price", "nearRes_price", {unique: false});
		objectStoreNear.createIndex("nearRes_distance", "nearRes_distance", {unique: false});
		objectStoreNear.createIndex("nearRes_time", "nearRes_time", {unique: false});
		
		//要增加的数据Array2
		const nearbyResData = [
			{nearRes_img:"images/nearbyRes2.jpg", nearRes_title:"金凤凰鸭饭店",nearRes_distri:"",nearRes_num:"4145",nearRes_price:"8",nearRes_distance:"770m",nearRes_time:"64分钟"},
			{nearRes_img:"images/nearbyRes3.jpg", nearRes_title:"垄上阁美食",nearRes_distri:"接受预定 10:00后开始配送",nearRes_num:"1961",nearRes_price:"0",nearRes_distance:"1.6km",nearRes_time:"44分钟"},
			//{nearRes_img:"images/nearbyRes4.jpg", nearRes_title:"垄上阁美食",nearRes_distri:"接受预定 10:00后开始配送",nearRes_num:"1961",nearRes_price:"0",nearRes_distance:"1.6km",nearRes_time:"44分钟"}
			//{nearRes_img:"images/nearbyRes5.jpg", nearRes_title:"垄上阁美食",nearRes_distri:"接受预定 10:00后开始配送",nearRes_num:"1961",nearRes_price:"0",nearRes_distance:"1.6km",nearRes_time:"44分钟"}
		];
		for (var i in nearbyResData) {
			objectStoreNear.add(nearbyResData[i]);
		}
	};
})
