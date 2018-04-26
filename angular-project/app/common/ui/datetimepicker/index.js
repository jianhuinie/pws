/**
 * datetimepicler
 *
 * @file
 * @author hanrui(hanrui@baijiahulian.com)
 *
 * 关于time的部分后续补充，代码优化后续也需要搞一下
 */
(function () {
    $.fn.datetimepicker = function (options) {
        var pluginName = 'DateTimePicker';

        // Find the plugin attached to the element
        var instance = this.data(pluginName);

        // If the instance wasn't found, create it...
        if (!instance) {
            // Return the element being bound to
            return this.each(function () {
                return $(this).data(pluginName, new DateTimePicker(this, options));
            });
        }
        if (options.selectedDate) {
            instance.setDate(options.selectedDate);
        }

        // ...otherwise if the user passes true to the plugin (on the second call),
        // then return the instance of the plugin itself
        return (options === true) ? instance : this;
    };

    // Default options
    $.fn.datetimepicker.defaults = {

        mode: 'day', // 选择模式 day|week
        // 是否默认append到body后，默认false
        isAppendBody: false,
        // Style to use for the calendar.  This name must match the name used in
        // the stylesheet, using the class naming convention "calendar-cssName".
        // 给后续换皮肤用的
        cssName: '',

        // The z-index for the calendar control.
        zIndex: 1000,

        // Set to true if you want the calendar to be visible at all times.
        // NOTE: If your target element is hidden, the calendar will be hidden as well.
        showAlways: false,

        // Hide the calendar when a date is selected (only if showAlways is set to false).
        hideOnClick: true,


        // The date that will be treated as 'today'.
        todayDate: new Date(),

        // 默认选中
        isDefaultSelected: true,

        // The date that will appear selected when the calendar renders.
        // By default it will be set to todayDate.
        selectedDate: null,

        // A collection of dates that can be selectable by the user.
        // The dates can be a one-time selection or made repeatable by setting
        // the repeatYear or repeatMonth flag to true.
        // By default repeatYear and repeatMonth are false.
        //
        // This example creates 4-individual dates that can be selected;
        // The first date will repeat every year, the second date will repeat every
        // month and year, the third date will repeat every month and the fourth date
        // will only be selectable one-time and not repeat:
        //
        //    selectableDates: [
        //        { date: new Date(0, 8, 5), repeatYear: true },
        //        { date: new Date(0, 0, 14), repeatMonth: true, repeatYear: true },
        //        { date: new Date(2013, 0, 24), repeatMonth: true },
        //        { date: new Date(2013, 11, 25) },
        //    ]
        selectableDates: null,

        // A collection of date ranges that are selectable by the user.
        // The ranges can be made to repeat by setting repeatYear to true
        // (repeatMonth is not supported).
        //
        // This example will create 3-sets of selectable date ranges with
        // specific from and to ranges.  The 4th and 5th ranges don't specify
        // the "to" date in which case the "to" date will be the maximum days for
        // the month specified in "from".  The 4th and 5th ranges also repeat every year:
        //
        //     selectableDateRange: 
        //         { from: new Date(2013, 1, 1), to: newDate (2013, 2, 1) }
        selectableDateRange: null,

        // Mark certain dates as special dates.  Similar to selectableDates, this
        // property supports both repeatYear and repeatMonth flags.
        // Each special date can be styled using custom style names and can have
        // data attached to it that will be returned in the onClick callback.
        // The data field can be any custom (JSON style) object.
        //
        // This example creates two (repeatable by year) dates with special data in them.
        // The first date also assigns a special class (which you will have to define).
        //    specialDates: [
        //        {
        //            date: new Date(0, 8, 5),
        //            data: { message: 'Happy Birthday!' },
        //            repeatYear: true,
        //            cssClass: 'special-bday'
        //        },
        //        {
        //            date: new Date(2013, 0, 8),
        //            data: { message: 'Meeting every day 8 of the month' },
        //            repeatMonth: true
        //        }
        //    ]
        specialDates: null,

        // List of months that can be selectable, including when the user clicks
        // on the title to select from the dropdown.
        // This example only makes two months visible; September and December:
        //    selectableMonths: [8, 11]
        selectableMonths: null,

        // List of selectable years.  If not provided, will default to 5-years
        // back and forward.
        // This example only allows selection of dates that have year 2012, 2013, 2015
        //    selectableYears: [2012, 2013, 2015]
        selectableYears: null,

        // List of selectable days of the week.  0 is Monday, 1 is Tuesday, and so on.
        // This example allows only Sunday, Tuesday, Thursday:
        //    selectableDOW: [0, 2, 4]
        selectableDOW: null,

        // Names of the month that will be shown in the title.
        // Will default to long-form names:
        //     January, February, March, April, May, June, July,
        //     August, September, October, November, December
        monthNames: null,

        // Names of the days of the Week that will be shown below the title.
        // Will default to short-form names:
        //     Sun, Mon, Tue, Wed, Thu, Fri, Sat
        dowNames: null,

        // The day of the week to start the calendar on.  0 is Sunday, 1 is Monday and so on.
        dowOffset: 1,

        // Callback that will trigger when the calendar needs to show.
        // You can use this callback to animate the opening of the calendar.
        onShow: function (calendar) {

        },

        // Callback that will trigger when the calendar needs to hide.
        // You can use this callback to animate the hiding of the calendar.
        onHide: function (calendar) {
            calendar.hide();
        },

        // First date of the month.
        firstDate: null
    };


    var getSelectableMonths = function (selectYear, to, from, options) {
        var selectableMonths = [];
        if (to && from && to.getFullYear() === from.getFullYear()) {
            selectableMonths = getSelectableList(
                from.getMonth(),
                to.getMonth(),
                options.selectableMonths
            );
        } else if (to && (+selectYear || options.selectedDate.getFullYear()) === to.getFullYear()) {
            selectableMonths = getSelectableList(
                0,
                to.getMonth(),
                options.selectableMonths
            );
        } else if (from && (+selectYear || options.selectedDate.getFullYear()) === from.getFullYear()) {
            selectableMonths = getSelectableList(
                from.getMonth(),
                11,
                options.selectableMonths
            );
        } else {
            selectableMonths = getSelectableList(
                0,
                11,
                options.selectableMonths
            );
        }
        return selectableMonths;
    }
    // Helper function to build selectable list
    var getSelectableList = function (min, max, userList) {
        // Build a default list using min/max
        var resultList = [];
        for (var i = min; i <= max; i++) {
            resultList.push(i);
        }

        // If user provided a collection, sanitize list by ensuring it's within range and unique
        if (userList) {
            var newList = [];
            $.each(userList, function (i, v) {
                if (v >= min && v <= max && $.inArray(v, newList) < 0) {
                    newList.push(v);
                }
            });

            resultList = newList.length ? newList : resultList;
        }
        ;

        // Sort the values before returning it
        resultList.sort();

        return resultList;
    };


    // Main entry point.  Initialize the plugin
    function DateTimePicker(element, userOptions) {
        var isToggle = true;
        // Grab handle to this
        var self = this;

        // Save bound element to el
        self.el = $(element);
        // self.el = $(document.body);
        var el = self.el;

        // Merge user options into default options
        self.options = $.extend(true, {}, $.fn.datetimepicker.defaults, userOptions);
        var options = self.options;

        if (!(el.attr('calendar-id') || '').length) {
            el.attr('calendar-id', 'calendar-' + Math.round(Math.random() * 1e10))
        }

        // Find the calendar element if the user provided one
        self.calendar = $($.find('[calendar-el=' + el.attr('calendar-id') + ' ]'));

        // If calendar doesn't exist, create it and re-assign it to self
        if (!self.calendar.length) {
            self.calendar = $('<div/>')
                .attr('calendar-el', el.attr('calendar-id'))
                .data('is', true)
                .css({
                    zIndex: options.zIndex
                })
                .html([
                    '<div class="calendar-banner"/>',
                    '<div class="calendar-weeks"/>',
                    '<div class="calendar-days"/>'
                ].join(''));
            // hurry 放到body中，而不是放到el后，不然位置有问题
            options.isAppendBody
                ? $(document.body).after(self.calendar)
                : $(self.el).after(self.calendar);
        }

        // Default first date to selected
        options.selectedDate = options.selectedDate || options.todayDate;
        options.firstDate = (new Date((options.firstDate || options.selectedDate)))._first();

        // Show the plugin on focus
        el
            .addClass('calendar-el')
            .on('click', function (e) {
                if (isToggle) {
                    self.show(e);
                }
                else {
                    self.hide(e);
                }
                isToggle = !isToggle;
            });

        // Hide the plugin on mouse up outside of the plugin
        $(document).bind('mouseup', function (e) {
            var target = e.target;
            var calendar = self.calendar;

            if (!el.is(target) && !calendar.is(target) && calendar.has(target).length === 0 && calendar.is(':visible')) {
                self.hide();
            }
        });

        // hurry: 允许默认日期为空
        if (options.selectedDate && options.isDefaultSelected) {
            // self.render();
            self.setDate(options.selectedDate);
        }
        else {
            self.render();
        }

        $(window).resize(function () {
            self.resize();
        });

        $(window).on('scroll.datetimepicker', function () {
            self.resize();
        });

        // If the user is defining the container and it exists, hide it on initial creation.
        // The update function will handle showing if it's showAlways = true
        if (self.calendar.length && options.showAlways) {
            self.show();
        }
        // self.el = $(element);
    };

    // Public methods
    DateTimePicker.prototype.resize = function () {
        var el = this.el;
        var calendar = this.calendar;
        var options = this.options;
        var elPos = el.offset();

        // calendar.css({
        //     // 1为顶部的边宽度
        //     top: (elPos.top + el.outerHeight() - $(window).scrollTop() + 1) + 'px',
        //     left: (elPos.left) + 'px'
        // });

        // hurry 边界考虑
        // 右边界
        var left = elPos.left;
        // 1为顶部的边宽度
        var top = (elPos.top + el.outerHeight() - $(window).scrollTop() + 1);
        var cssOpts = {};
        var screenWidth = screen.availWidth;
        var screenHeight = screen.availHeight;
        var calendarWidth = calendar.outerWidth();
        var calendarHeight = calendar.outerHeight();
        // 右边界
        if (calendarWidth + left > screenWidth) {
            cssOpts.right = '5px';
        }
        else {
            cssOpts.left = left;
        }
        // 下边界
        if (top + calendarHeight > screenHeight) {
            top = (elPos.top - calendarHeight - $(window).scrollTop() - 1);
        }
        cssOpts.top = top;
        calendar.css(cssOpts);
    };

    DateTimePicker.prototype.show = function () {
        this.resize();
        // Show this calendar
        this.calendar.show();
    };

    DateTimePicker.prototype.hide = function () {
        if (this.options && !this.options.showAlways) {
            this.calendar.hide();
        }
    };

    DateTimePicker.prototype.renderBanner = function () {
        var self = this;
        var el = self.el;
        var options = self.options;
        var calendar = self.calendar;

    };

    DateTimePicker.prototype.renderWeeks = function () {

    };

    DateTimePicker.prototype.renderDays = function () {

    };

    DateTimePicker.prototype.setDate = function (date) {
        function getFormatDate(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            return year + '-' + month + '-' + day;
        }

        this.options.selectedDate = date;

        var res = getFormatDate(date);

        if (this.options.mode == 'week') {
            var weekDay = date.getDay();
            if (weekDay == 0 ) {
                weekDay = 7;
            }
            var dayTime = 24 * 60 * 60 * 1000;
            var monday = date.getTime() - (weekDay- 1) * dayTime;
            var sunday = date.getTime() + (7 - weekDay) * dayTime;
            if (sunday > (new Date().getTime())) {
                sunday = new Date().getTime();
            }
            res = getFormatDate(new Date(monday)) + '至' +  getFormatDate(new Date(sunday));
        }

        this.el.val(res);
        this.el.trigger({
            type: 'changeDate',
            date: date
        });
        var monthVal = date.getMonth();
        var yearVal = date.getFullYear();

        var selectMonth = this.calendar.find('select').eq(1);
        var selectYear = this.calendar.find('select').eq(0);

        this.options.firstDate = new Date(date.getFullYear(), date.getMonth(), 1);

        this.render();
    }

    // Render the calendar
    DateTimePicker.prototype.render = function (renderCalback) {

        var self = this;
        var el = self.el;
        var options = self.options;
        var calendar = self.calendar;

        // Build a core class (with border) that every element would have
        var coreClass = ' core ';
        var cssName = 'calendar';
        cssName += options.cssName ? ' calendar-' + options.cssName : '';

        // Get today
        var todayVal = options.todayDate._val();
        var todayTime = todayVal.time;

        // Constants
        var maxRow = 6;
        var maxCol = 7;


        // Selectable (constants)
        // hanrui 修改，跨年切换，当前2016-01切换上一个月
        var selectYear = (options.firstDate && options.firstDate.getFullYear()) || calendar.find('select').eq(0).val();
        var from = options.selectableDateRange && options.selectableDateRange.from;
        var to = options.selectableDateRange && options.selectableDateRange.to;
        var selectableYears = getSelectableList(
                (from && from.getFullYear()) || todayVal.year - 5,
                (to && to.getFullYear()) || todayVal.year + 5,
            options.selectableYears
        );
        var selectableMonths = getSelectableMonths(selectYear, to, from, options);

        var selectableDOW = getSelectableList(0, 6, options.selectableDOW);
        var dowNames = options.dowNames || ['日', '一', '二', '三', '四', '五', '六'];
        var monthNames = options.monthNames || ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

        // Helper function to setDate
        var setFirstDate = function (_date) {
            if (_date) {
                // Get first date
                options.firstDate = _date;

                // Update the calendar
                self.render();
            }
        };

        var getFirstDate = function (_offset) {
            // Create start date as the first date of the month
            var _date = new Date(options.firstDate);
            if (to && _date > to) {
                _date = new Date(to)._first();
            } else if (from && _date < from) {
                _date = new Date(from)._first();
            }

            // Default to no offset
            _offset = _offset || 0;

            // Find out which months are selectable
            while (true) {
                _date.setMonth(_date.getMonth() + _offset);
                _date.setDate(Math.min(1, _date._max()));

                // If not an offset, break out of the loop
                if (_offset == 0) {
                    break;
                }

                // Get _date's value
                var dateVal = _date._val();

                // Get local vars
                var dateMonth = dateVal.month;
                var dateYear = dateVal.year;

                // hanrui 修改，跨年切换，当前2016-01切换上一个月
                var currentSelectableMonths = selectableMonths;
                if ((_offset === -1 && dateMonth === 11) || (_offset === 1 && dateMonth === 0)) {
                    currentSelectableMonths = getSelectableMonths(dateYear, to, from, options);
                }
                
                // Find the month first
                if ($.inArray(dateMonth, currentSelectableMonths) != -1) {
                    // If year is in our collection, break...
                    if ($.inArray(dateYear, selectableYears) != -1) {
                        break;
                    } else {
                        // ...otherwise, if it's out of bounds, exit loop
                        if (dateYear < selectableYears[0] || dateYear > selectableYears[selectableYears.length - 1]) {
                            return null;
                        }
                    }
                }
            }

            return _date;
        };

        // Get the previous, next first dates
        var prevFirstDate = getFirstDate(-1);
        var nextFirstDate = getFirstDate(1);

        // Get the first date for the current month being rendered
        var firstDate = (options.firstDate = getFirstDate());
        var firstDateVal = firstDate._val();
        var firstDateMonth = firstDateVal.month;
        var firstDateYear = firstDateVal.year;

        // Get the start date in the calendar
        var startDate = new Date(firstDate);

        // Sanitize days of the week offset
        var dowOffset = Math.abs(Math.min(6, Math.max(0, options.dowOffset)));

        // Offset weekdays
        var startOffset = startDate.getDay() - dowOffset;
        startOffset = startOffset < 1 ? -7 - startOffset : -startOffset;
        dowNames = (dowNames.concat(dowNames))
            .slice(dowOffset, dowOffset + 7);

        // Offset the start date
        startDate._add(startOffset);

        // Gather flags for prev/next arrows
        var showPrev = (prevFirstDate);
        var showNext = (nextFirstDate);


        var prevCell = $('<a/>')
            .addClass('prev-arrow btn btn-' + (showPrev ? 'default' : 'disabled'))
            .click(function (e) {
                if (showPrev) {
                    e.stopPropagation();
                    setFirstDate(prevFirstDate);
                    // self.render();
                }
            });

        var titleCell = $('<span/>');

        var nextCell = $('<a/>')
            .addClass('next-arrow btn btn-' + (showNext ? 'default' : 'disabled'))
            .click(function (e) {
                if (showNext) {
                    e.stopPropagation();
                    setFirstDate(nextFirstDate);
                }
            });

        // Add cells for prev/title/next
        var title = $('<div class="calendar-banner"></div>');
        var weeks = $('<div class=calendar-weeks></div>');
        var days = $('<div class=calendar-days></div>');

        title
            .append(prevCell)
            .append(titleCell)
            .append(nextCell);

        // Add all the cells to the calendar
        for (var row = 0, cellIndex = 0; row < maxRow + 1; row++) {
            for (var col = 0; col < maxCol; col++, cellIndex++) {
                var cellDate = new Date(startDate);
                var cellClass = 'day';
                var cellZIndex = options.zIndex + (cellIndex);
                var cell = $('<div/>')

                if (!row) {
                    cellClass = 'week';
                    cell.html(dowNames[col]);
                    cellDate = null;
                    weeks.append(cell);
                } else {
                    // Get the new date for this cell
                    cellDate._add(col + ((row - 1) * maxCol));
                    // Get value for this date
                    var cellDateVal = cellDate._val();
                    var cellDateTime = cellDateVal.time;

                    // Variable to hold special data
                    var specialData = null;

                    // Determine if this date is selectable
                    var isSelectable = true;

                    // Helper function to get repeat friendly date against current date
                    var getRepeatDate = function (v, date) {
                        // If repeating, set the date's year and month accordingly
                        if (v.repeatYear === true) {
                            date.setYear(cellDateVal.year);
                        }
                        if (v.repeatMonth === true) {
                            date.setMonth(cellDateVal.month);
                        }

                        return date._val();
                    };
                    // Assign date for the cell
                    cell.html(cellDateVal.date);
                    cell.attr('row', row);
                    // If we have selectable date ranges
                    if (options.selectableDateRange) {
                        isSelectable = false;
                        $.each([options.selectableDateRange], function (i, v) {
                            var dateFrom = v.from;
                            var dateTo = v.to;

                            dateFrom = dateFrom || new Date(todayVal.year - 5, 0, 1);

                            dateTo = dateTo || new Date(todayVal.year + 5, 11, 31);

                            // If repeating year, set the from and two to the current date's year
                            dateFrom = getRepeatDate(v, dateFrom);
                            dateTo = getRepeatDate(v, dateTo);

                            // Test to see if this date is selectable
                            if (cellDateTime >= dateFrom.time && cellDateTime <= dateTo.time) {
                                isSelectable = true;
                                return true;
                            }
                        });
                    }

                    // Handle date ranges and collections
                    if (options.selectableDates) {
                        if ((options.selectableDateRange && !isSelectable) || (isSelectable && !options.selectableDateRange)) {
                            isSelectable = false;
                        }
                        $.each(options.selectableDates, function (i, v) {
                            var vDate = getRepeatDate(v, v.date);

                            if (vDate.time == cellDateTime) {
                                return (isSelectable = true);
                            }
                        });
                    }

                    // If not active or if not within selectableMonths, set to noday otherwise evaluate accordingly
                    // if (!isSelectable ||
                    //     $.inArray(cellDateVal.year, selectableYears) < 0 ||
                    //     $.inArray(cellDateVal.month, selectableMonths) < 0 ||
                    //     $.inArray(cellDateVal.day, selectableDOW) < 0) {
                    //     continue;
                    // }
                    if (firstDateMonth != cellDateVal.month) {
                        cellClass += ' outday';
                    }
                    if (!isSelectable) {
                        cellClass += ' disabled';
                    }
                    if (todayTime == cellDateTime) {
                        cellClass += ' today';
                        cellZIndex += 50;
                    }
                    if (options.selectedDate._time() == cellDateTime) {
                        cellClass += ' selected';
                        cellZIndex += 51;
                    }

                    // Handle special dates
                    if (options.specialDates) {
                        $.each(options.specialDates, function (i, v) {
                            var vDate = getRepeatDate(v, v.date);

                            if (vDate.time == cellDateTime) {
                                cellClass = (v.cssClass || 'special');
                                cellZIndex += 52;
                                specialData = v.data;
                            }
                        });
                    }
                    if (isSelectable) {
                        if (self.options.mode == 'week') {
                            cell.hover(function (e) {
                                var row = $(e.target).attr('row');
                                calendar.find('[row=' + row + ']').css({
                                    background: '#eee'
                                })
                            });
                            cell.mouseleave(function (e) {
                                var row = $(e.target).attr('row');
                                calendar.find('[row=' + row + ']').css({
                                    background: '#fff'
                                })
                            });
                        }
                        cell.click(function (e) {
                            e.stopPropagation();

                            // Get the data from this cell
                            var clickedData = $(this).data('data');

                            // Save date to selected and first
                            options.selectedDate = options.firstDate = clickedData.date;

                            // Update calendar (and auto-hide if necessary)
                            self.render(function () {
                                if (!options.showAlways && options.hideOnClick) {
                                    self.hide();
                                }
                            });

                            self.setDate(clickedData.date);
                            self.options.onDateSelect && self.options.onDateSelect(clickedData.date);
                        });
                    }
                    days.append(cell);
                }

                // Assign other properties to the cell
                cell
                    .data('data', {
                        date: cellDate,
                        data: specialData
                    })
                    .addClass(coreClass + cellClass);

                // Add cell to calendar

            }
        }

        var child = $('<div/>')
            .append(title);
        child.append(weeks).append(days);
        // Add core classes and remove calendar's children
        calendar
            .removeClass()
            .addClass(cssName)
            .html(child);

        // Render the month / year title

        // Helper function when select is updated
        var onYearMonthSelect = function (e) {
            var targetName = e.target.name;
            var year = yearSelect.val();
            var month = monthSelect.val();
            options.firstDate = new Date(year, month, 1);
            self.render();
                return;
        };

        // Build month selector
        var monthSelect = $('<select name="monthSelect"/>')
            .change(onYearMonthSelect);

        // Build year selector
        var yearSelect = $('<select name="yearSelect"/>')
            .change(onYearMonthSelect);

        // Populate month select
        $.each(monthNames, function (i, v) {
            if ($.inArray(i, selectableMonths) != -1) {
                var o = $('<option/>').html(v).attr('value', i);
                if (i == firstDateMonth) {
                    o.attr('selected', 'selected');
                }
                monthSelect.append(o);
            }
        });

        // Populate year select
        $.each(selectableYears, function (i, v) {
            var o = $('<option/>').html(v).attr('value', v);
            if (v == firstDateYear) {
                o.attr('selected', 'selected');
            }
            yearSelect.append(o);
        });

        var titleYearMonth = $('<span/>')
            .addClass('calendar-year-month')
            .append(yearSelect)
        titleYearMonth.append(monthSelect);

        // Add to title
        titleCell.html(titleYearMonth);

        // Run the callback signaling end of the render
        renderCalback = renderCalback || (function () {
        });
        renderCalback();
    };

    // One time initialization of useful prototypes
    (function () {
        Date.prototype._clear = function () {
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
            this.setMilliseconds(0);

            return this;
        };

        Date.prototype._time = function () {
            return this._clear().getTime();
        };

        Date.prototype._max = function () {
            var isLeapYear = (new Date(this.getYear(), 1, 29).getMonth() == 1) ? 1 : 0;
            var days = [31, 28 + isLeapYear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            return days[this.getMonth()];
        };

        Date.prototype._add = function (days) {
            this.setDate(this.getDate() + days);
        };

        Date.prototype._first = function () {
            var date = new Date(this);
            date.setDate(1);

            return date;
        };

        Date.prototype._val = function () {
            this._clear();

            return {
                year: this.getFullYear(),
                month: this.getMonth(),
                date: this.getDate(),
                time: this.getTime(),
                day: this.getDay()
            };
        };
    })();
})();