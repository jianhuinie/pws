/**
 * @file 关闭回放 controller
 * @author niejianhui
 */
define(function () {
    'use strict';
    Controller.$inject = ['$scope', 'cloudPlaybackService', 'courseInfo'];
    function Controller($scope, cloudPlaybackService, courseInfo) {
        function initView () {
            if (courseInfo.courseType === 1) {
                $scope.deleteMedia = true;
            }
            else {
                $scope.deleteMedia = false;
            }
        }

        initView();
        $scope.confirmDelete = function () {
            cloudPlaybackService
                .closePlaybackCourse({
                    is_delete_media: $scope.deleteMedia,
                    playback_course_number: courseInfo.course.playback_course_number
                })
                .then(function () {
                    $scope.dialog.dismiss();
                });
        };

    }

    return Controller;
});
