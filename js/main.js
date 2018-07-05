$(function() {

	// 开启背景幕布
	function openBackdrop() {
		$(".main").after("<div class='modal-backdrop fade in'></div>");
	}

	// 关闭背景幕布
	function closeBackdrop() {
		$(".modal-backdrop").remove();
	}

	// 添加模态框
	function openModel(html) {
		openBackdrop();
		$(".main").before(html);
	}

	// 关闭模态框
	function closeModel() {
		closeBackdrop(); // 关闭背景幕布
		$(".in").remove(); // 移除模态框
	}

	// 左侧导航栏收缩展开
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
			$('.route-nav').css('left', '60px');
			$('.nav-left-top').css({
				'width': '60px',
				'padding-left': '20px',
				'padding-right': '20px',
			});
			$('.main').css('left', '60px');
			$('#mini').attr('class', 'left-close');
		} else {
			$('.nav-left').removeClass('nav-left-mini');
			$('.route-nav').css('left', '220px');
			$('.nav-left-top').css({
				'width': '220px',
				'padding-left': '100px',
				'padding-right': '100px'
			});
			$('.main').css('left', '220px');
			$('#mini').attr('class', '');
		}
	});

	// 顶部导航栏右侧菜单鼠标移动到该元素上时下拉框显示事件
	$(".navbar-user>li").mouseenter(function() {
		$(".navbar-user>li").attr("class", "open");
	});
	$(".navbar-skin>li").mouseenter(function() {
		$(".navbar-skin>li").attr("class", "open");
	});

	// 顶部导航栏右侧菜单鼠标从该元素上移开时下拉框隐藏事件
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

	// 路径导航条动态改变事件
	$(".nav-left>nav>ul>li>ul>li>a").on("click", function() {

		$("ol.breadcrumb").empty(); // 清楚当前元素中的内容
		var title = $(this).text(); // 获取当前被点击标签的标题内容
		var parentTitle = $(this).parent().parent().prev().text(); // 获取当前被点击标签的父标题内容
		$("ol.breadcrumb").append("<li onclick='homePage()'><a href='main.html' target='left_content'>首页</a></li><li class='active'>" +
			parentTitle + "</li><li class='active'>" + title + "</li>"); // 向当前元素中添加内容

	});

});

// 点击路径导航首页时路径导航内容只剩下首页的方法
function homePage() {
	$("ol.breadcrumb").empty(); // 清楚当前元素中的内容
	$("ol.breadcrumb").append("<li id='home-page'><a href='main.html' target='left_content'>首页</a></li>"); // 向当前元素中添加内容
}