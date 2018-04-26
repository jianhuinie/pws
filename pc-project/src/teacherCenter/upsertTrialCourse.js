/**
 * @file 预约试听 - 设置试听课
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Select = require('cobble/form/Select');
    var Validator = require('cobble/form/Validator');
    var form = require('common/form');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var store = require('common/store');

    var container, trialTimeSelect;
    var switchStatus;

    exports.init = function () {

        container = $('#main');

        switchStatus = 'off'; // 试听课开启状态

        var data = window.location.search;
        if(data){
            var price = data.split("=")[1];
            $(".switch-icon").removeClass('off').addClass('on');
            switchStatus = 'on';
            if(data.split("=")[0].substr(1) == 'onlinePrice'){
                $(".price-online").find('input[type="checkbox"]').prop("checked",true);
                $(".price-online").addClass("has-success");
                $(".price-online").find('input[type="money"]').get(0).value = price;
            }else{
                $(".price-offline").find('input[type="checkbox"]').prop("checked",true);
                $(".price-offline").addClass("has-success");
                $(".price-offline").find('input[type="money"]').get(0).value = price;
            }
        }

        // 试听时长
        trialTimeSelect = new Select({
            element: container.find('.trial-time'),
            name: 'trial_time'
        });

        // 验证对象
        var validator = new Validator({
            element: container.find('.form'),
            realtime: true,
            fields: {
                trial_time: {
                    rules: {
                        required: true
                    },
                    errors: {
                        required: '请选择时长'
                    }
                },
                price_online: {
                    errors: {
                        min: '最低价格为 0 元',
                        max: '请设置低于50元的试听价',
                        pattern: '只支持数字格式，最多两位小数'
                    }
                },
                price_offline: {
                    errors: {
                        min: '最低价格为 0 元',
                        max: '请设置低于50元的试听价',
                        pattern: '只支持数字格式，最多两位小数'
                    }
                }

            }
        });

        // 保存表单
        var saveButton = new SaveButton({
            element: container.find('.btn-save'),
            save: function () {

                var data = form.parse(container.find('.form'));

                var switchFlag = '';
                var online = '';
                var offline = '';

                if (switchStatus == 'on') {
                    switchFlag = 1;
                } else if (switchFlag == 'off') {
                    switchFlag = 0;
                }

                if ($('input[name="online"]').prop('checked') || store.get('supportOnlineOnly')) {
                    online = data.price_online;
                }

                if ($('input[name="offline"]').prop('checked')) {
                    offline = data.price_offline;
                }

                if (switchStatus == 'on' && online == '' && offline == '') {
                    alert('请至少选择一种试听方式及价格');
                    return;
                }

                // 验证后操作
               if (switchStatus == 'off' || (switchStatus == 'on' && validator.validate())) {

                    return service
                    .upsertTrialCourse(
                        {
                            switchFlag: switchFlag,
                            trialTime: data.trial_time,
                            priceOnline: online,
                            priceOffline: offline
                        }
                    )
                    .done(function (response) {

                        if (response.code === 0) {

                            confirm({
                                title: "温馨提示",
                                content: "恭喜您试听课设置成功！",
                                buttons: [
                                    {
                                        text: '查看个人主页',
                                        type: 'primary',
                                        handler: function () {
                                            location.href = '/t/' + store.get('user').number;
                                        }
                                    },
                                    {
                                        text: '查看预约列表',
                                        handler: function () {
                                            location.href = '/teacher_center/listTrialCourse';
                                        }
                                    }
                                ]
                            });
                        }

                    });
                }

            }
        });

        var content = "设置试听课请首先打开开关<br />如果后续暂不提供试听还可以点击关闭哦";

        container
        .on('click', '.switch-icon', function (e) {
            var target = $(e.currentTarget);

            if (target.hasClass('off')) {
                target.removeClass('off').addClass('on');
                switchStatus = 'on';
            } else if (target.hasClass('on')) {
                target.removeClass('on').addClass('off');
                switchStatus = 'off';
            }
        })

        .on('click', '.trial-time', function (e) {
            var target = $(e.currentTarget);

            if (switchStatus == 'off') {
                target.find('.dropdown-menu').hide();
                alert({
                    title: '温馨提示',
                    content: content,
                    width: 400,
                    buttons: [
                        {
                            text: '我知道了',
                            type: 'primary',
                            handler: function () {
                                this.hide();
                            }
                        }
                    ]
                });
                return;
            }
        })

        .on('click', 'input[type="checkbox"]', function (e) {
            var target = $(e.currentTarget);
            var group = target.closest('.form-group');
            var input = group.find('input[type="money"]');
            if (switchStatus == 'off') {

                alert({
                    title: '温馨提示',
                    content: content,
                    width: 400,
                    buttons: [
                        {
                            text: '我知道了',
                            type: 'primary',
                            handler: function () {
                                this.hide();
                            }
                        }
                    ]
                });

                return;
            }
            if (target.prop('checked')) {
                input.prop('disabled', false);
            } else {
                input.prop('disabled', true);
            }
        })

        .on('click', 'input[type="money"]', function (e) {
            var target = $(e.currentTarget);
            var group = target.closest('.form-group');
            if (switchStatus == 'off') {
                target.prop('checked', false);
                alert({
                    title: '温馨提示',
                    content: content,
                    width: 400,
                    buttons: [
                        {
                            text: '我知道了',
                            type: 'primary',
                            handler: function () {
                                this.hide();
                            }
                        }
                    ]
                });
                return;
            } else {
                group.find('input[type="checkbox"]').prop('checked', true);
            }

        });

        // 刷新试听课数据
        if (store.get('trialId')) {
            refresh(store.get());
        }

    }

    /**
     * 填充表单数据
     *
     * @param {jQuery} form
     * @param {Object} data
     */
    function refresh (data) {

        var form = container.find('.form');

        // 试听课设置开关
        var switchIcon = container.find('.switch-icon');
        if (data.switchFlag == 1) {
            switchIcon.removeClass('off').addClass('on');
            switchStatus = 'on';
        } else if (data.switchFlag == 0) {
            switchIcon.removeClass('on').addClass('off');
            switchStatus = 'off';
        }

        // 试听时长
        trialTimeSelect.setValue(data.trialTime);

        // 上课方式与价格
        if (data.priceOnline) {
            form.find('input[name="online"]').prop('checked', true);
            form.find('input[name="price_online"]').val(data.priceOnline).prop('disabled', false);
        }

        if (data.priceOffline) {
            form.find('input[name="offline"]').prop('checked', true);
            form.find('input[name="price_offline"]').val(data.priceOffline).prop('disabled', false);
        }
    };


});