define(function (require, exports) {

    'use strict';

    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');
    var util = require('util/base');
    var env = require('util/env');
    var UTIL = require('common/util');

    var browser = {
        addEventListener: !!window.addEventListener,
        touch: ('ontouchstart' in window),
        transitions: (function (temp) {
            var props = ['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
            for (var i in props)
                if (temp.style[props[i]] !== undefined)
                    return true;
            return false;
        })(document.createElement('swipe'))
    };

    /**
     * Slider切换控件 之 可跟随指尖滑动版本
     *
     * container {DIVElement} 容器
     * options {Object} 参数
     *      auto {Number} 自动轮播的间隔时间单位毫秒，<=0不自动轮播, 建议大于100或等于0；
     *      speed {Number} 滚动速度，单位毫秒，表示
     *      index {Number} 当前index值，可作为初始值
     *
     * 提供的接口：
     *      next() 向后滑动一栏
     *      prev() 向前滑动一栏
     *      begin() 开始自动轮播（适用于auto>0 的情况）
     *      stop() 停止自动轮播
     *
     * */
    function Slider(container, options) {
        var me = this;
        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                me[i] = options[i]
            }
        }
        var slidesCom = {
            tokens: [],
            isScrolling: {},
            delta: {},
            start: {},
            offloadFn: function (fn) {
                setTimeout(fn || function () {
                    }, 0);
            }
        };

        if (this.auto < 0) {
            this.auto = 0;
        }

        // 记录公共参数
        me._slidesCom = slidesCom;

        if (!container) {
            return;
        }
        this.main = container;


        this.interval = null;
        var element = this.main;
        this.index = parseInt(this.index, 10) || 0;
        var _this = this;
        this.events = {
            handleEvent: function (event) {
                switch (event.type) {
                    case 'touchstart':
                        _this._start(event);
                        break;
                    case 'touchmove':
                        _this._move(event);
                        break;
                    case 'touchend':
                        me._slidesCom.offloadFn(_this._end(event));
                        break;
                    case 'webkitTransitionEnd':
                    case 'msTransitionEnd':
                    case 'oTransitionEnd':
                    case 'otransitionend':
                    case 'transitionend':
                        me._slidesCom.offloadFn(this.transitionEnd(event));
                        break;
                    case 'resize':
                        me._slidesCom.offloadFn(_this._setup());
                        break;
                }
                if (options.stopPropagation) {
                    event.stopPropagation();
                }
            },
            transitionEnd: function (event) {
                if (parseInt(event.target.getAttribute('data-index'), 10) == _this.index) {
                    if (_this.auto) {
                        _this.begin();
                    }
                    if (typeof options.transitionEnd === 'function') {
                        options.transitionEnd.call(event, _this.index, _this.slides[_this.index]);
                    }
                }
            }
        };
        this._setup();

        if (this.auto) {
            this.begin();
        }


        // add event listeners
        if (browser.addEventListener) {

            // set touchstart event on element
            if (browser.touch) {
                element.addEventListener('touchstart', this.events, false);
            }

            if (browser.transitions) {
                element.addEventListener('webkitTransitionEnd', this.events, false);
                element.addEventListener('msTransitionEnd', this.events, false);
                element.addEventListener('oTransitionEnd', this.events, false);
                element.addEventListener('otransitionend', this.events, false);
                element.addEventListener('transitionend', this.events, false);
            }
            // set resize event on window
            window.addEventListener('resize', this.events, false);
        }
        return this;
    }

    util.inherits(Slider, MVCObject);


    Slider.prototype.auto = 0;
    Slider.prototype.speed = 300;
    Slider.prototype.continuous = true;
    Slider.prototype.slides = null;
    Slider.prototype.width = 0;

    Slider.prototype.index_changed = function () {
        var me = this;
        if (me._cur_index === me.get('index')) {
            me._slidesCom.offloadFn(me.callback && me.callback(me.index, me.slides[me.index]));
        } else {
            var to = me.get('index');
            me.index = me._cur_index || 0;
            me._slide(to);
        }
    };

    Slider.prototype.auto_changed = function () {
        if (this.get('auto') > 0) {
            this.begin();
        }
    };

    //1. private common function
    Slider.prototype._translate = function (index, dist, speed) {
        var ei = this.slides.length - 1;
        index = index > ei ? 0 : index;
        index = index < 0 ? ei : index;
        var slide = this.slides[index];
        var style = slide && slide.style;

        if (!style) {
            return;
        }

        style.webkitTransitionDuration =
            style.MozTransitionDuration =
                style.msTransitionDuration =
                    style.OTransitionDuration =
                        style.transitionDuration = speed + 'ms';

        style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
        style.msTransform =
            style.MozTransform =
                style.OTransform = 'translateX(' + dist + 'px)';
    };


    Slider.prototype._setup = function () {
        // cache this.slides
        var container = this.main.children[0];
        this.slides = this.main.children[0].children; //this.main.children;

        // container's is num* times bigger than this.main width

        this.width = this.main.getBoundingClientRect().width || this.main.offsetWidth;
        //页面嵌在iframe特殊处理
        var screenWidth = window.screen.availWidth;
        var devicePixelRatio = window.devicePixelRatio;
        if (UTIL.isScale() && window.devicePixelRatio >= 2) {
            screenWidth *=devicePixelRatio;
        }
        this.width = this.width > screenWidth ? screenWidth : this.width;
        if (window.parent && env.os.isIPhone) {
            this.main.style.width = this.width + 'px';
        }

        container.style.width = (this.slides.length * this.width) + 'px';

        // stack elements
        var pos = this.slides.length;
        while (pos--) {

            var slide = this.slides[pos];

            slide.style.width = this.width + 'px';
            slide.setAttribute('data-index', pos);

            if (browser.transitions) {
                slide.style.left = (pos * -this.width) + 'px';
                this.__move(pos, this.index > pos ? -this.width : (this.index < pos ? this.width : 0), 0);
            }

        }

        if (!browser.transitions) {
            element.style.left = (this.index * -this.width) + 'px';
        }

        container.style.visibility = 'visible';

    };

    function getNextIndex(curIndex, dir, ei) {
        if (dir < 0 && curIndex > ei) {
            return 0;
        } else if (dir > 0 && curIndex < 0) {
            return ei;
        }
        return curIndex;
    }

    Slider.prototype._slide = function (targetIndex, slideSpeed, direction) {
        var me = this;
        var maxIndex = me.slides.length - 1;
        targetIndex = targetIndex > maxIndex ? maxIndex : targetIndex;
        targetIndex = targetIndex < 0 ? 0 : targetIndex;
        if (me.index == targetIndex || maxIndex == 0) {
            return;
        }
        if (browser.transitions) {
            var diff = Math.abs(me.index - targetIndex) - 1;
            if (!direction) {
                // 1:right -1:left
                if (me.index == maxIndex && targetIndex == 0) {
                    direction = -1;
                } else if (me.index == 0 && targetIndex == maxIndex) {
                    direction = 1;
                } else {
                    direction = Math.abs(me.index - targetIndex) / (me.index - targetIndex);
                }
            }

            var  transNext =  function(curIndex, oldIndex) {
                me._translate(oldIndex, me.width * direction, slideSpeed || me.speed);
                me._translate(curIndex, 0, slideSpeed || me.speed);
                if (maxIndex > 1) {
                    me.__move(getNextIndex(curIndex - direction, direction, maxIndex), (0 - me.width * direction), 0);
                }
            }

            var curIndex = targetIndex;
            var oldIndex = me.index;

            if (diff > 1 || maxIndex == 1) {

                me._translate(targetIndex, (0 - me.width * direction), 0);
                setTimeout(function () {
                    transNext(curIndex, oldIndex);
                }, 15);
            } else {
                transNext(curIndex, oldIndex);
            }
            me.index = targetIndex;
            // 记录当前index变化
            me._cur_index = targetIndex;
            me.set('index', targetIndex);
        } else {
            me.index = targetIndex;
            // 记录当前index变化
            me._cur_index = targetIndex;
            me.set('index', targetIndex);
        }
        return me;

    };

    Slider.prototype.__move = function (index, dist, speed) {
        this._translate(index, dist, speed);
    };


    //2. private event function
    //touch: _start _move _end

    Slider.prototype._start = function (event) {
        var touches = event.touches[0];
        // measure start values
        this._slidesCom.start = {
            // get initial touch coords
            x: touches.pageX,
            y: touches.pageY,
            // store time to determine touch duration
            time: +(new Date())
        };
        // used for testing first move event
        this._slidesCom.isScrolling = undefined;
        // reset delta and end measurements
        this._slidesCom.delta = {};
        // attach touchmove and touchend listeners
        this.main.addEventListener('touchmove', this.events, false);
        this.main.addEventListener('touchend', this.events, false);
    };

    Slider.prototype._move = function (event) {
        // ensure swiping with one touch and not pinching
        if (event.touches.length > 1 || event.scale && event.scale !== 1) {
            return;
        }
        var touches = event.touches[0];

        // measure change in x and y
        this._slidesCom.delta = {
            x: touches.pageX - this._slidesCom.start.x,
            y: touches.pageY - this._slidesCom.start.y
        };

        // determine if scrolling test has run - one time test
        if (typeof this._slidesCom.isScrolling == 'undefined') {
            this._slidesCom.isScrolling = !!(this._slidesCom.isScrolling || Math.abs(this._slidesCom.delta.x) < Math.abs(this._slidesCom.delta.y));
        }

        // if user is not trying to scroll vertically
        if (!this._slidesCom.isScrolling) {
            var ei = this.slides.length - 1;
            var pi = this.index - 1;
            var ci = this.index;
            var ni = this.index + 1;
            pi < 0 && (pi = ei);
            ni > ei && (ni = 0);

            // prevent native scrolling
            event.preventDefault();

            // stop slideshow
            this.stop();

            this._translate(ci, this._slidesCom.delta.x, 0);

            if (ei > 0) {
                if (ei > 1) {
                    this._translate(pi, this._slidesCom.delta.x - this.width, 0);
                    this._translate(ni, this._slidesCom.delta.x + this.width, 0);
                } else if (this._slidesCom.delta.x > 0) {
                    this._translate(pi, this._slidesCom.delta.x - this.width, 0);
                } else {
                    this._translate(pi, this._slidesCom.delta.x + this.width, 0);
                }

            }
        }
    };

    Slider.prototype._end = function (event) {

        if (!this._slidesCom.delta.x) {
            /* 如果没有参与touchmove，说明为点击事件而不是滑动事件，return掉； */
            return;
        }

        // measure duration
        var duration = +(new Date()) - this._slidesCom.start.time;

        // determine if slide attempt triggers next/prev slide
        var isValidSlide =
            Number(duration) < 250 && // if slide duration is less than 250ms
            Math.abs(this._slidesCom.delta.x) > 20 || // and if slide amt is greater than 20px
            Math.abs(this._slidesCom.delta.x) > this.width / 2; // or if slide amt is greater than half the width

        // determine direction of swipe (true:right, false:left)
        var direction = this._slidesCom.delta.x < 0;

        var ei = this.slides.length - 1;

        // if not scrolling vertically
        if (!this._slidesCom.isScrolling) {
            var ci = this.index;
            var pi = ci - 1;
            var ni = ci + 1;
            if (isValidSlide) {
                // 拖动距离足够翻页，则翻页
                if (direction) {
                    ni = getNextIndex(ci + 1, -1, ei);
                    pi = getNextIndex(ni + 1, -1, ei);
                    (ei > 1) && (this.__move(pi, this.width, 0));
                    (ei > 0) && (this.__move(ci, -this.width, this.speed));
                    this.__move(ni, 0, this.speed);
                    this.index = ni;
                } else {
                    ni = getNextIndex(ci - 1, 1, ei);
                    (ei > 0) && (this.__move(ci, this.width, this.speed));
                    this.__move(ni, 0, this.speed);
                    this.index = ni;
                }


            } else {
                if (ei > 0) {
                    // 否则留在当前页
                    this.__move(pi, -this.width, this.speed);
                    this.__move(ni, this.width, this.speed);
                }
                this.__move(ci, 0, this.speed);
                this.index = ci;
            }
            // 记录当前index变化
            this._cur_index = this.index;
            this.set('index', this.index);
        }
        // kill touchmove and touchend event listeners until touchstart called again
        this.main.removeEventListener('touchmove', this.events, false);
        this.main.removeEventListener('touchend', this.events, false);
    };

    //3. public  apis
    Slider.prototype.dispose = function () {
        var element = this.main;
        // cancel slideshow
        this.stop();

        // reset element
        element.style.width = 'auto';
        element.style.left = 0;

        // reset slides
        var pos = this.slides.length;
        while (pos--) {

            var slide = this.slides[pos];
            slide.style.width = '100%';
            slide.style.left = 0;

            if (browser.transitions)
                this._translate(pos, 0, 0);

        }
        if (browser.addEventListener) {
            element.removeEventListener('touchstart', this.events, false);
            element.removeEventListener('webkitTransitionEnd', this.events, false);
            element.removeEventListener('msTransitionEnd', this.events, false);
            element.removeEventListener('oTransitionEnd', this.events, false);
            element.removeEventListener('otransitionend', this.events, false);
            element.removeEventListener('transitionend', this.events, false);
            window.removeEventListener('resize', this.events, false);
        }
    };


    Slider.prototype.prev = function () {
        if (this.index) {
            this._slide(this.index - 1);
        } else if (this.continuous) {
            this._slide(this.slides.length - 1);
        }
        return this;
    };

    Slider.prototype.next = function () {
        if (this.index < this.slides.length - 1) {
            this._slide(this.index + 1, this.speed, -1);
        } else if (this.continuous) {
            this._slide(0, this.speed, -1);
        }
        return this;
    };

    Slider.prototype.begin = function () {
        var _this = this;
        if (_this.interval) {
            clearTimeout(_this.interval);
        }
        _this.interval = setTimeout(function () {
            _this.next();
        }, this.auto);
    };

    Slider.prototype.stop = function () {
        // this.auto = 0;
        var _this = this;
        clearTimeout(_this.interval);
    };
    return Slider;
});