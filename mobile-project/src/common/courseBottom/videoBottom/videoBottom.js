/**
 * @file 视频课底部按钮
 * @author  hurry
 * @date  2017/1/14
 */
define(function (require) {
    'use strict';
    var shares = require('common/courseBottom/share/index');
    var consult = require('common/courseBottom/consult/index');
    var favor = require('common/courseBottom/favor/index');
    var callPhone = require('common/courseBottom/call/index');
    var download = require('common/courseBottom/download/index');
    var appController = require('common/app');
    var browserType = require('util/env');

    return function (options) {
        var consultBox = $('.consult-box');
        options.cdbName = 'cdb.teacher_class_course';
        //在非APP和微信、QQ环境中会有三个底导，其余有四个
        if (
            !(
                appController.isWeixin()
                || appController.isApp()
                || browserType.thirdapp.isQQ
            )
        ) {
            consultBox.show();
            // consultBox.addClass('cousult-three');
        } 
        else {
            consultBox.show();
            // consultBox.addClass('cousult-four');
        }
        
        shares(options);
        options.container = $('#container');
        consult(options);
        callPhone(options);
        favor(options, options.course_info.course_type);
        download(options);
    };
});