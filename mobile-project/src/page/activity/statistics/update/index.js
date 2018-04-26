define(function (require){

    var $ = require('zepto');
    var app = require('common/app');
    var env = require('util/env');
    var container = $('.tanchuang');

    var jumpTo = function () {
        container.on('click', '.jump', function () {
            var that = $(this);
            var next = that.data('href');
            if(app.isApp()) {
                if(app.isStudentApp() && env.os.isAndroid) {
                    Jockey.send('finish');
                } else {
                    app.openNewWindow(next);
                }
            }
        });
    }

    return function () {
        jumpTo();
    }
})