/**
 * @file 添加标题
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';
    var Validator = require('custom/form/Validator');

    return Ractive.extend({
        template: require('html!./Title.html'),
        data: function () {
            return {
                style: require('text!./Title.styl'),
                index: '',
                inputOptions: {
                    name: 'title',
                    placeholder: '编辑段落标题，最多 10 个字',
                    className: 'title-input fluid huge',
                    value: '',
                    maxlength: 10
                },
                options: {
                    text: ''
                }
            };
        },
        onrender: function () {
            var me = this;
            me.bindData({
                'inputOptions.value': 'options.text'
            });
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

});