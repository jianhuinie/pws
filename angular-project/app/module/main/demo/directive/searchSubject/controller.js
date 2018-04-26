/**
 * @file 找回密码 controller
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope) {
        var vm = $scope;
        
        function init() {
            vm.options = {
                onSelected: function () {
                    
                }
            };
        }
        init();
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});
