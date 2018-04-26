/**
 * 日期选择
 * @author yanlingling
 * @date   2015/11/08
 */
angular
    .module('demo', ['library.directives'])
    .controller('datetimepickerCtrl', ['$scope', function ($scope) {

        init();

        /**
         * 初始化
         */
        function init() {
            $scope.dateSelected = new Date('2014-6-18').getTime();
            $scope.options = {
                selectableBegin: new Date('2014-1-1').getTime(),
                selectableEnd: new Date().getTime(),
                onDateSelect: function (val) {
                    console.log('onDateSelect');
                    console.log(val);
                }
            };
        }
    }]);