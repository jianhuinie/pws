
define(function (require, exports) {

    'use strict';

    var tpl = '<div class="baidu-share bdsharebuttonbox">'
            +   '<a href="#" class="bds_more" data-cmd="more"></a>'
            +   '<a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a >'
            +   '<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博" ></a>'
            +   '<a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>'
            +   '<a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>'
            +   '<a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>'
            +   '<a href="#" class="bds_tieba" data-cmd="tieba" title="分享到百度贴吧"></a>'
            + '</div>';

    /**
     * 初始化百度分享
     *
     * @param {Object} data
     * @property {string} data.text 分享的文本
     * @property {string} data.image 分享的图片
     * @property {string} data.url 分享的链接，默认是当前页面 url
     * @property {HTMLElement} data.element 需要替换的元素
     * @return void
     */
    exports.init = function (data) {

        var element = data.element;

        if (element.jquery) {
            element = element[0];
        }

        var div = document.createElement('div');
        div.innerHTML = tpl;

        var shareElement = div.firstChild;

        element.parentNode.replaceChild(shareElement, element);

        window._bd_share_config = {
            common: {
                bdSnsKey: {},
                bdText: data.text,
                bdMini: 1,
                bdMiniList: false,
                bdPic: data.image,
                bdStyle: 0,
                bdSize: 24,
                bdUrl: data.url
            },
            share: { }
        };

        var head = document.getElementsByTagName('head')[0];
        var script = head.appendChild(
            document.createElement('script')
        );
        script.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
    };

});
