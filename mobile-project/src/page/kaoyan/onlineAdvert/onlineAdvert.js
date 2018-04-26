/**
 * Created by chenmo on 16/4/21.
 */
define(function (require) {
    'use strict';

    var $ = require('zepto');

    var lazyLoadImage = require('common/lazyLoadImage');
    //var setShare = require('common/share/initialize');
    var ui = require('common/ui');
    var service = require("common/service");
    var url = require('util/url');
    var env = require('util/env');

    var container = null;
    var shareUrl = location.href;
    var TYPE_VIDEO_COURSE = url().params.type || 3;
    var TYPE_ONLINE_COURSE = 2;

    function renderPage() {
        var renderData = {
            "teacher_info": {
                "avatar": require.toUrl("./images/ckz.jpeg"),
                "name": "陈正康",
                "introduce": "全国12大核心城市考研英语首席主讲名师，8年考研英语辅导经验，考研英语少壮派旗帜，独创点线面题四位一体英语教学法，深受万千学子爱戴。"
            },
            "course_info": {
                "title": "2017考研英语词汇视频课",
                "content": "陈老师自创的词根词源记忆法，帮助考生掌握单词记忆方法与技巧，提高复习效率, 快速突破；以及考研词汇分频记忆的方法，高效锁定常考词汇。",
                "original_price": "98.00"
            }
        };

        var teacherHtml;
        var courseHtml;
        var teacherInfo = renderData.teacher_info;
        var courseInfo = renderData.course_info;
        teacherHtml = '<div class="avatar">'
                    +       '<img width="100%" height="100%" data-src="' + teacherInfo.avatar + '">'
                    + '</div>'
                    + '<div class="introduce">'
                    +       '<div class="teacher-name">' + teacherInfo.name + '</div>'
                    +       '<div class="intro-content text-ellipse">' + teacherInfo.introduce + '</div>'
                    + '</div>';
        courseHtml =  '<div class="title text-ellipse">'
                    +       courseInfo.title
                    + '</div>'
                    + '<div class="course-content text-ellipse">'
                    +       courseInfo.content
                    + '</div>'
                    + '<div class="price">'
                    +       '<span class="original">原价：￥' + courseInfo.original_price + '，</span>'
                    +       '<span class="current-price">'
                    +           '现免费领取'
                    + '     </span>'
                    + '</div>';

        container.find('.teacher-info').html(teacherHtml);
        container.find('.course-info').html(courseHtml);
        lazyLoadImage.init();
    }

    //function setShareInfo() {
    //    var options = {
    //        title: "李永乐送课!!!280元线代基础班免费领",
    //        content: "2017考研数学线代基础班免费给你!下载“跟谁学考研”APP，百场直播讲座、千门免费视频，基础、强化、冲刺、押题，都你不可错过的!",
    //        img: "https://imgs.genshuixue.com/0cms/d/file/content/2016/04/5719913d7fa28.png",
    //        url: shareUrl
    //    };
    //    //alert(options.url);
    //    setShare(options);
    //}

    /**
     * 验证手机号格式
     */
    function checkMobile(str) {
        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (str.match(reg)) {
            return true;
        }
        else {
            return false;
        }
    }

    function submit() {
        container
        .find('.submit')
        .on('click',function() {
            var tel = container.find('.input-mobile').val();
            if ($.trim('tel') == "" || tel == "请输入手机号" || !checkMobile(tel)) {
                ui.remind("请输入正确格式的手机号");
                return;
            }
            else if ($('.submit').hasClass('disabled')) {
                 return;
            }
            var param = {
                mobile: tel,
                number: url().params.number,
                type: TYPE_VIDEO_COURSE
            };
            $('.submit').addClass('disabled');
            service.post(
                '/kaoyan/spreadCode',
                param,
                function(res) {
                    if(res.code == 0){
                        ui.alert("兑换码短信已发送");
                    }

                    $('.submit').removeClass('disabled');
                }
            )

        });
    }



    return function (page_data) {

        container = $('#main');

        //渲染页面
        renderPage();

        //分享
       //setShareInfo();

        //提交
        submit();

        $('.download').on('click', function(e) {

            if(env.os.isIOS) {
                if (env.thirdapp) {
                    ui.alert('iphone设备点击右上角"..."用safari打开页面完成下载');
                    e.preventDefault();
                }
            }

        });
    };
});
