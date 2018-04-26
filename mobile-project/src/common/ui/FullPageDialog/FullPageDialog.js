/**
 * Created by xuzheng on 16/2/18.
 */
define(function (require, exports) {

    'use strict';

    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');
    var BasePopupDiv = require('../BasePopupDiv');
    var DomSize = require('common/mvc-tools/DomSize');

    var util_base = require('util/base');
    var util_dom = require('util/dom');

    var defaultOptions = {
        'backgroundColor': '#ffffff',
        'zIndex': 300
    };

    /**
     *
     * @extends {MVCObject}
     *
     * attributes:
     *      content {string|HTMLElement} 内容
     *      title {string|HTMLElement} 标题
     *      position {string} 参考BasePopupDiv
     *      animateType {number} 滑入方向 0没有动画，1右滑入，2下滑入, 默认0
     *      closeButton {boolean} 是否使用关闭按钮, 默认true
     *      backButton {boolean} 后退按钮，默认false (依赖font-icon)
     *      backgroundColor {string} 默认#ffffff
     *      zIndex {number}
     * */
    function FullPageDialog(options) {

        var self = this;
        self._container = $('<div></div>');
        self._titleDiv = $('<div></div>').appendTo(self._container);
        self._contentDiv = $('<div></div>').appendTo(self._container);
        self._closeButton = $('<div>×</div>').appendTo(self._container);
        self._backButton = $('<div class="icon icon-angle-left"></div>').appendTo(self._container);
        util_dom.enableGPU(self._container.get(0));

        var closeButtonElement = self._closeButton.get(0);
        self._closeBtnEvt = observer.addDomListener(closeButtonElement, 'click', function () {
            observer.trigger(self, 'closeButtonClick');
            self.hide();
        });
        var backButtonElement = self._backButton.get(0);
        self._backBtnEvt = observer.addDomListener(backButtonElement, 'click', function () {
            observer.trigger(self, 'backButtonClick');
            self.hide();
        });

        setDialogStyle(this._container, this._titleDiv, this._contentDiv, this._closeButton, this._backButton);

        var fullSize = this._fullSize = new DomSize(window, {
            'autoResize': true,
            'duration': 100,
            'attrName': 'inner'
        });

        var popupDiv = this._popup = new BasePopupDiv({
            'content': this._container.get(0),
            'align': '2'
        });
        this.bindTo('position', popupDiv);
        this.bindTo('zIndex', popupDiv);

        function updateSize() {
            var size = fullSize.get('size');
            if (size) {
                popupDiv.set('width', size.width);
                popupDiv.set('height', size.height);
                self._contentDiv.css('height', size.height - self._titleDiv.get(0).offsetHeight);
            }
        }

        observer.addListener(fullSize, 'size_changed', updateSize);
        observer.addListener(this, 'resize', updateSize);
        updateSize();

        this.setValues($.extend({}, defaultOptions, options));

        this.bindTo('display', popupDiv);
    }

    util_base.inherits(FullPageDialog, MVCObject);

    var p = FullPageDialog.prototype;

    p.getElement = function () {
        return this._container.get(0);
    };

    p.show = function () {
        var animateType = this.get('animateType');
        if (!animateType) {
            this._popup.set('display', true);
        } else {
            var $container = $(this._container);
            var self = this;
            if (animateType == 1) { //右滑入
                $container.css({
                    'margin-left': self._fullSize.get('size').width
                });
            } else if (animateType == 2) { //下滑入
                $container.css({
                    'margin-top': self._fullSize.get('size').height
                });
            }

            self._popup.set('display', true);
            observer.trigger(this, 'resize');

            if (animateType == 1) { //右滑入
                $container.animate({
                    'margin-left': 0
                }, 300, 'easeOutQuart');
            } else { //下滑入
                $container.animate({
                    'margin-top': 0
                }, 300, 'easeOutQuart');
            }
        }
    };

    p.hide = function () {
        var animateType = this.get('animateType');
        if (!animateType) {
            this._popup.set('display', false);
        } else {
            var self = this;
            var $container = $(this._container);
            if (animateType == 1) { //右滑入
                $container.animate({
                    'margin-left': self._fullSize.get('size').width
                }, 300, 'easeOutQuart', function () {
                    self._popup.set('display', false);
                });
            } else { //下滑入
                $container.animate({
                    'margin-top': self._fullSize.get('size').height
                }, 300, 'easeOutQuart', function () {
                    self._popup.set('display', false);
                });
            }


        }
    };
    p.closeButton_changed = function () {
        this._closeButton[this.get('closeButton') ? 'show' : 'hide']();
    };

    p.backButton_changed = function () {
        this._backButton[this.get('backButton') ? 'show' : 'hide']();
    };

    p.destroy = function () {
        this._fullSize.destroy();
        this._fullSize = null;
        this._popup.destroy();
        this._popup = null;
        this.set('content', null);
        this.set('title', null);
        if (this._container.parentNode) {
            this._container.parentNode.removeChild(this._container);
            this._container = null;
        }
        this._titleDiv = null;
        this._contentDiv = null;
        this.unbindAll();
        if (this._closeBtnEvt) {
            observer.removeListener(this._closeBtnEvt);
            this._closeBtnEvt = null;
        }
        if (this._backBtnEvt) {
            observer.removeListener(this._backBtnEvt);
            this._backBtnEvt = null;
        }
        observer.clearInstanceListeners(this);
    };

    p.title_changed = function () {
        var title = this.get('title');
        if (title) {
            $(this._titleDiv).html(title).show();
        } else {
            $(this._titleDiv).html('').hide();
        }
        observer.trigger(this, 'resize');
    };
    p.content_changed = function () {
        var content = this.get('content');
        $(this._contentDiv).html(content);
    };
    p.backgroundColor_changed = function () {
        var color = this.get('backgroundColor') || '#ffffff';
        this._contentDiv.css('background-color', color);
    };

    function setDialogStyle($container, $title, $content, $closeButton, $backButton) {
        $container.css({
            'position': 'relative',
            'width': '100%',
            'height': '100%',
            'overflow': 'auto'
            //'background-color': '#ffffff'
        });
        $title.css({
            'position': 'relative',
            'display': 'none',
            'height': '2.5rem',
            'background-color':'#fff',
            'font-weight': 'bold',
            'line-height': '2.5rem',
            'font-size': '1rem',
            'text-align': 'center',
            'color': '#555555',
            'border-bottom': '1px solid #ccc',
            'border-top': '1px solid #ccc'
        });
        $content.css({
            'position': 'relative',
            'width': '100%'
        });
        $closeButton.css({
            'position': 'absolute',
            'top': '0.3125rem',
            'right': '0.625rem',
            'font-size': '1.875rem',
            'line-height': '1.875rem',
            'width': '1.875rem',
            'height': '1.875rem',
            'z-index': 100
        });
        $backButton.css({
            'display': 'none',
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '2.5rem',
            'height': '2.5rem',
            'line-height': '2.5rem',
            'font-size': '1.2rem',
            'text-align': 'center'
        });
    }

    return FullPageDialog;
});