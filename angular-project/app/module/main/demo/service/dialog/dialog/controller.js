/**
 * @file 找回密码 controller
 * @author yanlingling
 */
define(function () {
    'use strict';
    function Controller($scope) {
        var wrapper = $('.demo-dialog-wrapper');
        /**
         * 去绑定
         */
        $scope.bindHandler = function () {
            console.log(wrapper);
            $scope.dialog.close();
        };
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});
