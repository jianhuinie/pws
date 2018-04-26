/**
 * @file 课程封面
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict'

    var Draggable = require('custom/helper/Draggable');

    var rectUtil = require('cc/util/rect');
    var getPosition = require('cc/function/position');
    var waitPromises = require('cc/function/waitPromises');
    var createClassCropDialog = require('userCenter/teacherCenter/videoCourseEdit/component/VideoCropDialog');
    var PhotoGallery = require('../common/PhotoGallery');
    var ractiveDialog = require('userCenter/common/function/ractiveDialog');

    return Ractive.extend({
        template: require('html!./OfflineCoverEdit.html'),
        data: function () {
            return {
                style: require('text!./OfflineCoverEdit.styl'),
                showButton: true,
                options: {
                    list: []
                }
            };
        },
        onrender: function () {

            var me = this;
            if (me.get('options.list').length >= 12) {
                me.set('showButton', false)
            }
            var container = $(me.getElement());

            var mainSelector = '.cover-handler';

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
                rectList = rectUtil.makeRectList(elementList);
            };

            refreshList();

            me.draggable = new Draggable({
                mainElement: container,
                mainSelector: mainSelector,
                excludeSelector: ['.draggable-icon'],
                draggingClass: 'dragging',
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
                    if (!isAnimating) {
                        draggingElement = data.mainElement;
                        draggingElement.addClass(activeClass);
                        draggingElement
                        .width(
                            draggingElement.width()
                        );

                        var itemElement = draggingElement.closest('.cover-item');
                        itemElement
                        .addClass(activeParentClass)
                        .height(
                            itemElement.height()
                        );

                        refreshList();
                    }
                },
                ondrop: function (e, data) {
                    if (!isAnimating) {
                        draggingElement = data.mainElement;
                        draggingElement.removeClass(activeClass);
                        draggingElement
                        .width(
                            draggingElement.width()
                        );

                        var itemElement = draggingElement.closest('.cover-item');
                        itemElement
                        .removeClass(activeParentClass)
                        .height('');
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
                onafterdrag: function (e, data) {
                    if (afterIndex == null) {
                        afterIndex = beforeIndex;
                    }

                    var staticStyle = {
                        position: '',
                        left: '',
                        top: ''
                    };

                    var duration = 300;
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
        uploadCover: function () {
            var me = this;
            alert({
                title: '温馨提示',
                content: '请选择上传方式',
                buttons: [
                    {
                        text: '图片库',
                        type: 'primary',
                        action: function () {
                            // TODO 发送请求 请求图片库的图片
                            this.hide();
                            var dialog = ractiveDialog(
                                PhotoGallery,
                                {
                                    title: '图片库',
                                    skinClass: 'photo-gallery'
                                },
                                {
                                    save: function (data) {
                                        var urlList = me.get('options.list');
                                        var length = urlList.length;
                                        if (!urlList) {
                                            urlList = [];
                                        }

                                        $.each(
                                            data,
                                            function (index, value) {
                                                urlList.push({
                                                    url: value.url,
                                                    id: value.id
                                                })
                                            }
                                        );

                                        var idArr = [];
                                        var hasReapt = false;

                                        $.each(
                                            urlList,
                                            function (index, value) {
                                                if (idArr.indexOf(value.id) != -1) {
                                                    hasReapt = true;
                                                }
                                                else {
                                                    idArr.push(value.id);
                                                }
                                            }
                                        );

                                        var newLength = urlList.length;

                                        if (!hasReapt) {
                                            if (urlList.length <= 12) {
                                                me.set({
                                                    'options.list': urlList,
                                                });
                                                dialog.hide();
                                            }
                                            else {
                                                urlList.splice(length, newLength - length);
                                                hasReapt = false;
                                                idArr = [];
                                                alert({
                                                    title: '温馨提示',
                                                    content: '最多上传12张哦'
                                                });
                                            }
                                            if (urlList.length == 12) {
                                                me.set({
                                                    showButton: false
                                                });
                                            }
                                        }
                                        else {
                                            urlList.splice(length, newLength - length);
                                            hasReapt = false;
                                            idArr = [];
                                            alert({
                                                title: '温馨提示',
                                                content: '您有图片上传重复了,请重新上传吧'
                                            });
                                        }
                                    },
                                    close: function () {
                                        dialog.hide();
                                    }
                                }
                            )
                        }
                    },
                    {
                        text: '本地上传',
                        type: 'info',
                        action: function () {
                            this.hide();
                            var dialog = createClassCropDialog({
                                onUploadComplete: function (response) {
                                    if (!response.code) {
                                        var urlList = me.get('options.list');
                                        var length = urlList.length;
                                        if (!urlList) {
                                            urlList = [];
                                        }
                                        if (urlList.length <= 11) {
                                            urlList.push({
                                                url: response.data.url,
                                                id: response.data.id
                                            });
                                            dialog.hide();
                                        }
                                        if (urlList.length == 12) {
                                            me.set({
                                                'showButton': false
                                            });
                                        }
                                    }
                                }
                            });
                            dialog.show();
                        }
                    }
                ]
            })
        },
        deleteItem: function (index) {
            var me = this;
            var urlList = me.get('options.list');
            if (urlList.length <= 1) {
                alert({
                    title: '温馨提示',
                    content: '至少有一张图片作为封面'
                });
                return;
            }
            urlList.splice(index, 1);
            if (urlList.length < 12) {
                me.set({
                    'showButton': true,
                    'options.list': urlList
                });
            }
        },
        getData: function () {
            var me = this;
            var data = { };
            data.covers = [];
            data.cover_storage_ids = [];
            $.each (
                me.get('options.list'),
                function (index, item) {
                    data.covers.push({
                        storage_id: item.id,
                        url: item.url
                    });
                    data.cover_storage_ids.push(item.id);
                }
            );
            return data;
        }
    })

})