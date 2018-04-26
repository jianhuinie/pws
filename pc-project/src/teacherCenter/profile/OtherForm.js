/**
 * @file 其他信息表单
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {string} options.content 内容
     */
    function OtherForm(options) {
        $.extend(this, options);
        this.init();
    }

    OtherForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            me.editor = new UE.ui.Editor({
                initialFrameHeight: 200,
                maximumWords: 5000
            });

            me.editor.render(
                element.find('.editor')[0]
            );

            me.saveButton = new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    var content = me.editor.getContent();
                    var len = me.editor.getContentLength(true);

                    if (len.length > 5000) {
                        alert('请不要输入超过 5000 个字');
                        return;
                    }

                    var iframe = me.editor.iframe;
                    var doc = iframe.contentDocument || iframe.contentWindow.document;
                    var tooLarge = false;

                    $('img', doc).each(function () {

                        $(this).attr({
                            width: this.width,
                            height: this.height
                        });

                        if (this.width > 760) {
                            tooLarge = true;
                        }
                    });


                    if (tooLarge) {
                        alert({
                            title: '温馨提示',
                            content: '插入的图片宽度大于最大展现宽度 760px，请进行缩小处理吧',
                            width: 400
                        });
                        return;
                    }

                    return service
                    .editTeacherOtherInfo(
                        {
                            content: content
                        },
                        {
                            errorHandler: {
                                '100061': function (response) { // 敏感词过滤

                                    var map = {
                                        'other_info': '更多详情'
                                    };

                                    var errorMsg = response.data;
                                    var content = '你';

                                    $.each(errorMsg, function (index, item) {

                                        if (item.length) {
                                            content += '<span class="sensitive">在<em>' + map[index] + '</em>中输入的内容包含';
                                            $.each(item, function (i, j) {
                                                content += '“<em>' + j + '</em>”';
                                            });
                                            content += '；</span><br />';
                                        }

                                    });

                                    content += '请删除后重新输入';

                                    alert({
                                        title: '温馨提示',
                                        content: content,
                                        width: 450,
                                        buttons: [
                                            {
                                                text: '确定',
                                                type: 'primary',
                                                handler: function () {
                                                    this.hide();
                                                }
                                            }
                                        ]
                                    });

                                }
                            }
                        }
                    )
                    .done(function (response) {

                        var isSuccess = response.code === 0;
                        var oldContent = me.content;

                        if (isSuccess) {
                            me.content = content;
                        }

                        element.trigger(
                            'save',
                            {
                                content: me.content,
                                isSuccess: isSuccess,
                                isNew: oldContent == null
                            }
                        );

                        return response;
                    });
                }
            })
        },

        refresh: function () {

            var me = this;

            me.editor.setContent(
                String(me.content || '')
            );
        },

        save: function () {
            this.element.find('.btn-save').click();
        },

        cancel: function () {
            this.element.find('.btn-cancel').click();
        }

    };

    return OtherForm;

});