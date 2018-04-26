/**
 * @file 选择回放课节controller
 * @author niejianhui
 * @date 2017/08/09
 */
define(function() {
    'use strict';
    function SelectPlaybackCtrl($scope, playbackCourse, studentLiveServices) {

        function formatTime(timeStr) {
            var arr = timeStr.split(' ')[1].split(':');
            var displayTime = arr[0] + ':' + arr[1];
            return displayTime;
        } 

        function transferDateText(timeStr) {
            var arr = timeStr.split(' ')[0].split('-');
            var dateText = arr[1] + '-' + arr[2];
            return dateText;
        }


        function initView() {
            studentLiveServices
                .getPlaybackLessons({
                    data: {
                        playback_course_number: playbackCourse.playback_course_number
                    },
                    method: 'GET'
                })
                .then(function (response) {
                    $scope.lessonList = response.data;
                    $.each($scope.lessonList, function (index, item) {
                        item.beginTime = formatTime(item.begin_time);
                        item.endTime = formatTime(item.end_time);
                        item.dateText = transferDateText(item.begin_time);
                    });
                });

        }
        
        initView();

    }

    SelectPlaybackCtrl.$inject = ['$scope', 'playbackCourse', 'studentLiveServices'];

    return SelectPlaybackCtrl;
});