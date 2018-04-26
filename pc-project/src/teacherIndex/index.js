/**
 * @file 老师详情
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var VideoDialog = require('common/component/VideoDialog');
    var ImageDialog = require('common/component/ImageDialog');
    var RecoverDialog = require('common/component/RecoverDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var ConsultDialog = require('common/component/ConsultDialog');
    var InviteDialog = require('common/component/InviteDialog');
    var ShareDialog = require('common/component/ShareDialog');
    var starPatch = require('common/component/starPatch');
    var timeSpan = require('common/function/timeSpan');
    var cookie = require('cobble/util/cookie');
    var tianxiaoLog = require('common/tianxiaoLog');

    var instance = require('cobble/util/instance');

    var teacherMap = require('./teacherMap');
    var mediaPlay = require('./mediaPlay');
    var header = require('./header');
    var comment = require('./teacherComment');
    var courseList = require('./courseList');
    var service = require('common/service');
    var store = require('common/store');

    var HasCommentedDialog = require('common/component/HasCommentedDialog');

    var container = $('#content');
    var teacherSidebar = container.find('.teacher-sidebar');
    var teacherRecord = container.find('.teacher-record');
    var teacherComment = container.find('.teacher-comment');
    var $window = instance.window;

    // 老师主页统计
    function log() {

        var startTime = new Date().getTime();

        $window.unload(function () {
            WAT.send('http://click.genshuixue.com/w.gif', {
                type: 'teacher_detail',
                tid: store.get('teacherId'),
                uid: cookie.get('PHPSESSID'),
                uuid: store.get('user').id ? store.get('user').id : -1,
                qid: store.get('qid'),
                stay_time: new Date().getTime() - startTime
            });
        });
    }


    /*触发*/

    //上报函数
    function report() {
        var params = {
            teacher_number:store.get('teacherNum'),
            user_id:store.get('userId') || "",
            track_id: cookie.get('__track_id__'),
            comment_type:store.get('type')|| '1',
            //comment_tag:'',
            comment_tag:store.get('commentTag_name')|| "",
            comment_tag_num:store.get('commentTag_count')|| "",
            dsp:'1',
            city_id:cookie.get('CITY_ID'),
            source: store.get('source'),
            type: 'comment',
            page: store.get('page'),
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);

    }
    //页面滚动时
    function HoverTreeScroll() {
        var Obj =container.find('.top-nav');
        if (Obj.length != 1) { return false; }

        var offsetTop = arguments[1] ? arguments[1] : 0;
        var ObjTop = Obj.offset().top - $(window).height();
        var h_one = true;

        $(window).scroll(function () {
            if ($(window).scrollTop() > ObjTop) {
                if (h_one) {
                    report();
                    //alert(1);
                    h_one = false;
                }

            }
        });
    }


    /**
     * 处理文本内容的展开收起
     *
     * @inner
     */
    function toggleContent() {
        teacherSidebar
            .on('click', '.teacher-tags-seemore', function (e) {

                var thiz = $(e.currentTarget);
                var show = thiz.attr('data-show');

                if(show == 'true') {
                    teacherSidebar.find('.teacher-tips').find('.teacher-tips-tag').css("max-height","none");
                    thiz.html('收起全部');
                    thiz.attr('data-show',false);
                }
                else{
                    teacherSidebar.find('.teacher-tips').find('.teacher-tips-tag').css("max-height", '65px');
                    thiz.html('展开全部');
                    thiz.attr('data-show',true);
                }
            });
    }

    /**
     * 处理tab切换
     *
     * @inner
     */
    function tabChange() {
        teacherRecord
        .on('mouseover', '.teacher-record-header h1', function (e) {

            var thiz = $(e.currentTarget);
            thiz.parent().find('h1').removeClass('active');
            thiz.addClass('active');
            var aim = thiz.attr('data-target');
            teacherRecord.find('.teacher-record-content >div').hide();
            teacherRecord.find('.'+aim).show();
        });
    }


    // 获取视频课列表
    function getMediaList(type, selector, key, pagesize, page) {

        //var sortBy = sortSelect ? sortSelect.getValue() : 'display_order';
        var sortBy = 'update_time';

        return service
            .getTeacherVideoPhotoList({
                teacherNum: store.get('teacherNum'),
                page: page ? page : store.get('mediaPage'),
                pageSize: pagesize ? pagesize : 10,
                showType: type
            })
            .done(function (response) {
                if (response.code === 0) {

                    var data = response.data;
                    var tpl = data.tpl[key];
                    var video_list = data.video_list;
                    var photo_list = data.photo_list;

                    var content = teacherMedia.find(selector);

                    /*if (video_list.length > 0 || photo_list.length > 0) {
                     teacherMedia.show();
                     } else if (type == 2) {
                     teacherMedia.show();
                     } else {
                     teacherMedia.hide();
                     }*/
                    if (video_list.length > 0 || photo_list.length > 0) {
                        teacherMedia.addClass('show-teacher-media');
                        content.html(tpl);
                    } else {
                        teacherMedia.find('.no-media').html('<div class="no-media-icon"></div><span>老师太懒了，还没有添加照片、视频！</span>').css({'height':'340px'});
                    }

                }
            });
    }


    exports.init = function () {

        // 天校日志
        tianxiaoLog.send(store.get('orgnumber'), 'teacherDetail', store.get('teacherNum'));

        header.init();
        courseList.init();
        teacherMap.init();
        mediaPlay.init();
        comment.init();
        //HoverTreeScroll();

        // 处理文本内容的展开收起
        toggleContent();
        tabChange();
        // 搜索统计
        log();
    }
});