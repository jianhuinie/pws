/**
 * @file 把 Ractivejs 和 Dialog 合起来用
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var Dialog = require('custom/ui/Dialog');

    return function (options, dialogOptions, componentOptions) {

        var dialog;
        var instance;

        if (!$.isPlainObject(dialogOptions)) {
            dialogOptions = { };
        }

        var onbeforedispose = dialogOptions.onbeforedispose;
        dialogOptions.onbeforedispose = function () {
            if ($.isFunction(onbeforedispose)) {
                onbeforedispose.apply(this, arguments);
            }
            instance.teardown();
        };

        // 是一个可直接实例化的组件
        if ($.isFunction(options)) {
            dialogOptions.content = ' ';
            dialogOptions.removeOnEmpty = true;
            dialog = new Dialog(dialogOptions);
            instance = new Ractive({
                el: dialog.find('> .body')[0],
                data: {
                    options: componentOptions,
                },
                template: '<DialogBodyComponent options="{{options}}" />',
                components: {
                    DialogBodyComponent: options
                }
            });
            instance = instance.findComponent('DialogBodyComponent');
        }
        // 是一份完整的配置，模板包括整个对话框
        else if ($.isPlainObject(options)) {
            var template = options.template;
            var mainElement = $(template);

            dialogOptions.mainElement = mainElement;
            dialogOptions.mainTemplate = null;
            dialog = new Dialog(dialogOptions);

            // 模板第一层已经被对话框占用，即已经是一个开始生命周期的 DOM 元素
            // ractive 只能用第二层
            var startIndex = template.indexOf('>');
            var endIndex = template.lastIndexOf('<');
            options.template = template.substring(startIndex + 1, endIndex);
            options.el = mainElement[0];

            instance = new Ractive(options);
        }

        instance.getElement = function () {
            return instance.el;
        };
        instance.closeDialog = function () {
            dialog.hide();
        };

        dialog.ractive = instance;

        return dialog;

    };

});