/**
 * Created by xuzheng on 15/7/29.
 */
define(function (require, exports) {

    'use strict';

    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');
    var util = require('common/util');
    var BasePopupDiv = require('common/component/BasePopupDiv');
    var DomSize = require('common/mvc-component/DomSize');
    var MVCArray = require('common/mvc/MVCArray');
    var PageMask = require('../PageMask');
    var publish = require('common/mvc/publish');

    var cssDialog = require('text!./Dialog.styl');
    var htmlDialog = require('text!./Dialog.tpl');

    var arrDialogs = new MVCArray();

    observer.addListener(arrDialogs, 'length_changed', function () {
        var length = this.getLength();
        if (length) {
            arrDialogs.token = util.insertCssText(cssDialog);
        } else if (arrDialogs.token) {
            util.removeCssText(arrDialogs.token);
            arrDialogs.token = null;
        }
    });

    var defaultOptions = {
        //BasePopUpDiv options
        'display': false,
        'position': 'absolute',
        'unit': 'px',
        'width': 'auto',
        'height': 'auto',
        'offsetX': 0,
        'offsetY': 0,
        'align': 5,
        'enableAutoCenter': true,

        //Dialog options
        'buttons': null,
        'enableMask': true
    };


    /**
     * 弹出框
     *
     * attr:
     *      content {HTMLElement|jQuery|string|null} 内容
     *      title {HTMLElement|string} 标题
     *      closeButton {boolean} 是否显示右上角的关闭按钮
     *      position {string} 参考基类BasePopupDiv的position属性
     *      enableAutoCenter {boolean} 参考基类BasePopupDiv
     *      align {number } 参考基类BasePopupDiv
     *      buttons {array|null} 定义底部按钮, 最多可以设置两个按钮
     *          [
     *              {
     *                  type:'ok', // 'cancel'取消按钮，默认动作
     *                  content:''
     *              }
     *          ]
     *
     * inner_attr:
     *      skin {string} content区域的className
     *      enableMask {boolean} 是否开启遮罩层，默认为true
     *
     * events:
     *      button_click(event,objButtonInfo,element) 点击按钮事件
     *          说明： 默认会关闭dialog，如需点击按钮时不关闭，可以使用e.preventDefault();
     *          示例：
     *          observer.addListener(dialog,'button_click',function(e,info,element){
     *              if(info.type=='ok'){ //点击确定按钮
     *                  e.preventDefault(); //阻止dialog关闭
     *              }else if(info.type == 'cancel'){ //点去取消按钮
     *
     *              }
     *          });
     *
     * @extends {MVCObject}
     * */
    function Dialog(options) {

        addCache(this);

        this._container = $(htmlDialog);
        this._titleDiv = this._container.find('.GSX_Dialog_title');
        this._contentDiv = this._container.find('.GSX_Dialog_content');
        this._closeButton = this._container.find('.GSX_Dialog_closeButton');
        this._buttonsDiv = this._container.find('.GSX_Dialog_buttons');

        var closeButtonElement = this._closeButton.get(0);
        this._closeBtnEvt = observer.addDomListener(closeButtonElement, 'click', util.function.bind(this.hide, this));

        var popupDiv = this._popup = new BasePopupDiv({
            'content': this._container.get(0),
            'zIndex': 900
        });

        for (var key in BasePopupDiv.DEAFULT_OPTIONS) {
            if (BasePopupDiv.DEAFULT_OPTIONS.hasOwnProperty(key)) {
                popupDiv.bindTo(key, this, null, true);
            }
        }

        this.setValues($.extend({}, defaultOptions, options));
    }

    util.inherits(Dialog, MVCObject);

    Dialog.prototype.show = function () {
        this.set('display', true);
    };
    Dialog.prototype.hide = function () {
        this.set('display', false);
    };

    /**
     * @private
     * */
    Dialog.prototype.enableMask_changed = function () {
        var enable = this.get('enableMask') !== false;
        if (enable) {
            if (!this._mask) {
                this._mask = new PageMask();
                this._mask.bindTo('display', this);
            }
        } else {
            if (this._mask) {
                this._mask.unbindAll();
                this._mask.destroy();
                this._mask = null;
            }
        }
    };

    /**
     * @private
     * */
    Dialog.prototype.title_changed = function () {
        var title = this.get('title');
        if (util.lang.isJQuery(title) ||
            util.lang.isDom(title) ||
            util.lang.isString(title)) {
            $(this._titleDiv).html(title).show();
        } else {
            $(this._titleDiv).html('').hide();
        }

    };
    /**
     * @private
     * */
    Dialog.prototype.content_changed = function () {
        var content = this.get('content');
        if (util.lang.isString(content)) {
            $(this._contentDiv).html(content);
        } else {
            $(this._contentDiv).append(content);
        }
    };
    /**
     * @private
     * */
    Dialog.prototype.closeButton_changed = function () {
        var disable = this.get('closeButton') === false;
        this._closeButton[!disable ? 'show' : 'hide']();
    };
    /**
     * @private
     * */
    Dialog.prototype.skin_changed = function () {
        var skin = this.get('skin');
        var $contentDiv = this._container;
        $contentDiv.removeClass();
        $contentDiv.addClass('GSX_Dialog');
        if (skin) {
            $contentDiv.addClass(skin);
        } else {
            $contentDiv.addClass('GSX_Dialog_default');
        }
    };
    /**
     * @private
     * */
    Dialog.prototype.buttons_changed = function () {
        var buttons = this.get('buttons') || '';
        var container = this._buttonsDiv;
        container.html('');

        var buttonElement;
        var buttonText;
        var n = 0;
        if (buttons.length > 0) {
            for (var i = 0; i < 2; i++) {
                if (buttons[i]) {
                    buttonElement = $('<div class="GSX_Dialog_button"></div>');
                    buttonText = buttons[i].content;
                    if (buttons[i].skin) {
                        buttonElement.addClass(buttons[i].skin);
                    } else {
                        switch (buttons[i].type) {
                            case 'ok':
                                buttonElement.addClass('GSX_Dialog_skin_ok');
                                if (!buttonText) {
                                    buttonText = '确认';
                                }
                                break;
                            case 'cancel':
                                buttonElement.addClass('GSX_Dialog_skin_cancel');
                                if (!buttonText) {
                                    buttonText = '取消';
                                }
                                break;
                        }
                    }
                    buttonElement.html(buttonText);
                    buttonElement.appendTo(container);
                    n++;
                }
            }
        }
        if (n > 0) {
            container.show();
            bindButtonsEvent(this);
        } else {
            container.hide();
            unbindButtonsEvent(this);
        }
    };

    Dialog.prototype.destroy = function () {
        this._popup.destroy();
        this._popup = null;
        this.set('content', null);
        this.set('title', null);
        if (this._container.parentNode) {
            this._container.parentNode.removeChild(this._container);
            this._container = null;
        }
        if (this._mask) {
            this._mask.unbindAll();
            this._mask.destroy();
            this._mask = null;
        }
        this._titleDiv = null;
        this._contentDiv = null;
        this.unbindAll();
        if (this._closeBtnEvt) {
            observer.removeListener(this._closeBtnEvt);
            this._closeBtnEvt = null;
        }
        observer.clearInstanceListeners(this);

        removeCache(this);
    };

    function addCache(dialogInstance) {
        if (!arrDialogs.exists(dialogInstance)) {
            arrDialogs.push(dialogInstance);
        }
    }

    function removeCache(dialogInstance) {
        if (arrDialogs.exists(dialogInstance)) {
            arrDialogs.remove(dialogInstance);
        }
    }

    function bindButtonsEvent(instance) {
        var $element = instance._buttonsDiv;
        $element.on('click', '.GSX_Dialog_button', function (e) {
            var $element = $(this);
            var index = $element.index();
            var buttons = instance.get('buttons');
            if (buttons[index]) {
                var type = buttons[index].type;
                observer.trigger(instance, 'button_click', e, buttons[index], $element);
                if (!e.isDefaultPrevented()) {
                    switch (type) {
                        case 'ok':
                            instance.set('display', false);
                            break;
                        case 'cancel':
                            instance.set('display', false);
                            break;
                    }
                }
            }
        });
    }

    function unbindButtonsEvent(instance) {
        var $element = instance._buttonsDiv;
        $element.off('click');
    }

    var util_lang = util.lang;
    publish(Dialog, {
        'content': util_lang.union(
            util_lang.isDom,
            util_lang.isString,
            util_lang.isJQuery,
            util_lang.isNull
        ),
        'title': util_lang.union(
            util_lang.isDom,
            util_lang.isString,
            util_lang.isJQuery,
            util_lang.isNull
        ),
        'closeButton': util_lang.isBoolean,
        'position': util_lang.isString,
        'buttons': util_lang.union(
            util_lang.isArray,
            util_lang.isNull
        )
    });

    return Dialog;
});