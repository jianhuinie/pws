/**
 * @file 图文详情
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict'
    var PreviewDetail = require('../common/PreviewDetail');
    var ractiveDialog = require('userCenter/common/function/ractiveDialog');

    return Ractive.extend({
        template: require('html!./OfflineDetailEdit.html'),
        data: function () {
            return {
                style: require('text!./OfflineDetailEdit.styl'),
                errorContent: '',
                editorOptions: {
                    style: 'white',
                    list: []
                },
                options: {
                    style: '',
                    list: []
                }
            };
        },
        components: {
            Editor: require('../../common/component/editor/Editor'),
        },
        onrender: function () {
            var me = this;
            me.bindData({
                'editorOptions': 'options'
            });
            me.on('*.titleError', function (data) {
                me.validate();
            });
        },
        preview: function () {
            var me = this;
            // var errorContent = me.validate();
            // me.set('errorContent', errorContent);

            me.dialog = ractiveDialog(
                PreviewDetail,
                {
                    title: '',
                    skinClass: 'preview-detail-dialog'
                },
                {
                    list: me.get('editorOptions'),
                    close: function () {
                        me.dialog.hide();
                    }
                }
            );

            me.dialog.show();
        },
        validate: function () {
            var me = this;
            var list = me.get('options.list');
            var errorContent = '';
            var indexs = [];
            $.each(
                list,
                function (index, value) {
                    var options = value.options;
                    if (value.type == 'title') {
                        var text = options.text;
                        if (!text) {
                            indexs.push(index);
                        }
                        else if (text.length > 10) {
                            errorContent = '标题最多输入十个字哦';
                        }
                    }
                    else if (value.type == 'body'){
                        if (!options.text) {
                            indexs.push(index);
                        }
                        else if (/<script/i.test(options.text)) {
                            errorContent = '正文输入不合法的';
                        }
                    }
                    else if (value.type == 'image') {
                        if (options.uploading) {
                            errorContent = '请等待图片上传完成';
                        }
                        else if (!options.storage_id && !options.url) {
                            indexs.push(index);
                        }
                    }
                    else if (value.type == 'video') {
                        if (options.uploading) {
                            errorContent = '请等待视频上传完成';
                        }
                        else if (!options.video_id) {
                            indexs.push(index);
                        }
                    }
                    else if (value.type == 'audio') {
                        if (options.uploading) {
                            errorContent = '请等待音频上传完成';
                        }
                        else if (!options.storage_id) {
                            indexs.push(index);
                        }
                    }
                }
            );
            me.set('errorContent', errorContent);
            indexs.reverse();
            if (!errorContent) {
                $.each(indexs, function (index, value) {
                    list.splice(value ,1)
                });
            }
            return errorContent;
        },
        getData: function () {
            var me = this;
            var data = { };
            var detail = me.get('options')

            data.intro = {};
            data.intro.style = detail.style ? detail.style : 'white';
            var introList = [];
            $.each(
                detail.list,
                function (index, item) {
                    var type = item.type;
                    if (type == 'title') {
                        introList.push({
                            type: type,
                            text: item.options.text
                        });
                    }
                    else if (type == 'body') {
                        var text = item.options.text.replace(/\n/g, '<br>');
                        introList.push({
                            type: type,
                            text: text,
                            font_weight: item.options.isBold ? 'bold' : 'normal',
                            font_size: item.options.isBig ? '17px': '15px',
                            text_align: item.options.isCenter ? 'center': 'left',
                            color: item.options.color
                        });
                    }
                    else if (type == 'image') {
                        introList.push({
                            type: type,
                            storage_id: item.options.storage_id,
                            url: item.options.url
                        });
                    }
                    else if (type == 'video') {
                        introList.push({
                            type: type,
                            cover: item.options.cover,
                            video_id: item.options.video_id
                        });
                    }
                    else if (type == 'audio') {
                        introList.push({
                            type: type,
                            storage_id: item.options.storage_id,
                            url: item.options.url
                        });
                    }
                }
            );
            data.intro.items = introList;
            return data;
        }
    });
})