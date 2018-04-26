/**
 * @file 班课详情页评论列表
 * @author wuhongjie
 */
define(function (require, exports) {

    'use strict';

    var Rotatable = require('common/component/Rotatable');
    var ImageDialog = require('common/component/ImageDialog');
    var store = require('common/store');
    var Select = require('cobble/form/Select');
    var service = require('common/service');
    var cookie = require('cobble/util/cookie');
    var container = $('#course-comment');
    var rotateHash = {};
    var rotateIndex = 1;

    //上报
    function report() {
        var params = {
            teacher_number: store.get('teacherNum'),
            user_id: store.get('userId') || "",
            track_id: cookie.get('__track_id__'),
            comment_type: '1',
            comment_tag: store.get('commentTag_name') || "",
            comment_tag_num: store.get('commentTag_count') || "",
            dsp: '1',
            city_id: cookie.get('CITY_ID'),
            source: '3',
            type: 'comment',
            page: store.get('page'),
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);

    }


    function getCommentList(addHash) {
        return service
        .getOrgParentCourseAjax({
            number: store.get('courseNum'),
            page: store.get('page'),
            pageSize: 10,
            faceType: store.get('face')
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                var tpl = data.tpl;
                container.find('.tab-nav').html(tpl.comment_nav);
                container.find('.nav-content').html(tpl.comment_list);
                container.find('.overview').html(tpl.comment_overview||'');

            }
            if (addHash) {
                // 自动定位
                location.hash = '#course-comment';
            }
        });
    }

    exports.init = function () {

        store.set('page', 1);
        store.set('comment', 0);

        getCommentList();

        container
        .on('click', '[data-page]', function (e) {

            var target = $(e.currentTarget);
            store.set('page', target.data('page'));
            report();
            getCommentList(true);

            return false;
        })
        //点击类型上报
            .on('click', '.nav-item', function (e) {
                var target = $(e.currentTarget);
                store.set('commentTag', target.data('value'));
                store.set('commentTag_name', target.data('name'));
                store.set('commentTag_count', target.data('num'));
                store.set('page', 1);
                report();
            })

        .on('click', '[data-face]', function (e) {

            var target = $(e.currentTarget);
            store.set('face', target.data('face'));
            store.set('page', 1);
            getCommentList(true);

            return false;
        })

        .on('click', '.photo-item', function (e) {
            var element = $(this);
            var parent = element.parent().parent();
            parent.find('.photo-item').removeClass('active');
            element.addClass('active');
            // 设置大图
            // 设置垂直间距
            var vertical = element.data('vertical');
            var vheight = element.data('vheight');
            var horizontal = element.data('horizontal');
            var hheight = element.data('hheight');
            var title = element.data('name');

            var photoWrapper = parent.find('.photo-wrapper');
            var floater = photoWrapper.find('.floater');
            var img = photoWrapper.find('.rotate-img');
            var photoName = parent.find('.photo-name');

            img.attr('src', horizontal);
            photoWrapper.css({'width':400,'height':300});
            floater.css({'margin-bottom':'-'+Math.floor(hheight/2)+'px'});
            photoName.text(title);
            parent.find('.comment-photo-player').show();

            // 初始化图片旋转
            var rotateImages = container.find('.photo-wrapper').find('img');

            if (!photoWrapper.data('rotateindex')) {
                rotateHash[rotateIndex] = new Rotatable({
                                                element: photoWrapper.find('.rotate-img'),
                                                callback: function () {
                                                }
                                            });
                photoWrapper.data('rotateindex',rotateIndex);
                rotateIndex++;
            } else {
                var index = photoWrapper.data('rotateindex');
                rotateHash[index].rotate({animateTo: 0,
                                      duration: 1});
            }
            photoWrapper.data('rotateangle',0);
        })

        .on('click', '.packup', function (e) { // 收起评价图片
            var element = $(this);
            var parent = element.parent().parent().parent();
            parent.find('.comment-photo-player').hide();
            parent.find('.photo-item').removeClass('active');
        })

        .on('click', '.sourse', function (e) {
            var element = $(this);
            var parent = element.parent().parent().parent();
            var images = parent.find('.photo-item');
            var curImg = parent.find('.active');
            var index = images.index(curImg);
            var data = images.map(function (index, item) {
                return {
                    url: $(item).data('image'),
                    title: $(item).data('name')
                };
            });

            new ImageDialog({
                data: data,
                index: index
            });
        })

        .on('click', '.left', function (e) {
            var element = $(this);
            var parent = element.parent().parent().parent();
            var photoWrapper = parent.find('.photo-wrapper');
            var index = photoWrapper.data('rotateindex');
            var angle = photoWrapper.data('rotateangle');
            var newangle = (angle-90);
            rotateHash[index].rotate({animateTo: newangle,
                                      duration: 1});
            photoWrapper.data('rotateangle',newangle);
        })

        .on('click', '.right', function (e) {
            var element = $(this);
            var parent = element.parent().parent().parent();
            var photoWrapper = parent.find('.photo-wrapper');
            var index = photoWrapper.data('rotateindex');
            var angle = photoWrapper.data('rotateangle');
            var newangle = (angle+90);
            rotateHash[index].rotate({animateTo: newangle,
                                      duration: 1});
            photoWrapper.data('rotateangle',newangle);
        })

        .on('click', '.photo-wrapper', function (e) {
            var element = $(this);
            element.parent().find('.packup').click();
        });

    };

});