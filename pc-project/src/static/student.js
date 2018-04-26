/**
 * @file 学生介绍页面
 * @author liucong
 */
define(function(require, exports) {

    'use strict';

//    var Carousel = require('cobble/ui/Carousel');
    var LoginDialog = require('common/component/LoginDialog');


    var Tab = require('cobble/ui/Tab');
    var Text = require('cobble/form/Text');
    var Popup = require('cobble/helper/Popup');
    var AutoComplete = require('cobble/ui/AutoComplete');
    var service = require('common/service');
    var store = require('common/store');
    var suggestion = require('common/main/component/suggestion');



    exports.init = function() {

        var islogin = store.get('user').number;
        var login_e = $('.student-banner .login');
        if( islogin ){
             login_e.hide();
        }


        //登录
        $('.student-banner')
                .on('click', '.login', function() {

                    var url = location.href;
                    url = url.replace(/#.*/, '');
                    new LoginDialog({
                        onSuccess: function() {
                            location.href = url;
                        },
                    });

                });

        var container = $('#search');


////////



        var input = container.find('.search-input');

        var menu = container.find('.search-suggestion');

        var tab;

        var updateHeight = function() {

            // 先还原，保证左侧列能够撑开高度
            menu.height('auto');

            var height;

            var subMenu = menu.find('.sub-menu').filter(':visible');

            if (subMenu.length > 0) {
                height = Math.max(
                        subMenu.height(),
                        menu.height()
                        );
            }
            else {
                height = 'auto';
            }

            menu.height(height);
        };

        var highlight = function(title, query) {

            var reg = new RegExp(query, 'g');

            return title.replace(reg, function($0) {
                return '<em>' + $0 + '</em>';
            });
        };

        new AutoComplete({
            element: input,
            menu: menu,
            renderTemplate: function(data, tpl) {

                var query = $.trim(input.val());

                data = data || [];

                $.each(
                        data,
                        function(index, item) {

                            item.name = highlight(item.title, query);
                        }
                );

                var html = '';

                var data = {
                    query: query,
                    cityId: store.get('cityId'),
                    list: data
                };

                return suggestion.menu(data);
            },
            itemSelector: '.menu-item',
            hoverClass: 'hover',
            activeClass: 'active',
            onItemClick: function() {
                //container.find('form').submit();
                var query = container.find('.search-input').val();
                var city = store.get('cityId');
                var url = '/st/';
                if (query !== '') {
                    url += encodeURIComponent(query);
                } else {
                    url += '-';
                }
                url += '.html';
                location.href = url;
            },
            onChange: function(e, data) {

                if (tab && $.type(data.index) === 'number') {
                    tab.to(data.index);
                }

            },
            onAfterOpen: function() {
                updateHeight();
            },
            onBeforeRender: function() {
                if (tab) {
                    tab.dispose();
                    tab = null;
                }
            },
            onAfterRender: function() {

                var subMenu;

                tab = new Tab({
                    element: menu,
                    trigger: 'over',
                    navSelector: '.menu-item',
                    contentSelector: '.sub-menu',
                    animation: function(data) {

                        var contents = menu.find(this.contentSelector);

                        if (subMenu) {
                            subMenu.hide();
                            updateHeight();
                        }

                        if (typeof data.to === 'number') {
                            subMenu = contents.eq(data.to);
                            if ($.trim(subMenu.html())) {
                                subMenu.show();
                            }
                            else {
                                subMenu.hide();
                            }
                        }

                        if (subMenu) {
                            if (subMenu.is(':hidden')) {
                                subMenu = null;
                            }
                            else {
                                updateHeight();
                            }
                        }

                    }
                });
            },
            load: function(value, callback) {
                return service
                        .getSuggestion({
                            key: value
                        })
                        .done(function(response) {
                            callback(response.result.r);
                        });
            }
        });

        container
                .on('click', '.btn', function() {

                    var query = container.find('.search-input').val();
                    var city = store.get('cityId');

                    /*if (query === '') {
                     var list = container.find('.search-hotwords a');
                     var hotwords = [];
                     list.each(function(i, item){
                     hotwords.push($(item).html());
                     });
                     var length = hotwords.length ;
                     var idx = Math.random()*length;
                     query = hotwords[Math.floor(idx)];
                     }*/

                    var url = '/st/';
                    if (query !== '') {
                        url += encodeURIComponent(query);
                    } else {
                        url += '-';
                    }
                    url += '.html';

                    location.href = url;
                })
                .on('keyup', '.search-input', function(e) {
                    if (e.keyCode == 13) {
                        container.find('.btn').click();
                    }
                });






    }

});