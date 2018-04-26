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
    var Dialog = require('common/mvc-component/Dialog/Dialog');
    var imageLoader = require('common/loader/imageLoader');

    var css = require('text!./ImageCheckCodeDialog.styl');

    var cssToken = util.insertCssText(css);

    var html = require('text!./ImageCheckCodeDialog.tpl');

    /**
     * 图形验证码弹框
     *
     * attributes:
     *      text {string} 提示文字
     *      type {string}
     *      errorText {string}
     *
     * trigger events:
     *      success(value:string) 点击确认按钮触发该事件
     *
     * */
    function ImageCheckCodeDialog(options) {
        var self = this;
        this._content = $(html);
        var dialog = this._dialog = new Dialog({
            'position': 'absolute',
            'closeButton': false,
            'content': this._content,
            'maxWidth': 400,
            'buttons': [
                {
                    type: 'cancel'
                },
                {
                    type: 'ok'
                }
            ]
        });
        this.bindTo('title', dialog);
        this.bindTo('position', dialog);
        this.bindTo('display', dialog);
        this.bindTo('closeButtons', dialog);
        this.bindTo('enableMask', dialog);

        observer.addListener(dialog, 'button_click', function (e, buttonInfo, buttonElement) {
            if (buttonInfo.type == 'ok') {
                var $input = self._content.find('input[name=check_code]');
                if ($input.val()) {
                    observer.trigger(self, 'success', $input.val());
                } else {
                    self.set('errorText', '请输入验证码');
                }
            } else if (buttonInfo.type == 'cancel') {
                observer.trigger(self, 'cancel');
            }
        });
        observer.forward(dialog, 'button_click', this);

        bindInputEvents(this, this._content.find('input[name=check_code]'));

        this.setValues(options);
    }

    util.inherits(ImageCheckCodeDialog, MVCObject);

    var p = ImageCheckCodeDialog.prototype;

    p.show = function () {
        this.set('display', true);
    };
    p.hide = function () {
        this.set('display', false);
    };
    p.refresh = function () {
        this.notify('image');
    };
    p.destroy = function () {
        this._dialog.destroy();
        this._dialog = null;
    };
    p.type_changed = function () {
        var type = this.get('type') || 'common';
        var imageSrc = '/captcha?captcha_name=' + type;
        this.set('image', imageSrc);
    };
    p.image_changed = function () {
        var self = this;
        var image = self.get('image');
        var imageElement = self._content.find('.ImageCheckCodeDialog-image');
        if (image) {
            imageElement.attr('src', image + '&t=' + new Date().getTime());
        } else {
            imageElement.attr('src', '');
        }
    };
    p.errorText_changed = function () {
        var text = this.get('errorText');
        if (util.lang.isNull(text)) {
            text = '';
        }
        var $errorTextContainer = this._content.find('.ImageCheckCodeDialog-error');
        if (!text) {
            $errorTextContainer.hide();
        } else {
            $errorTextContainer.show();
        }
        $errorTextContainer.html(text);
    };

    function bindInputEvents(instance, $inputElement) {
        var loading = false;

        var checkValue = '';

        function doCheck() {
            var type = instance.get('type');
            var value = $inputElement.val();
            if (value.length >= 4 && !loading && value != checkValue) {
                loading = true;
                checkValue = value;
                $.ajax({
                    url: '/captcha/validate',
                    data: {
                        'captcha_name': type,
                        'captcha': value
                    },
                    method: 'post',
                    dataType: 'json',
                    async: true
                }).done(function (response) {
                    loading = false;
                    if (response.code == '110056') {
                        instance.set('errorText', '验证码错误，请重新输入');
                    } else if (response.code == 0) {
                        instance.set('errorText', '');
                    }
                });
            }
        }

        var timer = null;
        observer.addListener(instance, 'display_changed', function () {
            var display = instance.get('display');
            if (display) {
                if (!timer) {
                    timer = setInterval(doCheck, 200);
                }
            } else {
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                }
            }
        });
        observer.addListener(instance, 'image_changed', function () {
            checkValue = null;
        });

        $inputElement.on('focus', function () {
            instance._dialog.set('enableAutoCenter', false);
        });
        $inputElement.on('blur', function () {
            instance._dialog.set('enableAutoCenter', true);
        });
        instance._content.find('.ImageCheckCodeDialog-refresh').click(function () {
            instance.refresh();
        });
    }


    return ImageCheckCodeDialog;
});