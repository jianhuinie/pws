/**
 * @file 初始化整站 UI
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Tooltip = require('cobble/ui/Tooltip');

    var zIndex = 1000;

    Tooltip.init($('[data-title]'));

    function isFormText(target) {
        if (!target.hasClass('form-text')
            && target.prop('tagName') === 'INPUT'
            ) {
            var tagName = target.parent().prop('tagName');
            return tagName === 'DIV' || tagName === 'SPAN';
        }
    }

    var body = $(document.body);

    // 绑定前后缀输入框的激活状态
    body
        .focusin(function (e) {
            var target = $(e.target);
            if (isFormText(target)) {
                target.parent().addClass('active');
            }
        })
        .focusout(function (e) {
            var target = $(e.target);
            if (isFormText(target)) {
                target.parent().removeClass('active');
            }
        });

    function createButtons(buttons) {

        var html = [ '<div class="dialog-action">' ];

        $.each(
            buttons,
            function (index, item) {

                var type = item.type || 'default';

                html.push(
                        '<b class="btn-' + type + '">' + item.text  + '</b>'
                );
            }
        );

        html.push('</div>');

        return html.join('');
    }

    function bindButtons(dialog, buttons) {

        dialog
            .element
            .on('click', '.dialog-action [class^="btn-"]', function (e) {

                var target = $(e.currentTarget);
                var index = target.index();
                if (buttons[index].handler) {
                    buttons[index].handler.call(dialog);
                }
                else {
                    buttons[index].action.call(dialog);
                }
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
     *             text: '确定'
     *             type: 'primary',
     *             handler: function () {
     *                 // this 是 dialog 实例
     *             }
     *         }
     *     ]
     * });
     *
     * @param {string} content 内容
     * @param {?string} title 标题，可选
     */
    window.alert = function (content, title) {

        var options = {
            title: title,
            content: content,
            zIndex: zIndex,
            skinClass: 'dialog-alert',
            onAfterHide: function () {
                this.element.off();
            }
        };

        if ($.isPlainObject(content)) {
            $.extend(options, content);
        };

        var buttons = options.buttons;
        if (!buttons) {
            buttons = [
                {
                    text: '确定',
                    type: 'primary',
                    handler: function () {
                        this.hide();
                    }
                }
            ];
        }

        options.content += createButtons(buttons);

        var dialog = new Dialog(options);

        bindButtons(dialog, buttons);

    };

    /**
     * 覆盖 window.confirm
     *
     * 监听点击确定按钮，代码如下:
     *
     * confirm('xxx')
     * .done(function () {
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
     *             handler: function () {
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
    window.confirm = function (content, title) {

        var options = {
            title: title,
            content: content,
            zIndex: zIndex,
            skinClass: 'dialog-confirm',
            onAfterHide: function () {
                this.element.off();
            }
        };

        if ($.isPlainObject(content)) {
            $.extend(options, content);
        }

        var result = $.Deferred();

        var buttons = options.buttons;
        if (!buttons) {
            buttons = [
                {
                    text: '确定',
                    type: 'primary',
                    handler: function () {
                        this.hide();
                        result.resolve();
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                        this.hide();
                        result.reject();
                    }
                }
            ];
        }

        options.content += createButtons(buttons);

        var dialog = new Dialog(options);

        bindButtons(dialog, buttons);

        return result;
    };


    function remind(type, content, callback) {

        var body = $(document.body);

        var mask = $('<div class="viewport-mask"></div>');
        var element = $('<div class="dialog-' + type + '">' + content + '</div>');

        body.append(mask);
        body.append(element);

        element.css({
            'margin-left': element.outerWidth() / -2,
            'margin-top': element.outerHeight() / -2
        });

        var fadeIn = 500;
        var fadeOut = 500;
        var showTime = 1500;

        // 淡入
        element.fadeIn(fadeIn);

        setTimeout(
            function () {
                // 展示时间
                setTimeout(
                    function () {
                        // 淡出
                        element.fadeOut(fadeOut);
                        setTimeout(
                            function () {

                                mask.remove();
                                element.remove();

                                if ($.isFunction(callback)) {
                                    callback();
                                }

                            },
                            fadeOut
                        );
                    },
                    showTime
                );
            },
            fadeIn
        );
    }

    /**
     * 主要提示
     *
     * @param {string} content
     * @param {Function=} callback
     */
    window.primary = function (content, callback) {
        remind('primary', content, callback);
    };

    /**
     * 信息提示
     *
     * @param {string} content
     * @param {Function=} callback
     */
    window.info = function (content, callback) {
        remind('info', content, callback);
    };

    /**
     * 扩展成功提示
     *
     * @param {string} content
     * @param {Function=} callback
     */
    window.success = function (content, callback) {
        remind('success', content, callback);
    };

    /**
     * 扩展失败提示
     *
     * @param {string} content
     * @param {Function=} callback
     */
    window.error = function (content, callback) {
        remind('error', content, callback);
    };

});