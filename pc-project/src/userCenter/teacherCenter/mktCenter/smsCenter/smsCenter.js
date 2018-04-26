/**
 * Created by chenmo on 16/4/14.
 *
 * 老师个人中心-营销中心-短信中心
 */
define(function (require, exports) {

    'use strict';

    var SmsRechargeDialog = require('./smsRecharge');
    var service = require('../service');
    var toNumber = require('cc/function/toNumber');

    var TYPE_RECHARGE = 1;
    var TYPE_GIFT = 2;
    var TYPE_NOTICE = 11;

    var STATUS_SENDING = 0;
    var STATUS_SUCCESS = 1;
    var STATUS_FAILURE = 2;

    exports.init = function (data) {

        new Ractive({
            el: '#container',
            template: require('html!./smsCenter.html'),
            data: {

                TYPE_RECHARGE: TYPE_RECHARGE,
                TYPE_GIFT: TYPE_GIFT,
                TYPE_NOTICE: TYPE_NOTICE,

                STATUS_SENDING: STATUS_SENDING,
                STATUS_SUCCESS: STATUS_SUCCESS,
                STATUS_FAILURE: STATUS_FAILURE,

                smsCount: data.account.left_count,
                openStatus: toNumber(data.account.status),// 0关闭 || 1开启
                smsList: data.records,
                formatType: function (type) {
                    var map = { };
                    map[TYPE_RECHARGE] = '短信充值';
                    map[TYPE_GIFT] = '短信赠送';
                    map[TYPE_NOTICE] = '上课通知短信';
                    return map[type];
                },
                formatNumber: function (number) {
                    return number > 0 && number < 10 ? '0' + number : number;
                },
                pagerOptions: {
                    page: toNumber(data.pager.page),
                    count: Math.ceil(data.pager.total / data.pager.page_size)
                }
            },
            oncomplete: function () {
                this.observe('pagerOptions.page', function (page) {
                    this.nextPage(page);
                });
            },
            setNotice: function () {
                var currentStatus = this.get('openStatus');
                var instance = this;
                if (currentStatus) {
                    confirm({
                        title: '温馨提示',
                        width: 350,
                        content: '关闭此功能您的学生将无法收到短信提醒',
                        buttons: [
                            {
                                text: '确认',
                                type: 'primary',
                                action: function () {
                                    var me = this;
                                    service
                                    .switchStatus({
                                        status: !currentStatus
                                    })
                                    .then(function (res) {
                                        var resStatus = toNumber(res.data.status);
                                        if(res.data.status == 0) {
                                            me.hide();
                                            instance.set('openStatus', resStatus);
                                        }
                                    });

                                }
                            },
                            {
                                text: '取消',
                                type: 'secondary',
                                action: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                }
                else {
                    service
                        .switchStatus({
                            status: !currentStatus
                        })
                        .then(function (res) {
                            var resStatus = toNumber(res.data.status);
                            if(res.data.status == 1) {
                                instance.set('openStatus', resStatus);
                            }
                        });
                }
            },
            recharge: function () {
                var dialog = new SmsRechargeDialog({
                    onPay: function () {
                        confirm({
                            title: '短信充值',
                            content: '请您在新打开的页面上完成支付，支付后点击下方按钮查看充值结果',
                            buttons: [
                                {
                                    text: '支付成功',
                                    type: 'primary',
                                    action: function () {
                                        location.reload();
                                    }
                                },
                                {
                                    text: '支付失败',
                                    type: 'secondary',
                                    action: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                });
                dialog.show();
            },
            nextPage: function (page) {
                var me = this;
                service
                    .nextPage({
                        page: page
                    })
                    .then(function (response) {
                        var data = response.data;
                        me.set('smsList', data.records);
                        me.set('pagerOptions.page', toNumber(data.pager.page));
                        me.set('pagerOptions.count', Math.ceil(data.pager.total / data.pager.page_size));
                    });
            },
            components: {
                Pager: require('../../../common/component/Pager')
            }
        });

    };
});
