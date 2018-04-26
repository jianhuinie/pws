/**
 * @file 多图片上传对话框
 * @author 曾诚
 */

define(function (require, exports) {

    var Dialog = require('cobble/ui/Dialog');
    var etpl = require('cobble/util/etpl');
    var MutiplyFileUpload = require('./MultiplyFileUpload');

    var namespace = '.fileUploadDialog';

    var IMAGE_ITEM_TPL = ''
        + '<!-- for: ${fileItems} as ${file} -->'
        + '<li class="image-item" data-file="${file.name}" data-index="${uploadCount}">'
        +     '<i class="icon icon-recycle-bin"></i>'
        +     '<div class="img-wrapper"><img src="" /></div>'
        +     '<div class="input-mark-wrapper">'
        +         '<input class="input-mark" type="text" maxlength="12" placeholder="添加描述，最多12个字"/>'
        +     '</div>'
        + '</li>'
        + '<!-- /for -->';

    var renderImage = etpl.compile(IMAGE_ITEM_TPL);

    var statusHandler = {
        error: function () {
            var me = this;
            return function (e, data){
                var file = data.fileItem.file;
                var cacheFile = me.cache[me.uploadCount][file.name];
                if (cacheFile) {
                    cacheFile.status = 'error';
                    me.updateStatus(cacheFile);
                }
            }
        },
        success: function () {
            var me = this;
            return function (e, data) {
                var response = $.parseJSON(data.responseText);
                var file = data.fileItem.file;
                var cacheFile = me.cache[me.uploadCount][file.name];

                if (cacheFile) {
                    if (response.code === 0) {
                        me.success++ ;
                        cacheFile.status = 'success';
                        cacheFile.id = response.data.id;
                        cacheFile.url = response.data.url + '@1e_180w_134h_1c_0i_1o_90Q_1x';
                    }
                    else {
                        cacheFile.status = 'error';
                    }
                    me.updateStatus(cacheFile);
                }
            }
        },
        start: function() {
            var me = this;
            return function (e, data) {
                var file = data.fileItem.file;
                var cacheFile = me.cache[me.uploadCount][file.name];
                if (cacheFile) {
                    cacheFile.status = 'start';
                    me.updateStatus(cacheFile);
                }
            }
        }
    };

    var renderImageDialogContent = function (files) {
        return this.tplRender({fileItems: files, uploadCount: this.uploadCount, maxPhoto: this.max});
    };

    var renderImageList = function (files) {
        return renderImage({fileItems: files, uploadCount: this.uploadCount, maxPhoto: this.max});
    };

    var buildCache = function (files) {

        var cache = {};
        for (var i = files.length - 1; i >= 0; i--) {
            var fileItem = files[i];
            cache[fileItem.name] = fileItem;
        };

        return cache;
    };

    /**
     * 多图片上传对话框
     * @param {Obejct} options
     * @property {Object} options.outterUpload 文件上传对象
     * @property {string} options.uploadSelector 内部添加按钮
     * @property {number} options.max 最多可上传的图片数
     * @property {string} options.fileItems 初始化文件列表
     * @property {string} options.tpl 对话框模板
     * @property {string} options.watermark 图片水印 “photo”照片水印，“cert”认证水印，默认不加
     * @property {Object} options.xhrProps xhr配置
     * @property {string} options.action 上传url
     * @property {string} options.fileName 文件内容名称
     * @property {function} options.onsave 保存图片
     * @property {function} options.oncancel 取消
     */
    function MutiplyImageUploadDialog(options) {

        $.extend(this, {max: 60}, options);
        this.init();
    }

    MutiplyImageUploadDialog.prototype.init = function () {

        var me = this;

        var outterUpload = me.outterUpload;
        var fileItems = me.fileItems;
        var cache = me.cache = [];
        var tplRender = me.tplRender = etpl.compile(me.tpl);

        me.uploadCount = 0;
        me.success = 0;
        cache.push(buildCache(fileItems));

        var mulImageDialog = me.dialog = new Dialog({
            skinClass: 'images-upload-dialog',
            width: 847,
            content: renderImageDialogContent.call(me, fileItems),
            onBeforeHide: function () {
                me.dispose();
            }
        });

        mulImageDialog.element
            .on('click', '.icon-recycle-bin', function () {
                var imageItem = $(this).parent();
                var index = imageItem.data('index');
                delete me.cache[index][imageItem.data('file')];
                imageItem.remove();
                if (imageItem.attr('success')) {
                    me.success--;
                    me.updateCountTip();
                }
                mulImageDialog.refresh(true);
            })
            .on('click', '.clear-btn', function () {
                confirm('删除后无法撤消，确认要清空已经上传的照片吗?', '温馨提示').done(function() {
                    if (typeof me.oncancel === 'function') {
                        me.oncancel(me.cache);
                    }
                    mulImageDialog.hide();
                });
            })
            .on('click', '.dialog-close', function () {
                if (typeof me.oncancel === 'function') {
                    me.oncancel(me.cache);
                }
                mulImageDialog.hide();
            })
            .on('click', '.save-btn', function () {
                if (me.max - me.success >= 0 && me.validateFiles()) {
                    me.getFiles();
                    if (typeof me.onsave === 'function') {
                        me.onsave(me.cache);
                    }
                } else {
                    me.dialog.element.find('.error-tip').text('照片数量超过限制，请删除' + (me.success - me.max) + '张');
                }
            });

        var innerUpload = me.innerUpload = new MutiplyFileUpload({
            element: $(me.uploadSelector, mulImageDialog.element),
            action: me.action,
            fileName: me.fileName,
            watermark: me.watermark,
            xhrProps: me.xhrProps,
            onchange: function (files) {
                me.uploadCount++;
                cache.push(buildCache(files));
                var html = renderImageList.call(me, files);
                $(html).insertAfter($('.images-wrapper .add-btn', mulImageDialog.element));
                mulImageDialog.refresh(true);
                innerUpload.upload();
            }
        });

        me.on('uploadError' + namespace, statusHandler.error.call(me))
          .on('uploadSuccess' + namespace, statusHandler.success.call(me))
          .on('uploadStart' + namespace, statusHandler.start.call(me));

        outterUpload.on('uploadError' + namespace, statusHandler.error.call(me))
          .on('uploadSuccess' + namespace, statusHandler.success.call(me))
          .on('uploadStart' + namespace, statusHandler.start.call(me));

        outterUpload.upload();
    };

    MutiplyImageUploadDialog.prototype.on = function () {

        var innerUpload = this.innerUpload;
        innerUpload.on.apply(innerUpload, arguments);
        return this;
    };

    MutiplyImageUploadDialog.prototype.updateCountTip = function () {
        var me = this;
        var leave = me.max - me.success;
        var element = me.dialog.element;
        var dialogElementHead = element.find('.img-list-header');
        var errorTip = dialogElementHead.find('.error-tip-wrapper');
        var tip = dialogElementHead.find('.leave-wrapper');
        var saveBtn = element.find('.save-btn');
        saveBtn.prop('disabled', false);
        saveBtn.text('确定');
        if (leave <= 0 ) {
            element.find('.add-btn').hide();
            if (leave < 0) {
                errorTip.find('.error-tip').text('最多保存60张，请删除' + (me.success - me.max) + '张再点击确定');
                errorTip.show();
                tip.hide();
                saveBtn.prop('disabled', true);
                saveBtn.text('请删除' + (me.success - me.max) + '张再点击确定');
            } else {
                errorTip.find('.error-tip').text('');
                errorTip.hide();
                tip.show();
            }
        } else {
            element.find('.add-btn').show();
            element.find('.error-tip').text('');
            errorTip.hide();
            tip.show();
        }

        dialogElementHead.find('.success').text(me.success);
        dialogElementHead.find('.leave').text(leave >= 0 ? leave : 0 );
    };

    MutiplyImageUploadDialog.prototype.updateStatus = function (file) {

        var me = this;
        var element = me.dialog.element.find('li[data-file="' + file.name + '"]')
                        .filter('[data-index="' + me.uploadCount + '"]');
        switch(file.status) {
            case 'success':
                element.find('.img-wrapper').removeClass('loading-bg');
                element.find('img').attr('src', file.url);
                element.attr('success', '1');
                me.updateCountTip();
                break;
            case 'error':
                element.find('.img-wrapper').removeClass('loading-bg').addClass('error-bg');
                break;
            case 'start':
                element.find('.img-wrapper').addClass('loading-bg');
                break;
            default:
                break;
        }

    };

    MutiplyImageUploadDialog.prototype.dispose = function () {
        this.cache = [];
        this.innerUpload.off(namespace);
        this.innerUpload.dispose();
        this.outterUpload.off(namespace);
        this.outterUpload.reset();
    };

    MutiplyImageUploadDialog.prototype.getFiles = function () {
        var imagesItems = this.dialog.element.find('li[data-file]');
        var cache = this.cache;
        var _item, _index;
        imagesItems.each(function(index, item){
            _item = $(item);
            _index = _item.data('index');
            cache[_index][_item.data('file')].title = $.trim(_item.find('.input-mark').val());
        });
    };

    MutiplyImageUploadDialog.prototype.validateFiles = function () {
        var imagesItems = this.dialog.element.find('li[data-file]');
        var _item, errorIndex = [];
        var firstInput;
        imagesItems.each(function(index, item){
            _item = $(item);
            if (_item.attr('success') == '1') {
                if(!$.trim(_item.find('.input-mark').val())) {
                    _item.addClass('empty');
                    errorIndex.push(index+1);
                    if (!firstInput) {
                        firstInput = _item.find('.input-mark');
                    }
                } else {
                    _item.removeClass('empty');
                }
            }
        });
        if (errorIndex.length) {
            alert({
                content: '您上传的第' + errorIndex.join('、') + '张照片没有添加描述信息，请完善后再确认上传',
                title: '温馨提示',
                buttons: [{
                            text: '确定',
                            type: 'primary',
                            handler: function () {
                                firstInput.focus();
                                this.hide();
                            }
                        }]
            });
            return false;
        }
        return true;
    };

    return MutiplyImageUploadDialog;
});