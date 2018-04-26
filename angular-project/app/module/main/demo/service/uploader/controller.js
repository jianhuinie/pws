/**
 * @file dialog
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope, uploaderService) {
        var vm = $scope;
        vm.upload = function () {
            uploaderService.upload({
                type: 'pic'
            });
        };
    }

    Controller.$inject = [
        '$scope', 'uploaderService'
    ];
    return Controller;
});
