/**
 * @file 活动 艺术公益
 */

define(function (require, exports) {

    'use strict';

    var VideoDialog = require('common/component/VideoDialog');
    var store = require('common/store');
    var container = $('#main');

    exports.init = function () {
        var user = store.get('user');
        /**
         * 弹出教师视频
         */
        container
        .on('click' , '.video-thumbnail' , function (e) {

            var element = $(this);
            var title = element.data('name');

            new VideoDialog({
                url: element.data('video'),
                title: title
            });

        });

        container
        .on('click', '#newspaper-taobao', function () {
            var timeStamp = (new Date()).getTime();
            var url = ''
                + 'http://click.genshuixue.com/active.gif?type=chengdu&stype=taobao'
                + '&user_id=' + user.id
                + '&_timestamp=' + timeStamp;

            var img = new Image();
            img.src = url ;
        });
    }
});