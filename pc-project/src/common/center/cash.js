/**
 * @file 钱包管理
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');
    var service = require('common/service');
    var VideoDialog = require('common/component/VideoDialog');
    var UnbindCardDialog = require('common/component/UnbindCardDialog');
    var floatHelp = require('teacherCenter/component/floatHelp');

    var SettlementNoticeDialog = require('pay/component/SettlementNoticeDialog');

    /**
     * 初始化
     */
    exports.init = function () {

        var container = $('#content');
        var containerHistory = $('#cash-history');

        // ajax 获取钱包历史记录
        service
        .getCashHistoryList({
            page: 1,
            pageSize: 20
        })
        .done( function ( response ) {

            if ( response.code === 0 ) {

                var responseData = response.data;   // 后端返回的数据
                // 历史数据总数
                var count = responseData.history_list_tpl.pager.amount;

                if ( count ){
                    containerHistory.html(responseData.tpl.history_list_tpl);
                }
                else
                {
                    containerHistory.find('.no-data').show();
                }
            };
        });

        if (store.get('settlement') == 0) {
            service
            .getUserBasicInfo()
            .done(function (response) {

                if (response.code === 0) {
                    var data = response.data;
                    // 非机构老师需要弹窗
                    if (data.org_id != null && data.org_id == 0) {
                        SettlementNoticeDialog.show();
                    }
                }

            });
        }


        container


        // 提现
        .on('click', '#btn-withdraw', function (e) {

            var bankCardId = store.get('bankCardId');
            var balance = store.get('balance');
            var content;

            if (bankCardId) {

                if (balance > 0) {
                    location.href = store.get('withdrawPage');
                    return;
                }
                else {
                    content = '<i class="icon icon-info-circle"></i>'
                            + '余额不足，无法提现';

                    alert(content);
                }
            }

            else {
                content = ''
                        + '为保证你的资金安全，请绑定你本人的储蓄卡进行提现。如有疑问，请拨打客服热线4000-910-910'
                        + '<div class="dialog-action">'
                        +     '<a class="btn btn-primary" href="'
                        +          store.get('bindPage')
                        +     '">绑定银行卡</a>'
                        + '</div>';

                new Dialog({
                    title: '温馨提示',
                    content: content,
                    width: 400
                });
            }


        })
/**
        // 在选择授课方式的下方有个在线课程指引视频弹窗link
        .on('click', '.cash-guide-link', function (e) {
            e.preventDefault();

            var element = $(this);
            var url = element.prop('href');
            var title = element.text();

            new VideoDialog({
                url: url,
                title: title
            });
        })
*/
        // 充值
        .on('click', '#btn-recharge', function (e) {
            location.href = store.get('rechargePage');
        });

        containerHistory
        .on('click', '.pager a', function (e) {

            var target = $(e.currentTarget);
            var page = target.data('page');

            // ajax 获取钱包历史记录
            service
            .getCashHistoryList({
                page: page,
                pageSize: 20
            })
            .done( function ( response ) {

                if ( response.code === 0 ) {

                    var responseData = response.data;   // 后端返回的数据
                    // 历史数据总数
                    var count = responseData.history_list_tpl.pager.amount;

                    if ( count ){
                        containerHistory.html(responseData.tpl.history_list_tpl);
                    }
                    else
                    {
                        containerHistory.find('.no-data').show();
                    }
                };
            });
        })

        //计算错误提示框上偏移 top
        container
        .find('.failure')
        .hover(
            function () {
                var failure = $(this).find('.failure-text span');

                var height = failure.outerHeight();

                height = height + 24;
                failure.css('top', '-' + height + 'px');
            }
        );
        floatHelp.init();
    };

});