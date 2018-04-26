/***
    @file 热文推广列表页面
    @author shubaiqiao
    @date 2016-09-06
**/

define(function (require){
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var app = require('common/app');
    var openAppWindow = require("common/openAppWindow");

    var container = $('.container');
    var lastScroHeight = $('.more-flag').position().top;

    var i;
    var next_page;
    var current;
    var loadFlag = true;



    function initDom(data) {
        lastScroHeight = $('.more-flag').position().top;
        if (window.scrollY + window.innerHeight >= lastScroHeight) {

            // 判断article
            if (loadFlag) {
                loadFlag = false;
                $('.has-more').show();
                $('.typing-loader').addClass('typing');
                $.get('/weixin-hot-article/list' + '?next_page=' + next_page, function (response) {
                    // 将获得的内容加在网页后面
                    var articleData = response.data.article;
                    // 判断article是否为空
                    if (articleData.length !== 0) {
                        var len = articleData.length;
                        var dom;
                        for (i = 0; i < len; i++) {
                            var addDom = (''
                                 +'<div class="list" data-click="30004">'
                                 +   '<div class="img">'
                                 +       '<img src=' + articleData[i].thumb + '>'
                                 +   '</div>'
                                 +   '<div class="right">'
                                 +       '<p class="title line-clamp line-clamp-2">' + articleData[i].title + '</p>'
                                 +       '<div class="info">'
                                 +          '<p class="read">' + articleData[i].read_count + '阅读</p>&nbsp;&nbsp;&nbsp;'
                                 +          '<p class="good">' + articleData[i].like_count + '赞</p>'
                                 +       '</div>'
                                 +   '</div>'
                                 +'</div>'
                            );
                            container.find('.has-more').before(addDom);
                            current = container.find('.has-more').prev();
                            (function (i) {
                                current.click(function () {
                                    if (app.isApp()) {
                                        app.openNewWindow(articleData[i].url);
                                    } else {
                                        location.href = articleData[i].url;
                                    }
                                }
                                );
                            })(i);
                        }
                        next_page++;
                        $('.has-more').hide();
                        $('.typing-loader').removeClass('typing');
                        loadFlag = true;
                    }
                    else {
                        $('.has-more').hide();
                        $('.typing-loader').removeClass('typing');
                        $('.no-more').show();
                        lastScroHeight = 10000000000;
                    }
                });
            }
        }
    }

    function initEvent(data) {
        next_page = data.next_page;
        var list = container.find('.list');
        list.each(function (k, v) {
            $(v).click(function () {
                if (app.isApp()) {
                    app.openNewWindow(data.article[k].url);
                } else {
                    location.href = data.article[k].url;
                }
            });
        });
        $(window).on('scroll', initDom);
        initDom(data);
    }

    return function (page_data){
        initEvent(page_data);

    };
});