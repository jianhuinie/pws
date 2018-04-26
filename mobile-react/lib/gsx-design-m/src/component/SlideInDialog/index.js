/**
 * 底部滑入控件
 * Created by gsx on 15/11/16.
 */
define(function (require) {
    'use strict';

    var $ = require('zepto');
    var MVCObject = require('../../util/mvc/MVCObject');
    var observer = require('../../util/mvc/observer');
    var MVCArray = require('../../util/mvc/MVCArray');
    var utilBase = require('../../util/base');
    var utilDom = require('../../util/dom');
    
    var lastShowTime = 0;


    var cssSlideInDialog = require('text!./index.styl');
    var htmlSlideInDialog = ''
        + '<div class="slide-dialog-mask">'
        +   '<div class="slide-dialog-content"></div>'
        + '</div>'
        + '<div class="slide-mask-div"></div>';
    var arrDialogs = new MVCArray();
    var $body = $('body');
    var $html = $('html');
    var pageMain = $('#page_main');

    var cssToken;

    observer.addListener(arrDialogs, 'length_changed', function () {
        var length = this.getLength();
        if (length) {
            if (!cssToken) {
                arrDialogs.token = utilDom.insertCssText(cssSlideInDialog);
                cssToken = arrDialogs.token;
            } else {
                arrDialogs.token = cssToken;
            }
        } else if (arrDialogs.token) {
            utilDom.removeCssText(arrDialogs.token);
            arrDialogs.token = null;
        }
    });

    function addCache(dialogInstance) {
        if (!arrDialogs.exists(dialogInstance)) {
            arrDialogs.push(dialogInstance);
        }
    }

    function removeCache(dialogInstance) {
        if (arrDialogs.exists(dialogInstance)) {
            arrDialogs.remove(dialogInstance);
        }
    }

    /**
     *
     * @extends {MVCObject}
     *
     * attributes:
     *      content {string|HTMLElement} 内容
     *  Method:
     *      show() 显示
     *      hide(); 隐藏
     *      set('content', param) 设置内容
     *      destory() 销毁
     * */
    function SlideInDialog(options) {
        options = options || {};
        addCache(this);
        var dom = $(htmlSlideInDialog);
        if (options.content) {
            if (typeof options.content == 'string') {
                dom.find('.slide-dialog-content').html(options.content);
            } else {
                dom.find('.slide-dialog-content').append($(options.content));
            }

        };
        $body.append(dom);

        // huangshiming 设定原有的样式，避免被覆盖
        $body.attr('data-origin-overflow', $body.css('overflow'));
        $html.attr('data-origin-overflow', $html.css('overflow'));
        pageMain.attr('data-origin-overflow', pageMain.css('overflow'));

        this.mainPanel = $(dom).eq(0);
        this.maskPanel = $(dom).eq(1);
        initEvents(this);
    }

    utilBase.inherits(SlideInDialog, MVCObject);
    var p = SlideInDialog.prototype;

    p.destory = p.distroy = function () {
        this.set('display', null);
        removeCache(this);
        this.mainPanel.off('webkitTransitionEnd');
        this.mainPanel.off('click');
        this.mainPanel.remove();
        observer.clearInstanceListeners(this);
        removeCache(this);
    };
    p.content_changed = function() {
        var content = this.get('content');
        this.mainPanel.find('.slide-dialog-content').html(content);

    }

    p.display_changed = function() {
        function setCss(dom, height, overflow) {
            dom.css({
                maxHeight: height,
                overflow: overflow
            });
        }
        var display = this.get('display');
        //var $html = $('html');
        var me = this;
        if (display) {
            lastShowTime = Date.now();
            me.maskPanel.show();
            me.mainPanel.show();
            setTimeout(function() {
                window.scrollTo(0, 0);
                me.mainPanel.addClass('on');
                $(me.mainPanel).height(window.innerHeight);
                setCss($body, window.innerHeight + 'px', 'hidden');
                setCss($html, window.innerHeight + 'px', 'hidden');
                // hurry: 兼容小米和360浏览器
                var slideHeight = me.mainPanel.find('.slide-dialog-content').height();
                setCss($('#page_main'), window.innerHeight - 20 - ($('.page-banner-wrap').length > 0 ? $('.page-banner-wrap').height() : 0) + 'px', 'hidden');
                // huangshiminga: 兼容anzhuo中的spa项目
                var isSpa = $('#app');
                if (isSpa.length) {
                    setCss(isSpa, window.innerHeight - slideHeight + 'px', 'hidden');
                }
            }, 100);
        } else {
            me.mainPanel.removeClass('on');
            if ((!this.isHideSilent)) {
                setTimeout(function() {
                    /* 如果最近有新的谈层要弹出，就先滑到底部 */
                    if (((Date.now() - lastShowTime) < 500)) {
                        me.maskPanel.hide();
                        return;
                    }
                    // window.scrollTo(0, me.get('lastScrollY'));
                    setCss($html, 'initial', $html.attr('data-origin-overflow'));
                    setCss($body, 'initial', $body.attr('data-origin-overflow'));
                    // hurry: 兼容小米和360浏览器
                    setCss(pageMain, 'initial', pageMain.attr('data-origin-overflow'));
                    // huangshiminga: 兼容anzhuo中的spa项目
                    var isSpa = $('#app');
                    if (isSpa.length) {
                        setCss(isSpa, 'initial', 'initial');
                    }
                    // hurry: 先后顺序的问题
                    window.scrollTo(0, me.get('lastScrollY'));
                    setTimeout(function(){
                        me.maskPanel.hide();
                    }, 200);
                }, 400);
            }

        }
    };


    p.show = function() {
        var me = this;
        me.set('lastScrollY', window.scrollY);
        arrDialogs.forEach(function(currItem) {
            if (me != currItem) {
                currItem.maskPanel.hide();
                currItem.hide(true);
            }
        });
        this.set('display', true);
    };
    p.hide = function(silent) {
        this.isHideSilent = !!silent;
        this.set('display', false);
    };

    function initEvents(me) {
        me.mainPanel.on('webkitTransitionEnd', function() {
            if (me.get('display') == false) {
                me.mainPanel.hide();
            }
        });
        $(window).on('resize', function(){
            if (me.get('display') == true) {
                me.show();
            }
        });
        me.maskPanel.on('click', function(e) {
            me.hide();
        });
        me.mainPanel.on('click', function(e) {
            if (e.target == me.mainPanel[0]) {
                me.hide();
            }
        });
    }
    return SlideInDialog;
});