/**
 * @file 学生直播助手回放controller
 * @author niejianhui
 * @date 2017/08/09
 */
define(function (require) {
    'use strict';
    function Controller($scope, studentLiveServices, utilService, dialog, clientService) {
        var liveClient =  $('.live-content');
        var liveClientDom =  liveClient[0];  
        function getCourseList(page) {
            var params = {
                data: {
                    page: page
                },
                method: 'GET'
            };
            $scope.isLoading = true;
            studentLiveServices
                .getPlaybackCourse(params)
                .then(function (response) {
                    $scope.isLoading = false;
                    var data = response.data;
                    var list = data.list;
                    if (list && list.length) {
                        $scope.courseList = $scope.courseList.concat(list);
                    }
                    var pager = data.pager;
                    $scope.currentPage = pager.current_page;
                    var hasMore = pager.has_more;
                    if (!hasMore) {
                        liveClient.off('scroll');
                    }
                    //滚动到底部
                    if (+$scope.currentPage !== 1) {
                        setTimeout(function () {
                            var totalHeight = liveClientDom.scrollHeight;
                            var clientHeight = liveClientDom.clientHeight;
                            var scrollHeight = totalHeight - clientHeight - 100;
                            liveClient.animate({
                                'scrollTop': scrollHeight + 'px'
                            });
                        }, 300);
                    }
                });
        }
        
        function initView() {
            $scope.courseList = [];
            $scope.isSupportPlayback = clientService.isSupportMedia();
            if ($scope.isSupportPlayback) {
                getCourseList(1);
                $scope.courseLabelMap = {
                    1: '1V1',
                    2: '班课',
                    11: '机构1对1',
                    12: '机构班课'
                };
                liveClient.scroll(function () {
                    var totalHeight = liveClientDom.scrollHeight;
                    var scrollHeight = liveClientDom.scrollTop;
                    var clientHeight = liveClientDom.clientHeight;
                    if (scrollHeight + clientHeight >= totalHeight) {
                        getCourseList(++$scope.currentPage);
                    }
                });
            }
        }

        initView();

        $scope.refresh = function () {
            if (!$scope.isLoading) {
                $scope.courseList = [];
                initView();
            }
        };
        $scope.viewPlaybacks = function (item) {
            dialog
                .open({
                    title: '选择回放课节',
                    controller: require('module/commonPage/studentLive/playback/selectPlaybackDialog/controller'),
                    width: 590,
                    resolve: {
                        playbackCourse: function () {
                            return item;
                        }
                    },
                    skinClass: 'select-playback-dialog',
                    templateUrl: 'app/module/commonPage/studentLive/playback/selectPlaybackDialog/tpl.html'
                });
        };

        $scope.changePage = function (newVal) {
            getCourseList(newVal);
        };
    }

    Controller.$inject = ['$scope', 'studentLiveServices', 'utilService', 'dialog', 'clientService'];

    return Controller;
});