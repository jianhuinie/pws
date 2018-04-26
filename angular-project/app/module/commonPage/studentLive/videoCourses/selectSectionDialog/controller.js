/**
 * @file 选择视频课课节controller
 * @author niejianhui
 * @date 2017/11/28
 */
define(function() {
    'use strict';
    function SelectSectionCtrl($scope, videoCourse, studentLiveServices, utilService) {
        var courseNumber = videoCourse.number;
        function initView() {
            studentLiveServices
                .getVideoSections({
                    data: {
                        course_number: courseNumber
                    },
                    method: 'GET'
                })
                .then(function (response) {
                    $scope.sectionList = response.data.list;
                    $scope.chapterList = response.data.list_chapter;
                    $scope.courseNumber = courseNumber;
                    if ($scope.chapterList.length) {
                        $.each($scope.chapterList, function (index, item) {
                            item.showSectionlist = true;
                        });
                    }
                });
        }
        
        initView();
        $scope.env = utilService.getEnvName();

        $scope.toggleShowList = function (chapter) {
            chapter.showSectionlist = !chapter.showSectionlist;
        };
    }

    SelectSectionCtrl.$inject = ['$scope', 'videoCourse', 'studentLiveServices', 'utilService'];

    return SelectSectionCtrl;
});