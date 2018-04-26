/**
 * Created by yuanye on 17/1/11.
 */
define(function(require, exports) {
    "use strict";

    var $ = require('zepto');
    var app = require('common/app');
    var jockey = require('jockey');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var Loading = require('common/ui/Loading/index');
    var ui = require('common/ui');
    var template = require('artTemplate');
    var cardRender = template.compile(require('text!./cardList.tpl'));

    var cardContainer;
    // 实例化Loading
    var loading = new Loading();
    var inputUrl = location.origin + '/invite-card/input';
    // ajax flag防止多次发送ajax
    var hasGetMore = false;

    /* 
     * 时间转换函数
     * 参数  date: String(时间格式字符串,如2017-01-04 00:10:31)
     *      type: String(0转换到date, 1转换到time)
     */
    function dateFormat(date, type) {
        var time = new Date(Date.parse(date));
        var value;
        if (type == '0') {
            var year = time.getFullYear() + '';
            var month = time.getMonth() + 1 + '';
            var day = time.getDate() + '';
            month.length == 1 && (month = '0' + month);
            day.length == 1 && (day = '0' + day);
            value = year + '-' + month + '-' + day;
        }
        else if (type == '1') {
            var hour = time.getHours() + '';
            var min = time.getMinutes() + '';
            var sec = time.getSeconds() + '';
            hour.length == 1 && (hour = '0' + hour);
            min.length == 1 && (min = '0' + min);
            sec.length == 1 && (sec = '0' + sec);
            value = hour + ':' + min + ':' + sec;
        }
        return value;
    };

    // 由于artTemplate里不能进行时间格式比较的逻辑, 因此只能在这里修改时间
    function modTime(DOM) {
        var times = DOM.find('.time');
        var time;
        var selfTime;

        for (var i = 0; i < times.length; i++) {
            selfTime = times[i].innerText.split('至');
            selfTime[0] = selfTime[0].trim();
            selfTime[1] = selfTime[1].trim();
            // 如果开始时间与结束时间是同一天
            time = dateFormat(selfTime[0], '0')
                 + '至'
                 + dateFormat(selfTime[1], '0');
            times[i].innerText = time;
        }
    }

    /* 
     * 分页函数
     * 参数  hasMore: Boolean(是否可以分页)
     *      next: 下一页
     */
    function getMore(hasMore, next) {
        var lastCard = $('.card:last-child')[0];
        var bottom = cardContainer.find('.bottom');
        // 最后还有个margin-bottom要加
        var distance = lastCard.offsetTop + lastCard.offsetHeight + 15;
        if (window.scrollY + window.innerHeight >= distance) {
            if (!hasMore && bottom.length == 0) {
                cardContainer.append('<div class="bottom">已经到底啦</div>');
            }
            else if (hasMore && !hasGetMore) {
                loading.show();
                hasGetMore = true;
                service.post('/invite-card/list', {page: next}, function (res) {
                    // console.log(res);
                    if (res.code == 0) {
                        var html = cardRender({data: res.data.items});
                        html = $(html);
                        modTime(html);
                        cardContainer.find('.card-container').append(html);
                        lastCard = html.last('.card')[0];
                        distance = lastCard.offsetTop + lastCard.offsetHeight + 15;
                        cardContainer.data('crup', res.data.pager.current_page);
                        cardContainer.data('nexp', res.data.pager.next_page);
                        cardContainer.data('hasmore', res.data.pager.has_more);
                        lazyLoadImage.init();
                    }
                    loading.hide();
                    hasGetMore = false;
                });
            }
        }
    }

    /* 
     * 跳转函数
     * 唯一参数 url: String(跳转url)
     */
    function goUrl(url) {
        if (app.isApp()) {
            app.openNewWindow(url);
        }
        else {
            location.href = url;
        }
    }


    return function () {
        // 初始化DOM
        cardContainer = $('#card');
        var hasMore;
        var nexPage;
        Jockey.send('setRightButton', {
            url: 'https://m.genshuixue.com/forum/postBrowse/60086',
            title: '使用帮助'
        });
        // 首页
        $('#publish').on('click', function () {
            window.localStorage.clear();
            goUrl(inputUrl);
        });
        cardContainer.on('click', '.card', function (e) {
            var that = $(this);
            var isEnd = that.hasClass('end');
            var uuid = that.data('uuid');
            if (!isEnd) {
                jockey.send('inviteCard', {
                    'imgId': uuid,
                    'imgUrl': that.data('image')
                });
            }
        });
        if ($('.card').length > 0) {
            $(window).on('scroll', function (e) {
                hasMore = Boolean(cardContainer.data('hasmore'));
                nexPage = cardContainer.data('nexp');
                getMore(hasMore, nexPage);
            });
        }

    }

});
