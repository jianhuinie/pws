/**
 * @file  课节评价详情页
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var CancelOrderDialog = require('common/component/CancelOrderDialog');

    var Editor = require('common/component/Editor');
    var MoreImageUploader = require('common/component/MoreImageUploader');
    var Validator = require('cobble/form/Validator');
    var store = require('common/store');
    var service = require('../service');
    var SaveButton = require('common/component/SaveButton');
    var Tooltip = require('cobble/ui/Tooltip');

    var hash = {};
    var hashFiles = {}; // 多图上传

    function dontConfirmOnLeave() {
        $(window).off('beforeunload');
    }

    function commentReport(stype) {
        var params = {
            type: 'PC_Myorder',
            stype: stype,
            user_number: store.get('user').number
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);
    }

    exports.init = function () {

        var container = $('#main');
        var is_save = false;

        Tooltip.init(container.find('[data-title]'));

        var textarea = container.find('.form-editor');
        var uploader = container.find('.upload-pics');
        var commentForm = container.find('.comment-form');
        var btninfos = container.find('.btn-comment');
        var userType = store.get('user').type === 0
             ? 'teacher'
             : 'student';
        var lessonList = container.find('.lesson-list');
        var commentStatus = 1;

        // 文本域剩余字数
        textarea.each(function (i, item) {
            var element = $(item);
            new Editor({
                element: element,
                maxLength: 500,
                minLength: 15
            });
        });

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

        commentForm
        .on("click",".form-radio",function (e){
            var thiz = this;
            var data = $(thiz).find('input[type="radio"]').val();
            commentForm.find(".placeholder").remove();
            commentStatus = parseInt(data);
            if(parseInt(data) != 1){
                var status = parseInt(data) == 2?'中':'差';
                commentForm.find(".form-text").attr("placeholder","您给老师打了"+status+"评，快把您的不满告诉我们...");
            }else{
                var stars = $.map($(thiz).parent().parent().find(".score").find(".star-score"),function(num){
                    return parseInt($(num).attr("sum") ? $(num).attr("sum") : 5);
                });
                var min = Math.min(stars[0],stars[1],stars[2]);
                if(min < 2){
                    commentForm.find(".form-text").attr("placeholder","您给老师打了"+(min+1)+"颗星，快把您的不满告诉我们...");
                }else{
                    commentForm.find(".form-text").attr("placeholder","快来写下你对老师的评价吧，还可以点击下方的“晒照片”秀几张图哦！");
                }
            }
        });

        container
        .on('click', '.trigger', function (e) {
            var target = $(e.currentTarget);
            var lessonItem = target.closest('.lesson-item');
            var commentBox = lessonItem.find('.comment-box');

            lessonList
            .find('.lesson-item')
            .each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                    $(item).find('.comment-box').hide();
                }
            });

            if (lessonItem.hasClass('active')) {
                lessonItem.removeClass('active');
                commentBox.hide();
            } else {
                lessonItem.addClass('active');
                commentBox.show();
            }

        })

        .on('click', '.teacher', function (e) {
            var target = $(e.currentTarget);
            var teacherList = target.closest('.teacher-list');

            if (!target.hasClass('active')) {
                teacherList
                .find('.teacher')
                .each(function (index, item) {
                    $(item).removeClass('active');
                });
                target.addClass('active');
            }
        })

        .on('click', '.icon-star', function (e) {
            var target = $(e.currentTarget);
            var starScore = target.parent();

            var idx = target.index();
                starScore.attr("sum",idx);
            for(var i = 0 ; i <= idx ; i++) {
                starScore.find('.icon:eq(' + i + ')').addClass('star-shine').addClass('scored');
            }
            for(var j = 4 ; j > idx ; j--) {
                starScore.find('.icon:eq(' + j + ')').removeClass('star-shine').removeClass('scored');
            }
            if(commentStatus != 1){
                return;
            }


            var stars = $.map($(starScore).parent().parent().find(".star-score"),function(num){
                return parseInt($(num).attr("sum") ? $(num).attr("sum") : 5);
            });

            var min = stars[0];
            if (stars[0] == 0) {
                commentForm.find(".placeholder").remove();
                commentForm.find(".form-text").attr("placeholder","对老师不满意？可以先跟老师沟通一下哦");
            }
            else if(stars[0] <= 2 ){
                commentForm.find(".placeholder").remove();
                commentForm.find(".form-text").attr("placeholder","说说老师哪儿可以改进，帮助老师一起进步吧");
            }
            else if ( stars[0] > 2 && stars[0] <= 4) {
                commentForm.find(".placeholder").remove();
                commentForm.find(".form-text").attr("placeholder","写点感受吧，对其他同学很有帮助哦~");
            }
            else{
                commentForm.find(".form-text").attr("placeholder","老师水平怎么样？教学效果好不好？说说你的感受吧");
            }
        })

        .on('mouseenter', '.icon-star', function (e) {
            var target = $(e.currentTarget);
            var starScore = target.parent();

            var idx = target.index();
            for(var i = 0 ; i <= idx ; i++) {
                starScore.find('.icon:eq(' + i + ')').addClass('star-shine');
            }
            for(var j = 4 ; j > idx ; j--) {
                starScore.find('.icon:eq(' + j + ')').removeClass('star-shine');
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

        .on('click', '.appeal-order', function (e) { // 我要申诉／申请退款

            var target = $(e.currentTarget);

            new CancelOrderDialog({
                userType: userType,
                type: 'appeal',
                url: target.data('url')
            });
        })

        .on('click', '.cancel-order', function (e) { // 取消订单

            var target = $(this);

            var data = {
                userType: userType,
                type: 'order',
                url: target.data('url')
            };

            if (userType === 'student') {
                data.price = store.get('restPrice');
            }

            new CancelOrderDialog(data);
        });

        // 打开 可评论的最近一条 或 指定number的 评论
        var openItemSerial = container.find('#open-item').data('open');
        if (store.get('serialNum') != '') {
            openItemSerial = store.get('serialNum');
        }

        lessonList
        .find('.lesson-item')
        .each(function (index, item) {
            if ($(item).data('serial') == openItemSerial) {
                $(item).find('.trigger').trigger('click');
                return;
            }
        });

        //对多个编辑框进行校验,校验值存入hash中
        commentForm.each(function (i, item) {
            hash[i] = new Validator({
                realtime: true,
                element: $(item),
                fields: {
                    info: {
                        rules: {
                            required: true,
                            maxlength: 500,
                            minlength: 15,
                        },
                        errors: {
                            required: '请输入评价信息',
                            maxlength: '请将字数控制在 500 字以内',
                            minlength: '至少输入15个字',
                        }
                    }
                }
            });
        });

        // 提交评价
        btninfos.each(function (i, item) {
            var element = $(item);
            var lessonItem = element.closest('.lesson-item');

            var purchaseId = store.get('purchaseId');

            new SaveButton({
                element: $(item),
                saveText: '正在发送...',
                save: function () {

                    commentReport('makecomments_click');

                    if (hash[i].validate()) {
                        // 老师number
                        var teacherNum;
                        lessonItem
                        .find('.teacher')
                        .each(function (i, item) {
                            if ($(item).hasClass('active')) {
                                teacherNum = $(item).data('num');
                            }
                        });

                        // 星评
                        var match = lessonItem.find('.star-score').find('.star-shine').length;

                        if(!match) {
                            alert("星星不能空着哦~给老师打个分吧~");
                            return false;
                        }

                        // 评价描述
                        var info = $.trim(lessonItem.find('textarea').val());

                        // 图片标题组
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

                        // 匿名评价
                        var anonymous = 0;
                        var anonymousInput = lessonItem.find('input[name=anonymous]');
                        if (anonymousInput.prop('checked')) {
                            anonymous = 1;
                        }

                        var data = {
                            purchaseId: purchaseId,
                            serialNo: lessonItem.data('serial'),
                            teacherNum: teacherNum,
                            total_score: match,
                            info: info,
                            photoList: photoList,
                            anonymous: anonymous,
                            skip_verify: 1
                        };

                        return service
                        .addCommentMore(
                            data,
                            {
                                errorHandler: {
                                    '100061': function (response) { // 敏感词过滤

                                        // var map = {
                                        //     'info': '评价信息'
                                        // };

                                        // var errorMsg = response.data;
                                        // var content = '你';  // 你

                                        // $.each(errorMsg, function (index, item) {

                                        //     if (item.length) {
                                        //         content += '<span class="sensitive">在<em>' + map[index] + '</em>中输入的内容包含';
                                        //         $.each(item, function (i, j) {
                                        //             content += '“<em>' + j + '</em>”';
                                        //         });
                                        //         content += '；</span><br />';
                                        //     }

                                        // });

                                        // content += '请删除后重新输入';

                                        alert({
                                            title: '温馨提示',
                                            content: '您的评价中包含违禁词语，请修改后再发送',
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
                                    },
                                    '888889': function (response) { //竞品中差评

                                        alert({
                                            title: '温馨提示',
                                            content: '平台禁止竞品老师之间恶意中差评，如违规且被核实会被扣分，请如实评价哦～',
                                            width: 450,
                                            buttons: [
                                                {
                                                    text: '暂不发布',
                                                    type: 'muted',
                                                    handler: function () {
                                                        this.hide();
                                                    }
                                                },
                                                {
                                                    text: '继续评价',
                                                    type: 'primary',
                                                    handler: function () {
                                                        this.hide();
                                                        data.skip_verify = 0;
                                                        service
                                                            .addCommentMore(data, {})
                                                            .done(function (response) {
                                                                if (response.code === 0) {
                                                                    is_save = 'true';
                                                                    success('评价成功！', function () {
                                                                        commentReport('makecomments_succeed');
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

                                                                }
                                                            });
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
                                is_save = 'true';
                                success('评价成功！', function () {
                                    commentReport('makecomments_succeed');
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

                            }
                        });

                    }
                }
            });
        });
        // 离开前弹窗
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