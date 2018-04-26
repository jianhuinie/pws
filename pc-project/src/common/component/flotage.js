/**
 * @file 右侧漂浮物
 * @author zhujialu
 */
define(function (require, exports) {

    var pageScrollTop = require('cobble/function/pageScrollTop');
    var cookie = require('cobble/util/cookie');
    var entrance = require('im/entrance');
    var store = require('common/store');
    var bindScroll = require('common/bindScroll');
    var leaveMessageDialog = require('common/component/LeaveMessageDialog');
    var localStorage = require('cobble/util/localStorage');
    var Popup = require('cobble/helper/Popup');

    exports.init = function () {
        var help = $('#flotage-help');
        var weChatPopup;
        var options = {
            show: {
                trigger: 'over',
                delay: 200,
                animation: function () {
                    this.layer.slideDown(150);
                }
            },
            hide: {
                trigger: 'out',
                delay: 200,
                animation: function () {
                    this.layer.slideUp(150);
                }
            }
        };

        weChatPopup = new Popup($.extend(
            {
                element: help.find('.get-courses'),
                layer: help.find('.qrcode-box')
            },
            options
        ));

        var middle = $('#flotage-middle');

        $('#flotage-top')
        .on('click', function () {
            entrance.chatToKF();
        });

        var bottom = $('#flotage-bottom');
        var backup = bottom.find('.backup');

        backup.click(
            function (e) {

                $('html,body').animate(
                    {
                        scrollTop: 0
                    },
                    1000,
                    'easeOutCirc'
                );

            }
        );

        bindScroll(window, function (e) {
            if (pageScrollTop() > 0) {
                backup.fadeIn(100);
            }
            else {
                backup.fadeOut(100);
            }
        }, 1);

        bottom
        .on('mouseenter', '#mobile-down', function(e){
            $('#flotage-middle').show();
        })
        .on('mouseleave', '#mobile-down', function(e){
            $('#flotage-middle').hide();
        });

        help
        .on('click', '.flotage-help-icon,.findteacher', function (e) {
            var query = $('input[name="q"]').val();
            var element = $(this);
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'recommend',
                stype: '1',
                client: 'PC',
                page_type: leaveMessPageType,
                track_id: cookie.get('__track_id__'),
                _timestamp: new Date().getTime(),
                user_number: store.get('user').number,
                user_role: store.get('user').type,
                location_type: leaveMessPageType+'_1',
                query: query,
            };
            WAT.send(url, params);
            new leaveMessageDialog({
                teacher: 'search'
            });
        })
        .on('click', '.comeon-im', function(e){
            entrance.chatToKF();
        });

        var anonymousIm = $('#anonymous-im');
        anonymousIm
        .on('click', '.comeon-im', function(e){
            entrance.chatToKF();
        });

        var subsurface = $('.subsurface');
        var smallSubsurface = $('.small-subsurface');
        if (store.get('user').type == 0) {
            help.hide();
            smallSubsurface.hide();
            anonymousIm.hide();
        }
        else if (store.get('user').type == '-1') {
            anonymousIm.show();
        }

        if (!cookie.get('SHOWSEEK')) {
            if (store.get('user').type == 0) {
                help.hide();
                smallSubsurface.hide();
                anonymousIm.hide();
            }
            else {
                subsurface.show();
                smallSubsurface.hide();
                cookie.set('SHOWSEEK', parseInt(new Date().getTime() / 1000), {
                    domain: '.genshuixue.com',
                });
            }
        }
        else {
            var lastTime = cookie.get('SHOWSEEK');
            var now = parseInt(new Date().getTime() / 1000);
            if (store.get('user').type == 0) {
                subsurface.hide();
                smallSubsurface.hide();
                help.css('right', '-104px');
            }
            else if (store.get('user').type < 0) {

                if (now - lastTime > 86400) {
                    subsurface.show();
                    smallSubsurface.hide();
                    help.css('right', '-104px');
                    cookie.remove('SHOWSEEK',
                    {
                        domain: '.genshuixue.com'
                    });
                }
                else {
                    subsurface.hide();
                    if (store.get('show_findTeacher')) {
                        help.css('right', '7px');
                    }
                }
            }
            else {

                if (now - lastTime > 604800) {
                    subsurface.show();
                    smallSubsurface.hide();
                    help.css('right', '-104px');
                    cookie.remove('SHOWSEEK',
                    {
                        domain: '.genshuixue.com'
                    });
                }
                else {
                    subsurface.hide();
                    if (store.get('show_findTeacher')) {
                        help.css('right', '7px');
                    }
                }
            }
        }
        subsurface
        .on('click', '.close', function (e) {
            subsurface.hide();
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'recommend',
                stype: '2',
                client: 'PC',
                page_type: "index",
                track_id: cookie.get('__track_id__'),
                _timestamp: new Date().getTime(),
                user_number: store.get('user').number,
                user_role: store.get('user').type,
                location_type: 'close'
            };
            WAT.send(url, params);
            help.css('right', '7px');
            smallSubsurface.show();
        });
        smallSubsurface
        .on('click', function () {
            smallSubsurface.hide();
            subsurface.show();
        });
        var scrollTimer;
        var hasScrollStop = true;
        var scrollStop = function () {
            subsurface.css('bottom', '0px');
        };
        $(window).scroll(
            function () {
                if (scrollTimer) {
                    if( pageScrollTop() > 0) {
                        subsurface.css('bottom', '-147px');
                    }
                }
                hasScrollStop = false;
                scrollTimer = setTimeout(
                    function () {
                       hasScrollStop = true;
                       scrollStop();
                    },
                    1000
                );
            }
        );
        scrollStop();
    };

});