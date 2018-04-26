/**
 * @file countDown
 * @author tangrongyan
 */



define(function(require, exports) {

    'use strict';

    var Popup = require('cobble/helper/Popup');

    var etpl = require('cobble/util/etpl');
    var store = require('common/store');

        // 倒计时
    /**
     * 用于计算的常量
     * @type {number}
     */
    var ONE_DAY = 24 * 60 * 60;
    var ONE_HOUR = 60 * 60;
    var ONE_MINUTE = 60;

    /**
     * 计时器模板
     * @type {string}
     */
    var timeClockRender = etpl.compile(
          '<div class="timer timer-${type}">'
        +    '<div class="timer-item timer-decade">'
        +       '<div class="timer-count" data-index="front">'
        +            '<span class="half-mask"></span>'
        +            '<span class="number">${decade}</span>'
        +       '</div>'
        +    '</div>'
        +    '<div class="timer-item timer-units">'
        +        '<div class="timer-count" data-index="front">'
        +            '<span class="half-mask"></span>'
        +            '<span class="number">${units}</span>'
        +        '</div>'
        +    '</div>'
        + '<div class="time-unit">'
        + '<!-- if: ${type} == "day" -->'
        +       '日'
        + '<!-- elif: ${type} == "hour" -->'
        +       '时'
        + '<!-- elif: ${type} == "minute" -->'
        +       '分'
        + '<!-- elif: ${type} == "second" -->'
        +       '秒'
        + '<!-- /if -->'
        + '</div>'
        + '</div>'

    );


    var backPlateRender = etpl.compile(
           '<div class="timer-count" data-index="back">'
        +       '<span class="half-mask"></span>'
        +       '<span class="number">${number}</span>'
        +   '</div>'
    );


    /**
     * 将时间拼撑模板所用格式
     * @return {Object]}
     */
    function getCurrentTime() {
        var serverTime = store.get('serverTime');
        // console.log(serverTime);

        var day = Math.floor(serverTime / ONE_DAY);
        var restDay = serverTime - day * ONE_DAY;

        var hour = Math.floor(restDay / ONE_HOUR);
        var restHour = restDay - hour * ONE_HOUR;

        var minute = Math.floor(restHour / ONE_MINUTE);
        var restMinute = restHour - minute * ONE_MINUTE;

        var second = Math.floor(restMinute);

        return {
            day: {
                time: day,
                type: 'day',
                decade: parseInt(day / 10),
                units: day % 10
            },
            hour: {
                time: hour,
                type: 'hour',
                decade: parseInt(hour / 10),
                units: hour % 10
            },
            minute: {
                time: minute,
                type: 'minute',
                decade: parseInt(minute / 10),
                units: minute % 10
            },
            second: {
                time: second,
                type: 'second',
                decade: parseInt(second / 10),
                units: second % 10
            },
        }
    };

    /**
     * 渲染一下TimeClock
     *
     */
    function renderTimeClock(element) {

        var timeData = getCurrentTime();

        var tpl = timeClockRender(timeData.day)
                + timeClockRender(timeData.hour)
                + timeClockRender(timeData.minute)
                + timeClockRender(timeData.second);

        element.html(tpl);
    }


    var timerClock = {

        // 本地维护一份上次时间的表
        // 用于比对时间并更新
        lastTimeData: null,
        /**
         * 初始化计时器
         * @param  {Object} options
         * @return {jQuery} options.element  计时器容器
         */
        init: function (options) {
            var me = this;
            // 之后访问，则显示0分0秒
            if (store.get('serverTime') <= 0) {
                return;
            }
            me.element = options.element;
            me.lastTimeData = getCurrentTime();

            me.timerInterval = setInterval(function (){
                me.updateTime();
            }, 1000);
        },




        /**
         * 更新时间
         * @param  {Object} options
         * @property {Object} options.type  用于判断更新部分(day, hour, minute)
         * @property {Object} options.data  更新所用数据
         */
        updateTime: function (date) {
            var me = this;
            me.modifyTime();
            var timeData = getCurrentTime();

            $.each(
                timeData,
                function (key, item) {
                    var lastTime = me.lastTimeData[key];
                    // 找出与之前缓存时间不同的
                    if (lastTime.time != item.time) {
                        lastTime.time = item.time;

                        if (lastTime.decade != item.decade) {
                            // 更新十位
                            me.rotatePlate(item, 'decade');
                        }
                        // 更新个位
                        me.rotatePlate(item, 'units');
                    }
                }
            );
        },

        /**
         * 翻牌
         * @param  {Object} options
         * @property {string} options.type  计时牌类型（day, hour, minute）
         * @property {number} options.decade  十位
         * @property {number} options.units   个位
         * @param {string}  type     decade/units
         */
        rotatePlate: function (options, type){
            var me = this;

            // 先修改本地缓存的时间，用于下一次比对
            me.lastTimeData[options.type][type] = options[type];

            var selector = '.timer-'
                         + options.type
                         + ' .timer-'
                         + type;

            var plate = me.element.find(selector);

            var backTpl = backPlateRender({
                number: options[type]
            });

            plate.append(backTpl);

            var front = plate.find('[data-index="front"]');
            var back = plate.find('[data-index="back"]');

            front.addClass('roll-front');
            // css3中设置动画完成时间为0.7秒,因此需要在3/4时间内删除front
            setTimeout(function () {
                front.fadeOut(100, function () {
                    front.remove();
                    back.attr('data-index', 'front');
                });
            }, 450);
        },

        /**
         * 更新一下存储serverTime
         *
         */
        modifyTime: function () {
            var me = this;
            var serverTime = store.get('serverTime');
            var nextTime = serverTime - 1;
            store.set('serverTime', nextTime);

            if (nextTime === 0) {
                clearInterval(me.timerInterval);
                location.href = location.origin
                              + '/activity/birthday_main';
            }
        }

    };



    exports.init = function() {


        var timerPanel = $('.timer-panel');

        renderTimeClock(timerPanel);

        timerClock.init({
            element: timerPanel
        });




        // 基本
                $('.video-thumbnail').click(function(e) {
                    $('#iframe').attr('src', 'http://www.genshuixue.com/video/view/7f1e2db0fe').show();
                    $(this).hide();

                });


                var container = $('#main');

                new Popup({
                    element: container.find('.applay'),
                    layer: container.find('.applay .baidu-share'),
                    show: {
                        trigger: 'over',
                        delay: 100
                    },
                    hide: {
                        trigger: 'out',
                        delay: 200
                    }
                });





    };
});