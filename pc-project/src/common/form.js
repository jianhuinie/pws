/**
 * @file 表单工具
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Validator = require('cobble/form/Validator');

    /**
     * 解析表单数据
     *
     * @inner
     * @param {jQuery} form 表单元素
     * @return {Object}
     */
    function parse(form) {

        var data = { };

        var fields = form.find('[name]');
        fields.each(
            function () {

                var name = this.name;
                var value = this.value;
                var isBox = this.type === 'radio'
                         || this.type === 'checkbox';

                // 如果是 `单选框` 或 `复选框`，必须选中才算
                if (isBox) {
                    if (this.checked) {
                        data[name] = value;
                    }
                }
                else {
                    var list = data[name];
                    if (list == null) {
                        data[name] = value;
                    }
                    else {
                        list = data[name] = [ list ];
                        list.push(value);
                    }
                }

            }
        );

        $.each(
            data,
            function (key, value) {

                data[key] = $.isArray(value)
                          ? value.join(',')
                          : $.trim(value);

            }
        );

        return data;
    }

    /**
     * 显示错误信息
     *
     * @inner
     * @param {jQuery} form 表单元素
     * @param {Object} errors 错误信息，格式如下：
     *                        {
     *                            username: '请输入用户名',
     *                            password: '密码太简单'
     *                        }
     */
    function showError(form, errors) {
        $.each(
            errors,
            function (name, text) {
                if (text) {
                    var field = form.find('[name="' + name + '"]');
                    var group = field.closest('.form-group');

                    group
                    .removeClass('has-success')
                    .addClass('has-error');

                    var error = group.find('.error');

                    error.html(text);
                    Validator.defaultOptions.errorPlacement(
                        field,
                        error
                    );
                }
            }
        );
    }

    /**
     * 解析表单数据
     *
     * @param {jQuery} form 表单元素
     * @return {Object}
     */
    exports.parse = function (form) {
        return parse(form);
    };

    /**
     * 以 get 方式发送表单数据
     *
     * @param {jQuery|Object} form 表单元素或表单数据
     * @param {string} url 发送地址
     * @return {Promise}
     */
    exports.get = function (form, url) {

        return $
        .ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            data: form.jquery ? parse(form) : form
        })
        .done(function (response) {
            if (response.code) {
                var data = response.data;
                if (data) {
                    showError(form, data);
                }
            }
            return response;
        });
    };

    /**
     * 以 post 方式发送表单数据
     *
     * @param {jQuery|Object} form 表单元素或表单数据
     * @param {string} url 发送地址
     * @return {Promise}
     */
    exports.post = function (form, url) {

        return $
        .ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: form.jquery ? parse(form) : form
        })
        .done(function (response) {
            if (response.code) {
                var data = response.data;
                if (data) {
                    showError(form, data);
                }
            }
            return response;
        });
    };

});