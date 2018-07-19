$(function() {

	// 从cookie中获取当前用户名
	var username = getCookie("username");
	// 如何cookie中当前用户为空的话页面自动跳转到登录页面
	if (username == "") {
		parent.location.href = "http://localhost:8080/Information_cms/login.html";
	}

	// 用户登录后超过30分钟未操作的话则重新跳转到登录页面
	var timeStart = 0;// 进入系统时间，
	var timeOut = 7200;// 有效时间，设置为2小时
	if (timeStart == 0) {
		timeStart = (new Date()).getTime();// 得到初始成功登录系统的时间
	}
	document.onmousedown = function(event) {// 监听鼠标事件
		var timeNow = (new Date()).getTime(); // 当前系统时间
		var timeOp = timeNow - timeStart - timeOut * 1000;
		if (timeOp > 0) {
			parent.location.href = "http://localhost:8080/Information_cms/login.html";// 跳转到登录页面
		} else {
			timeStart = timeNow;// 未超时，则重新计时
		}
	}
	
	// 左侧导航栏收缩展开
	$('.nav-left-item>a').on(
			'click',
			function() {
				if (!$('.nav-left').hasClass('nav-left-mini')) {
					if ($(this).next().css('display') == "none") {
						// 展开未展开
						$('.nav-left-item').children('ul').slideUp(200);
						$(this).next('ul').slideDown(200);
						$(this).parent('li').addClass('nav-left-show')
								.siblings('li').removeClass('nav-left-show');
					} else {
						// 收缩已展开
						$(this).next('ul').slideUp(200);
						$('.nav-left-item.nav-left-show').removeClass(
								'nav-left-show');
					}
				}
			});

	// nav-mini切换
	$('.nav-left-top').on('click', function() {
		if (!$('.nav-left').hasClass('nav-left-mini')) {
			$('.nav-left-item.nav-left-show').removeClass('nav-left-show');
			$('.nav-left-item').children('ul').removeAttr('style');
			$('.nav-left').addClass('nav-left-mini');
			$('.route-nav').css('left', '60px');
			$('.nav-left-top').css({
				'width' : '60px',
				'padding-left' : '20px',
				'padding-right' : '20px',
			});
			$('.main').css('left', '60px');
			$('#mini').attr('class', 'left-close');
		} else {
			$('.nav-left').removeClass('nav-left-mini');
			$('.route-nav').css('left', '220px');
			$('.nav-left-top').css({
				'width' : '220px',
				'padding-left' : '100px',
				'padding-right' : '100px'
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
	$(".nav-left>nav>ul>li>ul>li>a")
			.on(
					"click",
					function() {

						$("ol.breadcrumb").empty(); // 清楚当前元素中的内容
						var title = $(this).text(); // 获取当前被点击标签的标题内容
						var parentTitle = $(this).parent().parent().prev()
								.text(); // 获取当前被点击标签的父标题内容
						$("ol.breadcrumb")
								.append(
										"<li onclick='homePage()'><a href='main.html' target='left_content'>首页</a></li><li class='active'>"
												+ parentTitle
												+ "</li><li class='active'>"
												+ title + "</li>"); // 向当前元素中添加内容

					});

	// 弹框html代码前缀
	var prefix = "<div class='modal fade in' id='modal-container-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false' "
			+ "style='display: block;'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' "
			+ "class='close' onclick='closeModel()' data-dismiss='modal' aria-hidden='true'>×</button><h4 class='modal-title' "
			+ "id='myModalLabel'>个人信息</h4></div><div class='modal-body'>";

	// 弹框html代码后缀
	var suffix = "</div><div class='modal-footer'><button "
			+ "type='button' class='btn btn-default' onclick='closeModel()' data-dismiss='modal'>退出</button> "
			+ "</div></div></div></div>";
	// 个人信息弹窗
	$("#information")
			.click(
					function() {
						$
								.ajax({
									type : "GET",
									url : "http://localhost:8080/Information_cms/user/getUserByUserName.do?username="
											+ username,
									dataType : "json",
									success : function(data) {
										var state = data.success; // 服务器响应状态
										var user = data.data; // 用户信息
										var userId = user.id;
										var username = user.username;
										var remarks = user.remarks;
										var phone = user.phone;
										var email = user.email;

										// 用户信息
										var information = "<ul class='list-group'><li class='list-group-item'>用户名:"
												+ username
												+ "</li><li class='list-group-item'>手机号:"
												+ phone
												+ "</li><li class='list-group-item'>email:"
												+ email
												+ "</li><li class='list-group-item'>备注:"
												+ remarks + "</li></ul>";

										if (!state) {
											openModel(prefix + "获取用户信息失败"
													+ suffix);
										}
										openModel(prefix + information + suffix);
									},
									error : function() {
										openModel(prefix + "获取用户信息异常，请联系管理员"
												+ suffix);
									}
								});

					});

});

// 点击路径导航首页时路径导航内容只剩下首页的方法
function homePage() {
	$("ol.breadcrumb").empty(); // 清楚当前元素中的内容
	$("ol.breadcrumb")
			.append(
					"<li id='home-page'><a href='main.html' target='left_content'>首页</a></li>"); // 向当前元素中添加内容
}
