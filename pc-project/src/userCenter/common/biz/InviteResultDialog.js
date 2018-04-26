/**
 * @file 发送邀请码 返回结果 对话框
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Timer = require('cc/util/Timer');

    var service = require('../service');
    var constant = require('../constant');

    var ractiveDialog = require('../function/ractiveDialog');

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.price
     * @property {Function=} options.onafterhide 对话框关闭后的回调函数
     */
    function InviteResultDialog (options) {
        $.extend(this, options);
        this.init();
    }

    InviteResultDialog.prototype = {

        init: function () {

            var me = this;
            var userType = me.userType;
            var isSuccess = me.isSuccess;

            var counter = 5;
            var timer;

            var dialog = ractiveDialog({
                template: require('html!./InviteResultDialog.html'),
                data: {
                    role: userType == constant.USER_TYPE_TEACHER ? 'teacher' : 'student',
                    isSuccess: isSuccess,
                    counter: counter,
                    style: require('text!./InviteResultDialog.styl')
                },
                onrender: function () {

                    var me = this;

                    timer = new Timer({
                        task: function () {
                            counter--;
                            if (counter > 0) {
                                me.set('counter', counter);
                            }
                            else {
                                dialog.hide();
                            }
                        },
                        interval: 1000
                    });

                    timer.start();

                },
                onteardown: function () {
                    timer.dispose();
                },
                submit: function () {
                    dialog.hide();
                }
            });

            var onafterhide = me.onafterhide;
            if (onafterhide) {
                dialog.once('afterhide', function () {
                    if (isSuccess) {
                        onafterhide();
                    }
                });
            }

        }

    };

    return InviteResultDialog;

});