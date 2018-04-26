define(function (require, exports) {
    var $  = require('zepto');
    var template = require('artTemplate');
    var render = template.compile(require('text!./render.tpl'));
    var service = require('common/service');
    var dom = $('.case');

    return function () {
        var exprienceHtml = render({
            list: this.successCaseItems
        });
        dom.html(exprienceHtml);
    };
});