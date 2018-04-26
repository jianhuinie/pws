/**
 *hanzhaohang
 */

define(function(require) {
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var service = require('common/service');
    var ui_new = require('common/ui');

    var app = require('common/app');
    var env = require('util/env');
    var isApp = app.isApp();
    var singleDomCount = 0;
    var isApp = app.isApp();
    var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
    var currentCount = 0;
    var openAppWindow = require("common/openAppWindow");

    var pageData;

    function setShareInfo(data) {
        var options = {
            title: data.title,
            content: data.content,
            img: data.avatar || 'https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577b7c20486e6.png',
            url: data.url
        };
        setShare(options);
    }

    function displaySharePanel() {
        if (isApp) {
            app.send('doSharePanel', {});
        } else {
            var $d2 = $('.share-mask');
            if (!inited_share) {
                $d2.on('click', 'img', function() {
                    $d2.hide();
                });
                inited_share = true;
            }
            $d2.show();
        }
    }

    function loginApp(callback) {
        Jockey.off('setUserInfo');
        Jockey.on('setUserInfo', function(response) {
            callback(response);
        });
        Jockey.send('getUserInfo');
    };

    function getSingleId() {
        return 'singleDom_' + (singleDomCount++);
    }

    function bindEvent() {
        if (isApp) {
            $('.my_score').on('click', function() {
                Jockey.send('toMyIntergal');
                return false;
            });
            $('#score_market').on('click', function() {
                Jockey.send('toCreditMall');
                return false;
            });
        }
        $('.daka_btn').on('click', function() {
            var me = $(this);
            if (me.hasClass('on')) {
                return;
            }
            window.gsx_ready(function(config) {
                if (!config.user) {
                    if (isApp) {
                        loginApp(function() {})
                    } else {
                        location.href = '/static/login?next=' + encodeURIComponent(location.href);
                    }
                } else {
                    service.get('/punch_sign/checkin', {}, function(res) {
                        if (res.code == 0 && res.data.redirect_url) {
                            $('.daka_btn').addClass('sign_succ').html("签到成功");
                            $('.content-panel').addClass('on');
                            setTimeout(function() {
                                location.href = res.data.redirect_url;
                            }, 2000);
                        }
                    });
                }
            });
            /* var cHour = new Date(Date.now()).getHours();
             me.addClass('on').html('已签到');
             var singleId = getSingleId();
             var content = '<div id="'+singleId+'">' + $('.dialog_1').html() + '</div>';
             if (cHour >= 5 && cHour <= 10) {
                 content = content.replace('tag="no-score"', 'style="display:block"');
             } else {
                 content = content.replace('tag="get-score"', 'style="display:block"');
             }
             content.replace();
             window.cConfirm = ui_new.alert({
                 content: content
             });
             setTimeout(function(){
                 $('#'+singleId).on('click', '.close-btn', function(){
                     cConfirm.dialog.destroy();
                 });
             }, 1000);*/
        });
    }

    function getNextPage() {
        var hDom = $('#more-button');
        if (!hDom.length) {
            return;
        }
        var lastScroHeight = hDom.position().top;

        function updateMoreDom(hasMore, nextCursor) {
            if (hasMore && nextCursor) {
                hDom.attr('next_cursor', nextCursor);
                hDom.show();
            } else {
                var $noMoreTip = $('<div style="border-bottom: 1px solid #DCDDDF;margin: 10px 10px 20px 10px"><div style="width: 134px;text-align: center;margin: 0 auto;margin-bottom: -10px;background-color: #fff;font-size: 14px;color: #999;">没有更多结果了</div></div>');
                $noMoreTip.insertAfter(hDom);
                hDom.hide();
            }
        }
        if (hDom.length) {
            updateMoreDom(1, 2);
        }

        var lastIndex = 0;
        var isLoading = false;

        function getNextPageContent() {
            if (isLoading) {
                return;
            }
            isLoading = true;
            var page = hDom.attr('next_cursor');
            var data = {
                render: 'json',
                page: page
            };
            page_data.url_condition && (data.condition = page_data.url_condition);
            hDom.addClass('loading');

            function nextContent(res) {
                hDom.removeClass('loading');
                var formatTpl = function(tpl, obj) {
                    $.each(obj, function(key, value) {
                        var reg = new RegExp("{{" + key + "}}", 'ig');
                        tpl = tpl.replace(reg, value);
                    });
                    return tpl;
                };

                function getItems(items) {
                    var tpl = '<li><a href="{{url}}"><div class="item-info"><div class="u-img"><img width="100%" height="auto" whs="1" src="{{avatar}}">' + '</div><div><div class="u-logined"><p class="u-name">{{name}}</p><p class="u-quit">{{tag}}</p></div></div><div class="rank">' + '{{count}}</div></div></a></li>';
                    var htmlArr = [];
                    var clength = items.length;
                    for (var i = 0; i < clength; i++) {
                        items[i].count = currentCount++;
                        htmlArr.push(formatTpl(tpl, items[i]));
                    }
                    $('.user_items').append($(htmlArr.join('')));
                }
                if (res.code == 0) {

                    getItems(res.data.list);

                    updateMoreDom(res.data.pager.has_more, +page + 1);
                    lazyLoadImage.init();
                    setTimeout(function() {
                        isLoading = false;
                        if (!res.data.pager.has_more) {
                            lastScroHeight = 100000000000;
                        } else {
                            lastScroHeight = hDom.position().top;
                            initDoms();

                        }
                    }, 100);
                }
            }
            $.ajax({
                url: '/punch_sign/rank',
                data: data,
                success: nextContent
            });
        }

        hDom.on('click', function() {
            getNextPageContent();
        });


        function initDoms(flag) {
            if (window.scrollY + window.innerHeight >= lastScroHeight || flag === true) {
                getNextPageContent();
            }
        }
        $(window).on('scroll', initDoms);
        initDoms();
    };
    var inited_share = false;

    function displaySharePanel() {
        if (isApp) {
            app.send('doSharePanel', {});
        } else {
            var $d2 = $('.share-mask');
            if (!inited_share) {
                $d2.on('click', 'img', function() {
                    $d2.hide();
                });
                inited_share = true;
            }
            $d2.show();
        }
    }

    return function(page_data) {
        pageData = page_data;
        getNextPage();
        setShareInfo(page_data.shareInfo);

        lazyLoadImage.init();
        bindEvent();
        openAppWindow.init();
        $('body').css({
            "background-image": "url('https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57663a61e79bd.png@2x_70Q_1o_412w_734h_1e_1c.src')"
        })
        currentCount = +$('#list_count').html() + 1;
        if (isApp) {
            $('.my_score').show();
        }
        if (isApp || isWeixin) {
            var shareBtns = $('.share-line');
            if (shareBtns.length) {
                shareBtns.show()
                .on('click', '.share-icon', function() {
                    var me = $(this);
                    var shareType = me.attr('type');
                    displaySharePanel();
                });
            }
        }
    }

});