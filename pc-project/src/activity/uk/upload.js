/**
 * @file 中英交流大使-个人主页
 * @author wx
 */



define(function(require, exports) {

    'use strict';

    var ukCommon = require('./common');

    var store = require('common/store');
    var service = require('common/service');

    var Uploader = require('cc/ui/Uploader');

    var M = 1024 * 1024;

    var MAX_FILE_SIZE = 1024 * M * 2;
    var accept = [
        'wmv', 'avi', 'dat', 'asf',
        'rm', 'rmvb', 'ram', 'mpg',
        'mpeg', '3gp', 'mov', 'mp4',
        'm4v', 'dvix', 'dv', 'mkv',
        'flv', 'vob', 'qt', 'divx',
        'cpk', 'fli', 'flc', 'mod'
    ];

    // 上传的服务器信息
    var uploadInfo;

    var uploadError;

    var fileItem;

    var uploader;


    exports.init = function (){

        ukCommon.init();

        var fileInput = $('#upload-input');

        if (fileInput.length) {
            uploader = new Uploader({
                mainElement: fileInput,
                action: '',
                multiple: false,
                useChunk: false,
                fileName: 'Filedata',
                chunkSize: 5 * M,
                data: {
                    title: 'UK-VIDEO'
                },
                onfilechange: function () {

                    fileItem = uploader.getFiles()[0];
                    if (!fileItem) {
                        return;
                    }

                    var error;
                    var file = fileItem.file;

                    // 校验格式
                    var index = $.inArray(file.type, accept);
                    if (index === -1) {
                        error = '文件格式错误，请上传 ' + accept.join('、') + ' 等格式的视频';
                    }
                    else {
                        // 校验大小
                        if (file.size > MAX_FILE_SIZE) {
                            error = '请不要上传超过2G的内容';
                        }
                    }

                    if (error) {
                        alert({
                            content: error,
                            width: 300
                        });
                        uploader.reset();
                        uploadError = error;
                        return;
                    }
                    else {
                        uploadError = '';
                    }

                    beginUpload();

                },
                onuploadprogress: function (e, data) {
                    $('.upload-progress').find('.progress').css('width', data.percent);
                    $('.upload-progress').find('.badge').text(parseInt(data.percent) + '%');
                    $('.upload-stat').text(formatSize(data.uploaded) + 'M / ' + formatSize(data.total) + 'M');
                },
                onuploadsuccess: function (e, data) {
                    // 上传完成
                    // 保存信息
                    saveVideo();
                }
            });
        }

        $('#upload-cancel').on('click', function () {
            uploader.stop();
            $('.upload-progress-wrapper').hide();
            $('.upload-select').show();
        });

    };

    /**
     * 开始上传
     */
    function beginUpload() {
        // 执行上传，先获取上传地址
        service.post(
            '/uk/uploadVideo',
            {
                title: fileItem.file.name
            }
        ).then(function (response) {
            var data = response.data;

            uploadInfo = data;

            // 设置上传文件的地址
            uploader.set('action', data.upload_url);

            uploader.upload(0);

            $('#file-name').text(fileItem.file.name);

            $('.upload-progress-wrapper').show();
            $('.upload-select').hide();
            $('.upload-progress').find('.progress').css('width', '0');
            $('.upload-progress').find('.badge').text('0%');
        });
    }

    function formatSize(bytes) {
        return Math.round(bytes * 10 / M) / 10;
    }

    /**
     * 保存视频
     */
    function saveVideo() {
        service.post(
            '/uk/saveUploadVideo',
            {
                fid: uploadInfo.fid,
                media_id: uploadInfo.id
            }
        ).then(function () {
            alert({
                content: '上传成功！',
                onBeforeHide: function () {
                    location.href = '/uk/profile';
                }
            });
        });
    }


});