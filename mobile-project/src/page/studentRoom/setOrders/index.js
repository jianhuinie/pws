/**
 * 生源大厅-接单设置
 * author: huangshiming
 */
define(function (require, exports) {
    'use strict';

    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var openAppWindow = require('common/openAppWindow');
    var container = $('#page_main');
    var service = require('common/service');
    var app = require('common/app');
    var ui = require('common/ui');
    var user = require('common/user');
    var ui = require('common/ui');
    var ajaxFlag = true;
    var userInfo;

    var SetOrderDetail = function (pageData) {
        this.price = (pageData && pageData.display_price) ? +pageData.display_price : 0;
        this.canConsultPric = (pageData && pageData.is_accept_consult) ? 1 : 0;
        this.consultPric = (pageData && pageData.is_accept_consult) ? 0 : +this.price;
        this.distance = (pageData && pageData.distance > 0) ? pageData.distance : 0;
        this.onlyTeach = (pageData && pageData.only_teach) ? 1 : 0;
        if (pageData && pageData.teach_time_arr) {
            this.tableString =  pageData.teach_time_arr.join('');
        } else {
            this.tableString = '000000000000000000000';
        }
        this.intNumber = 0;
    };

    // 初始化所有时间表选中的部分
    SetOrderDetail.prototype.getTimeTableInit = function () {
        if (this.tableString.indexOf('1') < 0) {
            return;
        } 

        var pivoIndex = this.tableString.indexOf('1');
        var tempArray = [];
        tempArray.push(pivoIndex);

        var tableL = this.tableString.length;
        while(pivoIndex < tableL && pivoIndex > -1) {
            pivoIndex++;
            if (this.tableString.indexOf('1', pivoIndex) > -1) {
                tempArray.push(this.tableString.indexOf('1', pivoIndex));
                pivoIndex = this.tableString.indexOf('1', pivoIndex);
            }
        }
        var timerContainer = $('.timer-container');
        timerContainer.find('.time-item').each(function () {
            var that = $(this);
            var index = that.data('index');
            if (tempArray.indexOf(index) > -1) {
                that.find('.icon')
                    .removeClass('icon-ic_unselect')
                    .addClass('icon-focus');
                that.attr('data-status', 1);
            }
        });
    };

    // 接受按钮的操作
    SetOrderDetail.prototype.clickLimitButton = function () {
        var there = this;
        container
            .unbind('click', '.circles')
            .on('click', '.circles', function () {
                var that = $(this);
                that.toggleClass('circles-open');
                that.find('div')
                    .toggleClass('circle-button-open')
                    .toggleClass('circle-button');
                if (that.data('type') === 'price') {
                    if (there.canConsultPric) {
                        // 开关打开-将其关闭
                        // there.consultPric = there.price;
                        there.canConsultPric = 0;
                    } else {
                        // 开关打开了-将其关闭
                        // there.consultPric = 0;
                        there.canConsultPric = 1;
                    }
                } else if (that.data('type') === 'time') {
                    there.onlyTeach = there.onlyTeach ? 0 : 1;
                }
         });
    };

    // 选择时间表中的时间
    SetOrderDetail.prototype.chooseDateNode = function () {
        var there = this;
        // 单选
        container.on('touchstart', '.time-item', function () {
            var that = $(this);
            that.find('.icon')
                .toggleClass('icon-focus')
                .toggleClass('icon-ic_unselect');
            if (+that.attr('data-status')) {
                that.attr('data-status', 0);
            } else {
                that.attr('data-status', 1);
            }
            
        });

        // 全选
        container.on('click', '.choose-all', function () {
            var that = $(this);
            $('.time-item').each(function () {
                var there = $(this);
                if (!there.hasClass('time-item-name')) {
                    there.attr('data-status', 1);
                    there.find('.icon')
                        .removeClass('icon-ic_unselect')
                        .addClass('icon-focus');
                }
            });
        });
    };

    // 监听input,当input失去焦点的时候自动赋值给构造函数中的值
    SetOrderDetail.prototype.blurs = function () {
        var there = this;
        var setNumber = $('.set');
        var reg = /^\d+$/;
        setNumber.blur(function () {
            var that = $(this);
            var value = that.val();
            var types = that.data('type');
            if (reg.exec(value)) {
                if (types === 'price') {
                    there.price = +value;
                } else if (types === 'distance') {
                    there.distance = +value;
                }
            } else {
                if (types === 'price') {
                    there.price = -1;
                    if (value !== '') {
                        ui.remind('请输入整数倍的价格');
                        that.val('');
                    }
                } else if (types === 'distance') {
                    there.distance = -1;
                    ui.remind('请输入整数倍的距离');
                    if (value !== '') {
                        ui.remind('请输入整数倍的距离');
                        that.val('');
                    }
                }
            }
        });
    };

    // 点击地址和价格的时候能重新输入
    SetOrderDetail.prototype.clickInput = function () {
        container
            .unbind('click', '.setting')
            .on('click', '.setting', function () {
                var that = $(this);
                if (that.find('.set').hasClass('hide')) {
                    that.find('.input-content').hide();
                    that.find('.set').removeClass('hide');
                }
        });
    };

    // 点击地址的时候弹框提示
    SetOrderDetail.prototype.myAddress = function () {
        container.on('click', '.set-distance-button', function () {
            ui.alert('请去老师端APP的我的资料处设置地址');
        });
    };

    // 保存操作
    SetOrderDetail.prototype.save = function () {
        var there = this;
        container
            .unbind('click', '.save-button')
            .on('click', '.save-button', function () {
            // 发送前处理日期，将如期进行二进制转换成十进制整数
                var tempArray = [];
                var tempString = '';
                $('.time-item').each(function () {
                    var that = $(this);
                    if (+that.attr('data-status')) {
                        tempArray[that.data('index')] = 1;
                    } else {
                        tempArray[that.data('index')] = 0;
                    }
                });

                tempString = tempArray.join('');
                there.intNumber = parseInt(tempString, 2);

                if (there.canConsultPric) {
                    // 开关打开了
                    there.consultPric = 0;
                } else {
                    // 开关关闭了
                    there.consultPric = (+there.price === -1) ? 0 : +there.price;
                }
                
                if (there.intNumber && (+there.price > -1) && (+there.distance > -1) && ajaxFlag) {
                    ajaxFlag = false;
                    service.post('/source-hall/orderSet', {
                        display_price: +there.price,
                        distance: +there.distance,
                        only_teach: there.onlyTeach,
                        teach_time: there.intNumber,
                        consult_price: there.consultPric
                    }, function (res) {
                        if (+res.code === 0) {
                            if (app.isApp) {
                                openAppWindow.open(location.origin + '/source-hall/waitForSign');
                            } else {
                                location.href = '/source-hall/waitForSign';
                            }
                            ajaxFlag = true;
                        }
                    });
                } else if (!there.intNumber) {
                    ui.remind('请选择有效的日期');
                    return;
                } else if (+there.price === -1) {
                    ui.remind('请选择接受生源的价格');
                    return;
                } else if (+there.distance === -1) {
                    ui.remind('请选择接受生源的距离');
                    return;
                }
        });
    };

    // 首次进入的时候判断cookie弹窗
    SetOrderDetail.prototype.initWarnDialog = function () {
        var localStorages = window.localStorage;
        var isFirstGetIntoPage = localStorages.getItem('setOrders' + userInfo.number);
        if (!isFirstGetIntoPage) {
            ui.alert({
                title: '温馨提示',
                content: '<div style="text-align: left;"><div >亲爱的老师，欢迎您使用生源通。</div>为了更好的为您提供生源，我们正在不断拓展生源渠道，并会对每位生源进行筛选，以便能为您提供最适合的生源。为了持续的合作共赢，我们将对每位推荐给您成功交易的生源收取30%的服务费，感谢您的理解和支持！</div>',
                width: 250,
                button: '我知道了'
            });
            localStorages.setItem('setOrders' + userInfo.number, true);
        }
    }

    return function (page_data) {
        lazyLoadImage.init();
        userInfo = user.getUserInfo();
        var setOrderDetail = new SetOrderDetail(page_data.source_order_set);
        setOrderDetail.getTimeTableInit();
        setOrderDetail.clickLimitButton();
        setOrderDetail.chooseDateNode();
        setOrderDetail.blurs();
        setOrderDetail.myAddress();
        setOrderDetail.clickInput();
        setOrderDetail.save();
        setOrderDetail.initWarnDialog();
    };

});