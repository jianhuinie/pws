/**
 * @file 编辑视频课章信息
 * @author niejianhui
 *
 * usage:
 *
 * <edit-chapterinfo></edit-chapterinfo>
 *
 */
define(function () {
    'use strict';

    angular.module('Manage.videoCourseEdit.directives')
        .directive('editChapterinfo',
            ['$rootScope', 'utilService', function ($rootScope, utilService) {
                return {
                    restrict: 'E',
                    replace: true,
                    /**
                     * options.name   章的名称
                     * options.isEditing  是否是编辑态
                     * 这里把整个章的信息全传进来了
                     */
                    scope: {
                        options: '='
                    },
                    templateUrl: 'app/module/main/videoCourseEdit/ngDirective/editChapterInfo/tpl.html',
                    link: function ($scope) {

                        //触发状态改变事件
                        function emitShowAddChapterBtnEvent(data) {
                            $scope.$emit('hasEditingItemChange', data);
                        }

                        $scope.opts = $.extend({}, $scope.options);
                        //保存
                        $scope.saveChange = function () {
                            if (!$scope.opts.name) {
                                utilService.showMessage('请填写章名称');
                                return;
                            }
                            $scope.options.name = $scope.opts.name;
                            $scope.options.isEditing = false;
                            $scope.options.showSectionList = true;
                            emitShowAddChapterBtnEvent({
                                hasEditingItem: false,
                                chapterIndex: $scope.opts.chapterIndex
                            });
                        };
                        //取消
                        $scope.cancelChange = function () {
                            $scope.options.showSectionList = true;
                            $scope.options.isEditing = false;
                            emitShowAddChapterBtnEvent({
                                hasEditingItem: false,
                                chapterIndex: $scope.opts.chapterIndex
                            });
                        };

                    }
                };
            }
        ]);
});
