/**
 * Created by yuanye on 17/1/11.
 */
define(function(require, exports) {
    "use strict";

    var $ = require('zepto');
    var app = require('common/app');
    var ui = require('common/ui');
    var env = require('util/env');

    var searchUrl = location.origin + '/invite-card/courseList';
    var viewUrl = location.origin + '/invite-card/image?';
    var ls = window.localStorage;
    // DOM
    var form;
    var name;
    var begin;
    var end;
    var courseNum;
    var courseType;
    var quota;

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

    // 清除时间
    function clearTime() {
        begin.val('');
        end.val('');
        begin.next('.right-info').addClass('arrow').text('>');
        end.next('.right-info').addClass('arrow').text('>');
        ls.removeItem('begin');
        ls.removeItem('end');
    }

    // 发布邀请卡页面表单验证
    function validate() {
        form.on('submit', function (e) {
            e.preventDefault();
        });

        $('#submit').on('click', function (e) {
            var nameVal = name.val();
            var beginVal = begin.val();
            var endVal = end.val();
            var courseNumVal = courseNum.val();
            var courseTypeVal = courseType.val();
            var quotaVal = quota.val();
            var today = Date.parse(new Date().toDateString());
            var bgTime = Date.parse(beginVal);
            var edTime = Date.parse(endVal);
            // 活动时长
            var timeSpan = (edTime - bgTime) / (1000 * 60 * 60 * 24);
            // 验证表单
            if (!courseNumVal) {
                myAlert('请选择免单课程');
                e.preventDefault();
            }
            else if (!nameVal) {
                myAlert('请输入活动名称');
                e.preventDefault();
            }
            else if (nameVal.length > 20) {
                myAlert('输入活动名称过长');
                name.val('');
                e.preventDefault();
            }
            else if (!beginVal || !endVal) {
                if (!beginVal) {
                    myAlert('请输入开始时间');
                }
                else if (!endVal) {
                    myAlert('请输入结束时间');
                }
                e.preventDefault();
            }
            else if (bgTime > edTime) {
                myAlert('结束时间不能早于开始时间');
                e.preventDefault();
                // 不正确的时间清除
                clearTime();
            }
            else if (bgTime < today) {
                myAlert('开始时间过早');
                e.preventDefault();
                // 不正确的时间清除
                clearTime();
            }
            else if (timeSpan > 30) {
                myAlert('活动时间不能超过30天');
                e.preventDefault();
                // 不正确的时间清除
                clearTime();
            }
            else if (!quotaVal) {
                myAlert('请选择最低邀请人数');
                e.preventDefault();
            }
            else if (quotaVal < 1 || quotaVal > 10) {
                myAlert('最低邀请人数只能是1到10人');
                quota.val(3);
                e.preventDefault();
            }
            else {
                beginVal += ' 00:00:00';
                endVal += ' 23:59:59';
                // hurry: 把空格替换为%20，ios有空格不支持
                viewUrl += ''
                    + 'name=' + encodeURIComponent(nameVal)
                    + '&quota=' + quotaVal
                    + '&begin_time=' + beginVal.replace(/ /g, '%20')
                    + '&end_time=' + endVal.replace(/ /g, '%20')
                    + '&course_number=' + courseNumVal
                    + '&course_type=' + courseTypeVal
                    + '&theme=' + 0;
                /*
                yuanye: 由于ios老师端点击native返回按钮是不刷新页面的,因此无法更新本地存储的数据.
                所以ios端跳转到预览页暂时使用location.href来跳转,并且在ios端点击native返回按钮相当于
                history.back,从而刷新页面
                 */
                if (env.os.isIOS) {
                    location.href = viewUrl;
                }
                else {
                    goUrl(viewUrl);
                }
            }
        });
    }

    // 编辑邀请卡页面表单所有绑定
    function inputBind() {
        // 表单验证
        validate();
        // 所有表单事件绑定
        form.on('click', function (e) {
            var self = $(e.target);
            if (self.attr('id') === 'searchClass' || self.parent().attr('id') === 'searchClass') {
                // 进入课程搜索页
                /*
                 yuanye: 由于ios老师端点击native返回按钮是不刷新页面的,因此无法更新本地存储的数据,
                 而安卓默认会刷新,所以暂时先用location.href来跳页,以达到刷新页面的目的.
                 后期等ios写好刷新页面的jockey后,再改成用jockey跳转.
                 */
                location.href = searchUrl;
            }
            else if (self.attr('name') === 'quota') {
                // yuanye: ios浏览器及webview不支持select()方法
                if (env.browser.name == 'iOS Webview') {
                    self[0].setSelectionRange(0,40);
                }
                else {
                    self[0].select();
                }
            }
            
        });

        name.on('input', function () {
            var self = $(this);
            if (self.val().length !== 0) {
                self.css('text-align', 'left');
            }
            else {
                self.css('text-align', 'right');
            }
        });

    }

    // 获取本地存储的所有表单数据并显示到表单上
    function getData() {
        var course = ls.getItem('course')
                   ? JSON.parse(ls.getItem('course'))
                   : undefined;
        quota.val(ls.getItem('quota') || 3);
        if (ls.getItem('name')) {
            name.css('text-align', 'left');
            name.val(ls.getItem('name'));
        }
        if (ls.getItem('begin')) {
            begin.val(ls.getItem('begin'));
            begin.next('.right-info').removeClass('arrow').text(ls.getItem('begin'));
        }
        if (ls.getItem('end')) {
            end.val(ls.getItem('end'));
            end.next('.right-info').removeClass('arrow').text(ls.getItem('end'));
        }
        if (course) {
            courseNum.val(course.courseNumber);
            courseType.val(course.courseType);
            $('#searchClass .right-info').text(course.courseName);
            (name.val().length === 0) && name.val(course.courseName);
        }
        else {
            courseNum.val('');
            courseType.val('');
        }
    }

    // 用户输入信息后将数据保存至本地存储
    function setData() {
        form.on('change', function (e) {
            var target = $(e.target);
            var info = $(target.next('.right-info')[0]);

            if (target[0].type === 'date') {
                var time = target[0].value;
                if (time) {
                    if (target[0].name == 'begin_time') {
                        info.removeClass('arrow').text(time);
                        ls.setItem('begin', time);
                    } else if (target[0].name == 'end_time') {
                        info.removeClass('arrow').text(time);
                        ls.setItem('end', time);
                    }
                }
                else {
                    if (target[0].name == 'begin_time') {
                        info.addClass('arrow').text('>');
                        ls.removeItem('begin');
                    } else if (target[0].name == 'end_time') {
                        info.addClass('arrow').text('>');
                        ls.removeItem('end');
                    }
                }
            }
            else {
                (target[0].name === 'name') && ls.setItem('name', target.val());
                (target[0].name === 'quota') && ls.setItem('quota', target.val());
            }
        });
    }

    return function () {
        form = $('form[name="publish"]');
        name = form.find('[name="name"]');
        begin = form.find('[name="begin_time"]');
        end = form.find('[name="end_time"]');
        courseNum = form.find('[name="course_number"]');
        courseType = form.find('[name="course_type"]');
        quota = form.find('[name="quota"]');
        inputBind();
        setData();
        getData();

        $('.container').css('height', window.innerHeight);
        $('#submit').css('visibility', 'visible');
    }

});