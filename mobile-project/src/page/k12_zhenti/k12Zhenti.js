/**
 * Created by hanzhaohang on 16/3/01.
 */
define(function(require) {
    'use strict';
    var $ = require("zepto");
    var ui = require("common/ui");
    var iScroll = require('iscroll');
    var MVCObject = require('common/mvc/MVCObject');
    var string = require('util/string');
    var service = require('common/service');
    var util_function = require('util/function');
    var selectedItem = new MVCObject();
    var courseType = $('#course-type');
    var lazyLoadImage = require('common/lazyLoadImage');
    var page_layout = require('common/page_layout');
    var app = require('common/app');
    var kaodianObj = {};
    var env = require('util/env');
    var condition = {
        key: '',
        kemu: '',
        order: '',
        kaodian: ''
    };
    var commonShow = {
        drop: false,
        smile: false
    }
    var searchInput = $('#searchInput');

    function redirect(href) {
        if (app.isApp()) {
            if (href.indexOf('http') === -1) {
                href = location.origin + href;
            }
            app.openNewWindow(href);
        } else {
            location.href = href;
        }
    }

    function doSearch(searchReason) {
        /* 科目，热度1，知识点0 */

        if (condition.order == undefined) {
            condition.order = !!condition.zhishidian ? 0 : (!!condition.redu ? 1 : '');
        }
        var searchArray = ['kemu', 'order', 'kaodian'];
        var termStrimg = '';
        for (var i = 0; i < searchArray.length; i++) {
            termStrimg += condition[searchArray[i]] + '-';
        }
        termStrimg = termStrimg.substr(0, termStrimg.length - 1);
        if (condition.key) {
            termStrimg += '?condition=' + condition.key;
        }
        location.href = encodeURI(encodeURI(location.origin + '/video_course/zhenti-' + termStrimg));
        //location.search = encodeURI('?condition=' + termStrimg);
    }

    var maskContainer = {
        mDom: $('.filter-dialog-mask'),
        maskShow: false,
        lastScrollY: 0,
        hasInit: false,
        init: function() {
            if (maskContainer.hasInit) {
                return;
            }
            maskContainer.hasInit = true;
            sk.init();
            $('.filter-dialog-content').on('transitionend', function() {
                if (!maskContainer.maskShow) {
                    maskContainer.mDom.hide();
                    setTimeout(function() {
                        window.scrollTo(0, maskContainer.lastScrollY);
                    }, 50);
                }
            });
            maskContainer.mDom.on('click', function(e) {
                if (e.target == this) {
                    maskContainer.setDisplay(false);
                }
            });
        },
        setDisplay: function(display, flag) {
            function setCss(dom, height, overflow) {
                dom.css({
                    height: height,
                    overflow: overflow
                });
            }

            if (display) {
                maskContainer.lastScrollY = window.scrollY;
            }
            var $html = $('html');
            var $body = $('body');
            if (display) {
                maskContainer.mDom.show();
                maskContainer.maskShow = true;
                setTimeout(function() {
                    window.scrollTo(0, 0);
                    maskContainer.mDom.addClass('on');
                    setCss($body, window.innerHeight + 'px', 'hidden');
                    setCss($html, window.innerHeight + 'px', 'hidden');
                }, 100);
            } else {
                maskContainer.maskShow = false;
                maskContainer.mDom.removeClass('on');
                setCss($html, 'initial', 'initial');
                setCss($body, 'initial', 'initial');
                if (!flag) {
                    $('.part[data-filter="kaodian"]').removeClass('on');
                };
            }
        }
    }

    function bindEvent() {
        $('.fixed-footer .part').on('click', function(e) {
            if (!maskContainer.hasInit) {
                maskContainer.init();
            }
            var me = $(this);
            var filter = me.attr('data-filter');
            var isKaodian = filter == 'kaodian';
            if (me.hasClass('on')) {
                isKaodian && maskContainer.setDisplay(false, true);
                me.removeClass('on');
            } else {
                maskContainer.setDisplay(!!isKaodian, true);
                me.addClass('on').siblings().removeClass('on');
                if (!isKaodian) {
                    condition.order = undefined;
                    condition[filter] = true;
                    filter == 'redu' ? condition['zhishidian'] = false : condition['redu'] = false;
                    /*condition.kaodian = '';*/
                    doSearch();
                };
            }
        });
        /*切换科目*/
        courseType.on('click', 'li', function(e) {
            condition.kemu = $(this).attr('value');
            /*切换科目，清空考点和热词*/
            condition.kaodian = sk.stat.l0value;
            condition.key = '';
            doSearch();
        });
        /* 搜索词发生变化的事件 */
        var searchForm = searchInput.closest('form');
        searchForm.on('submit', function(e) {
            e.preventDefault();
            condition.key = $.trim(searchInput.val());
            doSearch();
        });


    }
    var sk = {
        stat: new MVCObject(),
        getSelectedItem: function(id, parObj) {
            var items = parObj.children || parObj;
            for (var i in items) {
                if (items.hasOwnProperty(i) && items[i].id == id) {
                    return items[i];
                }
            };
            return false;
        },
        getSelectedHtml: function(itemObj) {
            var preHtml = [];
            if (itemObj && itemObj.children) {
                for (var i in itemObj.children) {
                    if (itemObj.children.hasOwnProperty(i)) {
                        var citem = itemObj.children[i];
                        preHtml.push('<li data-value="' + citem.id + '" class="menu ');
                        preHtml.push((citem.selected && 'on') + '">');
                        preHtml.push(citem.name + '</li>');

                    }
                };
            }
            return preHtml.join('');
        },
        init: function() {
            var stat = sk.stat;
            window.stat = stat;
            stat.partDom = $('.filter-content').find('.part');
            /*筛选值*/
            stat.kaodian = '';
            stat.kaodian_changed = function() {
                var kaodian = stat.level1;
                var targetK = stat.get('kaodian');
                if (stat.level1 != targetK) {
                    kaodian += '_' + stat.level2;
                    if (stat.level2 != targetK) {
                        kaodian += '_' + targetK;
                    }
                }
                condition.kaodian = stat.l0value + '_' + kaodian;
                doSearch();
            }
            setTimeout(function() {
                var scrollOption = {
                    scrollY: true,
                    scrollX: false,
                    click: true,
                    mouseWheel: true,
                    scrollbars: true
                };
                stat.l1 = new iScroll('#level-1', scrollOption);
                stat.l2 = new iScroll('#level-2', scrollOption);
                stat.l3 = new iScroll('#level-3', scrollOption);
            }, 500);

            stat.set('l2Show', false);
            stat.set('l3Show', false);

            stat.level1_changed = function() {
                var l1Value = stat.get('level1');
                var pobj = sk.getSelectedItem(stat.l0value, kaodianObj)
                stat.l1Item = sk.getSelectedItem(l1Value, pobj);
                if (stat.l1Item.children) {
                    var chtml = sk.getSelectedHtml(stat.l1Item);
                    stat.partDom.eq(1).find('.left-items-c').html(chtml);
                    stat.partDom.eq(0).width('50%');
                    stat.partDom.eq(1).width('50%');
                    stat.partDom.eq(2).width(0);
                    sk.iScrollRefresh(stat.l2);
                } else {
                    stat.set('kaodian', l1Value);
                }
            };
            stat.level2_changed = function() {
                var l2Value = stat.get('level2');
                stat.l2Item = sk.getSelectedItem(l2Value, stat.l1Item);
                if (stat.l2Item.children) {
                    var chtml = sk.getSelectedHtml(stat.l2Item);
                    stat.partDom.eq(2).find('.left-items-c').html(chtml);
                    stat.partDom.width("33%");
                } else {
                    stat.set('kaodian', l2Value);
                }
            };
            sk.bindEvent();
        },
        iScrollRefresh: function(isDom) {
            setTimeout(function() {
                isDom.refresh();
            }, 500);
        },
        bindEvent: function(e) {
            var l1Dom = $('#level-1');
            var stat = sk.stat;
            l1Dom.on('click', '.level-parent', function(e) {

                var me = $(this);
                var cvalue = me.attr('data-value');
                var citems = l1Dom.find('.level-item2[p-value="' + cvalue + '"]');
                if (!me.hasClass('on')) {
                    stat.l0value = cvalue;
                    var aitems = l1Dom.find('.level-item2');
                    aitems.height(0);
                    citems.height(citems.find('ul').height());
                    me.addClass('on').siblings('.level-parent').removeClass('on');
                } else {
                    citems.height(0)
                    me.removeClass('on');
                }
                sk.iScrollRefresh(stat.l1);

            });
            l1Dom.on('click', '.menu', function(e) {

                var me = $(this);
                if (!me.hasClass('level-parent')) {
                    $('.level-item2 .menu').removeClass('on');
                    me.addClass('on');
                    stat.set('level1', me.attr('data-value'));
                }
            });
            var l2Dom = $('#level-2');
            l2Dom.on('click', '.menu', function(e) {
                var me = $(this);
                me.addClass('on').siblings('.menu').removeClass('on');
                stat.set('level2', me.attr('data-value'));
            });
            var l3Dom = $('#level-3');
            l3Dom.on('click', '.menu', function(e) {
                var me = $(this);
                me.addClass('on').siblings('.menu').removeClass('on');
                stat.set('kaodian', me.attr('data-value'));
            });
        }
    };

    var setShare = require('common/share/initialize');

    function setShareInfo() {
        var url = require.toUrl("./images/share_img.png");
        var options = {
            title: "真题视频库",
            content: "名师精讲，随时随地学真题",
            img: url,
            url: location.href
        };
        setShare(options);
    }

    function initSelectedKaodian() {
        var kaodian = condition.kaodian.split('_')[0];
        if (kaodian) {
            var citem = $('#level-1 .left-items-c').find('div[p-value="' + kaodian + '"]');
            if (citem.length) {
                sk.stat.l0value = kaodian;
                citem.siblings().hide();
                //citem.height(citem.find('ul>li').length * 44);
            }
        }
        bindDropEvent(kaodian);
    }

    function bindSmileFaceEvent() {
        var pDom = $('.fixed-icon');
        var itemPanel = pDom.find('.items');
        var $mask = $('.mask');
        var setSmileDisplay = function(forceHide) {
            var isOn = itemPanel.hasClass('on');
            if (!isOn && !forceHide) {
                itemPanel.addClass('on');
                $mask.addClass('on')
                commonShow.smile = true;
            } else {
                itemPanel.removeClass('on');
                $mask.removeClass('on');
                commonShow.smile = false;
            }
        }
        pDom.on('click', '.icon', function() {
            setSmileDisplay();
        });
        $mask.on('click', function() {
            setSmileDisplay(true);
        });
        pDom.on('click', '.item', function(e) {
            var me = $(this);
            var isQQ = me.hasClass('qq');
            if (isQQ) {
                if (app.isStudentApp() && env.os.isAndroid) {
                    Jockey.send('joinQQGroup', {
                        key: me.attr('android-key')
                    });
                } else {
                    redirect(me.attr('url'));
                }
            } else if (me.hasClass('liudan')) {
                /*留单*/
                redirect('/recommend/fill_info?source=genshuixue&page_type=' + page_data.page_type);
            } else {
                /*跳转IM*/
                if (app.isApp()) {
                    app.send('IM', {
                        c_role: '7',
                        c_id: '100000110'
                    });
                } else {
                    location.href = "/im/main";
                }
            }
        })

    }


    function bindDropEvent(initValue) {
        var dropObj = {};
        var dopDiv = $('.drop-select');
        var selectionDom = $('.selection');

        function setDropValue(value, txt, flag) {
            dopDiv.attr('value', value);
            dopDiv.attr('txt', txt);
            dopDiv.find('.txt').html(txt);
            if (!flag) {
                condition['kaodian'] = value;
                doSearch();
            }

        }

        var dropItem = $('.drop-items');
        if (initValue) {
            var selectedTxt = dropItem.find('p[value="' + initValue + '"]').html();
            setDropValue(initValue, selectedTxt, true);
        }


        dopDiv.on('click', function() {
            var me = $(this);
            var pDom = selectionDom;
            if (pDom.hasClass('on')) {
                pDom.removeClass('on');
                commonShow.drop = false;
            } else {
                pDom.addClass('on');
                commonShow.drop = true;
            }
        });
        dropItem.on('click', 'p', function() {
            var me = $(this);
            setDropValue(me.attr('value'), me.html());
            dopDiv.click();
        });
        $('body').click(function(e) {
            var tarDom = $(e.target);
            if (!tarDom.closest('.drop-select, .drop-items').length) {
                if (commonShow.drop) {
                    selectionDom.removeClass('on');
                    commonShow.drop = false;
                }
            };
            if (!tarDom.closest('.fixed-icon').length) {
                if (commonShow.smile) {
                    $('.fixed-icon').find('.items').removeClass('on');
                    commonShow.smile = false;
                    $('.mask').removeClass('on');
                }

            }
        })
    }

    return function(page_data) {

        lazyLoadImage.init();
        bindEvent();
        bindSmileFaceEvent();
        kaodianObj = page_data.kaodian;
        condition = page_data.condition;
        setShareInfo();
        searchInput.val(condition.key);
        var totalWidth = 0;
        /*courseType.find('li').map(function() {
            totalWidth += $(this).width();
        });
        courseType.width(totalWidth);*/

        /*setTimeout(function() {
            new iScroll('.class-head', {
                scrollY: false,
                scrollX: true,
                click: true,
                mouseWheel: false,
                scrollbars: true
            });
        }, 1000);*/
        page_layout.bottom_fixed.addElement($('.fixed-footer'));

        if (app.isStudentApp()) {
            $('.class-content a').on('click', function(e) {
                var url = $(this).attr('href');
                var courseNumber = parseInt(url.split('number=')[1]) + '';
                app.send('toVideoCourseDetail', {
                    number: courseNumber,
                    index: ''
                });
                e.preventDefault();
            });
        }

        initSelectedKaodian();
    }
});