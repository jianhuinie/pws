/**
 * @file 上传视频课组件
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var localStorage = require('cobble/util/localStorage');
    var Uploader = require('cobble/ui/Uploader');
    var service = require('common/service');
    var store = require('common/store');
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
                + ' 获得 2G 超大文件上传体验！'
        },

        AjaxUploader: {
            value: 1024 * 2 * M,
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
    /**
     * 全部价格
     * @param {Object} options
     */
    function UploadVideoCourse(options) {
        $.extend(this, options);
        this.init();
    }

    // 校验视频审核未通过的地方是否都已修改,如果全都修改了，则去掉错误标题
    function checkVideoSectionChange() {
        var flag = true ;
        var videoUpload = $('.video-upload');
        videoUpload.find('.icon-info-circle').each(function(i, item){
            if (!$(item).hasClass('pass')) {
                flag = false;
            }
        });
        if (flag) {
            videoUpload.parent().find('.wrong-title').addClass('pass').hide();
        }
    }

    UploadVideoCourse.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            var queue = me.uploadQueue;
            var queueIndex = me.queueIndex;
            var fileInput = $('<input type="file" />');

            element.append(fileInput);
            me.videoProgress = element.parent().prev();

            // 当前选择的文件
            me.fileItem = null;

            // 上传 ID
            me.uploadId = null;

            // 上传成功后, uploadId 会赋给 videoId
            me.videoId = null;

            // 尝试续传失败的最大尝试次数
            me.testMax = 6;
            me.testCount = 0;
            me.testTimer;

            me.useChunk = Uploader.supportChunk;
            me.chunkSize = 5 * M;
            me.failCount = 0;
            me.resumeFlag = false;

            me.uploader = new Uploader({
                element: fileInput,
                multiple: false,
                useChunk: me.useChunk,
                chunkSize: me.chunkSize,
                onFileChange: function () {
                    me.fileItem = me.uploader.getFiles()[0];
                    if (!me.fileItem) {
                        return;
                    }

                    me.failCount = 0;
                    var error;
                    var file = me.fileItem.file;

                    // 校验格式
                    var index = $.inArray(file.type, accept);
                    if (index === -1) {
                        error = '文件格式错误，请上传 ' + accept.join('、') + ' 等格式的视频';
                    }
                    else {
                        // 校验大小
                        if (file.size > maxSize[me.uploader.type].value) {
                            error = maxSize[me.uploader.type].text;
                        }
                    }

                    if (error) {
                        alert({
                            content: error,
                            width: 300
                        });
                        me.uploader.reset();
                        return;
                    }

                    var uploadedList = $('.video-upload').find('li');
                    var repeatFlag = false;
                    uploadedList.each(function(i, item){
                        var element = $(item);
                        if (!element.hasClass('add-lesson-video')) {
                            var name = element.data('filename');
                            if (name == file.name) {
                                alert('不能上传重复文件！');
                                repeatFlag = true;
                            }
                        }
                    });
                    // 不能上传重复文件
                    if (repeatFlag) {
                        return;
                    }

                    var count = 0 ;
                    for (var p in queue) {
                        count++;
                    }

                    if (count >= 10) {
                        alert('上传和排队中的视频总数不能超过10个！');
                        return;
                    }

                    var data = {
                        fileName: file.name,
                        fileSize: file.size
                    };

                    queue[queueIndex] = me;
                    if (count > 0) {
                        var _html = '<div class="progress-bar"><span class="txt">排队中</span><div class="progress-box"><div class="progress-status"></div></div><span class="percent">0%</span></div><a class="cancel-upload">取消上传</a>';
                        me.videoProgress.html(_html);
                        me.element.hide();
                        return;
                    }

                    if (me.useChunk) {
                        var localValue = localStorage.get(getLocalKey(file));
                        if (localValue && (localValue.split('|')[2] && ((new Date()).getTime() - localValue.split('|')[2] < 86400000))) {

                            data.videoId = localValue.split('|')[1];
                            me.resumeUpload(data);

                            return;
                        }
                        else {
                            data.chunk = true;
                        }
                    }

                    data.userNumber = store.get('number');
                    // 非断点续传
                    // 获取上传接口
                    service
                    .getVideoCourseUploadUrl(
                        data,
                        {
                            errorHandler: {
                                '200204': function (response) { // 超出存储空间限制
                                    confirm({
                                        title: '温馨提示',
                                        content: '您的云存储空间不足，无法上传视频。<br>请删除一部分无用的文件，或者购买更多的云存储空间。',
                                        width: 450,
                                        buttons: [
                                            {
                                                text: '购买空间',
                                                type: 'primary',
                                                handler: function () {
                                                    this.hide();
                                                    location.href = '/teacher_center/storage_space';
                                                }
                                            },
                                            {
                                                text: '取消',
                                                handler: function () {
                                                    this.hide();
                                                    // 将该视频从队列中删除
                                                    delete me.uploadQueue[me.queueIndex];
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

                            var responseData = response.data;

                            me.toUploadStatus({
                                id: responseData.id,
                                url: responseData.upload_url
                            });

                        }
                    });
                },
                onUploadStart: me.useChunk
                    ? function (e, data) {

                        // 本地存储，便于断点续传
                        var fileItem = data.fileItem;
                        var file = fileItem.file;
                        var chunkIndex = fileItem.chunk.index;

                        if (!file.size) {
                            chunkIndex = 0;
                            me.uploader.stop();
                        }

                        localStorage.set(
                            getLocalKey(file),
                            chunkIndex + '|' + me.uploadId + '|' + (new Date()).getTime()
                        );

                        if (!file.size) {
                            alert('上传失败，请重新上传~');
                            return;
                        }
                        //上传统计
                        var report = store.get('report');
                        me.videoVod = new VideoVod({
                            user_number : report.user_number, // 跟谁学主站用户的number
                            user_role : report.user_role, // 跟谁学主站用户角色: 学生2 老师0
                            video_id : me.uploadId, //视频ID标示
                            client : report.client, //客户端类型1.iphone 2.ipad 3.Android 4.手机M站 5.PC网页
                            app : report.app, //app类型 1.学生app 2.老师app 3.机构app 4.直播助手
                            version : report.version //版本号 包括: pc版本号、前端版本号、app版本号、ipad版本号
                        });
                        uploadStartTime = (new Date()).getTime();

                        if (me.videoProgress.html().indexOf('上传中') < 0) {

                            var _html = '';
                            _html = '<div class="progress-bar">'
                                    +       '<span class="txt">上传中</span>'
                                    +       '<div class="progress-box">'
                                    +           '<div class="progress-status" style="width:0%;"></div>'
                                    +       '</div>'
                                    +       '<span class="percent">0%</span>'
                                    +   '</div>'
                                    +   '<a class="cancel-upload">取消上传</a>' ;
                            me.videoProgress.html(_html);
                        }
                    }
                    : null,

                onUploadProgress: function (e, data) {
                    if (!me.videoProgress.find('.percent')[0]) {

                        var _html = '';
                        _html = '<div class="progress-bar">'
                                +       '<span class="txt">上传中</span>'
                                +       '<div class="progress-box">'
                                +           '<div class="progress-status" style="width:0%;"></div>'
                                +       '</div>'
                                +       '<span class="percent">0%</span>'
                                +   '</div>'
                                +   '<a class="cancel-upload">取消上传</a>' ;
                        me.videoProgress.html(_html);
                    }
                    var percent = me.videoProgress.find('.percent');
                    var progressStatus = me.videoProgress.find('.progress-status');
                    percent.html(data.percent);
                    progressStatus.width(data.percent);
                },
                onUploadSuccess: function () {

                    me.videoId = me.uploadId;

                    if (me.useChunk) {
                        localStorage.remove(
                            getLocalKey(me.fileItem.file)
                        );
                    }
                    var _html = '<span class="status"><i class="icon icon-check-circle"></i>上传成功</span><span class="title">'+(me.fileItem.file.name.length > 13 ? me.fileItem.file.name.substr(0,13)+'...': me.fileItem.file.name) +'</span><a class="del">删除</a>';
                    me.videoProgress.html(_html);
                    // 添加视频课节信息
                    var data = {};
                    var parent = me.element.parent().parent();
                    parent.data('videoid',me.videoId);
                    // 保存已上传的文件名和大小以免重复上传
                    parent.data('filename', me.fileItem.file.name);
                    parent.data('filesize', me.fileItem.file.size);
                    data.userNumber = store.get('user').number;
                    data.number = store.get('number');
                    data.sectionId = parent.data('sectionid') ? parent.data('sectionid') : '';
                    data.videoId = me.videoId;
                    data.name = parent.find('.section-title span').text() ;
                    data.fileName = parent.data('filename');
                    data.index = parent.index()+1;
                    data.payStatus = store.get('price') ? (parent.find(':radio:eq(0)').prop('checked')? 2 : 3) : 1;

                    data.type = 1;

                    service
                    .setVideoCourseSection(
                        data
                    )
                    .done(function(response){
                        if (response.code === 0) {
                            parent.data('sectionid',response.data.section_id);
                            // 上传成功后，检查是否有审核未通过的图标，如果有则去掉
                            // 如果标题审核失败,内容审核失败
                            if (parent.data('terror') && parent.data('cerror')) {
                                if (parent.hasClass('tpass')) {
                                    parent.find('.icon-info-circle').addClass('pass').hide();
                                    checkVideoSectionChange();
                                } else {
                                    parent.addClass('cpass');
                                }
                            // 如果内容审核失败
                            } else if (parent.data('cerror')) {
                                parent.find('.icon-info-circle').addClass('pass').hide();
                                checkVideoSectionChange();
                            }
                            //上传成功上报log
                            if (!me.resumeFlag) {
                                me.videoVod.send(8, me.fileItem.file.size, ((new Date()).getTime()-uploadStartTime));
                            }
                        }
                    });
                    // 隐藏上传按钮
                    me.element.hide();
                    // 上传成功后检测队列中是否有等待上传的,
                    // 如果有则进行上传
                    // 先把自己从队列中删除
                    delete me.uploadQueue[me.queueIndex];
                    var count = 0 ;
                    var tmp = 100000 ;
                    for (var p in queue) {
                        count++;
                        if (parseInt(p)<tmp) {
                            tmp = parseInt(p);
                        }
                    }
                    if (count > 0 ){
                        var that = queue[tmp];
                        var data = {
                            fileName: that.fileItem.file.name,
                            fileSize: that.fileItem.file.size
                        };
                        that.startQueueUpload(data);
                    }
                },
                onChunkUploadSuccess: function(e, data) {
                    var fileItem = data.fileItem;
                    var response = $.parseJSON(data.responseText);
                    if (!response) {
                        me.failCount = 0;
                        return;
                    }
                    // 1是成功 0是失败
                    if (!response.code) {
                        e.preventDefault();
                        me.failCount++;
                        // 重试3次
                        if (me.failCount < 4) {
                            setTimeout(
                                function () {
                                    me.uploader.upload(fileItem);
                                },
                                500
                            );
                        } else {
                            alert('上传失败');
                            //上传失败上报log
                            me.videoVod.send(9);
                        }
                    } else {
                        me.failCount = 0;
                    }

                }
            });
        },
        startQueueUpload: function (data) {// 开始上传,此函数由上一个视频上传成功后调用
            var me = this;
            var file = me.fileItem.file;

            if (me.useChunk) {
                var localValue = localStorage.get(getLocalKey(file));
                //续传间隔时间不能超过1天，否则从头开始上传
                if (localValue && (localValue.split('|')[2] && ((new Date()).getTime() - localValue.split('|')[2] < 86400000))) {

                    data.videoId = localValue.split('|')[1];
                    me.resumeUpload(data);

                    return;
                }
                else {
                    data.chunk = true;
                }
            }

            // 非断点续传
            // 获取上传接口
            data.userNumber = store.get('number');
            service
            //.getUploadVideoUrl(data)
            .getVideoCourseUploadUrl(
                data,
                {
                    errorHandler: {
                        '200204': function (response) { // 超出存储空间限制
                            confirm({
                                title: '温馨提示',
                                content: '您的云存储空间不足，无法上传视频。<br>请删除一部分无用的文件，或者购买更多的云存储空间。',
                                width: 450,
                                buttons: [
                                    {
                                        text: '购买空间',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                            location.href = '/teacher_center/storage_space';
                                        }
                                    },
                                    {
                                        text: '取消',
                                        handler: function () {
                                            this.hide();
                                            // 将该视频从队列中删除
                                            delete me.uploadQueue[me.queueIndex];
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

                    var responseData = response.data;

                    me.toUploadStatus({
                        id: responseData.id,
                        url: responseData.upload_url
                    });

                }
            });
        },
        toUploadStatus: function (data) {
            var me = this;
            me.uploadId = data.id;
            me.videoId = null;

            var url = data.url;

            me.uploader.setAction(url);

            me.uploader.upload(me.fileItem);
            // 上传中就禁用上传按钮不让用户再点
            me.element.attr('disabled',true);
            var txt = me.videoProgress.find('.txt');
            if (txt[0]) {
                txt.html('上传中');
            }
        },
        resumeUpload: function (data) { // 断点续传
            var me = this;
            me.resumeFlag = true;
            var data = { userNumber: store.get('user').number, videoId: data.videoId};
            service
            .getVideoCourseResumeUploadUrl(data)
            .done(function (response) {
                if (response.code === 0) {

                    var responseData = response.data;

                    // 获取已上传的文件大小
                    var uploaded = responseData.upload_size||0;
                    var index = parseInt(uploaded / me.chunkSize, 10);

                    me.fileItem.chunk = {
                        index: index,
                        uploaded: uploaded
                    };

                    me.toUploadStatus({
                        id: responseData.id,
                        url: responseData.upload_url
                    });

                }
                else {

                    if (me.testCount === 0) {
                        me.toWaitResumeUploadStatus();
                    }

                    me.testCount++;

                    if (me.testCount < me.testMax) {
                        me.testTimer = setTimeout(
                            function () {
                                me.resumeUpload(data);
                            },
                            10000
                        );
                    }
                    else {
                        alert('续传失败,请重新上传');
                        me.cancelResumeUpload();
                    }

                }
            });
        },
        toWaitResumeUploadStatus: function () {
            var me = this ;
            var _html = '<span class="status">正在尝试断点续传，请稍等...</span><a class="cancel-resume">取消续传</a>';
            me.videoProgress.html(_html);
            me.element.hide();
        },
        cancelResumeUpload: function () {// 取消续传
            var me = this ;

            if (me.testTimer) {
                clearTimeout(me.testTimer);
                me.testTimer = null;
            }

            localStorage.remove(
                getLocalKey(me.fileItem.file)
            );
        }

    };

    return UploadVideoCourse;

});