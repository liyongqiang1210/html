/*移动方法*/
function move_obj(obj,move_w,move_h,x,y,l,t,m){

  if(obj==undefined){
    alert("方法调用错误,请传入正确参数!");
    return;
  }
  move_w=(move_w==undefined||move_w=='')?$(window).width():move_w;//水平移动范围,默认浏览器可视区域宽度
  move_h=(move_h==undefined||move_h=='')?$(window).height():move_h;//垂直移动范围,默认浏览器可视区域高度
  x=(x==undefined||x=='')?1:x;//一次水平移动距离,默认1px
  y=(y==undefined||y=='')?1:y;//一次垂直移动距离,默认1px
  l=(l==undefined||l=='')?0:l;//相对于body的起始水平位置,默认0
  t=(t==undefined||t=='')?0:t;//相对于body的起始垂直位置,默认0
  m=(m==undefined||m=='')?20:m;//计时周期,单位毫秒,默认20ms

  // 移动方法
  function moving(){
    x=(l>=move_w-$(obj).width()||l<0)?-x:x;
    y=(t>=move_h-$(obj).height()||t<0)?-y:y;
    l+=x;
    t+=y;
    $(obj).css({left:l,top:t});
    if(l == move_w){

    }
  }
  
  // 设置定时执行函数(间隔m毫秒执行一次)
  var timer_move=setInterval(function () {
    moving();
  },m);

  //悬停停止运动
  $(obj).mouseover(function(){
    $(obj).find('.close').css("display","block");// 显示删除按钮
    clearInterval(timer_move); // 停止执行移动方法
  });

  //移开鼠标后继续运动
  $(obj).mouseout(function(){
    $(obj).find('.close').css("display","none");// 隐藏删除按钮
    // 重新设置定时移动函数
    timer_move=setInterval(function () {
      moving();
    },m);
  });
  
  // 为删除按钮绑定点击事件
  $(obj).on('click','.close',function () {
    //如果有嵌套子级漂浮窗,同时清除子级定时器,清理缓存
    $(obj).find('.close').trigger('mouseover');
    clearInterval(timer_move);//停止执行移动方法
    $(this).parent().remove();// 删除这个移动的div
  })
}