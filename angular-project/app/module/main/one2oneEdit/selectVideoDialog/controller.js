/**
 * @file 选择视频弹窗 controller
 * @author niejianhui
 */
define(function () {
    'use strict';

    SelectVideoDialogCtrl.$inject = ['$scope', '$state', 'one2oneEditService', 'courseVideoParams', '$sce'];

    function SelectVideoDialogCtrl($scope, $state, one2oneEditService, courseVideoParams, $sce) {

        function initView () {
            $scope.photoParam = '@1e_172w_96h_1c_0i_1o_90Q_1x';
            $scope.selectedVideo = {
                index: null
            };
            $scope.isLoading = true;
            one2oneEditService
                .getVideoList()
                .then(function (response) {
                    $scope.isLoading = false;
                    $scope.videos = response.data.query_multimedia_videos;
                    // angular.forEach($scope.videos, function (item) {
                    //     item.cover = $sce.trustAsResourceUrl(item.cover);
                    // });
                });
        }

        initView();

        $scope.confirmSelect = function () {
            var index = $scope.selectedVideo.index;
            var video = $scope.videos[index];
            courseVideoParams.push({
                media_id: video.id,
                title: video.title || '',
                cover_url: video.cover_url
            });
            $scope.dialog.close();
        };

    }

    return SelectVideoDialogCtrl;
});
