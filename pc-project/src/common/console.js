/**
 * @file 控制台，封装原生函数，方便上线注释
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    if (typeof window.console === 'undefined') {
        window.console = { };
    }

    $.each(
        [ 'log', 'info', 'debug', 'warn', 'error', 'group', 'groupEnd' ],
        function (index, name) {

            if (console[name] == null) {
                console[name] = $.noop;
            }

            exports[name] = function (value) {
                if (arguments.length === 1) {
                    console[name](value);
                }
                else {
                    console[name].apply(console, arguments);
                }
            };

        }
    );

    exports.group = function (name) {
        console.group(name);
    };

    exports.groupEnd = function () {
        console.groupEnd();
    };


});