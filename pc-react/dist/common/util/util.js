define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var util = {
        findWhereNew: function findWhereNew(arr, attribute, val) {
            var i = 0;
            var len = arr.length;
            for (i = 0; i < len; i++) {
                if (arr[i][attribute] === val) {
                    return arr[i];
                }
            }
            return null;
        },
        getIndexForVal: function getIndexForVal(arr, attribute, val) {
            var i = 0;
            var len = arr.length;
            for (i = 0; i < len; i++) {
                if (arr[i][attribute] === val) {
                    return i;
                }
            }
            return -1;
        },
        renderLeftSider: function renderLeftSider() {
            var eleArr = $('.nav-page .path-tab');
            $.map(eleArr, function (item) {
                var ele = $(item);
                ele.removeClass('active');
                if (location.hash.indexOf(ele.data('path')) >= 0) {
                    ele.addClass('active');
                }
            });
        },
        replaceSpace: function replaceSpace(str) {
            if (str === null || str === undefined) {
                return '';
            }
            return str.replace(/\s/g, '');
        }
    };
    exports.default = util;
});