/**
 * 机构页分享设置
 */

;
define(function (require, exports) {

    'use strict';

    // var store = require('common/store');
    var pageData = null;
    var store = {
        get: function(key) {
            if (pageData[key]) {
                return pageData[key];
            } else {
                return '';
            }
        }
    }
    // var setShare = require('common/function/setShare');

    exports.init = function () {
        var orgName = store.get('org_name');
        var url = store.get('short_url');
        var shortUrl = store.get('short_url');
        var tags = store.get('tags');
        var isApp = store.get('is_app');
        var shareImg = store.get('share_img') || 'https://imgs.genshuixue.com/75733_myznirk9.jpg';
        var ext = '';

        if (tags) {
            var tagArray = JSON.parse(tags);
            if (tagArray.length) {
                var temp = [];
                for (var i = 0; i < tagArray.length; i++) {
                    temp.push(tagArray[i].name);
                }
                ext = '推荐理由：' + temp.join('、');
            }
        }

        var options = {
            url: url,
            title: orgName + '-跟谁学',
            img: shareImg,
            content: orgName + '在跟谁学开课了，同学们快来吧！' + ext
        }
        var param = $.extend(true, {}, options);
        var type = [
            'share_sms', 'share_weibo', 'share_weixin',
            'share_pyq', 'share_qq', 'share_qzone'
        ];

        for (var k in type) {
            param[type[k]] = $.extend(true, {}, options);
        }
        ;

        param.share_pyq.content = orgName + '在跟谁学开课了，快来看看吧~';
        param.share_qq.content = orgName + '在跟谁学开课了!' + ext;
        param.share_qzone.content = param.share_qq.content;

        param.share_weibo.content =
            orgName + '在@跟谁学 开课了！快来看看吧~'
            + ext + '…' + shortUrl + ' #找好老师，上跟谁学#';

        param.share_sms.content =
            orgName + '在跟谁学开课了！快来看看吧~' + ext + shortUrl;

        delete param.share_sms.img;
        delete param.share_sms.title;

        param.keep_weinxin = true;

        setShare(param);

    }
});
