define(function (require, exports) {
    'use strict';

    var Slider = require('common/component/Slider');
    var service = require('common/service');
    var store = require('common/store');
    var lazyImage = require('common/lazyImage');
    var ClickMonitor = require('common/component/ClickMonitor');

    require('tpl!../videoList/bestList.tpl');

    require('../videoList/ad');
    require('../videoList/search');

    //初始化精品课列表
    var initBestList = function () {
        service.getHotLiveList({from: 'live_index'})
        .done(function (repsonses) {
            if (!repsonses.code) {
                var data = repsonses.data;
                $('#slider-container').append(Simplite.render('best-list', data));
                $('#slider-container .title-tabs li').eq(0).click();
            }
        });

    };

    //初始化最近直播
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

    //判断ua

    var isMacOS = function () {
        var platform = navigator.platform;
        if (platform.indexOf("Mac") > -1) {
            return true;
        } else {
            return false;
        }
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

        initBestList();
        initHotvideo();
        lazyImage.init();
        initClickMonitor();
        var user_type;
        var user_number;
        if (store.get('user')) {
            user_type = store.get('user').type;
            user_number = store.get('user').number;
        };

        if (user_type === 0 ) {
            $('.to-liveroom').attr('href', '/live/teacher_trial?number='+user_number+'');
        } else if (user_type === 2) {
            $('.to-liveroom').attr('href', 'http://www.genshuixue.com/live/teacher_trial?number=371780178');
        } else {
            $('.to-liveroom').attr('href', '/static/login?next=/static/windows');
        }


        var searchBox = $('.search-box');
        var ismac = isMacOS();
        if (ismac) {
            searchBox.find('.not-mac').hide();
            searchBox.find('.mac').show();
        }
        var bestListBox = $('.slider-container');

        bestListBox
        .on ('click', '.get-button', function (event) {
            var _this = $(this);
            if (_this.find('.icon-angle-up').length) {
                bestListBox.find('.best-content').animate({height:"0"}, 500, function () {
                    _this.html('展开精品课<i class="icon icon-angle-down"></i>');
                });
            } else {
                bestListBox.find('.best-content').animate({height:"334px"}, 500, function () {
                    _this.html('收起精品课<i class="icon icon-angle-up"></i>');
                });
            }

            event.preventDefault();
        })
        .on('click', '.title-tabs li', function() {
            var idx = $(this).data('idx');
            bestListBox.find('.title-tabs li').removeClass('active').eq(idx).addClass('active');
            bestListBox.find('.content-list ul').hide().eq(idx).show();
        });

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

    };
});

