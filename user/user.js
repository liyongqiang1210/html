$(function() {

	// 1.初始化Table
	var oTable = new TableInit();
	oTable.Init();

	// 2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();

	// 添加用户弹框
	$("#btn_add")
			.on(
					"click",
					function() {
						// 弹出框标题
						var title = "添加用户";
						// 弹出框内容
						var content = "<form> <div class='form-group'> <label for='username'>用户名:</label> <input type='text' class='form-control' id='username' placeholder='请输入用户名'> </div>" +
						" <div class=' form-group'> <label for='password'>密码:</label> <input type='password' class='form-control' id='password' placeholder='请输入密码'> </div> " +
						"<div class='form-group'> <label for='password'>确认密码:</label> <input type='password' class='form-control' id='password2' placeholder='请再次输入密码'> </div>" +
						" <div class='form-group'> <label for='email'>邮箱:</label> <input type='text' class='form-control' id='email' placeholder='请输入邮箱'> </div>" +
						" <div class='form-group'> <label for='sex'>性别:</label> <input type='radio' name='sex' value='0'> 男  <input type='radio' name='sex' value='1'> 女  </div>" +
						" <div class='form-group'> <label for='phone'>手机号:</label> <input type='text' class='form-control' id='phone' placeholder='请输入手机号'> </div> </form>"
						if (window.top == window.self) { // 不存在父页面
							openModal(title,content,"","addUser()");
						} else {
							window.parent.openModal(title,content,"","addUser()");
						}

					});

	// 删除选中用户
	$("#btn_delete_select")
			.on(
					"click",
					function() {
						if (window.top == window.self) { // 不存在父页面
							openModal("删除选中用户","确认删除选中的用户吗？","btn-danger");
						} else {
							window.parent.openModal("删除选中用户","确认删除选中的用户吗？","btn-danger");
						}
					});

});

// table对象
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$('#table').bootstrapTable({
			url : 'http://localhost:8080/Information_cms/user/findAll.do', // 请求后台的URL（*）
			method : 'get', // 请求方式（*）
			toolbar : '#toolbar', // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, // 是否显示分页（*）
			sortable : true, // 是否启用排序
			sortOrder : "asc", // 排序方式
			queryParams : function(params) {
				var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
					limit : params.limit, // 页面大小
					offset : params.offset, // 页码
					username : $("#search_username").val()
				};
				return temp;
			}, // 传递参数（*）
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			pageNumber : 1, // 初始化加载第一页，默认第一页
			pageSize : 10, // 每页的记录行数（*）
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
			search : true, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch : true,
			showColumns : true, // 是否显示所有的列
			showRefresh : true, // 是否显示刷新按钮
			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height : 600, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", // 每一行的唯一标识，一般为主键列
			showToggle : false, // 是否显示详细视图和列表视图的切换按钮
			cardView : false, // 是否显示详细视图
			detailView : false, // 是否显示父子表
			columns : [ {
				checkbox : true
			}, {
				field : 'id',
				title : '用户ID'
			}, {
				field : 'username',
				title : '用户名'
			}, {
				field : 'email',
				title : '邮箱'
			}, {
				field : 'phone',
				title : '手机号'
			}, {
				field : 'sex',
				title : '性别'
			}, {
				field : 'operate',
				title : '操作',
				width : '400px',
				events : operateEvents,
				formatter : operateFormatter
			}, ]
		});
	};
	return oTableInit;

};

window.operateEvents = {
// 'click #btn_edit': function(e, value, row, index) {
// detailmodal.open();
// $("#dev_id").val(row.id);
// $("#seq_no").val(row.seq_no);
// $("#dev_pos").val(row.position);
// $("#dev_type1").val(row.type);
// $("#dev_status").val(row.status);
// $("#fault").val(row.fault);
// $("#buy_time").val(row.purchase_time);
// $("#quality_time").val(row.quality_time);
// $("#inputer").val(row.inputer);
// $("#maintain_unit").val(row.maintain_unit);
// }
};

function operateFormatter(value, row, index) {
	return [
			'<button type="button" onclick="editUser()" class="btn btn-success btn-xs">编辑</button> &nbsp;',
			'<button type="button" onclick="deleteUser()" class="btn btn-danger btn-xs">删除</button>' ]
			.join('');
}

var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};

	oInit.Init = function() {
		// 初始化页面上面的按钮事件
	};

	return oInit;
};



// 编辑用户按钮事件
function editUser() {
	if (window.top == window.self) { // 不存在父页面
		openModal();
	} else {
		window.parent.openModal();
	}
}

// 删除用户按钮事件
function deleteUser() {
	if (window.top == window.self) { // 不存在父页面
		openModal("删除用户","确认删除选中的用户吗？","btn-danger");
	} else {
		window.parent.openModal("删除用户","确认删除选中的用户吗？","btn-danger");
	}
}