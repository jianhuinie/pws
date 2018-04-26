define(function (require, exports) {

    'use strict';

    var holder;
    exports.init = function () {
        holder = this;

        holder
        .on('click', '.search-button', function () {
            var url = '/sc/';
            var input = holder.find('.search-input');
            var query = $.trim(input.val());
            var type = $(this).data('type');
            if (query) {
                url += encodeURIComponent(query.split('-').join(' '));
            }
            if (type) {
                url += '-' + type;
            }
            // hurry: PC从直播专区进来搜索结果页会带本地的title
            url += '.html?source=search';
            location.href = url ;
        })
        .on('keyup', '.search-input', function (e) {
            var element = $(this);
            if ( e.keyCode === 13 ) {
                holder.find('.search-button').click();
            }
        });
    };
});