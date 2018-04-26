/**
 * @file 选择成功案例 controller
 * @author niejianhui
 */
define(function () {
    'use strict';

    SelectCasesDialogCtrl.$inject = ['$scope', '$state', 'one2oneEditService', 
    'courseCasesParams', '$sce', 'utilService'];

    function SelectCasesDialogCtrl($scope, $state, one2oneEditService, 
        courseCasesParams, $sce, utilService) {

        function initView () {
            $scope.length = courseCasesParams.length;
            $scope.selectedCount = 0;
            $scope.isLoading = true;
            one2oneEditService
                .getCaseList()
                .then(function (response) {
                    $scope.isLoading = false;
                    $scope.cases = response.data.query_success_cases;
                    $.each($scope.cases, function (index, item) {
                        var date = item.date;
                        item.isNew = false;
                        item.editing = false;
                        item.displayDate = utilService.formatDateString(date);
                        item.timeStamp = new Date(date).getTime();
                    });
                });
        }

        initView();

        $scope.selectCase = function (caseItem) {
            if (caseItem.selected) {
                $scope.selectedCount--;
                caseItem.selected = false;
            }
            else {
                if (($scope.length + $scope.selectedCount) === 3) {
                    utilService.showMessage('案例数已超出限制');
                }
                else {
                    caseItem.selected = true;
                    $scope.selectedCount++;
                }
            }
        };

        $scope.confirmSelect = function () {
            $.each($scope.cases, function (index, item) {
                if (item.selected) {
                    courseCasesParams.push({
                        title: item.title || '',
                        date: item.date,
                        displayDate: item.displayDate,
                        timeStamp: item.timeStamp,
                        content: item.content,
                        // id: item.id,
                        editing: item.editing,
                        isNew: item.isNew
                    });
                }
            });
            $scope.dialog.close();
        };

    }

    return SelectCasesDialogCtrl;
});
