/**
 * Created by chenmo on 16/1/12.
 */
define(function (require) {
    'use strict';
    var $ = require("zepto");
    var ui = require("common/ui");
    var iScroll = require('iscroll');
    var MVCObject = require('common/mvc/MVCObject');
    var string = require('util/string');
    var service = require('common/service');
    var util_function = require('util/function');
    var navPanel = require('common/navPanel');
    var selectedItem = new MVCObject();
    var photoContainer = $('#add-photo');
    var userInfo;
    var scriptData;
    selectedItem.set('anonymous', 0);


    function bindEvent() {
        var editContainer = $('#edit-part');
        var textArea = editContainer.find('.form-text');
        editContainer
        .on('click', '.stars .icon-star-full', function () {
            var item = $(this);
            var parent = item.parent();
            var index = item.data('index');
            var comment = item.data('comment');

            parent.find('.comment-text').html(comment);

            parent.find('i').each(function (key, item) {

                if (key <= index - 1) {
                    $(item).addClass('active');
                }
                else {
                    $(item).removeClass('active');
                }
            });
            activeBtn();
            //更新placeholder
            if (index < 2) {
                textArea.attr('placeholder', '对老师不满意?可以先跟老师沟通一下哦');
            }
            else if (index < 4) {
                textArea.attr('placeholder', '说说老师哪儿可以改进,帮助老师一起进步吧');
            }
            else {
                textArea.attr('placeholder', '写点感受吧,对其他同学很有帮助哦~')
            }
            selectedItem.set('score', index);
        });
        //监听输入框的剩余字数
        $('.form-text').on('input', function () {
            var value = $(this).val();
            var minLength = 15;
            var len;
            if (value.length < minLength) {
                len = minLength - value.length;
                $('.remain').html('还需输入' + len + '字');
            } else if (value.length >= minLength) {
                len = 200 - value.length;
                $('.remain').html('还可输入' + len + '字');
            }
            //activeBtn();

        });
        //匿名评价
        $('#bottom').on('click', '.label,.no-name', function () {
            var me = $(this);
            var parent = me.closest('#bottom');
            var circle = parent.find('i');
            if (circle.hasClass('circle')) {
                circle.removeClass('circle');
                selectedItem.set('anonymous', 0);
            } else {
                circle.addClass('circle');
                selectedItem.set('anonymous', 1);
            }
        });
    }

    /**
     * 上传照片
     */
    function upLoadPhoto() {

        photoContainer.find('input[type=file]').change(function () {
            var file = this.files[0];
            var size = file.size;


            var reader = new FileReader();
            reader.onload = function () {
                //通过reader.result来访问生成的DataURL
                var url = "data:application/octet-stream;" + reader.result.substr(reader.result.indexOf("base64,"));
                var num = photoContainer.find('ul li').length;
                if (num == 5) {
                    photoContainer.find('.add-photo').hide();
                }
                if (num == 1) {
                    photoContainer.find('.photo-container').show();
                    $('.add-title').find('input').remove();
                }
                photoContainer.find('ul .add-photo').before('<li><i class="icon icon-remove_circle delete"></i><img width="100%" height="100%" src="' + url + '" alt=""></li>');
            };
            reader.readAsDataURL(file);

        });

    }

    /**
     * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
     * @param {Image} source_img_obj The source Image Object
     * @param {Integer} quality The output quality of Image Object
     * @return {Image} result_image_obj The compressed Image Object
     */
    var jic = {
        compress: function (source_img_obj, quality, output_format) {

            var mime_type = "image/jpeg";
            if (output_format != undefined && output_format == "png") {
                mime_type = "image/png";
            }


            var cvs = document.createElement('canvas');
            //naturalWidth真实图片的宽度
            cvs.width = source_img_obj.naturalWidth;
            cvs.height = source_img_obj.naturalHeight;
            var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
            var newImageData = cvs.toDataURL(mime_type, quality / 100);
            var result_image_obj = new Image();
            result_image_obj.src = newImageData;
            return result_image_obj;
        }
    };

    /**
     * 提交评价
     */
    function submitComment() {
        $('#submit').click(function () {
            var param = {};
            param.teacher_num = selectedItem.get('teacherNumber');
            param.serial_number = selectedItem.get('serialNumber') ? selectedItem.get('serialNumber') : 0;
            param.info = string.encodeHTML($.trim($('.form-text').val()));
            param.total_score = selectedItem.get('score');
            param.purchase_id = scriptData.purchase_id;
            param.anonymous = selectedItem.get('anonymous');
            param.skip_verify = 1;
            //var imageArray = [];
            //$('.photo-container li').each(function (index, item) {
            //    if (!$(this).hasClass('add-photo')) {
            //        imageArray.push($(this).find('img')[0]);
            //    }
            //
            //});

            //var srcArray = [];
            //for (var i = 0, max = imageArray.length; i < max; i++) {
            //    srcArray[i] = jic.compress(imageArray[i], 50);
            //}
            //param.Images = srcArray;
            if (!param.total_score) {
                ui.remind('星星不能空着哦~给老师打个分吧~');
            } else if (!param.info || param.info.length < 15) {
                ui.remind('评论内容没到15字哦~写一些上课感受吧');
            } else {
                $(this).addClass('active');
                doRequest(param);
            }

        });
    }

    function doRequest(value) {
        service.post('/comment/addComment', value, function (res) {
            if (+res.code === 0) {
                var data = res.data;
                var msg = data.msg;
                if (data.type || data.type === undefined) {
                    msg = msg ? msg : "评价成功";
                    ui.alert({
                        title: '温馨提示',
                        content: msg,
                        button: '确定'
                    }).done(function () {
                        var url = scriptData.redirectUrl;
                        url ? location.href = url : location.href = '/order/studentOrders?status=4';
                    });
                } else if (res.code == '7003') {
                    ui.alert({
                        title: '温馨提示',
                        content: '您的评论内容中包含违禁词语,请修改后再发送',
                        button: '确定'
                    })
                } else {
                    ui.remind('评价失败');
                }
            } else if (+res.code === 888889 ) {
                var conDom = ui.confirm({
                    content: res.msg,
                    title: '温馨提示',
                    button_ok: "继续评价",
                    button_cancel: "取消"
                });

                conDom.done(function () {
                    value.skip_verify = 0;
                    doRequest(value);
                });
            }
        });
    }


    function deletePhoto() {
        photoContainer.on('click', '.delete', function () {
            $(this).parent('li').remove();
        })

    }

    /**
     * 是否激活提交按钮
     */
    function activeBtn() {
        var stars = $('.stars');
        var starFlag = false;
        stars.find('i').each(function (index, item) {
            if ($(this).hasClass('active')) {
                starFlag = true;
                return false;
            }
        });
        var editor = $('.form-text');
        var editFlag = false;

        if (editor.val().length > 15) {
            editFlag = true;
        }

        if (starFlag && editFlag) {
            $('.submit-comment').css('color', '#fff');
        }
        else {
            $('.submit-comment').css('color', '#ffb480');
        }
    }


    function selectCourseEffect() {
        var sDom = $('.selected-course');
        var oDom = $('.orgin-courses');
        if (!oDom.length || !sDom.length) {
            return;
        }
        var oHeight = oDom.find('ul').height();
        var mheight = parseInt(oDom.css('max-height'));
        var theight = oHeight > mheight ? mheight : oHeight;
        oDom[0].loaded = false;

        function setCoursePanelHide(flag) {
            if (sDom.hasClass('active') && !flag || flag) {
                oDom.height(0);
                sDom.removeClass('active');
            } else {
                oDom.height(theight);
                sDom.addClass('active');

                if (!oDom[0].loaded) {
                    setTimeout(function () {
                        new iScroll('.orgin-courses', {
                            scrollY: true,
                            scrollX: false,
                            click: true,
                            mouseWheel: true,
                            scrollbars: true
                        });
                    }, 500);
                    oDom[0].loaded = true;
                }
            }
        }

        sDom.on('click', function () {
            setCoursePanelHide();
        });


        oDom.on('click', 'li', function () {
            var cDom = $(this);
            if (cDom.hasClass('active')) {
                sDom.find('.selected-name').html(cDom.attr('data-text'));
                $('.course-teacher').html('老师: ' + cDom.attr('data-teacher_name'));
                var sNum = cDom.attr('data-serial_number');
                var tNum = cDom.attr('data-teacher_number');

                if (sNum != 0) {
                    selectedItem.set('teacherNumber', tNum);
                    selectedItem.set('serialNumber', sNum);
                } else {
                    selectedItem.set('teacherNumber', 0);
                    selectedItem.set('serialNumber', 0);
                }
                setCoursePanelHide(true);
                cDom.addClass('on');
                cDom.siblings('.on').removeClass('on');
            } else {
                ui.alert('请选择待评价的课程');
            }
        });


    }

    function setFirstCourse() {

        var orginSNum = scriptData.serial_number;
        var pDom = $('.orgin-courses');
        var tDom = null;
        if (orginSNum) {
            tDom = pDom.find('li[data-serial_number="' + orginSNum + '"]');
            if (!(tDom.length && tDom.hasClass('active'))) {
                tDom = null;
            }
        }
        if (!tDom) {
            tDom = pDom.find('.active').eq(0);
        }
        tDom.click();
    }

    return function (page_data) {
        // hurry: 点击上一步的操作
        // $('.nav-button').tap(function () {
        //     // require(['common/ui/NavPanel/NavPanel'], function (NavPanel) {
        //         navPanel.show();
        //     // });
        // });
        scriptData = page_data;
        userInfo = window.page_data;
        selectCourseEffect();
        setFirstCourse();
        bindEvent();
        // upLoadPhoto();  //  这里要注释掉
        // deletePhoto(); //  这里要注释掉
        submitComment();

        $('.text-container textarea').on('blur input', function () {
            activeBtn();
        });
        $('#invite-submit').click(function () {
            var param = {};
            param.score = selectedItem.get('score');
            param.teacher_num = scriptData.teacher_num;
            param.info = string.encodeHTML($.trim($('.form-text').val()));
            param.anonymous = selectedItem.get('anonymous');

            if (!param.score) {
                ui.remind('星星不能空着哦~给老师打个分吧~');
            } else if (!param.info || param.info.length < 15) {
                ui.remind('评论内容没到15字哦~写一些上课感受吧');
            }
            else {
                $(this).addClass('active');
                service
                .post('/comment/addInvitedComment', param, function (res) {
                    if (!res.code) {
                        var data = res.data;
                        var msg = data.msg;
                        if (data.type) {
                            ui.alert({
                                title: '温馨提示',
                                content: msg,
                                button: '确定'
                            }).done(function () {
                                location.href = data.url;
                            });
                        } else {
                            ui.remind(msg);
                        }
                    }

                });
            }

        });
    }
});