$(function(){
	var db;
	var req = window.indexedDB.open("myDatabase",2);
	
	req.onsuccess = function(e){
		db = this.result;
	}
	req.onerror = function(e){
		alert("打开数据库错误" + e.target.errorCode);
	}
	req.onupgradeneeded = function(e){
		console.log(0);
		var objectStore = e.target.result.createObjectStore("usertable",{keyPath: "user_id"});
		objectStore.createIndex("user_name", "user_name", {unique: false});
		objectStore.createIndex("user_pass", "user_pass", {unique: false});
		objectStore.createIndex("user_num", "user_num", {unique: false});
		objectStore.createIndex("user_address", "user_address", {unique: false});
	}

	$("#loginOut-btn").click(function(){
		add_user();
		window.location.href = "login.html";
	});
	
	$("#loginIn-btn").click(function(){
		loginIn($("#loginIn_userId").val(), $("#loginIn_userPass").val());
	});
	
	function add_user(){
		var transaction = db.transaction("usertable", "readwrite");
		var store = transaction.objectStore("usertable");
		if($("#userName").val() != "" && $("#userId").val() != "" && $("#password").val() != "" && $("#phoneNumber").val() != "" && $("#address").val() != ""){
			var request = store.add({
				user_name: $("#userName").val(),
				user_id: $("#userId").val(),
				user_pass: $("#password").val(),
				user_num: $("#phoneNumber").val(),
				user_address: $("#address").val()
			});
		}
		request.onsuccess = function(){
			alert("注册成功");
		}
		request.onerror = function(){
			alert("注册失败");
		}
	}
	
	function loginIn(userid,userpass){
		var transaction = db.transaction("usertable", "readwrite");
		var store = transaction.objectStore("usertable");
		if(userid != ""){
			range = IDBKeyRange.only(userid);
			var request = store.openCursor(range);
			
			if(userpass != ""){
				range = IDBKeyRange.only(userpass);			
				var request = store.openCursor(range);
			}
		}
		else
			alert("账号密码不得为空");
		
		request.onsuccess = function(e){
			var cursor = e.target.result;
			if(cursor){
				if(cursor.value.user_id == userid && cursor.value.user_pass == userpass){
					$("#fl-loginMain-1").hide();
					$("#fl-loginMain-2").show();
				}
				else
					alert("登陆失败");			
			}
		}
		
		request.onerror = function(){
			alert("登录失败");
		}
		
		
		
	}
})