/**
 * @file 我的视频
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var VideoElement = require('common/component/Video');
    var VideoDialog = require('common/component/VideoDialog');
    var service = require('common/service');
    

    exports.init = function () {

        var container = $('#content');

        var max = store.get('max');
        var count = store.get('count');

        container
        .find('.video-thumbnail')
        .each(function () {
            new VideoElement({
                element: $(this),
                remove: function (data) {

                    var target = $(data.event.currentTarget).closest('[data-id]');

                    service
                    .delVideo({ id: target.data('id') })
                    .done(function (response) {
                        if (response.code === 0) {

                            count--;

                            target.remove();

                            success(
                                '删除成功',
                                function () {
                                    location.reload();
                                }
                            );
/**
                            if (count < max) {
                                container.find('.upload-trigger').show();
                            }
*/
                        }
                    });
                }
            });
        });

        container
        .on('click', '.icon-play-o', function (e) {

            var target = $(e.currentTarget).closest('li');

            new VideoDialog({
                title: target.data('name'),
                url: target.data('video')
            });

        });
        
    };

});