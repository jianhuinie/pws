define(function (require, exports) {

    var ClassPhotoCropDialog = require('teacherCenter/course/ClassPhotoCropDialog');

    var Validator = require('common/Validator');

    require('tpl!./photo/photoItem.tpl');

    var eventEmitter;

    var holder;

    var validator;

    var errorMsgs = {
        photo: {
            required: '班课图片不能为空！'
        }
    };

    var initClassPhotoCrop = function () {

        var dialog = new ClassPhotoCropDialog({
            onUploadComplete: function (response) {

                if (response.code === 0) {

                    addClassPhoto(response.data);

                    dialog.hide();
                }
            }
        })
    };

    var addClassPhoto = function (data) {
        holder.find('.uploaded-item-container').append(Simplite.render('photo-item', data));
        refreshCheckPhoto();
    };
    var refreshCheckPhoto = function () {
        validator.validate('photo');
        var photos = holder.find('.uploaded-item');
        for (var i = 0; i < photos.length; i++) {
            if (photos.eq(i).find('[type=radio]').attr('checked')) {
                return;
            }
        }
        photos.eq(0).find('[type=radio]').attr('checked', true);
    }

    var initValidator = function (options) {
        var validator = new Validator({
            rules: {
                required: function (val) {
                    return val.length > 0;
                }

            },
            elements: {
                photo: ['required'],
            },
            notifier: {
                photo: function (result, type, name) {
                    var $tipContainer = holder.find('.uploader-tip-container');
                    var msg;

                    if (result) {
                        $tipContainer.removeClass('invalid').addClass('valid').find('.icon-info-circle').text('');
                    } else {
                        $tipContainer.addClass('invalid').removeClass('valid');
                        if (msg = errorMsgs[name][type]) {
                            $tipContainer.find('.icon-info-circle').text(msg);
                        }

                    }
                }
            },
            vals: {
                photo: function () {
                    return holder.find('.uploaded-item');
                }
            }
        });

        validator.init(holder);

        return validator;
    };

    exports.init = function (evtEmitter) {

        holder = this;

        eventEmitter = evtEmitter;

        validator = initValidator();

        holder.on('click', '.add-photo', function () {
            var photos = holder.find('.uploaded-item');
            if (photos.length == 12) {
                alert('最多只能上传12张图片，请先删除需要更换的图片！');
                return;
            }
            initClassPhotoCrop();
        })

        .on('click', '.move-up', function () {
            var $parent = $(this).parent();
            $parent.insertBefore($parent.prev());
        })

        .on('click', '.move-down', function () {
            var $parent = $(this).parent();
            $parent.insertAfter($parent.next());
        })

        .on('click', '.delete-item', function () {
            var photos = holder.find('.uploaded-item');
            if (photos.length == 1) {
                alert({
                    title: '温馨提示',
                    content: '这已经是最后一张图片了，您确定要删除么？',
                    buttons: [{
                        text: "确定",
                        type: 'primary',
                        handler: function () {
                            this.hide();
                            photos.remove();
                            refreshCheckPhoto();

                        }
                    },{
                        text: "取消",
                        handler: function () {
                            this.hide();
                        }
                    }]
                });
                return;
            }
            $(this).parent().remove();
            refreshCheckPhoto();
        });

    };

    exports.validate = function (name) {

        return validator.validate(name);

    };

    exports.getData = function () {
        var imgs = holder.find('.uploaded-item-container img');
        var cover = holder.find(':radio[name="cover"]:checked').val();
        var photos = [];
        imgs.each(function (index, item) {
            var $item = $(item);
            photos.push({
                id: $item.data('id'),
                storage_id: $item.data('storageId')
            });
        });
        return {
            photos: photos,
            cover: cover
        };
    };
});