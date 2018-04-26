/**
 * @file ajax service
 * @author hurry
 */
define(function (require) {
    'use strict';
    var json = require('cc/util/json');
    var divide = require('cc/function/divide');
    angular
        .module('Manage.services')
        .factory('utilService', ['dialog', '$q', function (dialog, $q) {
            return {
                parseQuery: function () {
                    var queryString = location.search.slice(1);
                    var queryArray = queryString.split('&');

                    var result = {};

                    $(queryArray).each(function (index, item) {
                        item = item.split('=');
                        result[item[0]] = decodeURIComponent(item[1]);
                    });

                    return result;
                },
                // 获取当前环境
                getEnvName: function () {
                    var host = window.location.host.split('.');
                    var env = 'www';

                    if (host.length > 1) {
                        host = host[0].split('-');

                        if (host.length > 1) {
                            env = host[0];
                        }
                    }

                    return env;
                },
                /**
                 * 统一的alert/confirm弹框
                 * @param  {Object/string} options [description]
                 * @param  {?string} options.title 标题，默认'提示'
                 * @param  {string} options.content 内容
                 * @param  {string} options.width 宽度
                 * @param  {?boolean} options.hideCancel 是否隐藏取消按钮，默认隐藏
                 * @param  {?string} options.okBtnText 确定按钮文本，默认'确定'
                 * @param  {?string} options.cancelBtnText 取消按钮文本，默认'取消'
                 * @param  {?function} options.okHandler 点确定回调，返回false，不关闭弹框
                 * @param  {?function} options.cancelHandler 点取消回调，返回false，不关闭弹框
                 * @param  {?string} options.skinClass 弹窗类 便于样式处理
                 * @param  {?string} options.textClass 文本类 用于控制文本展示颜色
                 *          可以取 primary secondary success error info danger warning muted 之一
                 * @param  {?string} options.cacheKey 考虑有些弹窗会有不再提示的勾选项 该字段不为空则展示不再勾选  默认不展示
                 *          cacheKey为勾选不再提示时设置localStorage的key
                 * @param  {?string} options.notRemindAgain 是否默认勾选   默认不勾选
                 * @param  {?string} options.remindText  提示文案  默认  '不再提示'
                 * @param  {?string} options.okBtnPosition 确认按钮的位置 left right
                 * @return {Promise}         [description]
                 */
                showMessage: function (options) {
                    var defer = $q.defer();
                    var content = options.content;
                    if (options + '' === options) {
                        content = options;
                    }
                    var hideCancel = true;
                    if (typeof options.hideCancel === 'boolean') {
                        hideCancel = options.hideCancel;
                    }
                    var dialogOpt = {
                        title: options.title || '提示',
                        skinClass: (options.skinClass || '') + ' show-message',
                        controller: require('./confirm/controller'),
                        templateUrl: 'app/common/ngService/confirm/tpl.html',
                        width: options.width || 370,
                        resolve: {
                            dialogConfig: function () {
                                return {
                                    okBtnPosition: options.okBtnPosition || 'right',
                                    okBtnText: options.okBtnText || '确定',
                                    cancelBtnText: options.cancelBtnText || '取消',
                                    hideCancel: hideCancel,
                                    content: content,
                                    textClass: options.textClass || '',
                                    okHandler: options.okHandler,
                                    cancelHandler: options.cancelHandler,
                                    cacheKey: options.cacheKey || '',
                                    notRemindAgain: options.notRemindAgain || false,
                                    remindText: options.remindText || '不再提示'
                                };
                            }
                        }
                    };
                    var dialogInstance = dialog.open(dialogOpt);
                    dialogInstance
                        .then(function (res) {
                            defer.resolve(res);
                        },
                        function (res) {
                            defer.reject(res);
                        });
                    return defer.promise;
                },
                /**
                 * 修改函数上下文
                 *
                 * @param  {Function} fn      [description]
                 * @param  {[type]}   context [description]
                 * @param  {[type]}   args    [description]
                 * @return {[type]}           [description]
                 */
                bind: function(fn, context) {
                    var extraArgs = [].slice.call(arguments, 2);
                    return function() {
                        var args = extraArgs.concat([].slice.call(arguments));
                        return fn.apply(context, args);
                    };
                },
                /**
                 * 停止事件的传播
                 *
                 * @param {Event} event 事件对象
                 */
                stopPropagation: function(event) {
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    } else {
                        event.cancelBubble = true;
                    }
                },
                JSON: {
                    parse: function (value) {
                        if (JSON.parse) {
                            return JSON.parse(value);
                        }
                        return json.parse(value);
                    },
                    stringify: function (value) {
                        if (JSON.stringify) {
                            return JSON.stringify(value);
                        }
                        return json.stringify(value);
                    }
                },
                /**
                 * 格式化size B KB MB GB
                 * @param  {number} size 文件大小
                 * @return {string}      格式化后的size字符串
                 */
                formatFileSize: function (size) {
                    var unit;
                    //有些地方size是字符串
                    size = +size;
                    if (size < 1024) {
                        unit = 'B';
                    }
                    else if (size < Math.pow(1024, 2)) {
                        size =  divide(size, 1024);
                        unit = 'KB';
                    }
                    else if (size < Math.pow(1024, 3)) {
                        size =  divide(size, Math.pow(1024, 2));
                        unit = 'MB';
                    }
                    else {
                        size =  divide(size, Math.pow(1024, 3));
                        unit = 'GB';
                    }

                    return size.toFixed(1) + unit;
                },
                /**
                 * 将时间戳或日期转为固定格式的日期展示
                 * year-month-day  year年month月day日
                 * @param  {string} date 可以为时间戳和支持转化的日期格式
                 * @param {string}   formatter '-'  ':'
                 * @return {string}      格式化后的日期符串
                 */
                formatDateString: function (date, formatter) {
                    var date = new Date(date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    if (day < 10) {
                        day = '0' + day;
                    }
                    if (month < 10) {
                        month = '0' + month;
                    }
                    var dateArray = [];
                    dateArray.push(year);
                    dateArray.push(month);
                    dateArray.push(day);

                    if (formatter) {
                        return dateArray.join(formatter);
                    }
                    else {
                        return year + '年' + month + '月' + day + '日';
                    }
                },
                /**
                 *  将某个时间转换成相对UTC-8时区(北京)的时间毫秒数
                 *  北京时区相对于UTC时区 晚8小时
                 *  @param  {string} date 可以为时间戳和支持转化的日期格式
                 */
                getUTC8Time: function (date) {
                    var hourMilliSeconds = 60 * 60 * 1000;
                    var date = new Date(date);
                    var year =  date.getUTCFullYear();
                    var month = date.getUTCMonth();
                    var day = date.getUTCDate();
                    var hour = date.getUTCHours();
                    var minute = date.getUTCMinutes();
                    var second = date.getUTCSeconds();
                    var milliSecond = date.getUTCMilliseconds();
                    return new Date(year, month, day, hour, minute, second, milliSecond).getTime() + 8 * hourMilliSeconds;
                },
                /**
                 *  @param  {string} sourceString 对html进行转义  防止xss攻击
                 */
                encodeHtml: function (sourceString) {
                    return String(sourceString)
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;');
                },
                /**
                 * 判断是否是Mac
                 */
                isMacOS: function () {
                    var macOSFlag = false;
                    var platform = navigator.platform;
                    if (platform.indexOf("Mac") > -1) {
                        macOSFlag = true;
                    }
                    return macOSFlag;
                },
                /**
                 * 判断是否是WinXP
                 */
                isWinXP: function () {
                    var winXpFlag = false;
                    var userAgent = navigator.userAgent;
                    if (userAgent.indexOf("Windows NT 5.1") > -1 || userAgent.indexOf("Windows XP") > -1) {
                        winXpFlag = true;
                    }
                    return winXpFlag;
                },
                /**
                 * 将某种固定格式的字符串转成数值类型  比如 6.5.0
                 */
                transferToNmber: function (str, spliter) {
                    var spliter = spliter || '.';
                    var tempArr = str.split(spliter);
                    var str = tempArr.join('');
                    return +str;
                }
            };
        }]);
});