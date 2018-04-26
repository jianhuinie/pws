/**
 * @file 上传视频的表单
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var browser = require('cc/util/browser');
    var toNumber = require('cc/function/toNumber');
    var constant = require('../constant');
    var service = require('../service');
    var VideoUploader = require('../../../common/biz/VideoUploader');

    var videoUploadReport = require('../../../common/function/videoUploadReport');

    var SECTION_NAME_MAX_LENGTH = 20;

    var SAVE_BUTTON_WAITING = 2000;

    return Ractive.extend({
        template: require('html!./CourseSectionForm.html'),
        data: function () {
            return {
                userData: userData,
                // 第几课节
                sectionIndex: 1,
                // 课程名称是否正在编辑
                sectionNameEditing: false,
                // 上传进度
                videoUploadPercent: '',
                // 是否正在保存
                sectionSaving: false,

                inputOptions: {
                    name: 'sectionName',
                    value: '',
                    placeholder: '请输入长度在' + SECTION_NAME_MAX_LENGTH + '个字以内的课节标题',
                    className: 'fluid small',
                    multiple: true
                },

                // 可选的视频类型
                chargeList: [
                    {
                        text: '试听',
                        value: constant.COURSE_SECTION_PAY_STATUS_TRIAL,
                    },
                    {
                        text: '付费',
                        value: constant.COURSE_SECTION_PAY_STATUS_CHARGE,
                    }
                ],

                COURSE_SECTION_PAY_STATUS_FREE: constant.COURSE_SECTION_PAY_STATUS_FREE,
                COURSE_SECTION_PAY_STATUS_TRIAL: constant.COURSE_SECTION_PAY_STATUS_TRIAL,
                COURSE_SECTION_PAY_STATUS_CHARGE: constant.COURSE_SECTION_PAY_STATUS_CHARGE,

                validateVideo: function () {
                    return true;
                },

                options: {

                    // 课节 id
                    sectionId: '',

                    // 课节名称
                    sectionName: '',

                    // 视频 id
                    videoId: '',

                    // 视频名称
                    videoName: '',

                    // 支付方式
                    payStatus: '',

                    hasError: false,
                    error: ''

                }
            }
        },
        components: {
            Input: require('../../../common/component/Input')
        },
        onrender: function () {

        },
        oncomplete: function () {
            var me = this;
            var container = $(me.getElement());

            me.on('Input.blur', function () {
                me.endEditSectionName();
            });

            var saveHandler = function (newValue, oldValue) {
                if (oldValue == null) {
                    return;
                }
                me.save();
            };
            me.observe('options.videoName', saveHandler);
            me.observe('options.sectionName', saveHandler);
            me.observe('options.payStatus', saveHandler);

            var mainElement = container.find('input[type="file"]');
            if (mainElement.length) {
                var uploader = new VideoUploader({
                    mainElement: mainElement,
                    name: 'file',
                    validateVideo: me.get('validateVideo'),
                    getUploadUrl: function (data) {
                        return service
                        .getVideoUploadUrl(
                            {
                                fileName: data.videoName,
                                fileSize: data.videoSize,
                                cdnHost: data.cdnHost
                            },
                            {
                                preventError: true
                            }
                        )
                        .then(
                            function (response) {
                                var data = response.data;
                                return {
                                    fid: data.fid,
                                    id: data.id,
                                    url: data.upload_url
                                };
                            },
                            function (response) {
                                if (response.code === 200204) { // 存储空间已满
                                    if (me.get('userData.org_id')) { // 机构
                                        alert({
                                            title: '温馨提示',
                                            content: '亲，空间已经占满了，删除一些不必要的文件，<br>或联系您的机构购买或升级机构会员，马上可获得更多空间',
                                            buttons: [
                                                {
                                                    text: '确定',
                                                    type: 'primary',
                                                    action: function () {
                                                        this.hide();
                                                    }
                                                }
                                            ]
                                        });
                                    }
                                    else { // 个人
                                        alert({
                                            title: '温馨提示',
                                            content: '您的云存储空间不足，无法上传视频。<br>请删除一部分无用的文件，或者购买更多的云存储空间。',
                                            buttons: [
                                                {
                                                    text: '购买空间',
                                                    type: 'primary',
                                                    action: function () {
                                                        this.hide();
                                                        location.href = '/teacher_center/storage_space';
                                                    }
                                                },
                                                {
                                                    text: '取消',
                                                    type: 'default',
                                                    action: function () {
                                                        this.hide();
                                                    }
                                                }
                                            ]
                                        });
                                    }
                                }
                                return response;
                            }
                        );
                    },
                    getResumeUploadUrl: function (data) {
                        return service
                        .getVideoResumeUploadUrl({
                            videoId: data.uploadId,
                            cdnHost: data.cdnHost
                        })
                        .then(function (response) {
                            var data = response.data;
                            return {
                                fid: data.fid,
                                id: data.id,
                                url: data.upload_url,
                                uploaded: data.upload_size
                            };
                        });
                    },
                    isChunkUploadSuccess: function (response) {
                        // 后端居然用 1 表示成功，服了
                        return response && response.code === 1;
                    },
                    isUploadSuccess: function (response) {
                        // 后端居然用 1 表示成功，服了
                        return response && response.code === 1;
                    },
                    onResumeUploadWait: function () {

                    },
                    onResumeUploadCancel: function () {

                    },
                    onFileChange: function () {
                        var currentFiles = uploader.currentFiles;
                        if (currentFiles.length !== 1) {
                            return;
                        }
                        if (!uploader.validateFile(currentFiles[0])) {
                            uploader.reset();
                            return;
                        }
                        uploader.autoUpload(currentFiles[0]);
                    },
                    onUploadStart: function (data) {
                        me.set({
                            'options.uploading': true,
                            'options.uploadingVideoName': data.fileItem.file.name
                        });
                    },
                    onUploadProgress: function (data) {
                        if (toNumber(data.percent, 0, 'int') > 99) {
                            data.percent = '99%';
                        }
                        me.set({
                            videoUploadPercent: data.percent
                        });
                    },
                    onUploadSuccess: function (data) {

                        var fileItem = data.fileItem;
                        var fileData = uploader.currentFiles[fileItem.index];

                        var saveVideo = function () {

                            fileData.checking = false;
                            me.set({
                                videoUploadPercent: '100%'
                            });

                            var videoId = fileData.uploadId;

                            var file = fileItem.file;
                            var videoName = file.name;
                            if (videoId && videoName) {

                                me.set({
                                    'options.videoId': videoId,
                                    'options.videoName': videoName
                                });

                                videoUploadReport({
                                    isSuccess: true,
                                    fid: fileData.fid,
                                    videoName: videoName,
                                    videoSize: file.size,
                                    cdnHost: fileData.cdnHost,
                                    uploadUrl: fileData.uploadUrl,
                                    uploadTime: $.now() - fileData.uploadStartTime
                                });
                            }
                        };

                        // 只处理分片上传的情况
                        if (uploader.useChunk) {

                            if (!fileData.checking) {
                                fileData.checking = true;

                                // 第一次才去验证，后面就直接成功或失败了
                                // 否则岂不是死循环了
                                setTimeout(
                                    function () {
                                        service
                                        .checkChunkUploadLack({
                                            fid: fileData.fid
                                        })
                                        .then(function (response) {

                                            var lack = response.data.lack;
                                            // 找不到相关信息
                                            if (lack === '') {
                                                uploader.onUploadError(data);
                                            }
                                            else if (lack != 0) {
                                                var result = [ ];
                                                $.each(lack.split(','), function (index, str) {
                                                    var pairs = str.split('-');
                                                    var startIndex = Math.floor(pairs[0] / uploader.chunkSize);
                                                    var endIndex = Math.ceil(pairs[1] / uploader.chunkSize);
                                                    for (var i = startIndex; i < endIndex; i++) {
                                                        if ($.inArray(i, result) < 0) {
                                                            result.push(i);
                                                        }
                                                    }
                                                });
                                                uploader.retryUploadChunks(fileData, result);
                                            }
                                            else {
                                                saveVideo();
                                                uploader.onUploadComplete(data);
                                            }

                                        });
                                    },
                                    1000
                                );
                                return;
                            }
                        }

                        saveVideo();

                    },
                    onChunkUploadError: function (data) {
                        uploader.onUploadError(data);
                    },
                    onUploadError: function (data) {

                        var fileItem = data.fileItem;
                        var fileData = uploader.currentFiles[fileItem.index];

                        fileData.checking = false;

                        videoUploadReport({
                            isSuccess: false,
                            fid: fileData.fid,
                            videoName: fileItem.file.name,
                            videoSize: fileItem.file.size,
                            cdnHost: fileData.cdnHost,
                            uploadUrl: fileData.uploadUrl,
                            uploadTime: $.now() - fileData.uploadStartTime
                        });

                        var content = ['上传失败'];

                        var speed = uploader.getUploadSpeed(fileItem.index) / 1024;
                        // console.log(fileData);
                        if (speed < 100) {
                            content.push('上传速度为 ' + (speed).toFixed(2) + 'KB/s');
                            content.push('建议更换网络');
                        }

                        if (!browser.chrome) {
                            content.push('建议使用 Chrome 浏览器上传');
                        }

                        content.push('<br>提示：同时上传多个视频会增加上传失败的风险');

                        alert({
                            title: '错误',
                            type: 'error',
                            content: content.join('，')
                        });

                    },
                    onUploadComplete: function (data) {

                        var fileItem = data.fileItem;
                        var fileData = uploader.currentFiles[fileItem.index];

                        if (!fileData.checking) {
                            me.set({
                                videoUploadPercent: '',
                                'options.uploading': false,
                                'options.uploadingVideoName': ''
                            });
                            uploader.reset();
                        }
                    }
                });
                me.uploader = uploader;
            }
        },
        onteardown: function () {
            if (this.uploader) {
                this.uploader.dispose();
            }
        },
        save: function () {
            var me = this;
            var sectionName = me.get('options.sectionName');
            var videoName = me.get('options.videoName');
            if (sectionName && videoName) {
                me.set('sectionSaving', true);
                setTimeout(
                    function () {
                        me.set('sectionSaving', false);
                    },
                    SAVE_BUTTON_WAITING
                );
                me.fire(
                    'save',
                    {
                        sectionIndex: me.get('sectionIndex')
                    }
                );
            }
        },
        startEditSectionName: function () {
            this.set({
                sectionNameEditing: true,
                'inputOptions.value': this.get('options.sectionName')
            });
        },
        endEditSectionName: function () {
            var error;
            var sectionName = this.get('inputOptions.value');
            if (sectionName.length > SECTION_NAME_MAX_LENGTH) {
                error = '课节标题请不要输入超过 '
                    + SECTION_NAME_MAX_LENGTH
                    + ' 个字';
            }
            else if (!sectionName.length) {
                error = '请输入课节标题';
            }
            if (error) {
                tip({
                    type: 'error',
                    content: error
                });
                return;
            }
            this.set({
                sectionNameEditing: false,
                'options.sectionName': sectionName
            });
        },
        deleteVideo: function () {
            var me = this;
            confirm({
                title: '温馨提示',
                content: '确定要删除这个视频吗？'
            })
            .then(function () {
                me.set('options.videoName', '');
            });
        },
        cancelUpload: function () {
            var uploader = this.uploader;
            uploader.stop();
            this.set({
                videoUploadPercent: ''
            });
        },
        selectPayStatus: function (type) {
            this.set('options.payStatus', type);
        },
        deleteSection: function () {
            var me = this;
            me.fire(
                'delete',
                {
                    sectionIndex: me.get('sectionIndex')
                }
            );
        }
    });

});