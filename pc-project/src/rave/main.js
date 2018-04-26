/**
 * @file 6.16活动主场
 * @author zengcheng
 *
 */
define(function (require, exports) {

    var store = require('common/store');
    var service = require('common/service');
    var Popup = require('cobble/helper/Popup');
    var cookie = require('cobble/util/cookie');
    var Round = require('./round');
    var seckill = require('./seckill');
    var orgcoupon = require('./orgcoupon');
    var special = require('./special');
    var ScrollSpy = require('./scrollspy');

    var RAVE_SHOW_TIMES = 'raveshowtimes';


    exports.init = function () {

        var host = cookie.get('activity_birthday_url_sub');

        //进过活动页不在浮层显示
        cookie.set(RAVE_SHOW_TIMES, 3);

        //修改logo的跳转
        $('#header .logo').attr('href', 'http://genshuixue.com')

        //初始化旋转特效
        var round = new Round({
            element: $('#raveRound')
        });

        if (typeof host === "undefined") {
             service.setActicityCookies()
                .done(function () {
                    round.bindHost(cookie.get('activity_birthday_url_sub') || (store.get('rave_activity_host') + '/sub?'));
                });
        }
        else {
            round.bindHost(host || (store.get('rave_activity_host') + '/sub?'));
        }

        //初始化秒杀活动区
        seckill.init();

        //初始化机构优惠
        orgcoupon.init();

        //初始化爆品课程的秒杀
        special.init();

        //初始化滚动条件
        var scrollSpy = new ScrollSpy(
            {
                scrollbar: $('.rave_nav .rave-nav-wrapper'),
                min: $('#excellent-course-wrapper').offset().top - $(window).height() + 120
            }
        );

        //百度分享
        new Popup({
            element: $('.rave_share_btn'),
            layer: $('.rave_share_btn').find('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 20
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });
    };
});