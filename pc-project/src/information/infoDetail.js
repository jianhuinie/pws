/**
 * @file 资讯详情页js
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';
    var Tab = require('cobble/ui/Tab');
    var newComment = require('information/infoDetail/new-comment');
    var service = require('common/service');

    exports.init = function() {
        newComment.init();

        //点击弹出窗里面的分享按钮：
        $('.baidu-share').show();
        function clicked() {
            var container = $(document);
            var apply = $(document);
            apply.delegate('.apply', 'click', function() {


                if (login) {
                    var popup = new Popup({
                        element: container.find('.apply'),
                        layer: container.find('.baidu-share'),
                        show: {
                            trigger: 'over',
                            delay: 100
                        },
                        hide: {
                            trigger: 'out',
                            delay: 200
                        }
                    });
                    $('.baidu-share').appendTo('.dialog-body').show();
                } else {

                    var compaign_id = $('#apply').data('compaign');
                    if (compaign_id == 'pc001') {

                        window.location.href = '/static/register?user_type=2?next=/activity/experience?su=back002';
                    }
                    else {

                        window.location.href = '/static/register?user_type=2?next=/activity/experience?su=back002';
                    }
                }

            });
        }

        //显示评论底色
        var commentContainer = $('.comment-list');
        commentContainer
                .find('.item').hover(function() {
            $(this).addClass('comment-selected');
        }, function() {
            $(this).removeClass('comment-selected');
        });

        //rank 切换
        $('#ranklist').each(
                function() {
                    var tab = new Tab({
                        trigger: 'over',
                        navActiveClass: 'active',
                        navSelector: '.rank',
                        contentSelector: '.week',
                        element: $(this),
                        index: 1
                    });
                }
        );

        //点击文章赞。
        var praise = $('.share ').find('.btn-primary');
        var count = praise.find('.count');
        praise.click(function() {
            service
                    .getLunchCount()
                    .done(function(response) {
                        if (response.code === 0) {
                            var text = parseInt(count.text()) + 1;
                            count.text(text);
                            praise.off('click').prop({
                                disabled: true
                            });

                        }
                    });
        });






    };
});