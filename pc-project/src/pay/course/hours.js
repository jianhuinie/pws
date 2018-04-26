/**
 * @file 课程时长
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var container = $('.course-hours');
    var courseCombo = container.find('.course-combo');
    var courseCustom = container.find('.course-custom');
    var courseHours = container.find('[name="hours"]');

    var store = require('common/store');
    var activeClass = 'active';

    function selectComboItem(target) {

        var courseCombo = container.find('.course-combo');

        courseCombo.find('.' + activeClass).removeClass(activeClass);
        target.addClass(activeClass);

        var json = target.data('json');

        store.set({
            comboId: json.id,
            hours: json.hours,
            discount: json.discount || 10
        });

    }

    function selectCombo() {

        var radio = courseCombo.find('.form-radio');
        radio.click();

        radio = courseCustom.find('.form-radio');
        radio.removeClass('checked');
        courseCombo.addClass(activeClass);
        courseCustom.removeClass(activeClass);

        courseHours.prop('disabled', true);
        courseCustom.find('.form-group').removeClass('has-error');

        var target = courseCombo.find('.' + activeClass);
        if (target.length === 0) {
            target = courseCombo.find('.combo-item:eq(0)');
        }
        selectComboItem(target);
    }

    function selectCustom() {

        var radio = courseCustom.find('.form-radio');
        radio.click();

        radio = courseCombo.find('.form-radio');
        radio.removeClass('checked');
        courseCombo.removeClass(activeClass);
        courseCustom.addClass(activeClass);

        courseHours.prop('disabled', false);
        courseHours.focus();

        store.set({
            comboId: null,
            hours: 0,
            discount: 10
        });

    }

    /**
     * 初始化
     *
     * @param {Object} options
     * @property {Function} options.onChange
     */
    exports.init = function (options) {

        if (container.length === 0) {
            return;
        }

        container

        .on('change', ':radio', function (e) {
            if ($(e.currentTarget).val() == 0) {
                selectCombo();
            }
            else {
                selectCustom();
            }
            options.onChange();
        })

        .on('click', '.combo-item', function (e) {

            selectCombo();

            if (courseCombo.hasClass(activeClass)) {
                selectComboItem($(this));
                options.onChange();
            }

        })

        .on('click', '.input-group', function (e) {
            selectCustom();
        });

        options.onChange();
    };

});