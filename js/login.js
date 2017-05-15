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
