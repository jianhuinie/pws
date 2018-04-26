/**
 * @file 视频上传
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var Uploader = require('custom/ui/Uploader');
    var toNumber = require('cc/function/toNumber');
    var allPromises = require('cc/function/allPromises');
    var urlUtil = require('cc/util/url');
    var localStorage = require('cc/util/localStorage');
    var FiniteArray = require('cc/util/FiniteArray');
    var service = require('../service');

    /**
     * 1M 字节数
     *
     * @const
     * @type {number}
     */
    var M = 1024 * 1024;

    /**
     * 1G 字节数
     *
     * @const
     * @type {number}
     */
    var G = 1024 * M;

    /**
     * 一天的毫秒数
     *
     * @const
     * @type {number}
     */
    var DAY = 86400000;

    /**
     * 浏览器是否支持分片上传
     *
     * @type {number}
     */
    var supportChunk = Uploader.supportChunk;

    /**
     * 是否需要本地记录分片信息
     *
     * @type {boolean}
     */
    var needSaveChunkInfoToLocalStorage = true;

    /**
     * 是否需要 cdn 测速
     *
     * @type {boolean}
     */
    var needCdnSpeedTest = true;

    var maxSize = {
        FlashUploader: {
            value: 200 * M,
            text: '你的浏览器最大支持上传 200M 的视频，可使用 '
                + '<a href="http://www.baidu.com/s?wd=Chrome%20%E6%B5%8F%E8%A7%88%E5%99%A8" target="_blank">'
                +     'Chrome 浏览器'
                + '</a>'
                + ' 获得 2G 超大文件上传体验！'
        },
        AjaxUploader: {
            value: 2 * G,
            text: '上传的视频不能超过 2G'
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

    /**
     * 获取本地存储的视频 key
     *
     * @param {Object} file
     * @return {string}
     */
    function getLocalKey(file) {
        return encodeURIComponent(file.name) + '_' + file.size;
    }

    var CHUNK_UPLOAD_RETRY = 'upload_retry';

    /**
     * CDN 测速结果的过期时间
     *
     * @type {number}
     */
    var CDN_SPEED_TEST_EXPIRED_DAYS = 1

    /**
     * CDN 测试时间
     *
     * @type {string}
     */
    var CDN_SPEED_TEST_TIME = 'cdn_speed_test_time';

    /**
     * CDN 测试结果
     *
     * @type {string}
     */
    var CDN_SPEED_TEST_RESULT = 'cdn_speed_test_result';

    /**
     * 自己的 cdn
     *
     * @type {string}
     */
    var selfCdn;

    /**
     * 选中的 cdn
     *
     * @type {string}
     */
    var selectedCdn;

    function getCdnSpeedTestResult() {
        if (selectedCdn == null) {
            var now = $.now();
            var time = toNumber(localStorage.get(CDN_SPEED_TEST_TIME), 0);
            var result = localStorage.get(CDN_SPEED_TEST_RESULT);
            if (result && now - time < CDN_SPEED_TEST_EXPIRED_DAYS * DAY) {
                selectedCdn = result;
            }
        }
        return selectedCdn;
    }

    function setCdnSpeedTestResult(result) {
        selectedCdn = result;
        localStorage.set(
            CDN_SPEED_TEST_RESULT,
            result
        );
        localStorage.set(
            CDN_SPEED_TEST_TIME,
            $.now()
        );
    }

    function cdnSpeedTest(fileItem, urls, callback) {

        var chunkFile = fileItem.nativeFile.slice(0, 0.5 * M);
        var times = [];
        var promises = [];

        $.each(urls, function (index, url) {

            // 用 500KB 测试一下
            var mainElement = $('<input type="file" class="hidden">');
            mainElement.appendTo('body');

            var startTime;
            var deferred = new $.Deferred();
            promises.push(deferred);

            var uploader = new Uploader({
                mainElement: mainElement,
                action: url,
                onuploadstart: function () {
                    startTime = $.now();
                },
                onuploadsuccess: function () {
                    times.push($.now() - startTime);
                },
                onuploaderror: function () {
                    times.push(0);
                },
                onuploadcomplete: function () {
                    uploader.dispose();
                    mainElement.remove();
                    deferred.resolve();
                }
            });

            uploader.upload(
                0,
                {
                    file: $.extend({}, fileItem.file, { size: chunkFile.size }),
                    nativeFile: chunkFile
                }
            );

        });


        tip({
            type: 'info',
            content: '正在为您的网络测速，选择最快的上传方式，请稍候...',
            duration: 10 * 1000
        });

        allPromises(promises)
        .then(function () {

            // 最快
            var firstIndex = 0;
            // 第二快
            var secondIndex = 0;

            $.each(times, function (index, time) {
                if (time < times[firstIndex]) {
                    secondIndex = firstIndex;
                    firstIndex = index;
                }
            });

            var selectedIndex = firstIndex;

            // 如果最快的是最后一个，需要乘以 0.8 进行调权
            // 但我们存储的是耗时，因此可以改成乘以 1.2
            if (selectedIndex === times.length - 1) {
                if (times[selectedIndex] * 1.2 > times[secondIndex]) {
                    selectedIndex = secondIndex;
                }
            }

            // 存域名，因为 url 的 token 会变化
            var origin = urlUtil.parse(urls[selectedIndex]).origin;

            setCdnSpeedTestResult(origin);

            callback(origin);

        });

    }

    /**
     * @param {Object} options
     * @property {jQuery} options.mainElement 主元素，即文件输入框元素
     * @property {string} options.name 传给后端的 name
     * @property {boolean=} options.useChunk 是否分片上传
     * @property {number=} options.maxSize 上传文件的最大尺寸
     * @property {string=} options.maxSizeError 超过上传文件的最大尺寸的错误信息
     * @property {number=} options.resumeExpireTime 本地记录的分片信息的过期时间，默认是一天之后过期
     * @property {number=} options.resumeUploadMaxCount 获取续传数据的最大尝试次数
     * @property {number=} options.chunkUploadMaxCount 分片上传的最大尝试次数
     * @property {Function=} options.validateVideo 校验视频，比如同时上传的最大数量，或者是否重复上传
     * @property {Function=} options.isChunkUploadSuccess 判断分片是否上传成功，这属于业务逻辑
     * @property {Function} options.getUploadUrl promise 返回 { id: '', url: '' }
     * @property {Function} options.getResumeUploadUrl promise 返回 { uploaded: number, id: '', url: '' }
     * @property {Function=} options.onResumeUploadWait 拉取到服务器的续传数据前，可能需要等待一段时间
     * @property {Function=} options.onResumeUploadCancel 拉取不到服务器的续传数据，则会自动取消
     * @property {Function=} options.onFileChange
     * @property {Function=} options.onUploadStart
     * @property {Function=} options.onUploadProgress
     * @property {Function=} options.onUploadSuccess
     * @property {Function=} options.onUploadError
     * @property {Function=} options.onChunkUploadSuccess
     * @property {Function=} options.onChunkUploadError
     * @property {Function=} options.onUploadComplete
     */
    function VideoUploader(options) {
        $.extend(this, VideoUploader.defaultOptions, options);
        this.init();
    }

    VideoUploader.prototype = {
        init: function () {

            var me = this;
            if (me.useChunk) {
                if (!supportChunk) {
                    me.useChunk = false;
                }
            }

            var syncCurrentFile = function (data) {
                var fileItem = data.fileItem;
                var currentFile = me.currentFiles[fileItem.index];
                $.extend(currentFile.fileItem, fileItem);
                return currentFile;
            };

            var uploader = new Uploader({
                mainElement: me.mainElement,
                action: '',
                fileName: me.name,
                useChunk: me.useChunk,
                chunkSize: me.chunkSize,
                onfilechange: function (e) {

                    var files = uploader.getFiles();

                    // 为了以后支持多文件上传
                    me.currentFiles = $.map(files, function (fileItem) {
                        var file = fileItem.file;
                        return {
                            fileItem: fileItem,
                            videoName: file.name,
                            videoSize: file.size,
                            videoType: file.type
                        };
                    });

                    if ($.isFunction(me.onFileChange)) {
                        me.onFileChange();
                    }
                },
                onuploadstart: me.useChunk
                    ? function (e, data) {

                        var currentFile = syncCurrentFile(data);

                        if (!currentFile[CHUNK_UPLOAD_RETRY]) {

                            var fileItem = currentFile.fileItem;

                            var file = fileItem.file;
                            var chunkIndex = fileItem.chunk.index;

                            if (!file.size) {
                                chunkIndex = 0;
                                uploader.stopFile(fileItem.index);
                            }

                            if (needSaveChunkInfoToLocalStorage) {
                                localStorage.set(
                                    getLocalKey(file),
                                    chunkIndex + '|' + currentFile.uploadId + '|' + $.now()
                                );
                            }

                            if (!file.size) {
                                if ($.isFunction(me.onUploadError)) {
                                    me.onUploadError();
                                }
                                uploader.stop();
                                return;
                            }

                            if ($.isFunction(me.onUploadStart)) {
                                me.onUploadStart(data);
                            }
                        }

                    }
                    : null,
                onuploadprogress: function (e, data) {
                    var currentFile = syncCurrentFile(data);

                    var uploaded = data.uploaded;
                    var now = $.now();
                    var lastTime = currentFile.lastTime || currentFile.uploadStartTime;

                    var byteOffset = uploaded - currentFile.uploaded;
                    var timeOffset = (now - lastTime) / 1000;

                    if (timeOffset < 1) {
                        byteOffset *= 1 / timeOffset;
                        timeOffset = 1;
                    }

                    var speed = byteOffset / timeOffset;

                    currentFile.lastTime = now;
                    currentFile.uploaded = uploaded;
                    currentFile.speeds.push(speed);

                    if (!currentFile[CHUNK_UPLOAD_RETRY]) {
                        if ($.isFunction(me.onUploadProgress)) {
                            me.onUploadProgress(data);
                        }
                    }
                },
                onchunkuploadsuccess: function (e, data) {

                    var currentFile = syncCurrentFile(data);

                    var response;
                    try {
                        response = $.parseJSON(data.responseText);
                    }
                    catch (e) { }

                    // 如果分片上传成功
                    if (!$.isFunction(me.isChunkUploadSuccess)
                        || me.isChunkUploadSuccess(response)
                    ) {
                        if (me.retryUploadNextChunk(currentFile)) {
                            e.preventDefault();
                            return;
                        }
                        if ($.isFunction(me.onChunkUploadSuccess)) {
                            me.onChunkUploadSuccess(data);
                        }
                        return;
                    }

                    e.preventDefault();

                    if (currentFile.chunkFailCount < me.chunkUploadMaxCount) {
                        currentFile.chunkUploadTimer = setTimeout(
                            function () {
                                currentFile.chunkUploadTimer = null;
                                uploader.upload(currentFile.fileItem);
                            },
                            me.chunkUploadInterval
                        );
                    }
                    else {
                        me.stopFile(currentFile.fileItem.index);
                        if ($.isFunction(me.onChunkUploadError)) {
                            me.onChunkUploadError(data);
                        }
                        return;
                    }

                    currentFile.chunkFailCount++;

                },
                onuploadsuccess: function (e, data) {

                    var currentFile = syncCurrentFile(data);

                    var response;
                    try {
                        response = $.parseJSON(data.responseText);
                    }
                    catch (e) { }

                    if (!$.isFunction(me.isUploadSuccess)
                        || me.isUploadSuccess(response)
                    ) {
                        if (!currentFile[CHUNK_UPLOAD_RETRY]) {
                            if (me.useChunk && needSaveChunkInfoToLocalStorage) {
                                localStorage.remove(
                                    getLocalKey(currentFile.fileItem.file)
                                );
                            }
                            if ($.isFunction(me.onUploadSuccess)) {
                                me.onUploadSuccess(data);
                            }
                        }
                    }
                    else {
                        me.stopFile(currentFile.fileItem.index);
                        if ($.isFunction(me.onUploadError)) {
                            me.onUploadError(data);
                        }
                    }

                },
                onuploaderror: function (e, data) {
                    var currentFile = syncCurrentFile(data);
                    if (currentFile[CHUNK_UPLOAD_RETRY]) {
                        delete currentFile[CHUNK_UPLOAD_RETRY];
                    }
                    if (data.errorCode !== Uploader.ERROR_CANCEL
                        && $.isFunction(me.onUploadError)
                    ) {
                        // 有上传速度，且上传失败，切换到自家的 cdn
                        if (selectedCdn && selectedCdn !== selfCdn) {
                            setCdnSpeedTestResult(selfCdn);
                            currentFile.fileItem.chunk.index = 0;
                            me.upload(currentFile);
                        }
                        else {
                            me.onUploadError(data);
                        }
                    }
                },
                onuploadcomplete: function (e, data) {
                    var currentFile = syncCurrentFile(data);
                    if (!currentFile[CHUNK_UPLOAD_RETRY]) {
                        if ($.isFunction(me.onUploadComplete)) {
                            me.onUploadComplete(data);
                        }
                    }
                }
            });

            me.uploader = uploader;

        },

        validateFiles: function (files) {

            var me = this;
            var result = true;

            $.each(files, function (index, file) {
                if (!me.validateFile(file)) {
                    result = false;
                    return false;
                }
            });

            return result;

        },

        validateFile: function (file) {

            var me = this;

            var error;
            var index = $.inArray(file.videoType, accept);
            if (index === -1) {
                error = '文件格式错误，请上传 ' + accept.join('、') + ' 等格式的视频';
            }
            else {
                if (me.maxSize) {
                    if (file.videoSize > me.maxSize) {
                        error = me.maxSizeError;
                    }
                }
                else {
                    var max = maxSize[me.uploader.type];
                    if (file.videoSize > max.value) {
                        error = max.text;
                    }
                }
            }

            if (error) {
                alert({
                    type: 'error',
                    content: error
                });
                return;
            }

            if ($.isFunction(me.validateVideo)
                && !me.validateVideo(file)
            ) {
                return;
            }

            return true;

        },

        getUploadSpeed: function (index) {
            var sum = 0;
            var count = 0;
            var currentFile = this.currentFiles[index];
            if (currentFile && currentFile.speeds) {
                currentFile.speeds.each(function (speed) {
                    sum += speed;
                    count++;
                });
            }
            return count > 0
                ? parseFloat((sum / count).toFixed(2), 10)
                : 0;
        },

        uploadFile: function (file) {

            var me = this;
            var uploader = me.uploader;

            uploader.set('action', file.uploadUrl, { force: true });

            var fileItem = file.fileItem;
            var fileIndex = fileItem.index;

            if (fileItem.chunk) {
                if (fileItem.chunk.index === 0) {
                    fileItem.chunk.uploaded = 0;
                }
            }
            else {
                fileItem = null;
            }

            // 异步
            // 避免在 onuploadsuccess 中发起下一个请求，却因为后续的 onuploadcomplete 已经销毁了 fileItem
            setTimeout(
                function () {
                    if (fileItem) {
                        fileItem.status = Uploader.STATUS_WAITING;
                    }
                    uploader.upload(fileIndex, fileItem);
                }
            );

        },

        autoUpload: function (data) {
            var me = this;

            data.uploadStartTime = $.now();
            data.chunkFailCount = 0;
            data.uploaded = 0;
            data.speeds = new FiniteArray({ max: 5 });

            var file = data.fileItem.file;
            if (me.useChunk) {
                if (needSaveChunkInfoToLocalStorage) {
                    var localValue = localStorage.get(getLocalKey(file));
                    if (localValue) {
                        var terms = localValue.split('|');
                        var time = terms[2];
                        if ($.now() - time < me.resumeExpireTime) {
                            data.uploadId = terms[1];
                            me.resumeUpload(data);
                            return;
                        }
                    }
                }
                data.chunk = true;
            }

            me.upload(data);
        },

        upload: function (file) {

            var me = this;

            var errorHandler = function (response) {
                if (response && response.code < 0) {
                    alert({
                        type: 'error',
                        title: '错误',
                        content: '上传失败，目前网络不可用'
                    });
                }
            };

            var upload = function (cdnHost) {
                file.cdnHost = cdnHost;
                me.getUploadUrl(file)
                .then(
                    function (response) {
                        file.fid = response.fid;
                        file.uploadId = response.id;
                        file.uploadUrl = response.url;
                        me.uploadFile(file);
                    },
                    errorHandler
                );
            };

            if (needCdnSpeedTest) {
                service
                .getCDNSpeedTestUrls()
                .then(
                    function (response) {

                        var cdnSpeedTestUrls = response.data.test_speed_urls;

                        // 最后一个是自己的 cdn
                        selfCdn = urlUtil.parse(cdnSpeedTestUrls[cdnSpeedTestUrls.length - 1]).origin;

                        var cdnHost;

                        if (file.chunk) {
                            var cdnOrigin = getCdnSpeedTestResult();
                            if (cdnOrigin) {
                                // 查看是否包含该 cdn
                                $.each(cdnSpeedTestUrls, function (index, url) {
                                    if (cdnOrigin === urlUtil.parse(url).origin) {
                                        cdnHost = cdnOrigin;
                                        return false;
                                    }
                                });
                            }
                            if (!cdnHost) {
                                cdnSpeedTest(
                                    file.fileItem,
                                    cdnSpeedTestUrls,
                                    upload
                                );
                                return;
                            }
                        }
                        else {
                            cdnHost = urlUtil.parse(cdnSpeedTestUrls[0]).origin;
                        }

                        upload(cdnHost);

                    },
                    errorHandler
                );
            }
            else {
                upload();
            }

        },

        retryUploadChunks: function (file, chunks) {
            file[CHUNK_UPLOAD_RETRY] = {
                chunks: chunks,
                index: 0
            };
            file.fileItem.chunk.index = chunks[0];
            file.fileItem.chunk.uploaded = 0;
            this.uploadFile(file);
        },

        retryUploadNextChunk: function (file) {
            var retry = file[CHUNK_UPLOAD_RETRY];
            if (retry) {
                var index = retry.index + 1;
                if (retry.chunks[index]) {
                    retry.index = index;
                    file.fileItem.chunk.index = retry.chunks[index];
                    file.fileItem.chunk.uploaded = 0;
                    this.uploadFile(file);
                }
                else {
                    delete file[CHUNK_UPLOAD_RETRY];
                }
                return true;
            }
        },

        resumeUpload: function (file) {

            var me = this;
            var maxCount = me.resumeUploadMaxCount;
            var count = 0;

            if ($.type(maxCount) !== 'number') {
                throw new Error(
                    '[VideoUploader]resumeUploadMaxCount must be number.'
                );
            }

            var getResumeUploadUrl = function () {
                var cdnHost;
                service
                .getCDNSpeedTestUrls()
                .then(function (response) {
                    var cdnSpeedTestUrls = response.data.test_speed_urls;
                    cdnHost = urlUtil.parse(cdnSpeedTestUrls[0]).origin;
                    file.cdnHost = selectedCdn || cdnHost;
                    
                    me
                    .getResumeUploadUrl(file)
                    .then(function (response) {

                        var hasId = 'id' in response;
                        if (!hasId) {
                            if (!count) {
                                me.waitResumeUpload();
                            }
                            if (count < maxCount) {
                                file.resumeUploadTimer = setTimeout(
                                    function () {
                                        file.resumeUploadTimer = null;
                                        getResumeUploadUrl();
                                    },
                                    2000
                                );
                            }
                            else {
                                me.cancelResumeUpload(file);
                            }
                            return;
                        }

                        var uploaded = response.uploaded || 0;
                        var index = Math.floor(
                            parseInt(uploaded / me.chunkSize, 10)
                        );

                        file.fileItem.chunk = {
                            index: index,
                            uploaded: uploaded
                        };

                        file.fid = response.fid;
                        file.uploadId = response.id;
                        file.uploadUrl = response.url;
                        file.cdnHost = urlUtil.parse(response.url).origin;

                        me.uploadFile(file);

                        count++;

                    });
                });
            };

            getResumeUploadUrl();

        },

        waitResumeUpload: function () {
            var me = this;
            if ($.isFunction(me.onResumeUploadWait)) {
                me.onResumeUploadWait();
            }
        },

        cancelResumeUpload: function (file) {

            var me = this;

            if (file.resumeUploadTimer) {
                clearTimeout(file.resumeUploadTimer);
                file.resumeUploadTimer = null;
            }

            if (needSaveChunkInfoToLocalStorage) {
                localStorage.remove(
                    getLocalKey(file.fileItem.file)
                );
            }

            if ($.isFunction(me.onResumeUploadCancel)) {
                me.onResumeUploadCancel();
            }

        },

        stopFile: function (index) {
            var uploader = this.uploader;
            uploader.stop(index);
        },

        stop: function () {
            var uploader = this.uploader;
            var currentFiles = this.currentFiles;
            $.each(currentFiles, function (index) {
                uploader.stop(index);
            });
            uploader.reset();
        },

        enable: function () {
            this.uploader.enable();
        },

        disable: function () {
            this.uploader.disable();
        },

        reset: function () {
            this.uploader.reset();
        },

        dispose: function () {

            var me = this;

            $.each(
                me.currentFiles || [],
                function (index, file) {
                    if (file.resumeUploadTimer) {
                        clearTimeout(file.resumeUploadTimer);
                        file.resumeUploadTimer = null;
                    }

                    if (file.chunkUploadTimer) {
                        clearTimeout(file.chunkUploadTimer);
                        file.chunkUploadTimer = null;
                    }
                }
            );

            me.uploader.dispose();

        }
    };

    VideoUploader.defaultOptions = {
        name: 'file',
        useChunk: true,
        chunkUploadMaxCount: 4,
        chunkUploadInterval: 500,
        resumeUploadMaxCount: 6,
        resumeUploadInterval: 1000,
        resumeExpireTime: 0.25 * DAY,
        chunkSize: 5 * M
    };

    VideoUploader.M = M;

    return VideoUploader;

});