<<<<<<< HEAD
$(function(){
	//登录注册选项卡
	$("#fl-loginMain-1").tabs();
	
	var fl_li_width = $('#fl-loginMain-1 ul li').width();
	var fl_a_width = $('#fl-loginMain-1 ul li a').width();
	$('#fl-loginMain-1 ul li a').css('margin-left',(fl_li_width - fl_a_width)/2);
	//console.log(fl_a_width);
	$(window).resize(function(){
		fl_li_width = $('#fl-loginMain-1 ul li').width();
		fl_a_width = $('#fl-loginMain-1 ul li a').width();
		$('#fl-loginMain-1 ul li a').css('margin-left',(fl_li_width - fl_a_width)/2);
	});
	
	$(".fl-tabs-loginIn a").on("click", function(){
		$(".fl-tabs-loginIn").css("border-bottom","3px solid #50BBA1")
		$(".fl-tabs-loginIn a").css("color","#50BBA1");
		$(".fl-tabs-loginOut").css("border-bottom","3px solid #ccc")
		$(".fl-tabs-loginOut a").css("color","#000");
	})
	$(".fl-tabs-loginOut a").on("click", function(){
		$(".fl-tabs-loginOut").css("border-bottom","3px solid #50BBA1")
		$(".fl-tabs-loginOut a").css("color","#50BBA1");
		$(".fl-tabs-loginIn").css("border-bottom","3px solid #ccc")
		$(".fl-tabs-loginIn a").css("color","#000");
	})
})
=======
$(function(){
	//登录注册选项卡
	$("#fl-loginMain-1").tabs();
	
	var fl_li_width = $('#fl-loginMain-1 ul li').width();
	var fl_a_width = $('#fl-loginMain-1 ul li a').width();
	$('#fl-loginMain-1 ul li a').css('margin-left',(fl_li_width - fl_a_width)/2);
	//console.log(fl_li_width-fl_a_width);
	$(window).resize(function(){
		fl_li_width = $('#fl-loginMain-1 ul li').width();
		fl_a_width = $('#fl-loginMain-1 ul li a').width();
		$('#fl-loginMain-1 ul li a').css('margin-left',(fl_li_width - fl_a_width)/2);
	});
})
>>>>>>> 565302b2769343f9464479b16b3fab37cf7f3dd9
