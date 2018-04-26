/**
 * @file 视频上传
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var localStorage = require('cobble/util/localStorage');
    var TagInput = require('common/component/TagInput');
    var service = require('common/service');
    var form = require('common/form');
    var store = require('common/store');
    var Uploader = require('cobble/ui/Uploader');
    var VideoVod = require('common/component/VideoVod');
    var uploadStartTime = 0 ;

    /**
     * 1M 字节数
     *
     * @const
     * @type {number}
     */
    var M = 1024 * 1024;

    var maxSize = {

        FlashUploader: {
            value: 200 * M,
            text: '你的浏览器最大支持上传 200M 的视频，可使用 '
                + '<a href="http://www.baidu.com/s?wd=Chrome%20%E6%B5%8F%E8%A7%88%E5%99%A8" target="_blank">Chrome 浏览器</a>'
                + ' 获得 1G 超大文件上传体验！'
        },

        AjaxUploader: {
            value: 1024 * M,
            text: '上传的视频不能超过 1G'
        }

    };

    var accept = [
        'wmv', 'avi', 'dat', 'asf',
        'rm', 'rmvb', 'ram', 'mpg',
        'mpeg', '3gp', 'mov', 'mp4',
        'm4v', 'dvix', 'dv', 'mkv',
        'flv', 'vob', 'qt', 'divx',
        'cpk', 'fli', 'flc', 'mod'
    ];

    function getLocalKey(file) {
        return decodeURIComponent(file.name) + '_' + file.size;
    }

    function confirmOnLeave() {
        $(window).on(
            'beforeunload',
            function () {
                return '你还没有完成视频上传';
            }
        );
    }

    function dontConfirmOnLeave() {
        $(window).off('beforeunload');
    }

    exports.init = function () {

        confirmOnLeave();

        var container = $('#content .upload-form');

        var uploadBtn = container.find('.btn-upload');
        var hint = container.find('.hint');
        var fileInput = $('<input type="file" />');

        uploadBtn.append(fileInput);


        var uploadStatusElement = container.find('.upload-status');
        var resumeStatusElement = container.find('.resume-status');


        var progressElement = container.find('.progress');
        var progressBarElement = progressElement.find('.progress-bar-info');
        var progressTextElement = progressElement.find('span');


        var uploadBytesElement = container.find('.uploaded-bytes');
        var totalBytesElement = container.find('.total-bytes');

        // 当前选择的文件
        var fileItem;

        // 上传 ID
        var uploadId;

        // 上传成功后, uploadId 会赋给 videoId
        var videoId;

        // 尝试续传失败的最大尝试次数
        var testMax = 6;
        var testCount = 0;
        var testTimer;

        var useChunk = Uploader.supportChunk;
        var chunkSize = 5 * M;

        function toUploadStatus(data) {

            uploadId = data.id;
            videoId = null;

            var url = data.url;

            uploader.setAction(url);

            uploader.upload(fileItem);

            // 重置文件名
            uploadStatusElement.find('.filename').html(fileItem.file.name);

            // 重置进度条
            uploadBytesElement.html('0.00 M');
            totalBytesElement.html('0.00 M');

            progressBarElement.prop('class', 'progress-bar-info');
            progressBarElement.width(0);
            progressTextElement.html('0%');

            uploadBtn.css({
                position: 'fixed',
                top: -10000
            });
            hint.css({
                position: 'fixed',
                top: -10000
            });

            resumeStatusElement.hide();
            uploadStatusElement.show();

        }

        function toWaitResumeUploadStatus() {
            uploadBtn.css({
                position: 'fixed',
                top: -10000
            });
            hint.css({
                position: 'fixed',
                top: -10000
            });
            resumeStatusElement.show();
            uploadStatusElement.hide();
        }

        function toDefaultStatus() {

            testCount = 0;

            uploadId =
            videoId = null;

            uploadBtn.css({
                position: '',
                top: ''
            });
            hint.css({
                position: '',
                top: ''
            });
            resumeStatusElement.hide();
            uploadStatusElement.hide();
        }

        function resumeUpload(data) {

            service
            .getResumeUploadVideoUrl(data)
            .done(function (response) {
                if (response.code === 0) {

                    var responseData = response.data;

                    // 获取已上传的文件大小
                    var uploaded = responseData.upload_size||0;
                    var index = parseInt(uploaded / chunkSize, 10);

                    fileItem.chunk = {
                        index: index,
                        uploaded: uploaded
                    };

                    toUploadStatus({
                        id: responseData.id,
                        url: responseData.upload_url
                    });

                }
                else {

                    if (testCount === 0) {
                        toWaitResumeUploadStatus();
                    }

                    testCount++;

                    if (testCount < testMax) {
                        testTimer = setTimeout(
                            function () {
                                resumeUpload(data);
                            },
                            10000
                        );
                    }
                    else {
                        alert('续传失败,请重新上传');
                        cancelResumeUpload();
                        toDefaultStatus();
                    }

                }
            });
        }

        function cancelResumeUpload() {

            if (testTimer) {
                clearTimeout(testTimer);
                testTimer = null;
            }

            localStorage.remove(
                getLocalKey(fileItem.file)
            );
        }
        var videoVod = null;
        var failCount = 0;
        var uploader = new Uploader({
            element: fileInput,
            multiple: false,
            useChunk: useChunk,
            chunkSize: chunkSize,
            onFileChange: function () {


                fileItem = uploader.getFiles()[0];
                if (!fileItem) {
                    return;
                }
                failCount = 0;
                var error;
                var file = fileItem.file;

                // 校验格式
                var index = $.inArray(file.type, accept);
                if (index === -1) {
                    error = '文件格式错误，请上传 ' + accept.join('、') + ' 等格式的视频';
                }
                else {
                    // 校验大小
                    if (file.size > maxSize[uploader.type].value) {
                        error = maxSize[uploader.type].text;
                    }
                }

                if (error) {
                    alert({
                        content: error,
                        width: 300
                    });
                    uploader.reset();
                    return;
                }

                var data = {
                    fileName: file.name,
                    fileSize: file.size
                };

                if (useChunk) {
                    var localValue = localStorage.get(getLocalKey(file));
                    if (localValue) {

                        data.id = localValue.split('|')[1];
                        resumeUpload(data);

                        return;
                    }
                    else {
                        data.chunk = true;
                    }
                }

                // 非断点续传
                service
                .getUploadVideoUrl(data)
                .done(function (response) {
                    if (response.code === 0) {

                        var responseData = response.data;

                        toUploadStatus({
                            id: responseData.id,
                            url: responseData.upload_url
                        });

                    }
                    else if (!response.msg) {
                        alert('获取上传接口失败，请尝试重新上传');
                    }
                });
            },
            onUploadStart: useChunk
                ? function (e, data) {
                    // 本地存储，便于断点续传
                    var fileItem = data.fileItem;
                    var file = fileItem.file;
                    var chunk = fileItem.chunk;

                    localStorage.set(
                        getLocalKey(file),
                        chunk.index + '|' + uploadId
                    );

                    //上传统计
                    var report = store.get('report');
                    videoVod = new VideoVod({
                        user_number : report.user_number, // 跟谁学主站用户的number
                        user_role : report.user_role, // 跟谁学主站用户角色: 学生2 老师0
                        video_id : uploadId, //视频ID标示
                        video_type: 3,//视频类型为3表示老师视频
                        client : report.client, //客户端类型1.iphone 2.ipad 3.Android 4.手机M站 5.PC网页
                        app : report.app, //app类型 1.学生app 2.老师app 3.机构app 4.直播助手
                        version : report.version //版本号 包括: pc版本号、前端版本号、app版本号、ipad版本号
                    });
                    uploadStartTime = (new Date()).getTime();
                }
                : null,

            onUploadProgress: function (e, data) {

                uploadBytesElement.html((data.uploaded / M).toFixed(2) + 'M');
                totalBytesElement.html((data.total / M).toFixed(2) + 'M');

                progressBarElement.width(data.percent);
                progressTextElement.html(data.percent);

            },
            onUploadSuccess: function () {

                success('上传成功');

                progressBarElement.prop('class', 'progress-bar-success');
                progressTextElement.html('上传成功');

                videoId = uploadId;

                if (useChunk) {
                    localStorage.remove(
                        getLocalKey(fileItem.file)
                    );
                }
                //上传成功上报log
                videoVod.send(8, fileItem.file.size, ((new Date()).getTime()-uploadStartTime));
            },
            onChunkUploadSuccess: function(e, data) {
                var fileItem = data.fileItem;
                var response = $.parseJSON(data.responseText);
                if (!response) {
                    failCount = 0;
                    return;
                }
                // 1是成功 0是失败
                if (!response.code) {
                    e.preventDefault();
                    failCount++;
                    // 重试3次
                    if (failCount < 4) {
                        setTimeout(
                            function () {
                                uploader.upload(fileItem);
                            },
                            500
                        );
                    } else {
                        alert('上传失败');
                        //上传失败上报log
                        videoVod.send(9);
                    }
                } else {
                    failCount = 0;
                }

            }
        });

        var tagInput = new TagInput({
            element: container.find('[name="labels"]')
        });

        container

        .on('click', '.btn-upload-again', function () {
            cancelResumeUpload();
            toDefaultStatus();
        })

        .on('click', '.btn-cancel-upload', function () {
            uploader.stop();
            toDefaultStatus();
        })

        .on('click', '.btn-primary', function () {

            var data = form.parse(container);
            var labels = tagInput.getValue();

            if (!videoId) {
                alert(uploadId ? '视频正在上传中，请耐心等待...' : '请上传视频');
                return;
            }

            if (!data.title) {
                alert('请输入视频标题');
                return;
            }

            if (data.category == null) {
                alert('请选择视频分类');
                return;
            }

            if (labels.length === 0) {
                alert('请输入视频标签');
                return;
            }

            service
            .createVideo({
                id: videoId,
                title: data.title,
                category: data.category,
                labels: labels
            })
            .done(function (response) {
                if (response.code === 0) {
                    dontConfirmOnLeave();
                    location.href = '/teacher_center/video';
                }
            });

        });
    };

});