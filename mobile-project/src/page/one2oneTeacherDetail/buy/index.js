define(function (require, exports) {
    var $ = require('zepto');
    var container = $('#page_main');
    var template = require('artTemplate');

    var ui = require('common/ui');
    var Loading = require('common/ui/Loading/index');
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var service = require('common/service');
    var openAppNewWindow = require('common/openAppWindow');
    var habo = require('common/component/analysis/habo/index');
    var url = require('util/url');

    var render = template.compile(require('text!./render.tpl'));
    var load = new Loading();
    var selfTimes = 10;
    var dialog;

    var lessonWayMap = {
        STUDENT: '学生上门',
        TEACHER: '老师上门',
        ONLINE: '在线授课'
    };

    var priceInfo = {
        hours: 0,
        lessonIndex: '',
        moneyPerHour: 0,
        discount: 1,
        totalMoney: 0,
        courseId: 0,
        comboId: 0
    };

    function initMoney() {
        var itemContent = $('.item-contents');
        itemContent.find('.lesson-way-item').each(function () {
            var that = $(this);
            if (that.hasClass('item-active')) {
                priceInfo.lessonIndex = that.data('key');
            }
        });

        itemContent.find('.category-item').each(function () {
            var that = $(this);
            var key = '';
            if (priceInfo.lessonIndex) {
                key = priceInfo.lessonIndex.toLowerCase();
            }
            if (that.hasClass('item-active') && key) {
                priceInfo.moneyPerHour = that.data(key);
                priceInfo.courseId = that.data('courseId');
            }
        });

        itemContent.find('.combo-item').each(function () {
            var that = $(this);
            if (that.hasClass('item-active')) {
                priceInfo.hours = that.data('hours');
            }
        });

        var selfContent = itemContent.find('.self-item');
        if (selfContent.hasClass('item-active')) {
            priceInfo.hours = selfTimes;
        }

        priceInfo.totalMoney = (
                                priceInfo.moneyPerHour 
                                * priceInfo.hours
                                ).toFixed(2);
        $('.lesson-warn-text').text(lessonWayMap[priceInfo.lessonIndex] + ' : ');
        $('.lesson-warn-price').text('￥ ' + priceInfo.moneyPerHour + '/每小时');
        $('.total-price .price-single').text('￥ ' + priceInfo.totalMoney);
    }

    function clickBuy (courseNumber, baseInfo) {
        var get2Params = {
            number: courseNumber
        };

        if (url().params.preview) {
            get2Params.preview = url().params.preview;
        }
        container
            .unbind('click', '.buy-course')
            .on('click', '.buy-course', function () {
                load.show();
                service.get('/one-on-one-course/get2', 
                    get2Params, 
                    function (responese) {
                        if (+responese.code === 0) {
                            var list = {};
                            var lessonWay = [];
                            var data = responese.data.query_one_on_one_course;
                            list.categories = data.categories;
                            data.lesson_ways.map(function (item) {
                                var lessonObject = {
                                    text: lessonWayMap[item],
                                    key: item
                                };
                                lessonWay.push(lessonObject);
                            });
                            list.lessonWay = lessonWay;
                            list.combos = data.combos;
                            list.payStatus = data.display_status_student;
                            var payContent = render({
                                baseInfo: baseInfo,
                                list: list
                            });

                            if (!dialog) {
                                dialog = new SlideInDialog({
                                    content: payContent
                                });
                            }

                            var category = data.categories[0];
                            var initMoneyPerHour = category['price_' + data.lesson_ways[0].toLowerCase()];
                            var courseSingleId = category.course_id;
                            var initComb = data.combos[0];
                            priceInfo = {
                                hours: initComb.hours,
                                lessonIndex: data.lesson_ways[0],
                                moneyPerHour: initMoneyPerHour,
                                discount: initComb.discount * 0.1,
                                courseId: courseSingleId,
                            };

                            priceInfo.totalMoney = (
                                    priceInfo.moneyPerHour 
                                    * priceInfo.discount 
                                    * priceInfo.hours
                                    ).toFixed(2);
                            dialog.show();
                            // 上报
                            habo.initClick();
                            load.hide();
                            dialogFunc();
                        }
                });
        });
    }

    function dialogFunc () {

        var payContent = $('.pay-content');
        payContent.find('.close')
            .unbind('click')
            .on('click', function () {
                dialog.hide();
        });

        var itemContent = $('.item-contents');
        var selfTime =$('.self-time');
        itemContent.find('.item')
            .unbind('click')
            .on('click', function () {
                var that = $(this);
                if (!that.hasClass('item-active')) {
                    //本身有，再点自己不能点
                    that
                        .removeClass('item-noraml')
                        .addClass('item-active');
                    that.siblings('.item')
                        .removeClass('item-active')
                        .addClass('item-noraml');
                }
                if (!that.hasClass('self-item') 
                    && that.hasClass('combo-item')) {
                    selfTime
                        .addClass('hide');
                }
                selfTimes = 10;
                initMoney();
        });

        var confirmPay = $('.confirm-pay');
        var cantBuy = $('.cant-buy');
        confirmPay 
            .unbind('click')
            .on('click', function () {
                var payUrl = location.origin 
                            + '/pay/productDetail?type=1' 
                            + '&course_id=' 
                            + priceInfo.courseId
                            + '&lesson_way='
                            + priceInfo.lessonIndex.toLowerCase()
                            + '&hours='
                            + priceInfo.hours;
                            
                openAppNewWindow.open(payUrl);
        });

        cantBuy
            .unbind('click')
            .on('click', function () {
                ui.remind('该课程尚未通过审核，暂不能购买');
        });

        var selfButtons = $('.self-buttons');
        var minusIcon = selfButtons.find('.minus .minus-icon');
        var addsIcon = selfButtons.find('.increase .icon-add');
        var selfText = selfButtons.find('.self-number');
        selfButtons.find('.minus')
            .unbind('click')
            .on('click', function () {
                var that = $(this);
                if (minusIcon.hasClass('active')) {
                        selfTimes -= 5;
                        selfText.text(selfTimes + '小时');
                        initMoney();
                }
                if (selfTimes === 10) {
                    minusIcon
                        .removeClass('active')
                        .addClass('unactive');
                }
        });

        selfButtons.find('.increase')
            .unbind('click')
            .on('click', function () {
                var that = $(this);
                if (addsIcon.hasClass('active')) {
                        selfTimes += 5;
                        minusIcon
                            .removeClass('unactive')
                            .addClass('active');
                        selfText.text(selfTimes + '小时');
                        initMoney();
                }
        });

        var selfItem = $('.self-item');
        var selfTime =$('.self-time');
        selfItem
            .unbind('click')
            .on('click', function () {
                var that = $(this);
                that
                    .removeClass('item-noraml')
                    .addClass('item-active');
                that.siblings('.item')
                    .removeClass('item-active')
                    .addClass('item-noraml');
                selfTime.removeClass('hide');
                selfTimes = 10;
                selfText.text(selfTimes + '小时');
                $('.content-pays').scrollTop(100);
                initMoney();
            });
        initMoney();
    }

    return function () {
        var courseNumber = this.courseNumber;
        var teacherInfo = this.teachInfo;
        dialog = this.dialog;
        var baseInfo = {
            teacherName: teacherInfo.techerName,
            subjectName: teacherInfo.subject
        };
        clickBuy(courseNumber, baseInfo);
    };
});