/**
 * @file 班课资料共享
 * @author wangtianhua
 */
define(function(require, exports, module) {

    'use strict';

    var Uploader = require('custom/ui/Uploader');
    var ShareInfo = require('./ShareInfo');
    var ractiveDialog = require('userCenter/common/function/ractiveDialog');
    var service = require('./service');
    var config = require('./config');
    var JSON = require('cc/util/json');

    var maxSize = 200;
    var M_SIZE = 1024 * 1024;

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

    var tableHeight = 70;

    function convertToFileData (backendData) {
        var files = [];
        $.each(
            backendData,
            function (index, value) {
                var temp = {
                    fid: value.fid,
                    name: value.name,
                    type: value.file_type,
                    viewCount: value.view_count,
                    downloadCount: value.download_count,
                    isOpen: value.is_open,
                    canDownload: value.can_download,
                    checked: false,
                    shareCourses: value.share_courses
                };
                files.push(temp);
            }
        )
        return files;
    }

    exports.init = function(data) {

        var ractive = new Ractive({
            el: '#container',
            template: require('html!./netdiskShare.html'),
            data: {
                courseName: data.course_name,
                courseType: data.course_type,
                courseNumber: data.course_number,
                successUplodeFiles: convertToFileData(data.file_list),
                moveIndexs: [],
                isOpenButton: false,
                canDownloadButton: false,
                canDeleteButton: false,
                quotaTotal: data.quota_total,
                quotaUsed: data.quota_used,
                UPLOADER_STATUS_UPLOADING: config.UPLOADER_STATUS_UPLOADING,
                UPLOADER_STATUS_SUCCESS: config.UPLOADER_STATUS_SUCCESS,
                UPLOADER_STATUS_ERROR: config.UPLOADER_STATUS_ERROR,
                UPLOADER_STATUS_CANCELED: config.UPLOADER_STATUS_CANCELED,
                rootUrl: siteData.source + '/userCenter/teacherCenter/netdiskShare/img'
            },
            computed: {
                checkedAll: {
                    get: function () {
                        return this.get('checkedFiles').length
                            === this.get('successUplodeFiles').length
                            && this.get('successUplodeFiles').length != 0;
                    },
                    set: function (checked) {
                        var data = { };
                        var list = this.get('successUplodeFiles');
                        $.each(list, function (index, item) {
                            data['successUplodeFiles.' + index + '.checked'] = checked;
                        });
                        this.set(data);
                    }
                },
                checkedFiles: function () {
                    var result = [];
                    $.each(
                        this.get('successUplodeFiles'),
                        function (index, item) {
                            if (item.checked) {
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

                var nowOffsetY, dargHeight, direction, directionStep;
                var beginIndex, endIndex, checkedStatus;
                var moveIndexs = [];
                var centerIndex = '';

                container
                .on(
                    'mousedown',
                    '.tbody',
                    function (e) {

                        // 获得 nowOffsetY 开始位置,
                        // beginIndex 开始索引,
                        // checkedStatus 开始状态
                        var successUplodeFiles = me.get('successUplodeFiles');
                        var data = { };
                        nowOffsetY = e.clientY;
                        var currentTarget = $(e.target).closest('tr');
                        beginIndex = currentTarget.index();
                        if (beginIndex >= 0) {
                            checkedStatus = successUplodeFiles[beginIndex].checked;
                        }
                    }
                )
                .on(
                    'mouseup',
                    '.tbody',
                    function (e) {
                        // 恢复初始值
                        nowOffsetY = centerIndex = '';
                        // 通过 direction up|down 表示上下
                        // directionStep 向下多少步
                        if (direction && directionStep) {
                            var currentTarget = $(e.target).closest('tr');
                            // 这是最后一个被选中的节点
                            var endIndex = currentTarget.index();
                            // 正确的开始结束位置
                            if (beginIndex > endIndex) {
                                var temp = beginIndex;
                                beginIndex = endIndex;
                                endIndex = temp;
                            }

                            var successUplodeFiles = me.get('successUplodeFiles');
                            $.each(
                                successUplodeFiles,
                                function (index, value) {
                                    if (index >= beginIndex && index <= endIndex) {
                                        value.checked = !checkedStatus;
                                    }
                                }
                            );
                            me.set({
                                successUplodeFiles: successUplodeFiles
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
                            var currentTarget = $(e.target).closest('tr');
                            var endIndex = currentTarget.index();

                            if (endIndex > 0 && moveIndexs.indexOf(endIndex) == -1) {
                                if (moveIndexs.length == 0) {
                                    moveIndexs.push(beginIndex);
                                    return;
                                }
                                if (moveIndexs.length > 0) {
                                    var popIndex = moveIndexs.pop();
                                    if (direction == 'up') {
                                        moveIndexs = [endIndex, beginIndex];
                                    }
                                    else {
                                        moveIndexs = [beginIndex, endIndex];
                                    }
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
                        var successUplodeFiles = me.get('successUplodeFiles');
                        if (!indexs[1]) {
                            indexs[1] = indexs[0]
                        }
                        $.each(
                            successUplodeFiles,
                            function (index, value) {
                            if (indexs[0] <= index && index <= indexs[1]) {
                                data['successUplodeFiles.' + index + '.checked'] = !checkedStatus;
                            }
                        });
                        if (centerIndex) {
                            console.log(centerIndex)
                            if (direction == 'up') {
                                if (indexs[0] > centerIndex) {
                                    data['successUplodeFiles.' + centerIndex + '.checked'] = false;
                                }
                                centerIndex = indexs[0];
                            }
                            else {
                                if (indexs[1] < centerIndex || !indexs[1]) {
                                    data['successUplodeFiles.' + centerIndex + '.checked'] = false;
                                }
                                centerIndex = indexs[1];
                            }
                        }
                        me.set(data);
                    }
                });
                me.observe('successUplodeFiles.*.checked', function (checked) {

                    if ($.type(checked) != 'boolean') {
                        return;
                    }

                    var firstCheckedFile = me.get('checkedFiles')[0];
                    if (!firstCheckedFile) {
                        return;
                    }

                    me.set({
                        isOpenButton: firstCheckedFile ? firstCheckedFile.isOpen : false,
                        canDownloadButton: firstCheckedFile ? firstCheckedFile.canDownload : false,
                        canDeleteButton: firstCheckedFile ? true : false,
                    });
                });

                var dialogRactiveInstance;
                var setUploadFileProps = function (index, props) {
                    var data = { };
                    var keypath = 'options.files.' + index + '.';
                    $.each(props, function (key, value) {
                        data[keypath + key] = value;
                    });
                    dialogRactiveInstance.set(data);
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
                        var validate = me.validateFiles(files);
                        if (validate == true) {
                            var uploadFiles = [];
                            $.each(
                                files,
                                function (index, value) {
                                    var file = files[index];
                                    me.uploader.upload(index);
                                }
                            );
                            var dialog = ractiveDialog(
                                ShareInfo,
                                {
                                    title: '上传文件至资料共享',
                                    skinClass: 'add-file-dialog'
                                },
                                {
                                    files: $.map(files, function (fileItem) {
                                        return {
                                            index: fileItem.index,
                                            file: fileItem.file,
                                            status: fileItem.status,
                                            progress: 0,
                                            uploaded: 0,
                                            startTime: 0,
                                            speed: 0,
                                            restTime: 0,
                                        };
                                    }),
                                    fileCount: me.get('successUplodeFiles').length + files.length,
                                    stop: function (index) {
                                        me.uploader.stop(index);
                                    },
                                    close: function (files, props) {
                                        dialog.hide();

                                        if (!props.fids) {
                                            return;
                                        }

                                        service
                                        .updateDataStatus({
                                            fids: props.fids,
                                            courseNumber: me.get('courseNumber'),
                                            courseType: me.get('courseType'),
                                            canDownload: props.canDownload ? 1 : 0,
                                            isOpen: props.isOpen ? 1 : 0,
                                        })
                                        .then(function (response) {
                                            if (response.code == 0) {
                                                var data = { };
                                                tip({
                                                    content: '共享成功',
                                                    type: 'success'
                                                });
                                                var successUplodeFiles = [];

                                                $.each(
                                                    files,
                                                    function (index, value) {
                                                        if (value.status == config.UPLOADER_STATUS_SUCCESS) {
                                                            var item  = {
                                                                fid: value.fid,
                                                                name: value.file.name,
                                                                type: value.file.type,
                                                                checked: false,
                                                                viewCount: 0,
                                                                downloadCount: 0,
                                                                isOpen: value.isOpen,
                                                                canDownload: value.canDownload
                                                            }
                                                            successUplodeFiles.push(item);
                                                        }
                                                    }
                                                );
                                                successUplodeFiles = successUplodeFiles.concat(me.get('successUplodeFiles'));
                                                data['successUplodeFiles'] = successUplodeFiles;
                                                me.set(data);
                                            }

                                        });
                                    }
                                }
                            );
                            dialogRactiveInstance = dialog.ractive;
                        }
                    },
                    onuploadstart: function (e, data) {
                        var fileItem = data.fileItem;
                        setUploadFileStatus(fileItem);
                        setUploadFileProps(
                            fileItem.index,
                            {
                                startTime: $.now()
                            }
                        );
                    },
                    onuploadprogress: function (e, data) {
                        var fileItem = data.fileItem;
                        var startTime = dialogRactiveInstance.get('options.files.' + fileItem.index + '.startTime');
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
                        if (response.code !== 0) {
                            dialogRactiveInstance.set(
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
                        var fileItem = data.fileItem;
                        if (data.errorCode === Uploader.ERROR_CANCEL) {
                            dialogRactiveInstance.set(
                                'options.files.' + fileItem.index + '.status',
                                config.UPLOADER_STATUS_CANCELED
                            );
                        }
                        else {
                            setUploadFileStatus(fileItem);
                        }
                    },
                    onuploadcomplete: function () {
                        me.uploader.reset();
                    }
                });
            },
            validateFiles: function (files) {
                var me = this;
                var totalSize = 0;
                var error;
                var quotaUsed = +me.get('quotaUsed');
                var canUseQuota = me.get('quotaTotal') - quotaUsed;
                var typeArr = [];

                $.each(
                    files,
                    function (index, value) {
                        totalSize = totalSize + value.file.size;
                        if ($.inArray(value.file.type, accept) < 0 && typeArr.indexOf(value.file.type) == -1) {
                            typeArr.push(value.file.type);
                        }
                    }
                );

                if (canUseQuota < 0) {
                    error = '抱歉！存储空间不足，请前往资料库管理您的文件。';
                    alert({
                        title: '温馨提示',
                        content: error,
                        buttons: [
                            {
                                text: '立即前往',
                                type: 'primary',
                                action: function () {
                                    location.href = '/teacher_center/netdisk';
                                }
                            },
                            {
                                text: '知道了',
                                type: '',
                                action: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                    return;
                }

                if (files.length + me.get('successUplodeFiles').length > 30) {
                    error = '每节课的资料文件不能超过30个，若您的文件过多，建议采用压缩包上传';
                }

                if (totalSize > canUseQuota) {
                    error = '抱歉，资料库存储空间不足，所选文件超出'
                        + ((totalSize - canUseQuota) / M_SIZE).toFixed(1)
                        + 'MB。您可以在资料库中管理您的文件和存储空间';
                }

                if (totalSize > maxSize * M_SIZE) {
                    error = '资料库上传资料不能超过 200 MB';
                }

                if (typeArr.length > 0) {
                    error = typeArr.join('，') + '为不可上传的文件，请勿上传';
                }

                if (error) {
                    alert({
                        title: '温馨提示',
                        width: 320,
                        content: error
                    });
                    return false;
                }
                return true;
            },
            onteardown: function () {
                this.uploader.dispose();
            },
            addFromfiles: function () {
                var me = this;
                var container = $(me.getElement());
                var dialog = ractiveDialog(
                    ShareInfo,
                    {
                        title: '资料库添加',
                        skinClass: 'add-from-netdisk-dialog'
                    },
                    {
                        isFromNetdisk: true,
                        files: null,
                        courseNumber: me.get('courseNumber'),
                        courseType: me.get('courseType'),
                        uploadFromLocal: function () {
                            dialog.hide();
                            container.find('input[type="file"]').click();
                        },
                        refresh: function () {
                            dialog.refresh();
                        },
                        close: function (files, props) {
                            dialog.hide();
                            if (!props.fids) {
                                return;
                            }
                            service
                            .updateDataStatus({
                                fids: props.fids,
                                courseNumber: me.get('courseNumber'),
                                courseType: me.get('courseType'),
                                canDownload: props.canDownload ? 1 : 0,
                                isOpen: props.isOpen ? 1 : 0,
                            }).then (function () {
                                var data = {
                                    'successUplodeFiles': me.get('successUplodeFiles')
                                }
                                tip({
                                    content: '共享成功',
                                    type: 'success'
                                });
                                var successUplodeFiles = [];
                                $.each(
                                    files,
                                    function (index, value) {
                                        var item = {
                                            fid: value.fid,
                                            name: value.name,
                                            checked: false,
                                            viewCount: 0,
                                            downloadCount: 0,
                                            isOpen: value.isOpen,
                                            canDownload: value.canDownload,
                                            type: value.fileType
                                        }
                                        successUplodeFiles.push(item);
                                    }
                                )
                                successUplodeFiles = successUplodeFiles.concat(me.get('successUplodeFiles'));
                                data['successUplodeFiles'] = successUplodeFiles;
                                me.set(data);
                            });
                        }
                    }
                );
            },
            findCheckedIndex: function () {
                var me = this;
                var successUplodeFiles = me.get('successUplodeFiles');
                var indexs = [];
                var fids = [];
                $.each (
                    successUplodeFiles,
                    function (index, value) {
                        if (value.checked) {
                            indexs.push(index);
                            fids.push(value.fid);
                        }
                    }
                );

                return {
                    indexs: indexs,
                    fids: fids.join(',')
                };
            },
            updateStatus: function (item, action) {
                var me = this;
                var canDownload = action == 'download' ? !me.get('canDownloadButton') : me.get('canDownloadButton');
                var isOpen = action == 'open' ? !me.get('isOpenButton') : me.get('isOpenButton');
                var indexs = me.findCheckedIndex().indexs;
                var successUplodeFiles = me.get('successUplodeFiles');

                var validateType = true;
                var noDownloadType = [];
                $.each(
                    indexs,
                    function (index, value) {
                        var type = successUplodeFiles[value].type;
                        if (noDownload.indexOf(type) != -1 && noDownloadType.indexOf(type) == -1) {
                            noDownloadType.push(type);
                            validateType = false;
                        }
                    }
                );
                if (!validateType && action != 'open') {
                    alert({
                        title: '温馨提示',
                        content: '包含无法在线观看的文件类型（ ' + noDownloadType.join('，') + '）， 只能允许学生下载'
                    });
                    return;
                }

                service
                .updateDataStatus({
                    fids: me.findCheckedIndex().fids,
                    courseNumber: me.get('courseNumber'),
                    courseType: me.get('courseType'),
                    canDownload: canDownload ? 1 : 0,
                    isOpen: isOpen ? 1 : 0
                })
                .then(function (response) {
                    var isOpen = me.get('isOpenButton');
                    var canDownload = me.get('canDownloadButton');
                    $.each(
                        indexs,
                        function (index, value) {
                            if (action == 'open') {
                                successUplodeFiles[value].isOpen = !isOpen;
                            }
                            else {
                                successUplodeFiles[value].canDownload = !canDownload;
                            }
                        }
                    );
                    if (action == 'open') {
                        data['isOpenButton'] = !isOpen;
                    }
                    else {
                        data['canDownloadButton'] = !canDownload;
                    }
                    data['successUplodeFiles'] = successUplodeFiles;
                    me.set(data);
                }, function (response) {
                    if (response.code != 0) {
                        alert({
                            title: '温馨提示',
                            content: response.msg
                        })
                    }
                });
            },
            updateStatusBasedIndex: function (item, index, action) {
                var me = this;
                var data = { };

                if (noDownload.indexOf(item.type) != -1 && action != 'open') {
                    alert({
                        title: '温馨提示',
                        content: '包含无法在线观看的文件类型（' + item.type + '），只能允许学生下载'
                    });
                    return;
                }

                var isOpen = action == 'open' ? !item.isOpen : item.isOpen;
                var canDownload = action == 'download' ? !item.canDownload : item.canDownload;
                service
                .updateDataStatus({
                    fids: item.fid,
                    courseNumber: me.get('courseNumber'),
                    courseType: me.get('courseType'),
                    canDownload: canDownload ? 1 : 0,
                    isOpen: isOpen ? 1 : 0
                })
                .then(function (response) {
                    if (action == 'open') {
                        data['successUplodeFiles.' + index + '.isOpen'] = !item.isOpen;
                    }
                    else {
                        data['successUplodeFiles.' + index + '.canDownload'] = !item.canDownload;
                    }
                    me.set(data);
                }, function (response) {
                    if (response.code != 0) {
                        alert({
                            title: '温馨提示',
                            content: response.msg
                        })
                    }
                })

            },
            remove: function (item, index) {
                var me = this;
                if (item.shareCourses) {
                    alert({
                        title: '温馨提示',
                        content: item.shareCourses,
                        buttons: [
                            {
                                text: '取消',
                                type: '',
                                action: function () {
                                    this.hide();
                                }
                            },
                            {
                                text: '确定',
                                type: 'primary',
                                action: function () {
                                    var successUplodeFiles = me.get('successUplodeFiles');
                                    service
                                    .removeData({
                                        fids: successUplodeFiles[index].fid,
                                        courseNumber: me.get('courseNumber'),
                                        courseType: me.get('courseType'),
                                    })
                                    .then(function () {
                                        successUplodeFiles.splice(index, 1);
                                    });
                                    me.set('successUplodeFiles', successUplodeFiles);
                                    this.hide();
                                }
                            }
                        ]
                    });
                }
                else {
                    alert({
                        title: '温馨提示',
                        content: '确认将从共享资料中移除该文件?',
                        buttons: [
                            {
                                text: '取消',
                                type: '',
                                action: function () {
                                    this.hide();
                                }
                            },
                            {
                                text: '确定',
                                type: 'primary',
                                action: function () {
                                    var successUplodeFiles = me.get('successUplodeFiles');
                                    service
                                    .removeData({
                                        fids: successUplodeFiles[index].fid,
                                        courseNumber: me.get('courseNumber'),
                                        courseType: me.get('courseType'),
                                    })
                                    .then(function () {
                                        successUplodeFiles.splice(index, 1);
                                        me.set('successUplodeFiles', successUplodeFiles);
                                    });
                                    this.hide();
                                }
                            }
                        ]
                    });
                }
            },
            removeChecked: function () {
                var me = this;

                alert({
                    title: '温馨提示',
                    content: '确认将从共享资料中移除该文件?',
                    buttons: [
                        {
                            text: '取消',
                            type: '',
                            action: function () {
                                this.hide();
                            }
                        },
                        {
                            text: '确定',
                            type: 'primary',
                            action: function () {
                                var indexs = me.findCheckedIndex().indexs;
                                var successUplodeFiles = me.get('successUplodeFiles');
                                service
                                .removeData({
                                    fids: me.findCheckedIndex().fids,
                                    courseNumber: me.get('courseNumber'),
                                    courseType: me.get('courseType')
                                })
                                .then(function () {
                                    indexs = indexs.reverse()
                                    $.each(
                                        indexs,
                                        function (index, value) {
                                            successUplodeFiles.splice(value, 1);
                                        }
                                    )
                                    me.set('successUplodeFiles', successUplodeFiles);
                                });
                                this.hide();
                            }
                        }
                    ]
                });
            }
        });
    };

});