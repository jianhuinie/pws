/**
 * @file 优选一对一课程详情页 － 课程基本资料
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var Popup = require('cobble/helper/Popup');
    var qrcode = require('common/component/qrcode');
    var Slider = require('common/component/Slider');
    var etpl = require('cobble/util/etpl');

    var Validator = require('cobble/form/Validator');

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

    exports.init = function () {
        // 滑动图片
        var medium = [];
        $.each(store.get('medium'), function (index, item) {
            medium.push({
                type: 'image',
                img: item.image_url + '@1e_452w_1c_0i_1o_90Q_1x.jpeg%7C0-12-452-262a.jpeg',
                hover: item.title,
            });
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