/**
 * @file 老师个人中心会员中心 详情
 * @author wuhongjie
 */
define(function (require, exports) {

    'use strict';
    var content;

    function changePage(page){
        content.find('.content-page').hide();
        content.find('.page-'+page).show();
    }

    exports.init = function (data) {
        var type = location.href.split('=')[1];
        var active = type || 'all';
        new Ractive({
            el: '#main .wrapper',
            template: require('html!./orgVipDetail.html'),
            data:{
                active : active,
                level : userData.vip_level
            }
        });
        var menu = $('.content-left');
        content = $('.content-right');
        var activeElement = menu.find('.left_menu [data-target="'+active+'"]');
        var html= '<a class="tiny link" href="/teacher_center/vip_center">会员中心</a><span class="separator">&gt;</span><a href="/teacher_center/vip_detail" class="tiny link">功能介绍</a>';
        setTimeout(function(){
            $('#breadcrumb .wrapper').html(html)
        },100)

        menu
            .on('click','.menu-title',function(e){
                var element = $(e.target);
                var page = element.attr('data-target');
                if(page){
                    activeElement.removeClass('active');
                    activeElement = element;
                    element.addClass('active');
                    changePage(page);
                    return;
                }
                if(element.find('.icon').hasClass('icon-down')){
                    element.find('.icon').removeClass('icon-down')
                }else{
                    element.find('.icon').addClass('icon-down')
                }
                element.parent().find('.menu-subs').slideToggle('slow');
            })
            .on('click', '.sub-menu-item' ,function(e){
                var element = $(e.target);
                var page = element.attr('data-target');
                activeElement.removeClass('active');
                activeElement = element;
                element.addClass('active');
                changePage(page);
            })
    };
});
