/**
 * @file 搜狗导航页
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var head = require('./sougou/head');
    var ad = require('./sougou/ad');
    var store = require('common/store');
    var juhuixue = require('./sougou/juhuixue');
    var studyall = require('./sougou/studyall');

    exports.init = function () {
        // 给搜狗页面高度
        var height = $('#main').height();
        if (store.get('site') && store.get('site') == 'qq') {
            $('#main').append('<iframe id="proxy" src="http://hao.qq.com/qita/proxy.html#'+height+'px"></iframe>');
        } else {
            $('#main').append('<iframe id="proxy" src="http://123.sogou.com/qita/proxy.html#'+height+'px"></iframe>');
        }
        // 初始化头部
        head.init();
        // 初始化广告
        ad.init();
        // 聚会学
        juhuixue.init();
        // 学习头条全部
        studyall.init();
    };

});