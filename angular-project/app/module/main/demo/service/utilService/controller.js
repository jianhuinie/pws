/**
 * @file dialog
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope, utilService) {
        var vm = $scope;
        var subjects = {
            1: {
                id: 1,
                name: 'hurry'
            },
            2: {
                id: 2,
                name: 'hello'
            },
            3: {
                id: 3,
                name: 'world'
            }
        };
        var str = utilService.JSON.stringify(subjects);
        console.log(str);
        vm.subjects = utilService.JSON.parse(str);
    }

    Controller.$inject = [
        '$scope', 'utilService'
    ];
    return Controller;
});
