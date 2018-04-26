(function ($) {
    'use strict';
    $.fn.daterangepicker = function (options) {
        var pluginName = 'DateRangePicker';

        // Find the plugin attached to the element
        var instance = this.data(pluginName);

        // If the instance wasn't found, create it...
        if (!instance) {
            // Return the element being bound to
            return this.each(function () {
                return $(this).data(pluginName, new DateRangePicker(this, options));
            });
        }

        // ...otherwise if the user passes true to the plugin (on the second call),
        // then return the instance of the plugin itself
        return (options === true) ? instance : this;
    };

    var DEFAULT_OPTS = {
        // The date that will be treated as 'today'.
        today: new Date(),
        selectableDateRange: null,
        selectedRange: null,
        showAlways: false,
        hideOnClick: true,
        // 默认选中
        isDefaultSelected: true,
        // 是否默认append到body后，默认false
        isAppendBody: false,
        // The z-index for the calendar control.
        zIndex: 1000,
        template: [
            '<div class="daterangepicker">',
            '<div class="daterangepicker-banner">',
            '<a data-action="setDate" data-range="yesterday" href="javascript:void(0);">昨天</a>',
            '<a data-action="setDate" data-range="last7" href="javascript:void(0);">最近7天</a>',
            '<a data-action="setDate" data-range="lastweek" href="javascript:void(0);">上周</a>',
            '<a data-action="setDate" data-range="thismonth" href="javascript:void(0);">本月</a>',
            '<a data-action="setDate" data-range="lastmonth" href="javascript:void(0);">上个月</a>',
            '</div>',
            '<div class="daterangepicker-content">',
            '<div class="daterangepicker-start">',
            '<span></span>',
            '<input data-type="startTime" type="text">',
            '</div>',
            '<div class="daterangepicker-end">',
            '<span></span>',
            '<input data-type="endTime" type="text">',
            '</div>',
            '</div>',
            '<div class="daterangepicker-action">',
            '<input data-action="setDate" class="btn btn-blue btn-primary" type="button" value="确定">',
            '<input data-aciton="reset" class="btn btn-default" type="button" value="取消">',
            '<span class="error red"></span>',
            '</div>',
            '</div>'
        ].join('')
    };

    function getDateString(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        return year + '-' + month + '-' + day;
    }

    function translateDate(date, format) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        format = format || 'yyyy年mm月dd日';
        format = format.replace('yyyy', date.getFullYear());
        format = format.replace('mm', month);
        format = format.replace('dd', day);
        return format;
    }

    function getDateRange(range) {
        var result = {};
        var me = this;
        switch (range) {
            case 'today':
                result.start = this.options.today;
                result.end = this.options.today;
                break;
            case 'yesterday':
                result.start = this.options.today - 3600 * 1000 * 24;
                result.end = this.options.today - 3600 * 1000 * 24;
                break;
            case 'last7':
                result.start = this.options.today - 3600 * 1000 * 24 * 6;
                result.end = this.options.today;
                break;
            case 'lastweek':
                var day = this.options.today.getDay();
                result.start = this.options.today - 3600 * 1000 * 24 * (6 + day);
                result.end = this.options.today - 3600 * 1000 * 24 * day;
                break;
            case 'thismonth':
                result.start = (new Date(this.options.today)).setDate(1);
                result.end = this.options.today > this.options.selectableDateRange.to
                    ? this.options.selectableDateRange.to
                    : this.options.today;
                break;
            case 'lastmonth':
                var monthStart = new Date(this.options.today);
                monthStart.setDate(1);
                monthStart.setMonth(monthStart.getMonth() - 1);
                result.start = new Date(monthStart);

                var monthEnd = new Date(this.options.today);
                monthEnd.setDate(1);
                monthEnd = monthEnd - 3600 * 24 * 1000;
                result.end = new Date(monthEnd);
                // render
                me.reset();
                break;
        }

        result.start = new Date(result.start);
        result.end = new Date(result.end);
        return result;
    }

    function DateRangePicker(element, options) {
        var isToggle = true;
        var me = this;
        me.el = $(element);
        var options = me.options = $.extend(true, {}, DEFAULT_OPTS, options);

        if (!$.fn.datetimepicker) {
            throw new Error('daterangepicker needs datetimepicker plugin!');
        }
        var today = options.today;
        options.start = today;
        options.end = today;

        var selectableDateRange = options.selectableDateRange;

        if (selectableDateRange && selectableDateRange.to < today) {
            options.start = selectableDateRange.to;
            options.end = selectableDateRange.to;
        }

        if (selectableDateRange && selectableDateRange.from > today) {
            options.start = selectableDateRange.from;
            options.end = selectableDateRange.from;
        }

        if (options.selectedRange && options.selectedRange.from) {
            options.start = selectableDateRange.from > options.selectedRange.from
                ? options.start
                : options.selectedRange.from;
        }

        if (options.selectedRange && options.selectedRange.to) {
            options.end = selectableDateRange.to < options.selectedRange.to
                ? options.end
                : options.selectedRange.to;
        }

        // hurry 扩展zIndex，系统默认1000，但是$modal是1050，所以需要用户指定
        me.daterangepicker = $(options.template).css({ zIndex: options.zIndex });
        // hurry 放到body中，而不是放到el后，不然位置有问题
        options.isAppendBody
            ? $(document.body).after(me.daterangepicker)
            : me.el.after(me.daterangepicker);
        me.daterangepicker
            .find('[data-type="startTime"]')
            .datetimepicker({
                showAlways: true,
                hideOnClick: false,
                // isAppendBody: options.isAppendBody,
                selectedDate: options.start,
                selectableDateRange: options.selectableDateRange
            }).on('changeDate', function (e) {
                $(this).siblings('span').html('开始日期：' + translateDate(e.date));
            }).siblings('span').html('开始日期：' + translateDate(options.start));

        me.daterangepicker
            .find('[data-type="endTime"]')
            .datetimepicker({
                showAlways: true,
                hideOnClick: false,
                // isAppendBody: options.isAppendBody,
                selectedDate: options.end,
                selectableDateRange: options.selectableDateRange
            }).on('changeDate', function (e) {
                $(this).siblings('span').html('结束日期：' + translateDate(e.date));
            }).siblings('span').html('结束日期：' + translateDate(options.end));

        // old
        // me.el.after(me.daterangepicker);

        me.daterangepicker.on('click', 'input[data-aciton="reset"]', function () {
            me.reset();
            me.hide();
        });

        me.daterangepicker.on('click', '[data-action="setDate"]', function () {
            var range = $(this).data('range');
            me.transRange(range);
            var errorEle = me.daterangepicker.find('.error');
            if (me.options.maxDuration && me.maxThanMaxDuration()) {
                errorEle.html('日期跨度超过' + me.options.maxDuration + '天，请重新选择');
                return;
            }
            errorEle.html('');
            me.selectRange($(this).data('range'));
            me.hide();
        });
        me.el.on('click', function (e) {
            if (isToggle) {
                me.show(e);
            }
            else {
                me.hide(e);
            }
            isToggle = !isToggle;
        });

        $(document).on('mouseup', function (e) {
            var target = e.target;
            var daterangepicker = me.daterangepicker;

            if (
                !me.el.is(target)
                && !daterangepicker.is(target)
                && daterangepicker.has(target).length === 0
                && daterangepicker.is(':visible')
                ) {
                me.hide();
            }
        });

        if (me.options.showAlways) {
            me.show();
        }

        $(window).resize(function () {
            me.resize();
        });

        $(window).on('scroll.datetimepicker', function () {
            me.resize();
        });

        me.options.isDefaultSelected && me.selectRange();
    }

    DateRangePicker.prototype.resize = function () {
        var el = this.el;
        var daterangepicker = this.daterangepicker;
        var options = this.options;
        var elPos = el.offset();
        // hurry 边界考虑
        // 右边界
        var left = elPos.left;
        // 1为顶部的边宽度
        var top = (elPos.top + el.outerHeight() - $(window).scrollTop() + 1);
        var cssOpts = {};
        var screenWidth = screen.availWidth;
        var screenHeight = screen.availHeight;
        var daterangepickerWidth = daterangepicker.outerWidth();
        var daterangepickerHeight = daterangepicker.outerHeight();
        // 右边界
        if (daterangepickerWidth + left + 5 > screenWidth) {
            cssOpts.right = '5px';
        }
        else {
            cssOpts.left = left;
        }
        // 下边界
        if (top + daterangepickerHeight > screenHeight) {
            top = (elPos.top - daterangepickerHeight - $(window).scrollTop() - 1);
        }
        cssOpts.top = top;
        daterangepicker.css(cssOpts);
    };

    DateRangePicker.prototype.show = function () {
        this.daterangepicker.show();
        this.daterangepicker.resize();
    };

    DateRangePicker.prototype.hide = function () {
        if (!this.options.showAlways && this.options.hideOnClick) {
            this.daterangepicker.hide();
        }
    };

    DateRangePicker.prototype.transRange = function (range) {
        var me = this;
        if (!range) {
            me.options.start = new Date(
                me.daterangepicker
                    .find('[data-type="startTime"]')
                    .val()
            );
            me.options.end = new Date(
                me.daterangepicker
                    .find('[data-type="endTime"]')
                    .val()
            );
        } else {
            range = getDateRange.call(this, range);
            me.options.start = range.start;
            me.options.end = range.end;
        }
    };

    DateRangePicker.prototype.maxThanMaxDuration = function () {
        var me = this;
        var option = me.options;
        var duration = Math.abs((option.start-option.end)/(1000*60*60*24));
        if (duration > me.options.maxDuration) {
            return true;
        } else {
            return false;
        }
    };

    DateRangePicker.prototype.selectRange = function (range) {
        var me = this;
        me.transRange(range);
        if (me.options.start > me.options.end) {
            me.options.start = [me.options.start, me.options.end];
            me.options.end = me.options.start[0];
            me.options.start = me.options.start[1];
            me.daterangepicker
                .find('[data-type="startTime"]')
                .datetimepicker({
                    selectedDate: me.options.start
                });

            me.daterangepicker
                .find('[data-type="endTime"]')
                .datetimepicker({
                    selectedDate: me.options.end
                });
        }

        me.el.val(
                translateDate(
                    me.options.start, 'yyyy.mm.dd')
                + ' - '
                + translateDate(me.options.end, 'yyyy.mm.dd'
            )
        );
        var e = $.Event("change");
        me.el.trigger(e);

        me.daterangepicker
            .find('[data-type="startTime"]')
            .datetimepicker({
                selectedDate: me.options.start
            });

        me.daterangepicker
            .find('[data-type="endTime"]')
            .datetimepicker({
                selectedDate: me.options.end
            });

        me.el.trigger({
            type: 'changeDate',
            date: me.el.val()
        });
        me.options.onDateSelect && me.options.onDateSelect(me.el.val());
    };

    DateRangePicker.prototype.reset = function () {
        this.daterangepicker.find('[data-type="startTime"]').datetimepicker({
            selectedDate: this.options.start
        });

        this.daterangepicker.find('[data-type="endTime"]').datetimepicker({
            selectedDate: this.options.end
        });
    };

})(jQuery);