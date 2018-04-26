/**
 * @file 个人信息-我的照片
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Image = require('common/component/Image');
    var compressImage = require('common/function/compressImage');
    var MultiplyFileUpload = require('../component/MultiplyFileUpload');
    var MultiplyImageUploadDialog = require('../component/MultiplyImageUploadDialog');
    var RankImages = require('../component/RankImages');
    var service = require('common/service');
    var store = require('common/store');
    var JSON = require('cobble/util/json');

    var container = $('#content .photo');
    var triggerForm = container.find('.form-trigger');
    var status = 'display';
    var count, maxPhoto;
    var uploadDialog;

    function createImage(element, title) {
        new Image({
            element: element,
            caption: title,
            rename: function (data) {

                var target = $(data.event.currentTarget);
                var item = target.closest('[data-photo]');

                return service
                .editTeacherPhoto({
                    id: item.data('photo').id,
                    title: data.name
                })
                .done(function (response) {

                    if (response.code === 0) {
                        success('重命名成功');
                    }

                });
            },
            remove: function (data) {

                var target = $(data.event.currentTarget);
                var item = target.closest('[data-photo]');

                return service
                .delPhoto({
                    id: item.data('photo').id
                })
                .done(function (response) {

                    if (response.code === 0) {


                        if (count == 60) {
                            success('删除成功', function () {
                                location.reload();
                            });
                        }
                        else {
                            success('删除成功');
                            location.reload();

                            /*item.remove();
                            freshEditStatus();
                            count--;*/
                        }

                    }

                })
            }
        });
    }

    function display() {

    }

    function edit() {

    }

    function freshEditStatus() {
        var editBtn = container.find('.action-edit');
        if (count < 60) {
            editBtn.show();
        }
        else {
            editBtn.hide();
        }
    }

    function getPhotoOrder(items) {

        var order = [];
        $.each(items, function (index, item) {
            order.push(item.ele.data('photo').id);
        });
        return order.join(',');
    }

    /**
     * 保存照片顺序
     */
    function savePhotoOrder(order) {

        service.batchSort({
            order: order
        }).done(function () {
            success('保存成功');
        });
    }

    /*
     * 批量添加照片
     */
    function batchAddPhoto(photo) {
        service
        .batchAdd({
            photos: photo
        }).done(function (response) {
            if (response.code == 0) {
                success('照片上传成功');
                setTimeout(function () {
                    window.location.reload();
                }, 0);
            }
        });
    }

    exports.init = function () {

        var rankImages;
        var uploadURL = store.get('upload_origin') || '/user/previewImage';
        maxPhoto = store.get('maxPhoto');
        count = store.get('countPhoto');

        var addUpload = new MultiplyFileUpload({
            element: container.find('.action-edit input'),
            xhrProps: {
                withCredentials: true
            },
            action: uploadURL,
            fileName: 'attachment',
            watermark: 'photo',
            onchange: function (files) {
                    uploadDialog = new MultiplyImageUploadDialog({
                    uploadSelector: '.add-btn input[type=file]',
                    tpl: $('#imageUploadDialogTpl').html(),
                    fileItems: files,
                    fileName: 'attachment',
                    outterUpload: addUpload,
                    max: maxPhoto - count,
                    action: uploadURL,
                    watermark: 'photo',
                    xhrProps: {
                        withCredentials: true
                    },
                    onsave: function (files) {
                        var result = [];
                        var fileSets;
                        for(var i = 0, len = files.length; i < len; i++ ){
                            $.each(files[i], function (key, file) {
                                if (file.id && file.title) {
                                    result.push([file.id, file.title]);
                                }
                            });
                        }
                        batchAddPhoto(JSON.stringify(result));
                    }
                });
            }
        });

        // ajax 获取图片列表数据
        service
        .getPhotoList({
            page: 1,
            pageSize: 12
        })
        .done( function (response) {

            if (response.code === 0) {

                var responseData = response.data;
                var photoList = container.find('#photo-list');

                // 照片总数
                count = responseData.photo_list_tpl.pager.total;

                if (count) {
                    photoList.html(responseData.tpl.photo_list_tpl);
                    // 实例化所有照片对象
                    container
                    .find('.img-thumbnail')
                    .each(function () {

                        var element = $(this);

                        createImage(
                            element,
                            element.closest('li').data('photo').title
                        );

                    });

                    rankImages = new RankImages({
                        elementSelector: 'li[data-photo]',
                        container: photoList.find('.photo-list')
                    });

                    freshEditStatus();
                }
                else {
                    container.find('.noinfo').show();
                }
            }
        });

        container
        .on('click', '.action-edit', function () {
            //container.trigger('edit', { name: 'photo' });
        })

        .on('click', '.enable-order', function () {
            container.addClass('enable-rank');
            rankImages.enableRank();
        })

        .on('click', '.save-order', function () {
            var order;
            container.removeClass('enable-rank');
            rankImages.disableRank();
            order = getPhotoOrder(rankImages.getItemsInOrder());
            savePhotoOrder(order);
        })

        .on('click', '.cancel-order', function () {
            container.removeClass('enable-rank');
            rankImages.disableRank();
            rankImages.resetOrder();
        })

        .on('click', '.btn-cancel', function () {
            container.trigger('display', { name: 'photo' });
        })

        .on('save', function (e, data) {

            if (data.isSuccess) {

                count++;

                success('保存成功', function () {
                    location.reload();
                });
            }

        })

        .on('click', '.pager a', function (e) {

            var target = $(e.currentTarget);
            var page = target.data('page');

            // ajax 获取图片列表数据
            service
            .getPhotoList({
                page: page,
                pageSize: 12
            })
            .done( function (response) {

                if (response.code === 0) {

                    var responseData = response.data;
                    container.find('#photo-list').html(responseData.tpl.photo_list_tpl);

                    // 实例化所有照片对象
                    container
                    .find('.img-thumbnail')
                    .each(function () {

                        var element = $(this);

                        createImage(
                            element,
                            element.closest('li').data('photo').title
                        );

                    });

                    var isEnable = rankImages.enable;

                    rankImages = new RankImages({
                        elementSelector: 'li[data-photo]',
                        container: container.find('#photo-list').find('.photo-list')
                    });

                    isEnable && rankImages.enableRank()
                }
            });
        });

    };

    exports.status = function (value) {
        if (value !== undefined) {
            status = value;
            if (status == 'display') {
                display();
            }
            else if (status == 'edit') {
                edit();
            }
        }
        else {
            return status;
        }
    };

    exports.save = function () {
    };

    exports.cancel = function () {
    };

});