/**
 * @file 个人信息-相关案例
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var SuccessForm = require('./SuccessForm');
    var service = require('common/service');

    function createForm(element, data) {
        // 初始化表单
        element.data(
            'form',
            new SuccessForm({
                element: element,
                data: data
            })
        );
    }

    exports.init = function () {

        var container = $('#content .success');

        var me = this;

        // 数量
        var count = container.find('.success-item').length;

        // 初始化经历表单
        container
        .find('.form-success')
        .each(function () {

            var element = $(this);

            createForm(
                element,
                element.prev('.form-trigger').data('success')
            );

        });

        container

            .on('click', '.edit', function (e) {

                var triggerElement = $(e.currentTarget).closest('.form-trigger');
                var formElement = triggerElement.next('.form');

                triggerElement.hide();

                formElement.data('form').refresh();

                formElement.show();

            })

            .on('click', '.btn-cancel', function (e) {

                var formElement = $(e.currentTarget).closest('.form');
                var triggerElement = formElement.prev('.form-trigger');

                triggerElement.show();
                formElement.hide();

            })

            .on('click', '.remove', function (e) {

                var target = $(e.currentTarget);
                var triggerElement = target.closest('.form-trigger');
                var form = triggerElement.next('.form-success').data('form');

                var data = form.data;

                confirm('确认删除该条相关案例吗？', '温馨提示')
                .done(function () {

                    service
                    .delTeacherSuccess({ id: data.id })
                    .done(function (response) {

                        if (response.code === 0) {

                            count--;

                            success('删除成功');

                            var item = triggerElement.closest('.success-item');
                            item.remove();
                        }
                    });

                });

            })


            .on('save', function (e, data) {

                var form = data.form;
                var formElement = form.element;
                var triggerElement = form.element.prev('.form-trigger');

                if (data.isSuccess) {

                    success('保存成功');

                    count++;

                    // 隐藏错误信息
                    formElement.find('.reasons').remove();
                    formElement.find('.form-error').removeClass('.form-error');
                    triggerElement.find('.message-error').hide();

                    triggerElement.show();
                    formElement.hide();

                    var data = data.data;
                    var isCreate = data.id == null;

                    // 新建，反显
                    if (form.data.id == null) {

                        var element;

                        // 第一个成果
                        if (count === 1) {
                            // 替换整个
                            element = $(container.find('.tpl-showcase').html());
                            container.find('.no-data').replaceWith(element);

                            createForm(element.find('.form'));
                        }

                        // 往后追加一个
                        element = $(container.find('.tpl-item').html());
                        container.find('.info-body').prepend(element);

                        formElement = element.find('.form');
                        triggerElement = element.find('.form-trigger');

                        createForm(formElement, data);
                    }

                    // 返现数据
                    triggerElement.find('.date').html(
                        data.year + ' 年 ' + data.month + ' 月'
                    );
                    triggerElement.find('.title').html(
                        data.title
                    );
                    triggerElement.find('.content').html(
                        data.content.replace(/\n/g, '<br />')
                    );

                }
            });

    };



});


