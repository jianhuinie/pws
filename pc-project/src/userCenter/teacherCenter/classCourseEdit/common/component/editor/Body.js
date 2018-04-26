/**
 * @file 添加正文
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var COLOR_BLACK = '#000000';
    var COLOR_GRAY = '#999999';
    var COLOR_RED = '#FC5C5A';
    var COLOR_YELLOW = '#FF9100';
    var COLOR_BLUE = '#0F86E8';
    var COLOR_GREEN = '#43B244';
    var COLOR_DARKBLUE = '#3D618A';
    var COLOR_PURPLE = '#9900CC';

    var Component = Ractive.extend({
        template: require('html!./Body.html'),
        data: function () {
            return {
                style: require('text!./Body.styl'),
                index: '',
                colorList: [
                    COLOR_BLACK,
                    COLOR_GRAY,
                    COLOR_RED,
                    COLOR_YELLOW,
                    COLOR_BLUE,
                    COLOR_GREEN,
                    COLOR_DARKBLUE,
                    COLOR_PURPLE
                ],
                inputOptions: {
                    name: 'body',
                    placeholder: '编辑正文',
                    className: 'body-input fluid',
                    multiple: true,
                    autoHeight: false,
                    lazy: true
                },
                showToolBar: true,
                options: {
                    text: '',
                    color: COLOR_BLACK,
                    isBold: false,
                    isBig: false,
                    isCenter: false,
                    isEditing: false
                }
            };
        },
        onrender: function () {
            var me = this;
            me.bindData({
                'inputOptions.value': 'options.text'
            });

            me.observe('inputOptions.focus', function (focus) {
                if (focus) {
                    this.set('showToolBar', true);
                }
            });
            me.observe('inputOptions.blur', function (blur) {
                if (blur) {
                    this.set('showToolBar', false);
                }
            });
        },
        openEdit: function () {
            this.set({
                'inputOptions.autofocus': true,
                'options.isEditing': true
            })
        },
        components: {
            Input: require('../../../../../common/component/Input')
        },
        remove: function () {
            var me = this;
            if (me.get('options.text')) {
                alert({
                    title: '温馨提示',
                    content: '您确认删除吗？',
                    buttons: [
                        {
                            text: '确定',
                            type: 'primary',
                            action: function () {
                                me.fire(
                                    'remove',
                                    {
                                        index: me.get('index')
                                    }
                                );
                                this.hide();
                            }
                        },
                        {
                            text: '取消',
                            type: '',
                            action: function () {
                                this.hide();
                            }
                        }
                    ]
                })
            }
            else {
                me.fire(
                    'remove',
                    {
                        index: me.get('index')
                    }
                );
            }
        }
    });

    Component.COLOR_BLACK = COLOR_BLACK;

    return Component;

});