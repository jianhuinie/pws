define(function (require, exports) {

    'use strict';

    var divide = require('cobble/function/divide');

    /**
     * 格式化size B KB MB GB
     * @param  {number} size 文件大小
     * @return {string}      格式化后的size字符串
     */
    function formatFileSize(size) {
        var unit;

        if (size < 1024) {
            unit = "B";
        }
        else if (size < Math.pow(1024, 2)) {
            size =  divide(size, 1024);
            unit = "KB";
        }
        else if (size < Math.pow(1024, 3)) {
            size =  divide(size, Math.pow(1024, 2));
            unit = "MB";
        }
        else {
            size =  divide(size, Math.pow(1024, 3));
            unit = "GB";
        }

        return size.toFixed(1) + unit;
    }

    return formatFileSize;
});