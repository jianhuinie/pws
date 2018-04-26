/**
 * @file 日期
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope) {
        var vm = $scope;
        function init() {
            vm.testUrl = 'http://img4.duitang.com/uploads/item/201611/03/20161103224830_YGisc.thumb.700_0.jpeg';
        }
        init();
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});
