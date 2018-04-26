/**
 * @file 找回密码 controller
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope, $timeout) {
        var vm = $scope;
        function init() {
            vm.totalCount = 200;
            vm.currentPage = 1;
            vm.pageSize = 20;
            vm.changePage = function (newVal, oldVal) {
                console.log(newVal);
                console.log(oldVal);
            };

            $timeout(function () {
                vm.totalCount = Math.ceil(Math.random() * 200);
            }, 2000);
        }
        init();
    }

    Controller.$inject = [
        '$scope', '$timeout'
    ];
    return Controller;
});
