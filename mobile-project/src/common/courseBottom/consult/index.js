/**
 * @file 咨询 
 * @date 2017/01/09
 */
define(function (require) {

    'use strict';
    var liudanClickLog = require('common/liudanClickLog/liudanClickLog');
    var bindCourseClick = require('common/bindCourseClick');
    var app = require('common/app');
    var user = require('common/user');
    var open400TelDialog = require('common/openAppDialog/open400TelDialog');
    var wxMask = require('common/component/wxMask/weixinMask');
    var env = require('util/env');
    var habo = require('common/component/analysis/habo/index');

    return function (options) {
        var container = options.container || $('.bottom');
        var consultBtn = container.find('.consult-box');
        var flag = consultBtn.data('flag');
        consultBtn.on('click', function () {
            var me = $(this);
            var stype = me.data('stype');
            if (stype) {
                habo.send({
                    type: that.data('stype')
                });
            }
            
            // 微信、qq在浏览器中打开
            if (env.thirdapp.isWeixin || env.thirdapp.isQQ) {
                wxMask.openMask('open');
                return;
            }
            else if (!app.isApp()) {
                // 非qq，浏览器环境，唤起app
                app.wakeUpApp();
                return;
            }
            //咨询还是咨询电话
            var that = $(this);
            // hurry: 咨询统一拆分为咨询和电话
            // //flag 1-预约咨询 2-咨询 3-机构电话咨询
            // if(flag == 1 || flag == 3) {
            //     liudanClickLog.send({
            //         stype: 4
            //     });
            //     location.href = that.attr('href');
            //     return;
            // }
            var tel = that.attr('href');
            if (tel.indexOf('tel:') > -1) {
                tel = tel.replace('tel:', '');
            }
            var im_data = options.im_data;
            var param = {
                c_id: im_data.c_id + '' || options.org_number + '',
                c_role: im_data.c_role + '',
                group_id: im_data.group_id + '' || ''

           };
            open400TelDialog.open(null, param, tel);
        });
    };
});
