/**
 * @file 日期
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope, demoService) {
        var vm = $scope;
        
        function init() {
            demoService
                .demo1()
                .then(function (res) {
                    console.log(res.data);
                    vm.data = res.data;
                });
        }
        init();
    }

    Controller.$inject = [
        '$scope', 'demoService'
    ];
    return Controller;
});
