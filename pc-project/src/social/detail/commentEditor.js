/**
 * 社区-帖子详情页 评论
 * @author zengcheng
 */
define(function (require, exports) {

    var MultiplyFileUpload = require('teacherCenter/component/MultiplyFileUpload');
    var Editor = require('common/component/Editor');
    var service = require('common/service');
    var store = require('common/store');
    var proxyService = require('../common/proxyService');
    var ModifyProfileLandingDialog = require('../common/ModifyProfileLandingDialog');

    var errorHandler = {
        '800053': function () {
            new ModifyProfileLandingDialog({
                tpl: 'duply-nickname'
            });
        },
        '800054': function () {
            new ModifyProfileLandingDialog({
                tpl: 'no-nickname'
            });
        },
        '800055': function () {
            new ModifyProfileLandingDialog({
                tpl: 'no-avatar'
            });
        }
    };

    var statusHandler = {
        error: function () {
            return function (e, data){
                var file = data.fileItem.file;
                var index = fileManager.getCurrentFileIndex(file.name);
                var ele = container.find('.img-wrapper[data-index="' + index + '"]');
                ele.removeClass('loading-bg').addClass('error-bg');
            }
        },
        success: function () {
            return function (e, data) {
                var response = $.parseJSON(data.responseText);
                var file = data.fileItem.file;
                var index = fileManager.getCurrentFileIndex(file.name);
                var ele = container.find('.img-wrapper[data-index="' + index + '"]');
                ele.removeClass('loading-bg');
                if (response.code === 0) {
                    var fileRes = response.data;
                    var current = fileManager.getFile(index);
                    current.id = fileRes.id;
                    current.success= true;
                    ele.find('img').attr('src', fileRes.url + '@1e_80w_60h_1c_0i_1o_90Q_1x');
                }
                else {
                    ele.addClass('error-bg');
                }
            }
        },
        start: function() {
            return function (e, data) {
                var file = data.fileItem.file;
                var index = fileManager.getCurrentFileIndex(file.name);
                var ele = container.find('.img-wrapper[data-index="' + index + '"]');
                ele.addClass('loading-bg');
            }
        },
        complete: function () {
            return function () {
                fileManager.increment();
                if (fileManager.getCurrentOffset() === fileManager.getImages().length) {
                    addUpload.reset();
                }
            }
        }
    };



    var FileManager = function () {

        var uploadedImages, offset;
        var wrapper = container.find('.comment-img-list-wrapper');
        var listWrapper = wrapper.find('.comment-img-list');

        var freshUpload = function () {
            uploadedImages = [];
            offset = 0;
            listWrapper.html('');
            wrapper.hide();
        };

        var getCurrentFileIndex = function (fileName) {
            if (fileName) {
                var tmp;
                for (var i = uploadedImages.length - 1; i >= offset; i--) {
                    if ((tmp = uploadedImages[i]) && tmp.name === fileName ) {
                        return i;
                    }
                };
            }
        };

        var getFile = function (index) {
            return uploadedImages[index];
        };

        var addToContainer = function (files) {
            var file;
            var html = Simplite.render('social-detail-commentImgs', {
                data: files,
                start: offset
            });
            for (var i = 0, len = files.length; i < len; i++) {
                uploadedImages.push(files[i]);
            };
            listWrapper.append(html);
            wrapper.show();
        };

        var increment = function () {
            offset++;
        };

        var getCurrentOffset = function () {
            return offset;
        };

        var getImages = function (filter) {
            var result = filter ? [] : uploadedImages.slice(0);
            if (filter) {
                $.each(uploadedImages, function (index, item) {
                    if (filter(item)) {
                        result.push(item);
                    }
                });
            }
            return result;
        };

        var removeImage = function (index) {
            delete uploadedImages[index].success;
        };

        return {
            freshUpload: freshUpload,
            getCurrentFileIndex: getCurrentFileIndex,
            addToContainer: addToContainer,
            increment: increment,
            getCurrentOffset: getCurrentOffset,
            getImages: getImages,
            removeImage: removeImage,
            getFile: getFile
        };
    }

    var addUpload, container, fileManager, contentEditor;
    var namespace = '.fileUploadDialog';

    exports.init = function (events, data) {

        container = $(this);

        fileManager = FileManager();

        fileManager.freshUpload();

        // 发帖标题编辑器
        contentEditor = new Editor({
            element: container.find('.comment-content'),
            maxLength: 500,
            autoHint: 20,
            flexHeight: false
        });

        addUpload = new MultiplyFileUpload({
            element: container.find('.comment-show-photos input'),
            action: '/user/previewImage',
            fileName: 'attachment',
            onchange: function (files) {
                fileManager.addToContainer(files);
                addUpload.upload();
            }
        });

        addUpload.on('uploadError' + namespace, statusHandler.error())
          .on('uploadSuccess' + namespace, statusHandler.success())
          .on('uploadStart' + namespace, statusHandler.start())
          .on('uploadComplete' + namespace, statusHandler.complete());

        container.find('.comment-actions .btn').click(function () {
            var ids = [], result = {threadId: data.threadId};
            var button = $(this);
            button.prop('disabled', true);
            setTimeout(function () { button.prop('disabled', false)}, 3000);
            fileManager.getImages(function (item){
                return item.success && ids.push(item.id)
            });
            result.content = contentEditor.getValue();
            result.photoList = ids.join(',');
            if (result.content) {
                if (result.content.length <= 500) {
                    if (ids.length <= 6) {
                        proxyService.checkLogin().done(function (service){
                            service.postComment(result, errorHandler).done(function (response) {
                                if (!response.code) {
                                    contentEditor.setValue('');
                                    fileManager.freshUpload();
                                    events.emit('comment-saved', response.data);
                                }
                                button.prop('disabled', false);
                            });
                        });
                    } else {
                        alert('最多只能保存6张，请删除多余图片', '温馨提示');
                    }
                } else {
                    alert('评论不能超过500个字', '温馨提示')
                }
            } else {
                alert('评论不能为空', '温馨提示');
            }
        });

        container.find('.comment-img-list-wrapper')
        .on('click', '.icon-recycle-bin', function () {
            var item = $(this).closest('.img-wrapper');
            var index = item.data('index');
            if (item.siblings('.img-wrapper').length == 0) {
                item.closest('.comment-attach').find('.comment-img-list-wrapper').hide();
            }
            fileManager.removeImage(index);
            item.remove();
        });

        container.on('click', '.placeholder', function() {
            contentEditor.textarea.focus();
        });
    };

    exports.focus = function () {
        contentEditor.textarea.focus();
    };

});