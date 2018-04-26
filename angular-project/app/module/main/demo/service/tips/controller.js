/**
 * @file dialog
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope, tipsService) {
        // var vm = $scope;
        // tipsService.show({
        //     element: '.container',
        //     content: 'hello world!'
        // });
        // $timeout(function () {
            tipsService.show('hi, hurry!');
        // }, 2000);
    }

    Controller.$inject = [
        '$scope', 'tipsService'
    ];
    return Controller;
});
