define(function(require) {

    'use strict';

    var $ = require("zepto");
    var lazyLoadImage = require("common/lazyLoadImage");
    var openAppWindow = require("common/openAppWindow");
    var app = require("common/app");
    var setShare = require('common/share/initialize');
    var url = require("util/url");
    var env = require('util/env');
    var ui = require("common/ui");
    var liudan = require("../_part/liudan");



    return function(page_data){
        //app link
        openAppWindow.init();
        //lazy load image
        lazyLoadImage.init();
        //init slider

        liudan('third');
        var shareInfo = {
            title : '来跟谁学商学院，与最优秀的人一起成长!',
            content : '50万老师、6万机构大数据样本总结，1年时间课程打磨，业绩总和超1000亿的导师团的智慧结晶都在这里！',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/575282c3a7ddd.jpg'
        };
        setShare(shareInfo);

        openAppWindow.init();

    }
});