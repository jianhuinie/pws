define(function (require) {
    var $  = require('zepto');
    var template = require('artTemplate');
    var render = template.compile(require('text!./render.tpl'));
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');

    return function () {
        if (!this.dialog) {
            var secureHtml = render(); 
            this.dialog = new SlideInDialog({
                content: secureHtml
            });
        }
        this.dialog.show();
        var that = this;
        $('.slide-close').unbind('click').on('click', function() {
            that.dialog.hide();
        });
    };
});