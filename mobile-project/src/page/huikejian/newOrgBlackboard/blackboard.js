/**
 * @file 黑板报详情页面
 * @author peilonghui
 */

define(function (require) {

    var store = require('common/store');
    var setShare = require('common/function/setShare');
    var lazyLoadImage = require('common/loader/lazyLoadImage');
    var service = require('common/service');
    var tianxiaoLog = require('common/tianxiaoLog');

    // 点赞接口
    var thump = function() {

        var spanThump = $('.thump');
        var selfThump = spanThump.data('thump');
        var thumpCount = spanThump.data('count');
        var action;
        if(selfThump) {
            spanThump.find('i').addClass('self-thump');
            action = 'unlike';
        }
        else {
            spanThump.find('i').removeClass('self-thump');
            action = 'like';
        }

        $('.thump').click(function() {

            // service 调用黑板报点赞接口
            service.supportBlackBoard({
                board_id: store.get('id'),
                action: action
            }).done (function(response) {
                if(response.code == 0) {
                    // 点赞成功
                    if(action == "like") {
                        thumpCount = parseInt(thumpCount)+1;
                        spanThump.find('i').addClass('self-thump');
                        spanThump.find('.thump-count').text(thumpCount);
                        action = 'unlike';

                    }
                    else {
                        thumpCount = parseInt(thumpCount)-1;
                        spanThump.find('i').removeClass('self-thump');
                        spanThump.find('.thump-count').text(thumpCount);
                        action = 'like';
                    }
                }
            });

        });
    };
    return {
        init: function () {

            // 去掉service的默认错误捕捉事件
            service.setErrorHandler(function (errorMsg) {

            });

            var shareInfo = store.get('share_info');

            var shareContent = shareInfo.content.slice(0, 50);
            shareContent = shareContent.replace(/&nbsp;/g, '');
            setShare({
                content: shareContent,
                url: location.href,
                img: shareInfo.img,
                title: shareInfo.title
            });
            lazyLoadImage.init();
            thump();
            tianxiaoLog.send(store.get('number'), 'blackboard', store.get('blackboard_id'));

        }
    };

});