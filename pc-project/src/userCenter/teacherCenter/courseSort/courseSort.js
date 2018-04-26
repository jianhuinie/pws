/**
 * @file 课程排序
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var renderImage = require('../../common/function/renderImage');
    var service = require('./service');
    var Draggable = require('custom/helper/Draggable');
    var rectUtil = require('cc/util/rect');
    var getPosition = require('cc/function/position');
    var waitPromises = require('cc/function/waitPromises');

    exports.init = function (data) {

        var ractive = new Ractive({
            el: '#container',
            template: require('html!./courseSort.html'),
            data: {
                courseList: data.result,
                saveBtnStatus: 'disabled',
                originalCourseList: [],
                imImageDir: siteData.source + '/img/im'
            },
            oncomplete: function () {
                var me = this;
                var container = $(me.getElement());
                var listElement =
                me.listElement = container.find('.list-body');

                renderImage();

                // 存储原始课程顺序
                var tempCourseList = [];
                for (var i in me.get('courseList')) {
                    tempCourseList.push({
                        number: me.get('courseList')[i].number
                    });
                }
                me.set('originalCourseList', tempCourseList);

                // 拖拽
                var draggingElement;
                var beforeIndex, afterIndex, beforePosition;
                var elementList, rectList;
                var mainSelector = '.course-content';

                var isAnimating;

                var activeClass = 'active';
                var brotherClass = 'brother';
                var activeParentClass = 'active-parent';

                // 拖拽后，刷新列表
                var refreshList = function () {
                    beforeIndex = afterIndex = null;
                    elementList = container.find(mainSelector);
                    rectList = rectUtil.makeRectList(elementList, listElement);
                };

                refreshList();

                me.draggable = new Draggable({
                    mainElement: container,
                    mainSelector: mainSelector,
                    containerElement: listElement,
                    excludeSelector: ['.course-cover'],
                    draggingClass: 'dragging',
                    onpick: function (e, data) {
                        if (!isAnimating) {
                            draggingElement = data.mainElement;
                            draggingElement.addClass(activeClass);
                            draggingElement
                            .width(
                                draggingElement.width()
                            );

                            var itemElement = draggingElement.closest('.course-item');
                            itemElement
                            .addClass(activeParentClass)
                            .height(
                                itemElement.height()
                            );

                            refreshList();
                        }
                    },
                    onbeforedrag: function (e, data) {
                        beforeIndex = elementList.index(draggingElement);
                        if (isAnimating || !me.isDraggable(beforeIndex)) {
                            return false;
                        }
                        beforePosition = data;
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
                    onafterdrag: function (e, data) {

                        if (afterIndex == null) {
                            afterIndex = beforeIndex;
                        }

                        var staticStyle = {
                            position: '',
                            left: '',
                            top: ''
                        };

                        var duration = 100;
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

                                // 拖动时宽度不变
                                $.each(animateIndexes, function (index, value) {
                                    elementList.eq(value).width(
                                        elementList.eq(value).width()
                                    )
                                });

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
                            draggingElement.animate(
                                {
                                    left: beforePosition.left,
                                    top: beforePosition.top
                                },
                                duration,
                                easing,
                                function () {
                                    draggingElement.css(staticStyle);
                                    promise.resolve();
                                }
                            );
                        }

                        var beforeData = { };
                        $.each(animateIndexes, function (i, index) {
                            beforeData['courseList.' + index + '.animating'] = true;
                        });
                        me.set(beforeData);

                        isAnimating = true;

                        waitPromises(
                            animatePromises,
                            function () {
                                var list = me.get('courseList');

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

                                renderImage();

                                isAnimating = false;
                                // 因为元素顺序变了，所以要重新获取一次
                                refreshList();
                            }
                        );
                        me.set('saveBtnStatus', 'active');
                    },
                    ondrop: function (e, data) {
                        if (!isAnimating) {
                            draggingElement = data.mainElement;
                            draggingElement.removeClass(activeClass);
                            draggingElement
                            .width(
                                draggingElement.width()
                            );

                            var itemElement = draggingElement.closest('.course-item');
                            itemElement
                            .removeClass(activeParentClass)
                            .height('');
                        }
                    }
                });
            },
            isDraggable: function (index) { // 是否可拖拽

                if (index < 0) {
                    return false;
                }
                var list = this.get('courseList');
                if (list[index].animating) {
                    return false;
                }

                return true;
            },
            moveUp: function (index) { // 上移
                var me = this;
                if (index == 0) {
                    return;
                }
                else {
                    // 切出来需要移动的项
                    var temp = me.get('courseList').splice(index, 1);
                    // 将切出来的项插入上一位
                    me.get('courseList').splice(index - 1, 0, temp[0]);
                    // 重新渲染图片
                    renderImage();
                    me.set('saveBtnStatus', 'active');
                }
            },
            moveDown: function (index) { // 下移
                var me = this;
                if (index == me.get('courseList').length - 1) {
                    return;
                }
                else {
                    var temp = me.get('courseList').splice(index, 1);
                    me.get('courseList').splice(index + 1, 0, temp[0]);
                    renderImage();
                    me.set('saveBtnStatus', 'active');
                }
            },
            toTop: function (index) { // 置顶
                var me = this;
                if (index == 0) {
                    return;
                }
                else {
                    var temp = me.get('courseList').splice(index, 1);
                    me.get('courseList').unshift(temp[0]);
                    renderImage();
                    me.set('saveBtnStatus', 'active');
                }
            },
            saveSort: function () { // 保存排序

                var me = this;
                if (me.get('saveBtnStatus') == 'active') {
                    // 验证是否有变更顺序，并整理提交数据
                    var noChanged = true;
                    var tempData = [];
                    for (var i in me.get('courseList')) {
                        if (me.get('courseList')[i].number !== me.get('originalCourseList')[i].number) {
                            // 但凡有一组number不等，即顺序变动
                            noChanged = false;
                        }

                        tempData.push({
                            'number': me.get('courseList')[i].number,
                            'type': me.get('courseList')[i].type
                        });
                    };

                    if (noChanged) {
                        // me.topReminder();
                        tip({
                            content: '<i class="icon icon-info-circle"></i>&nbsp;您未改变课程排序',
                            type: 'info'
                        });
                        me.set('saveBtnStatus', 'disabled');
                    }
                    else {
                        service
                        .sortSave({
                            data: tempData
                        })
                        .then(function (response) {
                            me.set('saveBtnStatus', 'disabled');
                            tip({
                                content: '保存成功',
                                type: 'success'
                            });
                        });
                    }
                }
            }
        });
    };

});