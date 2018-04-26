/**
 * @file 找回密码 controller
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope, $timeout) {
        var vm = $scope;
        
        $timeout(function () {
            vm.options = {
                // defaultValue: 1,
                onSelected: function (data) {
                    console.log(data);
                }
            };
            vm.options.defaultValue = 2;
            vm.options.dataSource = [
                {
                    text: 'hello',
                    value: 1
                },
                {
                    text: 'world',
                    value: 2
                }
            ];
        }, 1000);

        $timeout(function () {
            vm.options.dataSource = [];
        }, 2000);
    }

    Controller.$inject = [
        '$scope', '$timeout'
    ];
    return Controller;
});
