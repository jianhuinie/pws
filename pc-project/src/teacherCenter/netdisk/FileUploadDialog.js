/**
 * @file 资料库 文件上传对话框
 * @author liucong
 */
define(function (require, exports) {
    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var etpl = require('cobble/util/etpl');
    var Uploader = require('cobble/ui/Uploader');
    var formatFiles = require('./formatFiles');
    var store = require('common/store');
    var NetdiskTipDialog = require('./NetdiskTipDialog');
    var _ = require('underscore');

    var namespace = '.fileUploadDialog';
    var accept = ['xml', 'txt', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'mp3'
            , 'wma', 'wav', 'mid', 'm4a', 'pdf', 'ps', 'ai', 'rar', 'swf', 'zip'
            , 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx'];

    var statusMap = {
        wait: {
            icon: 'icon-clock',
            text: '等待上传'
        },
        error: {
            icon: 'icon-info-circle',
            text: '上传失败'
        },
        success: {
            icon: 'icon-check-circle',
            text: '上传成功'
        },
        progress: {
            icon: '',
            text: ''
        }
    };

    var tplFile = '' //单个文件条目模板
        + '<tr data-name=${file.name}>'
        +     '<td class="left">'
        +         '<div class="name">'
        +             '<i class="icon icon-file-${file.type} tiny"></i>${file.name}'
        +         '</div>'
        +     '</td>'
        +     '<td>${file.sizeStr}</td>'
        +     '<td class="status">'
        +         '<i class="icon icon-clock"></i>'
        +         '<span>等待上传</span>'
        +     '</td>'
        +     '<!-- <td><i class="icon icon-upload-cancel"></i></td> -->'
        + '</tr>';

    var tpl = '' //对话框content模板
        + '<table class="table fix-header">'
        +     '<thead>'
        +         '<tr>'
        +             '<th class="left" width="50%">名称</th>'
        +             '<th width="15%">大小</th>'
        +             '<th width="15%">状态</th>'
        + '<!--             <th width="10%">操作</th> -->'
        +         '</tr>'
        +     '</thead>'
        + '</table>'
        + '<div class="table-container">'
        +     '<div class="wrapper">'
        +         '<table class="table">'
        +             '<colgroup>'
        +                 '<col width="50%"></col>'
        +                 '<col width="15%"></col>'
        +                 '<col width="15%"></col>'
        +                 '<!-- <col width="10%"></col> -->'
        +             '</colgroup>'
        + ''
        +             '<tbody>'
        +             '<!-- for: ${files} as ${file} -->'
        +               tplFile
        +             '<!-- /for -->'
        +             '</tbody>'
        +         '</table>'
        +         '<div class="progress"></div>'
        +     '</div>'
        + '</div>'
        + '<div class="action">'
        +     '<input type="file" name="files" multiple>'
        +     '<button class="btn-primary new small add"><i class="icon icon-plus"></i>添加资料</button>'
        +     '<span class="hint text-info"><i class="icon icon-info-circle"></i>严禁存储、处理、传输、发布任何涉密、色情、暴力、侵权等违法违规内容</span>'
        + '</div>';

    /**
     * 构造函数
     *
     * @param {Object} options
     * @property {Array.<Object>} options.files 文件队列
     *                {
     *                    name: '文件名',
     *                    sizeStr: '1M'
     *                    size: '57612',
     *                    type: 'doc' //doc txt xls ...
     *                }
     * @property {Array.<Object>} options.otherFiles 文件夹内的其他文件 用于校验innerUploader选中文件是否有相同的文件名
     *                {
     *                    name: 'xx',
     *                    type: 'xx'
     *                }
     *
     * @param {string} options.action  url
     * @param {string} options.accpect 可接受类型
     * @param {string} options.data 上传接口参数
     * @param {Function=} onAfterHide
     *
     */
    function FileUploadDialog(options) {
        $.extend(this, options);
        this.init();
    }


    /**
     * 构建文件行元素，并加入表格
     * @param  {Array}  files     文件队列 { name, size, type }
     * @param  {Object} container 表格表体元素
     * @param  {Object} cache     文件列表存储
     */
    function buildFiles(files, container, cache) {

        $.each(files, function (index, item) {
            var el = $(etpl.compile(tplFile)({
                file: item
            }));

            container.append(el);

            cache[item.name] = el;
        });
    }

    /**
     * 更新“状态”栏
     * @param  {Object} file   file行元素
     * @param  {string} status 状态
     * @param  {string} percent 百分比 高优先级显示
     */
    function updateStatus(file, status, percent) {
        var allClass = '';

        $.each(statusMap, function (key, value) {
            allClass += (' ' + value.icon);
        });

        file.find('.status')
        .find('.icon')
        .removeClass(allClass)

        .addClass(statusMap[status].icon)
        .find('+span')
        .text(percent ? percent : statusMap[status].text);
    }

    /**
     * 禁用某个uploader
     * @param  {Object} uploader
     */
    function disableUploader(uploader, container) {
        //uploader.element.closest('.action').find('.add').addClass('disabled');
        container.find('.add').addClass('disabled');
        uploader.disable();
    }

    /**
     * 启用某个uploader
     * @param  {Object} uploader
     */
    function enableUploader(uploader, container) {
        //uploader.element.closest('.action').find('.add').removeClass('disabled');
        container.find('.add').removeClass('disabled');
        uploader.enable();
    }

    function showCloseComfirm(callback) {

        confirm({
            title: '温馨提示',
            content: '你还有资料未上传完成，关闭窗口后资料将上传失败</br>确认要关闭窗口吗？'
        })
        .done(callback);
    }

    function confirmOnLeave() {
        $(window).on(
            'beforeunload' + namespace,
            function () {
                return '您有未上传完成的文件，确定要关闭资料库吗？';
            }
        );
    }

    function dontConfirmOnLeave() {
        $(window).off('beforeunload' + namespace);
    }

    FileUploadDialog.prototype = {
        init: function () {

            var me = this;

            var cache = {}; //key:filename value:file tr element
            var hasWait = true;
            var exceedQuota = false;

            confirmOnLeave();

            me.otherFiles && $.each(me.otherFiles, function (index, item) {
                cache[item.name] = {}; //只标记个名字，所以存下空对象
            });

            var dialog = new Dialog({
                title: '添加到当前位置',
                content: etpl.compile(tpl)(),
                skinClass: 'file-upload-dialog',
                width: 642,
                disposeOnHide: false,
                onBeforeHide: function () {
                    if (hasWait) {

                        showCloseComfirm(function () {
                            hasWait = false;
                            dialog.hide();
                        });

                        return false;
                    }

                    me.outerUploader.stop();
                    innerUploader.off(namespace);
                    innerUploader.dispose();

                    me.outerUploader.off(namespace);
                    $(window).off(namespace);

                },
                onAfterHide: me.onAfterHide
            });

            var element = dialog.element;
            var tbody = element.find('tbody');

            buildFiles(me.files, tbody, cache);

            var actionElement = element.find('.action');

            var innerUploader = new Uploader({
                element: element.find('.action :file'),
                multiple: true,
                accept: me.accept,
                action: me.action,
                data: me.data,
                onFileChange: function () {
                    var files = this.getFiles();
                    files = formatFiles(files);

                    var same = [];
                    if (!_.every(files, function (item) {
                        var f = Boolean(cache[item.name])
                        if (f) {
                            same.push(item.name);
                        }
                        return !f;
                    })) {
                        var message = ''
                                +   '你上传的资料<span class="text-primary">' + same.join(';') + '</span>'
                                +   '在当前目录下存在重名文件（夹），请修改后再上传';

                        new NetdiskTipDialog({
                            message: message
                        });
                        innerUploader.reset();
                        return;
                    }

                    if (!_.every(files, function(item) {
                        return item.size <= 25000000;
                    })) {
                        new NetdiskTipDialog({
                            message: '抱歉，目前暂不支持上传超过25MB的文件，请重新选择文件'
                        });
                        innerUploader.reset();
                        return;
                    }

                    if (!_.every(files, function(item) {
                        return !(/[,%]/.test(item.name));
                    })) {
                        new NetdiskTipDialog({
                            message: '请勿上传文件名带有英文逗号，百分号的文件'
                        });
                        innerUploader.reset();
                        return;
                    }

                    if (files.length > 0) {
                        buildFiles(files, tbody, cache);
                        disableUploader(innerUploader, actionElement);

                        this.upload();
                        hasWait = true;
                        confirmOnLeave();
                    }
                },
                onReady: function () {
                    //因为目前uploader不支持多入口动态添加
                    //所以要先禁用内部uploader
                    //待外部uploader全部上传完毕或失败后 再启用内部uploader 添加新的文件
                    disableUploader(this, actionElement);
                }
            });

            var progressBar = element.find('.progress');

            var handler = {
                error: function (e, data) {

                    var file = cache[data.fileItem.file.name];
                    updateStatus(file, 'error');
                    delete cache[data.fileItem.file.name];
                },
                uploadStart: function (e, data) {
                    var file = cache[data.fileItem.file.name];
                    var offsetTop = file.prop('offsetTop');
                    progressBar.css('top', offsetTop);
                    progressBar.show();
                },
                uploadProgress: function (e, data) {


                    var file = cache[data.fileItem.file.name];
                    progressBar.css('width', data.percent);

                    updateStatus(file, 'progress', data.percent);
                },
                success: function (e, data) {
                    var response = $.parseJSON(data.responseText);
                    var file = cache[data.fileItem.file.name];

                    if (response.code === 0) {
                        updateStatus(file, 'success');
                    }
                    else {
                        updateStatus(file, 'error');
                        delete cache[data.fileItem.file.name];
                        if (response.code == '200204') {
                            exceedQuota = true; //超过最大容量
                        }
                    }
                },
                complete: function(uploader) {

                    return function (e, data) {
                        var file = cache[data.fileItem.file.name];
                        progressBar.hide();

                        var length = uploader.getFiles().length;
                        var index = data.fileItem.index;

                        if (index == (length - 1)) {

                            enableUploader(innerUploader, actionElement);
                            hasWait = false;
                            dontConfirmOnLeave();

                            if (exceedQuota) {
                                exceedQuota = false; // 清除超容量标志

                                if (store.get('isOrgTeacher')) {
                                    alert({
                                        title: '温馨提示',
                                        content: '亲，空间已经占满了，删除一些不必要的文件，或联系您的机构购买或升级机构会员，马上可获得更多空间。',
                                        width: 400
                                    });
                                }
                                else {
                                    new NetdiskTipDialog({
                                        type: 'dilatation',
                                        message: '您的云存储空间不足，无法上传视频。<br>请删除一部分无用的文件，或者购买更多的云存储空间。',
                                        width: 450,
                                        onSuccess: function () {
                                            location.href = '/teacher_center/storage_space';
                                        }
                                    });
                                }


                            }
                        }
                    }
                }
            };

            me.outerUploader
            .on('uploadError' + namespace, handler.error)
            .on('uploadSuccess' + namespace, handler.success)
            .on('uploadStart' + namespace, handler.uploadStart)
            .on('uploadProgress' + namespace, handler.uploadProgress)
            .on('uploadComplete' + namespace, handler.complete(me.outerUploader));

            innerUploader
            .on('uploadError' + namespace, handler.error)
            .on('uploadSuccess' + namespace, handler.success)
            .on('uploadStart' + namespace, handler.uploadStart)
            .on('uploadProgress' + namespace, handler.uploadProgress)
            .on('uploadComplete' + namespace, handler.complete(innerUploader));

            me.outerUploader.upload();

        }
    }

    return FileUploadDialog;
});