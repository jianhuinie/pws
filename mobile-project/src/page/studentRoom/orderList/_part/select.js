define(function (require, exports) {
    var $ = require('zepto');
    var observer = require('common/mvc/observer');
    var util = require('common/util');
    var container = $('#page_main');
    var maskContent = container.find('.content-mask');

    function Select () {
        this.sortContent = container.find('.sort-box');
        this.chooseContent = container.find('.choose-box');
        this.sortIndex = 0;
        this.time = 0;
        this.lessonWay = 0;
        this.compare = 0;
    }

    Select.prototype.chooseBox = function () {
        var there = this;
        var chooseContent = there.chooseContent;
        var sortContent = there.sortContent;
        // var mask = container.find('.content-mask');
        observer.addListener(there, 'sort', function () {
            if (sortContent.hasClass('hide')) {
                sortContent.removeClass('hide');
                chooseContent.addClass('hide');
                maskContent.removeClass('hide');
            } else {
                sortContent.addClass('hide');
                chooseContent.addClass('hide');
                maskContent.addClass('hide');
            }
        });
        observer.addListener(there, 'choose', function () {
            if (chooseContent.hasClass('hide')) {
                chooseContent.removeClass('hide');
                sortContent.addClass('hide');
                maskContent.removeClass('hide');
            } else {
                sortContent.addClass('hide');
                chooseContent.addClass('hide');
                maskContent.addClass('hide');
            }
        });

        container.on('click', '.selected-bar .title', function () {
            var that = $(this);
            maskContent.removeClass('hide');
            that.addClass('active')
                .removeClass('normal');
            observer.trigger(there, that.data('type'));
        });
    };

    Select.prototype.chooseSort = function () {
        var there = this;
        container.on('click', '.sort-box .item', function () {
            var that = $(this);
            var text = that.find('.text');
            text
                .toggleClass('active')
                .toggleClass('normal');

            that.find('.icon')
                .toggleClass('hide');

            that.siblings('.item')
                .find('.text')
                .removeClass('active')
                .addClass('normal');

            that.siblings('.item')
                .find('.icon')
                .addClass('hide');
            
            container.find('.selected-bar .sort .text').text(text.text());
            there.sortIndex = that.data('type');
            observer.trigger(there, 'choose-sort');
        });
    };

    Select.prototype.chooseChoose = function () {
        var there = this;

        observer.addListener(there, 'choose-reset', function () {
            container.find('.choose-box .item').each(function () {
                var that = $(this);
                that
                    .removeClass('active')
                    .addClass('normal');
            });

            there.time = 0;
            there.lessonWay = 0;
            there.compare = 0;

        });
        container.on('click', '.choose-box .item', function () {
            var that = $(this);
            var timeStatus = 0;
            // 时间
            if(that.data('status') === 'time') {
                timeStatus = +that.attr('data-index');
                timeStatus =  timeStatus ? 0 : 1;
                that.attr('data-index', timeStatus);
                there.time = timeStatus;
            }

            if (that.data('status') !== 'time') {
                if (that.hasClass('active')) {
                    there[that.data('status')] -= that.data('index');
                } else {
                    there[that.data('status')] += that.data('index');
                }
            }
            that.toggleClass('active')
                .toggleClass('normal');

        });

        container.on('click', '.choose-box .confirm', function () {
            observer.trigger(there, 'choose-confirm');
        });

        container.on('click', '.choose-box .clear', function () {
            observer.trigger(there, 'choose-reset');
        });

    };

    return Select;
});