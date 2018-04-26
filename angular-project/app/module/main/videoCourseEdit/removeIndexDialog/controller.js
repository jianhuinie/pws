/**
 * @file 选择要移动到的课节索引 controller
 * @author niejianhui
 */
define(function () {
    'use strict';
    Controller.$inject = ['$scope', 'params', 'utilService', 'tipsService'];
    function Controller($scope, params, utilService, tipsService) {
        var validateOptions, validator;
        function initView () {
            $scope.currentIndex = params.currentIndex;
            $scope.sectionsCount = params.sectionsCount;
        }

        initView();

        $scope.confirmUpdate = function  () {
            var removeIndex = $scope.removeIndex;
            var sectionsCount = $scope.sectionsCount;
            if (removeIndex < 1 || removeIndex > sectionsCount) {
                utilService.showMessage('请输入1-' + sectionsCount + '的有效数字');
            }
            else {
                //这里减一转换成索引
                $scope.dialog.dismiss({
                    removeIndex: removeIndex - 1
                });
            }
        };

        $scope.cancelUpdate = function () {
            setTimeout(function () {
                $scope.dialog.close();
            }, 200);
        };
    }

    return Controller;
});
