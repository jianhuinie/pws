/**
 * @file 班课搜索列表页模块
 * @author wuhongjie
 */
define(function (require, exports) {

    'use strict';

    var cookie = require('cobble/util/cookie');
    var store = require('common/store');
    var flag = false;

    function dateFormat(time) {
        //console.log(time);
        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;

        // 天 24*3600
        if (time > 86400) {
            day = Math.floor(time / 86400);
        }
        time %= 86400;

        if (time > 3600) {
            hour = Math.floor(time / 3600);
        }
        time %= 3600;

        if (time > 60) {
            minute = Math.floor(time / 60);
        }
        second = time % 60;

        var time_txt = (day > 9 ? day : '0' + day ) + '天' +
            (hour > 9 ? hour : '0' + hour) + '时'+
            (minute > 9 ? minute : '0' + minute) +'分' +
            (second > 9 ? second : '0' + second) +'秒';

        /*
         console.log('day'+day);
         console.log('hour'+hour);
         console.log('minute'+minute);
         console.log('sceond'+second);*/
        return time_txt;
    }

    exports.init = function () {

        var container = $("#search-list");

        container
            .on('click', '[log]', function (e) {
                var element = $(this);
                var url = 'http://click.genshuixue.com/w.gif';
                var log = element.attr('log');
                var temp = log.split(",");
                var rank = temp[0];
                var tid = temp[1];
                var qid = temp[2];
                var location = temp[3];
                var crank = element.data("crank");
                var itemId = element.data("number");
                var uid = cookie.get('__track_id__');
                var time = (new Date()).getTime();
                var uuid = store.get('user').id ? store.get('user').id : -1;
                var params = {
                    type : 'search',
                    stype : 'course',
                    rank : rank,
                    item_id: itemId ? itemId : tid,
                    tid : tid,
                    qid : qid,
                    c_rank : crank ? crank : 0,
                    location :location,
                    uid : uid,
                    t : time,
                    user_id : uuid
                } ;
                WAT.send(url,params);

            })
            .on('click','.controller-more-course .see-more',function(event){
                $(this).hide();
                $(this).parent().find('.close-more').show();
                $(this).parent().parent().parent().find('.course-item-list').find('.hide-start').addClass('show-start');
            })
            .on('click','.controller-more-course .close-more',function(event){
                $(this).hide();
                $(this).parent().find('.see-more').show();
                $(this).parent().parent().parent().find('.course-item-list').find('.hide-start').removeClass('show-start');
            });
    };
});