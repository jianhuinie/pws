/**
 * @file 头部搜索框
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Tab = require('cobble/ui/Tab');
    var Placeholder = require('cobble/helper/Placeholder');
    var AutoComplete = require('cobble/ui/AutoComplete');
    var service = require('common/service');
    var store = require('common/store');
    var urlUtil = require('cobble/util/url');
    var compressImage = require('common/function/compressImage');
    var suggestion = require('./suggestion');
    var hover_flag = false;

    //初始化指引 “找好老师上跟谁学”
    /*function initInstruction (container) {
        var element = container.find('.instruction');
        var pic = element.find('.pic');
        var gif = element.find('.gif');
        var src = gif.attr('src');
        var timer;
        var backTimer;


        var triggerGif = function() {

            if (gif.css('display') != 'none') {
                return;
            }

            clearTimeout(timer);
            clearTimeout(backTimer);

            pic.hide();
            //重新播放gif
            gif.attr('src', '');
            gif.attr('src', src);
            gif.show();

            backTimer = setTimeout(function () {

                gif.hide();
                pic.show();

                timer = setTimer(30000);

            }, 2000);
        }

        var setTimer = function(time) {
            return setTimeout(function () {

                triggerGif();

            }, time);
        }

        timer = setTimer(30000);

        element
        .hover(
            function (e) {

                triggerGif();

            },
            function () {

            }
        );
    }*/

    exports.init = function () {
        // 全国站
        var isWWW = store.get('isWWW') || false;

        //统计相关
        var category = "teacher";
        var container = $('#header');

        var input = container.find('.search-input');

        var menu = container.find('.search-suggestion');

        var tab;

        var updateHeight = function () {

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

        var highlight = function (title, query) {

            var reg = new RegExp(query, 'g');

            return title.replace(reg, function ($0) {
                return '<em>' + $0 + '</em>';
            });
        };

        new AutoComplete({

            element: input,
            menu: menu,
            renderTemplate: function (data, tpl) {

                if (data.length === 1) {

                    var type;

                    switch (data[0].type) {
                        case 3:
                            type = 'teacher';
                            break;
                        case 4:
                            type = 'org';
                            break;
                    }

                    if (type) {

                        var item = $.extend(true, {}, data[0][type]);

                        item.avatar = compressImage({
                            url: item.avatar,
                            width: 78,
                            height: 78
                        });

                        if ($.type(item.tags) === 'string') {
                            item.tags = item.tags.split(' ');
                            if (item.tags.length > 4) {
                                item.tags.length = 4;
                            }
                        }

                        return suggestion[type](item);
                    }
                }

                var query = $.trim(input.val());

                data = data || [];

                $.each(
                    data,
                    function (index, item) {
                        item.name = highlight(item.title, query);
                    }
                );

                var html = '';

                var data = {
                    query: query,
                    cityId: store.get('cityId'),
                    cityDomain: store.get('cityDomain'),
                    isWWW: isWWW,
                    list: data
                };

                return suggestion.menu(data);
            },

            itemSelector: '.menu-item',
            hoverClass: 'hover',
            activeClass: 'active',

            onItemClick: function (e, data) {

                if (!data.url) {
                    var query = data.text;
                    var city = store.get('cityId');
                    var cityDomain = store.get('cityDomain');
                    var cur = container.find('.search-form').data('cur');

                    if (isWWW) {
                        var url = '/st/';
                        if (cur == 'course') {
                            url = '/sc/' ;
                        }
                        else if (cur == 'org') {
                            url = '/so/' ;
                        }
                    }
                    else {
                        var url = '/' + cityDomain + '/st-';
                        if (cur == 'course') {
                            url = '/' + cityDomain + '/sc-' ;
                        }
                        else if (cur == 'org') {
                            url = '/' + cityDomain + '/so-' ;
                        }
                    }

                    if (query) {
                        url += encodeURIComponent(query.split('-').join(' '));
                    } else {
                        url += '-';
                    }
                    url += '.html?source=sug';
                    var searchDebug = urlUtil.parseQuery(location.search)["sd"]
                    if(searchDebug){
                        url= url + '&sd=' + searchDebug;
                    }
                    location.href = url ;
                }
            },
            onChange: function (e, data) {

                if (tab && $.type(data.index) === 'number') {
                    tab.to(data.index);
                }

            },
            onEnter: function (e, data) {
                if (data.url) {
                    window.open(data.url);
                }
            },
            onAfterOpen: function () {
                updateHeight();
            },
            onBeforeRender: function () {
                if (tab) {
                    tab.dispose();
                    tab = null;
                }
            },
            onAfterRender: function () {

                updateHeight();

                var subMenu;

                tab = new Tab({
                    element: menu,
                    trigger: 'over',
                    navSelector: '.menu-item',
                    contentSelector: '.sub-menu',
                    index: -1,
                    animation: function (data) {

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
            load: function (value, callback) {

                var data = {
                        key: value
                    };
                var cur = container.find('.search-form').data('cur');

                // 班课搜索
                if (cur == 'course') {
                    data = {
                        key: value,
                        type: 'class'
                    }
                }

                // 机构搜索
                if (cur == 'org') {
                    data = {
                        key: value,
                        type: 'org'
                    }
                }

                return service
                    .getSuggestion(data)
                    .done(function (response) {
                        callback(response.result.r);
                    });
            }
        });

        function showSearchComponent(type) {
            var element = container.find('.search-form');
            var placeholderText = '';
            var placeholder = container.find('.placeholder');
            var input = container.find('.search-input');
            var text = $.trim(input.val());

            if (type == 'teacher') {
                container.find('.search-hotwords').data('category','teacher');
                element.data('cur','teacher');
                placeholderText = element.data('placeholder');
                placeholder.html(placeholderText);
            } else if (type == 'org') {
                container.find('.search-hotwords').data('category','org');
                element.data('cur','org');
                placeholderText = element.data('orgplaceholder');
                placeholder.html(placeholderText);
            } else {
                container.find('.search-hotwords').data('category','course');
                element.data('cur','course');
                placeholderText = element.data('courseplaceholder');
                placeholder.html(placeholderText);
            }

            if (text) {
                placeholder.hide();
            } else {
                placeholder.show();
            }

        }

        container
        //点击统计
        .on('click', '.app-qrcode .close', function () {
            var el = container.find('.app-qrcode');

            el.hide();
        })
        .on('click', '.btn', function () { // 搜索

            var input = container.find('.search-input');
            var form = container.find('.search-form');
            var query = $.trim(input.val());
            var city = store.get('cityId');
            var cityDomain = store.get('cityDomain');

            var cur = form.data('cur');
            if (isWWW) {
                var url = '/st/';

                if (cur == 'course') {
                    url = '/sc/';
                }
                else if (cur == 'org') {
                    url = '/so/';
                }
            }
            else {
                var url = '/' + cityDomain + '/st-';

                if (cur == 'course') {
                    url = '/' + cityDomain + '/sc-';
                }
                else if (cur == 'org') {
                    url = '/' + cityDomain + '/so-';
                }
            }

            // 存在placeholder 表示是主页或搜索结果页
            // 如果是主页搜索框跳转query不能为空
            if (!query && cur == 'teacher') {
                query = form.data('query');
            }

            //url += '/city/' + city;
            if (query) {
                url += encodeURIComponent(query.split('-').join(' '));
            } else {
                url += '-';
            }
            url += '.html?source=search';
            var searchDebug = urlUtil.parseQuery(location.search)["sd"]
            if(searchDebug){
                url= url + '&sd=' + searchDebug;
            }
            if(!query){
                return false;
            }
            location.href = url ;
        })
        .on('keyup', '.search-input', function (e) {
            var element = $(this);
            if ( e.keyCode === 13 ) {
                container.find('.btn').click();
            }
        })
        // 点击placeholder让输入框获取焦点
        .on('click', '.placeholder', function () {
            container.find('.search-input').focus();
        })
        // 如果用户输入空格或连续空格则placeholder显示
        // 否则placeholder隐藏
        .on('change', '.search-input', function () {
            var element = $(this);
            var text = $.trim(element.val());
            var placeholder = container.find('.placeholder');
            var placeholderText = '';
            var searchForm = container.find('.search-form');
            var cur = searchForm.data('cur');

            if (cur == 'course') {
                placeholderText = searchForm.data('courseplaceholder');
            } else if (cur == 'org') {
                placeholderText = searchForm.data('orgplaceholder');
            } else {
                placeholderText = searchForm.data('placeholder');
            }

            if (text !== '') {
                placeholder.hide();
            } else {
                placeholder.show();
                placeholder.html(placeholderText);
            }
        })
        .on('click', '.tab-item', function (e) { // 三类别搜索切换
            var element = $(this);

            var search = container.find(".search-hotwords");
            var category = search.data("category");
            var href = '';
            var child = search.find('[log]');
            element.parent().find('.tab-item').removeClass('active');
            if (element.hasClass('teacher')) {
                category = "teacher";
                showSearchComponent('teacher');

                child.each(function (index,item) {

                    var word = $(item).html();

                    if (isWWW) {
                        href = "/st/" + word + ".html";
                    }
                    else {
                        href = "/" + store.get('cityDomain') + "/st-" + word + ".html";
                    }

                    $(item).attr("href", href);
                });

            }
            else if (element.hasClass('org')) {
                category = "org";
                showSearchComponent('org');

                child.each(function (index,item) {

                    var word = $(item).html();

                    if (isWWW) {
                        href = "/so/" + word + ".html";
                    }
                    else {
                        href = "/" + store.get('cityDomain') + "/so-" + word + ".html";
                    }

                    $(item).attr("href", href);
                });
            }
            else {
                category = "course";
                showSearchComponent('course');

                child.each(function (index,item) {

                    var word = $(item).html();
                    if (isWWW) {
                        href = "/sc/" + word + ".html";
                    }
                    else {
                        href = "/" + store.get('cityDomain') + "/sc-" + word + ".html";
                    }

                    $(item).attr("href", href);
                });
            }
            element.addClass('active');
        })
        .on('mouseenter', '.cur-item', function (e) {
            var element = $(this);
            var parent = element.parent();
            element.find('.icon-angle-up').show();
            element.find('.icon-angle-down').hide();
            if (element.hasClass('teacher-active')) {
                parent.find('.course').show();
                parent.find('.org').show();
            } else if (element.hasClass('org-active')) {
                parent.find('.teacher').show();
                parent.find('.course').show();
            } else {
                parent.find('.teacher').show();
                parent.find('.org').show();
            }
            parent.find('.select-list').show();
            parent.find('.cur-item').css({'background':'#F5F5F5'});
            //element.show();
        })
        .on('mouseenter', '.select-list', function (e) {
            var element = $(this);
            var parent = element.parent();
            parent.find('.cur-item').css({'background': '#fff'});
        })
        .on('click', '.select-item', function (e) {
            var element = $(this);
            var parent = element.parent().parent();
            if (element.hasClass('course')) {
                parent.find('.cur-item')
                      .removeClass('org-active')
                      .removeClass('teacher-active')
                      .addClass('course-active');
                parent.find('.active-txt').html('课程');
                showSearchComponent('course');
            } else if (element.hasClass('org')) {
                parent.find('.cur-item')
                      .removeClass('teacher-active')
                      .removeClass('course-active')
                      .addClass('org-active');
                parent.find('.active-txt').html('机构');
                showSearchComponent('org');
            } else {
                parent.find('.cur-item')
                      .removeClass('org-active')
                      .removeClass('course-active')
                      .addClass('teacher-active');
                parent.find('.active-txt').html('老师');
                showSearchComponent('teacher');
            }
            element.hide();
            parent.find('.select-list').hide();
            parent.find('.icon-angle-up').hide();
            parent.find('.icon-angle-down').show();

        })
        .on('mouseleave', '.search-select', function (e) {
            var element = $(this);
            element.find('.select-list').hide();
            element.find('.cur-item').css({'background':'#F5F5F5'});
            element.find('.icon-angle-up').hide();
            element.find('.icon-angle-down').show();
        })

        menu
        .on('click', '.org-label', function (e) {

            var target = $(this);
            var url = target.data('url');

            if (url) {
                window.open(url);
                return false;
            }
        });

        /*new Placeholder({
            element: container.find('.search-input'),
            nativeFirst: false,
            simple: false
        });*/

        //initInstruction(container);

    };

});