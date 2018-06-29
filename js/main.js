$(function() {
	// nav收缩展开
	$('.nav-left-item>a').on('click', function() {
		if(!$('.nav-left').hasClass('nav-left-mini')) {
			if($(this).next().css('display') == "none") {
				//展开未展开
				$('.nav-left-item').children('ul').slideUp(200);
				$(this).next('ul').slideDown(200);
				$(this).parent('li').addClass('nav-left-show').siblings('li').removeClass('nav-left-show');
			} else {
				//收缩已展开
				$(this).next('ul').slideUp(200);
				$('.nav-left-item.nav-left-show').removeClass('nav-left-show');
			}
		}
	});
	//nav-mini切换
	$('.nav-left-top').on('click', function() {
		if(!$('.nav-left').hasClass('nav-left-mini')) {
			$('.nav-left-item.nav-left-show').removeClass('nav-left-show');
			$('.nav-left-item').children('ul').removeAttr('style');
			$('.nav-left').addClass('nav-left-mini');
			$('.route_nav').css('left', '60px');
			$('.nav-left-top').css({
				'width': '60px',
				'padding-left': '20px',
				'padding-right': '20px',
			});
			$('.main').css('left', '60px');
			$('#mini').attr('class','left-close');
		} else {
			$('.nav-left').removeClass('nav-left-mini');
			$('.route_nav').css('left', '220px');
			$('.nav-left-top').css({
				'width': '220px',
				'padding-left': '100px',
				'padding-right': '100px'
			});
			$('.main').css('left', '220px');
			$('#mini').attr('class','');
		}
	});

	// 鼠标移动到该元素上时下拉框显示
	$(".navbar-user>li").mouseenter(function() {
		$(".navbar-user>li").attr("class", "open");
	});
	$(".navbar-skin>li").mouseenter(function() {
		$(".navbar-skin>li").attr("class", "open");
	});

	// 鼠标从该元素上移开时下拉框隐藏
	$(".navbar-user>li").mouseleave(function() {

		$(".navbar-user>li").attr("class", "");
	});
	$(".navbar-skin>li").mouseleave(function() {

		$(".navbar-skin>li").attr("class", "");
	});

	// 换肤方法
	$(".navbar-skin-blue").on("click", function() {
		$(".navbar").css("background-color", "#2d6dcc");
	});
	$(".navbar-skin-black").on("click", function() {
		$(".navbar").css("background-color", "#222222");
	});
	$(".navbar-skin-green").on("click", function() {
		$(".navbar").css("background-color", "#19a97b");
	});
	$(".navbar-skin-orange").on("click", function() {
		$(".navbar").css("background-color", "orange");
	});
});