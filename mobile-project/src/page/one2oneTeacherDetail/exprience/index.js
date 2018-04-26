define(function (require, exports) {
    var $  = require('zepto');
    var template = require('artTemplate');
    var render = template.compile(require('text!./render.tpl'));
    var service = require('common/service');
    var dom = $('.exprience');
    var contentDom = dom.find('.exprience-content .content');
    var hasMoreDom = dom.find('.more-exprience');

    // 初始化过往经历的模板
    function initRender(data) {
        var exprienceHtml = render({
            list: data
        });
        contentDom.html(exprienceHtml);
        if (data.length > 2) {
            hasMoreDom.show();
            readMoreExprience();
        }
    }

    // 阅读更多教育经历点击事件
    function readMoreExprience () {
        dom
            .unbind('click')
            .on('click', '.more-exprience', function () {
                contentDom.find('.box-item').each(function () {
                    var that = $(this);
                    that.removeClass('hide');
                    hasMoreDom.hide();
                });
        });
    }


    return function () {
        var data = this.bios;
        initRender(data);
    };    
});