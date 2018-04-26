/**
 * @file 老师个人中心配置
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('./service');

    var myCouponUrl = '/';

    exports.topMenus = [
        {
            name: 'userCenter',
            text: '个人中心',
            url: '/teacher_center/index'
        },
        {
            name: 'accountSettings',
            text: '账户设置',
            url: '/teacher_center/account'
        },
        {
            name: 'messageManage',
            text: '消息管理',
            url: '/teacher_center/message'
        },
        {
            name: 'vipCenter',
            text: '会员中心',
            url: '/teacher_center/vip_center'
        },
        {
            name: 'myHome',
            text: '我的主页',
            target: '_blank',
            url: siteData.host + '/' + userData.privateDomain
        }
    ];

    var env = siteData.env;
    var playbackUrl = 'http://' + env + '-b.genshuixue.com/detail.html#/cloudPlayback';
    if (env === 'www') {
        playbackUrl = 'http://b.genshuixue.com/detail.html#/cloudPlayback';
    }
    exports.sideMenus = [
        {
            name: 'manageOverview',
            text: '管理总览',
            url: '/teacher_center/index'
        },
        {
            name: 'courseManage',
            text: '课程管理',
            children: [
                {
                    name: 'myCourse',
                    text: '我的课表',
                    url: '/teacher_center/timetable'
                },
                {
                    name: 'courseSettings',
                    text: '课程设置',
                    url: '/teacher_center/set_course'
                },
                {
                    name: 'cloudPlayback',
                    text: '直播回放',
                    url: playbackUrl,
                    outer: 1
                },
                {
                    name: 'trialCourse',
                    text: '预约试听',
                    url: '/teacher_center/trial_course'
                }
            ]
        },
        {
            name: 'tradeManage',
            text: '交易管理',
            children: [
                {
                    name: 'orders',
                    text: '订单管理',
                    url: '/teacher_center/orders'
                },
                {
                    name: 'student',
                    text: '学生管理',
                    url: '/teacher_center/student'
                },
                {
                    name: 'comment',
                    text: '评价管理',
                    url: '/teacher_center/commentFromStudent'
                }
            ]
        },
        {
            name: 'profileManage',
            text: '个人设置',
            children: [
                {
                    name: 'cert',
                    text: '认证设置',
                    url: '/teacher_center/user_cert'
                },
                {
                    name: 'profile',
                    text: '资料管理',
                    url: '/teacher_center/profile'
                },
                {
                    name: 'address',
                    text: '地址管理',
                    url: '/tcenter/addresses/list'
                },
                {
                    name: 'org',
                    text: '我的机构',
                    url: '/teacher_center/org'
                }
            ]
        },
        {
            name: 'indexManage',
            text: '主页管理',
            children: [
                {
                    name: 'courseSort',
                    text: '课程排序',
                    url: '/tcenter/courses/all-courses/list-by-sort'
                },
                {
                    name: 'photos',
                    text: '我的照片',
                    url: '/teacher_center/photos'
                },
                {
                    name: 'video',
                    text: '我的视频',
                    url: '/teacher_center/video'
                },
                {
                    name: 'indexDecorate',
                    text: '主页装修',
                    className: 'index-decorate',
                    url: '/teacher_center/index_decorate'
                }
            ]
        },
        {
            name: 'dataCenter',
            text: '数据中心',
            url: '/teacher_center/visit_data'
        },
        {
            name: 'marketingCenter',
            text: '营销中心',
            children: [
                {
                    name: 'smsCenter',
                    text: '短信中心',
                    url: '/sms_account/center',
                    className: 'smsCenter',
                    outer: 1
                },
                {
                    name: 'myCoupon',
                    text: '优惠券',
                    target: '_blank',
                    url: myCouponUrl,
                    outer: 1
                },
                {
                    name: 'market',
                    text: '促销活动',
                    url: '/teacher_center/market?type=1'
                },
                /*{
                    name: 'activity',
                    text: '活动报名',
                    url: '/teacher_center/activity_apply'
                },*/
                {
                    name: 'alliance',
                    text: 'U盟推广',
                    target: '_blank',
                    className: 'alliance',
                    outer: 1
                }
            ]
        },
        {
            name: 'cashManage',
            text: '钱包管理',
            url: '/wallet/index'
        },
        {
            name: 'diskManage',
            text: '资料管理',
            children: [
                {
                    name: 'netdisk',
                    text: '资料库',
                    url: '/teacher_center/netdisk'
                },
                {
                    name: 'storage_space',
                    text: '存储空间',
                    url: '/teacher_center/storage_space'
                }
            ]
        },
        {
            name: 'moreFunction',
            text: '更多功能',
            children: [
                {
                    name: 'articleManage',
                    text: '文章管理',
                    target: '_blank',
                    url: siteData.host + '/' + userData.privateDomain + '/article',
                    outer: 1
                },
                {
                    name: 'bbs',
                    text: '社区互动',
                    target: '_blank',
                    url: 'http://bbs.genshuixue.com/',
                    outer: 1
                },
                {
                    name: 'myInvite',
                    text: '我的邀请',
                    url: '/teacher_center/invite'
                }
            ]
        },
        /*
        {
            name: 'teacherRank',
            text: '我的排名',
            url: '/teacher_center/teacherRank'
        },
        */
    ];

    exports.remove = function (list, target) {
        var search = function (list) {
            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i].name === target) {
                    list.splice(i, 1);
                    return;
                }
                else if (list[i].children) {
                    search(list[i].children);
                }
            }
        };
        search(list);
    };

    exports.search = function (list, target) {

        var result = [ ];
        var stack = [ ];

        var search = function (list) {
            $.each(
                list,
                function (index, item) {
                    stack.push(item);

                    if (item.name === target) {
                        $.merge(result, stack);
                        return false;
                    }
                    else if (item.children) {
                        search(item.children);
                    }

                    stack.pop();
                }
            );
        };

        search(list);

        return result;

    };

    exports.init = function () {

        // 底导 － 认证
        $('.cert').show();

        var sidebar = $('#sidebar');

        if (sidebar.length) {
            // 老师用户中心左导审核状态
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

        // 获取用户基本信息
        return service
        .getUserBasicInfo()
        .then(function (response) {
            var data = response.data;

            // 优惠券 url
            if (data.org_id) {
                // 机构老师
                myCouponUrl = '/teacher_center/myCoupons';

                // 机构老师隐藏推广联盟url和短信中心
                exports.remove(
                    exports.sideMenus,
                    'alliance'
                );

                exports.remove(
                    exports.sideMenus,
                    'smsCenter'
                );

            }
            else {

                // 展示url
                var env = siteData.env;
                var envUrlMap = {
                    dev: 'http://dev-marketing.genshuixue.com/couponList.html?userRole=0',
                    test: 'http://test-marketing.ctest.genshuixue.com/couponList.html?userRole=0',
                    beta: 'http://beta-marketing.genshuixue.com/couponList.html?userRole=0',
                    www: 'http://marketing.genshuixue.com/couponList.html?userRole=0'
                };
                myCouponUrl = envUrlMap[env] || envUrlMap['www'];

                // 推广联盟url
                var allianceUrlMap = {
                    dev: 'https://test-yingxiao.genshuixue.com/pc/lm/main.html#/lm/agreement',
                    test: 'https://test-yingxiao.genshuixue.com/pc/lm/main.html#/lm/agreement',
                    beta: 'https://yingxiao.genshuixue.com/pc/lm/main.html#/lm/live',
                    www: 'https://yingxiao.genshuixue.com/pc/lm/main.html#/lm/live'
                };

                var allianceUrl = allianceUrlMap[env] || allianceUrlMap['www'];
                var menuAlliance = exports.search(exports.sideMenus, 'alliance').pop();
                menuAlliance.url = allianceUrl;

            }
            var menuMyCoupon = exports.search(exports.sideMenus, 'myCoupon').pop();

            menuMyCoupon.url = myCouponUrl;
        });

    };

});