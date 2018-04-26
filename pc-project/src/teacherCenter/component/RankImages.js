/**
 * 拽托排序图片
 * @author zengcheng
 */

define(function () {

    /**
     * @param {Obejct} options
     * @property {string} options.elementSelector 可拽托元素的选择器
     * @property {string} options.container
     */
    function RankImages(options) {
        $.extend(this, {enable: false}, options)
        this.init();
    }

    /**
     * 获取元素的相关信息
     * @param  {jQuery} container 待获取信息的元素
     * @param  {Object} fixedOffset 偏移量
     * @return {Object} 元素的相关信息
     */
    function getEleInfo(container, fixedOffset) {

        var containerOffset = container.offset();
        var containerSize = {
            width: container.width(),
            height: container.height(),
            offsetTop: containerOffset.top,
            offsetLeft: containerOffset.left
        };
        if (fixedOffset) {
            containerSize.offsetTop =  containerOffset.top + fixedOffset.offsetTop;
            containerSize.offsetLeft = containerOffset.left + fixedOffset.offsetLeft;
        }
        return containerSize;
    }

    /**
     * 获取当前鼠标所在的元素
     * @param  {Object} currentOffset  当前的坐标
     * @param  {Array.{Object}} elementsOffset 所有元素的偏移信息
     * @return {Object} 存在的条件下 返回当前元素
     */
    function getMouseOn(currentOffset, elementsOffset) {

        var offsetItem,
            offsetItemInfo,
            eleFirstOffset = elementsOffset[0].offset;
        var width = eleFirstOffset.width;
        var height = eleFirstOffset.height;
        for (var i = elementsOffset.length - 1; i >= 0; i--) {
            offsetItem = elementsOffset[i];
            offsetItemInfo = offsetItem.offset;
            if (currentOffset.left + width/2 >= offsetItemInfo.offsetLeft && currentOffset.top + height/2 >=  offsetItemInfo.offsetTop) {

                if (currentOffset.left + width/2 <=  (offsetItemInfo.offsetLeft + width) && currentOffset.top + height/2 <=  (offsetItemInfo.offsetTop + height)) {

                    return offsetItem;
                }
            }
        }
    }


    /**
     * 普通布局转为绝对布局
     */
    function initStyle() {
        var me = this;
        var container = me.container;
        var fixedOffset = {
            offsetTop: 0,
            offsetLeft: 0
        };
        var containerSize = me.containerSize = getEleInfo(container, fixedOffset);
        var eleFixedOffset = {
            offsetTop: 0 - containerSize.offsetTop,
            offsetLeft: 0 - containerSize.offsetLeft
        }
        var elementsOffset = me.elementsOffset = [];

        $.each(container.find(me.elementSelector), function (index, item) {

            var ele = $(item);
            var offset = ele.offset();
            ele.attr('data-index', index);
            elementsOffset.push({ele: ele, offset: getEleInfo(ele, eleFixedOffset)});
        });

        container.css({position: 'relative', height: containerSize.height});
        $.each(elementsOffset, function(index, item) {
            var offset = item.offset;
            item.ele.css({
                position: "absolute",
                top: offset.offsetTop,
                left: offset.offsetLeft,
                zIndex: 2
            })
        });
        me.initElementsOffset = cloneElementsOffset(elementsOffset);
    }


    function freshPosition(elementsOffset) {
        $.each(elementsOffset, function(index, item) {
            var offset = item.offset;
            item.ele.css({
                top: offset.offsetTop,
                left: offset.offsetLeft
            }).data('index', index);
        });
    }

    function cloneElementsOffset(initElementsOffset) {
        var result = [], eleWrapper;
        for (var i = 0, len = initElementsOffset.length; i < len; i++) {
            eleWrapper = initElementsOffset[i];
            result.push({
                ele: eleWrapper.ele,
                offset: $.extend({}, eleWrapper.offset)
            });
        }
        return result;
    }

    /**
     * 交换图片位置
     * @param  {number|string} curIndex 当前的位置
     * @param  {number|string} mouseOnIndex 待替换的位置
     * @param  {Array.{Object}} elementsOffset 存储每个子元素的位置信息
     */
    function swapElement(curIndex, mouseOnIndex, elementsOffset) {
        var cur = elementsOffset[curIndex];
        var mouseOn = elementsOffset[mouseOnIndex];
        var tmpOffset;

        elementsOffset[curIndex] = mouseOn;
        elementsOffset[mouseOnIndex] = cur;

        mouseOn.ele.data('index', curIndex);
        cur.ele.data('index', mouseOnIndex);

        tmpOffset =  mouseOn.offset.offsetLeft;
        mouseOn.offset.offsetLeft = cur.offset.offsetLeft;
        cur.offset.offsetLeft = tmpOffset;

        tmpOffset =  mouseOn.offset.offsetTop;
        mouseOn.offset.offsetTop = cur.offset.offsetTop;
        cur.offset.offsetTop = tmpOffset;

    }

    RankImages.prototype.init = function () {

        var me = this;

        var elementSelector = me.elementSelector;

        var draggingStatus = ['start', 'drag', 'end'];
        var currentStatus;
        var maskEle, curEle, mouseOnElement;
        var timer;
        var startPoint, refPoint;

        if (me.container.length == 0) {return false}

        initStyle.call(me);

        me.container
            .on('mousedown', elementSelector, function (event) {
                var index, offset;
                if (!me.enable) {
                    return ;
                }
                curEle = $(this);
                index = curEle.data('index');
                offset = me.elementsOffset[index].offset;
                maskEle = curEle.clone().html('');
                maskEle.css({
                    border: 'dotted 1px #aaa',
                    width: curEle.width(),
                    height: curEle.height(),
                    zIndex: 1
                });
                curEle.parent().append(maskEle);
                currentStatus = draggingStatus[0];

                mouseOnElement = me.elementsOffset[index];
                startPoint = {
                    x: event.pageX,
                    y: event.pageY
                };
                refPoint = {
                    left: offset.offsetLeft,
                    top: offset.offsetTop
                };

                curEle.css('zIndex', 3);
            })
            .on('drag', function (){
                return false;
            })
            .on('mousemove', function (event) {

                if (!me.enable) {
                    return ;
                }
                if (currentStatus === draggingStatus[0]) {
                    currentStatus = draggingStatus[1];
                }

                if (currentStatus === draggingStatus[1]) {
                    var currentPoint = {
                        x: event.pageX - startPoint.x,
                        y: event.pageY - startPoint.y
                    };
                    var tmpMouseOnElement;
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(function () {
                        var currentInfo = {
                            left: refPoint.left + currentPoint.x,
                            top: refPoint.top + currentPoint.y
                        };
                        curEle.css(currentInfo);
                        if (tmpMouseOnElement = getMouseOn(currentInfo, me.elementsOffset)) {
                            if (tmpMouseOnElement.ele.data('index') != curEle.data('index')) {
                                tmpMouseOnElement.ele.css({
                                    left: refPoint.left,
                                    top: refPoint.top
                                });
                            }
                            if (tmpMouseOnElement !== mouseOnElement && mouseOnElement.ele.data('index') != curEle.data('index')) {
                                mouseOnElement.ele.css({
                                    left: mouseOnElement.offset.offsetLeft,
                                    top: mouseOnElement.offset.offsetTop
                                });
                            }
                            mouseOnElement = tmpMouseOnElement;
                        } else {
                            if (mouseOnElement.ele.data('index') != curEle.data('index')) {
                                mouseOnElement.ele.css({
                                    left: mouseOnElement.offset.offsetLeft,
                                    top: mouseOnElement.offset.offsetTop
                                });
                            }
                        }
                    }, 0);
                }
            })
            .on('selectstart', function () {
                if (currentStatus === draggingStatus[1]) {
                    return false;
                }
            });
            $('body').on('mouseup', function () {

                if (!me.enable) {
                    return ;
                }

                if (currentStatus === draggingStatus[1]) {
                    currentStatus = draggingStatus[2];
                    maskEle.remove();
                    if (mouseOnElement) {
                        mouseOnElement.ele.css({
                            left: refPoint.left,
                            top: refPoint.top
                        });
                        curEle.css({
                            left: mouseOnElement.offset.offsetLeft,
                            top: mouseOnElement.offset.offsetTop,
                            'zIndex': 2
                        });
                        swapElement(curEle.data('index'), mouseOnElement.ele.data('index'), me.elementsOffset);
                        me.onDrop(curEle, mouseOnElement.ele);
                    } else {
                        curEle.css({
                            left: refPoint.left,
                            top: refPoint.top,
                            'zIndex': 2
                        });
                    }
                    clearTimeout(timer);
                }
            });
    };

    RankImages.prototype.enableRank = function () {

        this.enable = true;
    };

    RankImages.prototype.disableRank = function () {

        this.enable = false;
    };

    RankImages.prototype.getItemsInOrder = function () {
        return this.elementsOffset;
    };

    RankImages.prototype.resetOrder = function () {
        this.elementsOffset = cloneElementsOffset(this.initElementsOffset);
        freshPosition(this.initElementsOffset);
        this.onReset();
        return this;
    };

    RankImages.prototype.onReset = function () {
        return this;
    };

    RankImages.prototype.onDrop = function () {
        return this;
    };

    return RankImages;
});