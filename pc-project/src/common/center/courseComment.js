/**
 * @file 机构班课评价
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var Editor = require('common/component/Editor');
    var Text = require('cobble/form/Text');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var service = require('../service');
    var SaveButton = require('common/component/SaveButton');
    var CancelOrderDialog = require('common/component/CancelOrderDialog');
    var MoreImageUploader = require('common/component/MoreImageUploader');
    var hash = {};
    var hashFiles = {}; // 多图上传
    // var hashCountFiles = {}; // 多图上传统计
    //
    // 图片旋转
    var Rotatable = require('common/component/Rotatable');
    var ImageDialog = require('common/component/ImageDialog');
    var rotateIndex = 1 ;
    var rotateHash = {} ;

    function dontConfirmOnLeave() {
        $(window).off('beforeunload');
    }

    /**
     * 初始化
     */
    exports.init = function () {

        var container = $('#content');
        var is_save = false;

        Tooltip.init(container.find('[data-title]'));

        var textarea = container.find('.form-editor');
        var actions = container.find('.action');
        var btninfos = container.find('.btn-comment');
        var userType = store.get('user').type === 0
                     ? 'teacher'
                     : 'student';
        var uploader = container.find('.upload-pics');

        // 多文件上传
        uploader.each(function (i, item) {

            // hashCountFiles[i] = 0;

            $(item).data('no', i); // 记录属于第几个表单

            hashFiles[i] = new MoreImageUploader({
                element: $(item),
                watermark: 'photo',
                previewWidth: 90,
                previewHeight: 70,
                maxCount: 5,
                onUploadStart: function () {
                    // 置灰提交按钮
                    btninfos.prop('disabled', true);
                },
                onUploadSuccess: function () {
                    // hashCountFiles[i]++;
                },
                onUploadComplete: function () {
                    btninfos.prop('disabled', false);
                }


            });

        });

        // 文本域剩余字数
        textarea.each(function (i, item) {
            var element = $(item);
            new Editor({
                element: element,
                maxLength: 200
            });
            /*
            new Text({
                element: element
            });*/

        });


        // 去掉default文案对编辑框字数的影响
        //container.find('.form-hint strong').html('200');
        // 评分默认选中5分
        container.find('.icon-star').addClass('scored');
        //对多个编辑框进行校验,校验值存入hash中
        actions.each(function (i, item) {
            hash[i] = new Validator({
                realtime: true,
                element: $(item),
                fields: {
                    info: {
                        rules: {
                            required: true,
                            maxlength: 200
                        },
                        errors: {
                            required: '请输入评价信息',
                            maxlength: '请将字数控制在 200 字以内'
                        }
                    }
                }
            });
        });

        /**
         * 提交评论
         */
        container

        // 评分功能
        .on('click', '.icon', function (e) {

            var element = $(this);
            var parent = element.parent();
            var grandparent = parent.parent().parent();

            // 已经评论过了
            if (grandparent.hasClass('reviewed')) {
                return;
            }

            var idx = element.index();

            for( var i = 0 ; i <= idx ; i++ ) {
                parent.find('.icon:eq(' + i + ')').addClass('star-shine').addClass('scored');
            }
            for( var j = 4 ; j > idx ; j-- ) {
                parent.find('.icon:eq(' + j + ')').removeClass('star-shine').removeClass('scored');
            }

        })

        .on('mouseenter', '.icon-star', function (e) {

            var element = $(this);
            var parent = element.parent();
            var grandparent = parent.parent().parent();

            // 已经评论过了
            if (grandparent.hasClass('reviewed')) {
                return;
            }

            var idx = element.index();
            for( var i = 0 ; i <= idx ; i++ ) {
                parent.find('.icon:eq(' + i + ')').addClass('star-shine');
            }
            for( var j = 4 ; j > idx ; j-- ) {
                parent.find('.icon:eq(' + j + ')').removeClass('star-shine');
            }

        })

        .on('mouseleave', '.star-score', function (e) {

            var element = $(this);
            var parent = element.parent().parent();

            // 已经评价过了
            if (parent.hasClass('reviewed')) {
                return;
            }

            element.find('.icon').each( function(i, item) {
                var sub_element = $(item);
                if( !sub_element.hasClass('scored') ){
                    sub_element.removeClass('star-shine');
                } else {
                    sub_element.addClass('star-shine');
                }
            });

        })

        .on('click', '.appeal-order', function (e) {

            var target = $(e.currentTarget);

            new CancelOrderDialog({
                userType: userType,
                type: 'appeal',
                url: target.data('url')
            });

        })

        .on('click', '.comment', function (e) {
            var element = $(this);
            var parent = element.parent().parent();
            container.find('.action').hide();
            container.find('.comment').show();
            parent.find('.action').show();
            element.hide();
        })

        // 评价图
        .on('click', '.photo-item', function (e) {
            var element = $(this);
            var parent = element.parent().parent();
            parent.find('.photo-item').removeClass('active');
            element.addClass('active');
            // 设置大图
            // 设置垂直间距
            var vertical = element.data('vertical');
            var vheight = element.data('vheight');
            var horizontal = element.data('horizontal');
            var hheight = element.data('hheight');
            var title = element.data('name');

            var photoWrapper = parent.find('.photo-wrapper');
            var floater = photoWrapper.find('.floater');
            var img = photoWrapper.find('.rotate-img');
            var photoName = parent.find('.photo-name');

            img.attr('src', horizontal);
            photoWrapper.css({'width':400,'height':300});
            floater.css({'margin-bottom':'-'+Math.floor(hheight/2)+'px'});
            photoName.text(title);
            parent.find('.comment-photo-player').show();

            // 初始化图片旋转
            var rotateImages = container.find('.photo-wrapper').find('img');

            if (!photoWrapper.data('rotateindex')) {
                rotateHash[rotateIndex] = new Rotatable({
                                                element: photoWrapper.find('.rotate-img'),
                                                callback: function () {
                                                }
                                            });
                photoWrapper.data('rotateindex',rotateIndex);
                rotateIndex++;
            } else {
                var index = photoWrapper.data('rotateindex');
                rotateHash[index].rotate({animateTo: 0,
                                      duration: 1});
            }
            photoWrapper.data('rotateangle',0);

        })

        .on('click', '.packup', function (e) {
            var element = $(this);
            var parent = element.parent().parent().parent();
            parent.find('.comment-photo-player').hide();
            parent.find('.photo-item').removeClass('active');
        })
        .on('click', '.sourse', function (e) {
            var element = $(this);
            var parent = element.parent().parent().parent();
            var images = parent.find('.photo-item');
            var curImg = parent.find('.active');
            var index = images.index(curImg);
            var data = images.map(function (index, item) {
                return {
                    url: $(item).data('image'),
                    title: $(item).data('name')
                };
            });

            new ImageDialog({
                data: data,
                index: index
            });
        })
        .on('click', '.left', function (e) {
            var element = $(this);
            var parent = element.parent().parent().parent();
            var photoWrapper = parent.find('.photo-wrapper');
            var index = photoWrapper.data('rotateindex');
            var angle = photoWrapper.data('rotateangle');
            var newangle = (angle-90);
            rotateHash[index].rotate({animateTo: newangle,
                                      duration: 1});
            photoWrapper.data('rotateangle',newangle);
        })
        .on('click', '.right', function (e) {
            var element = $(this);
            var parent = element.parent().parent().parent();
            var photoWrapper = parent.find('.photo-wrapper');
            var index = photoWrapper.data('rotateindex');
            var angle = photoWrapper.data('rotateangle');
            var newangle = (angle+90);
            rotateHash[index].rotate({animateTo: newangle,
                                      duration: 1});
            photoWrapper.data('rotateangle',newangle);
        })
        .on('click', '.photo-wrapper', function (e) {
            var element = $(this);
            element.parent().find('.packup').click();
        });
        /*
        .on('click', '.del', function (e) {
            var target = $(e.currentTarget);
            var action = target.closest('.action');
            var captionGroup = action.next('.form-group');
            var id = captionGroup.find('input[name="id"]').val();

            var i = action.closest('.upload-pics').data('no');  // 当前操作的第几个表单

            service
            .delCommentImg({
                storageId: id
            })
            .done(function (response) {
                if (response.code === 0) {
                    target.closest('li').remove();
                    hashCountFiles[i]--;
                }
            });

        })*/

        /**
         * 提交评价
         */
        btninfos.each(function (i, item) {
            var element = $(item);
            var teacher_id = $(item).data('tid');
            var purchase_id = $(item).data('pid');
            var parent = element.parent().parent().parent().parent();
            new SaveButton({
                element: $(item),
                saveText: '正在发送...',
                save: function () {

                    if (hash[i].validate()) {
                        var match = container.find('.star-score:eq(0)').find('.scored').length ;

                        if( !(match) ) {
                            alert("请进行评分！");
                            return false;
                        }

                        var data = {
                            purchase_id : purchase_id,
                            info : info ,
                            total_score : match,
                            teacher_user_id : teacher_id
                        };
                        var url = '/comment/addStudent';

                        if (userType == 'student') {

                            url = '/comment/addTeacher';


                            // 图片标题组 - 这里不对
                            var photoList = [];
                            var showImages = container.find('.show-images li');

                            showImages.each(function (key, item) {

                                var formGroup = $(this).find('.form-group');
                                var id = formGroup.find('input[name="id"]').val();
                                var title = formGroup.find('.caption').text();

                                photoList.push({
                                    'storage_id': id,
                                    'title': title
                                });

                            });
                            data['photo_list'] = photoList;

                        }

                        return service
                        .sendComment(
                            url,
                            data,
                            {
                                errorHandler: {
                                    '100061': function (response) { // 敏感词过滤

                                        var map = {
                                            'info': '评价信息'
                                        };

                                        var errorMsg = response.data;
                                        var content = '你';  // 你

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
                            if (response.code === 0) {
                                is_save = true;
                                success('评价成功！', function () {
                                    var extra = response.data && response.data.extra;
                                    if (extra) {
                                        if (extra.coupon) {
                                            var coupon = extra.coupon;

                                            var tip = $(''
                                                +   '<div class="comment-act">'
                                                +       '<div class="comment-act-mask">'
                                                +       '</div>'
                                                +       '<div>'
                                                +       '</div>'
                                                +   '</div>'
                                            ).appendTo('body');

                                            tip.fadeIn(1000);
                                            setTimeout(function () {
                                                location.reload();
                                            }, 3000);
                                        }
                                    }
                                    else {
                                        location.reload();
                                    }
                                });

                                // hashCountFiles[i]--; // 多图上传

                                /*location.href = userType === 'student'
                                              ? '/student_center/commentTeacher?page=1&page_size=10'
                                              : '/teacher_center/commentStudent?page=1&page_size=10';
                                */
                                /*
                                var desc_match_array = [];
                                var teach_result_array = [];
                                var service_attitude_array = [];
                                var face_html = '' ;

                                for (var i = 1; i < 6; i++) {
                                    if (desc_match >= i) {
                                        desc_match_array.push('<i class="icon icon-star scored star-shine"></i>');
                                    } else {
                                        desc_match_array.push('<i class="icon icon-star"></i>');
                                    }
                                    if (teach_result >= i) {
                                        teach_result_array.push('<i class="icon icon-star scored star-shine"></i>');
                                    } else {
                                        teach_result_array.push('<i class="icon icon-star"></i>');
                                    }
                                    if (service_attitude >= i) {
                                        service_attitude_array.push('<i class="icon icon-star scored star-shine"></i>');
                                    } else {
                                        service_attitude_array.push('<i class="icon icon-star"></i>');
                                    }
                                }

                                if (face_type == 1) {
                                    face_html = '<i class="icon icon-smile-o"></i>好评';
                                }
                                if (face_type == 2) {
                                    face_html = '<i class="icon icon-neutral-o"></i>中评';
                                }
                                if (face_type == 3) {
                                    face_html = '<i class="icon icon-frown-o"></i>差评';
                                }

                                var _html = ['<div class="face">'];
                                    _html.push(face_html);
                                    _html.push('</div>',
                                             '<ul class="score reviewed">',
                                                '<li>描述相符：',
                                                    '<span class="star-score">');
                                    _html.push(desc_match_array.join(''));
                                    _html.push('</span>',
                                               '</li>',
                                               '<li>教学态度：',
                                                    '<span class="star-score">');
                                    _html.push(teach_result_array.join(''));
                                    _html.push('</span>',
                                               '</li>',
                                               '<li>响应速度：',
                                                    '<span class="star-score">');
                                    _html.push(service_attitude_array.join(''));
                                    _html.push('</span>',
                                               '</li>',
                                             '</ul>',
                                             '<span class="status">已评价</span>');

                                success('评价成功！');
                                parent.find('.action').remove();
                                parent.find('.comment').remove();
                                parent.find('.content').html('心声：'+info).show();
                                parent.find('.info').html(_html.join('')).show();

                                var nextComment = parent.parent().find('.comment:eq(0)');
                                nextComment.click();
                                */
                            }
                        });

                    }
                }
            });
        });
        function confirmOnLeave() {
            $(window).on(
                'beforeunload',
                function () {
                    if (is_save) {
                        return;
                    } else {
                        return '评价内容尚未保存是否确定要离开？';
                    }
                }
            );
        }
        confirmOnLeave();
    };
});