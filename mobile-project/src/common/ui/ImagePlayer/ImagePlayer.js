/**
 * Created by xuzheng on 16/1/19.
 */
define(function (require) {
    'use strict';

    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');
    var PageMask = require('common/ui/PageMask/PageMask');
    var lazyLoadImage = require('common/lazyLoadImage');

    var util_base = require('util/base');
    var util_math = require('util/math');
    var $ = require('zepto');

    var IScroll = require('iscroll');
    var deviceRetio;

    function ImagePlayer(arrImages, options, titleArray) {
        var ratio = $('#viewport').attr('ratio');
        deviceRetio = 1;
        if (ratio < 1) {
            deviceRetio = window.devicePixelRatio;
        }
        //deviceRetio = (options && options.needScale) ? options.needScale : window.devicePixelRatio;
        options = options || {};
        titleArray = titleArray || [];
        this._container = $('<div data-scroll-wrap="1"></div>').css({
            'position': 'fixed',
            'top': 0,
            'left': 0,
            'z-index': 9999,
            'width': '100%',
            'height': '100%',
            'overflow': 'hidden'
        });

        this._playerWrap = $('<div></div>').css({
            'position': 'relative',
            'z-index': 0,
            'width': '100%',
            'height': '100%',
            'overflow': 'hidden'
        }).appendTo(this._container);


        this._mask = new PageMask({
            backgroundColor: 'rgba(0,0,0,0.9)',
            enableAnimate: true
        });
        this._mask.bindTo('display', this);

        var countsWrap = $('<div></div>').css({
            'position': 'absolute',
            'bottom': 10 * deviceRetio + 'px',
            'left': 10 * deviceRetio + 'px',
            'right': 0,
            'text-align': 'left',
            'z-index': 1
        }).appendTo(this._container);

        var counts = $('<span></span>').css({
            'border-radius': 9 * deviceRetio + 'px',
            'line-height': 18 * deviceRetio + 'px',
            'padding': '0 ' + 6 * deviceRetio + 'px',
            'font-size': 11 * deviceRetio + 'px',
            'display': 'inline-block',
            //'background-color': 'rgba(102,102,102,.6)',
            'color': '#f1f1f1'
        }).appendTo(countsWrap);


        var n = arrImages.length;
        observer.addListener(this, 'index_changed', function () {
            var index = this.get('index');
            var title = '';
            if (titleArray[index]) {
                title = titleArray[index];
            }
            counts.text((index + 1) + ' / ' + n + '   ' + title);
        });

        this._arrImages = arrImages || [];

        this._items = null;
        this._scroll = null;

        var self = this;
        $(this._container).tap(function () {
            self.hide();
        });

        if (!util_base.isNumber(options.index)) {
            options.index = 0;
        }

        options.index = util_math.clamp(options.index, 0, 1000);

        this.setValues(options);
    }

    util_base.inherits(ImagePlayer, MVCObject);

    var p = ImagePlayer.prototype;

    p.show = function () {
        this.set('display', true);
    };

    p.hide = function () {
        this.set('display', false);
    };

    p.destroy = function () {
        if (this.get('display')) {
            this.set('display', false);
        }
        var self = this;
        setTimeout(function () {
            if (self._items) {
                for (var i = 0; i < self._items.length; i++) {
                    self._items[i].destroy();
                }
                self._items.length = 0;
            }
            if (self._mask) {
                self._mask.destroy();
                self._mask.unbindAll();
                self._mask = null;
            }
            if (self._scroll) {
                self._scroll.destroy();
                self._scroll = null;
            }
            self._container.off('tap').remove();
            self._container = null;
            self.unbindAll();
            observer.clearInstanceListeners(self);
        }, 500);
    };

    p.display_changed = function () {
        var display = this.get('display');
        if (display) {
            if (!this._items) {
                construct(this);
                initEvents(this);
                this._noAnim = true;
                this.notify('index');
                this._noAnim = false;
            }
            this._container.show();
            lazyLoadImage.refresh();
        } else {
            this._container.hide();
        }
    };

    p.index_changed = function () {
        if (!this._lock) {
            var index = this.get('index') || 0;
            if (this._scroll) {
                var duration = this._noAnim ? 0 : 300;
                this._scroll.goToPage(index, 0, duration);
            }
        }
    };

    function construct(instance) {
        var $container = instance._container;
        var images = instance._arrImages;
        var n = images.length;

        var $scroller = $('<div></div>').css({
            'position': 'absolute',
            'left': 0,
            'top': 0,
            'width': (n * 100) + '%',
            'height': '100%'
        }).appendTo(instance._playerWrap);

        var $ul = $('<ul></ul>').appendTo($scroller);

        $ul.css({
            'position': 'relative',
            'height': '100%',
            'margin': 0,
            'padding': 0,
            'list-style': 'none'
        });

        var items = [];
        var $li;
        var itemInstance;

        for (var i = 0; i < n; i++) {
            $li = $('<li></li>').css({
                float: 'left',
                position: 'relative',
                width: 100 / n + '%',
                height: '100%'
            }).appendTo($ul);
            itemInstance = new Item($li[0], images[i]);
            items.push(itemInstance);
        }

        $container.appendTo(document.body);

        instance._scroll = new IScroll(instance._playerWrap[0], {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapSpeed: 400,
            keyBindings: true
        });

        instance._items = items;
    }

    function initEvents(instance) {
        instance._scroll.on('scrollEnd', function () {
            var modelIndex = instance.get('index');
            var currentIndex = this.currentPage.pageX;
            if (modelIndex != currentIndex) {
                instance._lock = true;
                instance.set('index', currentIndex);
                instance._lock = false;
            }
            setTimeout(function () {
                lazyLoadImage.refresh(true);
            });
        });

        observer.addListener(instance, 'index_changed', function () {
            var index = this.get('index');
            var items = instance._items;
            var i = 0;
            var n = items.length;
            for (; i < n; i++) {
                if (Math.abs(index - i) < 2) {
                    items[i].preLoad();
                }
                if (index == i) {
                    items[i].set('active', true);
                } else if (items[i].get('active')) {
                    items[i].set('active', false);
                }
            }
        });
    }

    function Item(container, imageUrl) {
        this._container = container;
        this._wrap = $('<div data-image-wrap="center"></div>').css({
            'position': 'relative',
            'width': '100%',
            'height': '100%',
            'overflow': 'hidden'
        }).appendTo(container);

        this._loading = $('<span class="ui-loading white">' +
            '<i class="t1"></i>' +
            '<i class="t2"></i>' +
            '<i class="t3"></i>' +
            '</span>')
            .css({
                'position': 'absolute',
                'margin': -10 * deviceRetio + 'px 0 0 ' + -10 * deviceRetio + 'px',
                'left': '50%',
                'top': '50%',
            })
            .appendTo(this._wrap);

        var self = this;
        $('<img width="100%" data-src="' + imageUrl + '"/>')
            .appendTo(this._wrap)
            .on('load', function () {
                var thatImg = $(self._container).find('img')[0];
                if (thatImg.style.position !== 'absolute') {
                    $(thatImg).css({
                        position: 'absolute',
                        visibility: 'visible',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    });
                }
                self._loading.hide();
            });

        this._imageUrl = imageUrl;
    }

    util_base.inherits(Item, MVCObject);

    Item.prototype.active_changed = function () {
        //this._wrap.append('<div>active_changed:' + this.get('active') + '</div>');
        //lazyLoadImage.init(this._wrap, true);
    };

    Item.prototype.preLoad = function () {
        lazyLoadImage.init(this._wrap);
    };
    Item.prototype.destroy = function () {
        this._wrap.remove();
        this._wrap = null;
    };


    return ImagePlayer;
});