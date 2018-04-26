/**
 * Created by xuzheng on 16/1/23.
 */
define(function (require, exports) {
    'use strict';

    var MVCObject = require('common/mvc/MVCObject');
    var util_base = require('util/base');
    var observer = require('common/mvc/observer');
    var util_number = require('util/number');

    var $ = require('zepto');
    var IScroll = require('iscroll');

    var showTimeInterval = 2 * 60 * 1000;

    /**
     * input:
     *      user {object} 当前登陆用户
     *      messages {MVCArray} 消息数据
     *      showSenderName {Boolean} 是否显示发送消息人的昵称
     * */
    function MessageRender(container) {

        this.container = container;
        this._scroller = $('<div></div>').css({
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'width': '100%',
            'z-index': 1,
            '-webkit-tap-highlight-color': 'rgba(0,0,0,0)'
        }).appendTo(container);

        this._container = $('<div></div>').css({
            'position': 'relative',
            'width': '100%',
            'padding': '8px 5px',
            'overflow': 'hidden'
        }).appendTo(this._scroller);


        this._scroll = new IScroll(container, {
            probeType: 1,
            useTransition: true,
            click: true,
            tap: true
        });

        //var loading = false;
        var self = this;
        this._scroll.on('scrollEnd', function () {
            if (this.y == 0) {
                //loading = true;
                var messages = self.get('messages');
                if (messages) {
                    //console.log('load_history');
                    observer.trigger(messages, 'load_history');
                }
            }
        });
    }

    util_base.inherits(MessageRender, MVCObject);

    MessageRender.prototype.messages_changed = function () {
        var newMessage = this.get('messages');
        var currentMessage = this._currentMessage;
        var listeners = this._msgEvts || (this._msgEvts = []);
        if (currentMessage) {
            this.clearMessages();
            for (var i = 0; i < listeners.length; i++) {
                observer.removeListener(listeners[i]);
            }
            listeners.length = 0;
            this._currentMessage = null;
        }
        if (newMessage) {
            initMessage(this, newMessage);
        }
    };
    MessageRender.prototype.clearMessages = function () {
        var data = this.get('data');
    };
    MessageRender.prototype.scrollMoveBottom = function(){
        //TODO
        var wrap = $(this._container).find(".wrap");
        var wrapLength = wrap.length;
        this.scrollRefresh();
        this._scroll.scrollToElement(".wrap:nth-child("+wrapLength+")",100);

    };
    MessageRender.prototype.scrollRefresh = function(){
        this._scroll.refresh();
    };

    function initMessage(instance, messages) {
        instance._currentMessage = messages;
        var listeners = instance._msgEvts || (instance._msgEvts = []);

        var listener1 = observer.addListener(messages, 'insert_at', function (messageInfo, index) {
            var render = Render[messageInfo.data.type];
            var messageDom;
            if (render) {
                var options = parseRenderOptions(instance, messageInfo);
                if (index == (messages.getLength() - 1)) { // 新消息
                    messageDom = render(messageInfo, options,instance);
                    $(instance._container).append(messageDom);

                    clearTimeout(instance.scrollMoveTimer);
                    instance.scrollMoveTimer = setTimeout(function(){instance.scrollMoveBottom();},500);
                } else { // 历史消息
                    messageDom = render(messageInfo, options,instance);
                    messageDom.insertBefore($(instance._container).children().first());

                    clearTimeout(instance.scrollRefreshTimer);
                    instance.scrollRefreshTimer = setTimeout(function(){instance.scrollRefresh()},500);
                }
            } else {
                //todo 未知消息类型
            }
            //instance._scroll.refresh();
        });
        var listener2 = observer.addListener(messages, 'remove_at', function (messageInfo, index) {
            var dataID = util_base.getUid(messageInfo);
            var dom = $(instance._container).find('[data-id="' + dataID + '"]');
            if (dom) {
                dom.remove();
            }
            if (messageInfo._statusListener) {
                observer.removeListener(messageInfo._statusListener);
                messageInfo._statusListener = null;
                delete messageInfo._statusListener;
            }
            instance._scroll.refresh();
        });
        listeners.push(listener1);
        listeners.push(listener2);
    }


    function parseRenderOptions(instance, messageInfo) {
        var options = {
            'align': 'left',
            'skin': 'default',
            'show_nickname': true,
            'show_time': false,
            'status': messageInfo.status || 'sending'
        };

        var currentUserInfo = instance.get('user');
        var messageData = messageInfo.data;
        if (messageData.sender.number == currentUserInfo.user_number && messageData.sender.role == currentUserInfo.role) {
            options['align'] = 'right';
            options['skin'] = 'primary';
            options['show_nickname'] = false;
        } else {
            options['align'] = 'left';
            options['skin'] = 'default';
            options['show_nickname'] = true;
        }

        var messages = instance.get('messages');
        var lastMsg = messages && messages.getAt(messages.getLength() - 2);
        if (!lastMsg || (messageInfo.data.create_time - lastMsg.data.create_time > showTimeInterval)) {
            options.show_time = true;
        }

        return options;
    }

    var tpl_wrap = '<div class="wrap"><div class="clearfix"><div class="message"><img class="avatar"/><div class="content"></div></div></div></div>';
    var tpl_text = '<div class="bubble"><div class="bubble_body"><div class="plain"><div class="plain-text"></div><img class="ico_loading" style="display:none" src="' + require.toUrl("page/IM/imgs/icon_loading.gif") + '" /><i class="icon-notice" style="display:none;"></i></div></div></div>';
    var tpl_card = '<div class="bubble"><div class="bubble_body"><div class="plain"><a href="" class="cardname"><div class="card-title"></div><div class="card-layout"><img class="card-img" /><div class="card-content"></div><div></div></div></a></div></div></div>';
    var tpl_image = '<div class="bubble"><div class="bubble_body"><div class="picture"><img /></div></div></div>';
    var tpl_time = '<p class="message_system"><span class="content"></span></p>';


    var Render = {};

    Render['system_time'] = function (createTime) {
        createTime = createTime || new Date().getTime();
        var $wrap = $(tpl_time);

        var currentTime = new Date();
        var messageTime = new Date(createTime);

        var rst = '';

        if (messageTime.getFullYear() != currentTime.getFullYear()) {
            rst += messageTime.getFullYear() + '年';
        }
        if (messageTime.getMonth() != currentTime.getMonth() || messageTime.getDate() != currentTime.getDate()) {
            rst += (messageTime.getMonth() + 1) + '月' + messageTime.getDate() + '日 ';
        }

        rst += messageTime.getHours() + ':' + util_number.format(messageTime.getMinutes(), 2);

        $wrap.find('.content').text(rst);

        return $wrap;
    };

    Render['text'] = function (messageInfo, options, instance) {
        var messageData = messageInfo.data;
        var $wrap = $(tpl_wrap);
        var dataId = util_base.getUid(messageInfo);

        $wrap.attr('data-id', dataId);

        $wrap.find('.content').html(tpl_text);

        $wrap.find('.avatar').attr('src', messageData.sender.avatar);
        //$wrap.find('.nickname').text(messageData.sender.name);
        $wrap.find('.plain-text').text(messageData.content);

        $wrap.find('.bubble').addClass(options.align);
        $wrap.find('.bubble').addClass(options.skin ? ('bubble_' + options.skin) : 'bubble_default');
        if (options.align == 'right') {
            $wrap.find('.message').addClass('me');
        }

        if (options.show_time) {
            var $time = Render.system_time(messageData.create_time);
            if ($time && $time.length > 0) {
                $time.insertBefore($wrap.find('.avatar'));
            }
        }
        //test-start
        if(options.status == "sending"){
            $wrap.find('.plain .ico_loading').show();
        }
        //$wrap.find('.plain .icon-notice').show();

        if (messageInfo.status != 'success') { // 消息状态更新
            //$wrap.find('.plain .ico_loading').show();
            messageInfo._statusListener = observer.addListener(messageInfo, 'statusUpdate', function (status) {
                var messageObject = $(instance._container).find('[data-id="' + dataId + '"]');
                if (status == 'success' || status == 'error') {
                    observer.removeListener(messageInfo._statusListener);
                    messageInfo._statusListener = null;
                    delete messageInfo._statusListener;
                    messageObject.find(".plain .ico_loading").hide();
                }
                if(status == "error"){
                    messageObject.find(".plain .icon-notice").show()
                }
            });
        }

        return $wrap;
    };

    Render['image'] = function (messageInfo, options) {
        var messageData = messageInfo.data;
        var $wrap = $(tpl_wrap);

        $wrap.attr('data-id', util_base.getUid(messageInfo));

        $wrap.find('.content').html(tpl_image);
        $wrap.find('.bubble').addClass(options.align);
        $wrap.find('.avatar').attr('src', messageData.sender.avatar);
        //$wrap.find('.nickname').text(messageData.sender.name);
        $wrap.find('.picture img').attr('src', messageData.content);

        $wrap.find('.bubble').addClass('bubble_default');
        $wrap.find('.bubble').addClass('no_arrow');
        if (options.align == 'right') {
            $wrap.find('.message').addClass('me');
        }

        if (options.show_time) {
            var $time = Render.system_time(messageData.create_time);
            if ($time && $time.length > 0) {
                $time.insertBefore($wrap.find('.avatar'));
            }
        }

        return $wrap;
    };

    Render['emoji'] = function (messageInfo, options) {
        var messageData = messageInfo.data;
        var $wrap = $(tpl_wrap);

        $wrap.attr('data-id', util_base.getUid(messageInfo));

        $wrap.find('.content').html(tpl_image);
        $wrap.find('.bubble').addClass(options.align);
        $wrap.find('.avatar').attr('src', messageData.sender.avatar);
        //$wrap.find('.nickname').text(messageData.sender.name);
        $wrap.find('.picture img').attr('src', messageData.content);

        $wrap.find('.bubble').addClass('bubble_default');
        $wrap.find('.bubble').addClass('no_arrow');
        //if (options.align == 'right') {
        //    $wrap.find('.message').addClass('me');
        //}

        if (options.show_time) {
            var $time = Render.system_time(messageData.create_time);
            if ($time && $time.length > 0) {
                $time.insertBefore($wrap.find('.avatar'));
            }
        }

        return $wrap;
    };

    Render['card'] = function (messageInfo, options, instance) {

        var messageData = messageInfo.data;

        var $wrap = $(tpl_wrap);

        $wrap.attr('data-id', util_base.getUid(messageInfo));

        $wrap.find('.content').html(tpl_card);

        $wrap.find('.bubble').addClass(options.align);
        $wrap.find('.bubble').addClass(options.skin ? ('bubble_' + options.skin) : 'bubble_default');


        $wrap.find('.avatar').attr('src', messageData.sender.avatar);

        $wrap.find('.cardname').attr('href', messageData.href);
        $wrap.find('.cardname img').attr('src', messageData.thumb);
        $wrap.find('.cardname .card-img').html(messageData.title);
        $wrap.find('.cardname .card-title').html(messageData.title);
        $wrap.find('.cardname .card-content').html(messageData.content);

        if (options.align == 'right') {
            $wrap.find('.message').addClass('me');
        }

        if (options.show_time) {
            var $time = Render.system_time(messageData.create_time);
            if ($time && $time.length > 0) {
                $time.insertBefore($wrap.find('.avatar'));
            }
        }

        return $wrap;
    };


    return MessageRender;
});