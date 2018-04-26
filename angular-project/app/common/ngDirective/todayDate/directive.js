/**
 * @file 展示当天日期指令
 * @author niejianhui
 * @date 2017/07/31
 */
define(function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('todayDate', ['$interval', function ($interval) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    /**
                     * options 参数配置  支持扩展
                     * options.showFullYear  是否展示年份  默认false
                     * options.showFullDate  是否展示完整日期  默认true
                     * options.showDetailTime 是否展示具体时间 默认true
                     * options.showSeconds 是否展示到秒 默认false
                     * options.showDay        是否展示星期几   默认true
                     */
                    options: '='
                },
                templateUrl: 'app/common/ngDirective/todayDate/tpl.html',
                link: function ($scope) {
                    var defaultOptions = {
                        showFullYear: false,
                        showFullDate: true,
                        showDetailTime: true,
                        showSeconds: false,
                        showDay: true
                    };
                    var opts = $.extend({}, defaultOptions, $scope.options);
                    $scope.opts = opts;

                    var weekDayMap = {
                        '0': '星期日',
                        '1': '星期一',
                        '2': '星期二',
                        '3': '星期三',
                        '4': '星期四',
                        '5': '星期五',
                        '6': '星期六'
                    };

                    function getDatestr(month, day) {
                        if (month < 10) {
                            month = '0' + month;
                        }
                        if (day < 10) {
                            day = '0' + day;
                        }
                        return [month, day].join('-');
                    }

                    function getTimeStr(hours, minutes, seconds, showSeconds) {
                        var arr = [];
                        if (hours < 10) {
                            hours = '0' + hours;
                        }
                        if (minutes < 10) {
                            minutes = '0' + minutes;
                        }
                        if (seconds < 10) {
                            seconds = '0' + seconds;
                        }
                        arr.push(hours);
                        arr.push(minutes);
                        if (showSeconds) {
                             arr.push(seconds);
                        }
                        return arr.join(':');
                    }

                    var intervalTime = 60 * 1000;
                    if (opts.showSeconds) {
                        intervalTime = 1000;
                    }

                    function init() {
                        var date = new Date();
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();
                        var hours = date.getHours();
                        var minutes = date.getMinutes();
                        var seconds = date.getSeconds();
                        var weekDay = date.getDay();

                        $scope.dateObj = {
                            fullYear: year,
                            dateStr: getDatestr(month, day),
                            timeStr: getTimeStr(hours, minutes, seconds, opts.showSeconds),
                            weekDayStr: weekDayMap[weekDay]
                        };
                    }
                    
                    init();
                    
                    $interval(function () {
                        init();
                    }, intervalTime);
                }
            };
        }]);
});