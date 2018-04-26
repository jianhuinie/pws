/**
 * @author hurry
 * @date 2016/06/25
 */
define(function (require) {
    var $ = require('zepto');
    var upload = require('./upload');
    var wxAPI = require('./api');
    var wxConfig = require('./config');
    var app = require('common/app');
    var env = require('util/env');
    var ui = require('common/ui');
    var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
    isWeixin = false;
    var deviceRatio;

    /**
     *
     * @param  {Object} options [description]
     * @param  {string} options.placeholder 可以指定输入框的placeholder
     * @param  {element} options.source
     *         1、可以指定append对象，不指定默认body
     *         2、指定去掉position定位
     * @param  {function} options.callback 回调函数
     * 参数：
     *     data: {
     *         value: '', // 文字-字符串，音频和图片-url
     *         width: 100, // int
     *         height: 100 // int
     *         length: 100 // int 待定
     *     }
     *     type: 文字-1，图片-2，音频-3
     *     wx: 音频会传，做播放使用
     */
    $.jqwxInput = function (options) {
        var ratio = $('#viewport').attr('ratio');
        deviceRatio = 1;
        if (ratio < 1) {
            deviceRatio = window.devicePixelRatio;
        }
        // 插件的defaults
        var util = {
            /**
             * 停止事件的传播
             *
             * @param {Event} event 事件对象
             */
            stopPropagation: function (event) {
               if (event.stopPropagation) {
                   event.stopPropagation();
               } else {
                   event.cancelBubble = true;
               }
            },
            preventDefault: function (event) {
                //如果提供了事件对象，则这是一个非IE浏览器
                if ( event && event.preventDefault )
                //阻止默认浏览器动作(W3C)
                event.preventDefault();
                else
                //IE中阻止函数器默认动作的方式
                window.event.returnValue = false;
                return false;
            }
        };
        require(['text!./tpl.html'], function (tpl) {
            var defaultOptions = {
                template: tpl
            };
            var opts = $.extend({}, defaultOptions, options);
            var wx;
            var voiceId;
            var imgId;
            var wrapper = $(opts.template);
            var form = wrapper.find('form');
            var inputType = form.find('.input-type');
            var input = form.find('.input');
            var wxInput = input.find('.wx-input');
            var img = form.find('.img');
            var isWXInput = isWeixin;
            var dtd = $.Deferred();
            main();
            function main() {
                if (isWeixin) {
                    var types = [
                        wxConfig.TYPES.VOICE,
                        wxConfig.TYPES.IMAGE
                    ];
                    wxAPI.init({
                        types: types,
                        done: wxHandler
                    });
                }
                
                if (!$('.jq-wx-input').length) {
                    input.find('.keyboard-input').attr('placeholder', options.placeholder);
                    addStyle();
                    bindEvent();
                    changeInputType();
                    if (opts.source) {
                        $(opts.source).append(wrapper);
                    } else {
                        $(document.body).append(wrapper);
                    }
                }
            }

            function addStyle() {
                var wrapperStyle = {
                    width: '100%',
                    background: '#f5f5f7',
                    padding: 5 * deviceRatio + 'px 0',
                    borderTop: '1px solid #dfdfdf'
                };
                if (!opts.source) {
                    wrapperStyle.position = 'absolute';
                    wrapperStyle.left = '0';
                    wrapperStyle.right = '0';
                    wrapperStyle.bottom = '0';
                    wrapperStyle.zIndex = '200';
                }
                wrapper.css(wrapperStyle);
                form.css({
                    width: '100%',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                });
                form.find('img').css({
                    width: '100%',
                    height: '100%'
                });
                // form.css({
                //     display: '-webkit-box'
                // });
                inputType.css({
                    width: 28 * deviceRatio + 'px',
                    height: 28 * deviceRatio + 'px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    position: 'relative',
                    top: 3 * deviceRatio + 'px'
                });
                input.css({
                    display: 'inline-block',
                    width: '75%',
                    margin: '0 ' + 5 * deviceRatio + 'px',
                    fontSize: 15 * deviceRatio + 'px',
                });
                wxInput.css({
                    display: 'inline-block',
                    background: '#f5f5f7',
                    borderRadius: 4 * deviceRatio + 'px',
                    width: '92%',
                    textAlign: 'center',
                    height: 34 * deviceRatio + 'px',
                    verticalAlign: 'middle',
                    lineHeight: 34 * deviceRatio + 'px',
                    border: '1px solid #dfdfdf'
                });
                input.find('.keyboard-input').css({
                    paddingLeft: 10 * deviceRatio + 'px',
                    display: 'inline-block',
                    background: '#f5f5f7',
                    borderRadius: 4 * deviceRatio + 'px',
                    height: 32 * deviceRatio + 'px',
                    fontSize: 15 * deviceRatio + 'px',
                    width: '90%',
                    border: '1px solid #dfdfdf'
                });
                img.css({
                    width: 28 * deviceRatio + 'px',
                    height: 28 * deviceRatio + 'px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    top: 3 * deviceRatio + 'px',
                    position: 'relative'
                });
                img.find('.file').css({
                    position: 'absolute',
                    zIndex: 100,
                    height: 28 * deviceRatio + 'px',
                    width: 28 * deviceRatio + 'px',
                    left: '0px',
                    padding: '0px',
                    margin: '0px',
                    top: '0px',
                    opacity: '0'
                });
            }

            function download(serverId, type) {
                require(["common/service"], function(service) {
                    service.post("/Storage/uploadFromWeixin", {
                        server_id: serverId
                    }, function(res) {
                        if (res.code === '0') {
                            var data = res.data || {};
                            if (data.id) {
                                callback(data.id, type);
                            }
                        }
                    });
                });
            }

            function changeInputType() {
                var wxInputType = inputType.find('.wx');
                var keyboardInputType = inputType.find('.keyboard');
                var kbInput = input.find('.keyboard-input');
                if (isWXInput) {
                    wxInputType.show();
                    wxInput.show();
                    keyboardInputType.hide();
                    kbInput.hide();
                } else {
                    wxInputType.hide();
                    wxInput.hide();
                    keyboardInputType.show();
                    kbInput.show();
                    inputType.on('tap', function () {
                        kbInput[0].focus();
                    });
                }
            }

            function bindEvent() {
                form.on('submit', function (e) {
                    // form的submit函数
                    e.preventDefault();
                    callback(form.find('.keyboard-input').val(), 1);
                });

                if (isWeixin) {
                    inputType.on('click', function () {
                        isWXInput = !isWXInput;
                        changeInputType();
                    });
                    img.on('click', function () {
                        // if (!wx) {
                        //     ui.alert('微信初始化没有完成，请稍后重试！');
                        //     return;
                        // }
                        // wx.chooseImage({
                        //     count: 1, // 默认9
                        //     sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
                        //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        //     success: function (res) {
                        //         alert(res.localIds.join());
                        //         wx.uploadImage({
                        //             localId: res.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                        //             isShowProgressTips: 1, // 默认为1，显示进度提示
                        //             success: function (res) {
                        //                 alert(res.serverId);
                        //                 download(res.serverId, 2);
                        //             }
                        //         });
                        //     }
                        // });
                        dtd.done(function () {
                            wx.chooseImage({
                                count: 1, // 默认9
                                sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
                                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                                success: function (res) {
                                    alert(res.localIds.join());
                                    wx.uploadImage({
                                        localId: res.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                                        isShowProgressTips: 1, // 默认为1，显示进度提示
                                        success: function (res) {
                                            alert(res.serverId);
                                            download(res.serverId, 2);
                                        }
                                    });
                                }
                            });
                        });
                    });
                    img.find('.file').hide();
                } else {
                    img.find('.file').show();
                    // 图片上传
                    upload({
                        source: img.find('.file'),
                        callback: function (url) {
                            callback(url, 2);
                        }
                    });
                }

                input.on('touchstart', '.wx-input', function (e) {
                    wxInput
                        .css('background', '#dfdfdf')
                        .text('松开 结束');
                    dtd.done(function () {
                        wx.startRecord();
                        // 监听录音自动停止接口
                        wx.onVoiceRecordEnd({
                            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                            complete: function (res) {
                                voiceId = res.localId;
                                // console.log(voiceId);
                                uploadRecord();
                            }
                        });
                    });
                    // if (wx) {
                    //     wx.startRecord();
                    //     // 监听录音自动停止接口
                    //     wx.onVoiceRecordEnd({
                    //         // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                    //         complete: function (res) {
                    //             voiceId = res.localId;
                    //             // console.log(voiceId);
                    //             uploadRecord();
                    //         }
                    //     });
                    // } else {
                    //     // Todo: 换成系统alert
                    //     ui.alert('微信初始化没有完成，请稍后重试！');
                    // }
                    util.stopPropagation(e);
                    util.preventDefault(e);
                });
                input.on('touchend', '.wx-input', function () {
                    wxInput
                        .css('background', '#f5f5f7')
                        .text('按住 说话');
                    if (wx) {
                        stopRecord();
                    }
                });

                function uploadRecord() {
                    wx.uploadVoice({
                        localId: voiceId,
                        success: function (res) {
                            download(res.serverId, 3);
                        },
                        fail: function (res) {
                            ui.alert(JSON.stringify(res));
                        }
                    });
                }

                function stopRecord() {
                    wx.stopRecord({
                        success: function (res) {
                            voiceId = res.localId;
                            // console.log(voiceId);
                            uploadRecord();
                        }
                    });
                }
            }

            function callback(data, type) {
                if ($.isFunction(options.callback)) {
                    if (type === 1) {
                        input.find('.keyboard-input').val('');
                    }
                    options.callback(data, type, wx);
                }
            }

            function wxHandler(weixin) {
                wx = weixin;
                // 微信录音功能授权引发的交互问题
                if (!localStorage.rainAllowRecord || localStorage.rainAllowRecord !== 'true') {
                    wx.startRecord({
                        success: function() {
                            localStorage.rainAllowRecord = 'true';
                            wx.stopRecord();
                        },
                        cancel: function() {
                            ui.alert('用户拒绝授权录音');
                        }
                    });
                }
                dtd.resolve();
                // ui.alert(JSON.stringify(weixin));
            }
        });
    };
});