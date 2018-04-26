define(function (require, exports) {

    'use strict';

    var thiz;
    exports.init = function () {
        thiz = this;

        thiz
            .on('click', '.search-button', function () {
                var url = '/st/';
                var input = thiz.find('.search-input');
                var query = $.trim(input.val());
                if (query) {
                    url += encodeURIComponent(query.split('-').join(' '));
                } else {
                    url += '-';
                }
                url += '.html';
                location.href = url ;
            })
            .on('keyup', '.search-input', function (e) {
                var element = $(this);
                if ( e.keyCode === 13 ) {
                    thiz.find('.search-button').click();
                }
            })
    };
});