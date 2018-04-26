/**
 * @file 商学院 － 课程基本资料
 * @author wangyujie
 */

define(function (require, exports) {

    'use strict';

    var common = require('./common');
    var etpl = require('cobble/util/etpl');
    var Slider = require('common/component/Slider');
    var store = require('common/store');

    var container = $('.bs-content');
    var renderSliderCommon = etpl.compile($('#show-slider-common').html());

    /*
     * 初始化热门课程banner幻灯／学员见证
     *
     * @param {array} data 幻灯图片列表
     * @param {element} container 幻灯容器
     */
    function sliderCommon(container, data) {

        // 初始化轮播
        container.html(renderSliderCommon({promotionList: data}));

        new Slider({
            element: container,
            itemSelector: '.promotion-slideritem',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            duration: 150,
            onChange: function (e, data) {
                // console.log('图片变了～');
            }
        });
    }

    /*
     *  热门课程／讲师天团，左右滑动按钮
     *
     * @param {element} container 幻灯容器
     */
    function sliderSecondCommon(container) {
        var leftIcon = container.find('.icon-chevron-left');
        var rigthIcon = container.find('.icon-chevron-right');

        var len = container.find('.slider-li').length;
        new Slider({
            element: container.find('.panel-content'),
            itemSelector: '.slider-li',
            prevSelector: '.icon-chevron-left',
            nextSelector: '.icon-chevron-right',
            click: 'click',
            duration: 50,
            autoPlay: false,
            delay: 3000,
            onChange: function (e, data) {
                var from = data.form;
                var to = data.to;
                if (to == 0) {
                    leftIcon.addClass('disable');
                    rigthIcon.removeClass('disable');
                }
                else if (to == len - 1) {
                    rigthIcon.addClass('disable');
                    leftIcon.removeClass('disable');
                }
                else {
                    leftIcon.removeClass('disable');
                    rigthIcon.removeClass('disable');
                }
            }
        });
    };

    exports.init = function () {

        common.init();

        // 热门课程幻灯
        var hotCourseBannersContainer = container.find('.show-hot-course-banner');
        var hotCourseBannersData = [];
        $.each(store.get('hotCourseBanners'), function (index, item) {
            hotCourseBannersData.push({
                img: item.imgUrl + '@1e_800w_450h_1c_0i_1o_90Q_1x.jpg',
                hover: item.name,
                url: item.webUrl || '#'
            });
        });
        sliderCommon(hotCourseBannersContainer, hotCourseBannersData);

        // 学员见证照片数据
        var studentPhotosContainer = container.find('.show-student-photos');
        var studentPhotosData = [];
        $.each(store.get('studentPhotos'), function (index, item) {
            studentPhotosData.push({
                img: item.imgUrl + '@1e_556w_320h_1c_0i_1o_90Q_1x.jpg',
                hover: item.name
            });
        });
        sliderCommon(studentPhotosContainer, studentPhotosData);

        // 热门课程
        var hotCoursesContaint = container.find('.hot-courses');
        sliderSecondCommon(hotCoursesContaint);

        // 讲师天团
        var lecturersContaint = container.find('.lecturers');
        sliderSecondCommon(lecturersContaint);

        container
        .on('click', '.free-consult', function () { // 免费咨询
            $('.floated-consult').trigger('click');
        });

    };

});







