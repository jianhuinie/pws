/**
 * @file 日期
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope, $timeout) {
        var vm = $scope;

        function init() {
            vm.selectedDate1 = '2011-11-11';
            vm.options1 = {
                selectedDate: '2011-1-2',
                selectableBegin: '2011-1-1',
                selectableEnd: new Date(),
                onDateSelect: function () {}
            };

            vm.$watch('selectedDate1', function (newVal) {
                console.log(newVal);
            });
            
            $timeout(function () {
                vm.selectedDate2 = '2011-11-11';
                vm.options2 = {
                    // isDefaultSelected: false,
                    selectableBegin: '1985-1-1',
                    selectableEnd: '2020-11-11',
                    onDateSelect: function () {}
                };
            }, 1000);
        }
        init();
    }

    Controller.$inject = [
        '$scope', '$timeout'
    ];
    return Controller;
});
