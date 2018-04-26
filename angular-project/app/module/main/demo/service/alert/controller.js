/**
 * @file 日期
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope, utilService) {
        var vm = $scope;
        vm.name = 'hurry';
        function init() {
            utilService
                .showMessage('test')
                .then(function (res) {
                    // ok
                    console.log(res);
                }, function (res) {
                    // cancel or close
                    console.log(res);
                });
        }
        init();
    }

    Controller.$inject = [
        '$scope', 'utilService'
    ];
    return Controller;
});
