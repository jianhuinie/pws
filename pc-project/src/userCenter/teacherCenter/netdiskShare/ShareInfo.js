/**
 * @file 资料共享
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';
    var isFromNetdisk = false;
    var Uploader = require('custom/ui/Uploader');
    var service = require('./service');
    var divide = require('cc/function/divide');
    var multi = require('cc/function/multiply');
    var JSON = require('cc/util/json');
    var config = require('./config');

    var maxSize = 200;
    var M_SIZE = 1024 * 1024;

    var tableHeight = 48;

    var accept = [
        'pdf', 'doc', 'docx',
        'xls', 'xlsx', 'ppt',
        'pptx', 'jpg', 'jpeg',
        'png', 'txt', 'zip',
        'rar'
    ];

    var noDownload = [
        'xml', 'gif', 'bmp',
        'svg' ,'ps', 'ai',
        'rar', 'swf', 'zip'
    ];

    var action = '';
    if (siteData.env == 'test') {
        action = '/tcenter/courses/files/upload';
    }
    else {
        action = 'http://upload-file.genshuixue.com/tcenter/courses/files/upload';
    }

    var canGetSubDirectory = true;

    return Ractive.extend({
        template: require('html!./ShareInfo.html'),
        data: function () {
            return {
                style: require('text!./ShareInfo.styl'),
                formateSize: function (size) {
                    if (size == null) {
                        size = 0;
                    }
                    var result = 0;
                    if (size > M_SIZE) {
                        result = (size / M_SIZE).toFixed(2) + 'MB';
                    }
                    else if (size > 1024) {
                        result = (size / 1024).toFixed(2) + 'KB';
                    }
                    else {
                        result = size.toFixed(2) + 'B';
                    }
                    return result;
                },
                formatSpeed: function (speed) {
                    if (speed == null) {
                        speed = 0;
                    }
                    var result = 0;
                    if (speed == null) {
                        speed = 0;
                    }

                    if (speed > M_SIZE) {
                        result = (speed / M_SIZE).toFixed(2) + 'MB/s';
                    }
                    else if (speed > 1024) {
                        result = (speed / 1024).toFixed(2) + 'KB/s';
                    }
                    else {
                        result = speed.toFixed(2) + 'B/s';
                    }
                    return result;
                },
                formatRestTime: function (restTime) {
                    if (restTime == null) {
                        restTime = 0;
                    }
                    if (restTime < 0) {
                        return 0.00;
                    }
                    return restTime.toFixed(2);
                },
                UPLOADER_STATUS_UPLOADING: config.UPLOADER_STATUS_UPLOADING,
                UPLOADER_STATUS_SUCCESS: config.UPLOADER_STATUS_SUCCESS,
                UPLOADER_STATUS_ERROR: config.UPLOADER_STATUS_ERROR,
                UPLOADER_STATUS_CANCELED: config.UPLOADER_STATUS_CANCELED,
                UPLOADER_STATUS_COPYNAME: config.UPLOADER_STATUS_COPYNAME,
                M_SIZE: M_SIZE,
                rootUrl: siteData.source + '/userCenter/teacherCenter/netdiskShare/img',
                netDiskFiles: [],
                crumbs: [],
                truncateCrumbs: false,
                canDownload: true,
                isOpen: false,
                moveIndexs: [],
                options: {
                    isFromNetdisk: false,
                    files: [],
                    courseNumber: '',
                    courseType: '',
                    close: $.noop,
                    uploadFromLocal: $.noop,
                    stop: $.noop,
                    fileCount: 0,
                    refresh: $.noop
                },
                canShare: true,
                cancel: true,
                downloadTips: ''
            };
        },
        computed: {
            checkedAll: {
                get: function () {
                    return this.get('checkedFiles').length
                        === this.get('totalFiles').length
                        && this.get('successUplodeFiles').length != 0;
                },
                set: function (checked) {
                    var data = { };
                    var list = this.get('netDiskFiles');
                    $.each(list, function (index, item) {
                        if (!item.hasSubDirectory && !item.hasShare) {
                            data['netDiskFiles.' + index + '.checked'] = checked;
                        }
                    });
                    this.set(data);
                }
            },
            checkedFiles: function () {
                var result = [];
                $.each(
                    this.get('netDiskFiles'),
                    function (index, item) {
                        if (item.checked && !item.hasSubDirectory && !item.hasShare) {
                            result.push(item);
                        }
                    }
                );
                return result;
            },
            totalFiles: function () {
                var result = [];
                $.each(
                    this.get('netDiskFiles'),
                    function (index, item) {
                        if (!item.hasSubDirectory && !item.hasShare) {
                            result.push(item);
                        }
                    }
                );
                return result;
            }
        },
        onrender: function () {
            var me = this;
            var container = $(me.getElement());

            isFromNetdisk = me.get('options.isFromNetdisk');
            if (isFromNetdisk) {
                me.getNetdiskData();

                var nowOffsetY, dargHeight, direction, directionStep;
                var beginIndex, endIndex, checkedStatus;
                var moveIndexs = [];
                var centerIndex = '';

                container
                .on(
                    'mousedown',
                    container.find('.item-list'),
                    function (e) {
                        var data = {
                            netDiskFiles: me.get('netDiskFiles')
                        }
                        nowOffsetY = e.clientY;
                        var currentTarget = $(e.target).closest('.item');
                        beginIndex = currentTarget.index();
                        if (beginIndex >= 0) {
                            checkedStatus = data.netDiskFiles[beginIndex].checked;
                        }
                    }
                )
                .on(
                    'mouseup',
                    container.find('.item-list'),
                    function (e) {
                        nowOffsetY = centerIndex = '';
                        moveIndexs = [];
                        if (direction && directionStep) {
                            var currentTarget = $(e.target).closest('.item');
                            // 这是最后一个被选中的节点
                            var currentIndex = currentTarget.index();
                            var endIndex = currentIndex;
                            if (beginIndex > endIndex) {
                                var temp = beginIndex;
                                beginIndex = endIndex;
                                endIndex = temp;
                            }

                            var netDiskFiles = me.get('netDiskFiles');
                            $.each(netDiskFiles, function (index, value) {
                                if (index >= beginIndex && index <= endIndex) {
                                    value.checked = !checkedStatus;
                                }
                            });
                            me.set({
                                netDiskFiles: netDiskFiles,
                                moveIndexs: []
                            });
                            direction = directionStep = '';
                        }
                    }
                )
                .mousemove(function (e) {
                    if (nowOffsetY) {
                        dargHeight = nowOffsetY > e.clientY
                                   ? nowOffsetY - e.clientY
                                   : e.clientY - nowOffsetY;

                        direction = nowOffsetY > e.clientY ? 'up' : 'down';
                        if (dargHeight > tableHeight) {
                            var currentTarget = $(e.target).closest('.item');
                            var currentIndex = currentTarget.index();
                            if (currentIndex > 0 && moveIndexs.indexOf(currentIndex) == -1) {
                                if (moveIndexs.length == 0) {
                                    moveIndexs.push(beginIndex);
                                    return;
                                }
                                var popIndex = moveIndexs.pop();
                                if (direction == 'up') {
                                    moveIndexs = [currentIndex, beginIndex];
                                }
                                else {
                                    moveIndexs = [beginIndex, currentIndex];
                                }
                            }

                            me.set('moveIndexs', moveIndexs);
                            directionStep = Math.ceil(dargHeight / tableHeight);
                        }
                        else if (moveIndexs) {
                            moveIndexs = [beginIndex, beginIndex];
                            me.set('moveIndexs', moveIndexs);
                        }
                    }
                });
                me.observe('moveIndexs', function (indexs) {
                    if (indexs.length != 0) {
                        var data = { };
                        var netDiskFiles = me.get('netDiskFiles');
                        $.each(netDiskFiles, function (index, value) {
                            if (indexs[0] <= index && index <= indexs[1]) {
                                data['netDiskFiles.' + index + '.checked'] = !checkedStatus;
                            }
                        });

                        var isUp = direction == 'up';
                        if (!centerIndex) {
                            isUp ? centerIndex = indexs[0] : centerIndex = indexs[1];
                        }

                        if (isUp) {
                            if (indexs[0] > centerIndex) {
                                data['netDiskFiles.' + centerIndex + '.checked'] = false;
                                centerIndex = indexs[0];
                            }
                            else {
                                centerIndex = indexs[0];
                            }
                        }
                        else {
                            if (indexs[1] < centerIndex || !indexs[1]) {
                                data['netDiskFiles.' + centerIndex + '.checked'] = false;
                                centerIndex = indexs[1];
                            }
                            else {
                                centerIndex = indexs[1];
                            }
                        }

                        me.set(data);
                    }
                });
                me.observe('netDiskFiles.*.checked', function () {
                    var list = me.get('netDiskFiles');
                    var data = {};
                    var canShare = true;
                    var count = 0;
                    var typeArr = [];
                    $.each(list, function (index, value) {
                        if (value.checked) {
                            if (noDownload.indexOf(value.fileType) != -1 && typeArr.indexOf(value.fileType) == -1) {
                                typeArr.push(value.fileType)
                            }
                            count++;
                        }
                    });
                    if (typeArr.length > 0) {
                        data['cancel'] = false;
                        data['canDownload'] = true;
                        data['downloadTips'] = '包含无法在线观看的文件类型（' + typeArr.join('，') + '），只能允许学生下载';
                    }
                    else {
                        data['downloadTips'] = '';
                        data['cancel'] = true;
                    }

                    if (count == 0) {
                        data['canShare'] = false;
                    }
                    else {
                        data['canShare'] = true;
                    }
                    me.set(data);
                });
                me.observe('crumbs', function () {
                    var crumbs = me.get('crumbs');
                    if (crumbs.length > 0) {
                        var maxLength = 34;
                        var crumbsLength = 0;
                        $.each(
                            crumbs,
                            function (index, value) {
                                if (value.name.length > 10) {
                                    crumbsLength = crumbsLength + 10;
                                }
                                else {
                                    crumbsLength = crumbsLength + value.name.length;
                                }
                            }
                        )
                        if (crumbsLength > maxLength) {
                            me.set('truncateCrumbs', true);
                        }
                    }
                });
            }
            else {
                me.observe('options.files', function () {
                    var list = me.get('options.files');
                    var data = { };
                    var canShare = true;
                    var result = [];

                    $.each(list, function (index, value) {
                        if (value.status == config.UPLOADER_STATUS_UPLOADING) {
                            canShare = false;
                        }
                        if (value.status == config.UPLOADER_STATUS_SUCCESS) {
                            if (noDownload.indexOf(value.file.type) != -1) {
                                result.push(value.file.type);
                            }
                        }
                    });

                    data.downloadTips = result.length > 0
                                ? '包含无法在线观看的文件类型（' + result.join('，') + '），只能允许学生下载'
                                : '';
                    data.canDownload = true;
                    data.cancel = result.length > 0 ? false : true;
                    data.canShare = canShare ? true : false;
                    me.set('options.files', list);
                    me.set(data);
                });

                var setUploadFileProps = function (index, props) {
                    var data = { };
                    var keypath = 'options.files.' + index + '.';
                    $.each(props, function (key, value) {
                        data[keypath + key] = value;
                    });
                    me.set(data);
                };

                var setUploadFileStatus = function (fileItem) {
                    setUploadFileProps(
                        fileItem.index,
                        {
                            status: fileItem.status
                        }
                    );
                };

                var setFileFid = function (fileItem, response) {
                    setUploadFileProps(
                        fileItem.index,
                        {
                            fid: response.data.fid
                        }
                    );
                };
                me.uploader = new Uploader({
                    mainElement: container.find('input[type="file"]'),
                    multiple: true,
                    ignoreError: true,
                    action: action,
                    data: {
                        user_number: userData.number
                    },
                    fileName: 'Filedata',
                    onfilechange: function () {
                        var files = me.uploader.getFiles();
                        var typeArr = [];
                        var error;
                        var countSize = 0;

                        $.each(
                            files,
                            function (index, value) {
                                countSize = countSize + value.file.size;
                                if ($.inArray(value.file.type, accept) < 0 && typeArr.indexOf(value.file.type) == -1) {
                                    typeArr.push(value.file.type);
                                };
                            }
                        );

                        if (me.get('options.fileCount') + files.length > 30) {
                            error = '每节课的资料文件不能超过30个，若您的文件过多，建议采用压缩包上传';
                        }

                        if (typeArr.length > 0) {
                            error = typeArr.join('，') + '为不可上传的文件，请勿上传';
                        }

                        if (countSize > maxSize * M_SIZE) {
                            error = '资料库上传资料不能超过 200 MB';
                        }

                        if (error) {
                            alert({
                                title: '温馨提示',
                                content: error
                            });
                            return;
                        }
                        var list = me.get('options.files');
                        var nameArr = [];
                        $.each(
                            list,
                            function (index, value) {
                                if (value.status == config.UPLOADER_STATUS_SUCCESS) {
                                    nameArr.push(value.file.name);
                                }
                            }
                        );
                        var newFiles = [];
                        $.each(
                            files,
                            function (index, value) {
                                var file = files[index];
                                var status;
                                if (nameArr.indexOf(value.file.name) != -1) {
                                    status = config.UPLOADER_STATUS_COPYNAME
                                }
                                else {
                                    me.uploader.upload(index);
                                    var status = value.status;
                                }
                                newFiles.push({
                                    index: value.index,
                                    file: value.file,
                                    status: status,
                                    progress: 0,
                                });
                            }
                        );
                        list = newFiles.concat(list);

                        me.set(
                            'options.files',
                            list
                        );
                    },
                    onuploadstart: function (e, data) {
                        setUploadFileStatus(data.fileItem);
                        setUploadFileProps(
                            data.fileItem.index,
                            {
                                startTime: $.now()
                            }
                        );
                    },
                    onuploadprogress: function (e, data) {
                        var fileItem = data.fileItem;
                        var startTime = me.get('options.files.' + fileItem.index + '.startTime');
                        var speed = data.uploaded / (0.001 * ($.now() - startTime));
                        var restTime = (data.total - data.uploaded) / speed;

                        setUploadFileProps(
                            fileItem.index,
                            {
                                progress: data.percent,
                                uploaded: data.uploaded,
                                speed: speed,
                                restTime: restTime
                            }
                        );
                    },
                    onuploadsuccess: function (e, data) {
                        var response = JSON.parse(data.responseText);
                        if (response.code != 0) {
                            me.set(
                                'options.files.' + data.fileItem.index + '.status',
                                config.UPLOADER_STATUS_ERROR
                            );
                            alert({
                                title: '温馨提示',
                                content: response.msg
                            });
                            return;
                        }
                        setUploadFileStatus(data.fileItem);
                        setFileFid(data.fileItem, response);
                    },
                    onuploaderror: function (e, data) {
                        if (data.errorCode === Uploader.ERROR_CANCEL) {
                            me.set(
                                'options.files.' + data.fileItem.index + '.status',
                                config.UPLOADER_STATUS_CANCELED
                            );
                        }
                        else {
                            setUploadFileStatus(data.fileItem)
                        }
                    },
                    onuploadcomplete: function () {
                        me.uploader.reset();
                    }
                });
                me.observe('canShare', function (status) {
                    if (!status) {
                        me.uploader.disable();
                    }
                    else {
                        me.uploader.enable();
                    }
                });
            }

        },
        onteardown: function () {
            if (this.uploader) {
                this.uploader.dispose();
            }
        },
        uploadFromLocal: function () {
            var me = this;
            me.get('options').uploadFromLocal();
        },
        intoSubDirectory: function (item) {
            var me = this;
            if (item.hasSubDirectory && canGetSubDirectory) {
                var path = item.path;
                var name = item.name;
                var fid = item.fid;
                var data = { };
                var crumbs = me.get('crumbs');
                crumbs.push({
                    name: name,
                    path: path,
                    fid: fid
                });
                data['crumbs'] = crumbs;
                me.getNetdiskData(path);
                me.set(data);
            }
        },
        changeDirectory: function (item, index) {
            var me = this;
            var crumbs = me.get('crumbs');
            if (crumbs.length == (index + 1)) {
                return;
            }
            var data = { };
            data['crumbs'] = crumbs.slice(0, index + 1);
            var path = item ? item.path : '';
            me.getNetdiskData(path);
            me.set(data);
        },
        getNetdiskData: function (path) {
            var me = this;
            var netDiskFiles = [];
            canGetSubDirectory = false;
            service
            .getDataFromNetdisk({
                path: path,
                courseNumber: me.get('options.courseNumber'),
                courseType: me.get('options.courseType'),
            })
            .then(function (data) {
                if (data.data.objects.length > 0) {
                    $.each (
                        data.data.objects,
                        function (index, value) {
                            var path = value.path;

                            var hasSubDirectory = false;
                            if (path.charAt(path.length - 1) == '/') {
                                hasSubDirectory = true;
                            }

                            var hasShare = false;
                            if (value.has_share) {
                                hasShare = true;
                            }
                            var size = value.size;
                            if (size > M_SIZE) {
                                size = (size / M_SIZE).toFixed(1) + 'M';
                            }
                            else if (size > 1024) {
                                size = (size / 1024).toFixed(2) + 'KB';
                            }
                            else {
                                size = size.toFixed(2) + 'B';
                            }

                            netDiskFiles.push({
                                fid: value.fid,
                                type: value.file_type,
                                name: value.name,
                                fileType: value.file_type,
                                size: size,
                                path: value.path,
                                hasSubDirectory: hasSubDirectory,
                                hasShare: hasShare,
                                checked: false
                            });
                        }
                    );
                    me.set({
                        'netDiskFiles': netDiskFiles
                    });
                    me.get('options').refresh();
                }
                else {
                    me.set({
                        'netDiskFiles': null
                    });
                    me.get('options').refresh();
                }
                canGetSubDirectory = true;
            });
        },
        shareComplete: function () {
            var me = this;
            if (!me.get('canShare')) {
                return;
            }
            var list = [];
            var fids = [];
            var count = 0;
            var canDownload = me.get('canDownload');
            var isOpen = me.get('isOpen');
            var hasMustDownload = false;
            var canDownloadType = [];
            if (isFromNetdisk && me.get('netDiskFiles')) {
                $.each(
                    me.get('netDiskFiles'),
                    function (index, value) {
                        if (!value.hasSubDirectory && value.checked) {
                            value.canDownload = canDownload;
                            value.isOpen = isOpen;
                            if (noDownload.indexOf(value.fileType) != -1 && canDownloadType.indexOf(value.fileType) == -1) {
                                canDownloadType.push(value.fileType);
                                hasMustDownload = true;
                            }
                            list.push(value);
                            fids.push(value.fid);
                        }
                    }
                )
            }
            else {
                $.each(
                    me.get('options.files'),
                    function (index, value) {
                        value.canDownload = canDownload;
                        value.isOpen = isOpen;
                        if (value.status == config.UPLOADER_STATUS_ERROR
                            || value.status == config.UPLOADER_STATUS_CANCELED
                            || value.status == config.UPLOADER_STATUS_COPYNAME) {
                            count ++;
                        }
                        if (noDownload.indexOf(value.file.type) != -1 && canDownloadType.indexOf(value.file.type) == -1) {
                            canDownloadType.push(value.file.type);
                            if (value.status == config.UPLOADER_STATUS_SUCCESS) {
                                hasMustDownload = true;
                            }
                        }
                        list.push(value);
                        fids.push(value.fid);
                    }
                );
            }

            if (hasMustDownload && !canDownload) {
                alert({
                    title: '温馨提示',
                    content: '所选文件包含无法在线观看的文件类型（' + canDownloadType.join('，') + '），请选择允许学生下载'
                });
                return;
            }

            var props = {
                canDownload: canDownload,
                isOpen: isOpen,
                fids: fids.join(',')
            }

            if (count) {
                alert({
                    title: '温馨提示',
                    width: 320,
                    content: '有' + count + '个文件上传失败，确定要舍弃上传失败的文件？',
                    buttons: [
                        {
                            text: '确定',
                            type: 'primary',
                            action: function () {
                                this.hide();
                                me.get('options').close(list, props);
                            }
                        },
                        {
                            text: '取消',
                            type: 'secondary',
                            action: function () {
                                this.hide();
                            }
                        }
                    ]
                });
                return;
            }
            me.get('options').close(list, props);
        },
        cancelUpload: function (index) {
            var me = this;
            me.uploader.stop(index);
            me.get('options').stop(index);
        },
        uploadAgain: function (item) {
            this.uploader.upload(item);
        }
    });
});
