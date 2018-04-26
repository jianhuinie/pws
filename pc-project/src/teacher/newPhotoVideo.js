/**
 * @file 老师详情 视频相册
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var common = require('./newDetail/common');
    var VideoDialog = require('common/component/VideoDialog');
    var ImageDialog = require('common/component/ImageDialog');
    var store = require('common/store');
    var container = $('#teacher-media');

    // 获取课程列表
    function getMediaList(type, selector, key) {

        //var sortBy = sortSelect ? sortSelect.getValue() : 'display_order';
        var sortBy = 'update_time';

        return service
        .getTeacherVideoPhotoList({
            teacherNum: store.get('teacherNum'),
            page: store.get('mediaPage'),
            pageSize: 20,
            showType: type
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                var tpl = data.tpl[key];
                var video_list = data.video_list;
                var photo_list = data.photo_list;


                var content = container.find(selector);

                /*if (video_list.length > 0 || photo_list.length > 0) {
                    container.show();
                } else if (type == 2) {
                    container.show();
                } else {
                    container.hide();
                }*/
                if (video_list.length + photo_list.length < 1) {

                    container.find('.no-media').html('<div class="no-media-icon"></div><span>老师太懒了，还没有添加照片、视频！</span>');
                    container.find('.no-media').css({'height': '340px'});

                } else {
                    content.html(tpl);
                }

            }
        });
    }


    exports.init = function () {
        common.init();

        container
        .on('click', 'li', function (e) {
            var element = $(this);

            container.find('li').removeClass('active');
            element.addClass('active');

            var type = element.data('type');
            var title = element.data('name');

            if (type == 'photo') {
                var images = element.parent().find('.photo');
                var index = images.index(element.parent().find('.active'));
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
        /*.on('click', '[data-page]', function (e) {
            var element = $(this);
            store.set('mediaPage', element.data('page'));
            getMediaList(2,'#media-list-box','media_list');
            return false;
        })*/

    };
});