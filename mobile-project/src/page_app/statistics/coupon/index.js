/**
 * @file   提供app使用的优惠券页面
 * @author hurry
 * @data   2017/1/18
 * @description 
 *     url: http://m.genshuixue.com/page/statistics/coupon/index
 *     @params {string} sourceNum 老师或者机构number
 *     @params {string} courseNum  课程number
 *     @params {string} userRole  用户角色：6-机构
 */
define(function(require, exports) {
    'use strict';

    var $ = require('zepto');
    var coupon = require('common/component/coupon/coupon');
    var urlUtil = require('util/url_v2');
    var Loading = require('common/ui/Loading/index');

    return function () {
        var query = urlUtil.parseQuery(location.search);
        var loading = new Loading();
        loading.show();
        coupon
            .init({
                teacher_number: query.sourceNum,
                course_number: query.courseNum,
                user_role: query.userRole
            },  $('.container'))
            .then(function () {
                loading.destroy();
                $('.coupon-container-box .title-line').hide();
            });
    };
});