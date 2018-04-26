/**
 * @file 全站通用
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var siteNav = require('common/siteNav');
    var footer = require('common/footer');
    var store = require('common/store');
    var innerLink = require('common/innerLink');
    var im = require('im/entrance');
    var flotage = require('common/component/flotage');
    var moduleIniter = require('../moduleIniter');
    var LoginDialog = require('common/component/LoginDialog');

    require('common/ui');
    require('common/console');

    exports.init = function (notInitWindowEvent) {

        var loginDialog,byKefuClickTimes=0;
        if (store.get('env') === 'www') {

            var user = store.get('user');
            var data = {
                guid: WAT.getCookie('__guid__'),
                user_number: user.number,
                page_url: document.URL,
                referer: document.referrer
            };

            WAT.send(
                WAT.toUrl('www.genshuixue.com', '/empty.gif'),
                data
            );
        }

        siteNav.init();
        flotage.init();
        footer.init();
        if (store.get('needIm')) {
            im.init();
        }
        innerLink.init();
        moduleIniter.init();

        $('body')
        .on('click', 'a', function(e){
            var element = $(this);
            // 如果有source
            if (element.data('source')) {
                var href = element.prop('href');
                // 如果还没有完成替换
                if (href.indexOf('source=')<0) {
                    // 如果包含#
                    if (href.indexOf('#')>-1) {
                        var array = href.split('#');
                        // 如果包含?
                        if (array[0].indexOf('?')>-1) {
                            element.prop('href',array[0]+'&source='+element.data('source')+(array[1]?'#'+array[1]:''));
                        } else {
                            element.prop('href',array[0]+'?source='+element.data('source')+(array[1]?'#'+array[1]:''));
                        }
                    } else {
                        // 如果包含?
                        if (href.indexOf('?')>-1) {
                            element.prop('href',href+'&source='+element.data('source'));
                        } else {
                            element.prop('href',href+'?source='+element.data('source'));
                        }
                    }
                }
            }
        })
            .on('click','.chat-label',function(event){
                var element = $(this);
                if(store.get('user').type == -1){
                    loginDialog = new LoginDialog({
                        showKefu : true,
                        onSuccess: function(){
                            location.reload();
                        }
                    });
                    $('.dialog-body .bykefu').attr("data-user-number",(element.attr('data-user-number')));
                    $('.dialog-body .bykefu').attr("data-user-type",(element.attr('data-user-type')));
                }else{
                    im.chatTo(element.data());
                }
            })
        .on('click','.bykefu',function(event){
            loginDialog.hide();
            if(byKefuClickTimes==0){
                im.chatToKF();
                byKefuClickTimes ++;
                $('.im-toggle-bar').show();
            }else{
                $('.im-toggle-bar').trigger('click')
            }
        });

    };

});