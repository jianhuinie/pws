/**
 * @file  秘书提醒
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');

    var Tab = require('cobble/ui/Tab');
    var Dialog = require('cobble/ui/Dialog');
    var DaytimeSelect = require('common/component/DaytimeSelect');


    var types = {
        user: 0,
        sys: 1,
        broadcast: 2
    };

    var list = {
        init: function (container) {

            list.container = container;

            container
            .on('click', 'a[data-page]', function () {
                var that = $(this);
                var page = that.data('page');
                var type = container.find('.nav-item.active').data('panel');
                list.fresh({page: page, type: type}, that.closest('.tab-panel'));
                return false;
            })
            .on('click', '.content a', function () {
                var tr = $(this).closest('tr');
                if (!tr.hasClass('has-read')) {
                    var data = {
                        msgId: tr.data('id'),
                        isRead: 1
                    };
                    service.setMsgRead(data).done(function (response) {
                        if (!response.code) {
                            tr.addClass('has-read');
                        }
                    });
                }
            })

            list.fresh({page: 1}, container.find('.tab-panel:eq(0)'));
        },
        fresh: function (pager, content) {

            pager = $.extend(true, {}, {
                    page: 1,
                    type: 'user',
                    pageSize: 10
                }, pager);

            pager.type = types[pager.type];

            service
            .getMessageList(pager)
            .done(function (response) {

                if (response.code === 0) {
                    var html = response.data.tpl.message_list;
                    content.html(html);
                }
            });
        }
    };

    var setting = {
        init: function (container) {

            container
            .on('click', '.recovery', function (e) {

                var checkboxs = container.find(':checkbox');

                checkboxs.prop('checked', false);

                $.each(
                    store.get('defaultSetting'),
                    function (index, name) {


                        checkboxs
                        .filter('[name="' + name + '"]')
                        .prop('checked', true);

                    }
                );

            })
            .on('click', '.notify-all', function (e) {
                container.find('table :checkbox').prop('checked', true);
            })
            .on('click', '.notify-none', function (e) {
                container.find('table :checkbox').prop('checked', false);
            })
            .on('click', 'td:first-child :checkbox', function (e) {

                var checkbox = $(this);

                var cell = checkbox.closest('td').next();

                cell.find(':checkbox').prop(
                    'checked',
                    checkbox.prop('checked')
                );

            })
            .on('click', '.switcher i', function (e) {

                var target = $(this);

                var switcher = target.closest('.switcher');
                var wrapper = switcher.closest('.no-disturb');
                var textElement = switcher.find('strong');

                var text;
                var value;

                if (wrapper.hasClass('off')) {
                    wrapper.removeClass('off');
                    wrapper.addClass('on');
                    text = '已开启';
                    value = 1;
                }
                else {
                    wrapper.removeClass('on');
                    wrapper.addClass('off');
                    text = '未开启';
                    value = 0;
                }

                textElement.text(text);

                service.saveUserConfig({
                    nodisturb: value
                });
            })
            .on('click', '.edit-time', function (e) {

                var dialog = new Dialog({
                    title: '设置免打扰时间',
                    content: timeDurationTpl,
                    skinClass: 'time-duration-dialog'
                });

                var element = dialog.element;

                var startTimeSelect = new DaytimeSelect({
                    element: element.find('.start-time')
                });

                var endTimeSelect = new DaytimeSelect({
                    element: element.find('.end-time')
                });

                var startTimeElement = container.find('.start-time');
                var endTimeElement = container.find('.end-time');

                startTimeSelect.setValue(startTimeElement.text());
                endTimeSelect.setValue(endTimeElement.text());

                element
                .on('click', '.confirm', function (e) {

                    var startTime = startTimeSelect.getValue();
                    var endTime = endTimeSelect.getValue();

                    if (startTime === endTime) {
                        alert('开始时间和结束时间不能相同哦');
                        return;
                    }

                    startTimeElement.text(startTime);
                    endTimeElement.text(endTime);

                    service.saveUserConfig({
                        nodisturbtime: startTime + '-' + endTime
                    });

                    dialog.dispose();

                })
                .on('click', '.cancel', function (e) {
                    dialog.dispose();
                });

            })
            .on('click', '.save-setting', function (e) {

                var data = { };

                container.find(':checkbox').each(
                    function () {

                        if (this.name) {
                            data[this.name] = this.checked ? 1 : 0;
                        }

                    }
                );
                console.log(data);
                service
                .saveMessageSetting(data)
                .done(function (response) {
                    if (response.code === 0) {
                        success('保存成功');
                    }
                });

            });
        }
    };

    exports.init = function () {

        var container = $('#content');

        list.init(
            container
        );

        var element = container.find('.tab');

        if (element.length === 1) {

            new Tab({
                element: element,
                onChange: function(e, data) {
                    if (data.from != -1) {
                        var currentNav = element.find('.nav-item:eq('  + data.to + ')');
                        var panel = currentNav.data('panel');
                        if (panel != 'setting' ) {
                            list.fresh({type: panel}, container.find('.tab-panel:eq(' + data.to + ')'));
                        }
                    }
                }
            });

            setting.init(
                container.find('.message-setting')
            );
        }

    };


    var timeDurationTpl = [
        '从',
        '<div class="dropdown daytime-select start-time">',
            '<input class="form-text" name="start_time" readonly>',
            '<span class="trigger">',
                '<i class="caret"></i>',
            '</span>',
            '<ul class="dropdown-menu"></ul>',
        '</div>',
        '到',
        '<div class="dropdown daytime-select end-time">',
            '<input class="form-text" name="start_time" readonly>',
            '<span class="trigger">',
                '<i class="caret"></i>',
            '</span>',
            '<ul class="dropdown-menu"></ul>',
        '</div>',
        '<div class="dialog-action">',
            '<span class="btn-primary confirm">确认</span>',
            '<span class="btn-default cancel">取消</span>',
        '</div>'
    ].join('');

});