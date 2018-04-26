/**
 * @file 规则：
 *  1、个体老师有试听课的点击跳转到试听课购买页面，没有试听课的是留单；
 *  2、机构老师的是机构留单
 *  3、直播课不显示预约试听
 */
define(function (require) {
    'use strict';
    var appController = require('common/app');
    var appoint = require('common/appoint/appoint');
    var StaySingle = require("common/staySingle/staySingle");
    var ui = require('common/ui');
    var isApp;
    var _staySingle;

    var appointCourse = function (options) {
        appoint.appoint({
            courseType: 'org',
            title: options.class_name,
            objectId: options.classId || options.class_number,
            objectType: options.cdbName,
            detail_url: window.location.href,
            color: options.page_model
        });
    };

    var staySingleInit = function (options, that) {
        if (!_staySingle) {
            var className = options.className ? options.className : 'tryListener-now';
            var place = options.place ? options.place : 'singleTeacher';
            var channel = '';
            //优选老师留单至boss系统
            if (options.isOne2oneTeacher) {
                channel = 'youxuan_teacher';
                place = 'sendToKefu';
                //加上来源区分 app或m站
                if (isApp) {
                    channel += '_app';
                }
                else {
                    channel += '_m';
                }
            }
            var objectParams = {
                subject_name: options.subject_name_source,
                course_number: options.class_number_source,
                teacher_number: options.teacherNumber || (Array.isArray(options.teacherInfo) && options.teacherInfo[0].number),
                // nanci: 韩炀需求，个体老师平台留单从客服接口转为成都接口，老师端 app 会收到学生预约试听相关信息
                place: place,
                channel: channel,
                className: className
            };
            if (options.channel) {
                objectParams.channel = options.channel;
            }

            _staySingle = new StaySingle(objectParams);
        }
        
        var dialogTitle = options.title ? options.title : that.text();
        var buttonTitle = options.buttonTitle ? options.buttonTitle : '确定预约';
        _staySingle.show({
            title: dialogTitle,
            buttonTitle: buttonTitle 
        });
    };

    return function (options) {
        isApp = appController.isApp();
        var status = options.try_status;
        var tryDiv = $('.tryListen');
        var tryContainer = $('.try-container');
        var purchaseId = options.purchase_id;
        tryDiv.on('click', function () {
            var that = $(this);
            var flag = that.data('flag');
            var url;
            //flag 1-预约试听 2-机构留单 3-平台留单

            // appointCourse(options);

            if(flag == 1) {
                if(status == 0 || status == 3 || status == 6) {
                    url = location.origin + that.data('href');
                    if(isApp) {
                        appController.openNewWindow(url);
                    } else {
                        location.href = url;
                    }
                } else if(status == 4) {
                    tryContainer.show();
                    tryContainer.find('.cancel-pay').click(function () {
                        tryContainer.hide();
                    });
                    tryContainer.find('.pay').click(function () {
                        if (isApp) {
                            appController.toThirdPartyPayment(purchaseId);
                        } else {
                            window.location.href = '/pay/payProductPurchase?purchase_id=' + purchaseId;
                        }
                        tryContainer.hide();
                    });
                } else if(status == 5) {
                    ui.remind("您不能购买自己的课程");
                } else if(status == 2 || status == 1) {
                    tryContainer.show();
                    tryContainer.find(".cancel-pay").click(function() {
                        tryContainer.hide();
                    });
                    tryContainer.find(".pay").click(function() {
                        tryContainer.hide();
                    });
                } else {
                    url = location.origin + that.data('href');
                    if (isApp) {
                        appController.openNewWindow(url);
                    } else {
                        location.href = url;
                    }
                }
            } else if (flag == 2 && !options.isOne2oneTeacher) {
                appointCourse(options);
            } else {
                staySingleInit(options, that);
            }
        });
    };
});
