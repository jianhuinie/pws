/**
 * @file 资料下载预览
 * @author niejianhui
 */
define(function (require,exports) {
    'use strict';
    var LoginDialog = require('common/component/LoginDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var store = require('common/store');
    var Dialog = require('cobble/ui/Dialog');
    var service = require('common/service');

    //获取是否具有学生身份
    function getHasStudentRole(roles) {
        var studentRoleCode = "2";
        var length = roles.length;
        var hasStudentRole = false;

        if (length > 0) {
            for(var i = 0; i < length; i++) {
                if (roles[i] === studentRoleCode) {
                    hasStudentRole = true;
                    break;
                }
            }
        }

        return hasStudentRole;
    }
    //预览弹窗
    function popupPreviewDialog(fileId, fileType, fileName, canDownload, downloadUrl) {
        var pictureTypes = ['png', 'jpg', 'jpeg'];
        $.ajax({
            url: '/course_material/preview',
            method: 'post',
            dataType: 'json',
            data: {
                fid: fileId
            },
            success: function(response) {
                if (response.code === 0) {
                    var previewUrl = response.data.preview_url;
                    if (pictureTypes.indexOf(fileType) === -1) {
                        var content = ''
                                    + '<div class="frame-box">'
                                    +   '<iframe src="' + previewUrl + '" style="width:760px;height:520px;border:0" ' 
                                    +   'frameborder="no" border="0"></iframe>'
                                    +   '<div>';
                        if (canDownload) {
                            content += '<div class="download-btn set-position"><a href="' + downloadUrl + '">下载</a></div>';
                        }
                        else {
                            content += '<div class="text-info set-position">该文件不支持下载</div>';
                        }
                        content += '</div></div>';
                    }
                    else {
                        var content = ''
                                    + '<div class="frame-box"><div class="picture-box">'
                                    +   '<img src="' + previewUrl + '">' 
                                    +   '</div><div>';
                        if (canDownload) {
                            content += '<div class="download-btn set-position"><a href="' + downloadUrl + '">下载</a></div>';
                        }
                        else {
                            content += '<div class="text-info set-position">该文件不支持下载</div>';
                        }
                        content += '</div></div>';
                    }
                    var FilePreviewDialog = new Dialog({
                        title: fileName,
                        content: content,
                        skinClass: 'preview-dialog',
                        width: 800
                    });
                }
            }
        });
    }
    function alertMessage(text) {
        alert({
            content: text,
            width: 300,
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
    }
    //上报
    function materialReport(stype, fileId) {
        var params = {
            type: 'course_material',
            stype: stype,
            fid: fileId,
            user_number: store.get('user').number,
            course_number: store.get('courseNum'),
            course_type: store.get('courseType')
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);
    }

    exports.init = function () {
        var container = $('#course-material');
        var isLogin = store.get('isLogin');
        var isJoin = store.get('isJoin');
        var isOver = store.get('isOver');
        var isOwnCourse = false;
        if (store.get('teacherNum') == store.get('user').number) {
            isOwnCourse = true;
        }

        container
        .on('click', '.download', function (e) {
            var target = $(e.currentTarget);
            var item = target.parent();
            var isOpen  = item.data('isOpen');
            var fileId = item.data('fileId');
            if (store.get('user').type === 0 && !isOwnCourse) {
                e.preventDefault();
                service
                .getUserType()
                .done(function (response) {
                    if (response.code === 0) {
                        var roles = response.data.roles;
                        var hasStudentRole = getHasStudentRole(roles);
                        var text = '';

                        if (hasStudentRole) {
                            text = '你目前是老师身份，需要切换到学生身份才能下载资料';
                        }
                        else {
                            text = '你目前是老师身份，无法下载资料，是否开通学生身份？';
                        }
                        
                        new BanLessonDialog({
                            text: text,
                            hasStudentRole: hasStudentRole,
                            onSuccess: function(){
                                location.reload();
                            },
                            next: location.href,
                            noskip: false
                        });
                    }
                });
            }
            else if (store.get('user').type === 0 && isOwnCourse) {
                //自己的课直接下载
            }
            else {
                if (isOpen) {
                    if (!isLogin) {
                        new LoginDialog({
                            onSuccess: function () {
                                location.reload();
                            }
                        });
                        e.preventDefault();
                    }
                    else {
                        //下载上报
                        materialReport(1, fileId);
                    }
                }
                else {
                    if (!isJoin) {
                        if (!isOver) {
                            var text = '该资料报名后才能下载哦';
                            alertMessage(text);
                            e.preventDefault();
                        }
                        else {
                            var text = '该课程已结束，可咨询老师获取资料';
                            alertMessage(text);
                            e.preventDefault();
                        }
                    }
                    else {
                        //下载上报
                        materialReport(1, fileId);
                    }
                }
            }
        })
        .on('click', '.item-name', function (e) {
            var target = $(e.currentTarget);
            var item = target.parent();
            var isOpen  = item.data('isOpen');
            var fileName = item.data('fileName');
            var downloadUrl = item.data('downloadUrl');
            var canDownload = item.data('canDownload');
            var fileType = item.data('fileType').toLowerCase();
            var fileId = item.data('fileId');
            var previewFileTypes = ['pdf', 'word', 'excel', 'ppt', 'txt', 'png', 'jpg', 'jpeg'];

            if (previewFileTypes.indexOf(fileType) === -1) {
                alert('该文件暂不支持预览');
            }
            else {
                if (store.get('user').type === 0 && !isOwnCourse) {
                    service
                    .getUserType()
                    .done(function (response) {
                        if (response.code === 0) {
                            var roles = response.data.roles;
                            var hasStudentRole = getHasStudentRole(roles);
                            var text = '';

                            if (hasStudentRole) {
                                text = '你目前是老师身份，需要切换到学生身份才能预览资料';
                            }
                            else {
                                text = '你目前是老师身份，无法预览资料，是否开通学生身份？';
                            }
                            new BanLessonDialog({
                                text: text,
                                hasStudentRole: hasStudentRole,
                                onSuccess: function(){
                                    location.reload();
                                },
                                next: location.href,
                                noskip: false
                            });
                        }
                    });
                }
                else if (store.get('user').type === 0 && isOwnCourse) {
                    popupPreviewDialog(fileId, fileType, fileName, canDownload, downloadUrl);
                }
                else {
                    if (isOpen) {
                        if (!isLogin) {
                            new LoginDialog({
                                onSuccess: function () {
                                    location.reload();
                                }
                            });
                        }
                        else {
                            //预览弹窗
                            popupPreviewDialog(fileId, fileType, fileName, canDownload, downloadUrl);
                            //预览上报
                            materialReport(2, fileId);
                        }
                    }
                    else {
                        if (!isJoin) {
                            if (!isOver) {
                                var text = '报名该课程后即可预览完整资料';
                                alertMessage(text);
                            }
                            else {
                                var text = '该课程已结束，可咨询老师获取资料';
                                alertMessage(text);
                            }
                        }
                        else {
                            //预览弹窗
                            popupPreviewDialog(fileId, fileType, fileName, canDownload, downloadUrl);
                            //预览上报
                            materialReport(2, fileId);
                        }
                    }
                }
            }
        });
    }
});