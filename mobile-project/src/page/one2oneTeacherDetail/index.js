/**
 * author: huangshiming
 * 一对一老师主页
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var util = require('common/util');
    var url = require('util/url');
    var lazyLoadImage = require('common/lazyLoadImage');
    var initPage = require('page/one2oneTeacherDetail/init');
    var habo = require('common/component/analysis/habo/index');
    var setShare = require('common/share/initialize');
    var app = require('common/app');
    var isIOS = util.platform.isIOS();
    var backToTop = require('common/backTopButton');

    // function goToNewUrl() {
    //     pushHistory();
    //     var bool = false;
    //     setTimeout(function () {
    //         bool = true;
    //     }, 1500);
    //     window.addEventListener('popstate', function (e) {
    //         if (bool) {
    //             location.href = document.referrer + decodeURIComponent(url().params.srcUrl);
    //         }
    //         pushHistory();
    //     }, false);

    //     function pushHistory() {
    //         var state = {
    //             title: 'title',
    //             url: '#'
    //         };
    //         window.history.pushState(state, 'title', '#');
    //     }
    // }

    return function (page_data) {

        // if (app.isWeixin() && isIOS && url().params.srcUrl) {
        //     // 由于在微信里面的ios不刷新页面，所以设置的fontSize会被上一个页面所影响，所以就直接跳转
        //     goToNewUrl();
        // }
        // 头部 + 评论 + 经历 + 案例 + 授课 的所有部件函数的controller
        initPage.init(page_data);

        // 图片懒加载
        lazyLoadImage.init();

        // 上报
        habo.initClick();

        // 分享
        var baseInfo = page_data.query_one_on_one_course;
        var teacherInfo = baseInfo.teacher;
        var displayName = teacherInfo.display_name;
        var studentCount = baseInfo.student_count;
        var title = '「优选1对1」'
                    + displayName 
                    +'老师已在跟谁学辅导' 
                    + (studentCount > 10 ? studentCount: '多') 
                    +'名学生，推荐给你';

        var content = '我在跟谁学发现了一位好老师'
                      + displayName
                      + '，有'
                      + teacherInfo.display_school_age
                      + '年教学经验，自我评价：'
                      + teacherInfo.short_introduce;
        var defaultInfo = {
            url: location.href,
            title: title,
            content: content,
            img: teacherInfo.avatar_url + '@2x_70Q_1o_80w_80h_1e_1c.src'
        };
        if (page_data.share_course) {
            defaultInfo.share_course = page_data.share_course;
        }
        setShare(defaultInfo);
        backToTop.init({
            scale: 1
        });
    };
});