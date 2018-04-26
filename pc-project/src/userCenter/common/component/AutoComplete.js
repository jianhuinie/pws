/**
 * @file 自动补全
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var AutoComplete = require('custom/ui/AutoComplete');

    return Ractive.extend({
        template: require('html!./AutoComplete.html'),
        data: function () {
            return {
                options: {
                    className: '',
                    data: null,
                    opened: false,
                    load: $.noop,
                    render: $.noop,
                    input: {
                        name: '',
                        value: '',
                        placeholder: '',
                        className: '',
                        autofocus: false
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

            var inputElement = container.find(':text,textarea');
            var menuElement = container.find('.menu');

            var changeHandler = function () {
                me.set(
                    'options.input.value',
                    inputElement.val()
                );
            };

            var load = me.get('options.load');
            var parent = me.parent;
            if ($.isFunction(load) && parent) {
                load = $.proxy(load, parent);
            }

            var render = me.get('options.render');
            if ($.isFunction(render) && parent) {
                render = $.proxy(render, parent);
            }

            var showMenuTrigger = 'focus';
            if (me.get('options.input.readonly')) {
                showMenuTrigger = 'click';
            }

            var autoComplete =
            me.autoComplete = new AutoComplete({
                mainElement: container,
                inputElement: inputElement,
                menuElement: menuElement,
                itemActiveClass: 'active',
                load: load,
                render: render,
                showMenuTrigger: showMenuTrigger,
                onselect: changeHandler,
                onenter: changeHandler,
                watch: {
                    opened: function (opened) {
                        me.set('options.opened', opened);
                    },
                    data: function (data) {
                        me.set('options.data', data);
                    }
                }
            });

            me.observe('options.opened', function (opened) {
                if (opened) {
                    autoComplete.open();
                }
                else {
                    autoComplete.close();
                }
            });
            me.observe('options.data', function (data) {
                autoComplete.set('data', data);
            });

        },
        onteardown: function () {
            this.autoComplete.dispose();
        }
    });

});