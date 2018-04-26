/**
 * @file 初始化整站 UI
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Queue = require('cc/util/Queue');
    var Timer = require('cc/util/Timer');
    var around = require('cc/function/around');
    var contains = require('cc/function/contains');

    var Tooltip = require('custom/ui/Tooltip');
    var Dialog = require('custom/ui/Dialog');

    /**
     * 避免连续弹出太多的 dialog
     *
     * @inner
     * @param {Function} fn
     */
    var dialogQueue = new Queue({
        task: function (fn, callback) {
            fn(callback);
        }
    });


    function createButtons(buttons, append) {

        var html = [ ];

        $.each(
            buttons,
            function (index, item) {
                html.push(
                    '<div class="button ' + (item.type || 'link') + '">' + item.text  + '</div>'
                );
            }
        );

        if (html.length > 0) {
            return '<div class="buttons">'
                + html.join('')
                + (append || '')
                + '</div>';
        }

    }

    function bindButtons(dialog, buttons) {

        var activeElement = document.activeElement;
        if (activeElement
            && !contains(dialog.find('> .body'), activeElement)
        ) {
            if (activeElement.tagName === 'INPUT'
                || activeElement.tagName === 'TEXTAREA'
            ) {
                activeElement.blur();
            }
        }

        dialog.live('click', '> .footer .button', function (e) {

            var index = $(this).index();

            buttons[index].action.call(dialog);

        });

    }


    /**
     * 覆盖 window.alert
     *
     * 如果想自定义按钮或宽度，可使用
     *
     * alert({
     *     title: '',
     *     content: '',
     *     width: 200,
     *     buttons: [
     *         {
     *             text: '确定',
     *             type: 'primary',
     *             action: function () {
     *                 // this 是 dialog 实例
     *             }
     *         }
     *     ]
     * });
     *
     * @param {string} content 内容
     * @param {?string} title 标题，可选
     */
    function alert(content, title) {

        var options = {
            title: title,
            content: content,
            draggable: false
        };

        if ($.isPlainObject(content)) {
            $.extend(options, content);
        };

        var type;
        if ($.type(options.type) === 'string') {
            type = options.type;
        }
        options.skinClass = [type, 'dialog-alert'].join(' ');
        options.disposeOnHide = true;
        options.removeOnDispose = true;

        var buttons = options.buttons;
        if (!buttons) {
            buttons = [
                {
                    text: '确定',
                    type: type || 'primary',
                    action: function () {
                        this.hide();
                    }
                }
            ];
        }

        var append = '';
        if (options.checkboxLabel) {
            append = '<label class="checkbox small">'
                +     '<input type="checkbox">'
                +     options.checkboxLabel
                + '</label>';

            var onbeforehide = options.onbeforehide;
            if ($.isFunction (onbeforehide)) {
                options.onbeforehide = function () {
                    onbeforehide.call(
                        this,
                        this.find('input[type="checkbox"]').prop('checked')
                    );
                };
            }
        }

        options.footer = createButtons(buttons, append);

        dialogQueue.add(
            function (callback) {

                options.onafterhide = function () {
                    callback();
                };

                bindButtons(
                    new Dialog(options),
                    buttons
                );

            }
        );

    }

    /**
     * 覆盖 window.confirm
     *
     * 监听点击确定按钮，代码如下:
     *
     * confirm('xxx')
     * .then(function () {
     *     console.log('确定');
     * });
     *
     * confirm({
     *     title: '',
     *     content: '',
     *     width: 200,
     *     buttons: [
     *         {
     *             text: '确定',
     *             type: 'primary',
     *             action: function () {
     *                 // this 是 dialog 实例
     *             }
     *         }
     *     ]
     * });
     *
     * @param {string} content 内容
     * @param {?string} title 标题，可选
     * @return {Promise}
     */
    function confirm(content, title) {

        var options = {
            title: title,
            content: content,
            draggable: false
        };

        if ($.isPlainObject(content)) {
            $.extend(options, content);
        }

        var type;
        if ($.type(options.type) === 'string') {
            type = options.type;
        }
        options.skinClass = [type, 'dialog-confirm'].join(' ');
        options.disposeOnHide = true;
        options.removeOnDispose = true;

        var result = $.Deferred();

        var buttons = options.buttons;
        if (!buttons) {
            buttons = [
                {
                    text: '确定',
                    type: type || 'primary',
                    action: function () {
                        this.hide();
                    }
                },
                {
                    text: '取消',
                    type: 'link',
                    action: function () {
                        this.hide();
                    }
                }
            ];
        }

        var append = '';
        if (options.checkboxLabel) {
            append = '<label class="checkbox small">'
                +     '<input type="checkbox">'
                +     options.checkboxLabel
                + '</label>';

            var onbeforehide = options.onbeforehide;
            if ($.isFunction (onbeforehide)) {
                options.onbeforehide = function () {
                    onbeforehide.call(
                        this,
                        this.find('input[type="checkbox"]').prop('checked')
                    );
                };
            }
        }

        options.footer = createButtons(buttons, append);

        dialogQueue.add(
            function (callback) {

                options.onafterhide = function () {
                    callback();
                };

                $.each(
                    buttons,
                    function (index, button) {

                        var action;
                        if (!index) {
                            action = function () {
                                result.resolve();
                            };
                        }
                        else {
                            action = function () {
                                result.reject();
                            };
                        }

                        around(button, 'action', null, action);

                    }
                );

                bindButtons(
                    new Dialog(options),
                    buttons
                );

            }
        );

        return result;

    }

    var tipElement;
    var tipCloseTimer;
    var countdownTimer;
    var closePromise;

    function deactiveTip() {
        if (tipCloseTimer) {
            clearTimeout(tipCloseTimer);
            tipCloseTimer = null;
        }
        if (countdownTimer) {
            countdownTimer.stop();
        }
        if (closePromise) {
            closePromise.resolve();
        }
        tipElement.removeClass('active');
        $('#tip-mask').remove();
    }

    /**
     * 成功提示
     *
     * @param {Object} options
     * @property {string} options.content
     * @property {string=} options.type 提示类型
     * @property {boolean=} options.modal 是否是模态
     * @property {delay=} options.duration 提示的持续时间，单位：毫秒
     * @return {Promise}
     */
    function tip(options) {

        deactiveTip();

        closePromise = $.Deferred();

        var defaultOptions = {
            modal: false,
            duration: 3000
        };
        options = $.extend(defaultOptions, options);

        var textElement = tipElement.find('.text');
        textElement.html(options.content);

        var classList = [
            'tip-label',
            'label',
            'active'
        ];

        if (options.type) {
            classList.push(options.type);
        }

        tipElement
            .prop('className', classList.join(' '));

        // 添加遮罩
        if (options.modal) {
            var maskElement = $('<div id="tip-mask" class="mask"></div>');

            var zIndex = tipElement.css('z-index');
            if (!$.isNumeric(zIndex)) {
                zIndex = 'auto';
            }

            maskElement.css('z-index', zIndex);
            tipElement.before(maskElement);
        }

        var duration = options.duration;

        tipCloseTimer = setTimeout(
            deactiveTip,
            duration
        );

        // 启动定时器
        var countElement = textElement.find('.timer');
        if (countElement.length === 1) {
            countElement.html(duration / 1000);
            countdownTimer = new Timer({
                task: function () {
                    if (duration > 0) {
                        duration -= 1000;
                    }
                    countElement.html(duration / 1000);
                },
                interval: 1000
            });
            countdownTimer.start();
        }

        return closePromise;

    }

    exports.init = function () {

        new Tooltip({
            triggerSelector: '[data-title]'
        });

        tipElement = $(
            '<div class="tip-label label">'
            +     '<span class="close">×</span>'
            +     '<span class="text"></span>'
            + '</div>'
        )
        .appendTo('#app')
        .on('click', '.close', deactiveTip);

        window.alert = alert;
        window.confirm = confirm;
        window.tip = tip;

    };

});