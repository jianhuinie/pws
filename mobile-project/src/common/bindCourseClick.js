/**
 * Created by chenmo on 16/2/18.
 * 班课里列表中的项在app中点击事件绑定
 */
define(function (require) {

    'use strict';
    var $ = require('zepto');
    var app = require('common/app');
    var service = require('common/service');
    var ui = require('common/ui');
    var env = require('util/env');
    var user = require('common/user');

    var openAppDialog = require('common/openAppDialog/openAppDialog');
    var enterClassRoom = require('common/enterClassRoom');
    var startChat = require('common/openAppDialog/startChat');
    var open400TelDialog = require('common/openAppDialog/open400TelDialog');

    var isApp;

    var pub;

    var redirect = function (href) {
        if (isApp) {
            if (href.indexOf('http') === -1) {
                href = location.origin + href;
            }
            app.openNewWindow(href);
        }
        else {
            location.href = href;
        }
    };


    return pub = {
        init: function () {

            var courseList = $('.course-list');
            isApp = app.isApp();

            courseList
                .on('click', 'a', function (e) {

                    var $this = $(this);

                    if ($this.attr('href') === '####') {
                        return;
                    }

                    var href = $(this).prop('href');
                    var number = $(this).data('number');

                    e.preventDefault();

                    // 这里有两种链接，没有number的直接跳转
                    if (!number
                        || (env.os.isAndroid && isApp )) {
                        redirect(href);
                        return;
                    }

                    service.post('/pay/checkClassOrder', {
                        course_number: number
                    }, function (response) {
                        var data = response.data;

                        if (!response.code) {

                            if (!data.is_login) {
                                if (isApp) {
                                    user.loginStudent();
                                }
                                else {
                                    //location.href = '/static/login?next=' + location.pathname + location.search;
                                    location.href = $this.prop('href');
                                }
                            }
                            else if (data.status) {
                                confirm({
                                    content: data.content,
                                    btnText: ['取消', data.text]
                                }).done(function () {
                                    if (data.status == 1 && isApp) {
                                        app.send('toPayCoursePurchase', {
                                            purchase_id: data.purchase_id
                                        });
                                    }
                                    else {
                                        redirect(data.url);
                                    }
                                });
                            }
                            else {
                                redirect(href);
                            }

                        }
                        else {
                            redirect(href);
                        }
                    });

                });

            pub.initChat(courseList.find('.course-toim'));
            pub.initGoLive(courseList.find('.course-tolive'));

        },
        initChat: function (elem, imData) {
            elem.on('click', function (e) {
                var $this = $(this);

                isApp = app.isApp();
                e.preventDefault();
                var huanxinId = $this.data('huanxinid') || $this.data('easemob');
                var tel400 = $this.data('tel');
                if (!tel400) {
                    startChat(huanxinId, imData);
                }
                else {
                    open400TelDialog.open(huanxinId, imData, tel400);
                }
            });
        },
        initGoLive: function (elem) {

            elem.each(function (index, item) {

                var $item = $(item);
                var leftTime = +$item.data('lefttime');
                var leftTimeSpan = $item.prev();

                var intval = setInterval(
                    function () {
                        if (leftTime > 0) {
                            var hour = Math.floor(leftTime / 3600);
                            var min = Math.floor((leftTime % 3600) / 60);
                            var sec = (leftTime % 3600) % 60;

                            if (min < 10) {
                                min = '0' + min;
                            }
                            if (sec < 10) {
                                sec = '0' + sec;
                            }

                            if (hour === 0) {
                                leftTimeSpan.html(''
                                    + '距离开课还有'
                                    + min + ' : ' + sec
                                );
                            }
                            else {
                                leftTimeSpan.html(''
                                    + '距离开课还有'
                                    + hour + ' : ' + min + ' : ' + sec
                                );
                            }

                        }
                        else {
                            leftTimeSpan.html('正在进行中');
                            window.clearInterval(intval);
                        }

                        leftTime -= 1;
                    },
                    1000
                );
            });


            elem.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                enterClassRoom({
                    class_course_number: $(this).data('number'),
                    mobile: $(this).data('ismobile')
                });

            });
        }
    };
});