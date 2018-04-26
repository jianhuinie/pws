define(function (require) {
    'use strict';
    var appController = require('common/app');
    var appoint = require('common/appoint/appoint');
    var StaySingle = require("common/staySingle/staySingle");
    var ui = require('common/ui');
    var isApp;

    var appointCourse = function (options) {
            var url = window.location.href;
            var param = {};
            param['courseType'] = 'org';
            param['title'] = options.class_name;
            if(options.classId) {
                param['objectId'] = options.classId;
            } else {
                param['objectId'] = options.class_number;
            }
            param['objectType'] = options.cdbName;
            param['detail_url'] = url;
            param['color'] = options.page_model;

            appoint.appoint(param);
    };

    var staySingleInit = function (options, that) {
        var _staySingle = new StaySingle({
            subject_name: options.subject_name_source,
            course_number: options.class_number_source
        });
        _staySingle.show({
            title: that.text()
        });
    }

    return function (options) {
        isApp = appController.isApp();
        var status = options.try_status;
        var tryDiv = $('.tryListen');
        var tryContainer = $('.try-container');
        var purchaseId = options.purchase_id;
        tryDiv.on('click', function () {
            var that = $(this);
            var flag = that.data('flag');
            //flag 1-预约试听 2-机构留单 3-平台留单

            appointCourse(options);

            // if(flag == 1) {
            //     if(status == 0 || status == 3 || status == 6) {
            //         var url = location.origin + that.data('href');
            //         if(isApp) {
            //             appController.openNewWindow(url);
            //         } else {
            //             location.href = url;
            //         }
            //     } else if(status == 4) {
            //         tryContainer.show();
            //         tryContainer.find('.cancel-pay').click(function () {
            //             tryContainer.hide();
            //         });
            //         tryContainer.find('.pay').click(function () {
            //             if (isApp) {
            //                 appController.toThirdPartyPayment(purchaseId);
            //             } else {
            //                 window.location.href = '/pay/payProductPurchase?purchase_id=' + purchaseId;
            //             }
            //             tryContainer.hide();
            //         });
            //     } else if(status == 5) {
            //         ui.remind("您不能购买自己的课程");
            //     } else if(status == 2 || status == 1) {
            //         tryContainer.show();
            //         tryContainer.find(".cancel-pay").click(function() {
            //             tryContainer.hide();
            //         });
            //         tryContainer.find(".pay").click(function() {
            //             tryContainer.hide();
            //         });
            //     } else {
            //         var url = location.origin + that.data('href');
            //         if (isApp) {
            //             appController.openNewWindow(url);
            //         } else {
            //             location.href = url;
            //         }
            //     }
            // } else if (flag == 2) {
            //     appointCourse(options);
            // } else {
            //     staySingleInit(options, that);
            // }
        });

    }
});
