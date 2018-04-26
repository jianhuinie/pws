/**
 * author: 评价详情页
 * data: 2017-03-15
 */

define(function (require, exports) {
    var $ = require('zepto');
    var commentList = require('common/comment/commentList');
    var commentAddition = require('common/comment/addition');
    var url = require('util/url');

    return function () {
        commentAddition.init({
            key: url().params.key,
            value: url().params.number,
            dom: $('.comment-additions'),
        });

        commentList.init({
           // key: 'ONE_ON_ONE_COURSE',
            key: url().params.key,
            value: url().params.number,
            order_by: url().params.order_by,
            //order_by: 'CREATE_TIME',
            dom: $('.comments'),
        });
    };
});