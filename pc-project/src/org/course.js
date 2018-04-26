/**
 * @file 机构班课
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var base = require('./common/base');
    var courseMap = require('common/map/baidu');
    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');
    var path = $('.path');
    var courseTab = $('.course-tab');
    var tianxiaoLog = require('common/tianxiaoLog');

    var mapHash = {};

    function dateFormat(time) {
        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;

        // 天 24*3600
        if (time > 86400) {
            day = Math.floor(time / 86400);
        }
        time %= 86400;

        if (time > 3600) {
            hour = Math.floor(time / 3600);
        }
        time %= 3600;

        if (time > 60) {
            minute = Math.floor(time / 60);
        }
        second = time % 60;

        var time_txt = (day > 9 ? day : '0' + day ) + '天' +
                       (hour > 9 ? hour : '0' + hour) + '时'+
                       (minute > 9 ? minute : '0' + minute) +'分' +
                       (second > 9 ? second : '0' + second) +'秒';

                       /*
        console.log('day'+day);
        console.log('hour'+hour);
        console.log('minute'+minute);
        console.log('sceond'+second);*/
        return time_txt;
    }

    exports.init = function () {

        var container = $('#org-course');

        base.init();
        tianxiaoLog.send(store.get('orgnumber'), 'courseList');

        container
        .on('click', '[data-address]', function (e) {

            var target = $(e.currentTarget);
            var index = target.data('index');

            if (mapHash[index]) {
                mapHash[index].show();
            } else {
                var address = target.data('address');
                var offline =  target.data('offline');
                var map = '<div id="course-map-'+index+'" style="height:400px;"></div>';
                mapHash[index] = new Dialog({
                    title: '上课地点',
                    content: map,
                    disposeOnHide: false,
                    width: 600,
                    onAfterShow: function(){
                        if (offline.lng) {
                            courseMap.modifiedAddress('course-map-'+index, offline.lng, offline.lat);
                        } else {
                            courseMap.search('course-map-'+index, address);
                        }
                    }
                });
            }

            return;
        });

        courseTab
        .on('click', '.btn', function () { // 搜索
            var q = $.trim(courseTab.find('.search-input').val());
            var course_type = store.get('course_type');
            if (/new_course/.test(location.pathname)) {
                var url = '/i/new_course/' + store.get('domain');
            }
            else {
                var url = '/i/course/' + store.get('domain');
            }

            if (course_type == 2) {
                if (/new_course/.test(location.pathname)) {
                    var url = '/i/new_course/' + store.get('domain') + '?type=2'
                }
                else {
                    var url = '/i/course/' + store.get('domain') + '?type=2'
                }
                if (q) {
                    url += '&q='+encodeURIComponent(q);
                }
            } else if (course_type == 11) {
                // 机构一对一
                if (q) {
                    url += '?q=' + encodeURIComponent(q) + '&type=11';
                }
            } else if (course_type == 12) {
                // 机构班课
                if (q) {
                    url += '?q=' + encodeURIComponent(q) + '&type=12';
                }
            }
            else {
                if (q) {
                    url += '?q='+encodeURIComponent(q);
                }
            }

            location.href = url ;
        })
        .on('keyup', '.search-input', function (e) {
            var element = $(this);
            var text = $.trim(element.val());
            var placeholder = courseTab.find('.placeholder');
            var placeholderText = '请输入课程名称/编号';
            var searchForm = courseTab.find('.search-form');

            if (text !== '') {
                placeholder.hide();
            } else {
                var course_type = store.get('course_type');
                if (course_type == 2) {
                    placeholderText = '请输入视频课名称/编号'
                }
                placeholder.show();
                placeholder.html(placeholderText);
            }
            if ( e.keyCode === 13 ) {
                courseTab.find('.btn').click();
            }

        })
        .on('click', '.search-input', function (e) {
            var text = $.trim(courseTab.find('.search-input').val());
            var course_type = store.get('course_type');
            var placeholderText = '请输入课程名称/编号';
            var placeholder = courseTab.find('.placeholder');
            if (text !== '') {
                placeholder.hide();
            } else {
                if (course_type == 2) {
                    placeholderText = '请输入视频课名称/编号'
                }
                placeholder.show();
                placeholder.html(placeholderText);
            }
        })
        // 点击placeholder让输入框获取焦点
        .on('click', '.placeholder', function () {
            courseTab.find('.search-input').focus();
        })
        // 如果用户输入空格或连续空格则placeholder显示
        // 否则placeholder隐藏
        .on('change', '.search-input', function () {
            var element = $(this);
            var text = $.trim(element.val());
            var placeholder = courseTab.find('.placeholder');
            var placeholderText = '输入课程名称或课程编号';
            var searchForm = courseTab.find('.search-form');

            if (text !== '') {
                placeholder.hide();
            } else {
                var q = $.trim(courseTab.find('.search-input').val());
                var course_type = store.get('course_type');
                placeholderText = '请输入课程名称/编号';
                if (course_type == 2) {
                    placeholderText = '请输入视频课名称/编号'
                }

                placeholder.show();
                placeholder.html(placeholderText);
            }
        })

        var priceTip = container.find('.price-tip');
        if (priceTip.length > 0) {

            priceTip.each(function(i, item){
                var element = $(item);
                var cur = null,
                    begin = null,
                    end = null,
                    left = null,
                    time = element.find('.time');

                if (element.hasClass('price-tip-begin')) {
                    cur = element.data('cur');
                    begin = element.data('start');
                    left = begin - cur;
                    var interval = setInterval(function(){
                        time.html( dateFormat(--left) );
                        if (left == 0) {
                            clearInterval(interval);
                        }
                    },1000);
                }

                if (element.hasClass('price-tip-end')) {
                    cur = element.data('cur');
                    end = element.data('end');
                    left = end - cur;
                    var interval = setInterval(function(){
                        time.html( dateFormat(--left) );
                        if (left == 0) {
                            clearInterval(interval);
                        }
                    },1000);
                }
            })

        }
    };
});