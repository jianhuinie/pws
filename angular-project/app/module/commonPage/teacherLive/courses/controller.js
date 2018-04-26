/**
 * @file 老师直播助手课程列表controller
 * @author niejianhui
 * @date 2017/07/31
 */
define(function () {
    'use strict';
    function Controller($scope, teacherLiveServices, utilService) {  
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
                data: {},
                method: 'GET'
            };
            $scope.isLoading = true;
            teacherLiveServices
                .getPagedCourses(params)
                .then(function (response) {
                    $scope.isLoading = false;
                    $scope.courseList = response.data.query_teacher_timetable_live_client;
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
                                width: 320,
                                content: '课前4小时内可以进入，如需提前备课或上传课件，请通过直播助手进入'
                                         + '<a href="https://' + $scope.env + '.genshuixue.com/live/teacher_trial?number='
                                         + $scope.user.user_number
                                         + '">体验教室</a>'
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
            $scope.env = utilService.getEnvName();
            getCourseList();
            $scope.courseLabelMap = {
                'NORMAL_COURSE': '1对1',
                'CLASS_COURSE': '直播课',
            };
        }

        initView();

        $scope.refresh = getCourseList;
    }

    Controller.$inject = ['$scope', 'teacherLiveServices', 'utilService'];

    return Controller;
});