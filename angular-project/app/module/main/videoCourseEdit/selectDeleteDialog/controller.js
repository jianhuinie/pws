/**
 * @file 选择删除弹窗
 * @author niejianhui
 */
define(function () {
    'use strict';
    function Controller($rootScope, $scope, params, dialog, utilService) {
        
        function initView() {
            $scope.courseMode = params.courseMode;
            $scope.courseNumber = params.courseNumber;
            $scope.chapterSections = $.extend(true, [], params.chapterSections);
            $scope.sectionList = $.extend(true, [], params.sectionList);
        }

        initView();

        //上报函数
        function reportDeleteActions(params) {
            var typeArryMap = {
                'chapter': 'course_video_chapter_mode',
                'multiple': 'course_video_section_mode'
            };
            var defaultParams = {
                user_number: $rootScope.user.user_number,
                course_number: $scope.courseNumber || '',
                type: typeArryMap[$scope.courseMode]
            };
            var data = $.extend({}, defaultParams, params);
            WAT.send('https://click.genshuixue.com/gs.gif', data);
        }

        //处理章下的课节
        function toggleSedctionsSelected(chapter) {
            $.each(chapter.sectionList, function (index, item) {
                item.selected = chapter.selected;
            });
        }

        //处理节所属的章
        function toggleChapterSelected(selected, chapter) {
            if (chapter.selected !== selected) {
                var count = 0;
                $.each(chapter.sectionList, function (index, item) {
                    if (item.selected === selected) {
                        count++;
                    }
                });
                if (selected && count === chapter.sectionList.length) {
                    chapter.selected = true;
                }
                else if (!selected) {
                    chapter.selected = false;
                }
            }
        }

        //切换选中态
        $scope.toggleSelect = function (item, chapter) {
            item.selected = !item.selected;
            if (item.chapterIndex !== undefined) {
                toggleSedctionsSelected(item);
            }
            else if (chapter !== undefined) {
                toggleChapterSelected(item.selected, chapter);
            }
            reportDeleteActions({stype: 'batch_delete_select'});
        };

        //挑选未被选中的节
        function chooseSectionList(sectionList) {
            var newSectionList = [];
            $.each(sectionList, function (index, item) {
                if (!item.selected) {
                    newSectionList.push(item);
                }
            });
            return newSectionList;
        }

        //是否选中了课节
        function hasSelectedSection(sectionList) {
            var hasSelectedItem = false;
            $.each(sectionList, function (index, item) {
                if (item.selected) {
                    hasSelectedItem = true;
                    return false;
                }
            });
           return hasSelectedItem;
        }

        //是否选中了章节
        function hasSelectedChapterSection() {
            var hasSelectedItem = false;
            $.each($scope.chapterSections, function (index, chapter) {
                if (hasSelectedSection(chapter.sectionList)) {
                    hasSelectedItem = true;
                    return false;
                }
            });
           return hasSelectedItem;
        }

        //创建弹窗成功关闭的回调数据
        function createDialogDismissData() {
            if ($scope.chapterSections.length) {
                var chapterSections = [];
                $.each($scope.chapterSections, function (index, chapter) {
                    if (!chapter.selected) {
                        var chapterItem = {
                            chapterId: chapter.chapterId,
                            chapterIndex: chapter.chapterIndex,
                            isEditing: false,
                            showSectionList: false,
                            name: chapter.name,
                            selected: false,
                            sectionList: chooseSectionList(chapter.sectionList)
                        };
                        chapterSections.push(chapterItem);
                    }
                });
                $scope.dialog.dismiss(chapterSections);
            }
            else {
                $scope.dialog.dismiss(chooseSectionList($scope.sectionList));
            }
        }

        //执行删除操作
        function doDelete() {
            utilService
            .showMessage({
                title: '温馨提示',
                content: '删除后，课节及其视频将同步删除，确定删除所选课节吗？',
                hideCancel: false,
                okHandler: function () {
                    createDialogDismissData();
                    reportDeleteActions({stype: 'batch_delete_select_yes'});
                }
            });
        }

        //确认删除
        $scope.confirmDelete = function () {
            if ($scope.courseMode === 'multiple') {
                if (!hasSelectedSection($scope.sectionList)) {
                    utilService.showMessage('未选中要删除的课节');
                    return;
                }
            }
            else {
                if (!hasSelectedChapterSection()) {
                    utilService.showMessage('未选中要删除的章节');
                    return;
                }
            }
            doDelete();
        };

        //取消删除
        $scope.cancelDelete = function () {
            $scope.dialog.close();
            reportDeleteActions({stype: 'batch_delete_select_no'});
        };
    }

    Controller.$inject = [
        '$rootScope', '$scope', 'params', 'dialog', 'utilService'
    ];

    return Controller;
});
