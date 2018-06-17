$(function(){
    // nav-left收缩展开
    $('.nav-left-item>a').on('click',function(){
        if (!$('.nav-left').hasClass('nav-left-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-left-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('nav-left-show').siblings('li').removeClass('nav-left-show');
            }else{
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.nav-left-item.nav-left-show').removeClass('nav-left-show');
            }
        }
    });
    //nav-left-mini切换
    $('#mini').on('click',function(){
        if (!$('.nav-left').hasClass('nav-left-mini')) {
            $('.nav-left-item.nav-left-show').removeClass('nav-left-show');
            $('.nav-left-item').children('ul').removeAttr('style');
            $('.nav-left').addClass('nav-left-mini');
            $('.content-main').css("left","60px");
            $('.route-nav').css("left","60px");
        }else{
            $('.nav-left').removeClass('nav-left-mini');
            $('.content-main').css("left","220px");
            $('.route-nav').css("left","220px");
        }
    });
});