define(function (require, exports) {
    'use strict';
    var $ = require('zepto');
    var template = require('artTemplate');
    var service = require('common/service');
    var app = require('common/app');
    var formatTime = require('common/time/formatTime');
    var openAppWindow = require('common/openAppWindow');

    var teacherTime = require('page/studentRoom/_part/initTeacherTime');
    var liRender = template.compile(require("text!./listItem.tpl"));
    var emptyRender = template.compile(require("text!./empty.tpl"));
    
    var container = $('#page_main');
    var deviceRatio = window.devicePixelRatio;
    function getList (options) {
        var dtd = $.Deferred(); 
        service.get(
        '/source-hall/studentOrderList',
        options, 
        function (res) {
            if (+res.code === 0) {
                dtd.resolve({
                    data: res.data
                });
            }
        });
        return dtd.promise();
    }

    function initDom (options, type, callback) {
        var dtd = $.Deferred();
        var params = {
            type: options.tab,
            sort: options.sort,
            page: options.page
        };
        var listBox = container.find('.list-box');

        if (options.filter) {
            params.filter = options.filter;
        }
        var promise = getList(params);
        if (promise) {
            promise.done(function (data) {
                if (callback) {
                    callback();
                }
                var list = data.data.item;
                var pager = data.data.pager;
                if (list.length > 0) {
                    var listHtml = liRender({
                        list: list
                    });
                    if (type === 'refresh') {
                        listBox.html(listHtml);
                    } else if (type === 'append') {
                        listBox.append(listHtml);
                    }
                    listBox
                        .attr('data-next-page', pager.next_page)
                        .attr('data-has-more', (pager.has_more ? 1 : 0));

                    container.find('.student-require-time').each(function (index, item) {
                        var that = $(this);
                        var pageSizeTotal = (pager.current_page - 1) * pager.page_size;
                        if (index >= pageSizeTotal
                            && index < pageSizeTotal + pager.page_size) {
                            teacherTime.initTeacherTime(list[index - pageSizeTotal].class_time_array, that);
                        }
                    });

                    $('.time').each(function (item) {
                        var that = $(this);
                        that.text(formatTime(that.data('time')));
                    });
                    var wrap = container.find('#wrapper');
                    wrap.css('top', 80 * deviceRatio + 'px');
                    // if (app.isApp()) {
                    //     wrap.css('top', '80px');
                    // } else {
                    //     wrap.css('top', '120px');
                    // }
                    
                    dtd.resolve();
                } else {
                    // 没有数据
                    var emptyHtml = emptyRender({
                        type: 'normal'
                    });

                    listBox.html(emptyHtml);
                    container.find('.blank-content').html('');

                    container.on('click', '.go-to-setting', function () {
                        var that = $(this);
                        openAppWindow.open(that.data('href'));
                    });

                    dtd.resolve();
                }
            });
        }
        return dtd.promise();
    }

    function noPay () {
        container
            .unbind('click', '.un-do-pay')
            .on('click', '.un-do-pay', function () {
                var that = $(this);
                service.post('/source-hall/temporarilyNoSign', {
                    number: that.data('number')
                }, function (responese) {
                    if (+responese.code === 0) {
                        if (responese.data.is_success) {
                            that.css('visibility', 'hidden');
                            var statusDom = that.parent().siblings('.header').find('.status');
                            statusDom
                                .text('暂不报名')
                                .removeClass('.un-do-pay')
                                .addClass('.no-pay');
                        }
                    }
                });
        });
    }

    function pay () {
        container
            .unbind('click', '.do-pay')
            .on('click', '.do-pay', function () {
                var that = $(this);
                openAppWindow.open(that.data('href'));
            });
    }

    function clickItem () {
        container  
            .unbind('click', '.list-box-item')
            .on('click','.list-box-item', function (e) {
                var that = $(this);
                var dom = $(e.target);
                if (!(dom.hasClass('do-pay') 
                    || dom.hasClass('un-do-pay') 
                    || dom.hasClass('no-replay'))) {
                    openAppWindow.open(that.data('href'));
                }
            });
    }


    return function (options, type, callback) {
        noPay();
        pay();
        clickItem();
        return initDom(options, type, callback);
    };
});