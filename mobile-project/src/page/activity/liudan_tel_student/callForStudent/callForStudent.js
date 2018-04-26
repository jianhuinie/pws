/*
 * @file 兴趣问答页面
 * @author caoying
 * @date 2016-03-08
 * */

define(function(require) {
    'use strict';
    var $ = require("zepto");
    var lazyLoadImage = require('common/lazyLoadImage');
    var locked = false;
    var ui = require("common/ui");
    var wt = 30;
    var lastSeconds = wt;

    return function(page_data) {
        lazyLoadImage.init();
        var me = $('.call-btn');

        function roolBtn() {
            setTimeout(function() {
                lastSeconds--;
                if (lastSeconds >= 0) {
                    me.html('正在呼叫...（' + lastSeconds + 's）');
                    roolBtn();
                } else {
                    me.html('免费重新通话').removeClass('dis_btn');
                    lastSeconds = wt;
                    locked = false;
                }
            }, 1000);
        }
        me.on('click', function() {
            if (locked) {
                return;
            }
            locked = true;
            $(this).html('正在呼叫...');
            var me = $(this);
            var $ctip = $('.call-tip');
            $ctip.html('请稍候...');
            $.ajax({
                url: '/opportunity/third_call_post',
                type: 'post',
                data: {
                    dispatch_id: page_data.dispatch_id
                },
                success: function(res) {
                    if (res.code && res.msg) {
                        $ctip.html(res.msg).addClass('red');
                        me.html('免费通话');
                        locked = false;

                    } else {
                        $ctip.html('正在为您呼叫，请留意跟谁学回拨电话');

                        me.html('正在呼叫...（' + lastSeconds + 's）').addClass('dis_btn');
                        roolBtn();
                    }
                }
            });
        })

    }
});