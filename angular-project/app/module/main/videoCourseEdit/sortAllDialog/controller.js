/**
 * @file 整体排序弹窗
 * @author niejianhui
 */
define(function (require) {
    'use strict';
    var Draggable = require('cc-config/helper/Draggable');
    var rectUtil = require('cc/util/rect');

    function Controller($rootScope, $scope, params, dialog, utilService, $timeout) {

        var chapterSectionsCountArr;

        //更新章节统计的数组
        function refreshChapterSectionsCount() {
            chapterSectionsCountArr = [];
            if ($scope.chapterSections.length) {
                $.each($scope.chapterSections, function (index, item) {
                    chapterSectionsCountArr.push(item.sectionList.length);
                });
            }
        }

        //上报函数
        function reportSortActions(params) {
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

        function initView() {
            $scope.courseMode = params.courseMode;
            $scope.courseNumber = params.courseNumber;
            $scope.chapterSections = $.extend(true, [], params.chapterSections);
            $scope.sectionList = $.extend(true, [], params.sectionList);
            refreshChapterSectionsCount();
        }

        initView();

        // 累加前几项
        function sumSections(end) {
            var sum  = 0;
            for (var i = 0; i <= end; i++) {
                sum += chapterSectionsCountArr[i];
            }
            return sum;
        }

        // 计算章的索引
        function calculateChapterIndex(index) {
            var chapterIndex = 0;
            while (index > sumSections(chapterIndex)) {
                chapterIndex++;
            }
            return chapterIndex;
        }

        // 计算节的索引
        function calculateSectionIndex(chapterIndex, index) {
            return index - sumSections(chapterIndex - 1);
        }

        /*
        $timeout(function () {
            //拖动
            var draggingElement;

            var afterIndex;
            var beforeIndex;
            var elementList;
            var rectList;
            var element = $('.sortall-dialog').find('.content');
            var containerElement = element.find('.list-container');

            var activeClass = 'active';
            var brotherClass = 'brother';
            var activeParentClass = 'active-parent';
            var mainSelector = '.section-box';

            var refreshList = function () {
                beforeIndex = afterIndex = null;
                elementList = element.find(mainSelector);
                rectList = rectUtil.makeRectList(elementList, containerElement);
            };
            refreshList();

            var draggable = new Draggable({
                mainElement: element,
                mainSelector: mainSelector,
                containerElement: containerElement,
                includeSelector: ['.icon-ic_move'],
                draggingClass: 'dragging',
                onpick: function (e, data) {
                    draggingElement = data.mainElement;
                    draggingElement.addClass(activeClass);
                    draggingElement
                    .width(
                        draggingElement.width()
                    );

                    var parentElement = draggingElement.closest('.section-item');
                    parentElement
                    .addClass(activeParentClass)
                    .height(
                        parentElement.height()
                    );
                    refreshList();
                },
                onbeforedrag: function (e, data) {
                    beforeIndex = elementList.index(draggingElement);
                    afterIndex = null;
                },
                ondrag: function (e, data) {
                    var rect = {
                        left: data.left,
                        top: data.top,
                        width: rectList[beforeIndex].width,
                        height: rectList[beforeIndex].height
                    };
                    var list = rectUtil.sortByIntersectionArea(rect, rectList);
                    if ($.type(afterIndex) === 'number') {
                        elementList
                            .eq(afterIndex)
                            .removeClass(brotherClass);
                    }

                    var max = list[0].index !== beforeIndex
                        ? list[0]
                        : list[1];
                    if (max) {
                        var area = rect.width * rect.height;
                        // 随便大于一个阈值就行（比如 0.1）
                        if (area > 0 && max.area / area > 0.1) {
                            afterIndex = max.index;
                            elementList
                                .eq(afterIndex)
                                .addClass(brotherClass);
                            return;
                        }
                    }

                    afterIndex = null;
                },
                onafterdrag: function (e, data) {
                    if (afterIndex === null) {
                        afterIndex = beforeIndex;
                    }
                    $rootScope.safeApply(function () {
                        //多节模式下的拖动
                        if ($scope.courseMode === 'multiple') {
                            var dragItem = $scope.sectionList.splice(beforeIndex, 1);
                            $scope.sectionList.splice(afterIndex, 0, dragItem[0]);
                        }
                        else {
                            //计算拖动前后章节的索引
                            var beforeChapterIndex, beforeSectionIndex, afterChapterIndex, afterSectionsIndex, currentItem;
                            beforeChapterIndex = calculateChapterIndex(beforeIndex + 1);
                            afterChapterIndex = calculateChapterIndex(afterIndex + 1);
                            beforeSectionIndex = calculateSectionIndex(beforeChapterIndex, beforeIndex);
                            afterSectionsIndex = calculateSectionIndex(afterChapterIndex, afterIndex);
                            //章内拖动   排序
                            if (beforeChapterIndex === afterChapterIndex) {
                                currentItem = $scope.chapterSections[beforeChapterIndex].sectionList.splice(beforeSectionIndex, 1);
                                $scope.chapterSections[beforeChapterIndex].sectionList.splice(afterSectionsIndex, 0, currentItem[0]);
                            }
                            //章之间拖动  移动
                            else {
                                currentItem = $scope.chapterSections[beforeChapterIndex].sectionList.splice(beforeSectionIndex, 1);
                                $scope.chapterSections[afterChapterIndex].sectionList.splice(afterSectionsIndex, 0, currentItem[0]);
                            }
                        }

                        refreshChapterSectionsCount();
                        refreshList();
                        var staticStyle = {
                            'position': 'relative',
                            'top': 0,
                            'left': 0
                        };
                        elementList.removeClass(brotherClass).css(staticStyle).removeAttr('style');
                    });
                },
                ondrop: function (e, data) {
                    draggingElement = data.mainElement;
                    draggingElement.removeClass(activeClass);
                    draggingElement
                    .width(
                        draggingElement.width()
                    );
                    var parentElement = draggingElement.closest('.section-item');
                    parentElement
                    .removeClass(activeParentClass)
                    .height('');
                    reportSortActions({stype: 'batch_sort_drag'});
                }
            });
        });
        */

        /*
         * 下移
         *
         * @param {number} sectionIndex 移动项的节索引
         * @param {number=} chapterIndex 移动项的章索引 - 仅支持章内移动
         */
        $scope.moveDown = function (sectionIndex, chapterIndex) {
            if ($scope.courseMode === 'multiple') {
                var moveItem = $scope.sectionList.splice(sectionIndex, 1);
                $scope.sectionList.splice((sectionIndex + 1), 0, moveItem[0]);
            }
            else {
                var moveItem = $scope.chapterSections[chapterIndex].sectionList.splice(sectionIndex, 1);
                $scope.chapterSections[chapterIndex].sectionList.splice((sectionIndex + 1), 0, moveItem[0]);
            }
        };

        /*
         * 下移
         *
         * @param {number} sectionIndex 移动项的节索引
         * @param {number=} chapterIndex 移动项的章索引 - 仅支持章内移动
         */
        $scope.moveUp = function (sectionIndex, chapterIndex) {
            if ($scope.courseMode === 'multiple') {
                var moveItem = $scope.sectionList.splice(sectionIndex, 1);
                $scope.sectionList.splice((sectionIndex - 1), 0, moveItem[0]);
            }
            else {
                var moveItem = $scope.chapterSections[chapterIndex].sectionList.splice(sectionIndex, 1);
                $scope.chapterSections[chapterIndex].sectionList.splice((sectionIndex - 1), 0, moveItem[0]);
            }
        };

        // 默认不展示章列表
        $scope.showChapterList = false;
        $scope.toggleChapterList = function () {
            $scope.showChapterList = true;
        };

        /*
         * 多选课节 - checkbox框
         *
         * @param {number} chapterIndex 选中课节对应章索引
         * @param {number} sectionIndex 选中课节的索引
         */
        $scope.selectedSection = {};
        $scope.toggleSelectedSection = function (chapterIndex, sectionIndex) {

            if ($scope.selectedSection[chapterIndex]) {
                var exist = $scope.selectedSection[chapterIndex].indexOf(sectionIndex);
                if (exist === -1) {
                    $scope.selectedSection[chapterIndex].push(sectionIndex);
                }
                else {
                    $scope.selectedSection[chapterIndex].splice(exist, 1);
                }
            }
            else {
                $scope.selectedSection[chapterIndex] = [sectionIndex];
            }
        };

        /*
         * 跨章移动课节
         *
         * @param {number} targetChapter 目标章索引
         */
        $scope.throughChapterMove = function (targetChapter) {
            if ($.isEmptyObject($scope.selectedSection)) {
                utilService
                .showMessage({
                    title: '温馨提示',
                    content: '请选择要移动的课节'
                });
            }
            else {
                // 遍历已选课节列表 - 章
                for (var chapterIndex in $scope.selectedSection) {
                    if (+chapterIndex === +targetChapter) {
                        // 目标章内课节不予移动
                        continue;
                    }
                    else {
                        // 为忽略用户点选顺序，对已选课节重排序
                        var tempSectionList = $scope.selectedSection[chapterIndex].sort();

                        // 遍历章内课节
                        for (var i = 0, len = tempSectionList.length; i < len; i++) {
                            // 提示：被移动之后索引会变更
                            var moveItem = $scope.chapterSections[chapterIndex].sectionList.splice(tempSectionList[i] - i, 1);
                            $scope.chapterSections[targetChapter].sectionList.push(moveItem[0]);
                        }
                    }
                }
                // 清空已存储准备移动的项目
                $scope.selectedSection = {};
            }
            $scope.showChapterList = false;
            // 移动完成后，清空所有选中状态
            $.each($scope.chapterSections, function (index, chapter) {
                $.each(chapter.sectionList, function (i, section) {
                    section.checkedInput = false;
                });
            });
        };

        // 保存排序
        $scope.saveSort = function () {
            // 清空已存储准备移动的项目
            $.each($scope.chapterSections, function (index, chapter) {
                $.each(chapter.sectionList, function (i, section) {
                    section.checkedInput = false;
                });
            });

            if ($scope.courseMode === 'multiple') {
                $scope.dialog.dismiss($scope.sectionList);
            }
            else {
                $scope.dialog.dismiss($scope.chapterSections);
            }
            reportSortActions({stype: 'batch_sort_drag_save'});
        };

        // 取消排序
        $scope.cancelSort = function () {
            // 清空已存储准备移动的项目
            $.each($scope.chapterSections, function (index, chapter) {
                $.each(chapter.sectionList, function (i, section) {
                    section.checkedInput = false;
                });
            });

            $scope.dialog.close();
            reportSortActions({stype: 'batch_sort_drag_cancel'});
        };

        //移动到第几节
        $scope.moveTo = function (index, chapterIndex) {
            var sectionsCount = $scope.sectionList.length;
            if (chapterIndex !== undefined) {
                sectionsCount = $scope.chapterSections[chapterIndex].sectionList.length;
            }
            dialog.open({
                controller: require('module/main/videoCourseEdit/removeIndexDialog/controller'),
                width: 300,
                resolve: {
                    params: function () {
                        return {
                            sectionsCount: sectionsCount,
                            currentIndex: index
                        };
                    }
                },
                skinClass: 'remove-index-dialog',
                templateUrl: 'app/module/main/videoCourseEdit/removeIndexDialog/tpl.html'
            })
            .then(function (param) {
                var removeIndex = param.removeIndex;
                var moveItem;
                if ((index === removeIndex) || (index - removeIndex === 1)) {
                    //和当前课节重复 不移动
                    return false;
                }
                else if (index - removeIndex > 1) {
                    //移动到当前课节之后 由于移除的课节在后 要加一
                    removeIndex++;
                }
                //章节模式和多节模式分别处理
                if (chapterIndex !== undefined) {
                    moveItem = $scope.chapterSections[chapterIndex].sectionList.splice(index, 1)[0];
                    $scope.chapterSections[chapterIndex].sectionList.splice(removeIndex, 0, moveItem);
                }
                else {
                    moveItem = $scope.sectionList.splice(index, 1)[0];
                    $scope.sectionList.splice(removeIndex, 0, moveItem);
                }
            });
        };

    }

    Controller.$inject = [
        '$rootScope', '$scope', 'params', 'dialog', 'utilService', '$timeout'
    ];

    return Controller;
});
