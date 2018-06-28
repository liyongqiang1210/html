$(function(){
    // nav收缩展开
    $('.nav-left-item>a').on('click',function(){
        if (!$('.nav-left').hasClass('nav-left-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-left-item').children('ul').slideUp(200);
                $(this).next('ul').slideDown(200);
                $(this).parent('li').addClass('nav-left-show').siblings('li').removeClass('nav-left-show');
            }else{
                //收缩已展开
                $(this).next('ul').slideUp(200);
                $('.nav-left-item.nav-left-show').removeClass('nav-left-show');
            }
        }
    });
    //nav-mini切换
    $('.nav-left-top').on('click',function(){
        if (!$('.nav-left').hasClass('nav-left-mini')) {
            $('.nav-left-item.nav-left-show').removeClass('nav-left-show');
            $('.nav-left-item').children('ul').removeAttr('style');
            $('.nav-left').addClass('nav-left-mini');
            $('.route_nav').css('left','60px');
            $('.nav-left-top').css({'width':'60px','padding-left':'20px','padding-right':'20px'});
            $('.main').css('left','60px');
        }else{
            $('.nav-left').removeClass('nav-left-mini');
            $('.route_nav').css('left','220px');
             $('.nav-left-top').css({'width':'220px','padding-left':'100px','padding-right':'100px'});
              $('.main').css('left','220px');
        }
    });

    
});