define(function (require, exports) {
    'use strict';

    var Slider = require('common/component/Slider');
    var lazyImage = require('common/lazyImage');
    var ClickMonitor = require('common/component/ClickMonitor');
    var store = require('common/store');
    var service = require('common/service');

    require('../videoList/ad');
    require('../videoList/search');

    
    //初始化热门视频
    var initHotvideo = function () {
        var container = $('.hot-video');
        var len = container.find('.scroll-list-box .list').length;
        new Slider({
            element: $('.hot-video'),
            itemSelector: '.scroll-list-box .list',
            prevSelector: '.icon-chevron-left',
            nextSelector: '.icon-chevron-right',
            autoPlay: false,
            loop: false,
            duration: 5000,
            delay: 8000,
            onChange: function (event, data) {
                var from = data.form;
                var to = data.to;
                if (to == 0) {
                    container.find('.icon-chevron-left').addClass('disable');
                    container.find('.icon-chevron-right').removeClass('disable');
                } else if (to == len - 1) {
                    container.find('.icon-chevron-right').addClass('disable');
                    container.find('.icon-chevron-left').removeClass('disable');
                } else {
                    container.find('.icon-chevron-left').removeClass('disable');
                    container.find('.icon-chevron-right').removeClass('disable');
                }
            }
        });
    };


    function initClickMonitor() {

        var defaultParams = {
            type: 'search',
            stype: 'course_recommend'
        };
        gsx_ready( function (config) {
            defaultParams.uid = config.log[1];
        });

        var interceptor = function (ele) {
            var params = {};
            
            while (ele) {
                var keyFlag = 'monitor';
                var allData = ele.data();
                var tempKey;
                for (var key in allData){
                    if (key.indexOf(keyFlag) === 0) {
                        tempKey = key.substring(keyFlag.length).toLowerCase();
                        //有的参数名需要用下划线连接
                        var datas = (allData[key] + '').split('|');
                        if (datas.length > 1) {
                            tempKey = tempKey + '_' + datas[0];
                            allData[key] = datas[1];
                        }
                        if (tempKey) {
                            if (params[tempKey]) {
                                params[tempKey] = allData[key] + '.' + params[tempKey];
                            } else {
                                params[tempKey]= allData[key];
                            }
                        }
                    }
                }
                if (ele[0].tagName == 'BODY') {
                    break;
                } else {
                    ele = ele.parent();
                }
            }
            
            params.t = new Date().getTime();
            return params;
        };

        return new ClickMonitor({
            selector: '.click-monitor',
            monitorUrl: ' //click.genshuixue.com/w.gif',
            defaultParams: defaultParams,
            useDataHref: false,
            isSend: store.get('env') === 'www',
            interceptor: interceptor
        });
    };

    exports.init = function () {
        var contents = $('.contents');
        initHotvideo();
        lazyImage.init();
        initClickMonitor();
        var likeVideoBox = $('.like-video');
        likeVideoBox
        .on('click', '.tabs li', function () {
            var idx = $(this).data('idx');
            likeVideoBox.find('.tabs li').removeClass('active').eq(idx).addClass('active');
            likeVideoBox.find('.rank-list').hide().eq(idx).show();
        })
        .on('click', '.refresh', function () {
            var showul = likeVideoBox.find('.list:visible').hide();
            if (showul.next().length) {
                showul.next().show();
            } else {
                likeVideoBox.find('.list').eq(0).show();
            }

        });
        likeVideoBox.find('.rank-item').hover(function () {
            $(this).addClass('active').siblings('.rank-item').removeClass('active');
        });
        contents
        .on('click', '.button-no', function (e) {
            var target = $(e.currentTarget);
            var number = target.data('number');
            var videoUrl = target.data('videourl');
            service
                .checkBlackList({
                    course_type: 3,
                    course_number: number
                })
                .then(function (response) {
                    if (response.data.black_list_limited) {
                        alert({
                            title: '温馨提示',
                            content: '抱歉，老师已将您加入黑名单，暂时无法购买该老师的课程'
                        });
                    }
                    else {
                        window.open(videoUrl);
                    }
                });
        });
    };
});