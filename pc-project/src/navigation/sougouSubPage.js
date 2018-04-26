/**
 * @file 搜狗导航页
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var head = require('./sougou/head');
    var juhuixue = require('./sougou/juhuixue');
    var slider = require('./sougou/slider');
    var store = require('common/store');
    var service = require('common/service');
    var NavigationAd = require('common/component/NavigationAd');
    var CallingDialog = require('common/component/CallingDialog');
    var container = $('#main');
    var hashMap = {
        cglx: {
            activity: [72,73,74,75],
            slider: [69]
        },
        zxx: {
            activity: [76,77,78,79],
            slider: [70]
        },
        ytxq: {
            activity: [80,81,82,83],
            slider: [71]
        }
    }

    exports.init = function () {

        var section;
        var page_type = store.get('page_type');
        if (page_type) {
            if (page_type == 'zxx') {
                section = hashMap['zxx'];
            }
            if (page_type == 'ytxq') {
                section = hashMap['ytxq'];
            }
            if (page_type == 'cglx') {
                section = hashMap['cglx'];
            }
        }

        // 轮播图
        new NavigationAd({
            ele: $('.promotion-slider-container'),
            adIds: section['slider'],
            page_type: page_type,
            callback : function(){
                // 轮播图
                slider.init();
            }
        });
        // 热门活动
        new NavigationAd({
            ele: $('#hotactivity'),
            tpl: 'activity',
            page_type: page_type,
            adIds: section['activity']
        });

        // 给搜狗页面高度
        var height = $('#main').height();
        if (store.get('site') && store.get('site') == 'qq') {
            $('#main').append('<iframe id="proxy" src="http://hao.qq.com/qita/proxy.html#'+height+'px"></iframe>');
        } else {
            $('#main').append('<iframe id="proxy" src="http://123.sogou.com/qita/proxy.html#'+height+'px"></iframe>');
        }
        // 初始化头部
        head.init();

        $('.bestorg .communicate').on('click', function (e) {
            var callingElement = $(this);
            new CallingDialog(callingElement.data());
        });

        container
        .on('mouseenter', '.course-nav li', function(e){
            var element = $(this);
            var id = element.data('cat');
            var parent = element.parent().parent();
            var list = parent.parent().find('.course-content .list');
            var targetList = parent.parent().find('.course-content .catlist'+id);
            parent.find('li').removeClass('active');
            element.addClass('active');
            list.hide();
            targetList.show();

            if (!targetList.find('li')[0]) {
                service
                .getSougouCourseList({
                    id: id
                })
                .done(function (response) {
                    if (response.code === 0) {
                        var tpl = response.data.tpl;
                        targetList.html(tpl);
                    }
                });
            }
        });
    };

});