/**
 * @file 日期
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope) {
        var vm = $scope;
        function init() {
            vm.editor = {
                value: ''
            };
        }
        vm.$watch('editor', function (newVal) {
            console.log(newVal);
        });
        init();
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});
