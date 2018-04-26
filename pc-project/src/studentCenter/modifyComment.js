/**
 * @file 学生用户中心 中差评改好评
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Editor = require('common/component/Editor');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var store = require('common/store');
    var service = require('common/service');
    var commentForm = require('./commentForm');

    function dontConfirmOnLeave() {
        $(window).off('beforeunload');
    }

    exports.init = function () {


        var container = $('#content');
        var formElement = container.find('.form');
        commentForm.init();
        var is_save = false;

        // 评价内容
        new Editor({
            element: formElement.find('.form-editor'),
            maxLength: 500
        });

        container
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


            var stars = $.map($(starScore).parent().parent().find(".star-score"),function(num){
                return parseInt($(num).attr("sum") ? $(num).attr("sum") : 5);
            });
            var min = Math.min(stars[0],stars[1],stars[2]);
            container.find(".placeholder").remove();
            if(min < 2){
                container.find('.form-editor').find(".form-text").attr("placeholder","您给老师打了"+(min+1)+"颗星，快把您的不满告诉我们...");
            }else{
                container.find('.form-editor').find(".form-text").attr("placeholder","修改为好评的同时别忘了修改评语内容哦！");
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
        .on('click', '.btn-default', function(e) {
            alert({
                title: '温馨提示',
                content: '评价尚未保存是否确定要离开',
                buttons: [{
                    text: '确定',
                    type: 'primary',
                    handler: function(){
                        location.href = '/student_center/commentTeacher';
                    }
                }]
            });
        });
        // 验证对象
        var validator = new Validator({
            element: formElement,
            realtime: true,
            fields: {
                info: {
                    rules: {
                        required: true,
                        maxlength: 500,
                        minlength: 15
                    },
                    errors: {
                        required: '请输入评价信息',
                        maxlength: '请将字数控制在 500 字以内',
                        minlength: '请将字数控制在 15 字以上'
                    }
                }
            }
        });

        // 保存表单
        new SaveButton({

            element: formElement.find('.btn-save'),
            saveText: '正在发送...',

            save: function () {

                if (validator.validate()) {

                    // 星评
                    var match = formElement.find('.star-score').find('.star-shine').length;

                    //如果是五星就不可以修改评分了
                    if (store.get('totalScore') < 5 ) {
                        if (match <= store.get('totalScore')) {
                            alert({
                                title: '温馨提示',
                                content: '当前只支持改为高分哦',
                                width: 300,
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
                            return false;
                        }
                    }
                    else {
                        if (match < 5) {
                            alert({
                                title: '温馨提示',
                                content: '当前只支持改为高分哦',
                                width: 300,
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
                            return false;
                        }
                    }

                    if(!(match)) {
                        alert({
                            title: '温馨提示',
                            content: '评星不能空缺噢',
                            width: 300,
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
                        return false;
                    }

                    // 评价描述
                    var info = $.trim(formElement.find('textarea').val());

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

                    var data = {
                        commentId: store.get('commentId'),
                        total_score: match,
                        info: info,
                        photoList: photoList,
                    };

                    return service
                    .modifyComment(
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
                            success('你的评价已经修改成功！', function () {
                                location.href = '/student_center/commentTeacher';
                            });

                        }
                    });

                }
            }
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