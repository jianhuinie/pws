/**
 * @file 老师个人中心会员中心
 * @author wuhongjie
 */
define(function (require, exports) {


    'use strict';

    var toNumber = require('cc/function/toNumber');
    var renderImage = require('userCenter/common/function/renderImage');
    var service = require('common/service');
    var ConsultMemberDialog = require('../../vipCenter/component/ConsultMemberDialog');
    var VipUpdateDialog = require('../../vipCenter/component/VipUpdateDialog');
    var localStorage = require('cc/util/localStorage');


    exports.init = function (data) {

        var ydate = '';
        var renewSupport;

        var level = toNumber(userData.vip_level, 0);
        var isVip = level > 0;

        if (level) {
            if (level == 1) {
                ydate = data.vip_1.total_remain_days;
                renewSupport = data.vip_1.renew_support;
            }
            else if (level == 2) {
                ydate = data.vip_2.total_remain_days;
                renewSupport = data.vip_2.renew_support;
            }
            else if (level == 3) {
                ydate = data.vip_3.total_remain_days;
                renewSupport = data.vip_3.renew_support;
            }
        }

        new Ractive({
            el: '#main .wrapper',
            template: require('html!./index.html'),
            data:{
                isVip: isVip,
                vipLevel: userData.vip_level,
                isOrg: 0,
                name: userData.displayName,
                ydate: ydate,
                avatar: userData.avatar,
                level: level,
                url: userData.privateDomain,
                renewSupport: renewSupport,
                imgUrl: siteData.source + '/img',
                siteData: siteData
            },
            onrender : function(){

                var me = this;
                renderImage($('.vip-header'));

                if (!localStorage.get('noRemindVipUpdate')) {
                    me.vipUpdateDialog = new VipUpdateDialog();
                    me.vipUpdateDialog.show();
                }
                
                // 获取用户基本信息
                service
                .getUserBasicInfo()
                .then(function (response) {
                    var data = response.data;
                    me.set('isOrg', data.org_id);
                });
            },
            buyVip: function () {

                var opType = (level === 1) ? 2 : 1;
                var vipType = (level > 2) ? level : 2;
                var query = $.param({
                    vip_type: vipType,
                    op_type: opType
                });

                window.open('https://www.genshuixue.com/pay/vip?' + query);
            },
            consult: function () {
                var me = this;
                me.consultMemberDialog = new ConsultMemberDialog();
                me.consultMemberDialog.show();

            }

        });
    };

});
