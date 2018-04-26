/**
 * @file 学生直播助手我的视频课controller
 * @author niejianhui
 * @date 2017/11/28
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
                .getVideoCourses(params)
                .then(function (response) {
                    $scope.isLoading = false;
                    var data = response.data;
                    var list = data.items;
                    if (list && list.length) {
                        $scope.courseList = $scope.courseList.concat(list);
                    }
                    var pager = data.pager;
                    $scope.currentPage = pager.current_page;
                    var hasMore = pager.has_more;
                    if (!hasMore) {
                        $('.live-content').off('scroll');
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
            $scope.isSupportVideo = clientService.isSupportMedia();
            if ($scope.isSupportVideo) {
                getCourseList(1);
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
        // 选择视频课节弹窗
        $scope.selectVideoSection = function (item) {
            dialog
                .open({
                    title: '目录',
                    controller: require('module/commonPage/studentLive/videoCourses/selectSectionDialog/controller'),
                    width: 590,
                    resolve: {
                        videoCourse: function () {
                            return item;
                        }
                    },
                    skinClass: 'select-section-dialog',
                    templateUrl: 'app/module/commonPage/studentLive/videoCourses/selectSectionDialog/tpl.html'
                });
        };
        //翻页
        $scope.changePage = function (page) {
            getCourseList(page);
        };
    }

    Controller.$inject = ['$scope', 'studentLiveServices', 'utilService', 'dialog', 'clientService'];

    return Controller;
});