/**
 * @file 选择照片弹窗 controller
 * @author niejianhui
 */
define(function () {
    'use strict';

    SelectPicsDialogCtrl.$inject = ['$scope', '$state', 'one2oneEditService', 
    'coursePicsParams', '$sce', 'utilService'];
    function SelectPicsDialogCtrl($scope, $state, one2oneEditService, 
        coursePicsParams, $sce, utilService) {

        function initView () {
            $scope.photoParam = '@1e_172w_96h_1c_0i_1o_90Q_1x';
            $scope.length = coursePicsParams.length;
            $scope.selectedCount = 0;
            $scope.isLoading = true;
            one2oneEditService
                .getPhotoList()
                .then(function (response) {
                    $scope.isLoading = false;
                    $scope.photos = response.data.query_multimedia_photos;
                    // angular.forEach($scope.photos, function (item) {
                    //     item.url = $sce.trustAsResourceUrl(item.url);
                    // });
                });
        }

        initView();

        $scope.selectPic = function (photo) {
            if (photo.selected) {
                $scope.selectedCount--;
                photo.selected = false;
            }
            else {
                if (($scope.length + $scope.selectedCount) === 4) {
                    utilService.showMessage('照片数已超出限制');
                }
                else {
                    photo.selected = true;
                    $scope.selectedCount++;
                }
            }
        };

        $scope.confirmSelect = function () {
            $.each($scope.photos, function (index, item) {
                if (item.selected) {
                    coursePicsParams.push({
                        storage_id: item.storage_id,
                        image_url: item.url,
                        title: item.title || ''
                    });
                }
            });
            $scope.dialog.close();
        };

    }

    return SelectPicsDialogCtrl;
});
