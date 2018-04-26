/**
 * @file  订单详情
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';


    var mobileOS;    // 系统版本 iOS, Android, unknown
    var mobileOSver; // string类型, 用 Number(mobileOSver) 转换

    function getMobileOS() {
        var ua = navigator.userAgent;
        var uaindex;

        // 判定系统 OS
        if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
            mobileOS = 'iOS';
            uaindex = ua.indexOf('OS ');
        } else if (ua.match(/Android/i)) {
            mobileOS = 'Android';
            uaindex = ua.indexOf('Android ');
        } else {
            mobileOS = 'unknown';
        }

        // 判定 version
        if (mobileOS === 'iOS' && uaindex > -1) {
            mobileOSver = ua.substr(uaindex + 3, 3).replace('_', '.');
        } else if (mobileOS === 'Android' && uaindex > -1) {
            mobileOSver = ua.substr(uaindex + 8, 3);
        } else {
            mobileOSver = 'unknown';
        }
    }

    function sendIOSCommand(cmd, param) {
        var url = 'bjstudent://' + cmd + '/' + param;
        console.log(url);
        document.location = url;
    }

    getMobileOS();

    var container = $('#mobile-body');
    var control = container.find('.order-control').eq(0);
    var purchaseId = control.data('id');//alert(purchaseId);
//    var _control_width = (100 / (control.children().length) + "%");
//    control.children().css('width', _control_width);


    /*
     *  OrderControlLesson   发起约课
     *  OrderControlComment  评论课程
     *  OrderControlPay      前往支付
     *  OrderControlAgain    再次购买
     *  OrderControlCancel   取消订单
     *  MakePhoneCall        打电话
     *  OrderAppeal          申诉
     *
     */
    control
            .on('click', '.order-control-lesson', function (e) {
                if (mobileOS === 'iOS') {
                    sendIOSCommand('OrderControlLesson', purchaseId);
                } else if (mobileOS === 'Android') {
                    window.bjstudent.OrderControlLesson('' + purchaseId + '');
                }
                return false;
            })
            .on('click', '.order-control-comment', function (e) {
                if (mobileOS === 'iOS') {
                    sendIOSCommand('OrderControlComment', purchaseId);
                } else if (mobileOS === 'Android') {
                    window.bjstudent.OrderControlComment('' + purchaseId + '');
                }
                return false;
            })
            .on('click', '.order-control-pay', function (e) {
                if (mobileOS === 'iOS') {
                    sendIOSCommand('OrderControlPay', purchaseId);
                } else if (mobileOS === 'Android') {
                    window.bjstudent.OrderControlPay('' + purchaseId + '');
                }
                return false;
            })
            .on('click', '.order-control-again', function (e) {
                if (mobileOS === 'iOS') {
                    sendIOSCommand('OrderControlAgain', teacher_id);
                } else if (mobileOS === 'Android') {
                    window.bjstudent.OrderControlAgain('' + teacher_id + '');
                }
                return false;
            })
            .on('click', '.order-appeal', function (e) {
                if (mobileOS === 'iOS') {
                    sendIOSCommand('OrderAppeal', '' + purchaseId);
                } else if (mobileOS === 'Android') {
                    window.bjstudent.OrderAppeal('' + purchaseId + '');
                }
                return false;
            })
            .on('click', '.order-control-cancel', function (e) {
                if (mobileOS === 'iOS') {
                    sendIOSCommand('OrderControlCancel', purchaseId);
                } else if (mobileOS === 'Android') {
                    window.bjstudent.OrderControlCancel('' + purchaseId + '');
                }
                return false;
            });

    if (mobileOS === 'Android') {
        $('.telphone').click(function () {
            window.bjstudent.MakePhoneCall(telphone);
            return false;
        });
    }

});