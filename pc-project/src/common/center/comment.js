/**
 * @file 课程评价
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
    var Tooltip = require('cobble/ui/Tooltip');

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
        var userType = store.get('user').type === 0
                     ? 'teacher'
                     : 'student';
        var btnComment = container.find('.btn-comment');

        // var countFile = 0; // 随时计算当前上传图片数目
        var uploadPics = container.find('.upload-pics');
        // 多文件上传
        var uploader = new MoreImageUploader({
            element: uploadPics,
            watermark: 'photo',
            previewWidth: 90,
            previewHeight: 70,
            maxCount: 5,
            onUploadStart: function () {
                // 置灰发表评论按钮
                btnComment.prop('disabled', true);
            },
            onUploadSuccess: function () {
                /*
                countFile++;
                if (countFile >= 5) {
                    this.disabled;
                    uploadPics.find('.btn-upload').removeClass('btn-primary').addClass('btn-gray');
                    uploadPics.find('input').prop('disabled', true);
                }
                */
            },
            onUploadComplete: function () {
                btnComment.prop('disabled', false);
            }

        });

        // 文本域剩余字数
        new Editor({
            element: textarea,
            maxLength: 200
        });

        /*new Text({
            element: textarea
        });*/

        // 评分默认选中5分
        container.find('.icon-star').addClass('scored');
        var validator = new Validator({
            realtime: true,
            element: container.find('#comment-form'),
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

        container
        // 评分功能
        .on('click', '.icon', function (e) {

            var element = $(this);
            var parent = element.parent();

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

        });

        /**
         * 提交评价
         */
        new SaveButton({
            element: btnComment,
            saveText: '正在发送...',
            save: function () {

                if (validator.validate()) {

                    var info = $.trim(container.find('textarea').val());
                    var match = container.find('.star-score:eq(0)').find('.scored').length ;

                    if( !(match) ) {
                        alert("请进行评分！");
                        return false;
                    }

                    if( info == '对你的老师评价吧!' || info == '对你的学生评价吧!' ) {
                        alert('请输入评价！');
                        return false;
                    }
                    var purchase_id = parseInt($.trim($('.order-id').html()).substr(4),10);
                    var data = {
                        purchase_id : purchase_id,
                        info : info,
                        total_score: match
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
                                        location.href = userType === 'student'
                                          ? '/student_center/commentTeacher?page=1&page_size=10'
                                          : '/teacher_center/commentStudent?page=1&page_size=10';
                                    }, 3000);

                                }
                            }
                            else {
                                location.href = userType === 'student'
                                    ? '/student_center/commentTeacher?page=1&page_size=10'
                                    : '/teacher_center/commentStudent?page=1&page_size=10';
                            }

                        }
                    });

                }
            }
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