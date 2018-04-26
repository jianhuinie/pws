/**
 * @file 视频列表，可拖拽
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var Draggable = require('custom/helper/Draggable');
    var getPosition = require('cc/function/position');
    var waitPromises = require('cc/function/waitPromises');

    var rectUtil = require('cc/util/rect');

    var constant = require('../constant');
    var service = require('../service');

    return Ractive.extend({
        template: require('html!./CourseSectionFormList.html'),
        data: function () {
            var me = this;
            return {
                courseNumber: '',
                validateVideo: function (video) {

                    var exists = false;

                    $.each(
                        me.get('options.list'),
                        function (index, item) {
                            if (item.videoName === video.videoName
                                || item.uploadingVideoName === video.videoName
                            ) {
                                exists = true;
                                return false;
                            }
                        }
                    );

                    var error;
                    if (exists) {
                        error = '请不要上传重复的视频';
                    }

                    // 文件名太长后端会报错
                    else if (video.videoName.length > 40) {
                        error = '视频文件名请不要超过40个字';
                    }

                    if (error) {
                        tip({
                            type: 'error',
                            content: error
                        });
                        return false;
                    }

                    return true;

                },
                options: {
                    list: [ ]
                }
            };
        },
        components: {
            CourseSectionForm: require('./CourseSectionForm')
        },
        oncomplete: function () {

            var me = this;
            var container = $(me.getElement());

            var mainElement;
            var mainSelector = '.course-section-form';

            var elementList;
            var rectList;

            var refreshList = function () {
                beforeIndex = afterIndex = null;
                elementList = container.find(mainSelector);
                rectList = rectUtil.makeRectList(elementList);
            };

            refreshList();

            var beforeIndex;
            var beforePosition;

            var afterIndex;

            var activeClass = 'active';
            var brotherClass = 'brother';

            var isAnimating;
            me.draggable = new Draggable({
                mainElement: container,
                mainSelector: mainSelector,
                draggingClass: 'dragging',
                excludeSelector: [
                    '.input',
                    '.button',
                    '.radio',
                    '.icon',
                    '.btn-del'
                ],
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

                    if (max && me.isDraggable(max.index)) {
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
                onpick: function (e, data) {
                    console.log(data)
                    if (!isAnimating) {
                        mainElement = data.mainElement;
                        mainElement.addClass(activeClass);
                        refreshList();
                    }
                },
                ondrop: function (e, data) {
                    if (!isAnimating) {
                        mainElement = data.mainElement;
                        mainElement.removeClass(activeClass);
                    }
                },
                onbeforedrag: function (e, data) {
                    beforeIndex = elementList.index(mainElement);
                    if (isAnimating || !me.isDraggable(beforeIndex)) {
                        return false;
                    }
                    beforePosition = data;
                    afterIndex = null;
                },
                onafterdrag: function (e, data) {
                    if (afterIndex == null) {
                        afterIndex = beforeIndex;
                    }

                    var staticStyle = {
                        position: '',
                        left: '',
                        top: ''
                    };

                    var duration = 500;
                    var easing = 'easeOutQuad';

                    // 动画的索引
                    var animateIndexes = [ ];
                    // 动画的 promise
                    var animatePromises = [ ];
                    // 从那个位置移动到哪个位置
                    var movingMap = { };

                    if (afterIndex !== beforeIndex) {

                        if (beforeIndex > afterIndex) {
                            movingMap[beforeIndex] = afterIndex;
                            for (var i = afterIndex; i < beforeIndex; i++) {
                                movingMap[i] = i + 1;
                            }
                        }
                        else {
                            movingMap[beforeIndex] = afterIndex;
                            for (var i = beforeIndex + 1; i <= afterIndex; i++) {
                                movingMap[i] = i - 1;
                            }
                        }

                        var positionMap = { };
                        positionMap[beforeIndex] = beforePosition;

                        var getPositionByIndex = function (index) {
                            var position = positionMap[index];
                            if (!position) {
                                position = getPosition(
                                    elementList.eq(index)
                                );
                                positionMap[index] = position;
                            }
                            return position;
                        };

                        $.each(movingMap, function (fromIndex, toIndex) {

                            animateIndexes.push(fromIndex);

                            var promise = $.Deferred();
                            animatePromises.push(promise);

                            var toElement = elementList.eq(toIndex);
                            var toPosition = getPositionByIndex(toIndex);

                            var toParentElement = toElement.parent();
                            var toStyle = {
                                left: toPosition.left,
                                top: toPosition.top
                            };

                            var currentElement = elementList.eq(fromIndex);
                            var currentPosition = getPositionByIndex(fromIndex);
                            var currentStyle = {
                                left: currentPosition.left,
                                top: currentPosition.top
                            };

                            if (fromIndex != beforeIndex) {
                                currentElement.css(currentPosition);
                            }

                            currentElement.animate(
                                toStyle,
                                duration,
                                easing,
                                function () {
                                    currentElement
                                        .css(staticStyle)
                                        .removeClass(brotherClass);
                                    toParentElement.append(currentElement);
                                    promise.resolve();
                                }
                            );

                        });

                    }
                    else {
                        animateIndexes.push(beforeIndex);

                        var promise = $.Deferred();
                        animatePromises.push(promise);

                        mainElement.animate(
                            {
                                left: beforePosition.left,
                                top: beforePosition.top
                            },
                            duration,
                            easing,
                            function () {
                                mainElement.css(staticStyle);
                                promise.resolve();
                            }
                        );
                    }

                    var beforeData = { };
                    $.each(animateIndexes, function (i, index) {
                        beforeData['options.list.' + index + '.animating'] = true;
                    });
                    me.set(beforeData);

                    isAnimating = true;

                    waitPromises(
                        animatePromises,
                        function () {

                            var list = me.get('options.list');

                            $.each(animateIndexes, function (i, index) {
                                list[index].animating = false;
                            });

                            var newList = [];
                            $.each(list, function (index, item) {
                                if (movingMap[index] != null) {
                                    newList[movingMap[index]] = item;
                                }
                                else {
                                    newList[index] = item;
                                }
                            });

                            list.splice(0, list.length);
                            list.push.apply(list, newList);

                            isAnimating = false;

                            // 因为元素顺序变了，所以要重新获取一次
                            refreshList();
                        }
                    );

                },
            });

            me.on('CourseSectionForm.save', function (data) {
                var sectionIndex = data.sectionIndex;
                var index = sectionIndex - 1;
                var itemKey = 'options.list.' + index;
                var item = me.get(itemKey);

                var courseNumber = me.get('courseNumber');
                if (!courseNumber) {
                    alert({
                        title: '温馨提示',
                        content: '请先保存第一步'
                    });
                    return;
                }

                service
                .saveSection({
                    number: courseNumber,
                    sectionIndex: data.sectionIndex,
                    sectionId: item.sectionId,
                    sectionName: item.sectionName,
                    videoId: item.videoId,
                    videoName: item.videoName,
                    payStatus: item.payStatus,
                    action: item.sectionId
                        ? constant.COURSE_SECTION_ACTION_EDIT
                        : constant.COURSE_SECTION_ACTION_CREATE
                })
                .then(
                    function (response) {
                        var data = response.data;
                        if (data.section_id) {
                            me.set(itemKey + '.sectionId', data.section_id);
                        }
                    },
                    function () {
                        tip({
                            type: 'error',
                            content: '第' + sectionIndex + '课节自动保存失败'
                        });
                    }
                );
            });
            me.on('CourseSectionForm.delete', function (data) {

                var courseNumber = me.get('courseNumber');
                if (!courseNumber) {
                    alert({
                        title: '温馨提示',
                        content: '请先保存第一步'
                    });
                    return;
                }

                var deleteChecked;
                confirm({
                    title: '温馨提示',
                    content: '确认删除该课节吗？',
                    width: 400,
                    checkboxLabel: '是否删除视频',
                    onbeforehide: function (checked) {
                        deleteChecked = checked;
                    }
                })
                .then(function () {

                    var list = me.get('options.list');
                    var index = data.sectionIndex - 1;
                    var item = list[index];

                    if (item.sectionId) {
                        service
                        .deleteSection({
                            sectionId: item.sectionId,
                            deleteMedia: deleteChecked
                        })
                        .then(function () {
                            list.splice(index, 1);
                        });
                    }
                    else {
                        list.splice(index, 1);
                    }
                });
            });
        },
        onteardown: function () {
            this.draggable.dispose();
        },
        isDraggable: function (index) {
            if (index < 0) {
                return false;
            }
            var list = this.get('options.list');
            if (list[index].animating) {
                return false;
            }
            // 有视频正在上传就不能拖，因为拖动完成会重新生成组件，这时候上传状态必然会丢
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i].uploading) {
                    return false;
                }
            }
            return true;
        }
    });

});