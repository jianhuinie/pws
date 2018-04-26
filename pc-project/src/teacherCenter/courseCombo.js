/**
 * @file 课时优惠包
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var ComboForm = require('./course/ComboForm');

    exports.init = function () {

        var container = $('.course-combo');

        container
        .find('.combo-form')
        .each(function () {

            var element = $(this);

            element.data(
                'form',
                new ComboForm({
                    element: element,
                    data: element.prev('.form-trigger').data('combo')
                })
            );
        });


        container
        .on('click', '.edit', function (e) {

            var form = container.find('.form');
            form.hide();
            form.prev('.form-trigger').show();

            var trigger = $(e.currentTarget).closest('.form-trigger');
            var form = trigger.next('.form');

            form.data('form').refresh();

            trigger.hide();
            form.show();
        })

        .on('click', '.remove', function (e) {

            var trigger = $(e.currentTarget).closest('.form-trigger');
            var data = trigger.data('combo');

            var parent = trigger.parent();

            if (parent.children('.form-trigger').length < 3) {
                alert('请至少保留一个课程套餐，套餐可以不用打折');
            }
            else {
                confirm('确认删除该课程套餐吗？', '温馨提示')
                .done(function () {
                    service
                    .delCombo({ id: data.id })
                    .done(function () {

                        location.reload();

                    });
                });
            }
        })

        .on('click', '.btn-default', function (e) {

            var target = $(e.currentTarget);
            var form = target.closest('.form');

            form.hide();
            form.prev('.form-trigger').show();
        });

    };

});
