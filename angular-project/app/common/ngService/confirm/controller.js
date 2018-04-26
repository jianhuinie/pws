/**
 * @file 日期
 * @author hurry
 */
define(function (require) {
    'use strict';
    var localStorage = require('cc/util/localStorage');
    function Controller($scope, dialogConfig, $sce, $timeout) {
        var vm = $scope;
        //设置缓存
        function setNotRemindAgainCache() {
            if (vm.cacheKey) {
                var cacheValue = vm.notRemindAgain ? 'notRemindAgain': 'remindAgain';
                localStorage.set(vm.cacheKey, cacheValue);
            }
        }

        function init() {
            vm.okBtnPosition = dialogConfig.okBtnPosition;
            vm.okBtnText = dialogConfig.okBtnText;
            vm.cancelBtnText = dialogConfig.cancelBtnText;
            vm.content = $sce.trustAsHtml(dialogConfig.content);
            vm.hideCancel = dialogConfig.hideCancel;
            vm.textClass = dialogConfig.textClass;
            vm.cacheKey = dialogConfig.cacheKey;
            vm.notRemindAgain = dialogConfig.notRemindAgain;
            vm.remindText = dialogConfig.remindText;
        }
        vm.okHandler = function () {
            setNotRemindAgainCache();
            if ($.isFunction(dialogConfig.okHandler)) {
                var result = dialogConfig.okHandler();
                if (result === false) {
                    return;
                }
            }
            vm.dialog.dismiss('ok');
        };
        vm.cancelHandler = function () {
            setNotRemindAgainCache();
            if ($.isFunction(dialogConfig.cancelHandler)) {
                var result = dialogConfig.cancelHandler();
                if (result === false) {
                    return;
                }
            }
            vm.dialog.close();
        };

        $timeout(function () {
            $('.close').on('click', function () {
                setNotRemindAgainCache();
                vm.dialog.close();
            });
        });

        init();
    }

    Controller.$inject = [
        '$scope', 'dialogConfig', '$sce',
        '$timeout'
    ];
    return Controller;
});
