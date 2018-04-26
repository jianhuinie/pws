/**
 * 日历范围选择
 * @author yanlingling
 * @date   2015/11/8
 */
angular
    .module('demo', ['library.directives'])
    .controller('daterangepickerCtrl', ['$scope', function ($scope) {

        init();

        /**
         * 初始化
         */
        function init() {
            $scope.dateRange = {
                begin: new Date('2015.7.10').getTime(),
                end: new Date('2015.7.18').getTime()
            };
            $scope.options = {
                selectableBegin: new Date('2014-1-1').getTime(),
                selectableEnd: new Date().getTime(),
                maxDuration: 10,
                onDateSelect: function (val) {
                    console.log('onDateSelect');
                    console.log(val);
                }
            };
        }
    }]);