/**
 * @file 向ta约课
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var SubjectSelect = require('../component/SubjectSelect');
    var store = require('common/store');
    var AllPrice = require('common/component/AllPrice');

    /**
     * 模块容器元素
     *
     * @inner
     * @type {jQuery}
     */
    var container = $('#teacher-order-form');

    /**
     * 根据价格改变字体大小
     * @param  {[type]} price [description]
     * @return {[type]}       [description]
     */
    function changeFontSize (price) {
        var fontSize = '36px';
        var priceStyle = {};

        if (price >= 1000 && price < 10000) {
            fontSize = '31px';
            priceStyle = {'position':'relative','top':'4px'};
        } else if (price >= 10000 && price < 100000) {
            fontSize = '26px';
            priceStyle = {'position':'relative','top':'9px'};
        } else if (price >= 100000) {
            fontSize = '22px';
            priceStyle = {'position':'relative','top':'13px'};
        } else {
            fontSize = '36px';
            priceStyle = {'position':'relative','top':'0'};
        }

        var priceInfo = $('.price-info');
        priceInfo.find('strong').css({'font-size':fontSize}) ;
        priceInfo.css(priceStyle);
    }

    /**
     * 初始化
     */
    exports.init = function () {

        // 选择教学科目或授课方式后，隐藏 '起' 字
        var startPrice = container.find('.start-price');
        var defaultPrice = container.find('.price').html();

        var subjectSelect = new SubjectSelect({
            element: container,
            onCourseChange: function (data) {
                startPrice.hide();
                store.set('courseId', data.id);
                var lessonWay = store.get('lessonWay');
                if (!lessonWay) {
                    var element = container.find('.course li.active');
                    var json = element.data('json');
                    var minPrice = Number.MAX_VALUE ;

                    for (var p in json) {
                        if (parseInt(json[p])) {
                            if (minPrice>json[p]) {
                                minPrice = parseInt(json[p]);
                            }
                        }
                    }
                    container.find('.price').html(minPrice);
                    changeFontSize(minPrice);
                    startPrice.show();
                }
            },
            onWayChange: function (data) {
                startPrice.hide();
                store.set('lessonWay', data.name);
                if (!store.get('lessonWay')&&!store.get('courseId')) {
                    container.find('.price').html(defaultPrice);
                    changeFontSize(defaultPrice);
                    startPrice.show();
                } else {
                    container.find('.price').html(data.price);
                    changeFontSize(data.price);
                }
            }
        });

        // 全部价格
        new AllPrice({
            subjectSelect: subjectSelect,
            element: $('.all-price')
        });
        container.on('click', '.btn-trial', function() {
            if ($('.trial-course-box').length > 0) {
                var top = $('#teacher-content').offset().top;
                $($('.course-nav li').get(0)).trigger('click');
                $(window).scrollTop(top - 45);
            } else {
                var main = $('#teacher-profile').find('[data-nav="main-active"]');
                var mainurl = main.find('a').attr('href');
                location.href = 'http://' + location.host  + mainurl + '#trial_course';
            }

        });
    };

});