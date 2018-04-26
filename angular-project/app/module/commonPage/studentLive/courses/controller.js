/**
 * @file 学生直播助手课程列表controller
 * @author niejianhui
 * @date 2017/08/04
 */
define(function () {
    'use strict';
    function Controller($scope, studentLiveServices, utilService) {  
        function formatTime(timeStr) {
            var obj = {};
            var arr = timeStr.split(' ')[1].split(':');
            obj.displayTime = arr[0] + ':' + arr[1];
            obj.standardTime = new Date(timeStr).getTime();
            return obj;
        } 

        //显示今天还是日期
        function transferDateText(timeStr) {
            var today = new Date().getDate();
            var day = new Date(timeStr).getDate();
            var dateText = '今天';
            if (today !== day) {
                var arr = timeStr.split(' ')[0].split('-');
                dateText = arr[1] + '-' + arr[2];
            }
            return dateText;
        }

        function getCourseList() {
            var params = {
                data: {
                    is_live: 1,
                    date: utilService.formatDateString(new Date(), '-')
                },
                method: 'GET'
            };
            $scope.isLoading = true;
            studentLiveServices
                .getPagedCourses(params)
                .then(function (response) {
                    $scope.isLoading = false;
                    $scope.courseList = response.data.items;
                    $.each($scope.courseList, function (index, item) {
                        item.beginTime = formatTime(item.begin_time).displayTime;
                        item.endTime = formatTime(item.end_time).displayTime;
                        item.dateText = transferDateText(item.begin_time);
                        item.disabledEnterClassRoom = false;
                        var buttonStatus = item.live_room_params_pc.button_status;
                        if (buttonStatus === 'BEFORE') {
                            item.disabledEnterClassRoom = true;
                            item.remindTipOptions = {
                                position: 'bottom',
                                width: 200,
                                content: '课前4小时内可以进入'
                            };
                        }
                        else if (buttonStatus === 'AFTER') {
                            item.disabledEnterClassRoom = true;
                            item.remindTipOptions = {
                                position: 'bottom',
                                width: 240,
                                content: '下课超过3小时无法进入教室'
                            };
                        }
                    });
                });
        }
        
        function initView() {
            getCourseList();
            $scope.courseLabelMap = {
                1: '1对1',
                11: '直播课',
                12: '直播课',
                2: '直播课',
                5: '试听课',
            };
        }

        initView();

        $scope.refresh = getCourseList;
    }

    Controller.$inject = ['$scope', 'studentLiveServices', 'utilService'];

    return Controller;
});