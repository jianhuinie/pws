/**
 * @file 富文本编辑
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var Draggable = require('custom/helper/Draggable');

    var rectUtil = require('cc/util/rect');
    var getPosition = require('cc/function/position');
    var waitPromises = require('cc/function/waitPromises');

    return Ractive.extend({
        template: require('html!./Editor.html'),
        data: function () {
            return {
                style: require('text!./Editor.styl'),
                checkedIndex: '',
                options: {
                    list: [
                        {
                            type: 'title',
                            options: {
                                text: '编辑段落标题'
                            }
                        }
                    ]
                }
            };
        },
        computed: {
            isUploading: function () {
                var list = this.get('options.list');
                for (var i = 0, len = list.length; i < len; i++) {
                    if (list[i].options.uploading) {
                        return true;
                    }
                }
                return false;
            }
        },
        oncomplete: function () {
            var me = this;
            var container = $(me.getElement());
            var listElement =
            me.listElement = container.find('.editor-list');

            var mainSelector = '.editor-content';

            var isAnimating;

            var draggingElement;

            var afterIndex;
            var beforeIndex;
            var beforePosition;

            var elementList;
            var rectList;

            var activeClass = 'active';
            var brotherClass = 'brother';
            var activeParentClass = 'active-parent';

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
                includeSelector: ['.draggable-icon'],
                draggingClass: 'dragging',
                onpick: function (e, data) {
                    if (!isAnimating) {
                        draggingElement = data.mainElement;
                        draggingElement.addClass(activeClass);
                        draggingElement
                        .width(
                            draggingElement.width()
                        );

                        var itemElement = draggingElement.closest('.editor-item');
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
                ondrop: function (e, data) {
                    if (!isAnimating) {
                        draggingElement = data.mainElement;
                        draggingElement.removeClass(activeClass);
                        draggingElement
                        .width(
                            draggingElement.width()
                        );

                        var itemElement = draggingElement.closest('.editor-item');
                        itemElement
                        .removeClass(activeParentClass)
                        .height('');
                    }
                }
            });

            me.on('*.remove', function (data) {
                var list = me.get('options.list');
                list.splice(data.index, 1);
            });
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
        },
        components: {
            Title: require('./Title'),
            Body: require('./Body'),
            Image: require('./Image'),
            Video: require('./Video'),
            Audio: require('./Audio')
        },
        addTitle: function () {
            var me = this;
            var list = me.get('options.list');
            list.push({
                type: 'title',
                options: {
                    text: ''
                }
            });
            me.set({
                list: list,
                checkedIndex: 1
            })
            .then(function () {
                me.scrollToBottom();
            });
        },
        addBody: function () {
            var me = this;
            var list = me.get('options.list');
            list.push({
                type: 'body',
                options: {
                    text: '',
                    color: require('./Body').COLOR_BLACK,
                    isBold: false,
                    isBig: false,
                    isCenter: false,
                    isEditing: false
                }
            });
            me.set({
                list: list,
                checkedIndex: 2
            })
            .then(function () {
                me.scrollToBottom();
            });
        },
        addImage: function () {
            var me = this;
            var list = me.get('options.list');
            list.push({
                type: 'image',
                options: {
                    url: '',
                    width: '',
                    height: '',
                    size: '',
                    watermark: 'photo',
                    storage_id: ''
                }
            });
            me.set({
                list: list,
                checkedIndex: 3
            })
            .then(function () {
                me.scrollToBottom();
            });
        },
        addVideo: function () {
            var me = this;
            var list = me.get('options.list');
            list.push({
                type: 'video',
                options: {
                    video_id: '',
                    cover: ''
                }
            });
            me.set({
                list: list,
                checkedIndex: 4
            })
            .then(function () {
                me.scrollToBottom();
            });
        },
        addAudio: function () {
            var me = this;
            var list = me.get('options.list');
            list.push({
                type: 'audio',
                options: {
                    storage_id: '',
                    url: '',
                    playing: ''
                }
            });
            me.set({
                list: list,
                checkedIndex: 5
            })
            .then(function () {
                me.scrollToBottom();
            });
        },
        scrollToBottom: function () {
            this.listElement.prop(
                'scrollTop',
                this.listElement.prop('scrollHeight')
            );
        }
    });

});