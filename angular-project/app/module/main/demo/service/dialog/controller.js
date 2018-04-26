/**
 * @file dialog
 * @author hurry
 */
define(function (require) {
    'use strict';
    function Controller($scope, dialog) {
        dialog.open({
            title: '获取语音验证码<span style="margin-left:5px;color:#acacac;font-size:10px;">hello world!</span>',
            controller: require('./dialog/controller'),
            width: 370,
            templateUrl: 'app/module/main/demo/service/dialog/dialog/tpl.html',
        });
    }

    Controller.$inject = [
        '$scope', 'dialog'
    ];
    return Controller;
});
