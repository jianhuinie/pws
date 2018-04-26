/**
 * @file 老师会员购买
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var urlUtil = require('cobble/util/url');

    /**
     * 获取是否有老师身份
     * @param  {Array} roles 身份数组
     * @return {Bool}  返回是否具有老师身份，默认为false
     */
    function getHasTeacherRole(roles) {
        var teacherRoleCode = "0";
        var length = roles.length;
        var hasTeacherRole = false;

        if (length > 0) {
            for(var i = 0; i < length; i++) {
               if (roles[i] === teacherRoleCode) {
                    hasTeacherRole = true;
                    break;
                }
            }
        }
        return hasTeacherRole;
    }

    exports.init = function () {

        var container = $('#main');

        var vipTypeMap = store.get('vipTypeMap');
        var vipType = store.get('vipType');
        var opType = store.get('opType');

        var vipTypeParam = urlUtil.parseQuery(location.search).vip_type;
        if (!vipTypeMap[vipTypeParam]) {
            vipTypeParam = vipType || 2;
        }

        var changeType = function (vipType) {

            container
                .find('.vip-type.active')
                .removeClass('active');

            container
                .find('.vip-type[data-type="' + vipType + '"]')
                .addClass('active');


            var target = vipTypeMap[vipType];

            container
                .find('.vip-duration')
                .html(target.days + ' 天');


            var text;
            if ($.isNumeric(target.price)
                && $.isNumeric(target.deduct)
                && $.isNumeric(target.pay_money)
            ) {
                text = target.price
                    + ' - '
                    + target.deduct
                    + '（剩余会员费） = '
                    + target.pay_money;
            }
            else {
                text = target.pay_money;
            }

            container
                .find('.pay-money')
                .html(text);

            var oriPrice = '';
            if ($.isNumeric(target.price)
                && !$.isNumeric(target.deduct)
            ) {
                oriPrice = target.price + '元';
                container
                    .find('.ori-price')
                    .html(oriPrice);
            }

        };

        changeType(vipTypeParam);

        var inviteCodeInput = container.find('input[name="inviteCode"]');

        container
        .on('click', '.vip-type', function () {

            var target = $(this);
            if (target.hasClass('active')) {
                return;
            }

            changeType(
                target.data('type')
            );

        })
        .on('click', '.invite-code-switcher', function (e) {
            inviteCodeInput.css({
                visibility: this.checked ? 'visible' : 'hidden'
            });
        })
        .on('click', '.btn-submit', function () {

            var haslogin = store.get('user').number > 0;
            if (haslogin) {
                if (store.get('user').type == 2) { // 学生身份先切换老师身份
                    new SwitchRoleDialog({
                        createText: '你目前是学生身份，无法开通会员，是否开通老师身份？',
                        switchText: '你目前是学生身份，需要切换到老师身份才能开通会员哦',
                        switchTo: 'teacher',
                        onSuccess: function () {
                            location.reload();
                        }
                    });
                }
                else { // 老师身份可开通会员
                    var activeMode = container.find('.vip-type.active');

                    var checkbox = container.find('.agree-clause');
                    if (!checkbox.prop('checked')) {
                        alert('开通会员必须接受并同意跟谁学会员服务条款');
                        return;
                    }

                    var type = activeMode.data('type');
                    var data = vipTypeMap[type];

                    service
                    .post(
                        '/pay/createVipPurchase',
                        {
                            vip_type: data.vip_type,
                            op_type: opType,
                            days: data.days,
                            pay_money: data.pay_money,
                            invite_code: inviteCodeInput.css('visibility') === 'hidden'
                                       ? ''
                                       : $.trim(inviteCodeInput.val())
                        },
                        {
                            errorHandler: {
                                '600001': function (response) {
                                    alert({
                                        title: '温馨提示',
                                        content: '当前只支持续费，暂不支持变更会员等级',
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
                                },
                                '600002': function (response) {
                                    alert({
                                        title: '温馨提示',
                                        content: '会员仅平台生效老师可购买，你需要完善资料并通过平台审核才能购买',
                                        buttons: [
                                            {
                                                text: '去认证',
                                                type: 'primary',
                                                handler: function () {
                                                    location.href = 'http://' + location.host + '/teacher_center/index';
                                                }
                                            },
                                            {
                                                text: '知道了',
                                                type: 'default',
                                                handler: function () {
                                                    this.hide();
                                                }
                                            }
                                        ]
                                    });
                                },
                                '600003': function (response) {
                                    alert({
                                        title: '温馨提示',
                                        content: '机构老师不支持购买个体老师会员哦',
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
                                }
                            }
                        }
                    )
                    .done(function (response) {
                        if (response.code === 0) {
                            location.href = '/pay/payProductPurchase?purchase_id='
                                          + response.data.purchase_id;
                        }
                    });
                }

            }
            else { // 未登录先登录
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                    }
                });
                return;
            }



        });

    };

});