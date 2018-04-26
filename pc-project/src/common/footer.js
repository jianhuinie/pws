/**
 * @file 主站页面公用底部的脚本
 * @author peilonghui
 */

define (function (require) {

    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');
    var etpl = require('cobble/util/etpl');

    var imgUrl;

    'use strict';

    var initWechatDialog = function () {

        var dialog = null;

        $('#footer')
        .on(
            'click',
            '.show-wechat',
            function (e) {
                e.preventDefault();

                if (dialog) {
                    dialog.show();
                    return;
                }
                else {
                    dialog = new Dialog(
                        {
                            title: '跟谁学官方微信',
                            content: ''
                                +    '<div class="column" >'
                                +      '<h4 class="subscribe">微信订阅号</h4>'
                                +      '<p>更多动态，更全资讯，更酷图文，更炫内容</p>'
                                +    '</div>'
                                +    '<div class="column" >'
                                +      '<h4 class="service">学生服务号</h4>'
                                +      '<p>在线咨询，奖学金返现，名师点评，等你来互动</p>'
                                +    '</div>'
                                +    '<div>'
                                +       '<img src="' + imgUrl + '"/>'
                                +    '</div>',
                            disposeOnHide: false,
                            skinClass: 'dialog-qrcode',
                            fixed: 1
                        }
                    );
                }

            }
        );
    };

    var render = etpl.compile(
        '<!-- for: ${links} as ${link} -->'
     +  '<li>'
     +     '<a href="${link.link}" <!-- if: ${link.nofollow} -->nofollow <!-- /if -->target="_blank">${link.title}</a>'
     + '</li>'
     + '<!-- /for -->'
    );

    function initFriendLinks() {
        var links = store.get('footerFriendLinks');
        var el = render({ links: links });

        $(el).insertAfter('#footer .friend-links-label');
    }

    function initFriendLinksForMain() {
        var links = store.get('footerFriendLinksForMain');

        var linksForJs = $.map(links, function (item) {
            if (item.jsload) {
                return item;
            }
        });

        var el = render({ links: linksForJs });
        $(el).insertBefore('#footer .friend-links-last');
    }

    function initCert() {

        var html = '<a rel="nofollow" class="integrity" href="https://credit.szfw.org/CX20151229013058200175.html" target="_blank"></a>'
                 //+ '<span id="kx_verify"></span><script type="text/javascript">(function (){var _kxs = document.createElement("script");_kxs.id = "kx_script";_kxs.async = true;_kxs.setAttribute("cid", "kx_verify");_kxs.src = ("https:" == document.location.protocol ? "https://ss.knet.cn" : "http://rr.knet.cn")+"/static/js/icon3.js?sn=e16022911010862572xlyh000000&tp=icon3";_kxs.setAttribute("size", 0);var _kx = document.getElementById("kx_verify");_kx.parentNode.insertBefore(_kxs, _kx);})();</script>'
                 + '<a rel="nofollow" class="credible" href="https://ss.knet.cn/verifyseal.dll?sn=e17010411010866120gzva000000&comefrom=trust&trustKey=dn&trustValue=www.genshuixue.com" target="_blank"></a>'
                 + '<a rel="nofollow" class="geo-trust" href="https://smarticon.geotrust.com/smarticonprofile?Referer=http://www.genshuixue.com" target="_blank"></a>'

        $('#footer .cert').append(html);

        if(location.href.indexOf("www") > -1){
            $('#footer .cert .anquan_auth').show()
        }else{
            $('#footer .cert .anquan_auth').hide()
        }
    }

    return {
        init: function () {
            imgUrl = require.toUrl('../img/qrcode_footer.png').replace(/\?.*/, '');
            initWechatDialog();
            if (store.get('showFriendLinks')) {
                if (store.get('footerFriendLinksForMain')) {
                    initFriendLinksForMain();
                }
                else {
                    initFriendLinks();
                }
            }
            initCert();
            $.ajax({
                url: '/customer_tel/customerServiceTel',
                method: 'post',
                data: {
                },
                success: function(response) {
                    if (response.data) {
                        $('.tel h4').text(response.data);
                        //console.log(1);
                    }
                    else {
                        //$('.tel h4').text("4000-910-910");
                    }
                }
            });
        }
    }
})