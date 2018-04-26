/**
 * @file 日期
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope) {
        var vm = $scope;
        function init() {
            vm.options = {
                position: 'bottom',
                content: 'hello world'
            };
        }
        init();
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});
