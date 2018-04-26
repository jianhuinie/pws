define(function (require, exports, module) {

    'use strict';

    var Validator = require('cc/form/Validator');
    var etpl = require('cc/util/etpl');

    var tplRender = { };

    function getControlElement(fieldElement) {

        var controlElement;

        if (fieldElement.is('.input') || fieldElement.is('.dropdown')) {
            controlElement = fieldElement;
        }
        else {
            var tempElement = fieldElement.closest('.input');
            if (tempElement.length === 1) {
                controlElement = tempElement;
            }
            else {
                tempElement = fieldElement.closest('.dropdown');
                if (tempElement.length === 1) {
                    controlElement = tempElement;
                }
            }
        }

        return controlElement;

    }

    Validator.defaultOptions = {
        validateOnBlur: false,
        scrollOffset: -100,
        groupSelector: '.group',
        errorAttribute: 'data-error-for',
        errorTemplate: '<i class="icon-times-circle">${error}</i>',
        showErrorAnimation: function (options) {

            var errorElement = options.errorElement;
            if (errorElement.css('display') !== 'none') {
                return;
            }
            // hurry: 父元素添加非static定位
            var errorParent = errorElement.parent();
            var parentPosition = errorParent.css('position');
            if (parentPosition === 'static') {
                errorParent.css('position', 'relative');
            }
            errorElement.css({
                position: 'fixed',
                display: 'inline-block',
                width: 'auto'
            });

            var width = errorElement.outerWidth();
            var height = errorElement.outerHeight();

            var fieldElement = options.fieldElement;
            if (fieldElement.is(':hidden')) {
                fieldElement = fieldElement.closest(':visible');
            }

            var controlElement = getControlElement(fieldElement);
            if (controlElement) {
                controlElement.addClass('error');
            }

            var fieldWidth = fieldElement.outerWidth();
            var fieldHeight = fieldElement.outerHeight();

            var left = fieldWidth + 2;
            left += fieldElement.offset().left - errorParent.offset().left;
            // if (!$.contains(fieldElement[0], errorElement[0])) {
            //     left += fieldElement.position().left;
            // }
            // errorElement.css({
            //     position: 'absolute',
            //     left: left,
            //     top: fieldHeight > height ? 5 : ((fieldHeight - height) / 2),
            //     width: width + 1
            // });
            
            var style = {
                position: 'absolute',
                left: left,
                top: fieldHeight > height ? 5 : ((fieldHeight - height) / 2)
                // top: 2 - fieldHeight
                // width: errorWidth
            };
            var errorWidth = width + 1;
            var errorLeft = fieldElement.offset().left + fieldWidth + 8;
            if (errorLeft + errorWidth > screen.availWidth) {
                errorWidth -= (errorLeft + errorWidth - screen.availWidth + 10);
            }
            style.width = errorWidth;
            errorElement.css(style);
        },
        hideErrorAnimation: function (options) {
            var errorElement = options.errorElement;
            errorElement.hide();

            var controlElement = getControlElement(options.fieldElement);
            if (controlElement) {
                controlElement.removeClass('error');
            }

        },
        render: function (data, tpl) {

            var render = tplRender[ tpl ];
            if (!render) {
                render = tplRender[ tpl ] = etpl.compile(tpl);
            }

            return render(data);
        }
    };

    return Validator;

});