define(function (require, exports) {
    'use strict';
    var $ = require('zepto');
    var template = require('artTemplate');

    var service = require('common/service');
    var observer = require('common/mvc/observer');
    var app = require('common/app');
    var openAppWindow = require('common/openAppWindow');
    var Loading = require('common/ui/Loading/index');
    var formatTime = require('common/time/formatTime');

    var myScroll = require('page/studentRoom/_part/refresh');
    var teacherTime = require('page/studentRoom/_part/initTeacherTime');
    var liRender = template.compile(require("text!./waitForSign.tpl"));
    var emptyRender = template.compile(require("text!./empty.tpl"));
    
    var container = $('#page_main');
    var load = new Loading();
    var deviceRatio = window.devicePixelRatio;
    function WaitForSignPage () {
        this.listArray = [];
        this.number = 1;
        this.total = 0;
    }

    function clickItem () {
        container  
            .unbind('click', '.list-box-item')
            .on('click','.list-box-item', function (e) {
                var that = $(this);
                var dom = $(e.target);
                if (!(dom.hasClass('do-pay') || dom.hasClass('un-do-pay') || dom.hasClass('no-replay'))) {
                    openAppWindow.open(that.data('href'));
                }
            });
    }

    function getList () {
        var deferred = $.Deferred();
        service.get('/source-hall/waitForSign', {}, function (response) {
            if (+response.code === 0) {
                deferred.resolve({
                    list: response.data.order,
                    pager: response.data.pager
                });
            }
        });
        return deferred.promise();
    }

    WaitForSignPage.prototype.initItemContent = function () {
        var there = this;
        var blankHtml = '';
        var blankLength;

        if (there.total > 5) {
            blankLength = 4;
        } else {
            blankLength = there.listArray.length - 1;
        }
        for (var i = 0; i < blankLength; i++) {
            var tempBlank = '<div class="blank-temp-'+ (i+1) + '"></div>';
            blankHtml += tempBlank;
        }
        if (there.listArray.length > 0) {
            var listHtml = liRender({
                item: there.listArray[0]
            });
            container.find('.list-box').html(listHtml);
            container.find('.blank-content').html(blankHtml);
            teacherTime.initTeacherTime(there.listArray[0].class_time_array);

            var times = $('.time');
            times.text(formatTime(times.data('time')));
            var warnTpl = container.find('.list-bar .item .warn');
            if (there.total) {
                warnTpl 
                    .removeClass('hide')
                    .text(there.total);
            } else {
                warnTpl.addClass('hide');
            }
            clickItem();
            there.number ++;
            var wrap = container.find('#wrapper');
            wrap.css('top', 40 * deviceRatio + 'px');
            // if (app.isApp()) {
            //     wrap.css('top', '40px');
            // } else {
            //     wrap.css('top', '80px');
            // }
        } else {
            // 没有数据
            var emptyHtml = emptyRender({
                type: 'wait'
            });
            container.find('.list-box').html(emptyHtml);
            container.find('.blank-content').html('');
            container.on('click', '.go-to-setting', function () {
                var that = $(this);
                openAppWindow.open(that.data('href'));
            });
        }
    };

    WaitForSignPage.prototype.initPage = function (callback) {
        var there = this;
        var promise = getList();
        if (promise) {
            promise.done(function (list) {
                if(callback) {
                    callback();
                }
                var lists = list.list;
                var pager = list.pager;
                var listL = lists.length;
                for(var i = 0; i < listL; i++) {
                    there.listArray.push(lists[i]);
                }
                there.total = pager.total;
                var warnTpl = container.find('.list-bar .item .warn');
                if (there.total) {
                    warnTpl
                        .show()
                        .text(there.total);
                } else {
                    warnTpl
                        .hide();
                }
                there.initItemContent();
                there.noPayNow();
                clickItem();
            });
        }
    };

    WaitForSignPage.prototype.noPayNow = function () {
        var there = this;
        container
            .unbind('click', '.no-replay')
            .on('click', '.no-replay', function () {
                load.show();
                var that = $(this);
                var number = that.data('number');
                service.post('/source-hall/temporarilyNoSign', {
                    number: number
                }, function (response) {
                    if (+response.code === 0) {
                        if (there.listArray.length > 1) {
                            there.total --;
                            there.listArray.shift();
                            there.initItemContent();
                            setTimeout(function () {
                                load.hide();
                            }, 500);
                        } else {
                            // 重新发送ajax
                            if (there.listArray.length === 1) {
                                there.total --;
                                there.listArray.shift();
                            }
                            there.initPage();
                            setTimeout(function () {
                                load.hide();
                            }, 500);
                        }
                    }
                });
        });
    };

    exports.waitForSign = function (callback) {
        var item = new WaitForSignPage();
        item.initPage(callback);
    };
});