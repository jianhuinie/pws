/**
 * @file 一对一课程详情页 － 课程基本资料
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Tooltip = require('cobble/ui/Tooltip');
    var VideoDialog = require('common/component/VideoDialog');
    var ImageDialog = require('common/component/ImageDialog');
    var store = require('common/store');
    var Popup = require('cobble/helper/Popup');
    var qrcode = require('common/component/qrcode');
    var Slider = require('common/component/Slider');
    var etpl = require('cobble/util/etpl');

    var Validator = require('cobble/form/Validator');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var service = require('common/service');
    var LoginDialog = require('common/component/LoginDialog');

    var container = $('#course-profile');

    var renderTeacherMedia = etpl.compile($('#show-teacher-media').html());

    /*
     * 初始化图片幻灯
     *
     * @return
     */
    function initTeacherMedia(data) {
        var container = $('.show-teacher-media');

        // 初始化轮播
        container.html(renderTeacherMedia({promotionList: data}));

        new Slider({
            element: container,
            itemSelector: '.promotion-slideritem',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            duration: 150,
            delay: 8000,
            onChange: function (e, data) {
                // console.log('图片变了～');
            }
        });
    }

    /**
     * 获取是否有学生身份
     * @param  {Array} roles 身份数组
     * @return {Bool}  返回是否具有学生身份，默认为false
     */
    function getHasStudentRole(roles) {
        var studentRoleCode = "2";
        var length = roles.length;
        var hasStudentRole = false;

        if (length > 0) {
            for(var i = 0; i < length; i++) {
               if (roles[i] === studentRoleCode) {
                    hasStudentRole = true;
                    break;
                }
            }
        }

        return hasStudentRole;
    }

    exports.init = function () {
        // 滑动图片
        var medium = [];
        $.each(store.get('medium'), function (index, item) {
            // 优先视频
            if (index == 'video_list' && item.length > 0) {
                medium.push({
                    type: 'video',
                    img: item[0].preface_url + '@1e_480w_1c_0i_1o_90Q_1x.jpeg%7C0-12-480-270a.jpeg',
                    hover: item[0].name,
                    videoUrl: item[0].video
                });
            }
            // 其次照片
            if (index == 'photo_list' && item.length > 0) {
                $.each(item, function (i, j) {
                    medium.push({
                        type: 'image',
                        img: j.img + '@1e_480w_1c_0i_1o_90Q_1x.jpeg%7C0-12-480-270a.jpeg',
                        hover: j.name,
                    });
                });
            }
        });

        initTeacherMedia(medium);

        // 分享
        var popup = new Popup({
            element: container.find('.social-share'),
            layer: container.find('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });

        // 手机观看 － 生成二维码
        var supportCavans = document.createElement('canvas').getContext;

        qrcode({
            element: container.find('.qrcode'),
            text: store.get('mUrl'),
            width: 80,
            height: 80,
            render: supportCavans ? 'canvas' : 'table'
        });

        container
        .on('click', '.video-player', function (e) { // 视频播放
            var target = $(e.currentTarget);
            var wrapper = target.closest('.wrapper-video');
            var title = wrapper.attr('title');

            new VideoDialog({
                url: wrapper.data('video'),
                title: store.get('teacherName') + (title ? (' - ' + title) : '')
            });
        })

        .on('click', '.player', function (e) {

            var element = $(this);
            var type = element.data('type');
            var title = element.data('name');

            if (type == 'photo') {
                var images = container.find('.photo');
                var index = images.index(container.find('.active'));

                var data = images.map(function (index, item) {
                    var element = $(item);
                    var name = element.data('name');
                    return {
                        url: element.data('image'),
                        title: store.get('teacherName') + (name ? (' - ' + name) : '')
                    };
                });

                new ImageDialog({
                    data: data,
                    index: index
                });
            }

            if (type == 'video') {
                new VideoDialog({
                    url: element.data('video'),
                    title: store.get('teacherName') + (title ? (' - ' + title) : '')
                });
            }
        })

        .on('mouseenter', '.use-mobile', function (e) { // 手机观看
            var target = $(e.currentTarget);
            target.addClass('has-qrcode');
        })

        .on('mouseleave', '.use-mobile', function (e) { // 手机观看
            var target = $(e.currentTarget);
            target.removeClass('has-qrcode');
        });

    };

});