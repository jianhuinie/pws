/**
 * @file 客户端右侧课程
 * @author zhangliyuan
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var JSON = require('cobble/util/json');

    exports.init = function () {

        var container = $('#main');

        container
        .on('mouseover', '.logout-link', function (e) {
            this.children[0].src = this.children[0].src.split('.png')[0]+'-hover.png';
        })
        .on('mouseout', '.logout-link', function (e) {
            this.children[0].src = this.children[0].src.split('-hover')[0]+'.png';
        })
        .on('mouseover', '.reload', function (e) {
            container.find('.hint-word').show();
        })
        .on('mouseout', '.reload', function (e) {
            container.find('.hint-word').hide();
        })
        .on('click', '.reload', function (e) {
            location.reload();
        })
        .on('click', '.enter-public-classroom', function (e) {

            var env = store.get('env');
            var user = store.get('user');

            var url = 'http://'
                       + env
                       + '.genshuixue.com/live/teacher_trial?number='
                       + user.number;

            location.href = url;

        })
        .on('click', '.enter-class', function (e) {

            var target = $(this);

            var data = target.data('online');

            location.href = data.location;

        });

        var courseInfo = container.find('.course-text');

        // $.each(courseInfo, function (index, item) {

        //     var nowDate = new Date();

        //     var startTime = (new Date($(item).data('c-time'))).getTime();

        //     var now = store.get('serverTime').getTime();

        //     var timeTill = startTime - now - 3600000;
        //     if (timeTill > 0) {
        //         setTimeout(
        //             function () {
        //                 container.find('.hint-word').show()
        //             },
        //             timeTill
        //         );
        //     }
        // });
    };

    exports.showHint = function () {
        container.find('.hint-word').show();
    }

});