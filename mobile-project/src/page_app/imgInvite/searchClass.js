/**
 * Created by yuanye on 17/1/11.
 */
define(function(require, exports) {
    "use strict";

    var $ = require('zepto');
    var app = require('common/app');
    var ui = require('common/ui');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var fixTab = require('common/fixTab/fixTab');
    var template = require('artTemplate');
    var courseRender = template.compile(require('text!./courseList.tpl'));

    var ls = window.localStorage;
    var courseContainer;
    var cancel;
    var confirm;

    var inputUrl = location.origin + '/invite-card/input';
    /* 
     * alert函数
     * 唯一参数 text: String(显示文本)
     */
    function myAlert(text) {
        ui.alert({
            content: text
        });
    }
    /* 
     * 跳转函数
     * 唯一参数 url: String(跳转url)
     */
    function goUrl(url) {
        if (app.isApp()) {
            app.openNewWindow(url);
        }
        else {
            location.href = url;
        }
    }
    
    // 课程搜索页课程列表点击事件
    function courseListBind() {
        courseContainer.on('click', '.course', function () {
            var self = $(this);
            var icon = self.find('.middle .icon');
            var course;
            if (icon.css('opacity') != 0) {
                icon.css('opacity', 0);
                ls.removeItem('course');
                cancel.removeClass('hide');
                confirm.addClass('hide');
            }
            else {
                self.siblings('.course').find('.middle .icon').css('opacity', 0);
                self.find('.middle .icon').css('opacity', 1);
                course = {
                    courseNumber: self.data('number'),
                    courseType: self.data('type'),
                    courseName: self.find('.course-name').text()
                };
                course = JSON.stringify(course);
                ls.setItem('course', course);
                confirm.removeClass('hide');
                cancel.addClass('hide');
            }
        });
    }

    /* 
     * 请求课程函数
     * 参数 val: String(请求参数)
     */
    function getCourse(val) {
        var param = {};

        if (val) {
            param['search'] = val;
        }

        service.get('/invite-card/courseList', param, function (res) {
            if (res.code == 0) {
                if (res.data.course.length > 0) {
                    var courseArr = res.data.course;
                    var course = courseRender({data: courseArr});
                    courseContainer.find('.course-list').html(course);
                    getSelected();
                    lazyLoadImage.init();
                }
                else {
                    myAlert('没有可用的课程，请先进入[首页-课程管理]开课。');
                }
            }
        });
    }

    // 课程搜索所有事件绑定
    function courseBind() {
        var search = courseContainer.find('.search');
        // 输入框
        var goSearch = search.find('#goSearch');
        // 搜索按钮
        var doSearch = search.find('.doSearch');
        // 课程列表点击事件
        courseListBind();
        // 头部搜索点击事件
        doSearch.on('click', function (e) {
            getCourse(goSearch.val());
        });

        goSearch
            .on('input', function (e) {
                var value = goSearch.val();
                if (value.length > 0) {
                    doSearch.addClass('active');
                }
                else {
                    doSearch.removeClass('active');
                }
            })
            .on('keyup', function (e) {
                var value = goSearch.val();
                if (e.keyCode == 13) {
                    getCourse(value);
                }
            });

        /*
         yuanye: 由于ios老师端点击返回按钮是不刷新页面的,因此无法更新本地存储的数据,
         而安卓默认会刷新,所以暂时先手动history.back,以达到刷新页面的目的. 
         但问题是安卓中点击native的返回会一下返回到列表页,
         后期等ios写好刷新页面的jockey后,再改成用jockey跳转.
         */
        cancel.click(function () {
            history.back();
        });
        confirm.click(function () {
            history.back();
        });
    }

    // 获取已选择的课程
    function getSelected() {
        if (ls.getItem('course')) {
            var courseNumber = JSON.parse(ls.getItem('course')).courseNumber;
            $('.course').each(function (index, ele) {
                if (ele.dataset['number'] == courseNumber) {
                    $(ele).find('.middle .icon').css('opacity', 1);
                    cancel.addClass('hide');
                    confirm.removeClass('hide');
                }
            });
        }
    }


    return function () {
        app.isOrgApp() && $('.search .tip').text('注：仅支持售卖中的机构视频课');
        courseContainer = $('.course-container');
        cancel = courseContainer.find('.search .cancel');
        confirm = courseContainer.find('.search .confirm');

        courseBind();
        fixTab($('.course-container .search')[0]);
        getSelected();
        lazyLoadImage.init();
    }
});