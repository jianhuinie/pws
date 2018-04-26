/**
 * @file 标签输入框
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var testTarget = require('cc/function/testTarget');
    var keyboard = require('cc/util/keyboard');

    return Ractive.extend({
        template: require('html!./TagInput.html'),
        data: function () {
            return {
                style: require('text!./TagInput.styl'),
                inputOptions: {
                    name: 'tags'
                },
                options: {
                    name: '',
                    value: [],
                    placeholder: '',
                    className: '',
                    // multiple 为 true 表示是 textarea
                    multiple: false,
                    lazy: false,
                    disabled: false,
                    readonly: false,
                    autofocus: false,

                    max: 8,
                    validate: function (tag) {
                        return true;
                    }
                }
            };
        },
        components: {
            Input: require('./Input')
        },
        onrender: function () {
            var me = this;
            var container = $(me.getElement());
            me.observe('options.value', function (value) {
                var data = {
                    'inputOptions.value': ''
                };
                me.set(data);
            });
            me.on('clickTags', function (e) {
                if (testTarget(e.original.target, '.button', container)) {
                    return;
                }
                me.set('inputOptions.focus', true);
            });
            me.on('Input.keydown', function (e) {
                var keyCode = e.original.keyCode;
                if (keyCode === keyboard.space) {
                    var value = me.get('inputOptions.value');
                    if (me.addTag(value)) {
                        me.set('inputOptions.value', '');
                    }
                    return false;
                }
                else if (keyCode === keyboard.backspace) {
                    var value = me.get('inputOptions.value');
                    if (!$.trim(value)) {
                        var tags = me.get('options.value');
                        if (tags.length > 0) {
                            tags.pop();
                        }
                    }
                }
            });
        },
        addTag: function (tag) {
            var me = this;
            var validate = me.get('options.validate');
            if (!validate(tag)) {
                return false;
            }
            var tags = me.get('options.value');
            tag = $.trim(tag);
            if ($.inArray(tag, tags) < 0) {
                var max = me.get('options.max');
                if (tags.length >= max) {
                    return false;
                }
                tags.push(tag);
                return true;
            }
            else {
                return false;
            }
        },
        deleteTag: function (index) {
            var tags = this.get('options.value');
            tags.splice(index, 1);
        }
    });

});