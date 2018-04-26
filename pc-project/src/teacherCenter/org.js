/**
 * @file 我的机构
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');

    exports.init = function () {

        var container = $('#content');

        container
        .on('click', '.receive, .reject', function (e) {

            var element = $(this);
            var data = {};
            var txt = '';

            data.id = element.data('rid');
            var org = element.data('org');
            // 接受机构邀请
            if (element.hasClass('receive')) {
                data.status = 1;
                if (store.get('vipLevel') != 0) {
                    txt = '您现在是个体老师会员，签约机构则不再享有个体老师会员权益，但会员时间会继续计算。如解约后成为个体老师时会员仍在有效期则可以继续使用，确定签约吗？';
                }
                else {
                    txt = '接受邀请后您即加入机构，在机构期间的订单收入将由“'+org+'”发放。请你在接受邀请前与机构协商书面确定你的工作职责、工作时间、课酬等的权利和义务。';
                }

            } else {
                data.status = 2;
                txt = '拒绝“'+org+'”的邀请？';
            }

            confirm({
                content: txt,
                title: '温馨提示',
                width: 470
            })
            .done(function () {
                service
                .setOrgInvite(data,
                {
                    errorHandler:{
                        700000:function (response){
                            confirm({
                                title: "温馨提示",
                                content: response.msg
                            });
                        }
                    }
                })
                .done(function (response) {
                    if (response.code === 0) {
                        if (data.status == 1) {
                            success('接收成功，已加入机构');
                        } else {
                            success('拒绝成功');
                        }
                        setTimeout(function(){
                            location.reload();
                        },500);
                    }
                });
            });

        })
        .on('click', '.nav-item', function (e) {
            var element = $(this);
            container.find('.record-nav .nav-item').removeClass('active');
            element.addClass('active');

            if (element.text() == '已解约') {
                container.find('.invited-box').hide();
                container.find('.lifted-box').show();
                store.set('record', 'lifted');
                container.find('.list-nav .action').hide();
                container.find('.list-nav .fire-time').show();
                if (!container.find('.lifted-box').text()) {
                    service
                    .getOrgList({
                        number: store.get('number'),
                        status: 2,
                        page: 1,
                        pageSize: 10
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            var data = response.data ;
                            container.find('.lifted-box').html(data.tpl.org_list);
                        }
                    });
                }
            } else {
                container.find('.invited-box').show();
                container.find('.lifted-box').hide();
                store.set('record', 'invited');
                container.find('.list-nav .action').show();
                container.find('.list-nav .fire-time').hide();
            }
        })
        .on('click', '.receive-box input', function (e) {
            var element = $(this);
            var data = {};
            var txt = '';

            if (element.prop('checked')) {
                data.shieldStatus = 1;
                txt = '不接收任何机构向你发出的邀请信息？设置后，所有机构将无法向你发送邀请，系统将帮你自动拒绝已收到的所有邀请。';
            } else {
                data.shieldStatus = 0;
                txt = '接收机构向你发出的邀请信息？设置后，如你没有签约机构，所有机构可向你发送邀请。';
            }

            confirm({
                content: txt,
                title: '温馨提示',
                width: 460
            })
            .done(function () {
                service
                .shieldInvite(data)
                .done(function (response) {
                    if (response.code === 0) {
                        success('设置成功！');
                        if (data.shieldStatus == 1) {
                            element.prop('checked', true);
                        } else {
                            element.prop('checked', false);
                        }
                    }
                });
            });
            return false;

        })
        .on('click', '[data-page]', function (e) {
            var target = $(e.currentTarget);
            var status = store.get('record') == 'lifted' ? 2 : 1;

            service
            .getOrgList({
                number: store.get('number'),
                status: status,
                page: target.data('page'),
                pageSize: 10
            })
            .done(function (response) {
                if (response.code === 0) {
                    var data = response.data ;
                    if (status == 1) {
                        container.find('.invited-box').html(data.tpl.org_list);
                    } else {
                        container.find('.lifted-box').html(data.tpl.org_list);
                    }
                }
            });

            return false;
        })

    };

});