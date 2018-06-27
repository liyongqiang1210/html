$(function() {

	//1.初始化Table
	var oTable = new TableInit();
	oTable.Init();

	//2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();

	// 添加用户弹框
	$("#btn_add").click(function() {
		var html = "<div class='modal fade in' id='modal-container-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false' style='display: block;'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' onclick='closeModel()' data-dismiss='modal' aria-hidden='true'>×</button><h4 class='modal-title' id='myModalLabel'>添加用户</h4></div><div class='modal-body'>内容...</div><div class='modal-footer'><button type='button' class='btn btn-default' onclick='closeModel()' data-dismiss='modal'>关闭</button> <button type='button' class='btn btn-primary'>保存</button></div></div></div></div>";

		if(window.top == window.self) { //不存在父页面
			openModel(html);
		} else {
			window.parent.openModel(html);
		}

	});

	// 编辑用户弹框
	$("#btn_edit").click(function() {
		var html = "<div class='modal fade in' id='modal-container-2' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false' style='display: block;'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' onclick='closeModel()' data-dismiss='modal' aria-hidden='true'>×</button><h4 class='modal-title' id='myModalLabel'>编辑用户</h4></div><div class='modal-body'>内容...</div><div class='modal-footer'><button type='button' class='btn btn-default' onclick='closeModel()' data-dismiss='modal'>关闭</button> <button type='button' class='btn btn-primary'>保存</button></div></div></div></div>";
		if(window.top == window.self) { //不存在父页面
			openModel(html);
		} else {
			window.parent.openModel(html);
		}
	});

	// 删除用户弹框
	$("#btn_delete").click(function() {

		var html = "<div class='modal fade in' id='modal-container-3' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false' style='display: block;'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' onclick='closeModel()' data-dismiss='modal' aria-hidden='true'>×</button><h4 class='modal-title' id='myModalLabel'>删除用户</h4></div><div class='modal-body'>确认要删除当前用户吗?</div><div class='modal-footer'><button type='button' class='btn btn-default' onclick='closeModel()' data-dismiss='modal'>关闭</button> <button type='button' class='btn btn-danger'>确认</button></div></div></div></div>";
		if(window.top == window.self) { //不存在父页面
			openModel(html);
		} else {
			window.parent.openModel(html);
		}
	});

	// 删除选中用户
	$("#btn_delete_select").click(function() {
		var html = "<div class='modal fade in' id='modal-container-4' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false' style='display: block;'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' onclick='closeModel()' data-dismiss='modal' aria-hidden='true'>×</button><h4 class='modal-title' id='myModalLabel'>删除选中用户</h4></div><div class='modal-body'>确认要删除选中的用户吗?</div><div class='modal-footer'><button type='button' class='btn btn-default' onclick='closeModel()' data-dismiss='modal'>关闭</button> <button type='button' class='btn btn-danger'>确认</button></div></div></div></div>";
		if(window.top == window.self) { //不存在父页面
			openModel(html);
		} else {
			window.parent.openModel(html);
		}
	});

});

// table对象
var TableInit = function() {
	var oTableInit = new Object();
	//初始化Table
	oTableInit.Init = function() {
		$('#table').bootstrapTable({
			url: 'http://127.0.0.1:8080/Information_cms/user/findAll.do', //请求后台的URL（*）
			method: 'get', //请求方式（*）
			toolbar: '#toolbar', //工具按钮用哪个容器
			striped: true, //是否显示行间隔色
			cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination: true, //是否显示分页（*）
			sortable: true, //是否启用排序
			sortOrder: "asc", //排序方式
			queryParams: function(params) {
				var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
					limit: params.limit, //页面大小
					offset: params.offset, //页码
					username: $("#search_username").val()
				};
				return temp;
			}, //传递参数（*）
			sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
			pageNumber: 1, //初始化加载第一页，默认第一页
			pageSize: 10, //每页的记录行数（*）
			pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
			search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch: true,
			showColumns: true, //是否显示所有的列
			showRefresh: true, //是否显示刷新按钮
			minimumCountColumns: 2, //最少允许的列数
			clickToSelect: true, //是否启用点击选中行
			height: 600, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId: "ID", //每一行的唯一标识，一般为主键列
			showToggle: false, //是否显示详细视图和列表视图的切换按钮
			cardView: false, //是否显示详细视图
			detailView: false, //是否显示父子表
			columns: [{
				checkbox: true
			}, {
				field: 'id',
				title: '用户ID'
			}, {
				field: 'username',
				title: '用户名'
			}, {
				field: 'email',
				title: '邮箱'
			}, {
				field: 'phone',
				title: '手机号'
			}, {
				field: 'sex',
				title: '性别'
			}, {
				field: 'operate',
				title: '操作',
				width: '400px',
				events: operateEvents,
				formatter: operateFormatter
			}, ]
		});
	};
	return oTableInit;

};

window.operateEvents = {
	//      'click #btn_edit': function(e, value, row, index) {  
	//          detailmodal.open();  
	//          $("#dev_id").val(row.id);  
	//          $("#seq_no").val(row.seq_no);  
	//          $("#dev_pos").val(row.position);  
	//          $("#dev_type1").val(row.type);  
	//          $("#dev_status").val(row.status);  
	//          $("#fault").val(row.fault);  
	//          $("#buy_time").val(row.purchase_time);  
	//          $("#quality_time").val(row.quality_time);  
	//          $("#inputer").val(row.inputer);  
	//          $("#maintain_unit").val(row.maintain_unit);  
	//      }  
};

function operateFormatter(value, row, index) {
	return [
		'<button id="btn_edit" type="button" class="btn btn-success btn-xs">编辑</button> &nbsp;',
		'<button id="btn_delete" type="button" class="btn btn-danger btn-xs">删除</button>'
	].join('');
}

var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};

	oInit.Init = function() {
		//初始化页面上面的按钮事件
	};

	return oInit;
};

// 关闭模态框
function closeModel() {
	closeBackdrop(); // 关闭背景幕布
	$(".in").remove(); // 移除模态框
}

// 关闭背景幕布
function closeBackdrop() {
	$(".modal-backdrop").remove();
}

// 开启背景幕布
function openBackdrop() {
	$(".div-bottom").after("<div class='modal-backdrop fade in'></div>");
}

// 添加模态框
function openModel(html) {
	openBackdrop();
	$(".div-bottom").before(html);
}