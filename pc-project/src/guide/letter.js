/**
 * 字母检索
 * @author wuhongjie
 */
define(function (require, exports) {

    'use strict';
    var innerLink = $('#main');

    exports.init = function () {
        var href = window.location.pathname;
        var a = href.split("/");
        var name = a[a.length-1] || 'A';
        $(".lflag"+name).addClass("active");

    };
});