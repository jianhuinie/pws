/**
 * @file 班课设置 - 课程照片
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Image = require('common/component/Image');
    var compressImage = require('common/function/compressImage');
    var ClassPhotoForm = require('./ClassPhotoForm');
    var RankImages = require('../component/RankImages');
    var service = require('common/service');
    var store = require('common/store');

    var container = $('#content .photo');
    var count = container.find('.photo-list > li').length;

    var status = 'display';
    var form;
    var formElement = container.find('.form');
    var triggerElement = count === 0
                        ? container.find('.form-trigger')
                        : container.find('.photo-showcase');

    function display() {
        triggerElement.show();
        formElement.hide();
    }

    function edit() {
        triggerElement.hide();
        form.refresh();
        formElement.show();
    }

    function createImage(element, title, courseNumber) {
        new Image({
            element: element,
            caption: title,
            rename: function (data) {

                var target = $(data.event.currentTarget);
                var item = target.closest('[data-photo]');

                return service
                .upsertClassCoursePhoto({
                    id: item.data('photo').id,
                    title: data.name,
                    courseNumber: courseNumber
                })
                .done(function (response) {

                    if (response.code === 0) {
                        success('重命名成功');
                    }

                });
            },
            beforeRemove: function () {
                if (store.get('hasStudent') && container.find('.img-thumbnail').length == 1) {
                    alert({
                        title: '温馨提示',
                        content: '抱歉，最后一张照片不能删除哦',
                        buttons: [
                            {
                                text: '我知道了',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                    return false;
                }
                else {
                    return true;
                }
            },
            remove: function (data) {

                var target = $(data.event.currentTarget);
                var item = target.closest('[data-photo]');

                return service
                .delClassCoursePhoto({
                    id: item.data('photo').id,
                    courseNumber: courseNumber
                })
                .done(function (response) {

                    if (response.code === 0) {

                        count--;

                        success('删除成功', function () {
                            location.reload();
                        });

                    }

                })
            }
        });
    }

    function freshEditStatus() {
        var editBtn = container.find('.action-edit');
        if (container.find('.photo-list > li').length < 12) {
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

    function savePhotoOrder(order) {

        var courseNumber = store.get('data').number;

        service.courseBatchSort({
            order: order,
            courseNumber: courseNumber
        }).done(function () {
            success('保存成功');
            setTimeout(function() {
                window.location.reload();
            }, 0);
        });
    }

    exports.init = function () {

        var rankImages = new RankImages({
            elementSelector: 'li[data-photo]',
            container: container.find('.photo-list'),
            onDrop: function (curEle, mouseEle) {
                if (mouseEle.hasClass('first')) {
                    mouseEle.removeClass('first');
                    curEle.addClass('first');
                }
            },
            onReset: function () {
                var elements = this.elementsOffset;
                for (var i = elements.length - 1; i >= 0; i--) {
                    elements[i].ele.removeClass('first');
                    if (i == 0) {
                        elements[i].ele.addClass('first');
                    }
                }
            }
        });

        var courseNumber = store.get('data').number;

        container
        .find('.img-thumbnail')
        .each(function () {

            var element = $(this);

            createImage(
                element,
                element.closest('li').data('photo').title,
                courseNumber
            );

        });

        var data = {
            number: store.get('data').number
        }

        form = new ClassPhotoForm({
            element: container.find('.form'),
            data: data
        });

        freshEditStatus();

        container
        .on('click', '.action-edit', function () {
            container.trigger('edit', { name: 'photo' });
        })

        .on('click', '.btn-cancel', function () {
            container.trigger('display', { name: 'photo' });
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

        .on('save', function (e, data) {

            if (data.isSuccess) {

                count++;

                success('保存成功', function () {
                    location.reload();
                });

            }

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
        form.save();
    };

    exports.cancel = function () {
        form.cancel();
    };

});