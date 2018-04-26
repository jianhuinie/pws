/**
 * @file 机构黑板报详情页
 * @author zhangliyuan
 */
define(function (require, exports) {

    'use strict';

    var base = require('./common/base');
    var report = require('./common/report');
    var store = require('common/store');
    var service = require('common/service');
    var container = $('#main');
    var tianxiaoLog = require('common/tianxiaoLog');

    var screenwidth = window.screen.width;

    exports.init = function () {

        base.init();
        var support = container.find("#support");
        var liker = support.find(".icon-thumbs-up"); // 手指icon
        var peopleNum = support.find(".people-num");
        container
        .on('click','#support',function (e){

            var favored = support.data('favored');
            service
            .createSuport({
                board_id: store.get('blackBoradId'),
                action: favored
            })
            .done(function (response) {
                if (response.data.succ) {
                    var data = response.data;
                    var num = peopleNum.data('num');

                    if (favored == 'like') { // 点赞

                        support.data('favored', 'unlike');
                        liker.addClass("like").removeClass("unlike");

                        num = num + 1;
                        peopleNum.data('num', num);
                        peopleNum.text(num);

                    } else if (favored == 'unlike') { // 取消赞

                        support.data('favored', 'like');
                        liker.addClass("unlike").removeClass("like");

                        num = num - 1;
                        if (num < 0) {
                            num = 0;
                        }
                        peopleNum.data('num', num);
                        peopleNum.text(num);

                    }
                }
            });

        });
        report.init();
        
        tianxiaoLog.send(store.get('orgnumber'), 'blackboard', store.get('blackBoradId'));

        // var boardWidth = screenwidth * 0.8;
        // container.css('width', boardWidth);

    }


});