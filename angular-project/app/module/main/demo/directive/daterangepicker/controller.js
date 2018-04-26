/**
 * @file 日期
 * @author hurry
 */
define(function () {
    'use strict';
    function Controller($scope) {
        var vm = $scope;
        
        function init() {
            vm.selectedDate1 = {};
            vm.options1 = {
                isDefaultSelected: false,
                selectableBegin: '2011-1-1',
                selectableEnd: new Date(),
                onDateSelect: function () {}
            };

            vm.$watch('selectedDate1', function (newVal) {
                console.log(newVal);
            });
            // vm.selectedDate2 = {
            //     begin: new Date('2011-1-11').getTime(),
            //     end: new Date('2016-1-11').getTime()
            // };
            // vm.options2 = {
            //     isDefaultSelected: false,
            //     selectableBegin: '1985-1-1',
            //     selectableEnd: new Date(),
            //     onDateSelect: function () {}
            // };
        }
        init();
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});
