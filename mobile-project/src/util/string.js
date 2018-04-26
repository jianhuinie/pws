/**
 * Created by xuzheng on 15/12/24.
 */
define(function (require) {
    'use strict';

    var string = {};

    /**
     * 把字符串的首字母编程大写
     * @author xuzheng
     * @date 2015.4.21
     * */
    string.initcap = (function () {
        var cache = {};
        return function (str) {
            return cache[str] || (cache[str] = str.substr(0, 1).toUpperCase() + str.substr(1));
        };
    })();

    string.trim = function (str) {
        return str == null ? "" : String.prototype.trim.call(str)
    };
    /**
     * 编码html特殊字符
     */
    string.encodeHTML = function () {
        var temp_dom = document.createElement('div');
        return function (txt) {
            var t = document.createTextNode(txt),
                res = temp_dom.appendChild(t).parentNode.innerHTML;
            temp_dom.innerHTML = "";
            return res;
        }
    }();

    /**
     * 对字符串进行 HTML 解码
     *
     * @param {string} source 字符串
     * @return {string}
     */
    string.decodeHTML = function (source) {
        var str = String(source)
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");

        // 处理转义的中文和实体字符
        return str.replace(
            /&#([\d]+);/g,
            function ($0, $1) {
                return String.fromCharCode(parseInt($1, 10));
            }
        );
    };

    return string;
});