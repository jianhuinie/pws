/**
 * @file 优选一对一列表
 * @author niejianhui
 */
define(function () {
    'use strict';
    function Controller($scope, courseListService, $state, tipsService, utilService) {
        function initView() {
            $scope.isLoading = true;
            $scope.lessonWayArrayMap = {
                'TEACHER': '老师上门',
                'STUDENT': '学生上门',
                'ONLINE': '在线授课'
            };

            //获取一对一列表
            courseListService
                .getOne2oneList()
                .then(function (response) {
                    $scope.isLoading = false;
                    var data = response.data;
                    $scope.courseList = data.query_one_on_one_courses;
                    $scope.canAddNewcourse = data.query_one_on_one_can_add_new_one.flag;

                    //课时转换
                    // $.each($scope.courseList, function (index, item) {
                    //     item.teached_hours = +(item.teach_length_minutes / 60).toFixed(2);
                    // });

                    $.each($scope.courseList, function (indedx, item) {
                        if (item.display_status_teacher.status.state === 'VERIFY_FAILED') {
                            var content = '';
                            var verifyReasons = item.verify_outer_reasons.children;
                            $.each(verifyReasons, function (index1, item1) {
                                content += '<div>' + item1.name + ':</div>'
                                        +  '<ul>';
                                $.each(item1.reasons, function (index2, item2) {
                                    content += '<li>'
                                            +  (index2 + 1)
                                            +  '.'
                                            +  item2;
                                });
                                content += '</ul>';
                            });
                            item.verifyReasonsOpt = {
                                position: 'bottom',
                                content: content,
                                width: 500
                            };
                        }
                    });
                });
                $scope.addNewCourseUrl = location.origin + '/main.html#/one2oneEdit/';
        }
        initView();
        $scope.doAction = function (action, course) {
            switch (action.action) {
                case 'EDIT':
                    location.href = location.origin + '/main.html#/one2oneEdit/' + course.number;
                    break;
                case 'DELETE':
                    utilService.showMessage({
                        content: '确认删除该课程吗?',
                        hideCancel: false,
                        okHandler: function () {
                            courseListService
                                .deleteOne2oneCourse({
                                    number: course.number
                                })
                                .then(function (response) {
                                    tipsService.show({type: 'success', content:'删除成功', position: 'top'})
                                    .then(function () {
                                        location.reload();
                                    });
                                });
                        }
                    });
                    break;
            }
        };

        $scope.remindInfo = function () {
            utilService.showMessage('您签约科目的开课数量已达上限');
        };
    }

    Controller.$inject = [
        '$scope', 'courseListService', '$state', 'tipsService', 'utilService'
    ];
    return Controller;
});
