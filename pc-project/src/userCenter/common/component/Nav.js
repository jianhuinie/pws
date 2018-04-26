/**
 * @file 页面顶部导航
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var Popup = require('custom/helper/Popup');
    var im = require('im/entrance');

    var service = require('../service');
    var constant = require('../constant');

    var InviteResultDialog = require('../biz/InviteResultDialog');

    return Ractive.extend({
        template: require('html!./Nav.html'),
        data: function () {

            return {
                loaded: true,
                userName: userData.displayName,
                userRole: userData.type === constant.USER_TYPE_TEACHER ? 'teacher' : 'student',
                courseList: '',
                rootHttp: siteData.rootHttp,
                rootHttps: siteData.rootHttps
            };

        },
        chatWithService: function(){
            im.chatToKF();
        },
        showHotlineService: function () {

            alert({
                title: '跟谁学官方客服电话',
                content: '<div class="hotline">'
                       +     '<i class="icon icon-phone-o"></i>'
                       +     '<span>4000-910-910</span>'
                       + '</div>'
                       + '<div>无论您是老师、学生还是家长，只要您有问题都可以致电跟谁学，我们的客服人员将尽快为您解答疑惑~感谢您对跟谁学的支持！</div>',
                width: 400,
                type: 'service-hotline-dialog',
                buttons: [
                    {
                        text: '好，我知道了',
                        type: 'primary',
                        action: function () {
                            this.hide();
                        }
                    }
                ]
            });

        },
        switchRole: function () {

            var targetRole = userData.type === constant.USER_TYPE_TEACHER
                           ? constant.USER_TYPE_STUDENT
                           : constant.USER_TYPE_TEACHER;

            service
            .getUserType()
            .then(function (response) {

                var roles = response.data.roles;

                var switchRole = function (isInvited) {
                    service
                    .sendInviteCode({
                        role: targetRole
                    })
                    .always(function (response) {

                        var callback = function () {

                            var url;

                            if (targetRole == constant.USER_TYPE_TEACHER) {
                                url = response.data.url;
                            }
                            else if (location.protocol === 'https:') {
                                url = 'http://' + siteData.env + '.genshuixue.com';
                            }
                            else {
                                url = document.URL;
                            }

                            location.href = url;

                        };

                        if (response.code === 0) {
                            if (isInvited) {
                                new InviteResultDialog({
                                    userType: targetRole,
                                    isSuccess: true,
                                    onafterhide: callback
                                });
                            }
                            else {
                                callback();
                            }
                        }
                        else {
                            if (isInvited) {
                                new InviteResultDialog({
                                    userType: targetRole,
                                    isSuccess: false
                                });
                            }
                            else {
                                alert('数据正在维护！');
                            }
                        }

                    });
                };

                // roles 数组元素是字符串，所以要先转下
                if ($.inArray('' + targetRole, roles) >= 0) {
                    switchRole();
                }
                else {
                    confirm({
                        title: '温馨提示',
                        content: '确认要开通' + (targetRole === constant.USER_TYPE_TEACHER ? '老师' : '学生' + '身份吗？'),
                        buttons: [
                            {
                                text: '立即开通',
                                type: 'primary',
                                action: function () {
                                    this.hide();
                                }
                            }
                        ]
                    })
                    .then(function () {
                        switchRole(true);
                    });
                }

            });
        },
        onrender: function () {

            var me = this;

            var popups =
            me.popups = [ ];

            me.observe(
                'loaded',
                function (loaded) {
                    if (!loaded) {
                        return;
                    }

                    var container = $(me.getElement());

                    $.each(
                        ['.my-home', '.my-course', '.my-favor', '.customer-service'],
                        function (index, selector) {

                            var itemElement = container.find(selector);
                            if (!itemElement.length) {
                                return;
                            }

                            var layerElement = itemElement.find('.tooltip');
                            if (!layerElement.length) {
                                return;
                            }

                            var popup = new Popup({
                                showLayerTrigger: 'enter',
                                showLayerDelay: 200,
                                hideLayerTrigger: 'leave,click',
                                hideLayerDelay: 200,
                                triggerElement: itemElement.find('> .link'),
                                layerElement: layerElement
                            });

                            popups.push(popup);

                            if (selector === '.my-course') {
                                popup.once('beforeopen', function () {

                                    service
                                    .getCourseList()
                                    .then(function (response) {
                                        me.set(
                                            'courseList',
                                            $.trim(response.data.tpl.course_list)
                                        );
                                        new Ractive({
                                            el: '.course-list',
                                            template: me.get('courseList')
                                        });
                                    });

                                });
                            }

                        }
                    );

                },
                {
                    defer: true
                }
            );

        },
        onteardown: function () {
            $.each(
                this.popups,
                function (index, popup) {
                    popup.dispose();
                }
            );
        }
    });

});