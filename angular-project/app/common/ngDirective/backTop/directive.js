/**
 * @file 返回顶部
 * @author hurry
 *
 * usage:
 *
 * <back-up></back-up>
 *
 */
define(function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('backTop', function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: '/src/ngDirective/backTop/tpl.html',
            link: function () {

                $(window).scroll(function () { //只要窗口滚动,就触发下面代码
                    var scrollt = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动后的高度
                    if (scrollt > 200) { //判断滚动后高度超过200px,就显示
                        $('.directives-flotage-bottom').fadeIn(400); //淡入
                    } else {
                        $('.directives-flotage-bottom').stop().fadeOut(400); //淡出，必须加上stop()停止之前动画,否则会出现闪动
                    }
                });
                $('.tip').click(function () { //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部
                    $('html,body').animate({scrollTop: '0px'}, 200);
                });

            }
        };
    });
});
