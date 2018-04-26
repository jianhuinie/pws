/**
 * @file 富文本编辑器
 * @author zhujialu
 */
define(function (require, exports, module) {
    'use strict';
    var lazyImage = require('common/lazyImage');

    return Ractive.extend({
        template: '<textarea class="rich-text-editor"></textarea>',
        data: function () {
            return {
                options: {
                    // 编辑器的内容
                    content: '',
                    // 初始化高度
                    initHeight: 400,
                    // 最大字数
                    maxLength: 1000,

                    // 图片最大宽度
                    maxImageWidth: 760,
                    // 实时的错误
                    error: '',
                    // 自动统计
                    length: 0
                }
            }
        },
        oncomplete: function () {

            var me = this;
            var container = me.getElement();

            var editor = new UE.ui.Editor({
                initialFrameHeight: me.get('options.initHeight'),
                initialFrameWidth: me.get('options.initWidth'),
                maximumWords: me.get('options.maxLength')
            });

            editor.render(container);

            editor.addListener('ready', function() {
                editor.setContent(
                    me.get('options.content')
                );
                lazyImage.init();
                // editor.enableAutoHeight();
                // lazyImage.init($($('#ueditor_0')[0].contentWindow.document));
                // hurry: 首屏图片
                // lazyImage.scanning(true, $($('#edui1_iframeholder').children()[0].contentWindow.document.body));
                // lazyImage.scanning(true, $($('#ueditor_0')[0].contentWindow.document));
            });

            var updateContent = function () {
                var iframe = editor.iframe;
                var doc = iframe.contentDocument || iframe.contentWindow.document;
                var tooLarge = false;
                $('img', doc).each(function () {
                    var element = this;
                    var $element = $(element);
                    if (element.complete && !$element.hasClass('loadingclass')) {
                        if (element.width > maxImageWidth) {
                            tooLarge = true;
                        }
                        $element.attr({
                            width: element.width
                            // height: element.height
                        });
                    }
                    else {
                        me.timer = setTimeout(updateContent);
                    }
                });
                var data = {
                    'options.content': editor.getContent(),
                    'options.length': editor.getContentLength(true),
                    'options.error': tooLarge
                        ? ('插入的图片宽度大于最大展现宽度 ' + maxImageWidth + 'px')
                        : ''
                };
                me.set(data);
            };

            var maxImageWidth = me.get('options.maxImageWidth');
            editor.addListener('contentchange', updateContent);

            me.editor = editor;

        },
        onteardown: function () {
            this.editor.destroy();
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        }
    });

});