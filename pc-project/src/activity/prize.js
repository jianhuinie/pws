/**
 * @file 抽奖返现活动
 * @author liucong
 */
define(function (require, exports) {

    'use strict';
    var service = require('common/service');
    var store = require('common/store');
    var Rotatable = require('common/component/Rotatable');
    var Popup = require('cobble/helper/Popup');
    var LoginDialog = require('common/component/LoginDialog');

    var container = $('#main');
    var sourceUserNumber;
    var sourceUserType;

    var angleMap = {
        '20': 22.5,
        '100': 67.5,
        '50': 112.5,
        '300': 157.5,
        '10': 202.5,
        '0': 247.5,
        '5': 292.5,
        '1000': 337.5
    };


    function loadPrizeList(page) {
        service
        .getPrizeRecord({
            page: page,
            page_size: 3,
            number: sourceUserNumber,
            type: sourceUserType
        })
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data;
                var tpl = data.tpl;
                container
                .find('.prize-list')
                .html(tpl.prize_record);
            }
        });
    }

    exports.init = function () {
        var hasPrized = store.get('hasGetPrize');
        sourceUserNumber = store.get('sourceUserNumber');
        sourceUserType = store.get('sourceUserType');
        var lock = false;

        container
        .on('click', '.get-prize', function (event) {

            if (lock) {
                return ;
            }

            if (hasPrized) {
                $('.tooltip').show();
                setTimeout(function(){
                    $('.tooltip').hide();
                },2000);
                return;
            }

            var btn = $(event.currentTarget);

            // 防止重复点击出问题
            lock = true ;

            service
            .getPrize({
                number: sourceUserNumber
            })
            .done(function (response) {
                if (response.code === 0) {

                    var data = response.data;
                    var money = data.money;
                    var pointer = container.find('.pointer');
                    var img = pointer.find('.get-prize');
                    var src = img.prop('src');

                    prizeRotate.rotate({
                        animateTo: angleMap[money] + 3600,
                        duration: 6000,
                        callback: function () {
                            btn.prop('disabled', true);

                            container.find('.goto-share').show();
                            container.find('.goto-share-page').show();

                            if (money > 0) {
                                var resultDialog = container.find('.prize-result');

                                resultDialog.find('p').text(money);
                                resultDialog.show();
                            } else {
                                var resultDialog = container.find('.prize-result-gray');

                                resultDialog.show();
                            }

                            //为兼容windows 7 ie8 才这么写的
                            pointer.children().remove();
                            src = src.replace(/pointer.png/, 'pointer_disabled.png');

                            pointer.html('<img src="' + src + '" class="get-prize">');

                            loadPrizeList(1);

                            hasPrized = true;

                        }
                    });
                }
                lock = false ;
            });

        });

        //查看我的活动主页
        container
        .on('click', '.goto-share-page', function () {
            var url = location.href.replace(/\?.*/, '');

            url += '?number=' + store.get('userNumber') + '&type=' + store.get('userType');
            location.href = url;
        });

        //点击分页获取
        container
        .on('click', '.pager a', function (event) {
            var link = $(event.currentTarget);

            if (link.hasClass('active')) {
                return false;
            }

            var page = link.data('page');

            loadPrizeList(page);

            return false;
        });


        var prizeRotate = new Rotatable({
            element: container.find('.get-prize')
        });

        //关闭中奖提示框
        container
        .on('click', '.prize-result .close', function (event) {
            $(event.currentTarget).parent().hide();
        })

        .on('click', '.prize-result-gray .close', function (event) {
            $(event.currentTarget).parent().hide();
        });

        var shareContainer = container.find('.share');
        //马上分享
        container
        .on('click', '.goto-share', function () {
                $('html,body').animate(
                    {
                        scrollTop: shareContainer.offset().top
                    },
                    1000,
                    'easeOutCirc'
                );
        });

        //分享
        new Popup({
            element: container.find('.share-to span'),
            layer: container.find('.baidu-share'),
            show: {
                trigger: 'over'
            },
            hide: {
                trigger: 'out',
                delay: 100
            }
        });

        //活动详情展开收起
        var rules = container.find('.rules');
        var rulesTrigger = rules.find('.trigger span');
        var rulesContent = rules.find('.content');

        rulesTrigger
        .click(function () {
            rulesContent
            .slideToggle(400);
        });



        /*if (location.href.indexOf('#') !== -1) {*/
            if (location.hash == '#rules-trigger') {
                rulesContent.slideDown(400);
                var rulesTop = rulesTrigger.offset().top;
                $('html,body').animate(
                    {
                        scrollTop: rulesTop
                    },
                    1000,
                    'easeOutCirc'
                );
            }
/*        }*/
        else {

            $(window).on('beforeunload', function() {
                $('html,body').scrollTop(750);

            });

            $('html,body').scrollTop(750);
            /*setTimeout(
                function () {
                    $('html,body').animate(
                        {
                            scrollTop: 0
                        },
                        1000,
                        'easeOutCirc'
                    );
                },
                1000
            );*/
        }

        //登录
        container
        .on('click', '.login-link,.get-prize-disabled', function () {

            if (hasPrized) {
                return;
            }
            var url = location.href;
            url = url.replace(/#.*/, '');
            new LoginDialog({
                onSuccess: function () {
                    location.href = url;
                },
            });

        });

    }
});