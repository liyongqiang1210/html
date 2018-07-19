$(function() {

	/* 用户登录 */
	$("#login")
			.click(
					function() {
						var username = $("#username").val(); // 用户名
						var password = $("#password").val(); // 密码
						var checkCode = $("#checkCode").val(); // 验证码
						var rememberMe = $("#rememberMe").prop("checked"); // 记住我

						if (username == null || username == "") {
							promptMessage("用户名不能为空。");
							return;
						} else if (password == null || password == "") {
							promptMessage("密码不能为空。");
							return;
						} else if (checkCode == "" || checkCode == null) {
							promptMessage("验证码不能为空。");
							return;
						} else {
							$(".alert").remove();
							// 异步登录
							$
									.ajax({
										type : "POST",
										url : "http://localhost:8080/Information_cms/login/toLogin.do",
										data : {
											username : username,
											password : password,
											rememberMe : rememberMe,
											checkCode : checkCode
										},
										dataType : "json",
										success : function(data) {

											var state = data.success; // 服务器响应状态
											var message = data.message; // 服务器响应的信息

											if (state) { // 登录成功，跳转到主页

												// 设置cookie
												setCookie("username",username,7);
												
												// 页面跳转到主页
												$(location)
														.prop('href',
																'http://localhost:8080/Information_cms/index.html');
											} else { // 登录失败，提示错误信息
												// 将错误信息输出到登录页面提示信息中
												promptMessage(message);
											}
										},
										error : function(data) {
											promptMessage("登录时发生错误，请联系管理员");
										}
									});
						}

					});

	/* 验证码刷新 */
	$("#updateCode").click(
			function() {
				// 此处加上随机数是为了告诉浏览器要发送一个新的请求
				$("img.checkCode").prop(
						"src",
						"http://localhost:8080/Information_cms/login/getCheckCode.do?number="
								+ Math.random());
			});
});

// 提示错误信息方法
function promptMessage(errorMessage) {
	$(".alert").remove();
	$("form")
			.prepend(
					"<div class='alert alert-danger alert-dismissable'><button type='button'"
							+ "class='close' data-dismiss='alert' aria-hidden='true'> &times;</button>"
							+ errorMessage + "</div>");
	// 2秒后删除提示信息
	setTimeout(function() {
		$(".alert").remove();
	}, 2000);
};


