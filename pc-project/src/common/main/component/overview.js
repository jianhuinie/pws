/**
 * @file 用户中心左导js
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');

    exports.init = function () {

        var sidebar = $('#sidebar');

        // 老师用户中心左导审核状态
        if (store.get('user').type == 0) {
            service
            .overviewAudit({
            })
            .done(function (response) {

                if (response.code === 0) {

                    var audit = response.data.audit;
                    var sidebar = $('#sidebar');

                    // 试听课白名单 - 左导
                    var whiteTrialFlag = response.data.white_trial_flag;
                    window.whiteTrialFlag = response.data.white_trial_flag;
                    window.SiteTrialFlag = response.data.is_site_trial;
                    if (whiteTrialFlag == 1) {
                        sidebar.find('.white-flag').show();
                        $('#content').find('.white-flag').show();
                    }

                    // 试听课名单 － 老师首页

                    // 左导icon们
                    var profile = sidebar.find('.profile a');
                    if (audit.profile == 2) {
                        profile.after('<i class="icon icon-info-circle"></i>');
                    }

                    var course = sidebar.find('.course a');
                    if (audit.course_and_combo == 2) {
                        course.after('<i class="icon icon-info-circle"></i>');
                    }

                    var certification = sidebar.find('.certification a');
                    if (audit.user_cert == 2) {
                        certification.after('<i class="icon icon-info-circle"></i>');
                    }

                    var address = sidebar.find('.address a');
                    if (audit.address == 2) {
                        address.after('<i class="icon icon-info-circle"></i>');
                    }

                    var video = sidebar.find('.video a');
                    if (audit.video == 2) {
                        video.after('<i class="icon icon-info-circle"></i>');
                    }
                }

            });
        }

        // 用户基础信息 － 是否属于机构老师
        var env = store.get('env');

        service
        .getUserBasicInfo()
        .done(function (response) {
            if (response.code === 0) {
                // 优惠券链接
                var couponAnchor = sidebar.find('.coupon a');
                var allianceLi = sidebar.find('.alliance');
                var smsCenter = sidebar.find('.smsCenter');
                var allianceAnchor = allianceLi.find('a');
                if (response.data.org_id) { // 机构
                    couponAnchor.attr('href', '/teacher_center/myCoupons');
                    allianceLi.hide();
                    smsCenter.hide();

                } else { // 非机构

                    // 优惠券url
                    var envUrlMap = {
                        dev: 'http://dev-marketing.genshuixue.com/couponList.html?userRole=0',
                        test: 'http://test-marketing.ctest.genshuixue.com/couponList.html?userRole=0',
                        beta: 'http://beta-marketing.genshuixue.com/couponList.html?userRole=0',
                        www: 'http://marketing.genshuixue.com/couponList.html?userRole=0'
                    };
                    var url = envUrlMap[env] || envUrlMap['www'];
                    couponAnchor.attr('href', url);
                    couponAnchor.attr('target', '_blank');

                    // 推广联盟url
                    var allianceUrlMap = {
                        dev: 'https://test-yingxiao.genshuixue.com/pc/lm/main.html#/lm/agreement',
                        test: 'https://test-yingxiao.genshuixue.com/pc/lm/main.html#/lm/agreement',
                        beta: 'https://yingxiao.genshuixue.com/pc/lm/main.html#/lm/live',
                        www: 'https://yingxiao.genshuixue.com/pc/lm/main.html#/lm/live'
                    };
                    var allianceUrl = allianceUrlMap[env] || allianceUrlMap['www'];
                    allianceAnchor.attr('href', allianceUrl);
                    allianceAnchor.attr('target', '_blank');
                    allianceLi.show();
                }

                // 文章管理链接
                var articleAnchor = sidebar.find('.article a');
                articleAnchor.attr('href', 'http://www.genshuixue.com/' + response.data.user_number + '/article');
                articleAnchor.attr('target', '_blank');

            }
        });


    };

});