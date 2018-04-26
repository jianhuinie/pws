/**
 * @file 老师中心 资料库
 * @author liucong
 */
define(function (require, exports) {

    'use strict';
    var FileUploadDialog = require('./netdisk/FileUploadDialog');
    var FileMoveDialog = require('./netdisk/FileMoveDialog');
    var Uploader = require('cobble/ui/Uploader');
    var _ = require('underscore');
    var service = require('common/service');
    var store = require('common/store');
    var formatFiles = require('./netdisk/formatFiles');
    var formatFileSize = require('./netdisk/formatFileSize');
    var formatFileType = require('./netdisk/formatFileType');
    var NetdiskTipDialog = require('./netdisk/NetdiskTipDialog');
    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var pageScrollTop = require('cobble/function/pageScrollTop');

    var container = $('#content');
    var editForm;
    var env;

    // 私有环境 针对老师个人资料库
    var STORAGE_ENV_PRIVATE = 'private';

    // 公有环境 针对老师直播课件
    var STORAGE_ENV_PUBLIC = 'public';

    var validator = new Validator({
        element: container.find('#edit-form'),
        realtime: false,
        fields: {
            name: {
                custom: function (field, callback) {
                    var value = field.val();

                    if (value == '') return true;

                    var curFiles = store.get('curFiles');
                    var file = field.data('file');

                    if (/[,%]/.test(value)) {
                        return '请勿输入英文逗号，百分号';
                    }
                    if (_.findWhere(curFiles, { name: value, type: file.type })) {
                        return '该目录已存在重名文件（夹）';
                    }
                    else {
                        return true;
                    }
                }
            }
        }
    });

    var toolbarEnableMap = {
        none: ['add', 'new-folder'],
        single: ['add', 'download', 'share', 'rename', 'move', 'delete', 'new-folder'],
        multiple: ['add', 'download', 'share', 'move', 'delete', 'new-folder']
    };

    //随以后场景陆续添加 用于拼接提示框
    var actionMap = {
        'rename': '重命名',
        'move': '移动',
        'new-folder': '新建文件夹',
        'delete': '删除',
        'download': '下载'
    };

    /**
     * 顶部提示
     * @param  {string} content 提示内容
     */
    function topReminder(content) {

        var card = container.find('.card-header');
        var el = $(''
            + '<div class="top-reminder">'
            +     '<div>'
            +         '<i class="icon icon-info-circle"></i>' + content
            +     '</div>'
            + '</div>'
        );

        card.append(el);

        el.slideDown(200);
        setTimeout(function() {

            el.slideUp(200, function () {
                el.remove();
            });

        }, 2000);
    }

    /**
     * 验证toolbar事件是否有权限触发
     * @param  {string} action 操作名称
     * @param  {Array}  files  选中文件队列
     * @return {boolean}       是否校验通过
     */
    function validateToolbar(action, files) {

        var storageEnv = store.get('storageEnv');

        var mod = 'none';
        var count = files.length;

        var hasFolder = _.findWhere(files, { type: 'folder' });

        var hasPublicFolder = _.findWhere(
            files,
            {
                storageEnv: STORAGE_ENV_PUBLIC,
                type: 'folder'
            }
        );

        if (storageEnv === STORAGE_ENV_PUBLIC) {
            if (action === 'move'
                || action === 'rename'
                || action === 'new-folder'
            ) {
                topReminder('不支持该文件夹下的' + actionMap[action]);
                return false;
            }
        }

        //本期 移动 下载 不支持文件夹 所以先提示这个
        if (hasFolder
            && (action == 'move' || action == 'download')
        ) {
            topReminder('不支持文件夹的' + actionMap[action]);
            return false;
        }

        if (hasPublicFolder
            && (action === 'move'
            || action === 'rename'
            || action === 'delete')
        ) {
            topReminder('不支持直播课件文件夹的' + actionMap[action]);
            return false;
        }

        if (count > 0) {
            if (count > 1) {
                mod = 'multiple';
            }
            else {
                mod = 'single';
            }
        }

        if ($.inArray(action, toolbarEnableMap[mod]) == -1) {
            switch (mod) {
                case 'none':
                    topReminder('请选择文件');
                    break;
                case 'single':
                    break;
                case 'multiple':
                    topReminder('只能对单个文件（夹）' + actionMap[action]);
                    break;
                default :
                    break;
            }

            return false;
        }
        else {
            return true;
        }
    }

    /**
     * 获取选中的文件队列
     * @param  {Array} triggers 触发元素 hover icon 或 checkbox 用于定位选定的行
     */
    function getFilesByTriggers(triggers) {

        return  _.map(triggers, function (item, index) { //整理需要的格式
            var file = $(item).closest('tr');
            return {
                path: file.data('path'),
                name: file.data('name'),
                size: formatFileSize(file.data('size')),
                type: formatFileType(file.data('type')),
                el: file,
                shareCourses: file.data('share-courses') ? file.data('share-courses') : undefined,
                storageEnv: file.data('isLive') ? STORAGE_ENV_PUBLIC : STORAGE_ENV_PRIVATE
            }
        });
    }

    /**
     * 各种操作的事件分发
     * @param  {string} action   操作名
     * @param  {Array}  files  选中文件队列
     * @param  {****} type 删除操作的类型 废弃
     */
    function doAction(action, files) {

        switch (action) {
            case 'download':
                downloadFiles(files);
                break;
            case 'move':
                new FileMoveDialog({
                    files: files,
                    onSuccess: function () {
                        loadTable();
                    }
                });
                break;
            case 'rename':
                showEditForm(files[0], 'rename'); //重命名只针对一个文件或文件夹 所以取第一个
                break;
            case 'delete':
                deleteFiles(files);
                break;
            case 'new-folder':
                showEditForm(
                    {
                        name: '',
                        path: store.get('path'),
                        type: 'folder',
                        el: buildNewFolder()
                    },
                    'new-folder'
                );
                $('html,body').animate(
                    {
                        scrollTop: 0
                    },
                    1000,
                    'easeOutCirc'
                );
                break;
            default:
                break;
        }
    }

    /**
     * 移动、显示编辑框 绑定事件
     * @param  {Object} file   文件 {name, path, size, el}
     * @param  {string} action 操作名称 new-folder rename
     */
    function showEditForm(file, action) {
        var top = file.el.prop('offsetTop')
            + container.find('#netdisk-table table').prop('offsetTop')
            + 11;

        var isFoloder = (file.type == 'folder');
        var displayName = file.el.find('.name').text(); //1期文件夹有别名，修改的是别名

        editForm.css('top', top);

        editForm[0].reset();

        editForm
        .off('.edit')
        .show();

        editForm
        .find('input')
        .off('.edit')
        .val(isFoloder ? displayName : file.name)
        .data('orgin', isFoloder ? displayName : file.name)
        .data('file', file)
        .focus();

        var handler;
        if (action == 'rename') {
            handler = rename;
        }
        else if (action == 'new-folder') {
            handler = newFolder;
        }

        editForm
        .on('submit.edit', handler)
        .find('input')
        .on('blur.edit', handler);
    }

    /**
     * 重命名的处理函数
     * @param  {object} e 事件对象
     */
    function rename(e) {

        e.stopPropagation();

        var input = editForm.find('input');
        var newname = input.val();
        var file = input.data('file');

        if (newname != '' && newname != input.data('orgin')) {

            if (!validator.validate()) {
                return false;
            }
            service
            .netdiskRename({
                path: file.path,
                rename: newname
            })
            .done(function (response) {
                if (response.code === 0) {

                    editForm.hide();
                    loadTable(); //刷新列表
                }
            });
        }
        else {
            editForm.hide();
        }

        return false;
    }

    /**
     * 构建新文件夹元素 添加到表格里
     * @return {jquery object} 文件夹tr
     */
    function buildNewFolder() {

        var el = $(''
            + '<tr data-path="' + store.get('path') + '">'
            +     '<td class="left">'
            +         '<label>'
            +             '<input type="checkbox">'
            +             '<i class="icon icon-file-folder small"></i>'
            +             '<span class="name"></span>'
            +         '</label>'
            +     '</td>'
            +     '<td>'
            +     '</td>'
            +     '<td>'
            +     '</td>'
            + '</tr>'
        );

        container.find('#netdisk-table tbody').prepend(el);

        return el;
    }

    /**
     * 新建文件夹事件处理
     * @param  {object} e 事件对象
     */
    function newFolder(e) {

        e.stopPropagation();

        if (name == '') {
            editForm.hide();
            file.el.remove();
        }
        else {

            if (!validator.validate()) {
                return false;
            }

            var input = editForm.find('input')
            var name = input.val();
            var file = input.data('file');

            service
            .netdiskCreateDir({
                path: file.path + name + '/'
            })
            .done(function (response) {
                if (response.code === 0) {
                    editForm.hide();
                    loadTable(); //刷新列表
                }
            });

        }

        return false;
    }

    /*
     * files 要删除的文件集
     * ** type 1显示删除按钮且可删除 2隐藏删除按钮 3显示删除按钮，但点击删除时，需发送请求，对删除操作进行鉴权
     */
    function deleteFiles(files) {
        var conflictArr = [];
        var paths = _.map(files, function(item) {
            if (item.shareCourses) {
                var arr = item.shareCourses.split(',');
                conflictArr = conflictArr.concat(arr);
            }
            return item.path
        });
        paths = paths.join(',');

        conflictArr = _.uniq(conflictArr)
        if (conflictArr.length > 0) {
            alert({
                title: '温馨提示',
                width: 450,
                content: '该文件已被'
                         + conflictArr.length
                         + '门课程共享，删除将使文件共享失效，具体班课为：<br>'
                         + conflictArr.join('<br>'),
                buttons: [
                    {
                        text: '确定',
                        type: 'primary',
                        handler: function () {
                            var me = this;
                            service
                            .netdiskDelete({
                                paths: paths
                            },
                            {
                                errorHandler: {
                                    '810002': function (response) { // 不可删除
                                        alert({
                                            type: "confirm",
                                            content: "文件已在视频课或直播回放使用，暂时无法删除"
                                        });
                                    }
                                }
                            })
                            .done(function (response) {
                                if (response.code === 0) {
                                    me.hide();
                                    loadTable();
                                }
                            });
                        }
                    },
                    {
                        text: '取消',
                        handler: function () {
                            this.hide();
                        }
                    }
                ]
            });
            return;
        }
        else {
            showDeleteDialog(paths);
        }

    }

    function showDeleteDialog(paths) {
        var dialog = new NetdiskTipDialog({
            type: 'confirm',
            message: '资料删除后不可恢复，确认需要删除吗？',
            onSuccess: function () {
                service
                .netdiskDelete({
                    paths: paths
                },
                {
                    errorHandler: {
                        '810002': function (response) { // 不可删除
                            alert({
                                type: "confirm",
                                content: "文件已在视频课或直播回放使用，暂时无法删除"
                            });
                        }
                    }
                })
                .done(function (response) {
                    if (response.code === 0) {
                        dialog.hide();
                        loadTable();
                    }
                });
            }
        });
    }

    function downloadFiles(files){
        var list = _.map(files, function (item) {
            return item.path;
        });
        list = list.join(',');

        service
        .netdiskDownload({
            list: list
        })
        .done(function (response) {
            if (response.code === 0) {
                var url = response.data.download_url;

                var a = $('<a href="' + url + '" download="' + url + '"></a>')
                .appendTo('body');

                a[0].click();

                a.remove();
            }
        })
    }

    /**
     * 加载指定path表格
     * @param  {string} path 全路径
     */
    function loadTable(path, sortBy, direction) {

        path = path || store.get('path');

        service
        .netdiskSort({
            path: path,
            sortBy: sortBy,
            direction: direction
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;

                appendTable(data.tpl.objects, true, data.bar_hidden);
                store.set('path', path);

                store.set('mode', { //浏览方式 path cat search
                    type: 'path',
                    value: path
                });

                container.find('.tool-bar .new-folder').show();

                var cardBody = container.find('.card-body');
                cardBody.removeClass('no-result-body empty-body');
                if (!data.objects.length || data.objects.length == 0) {
                    if (data.bar_hidden) { // 特殊的两个视频文件夹
                        cardBody
                        .addClass('empty-body')
                        .find('.empty')
                        .html('<div>暂时没有相关视频文件</div>');
                    }
                    else {
                        cardBody
                        .addClass('empty-body')
                        .find('.empty')
                        .html('<img src="/asset/img/teacher-center/add-class-course.jpg" ><div>点击左上角的“添加资料”按钮开启你的跟谁学资料库之旅吧</div>');
                    }

                }

                updateStorageEnv(data);
            }
        })
    }

    /**
     * 加载分类数据表格
     * @param  {string} cat 分类类型 1=全部,2=文档,3=图片,4=音乐,5=视频,10=其它
     */
    function loadCatTable(cat, sortBy, direction) {

        service
        .netdiskSort({
            type: cat,
            sortBy: sortBy,
            direction: direction
        })
        .done(function (response) {
            if (response.code === 0) {

                appendTable(response.data.tpl.objects, false, response.data.bar_hidden);
                store.set('path', null); //置空path 新增文件会增加到根目录下

                store.set('mode', { //浏览方式 path cat search
                    type: 'cat',
                    value: cat
                });

                container.find('.tool-bar .new-folder').hide();

                var cardBody = container.find('.card-body');
                cardBody.removeClass('no-result-body empty-body');
                if (!response.data.objects.length || response.data.objects.length == 0) {
                    cardBody.addClass('no-result-body');
                }

                updateStorageEnv(data);

            }
        });
    }

    /**
     * 加载搜索数据表格
     * @param  {string} query 搜索文本
     */
    function loadSearchTable(query, sortBy, direction) {

        service
        .netdiskSort({
            query: query,
            sortBy: sortBy,
            direction: direction
        })
        .done(function (response) {
            if (response.code === 0) {

                appendTable(response.data.tpl.objects, false, response.data.bar_hidden);
                store.set('path', null); //置空path 新增文件会增加到根目录下

                store.set('mode', { //浏览方式 path cat search
                    type: 'search',
                    value: query
                });

                container.find('.tool-bar .new-folder').hide();

                var cardBody = container.find('.card-body');
                cardBody.removeClass('no-result-body empty-body');
                if (!response.data.objects.length || response.data.objects.length == 0) {
                    cardBody.addClass('no-result-body');
                }

                updateStorageEnv(data);

            }
        });
    }

    /**
     * 根据load表的返回数据更新资料库存储环境
     *
     * @param  {Object} data
     * @property {boolean=} data.is_live_course_ware_path
     *
     */
    function updateStorageEnv(data) {
        if (data) {

            if (data.is_live_course_ware_path) {
                store.set('storageEnv', STORAGE_ENV_PUBLIC);
            }
            else {
                store.set('storageEnv', STORAGE_ENV_PRIVATE);
            }

            initUploader();

        }
    }

    /**
     * append到table元素
     * @param  {string}  html         html片段
     * @param  {boolean} realFolder   如果是真实目录下 即不是 筛选 搜索出来的 则需要记录当前文件夹下的文件 用于提示重复文件名
     * @param  {boolean} barHidden    是否显示顶层操作条
     */
    function appendTable(html, realFolder, barHidden) {

        var table = container.find('.table-container').html(html);

        if (realFolder) {
            storeCurFiles(table);
        }

        var toolBar = container.find('.tool-bar')
        if (barHidden) {
            toolBar.hide();
        }
        else {
            toolBar.show();
        }
    }

    /**
     * 存储当前表格的文件名和类型 用于防止重复添加文件
     * @param  {object} table 表格jq object
     */
    function storeCurFiles(table) {

        var curFiles = _.map(table.find('tbody tr'), function (item) {
            var item = $(item);
            var name;
            if (item.data('type') == 'folder') { //一期文件夹有别名，需要校验别名
                name = item.find('.name').text();
            }
            else {
                name = item.data('name');
            }
            return {
                name: name,
                type: formatFileType(item.data('type'))
            }
        });

        store.set('curFiles', curFiles);
    }

    function initUploader() {
        var accept;
        var action;
        var data;
        var userNumber;
        service
        .getUserBasicInfo()
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data;
                userNumber = data.user_number;
                var storageEnv = store.get('storageEnv');

                if (storageEnv === STORAGE_ENV_PUBLIC) {

                    accept = ['jpg', 'jpeg', 'png', 'doc', 'ppt', 'docx', 'pptx', 'pdf', 'gif', 'bmp'];
                    action = '/live/document';
                    data = {
                        'action': 'uploadFile',
                        'user_number': userNumber
                    };

                }
                else {

                    accept = ['xml', 'txt', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'mp3'
                        , 'wma', 'wav', 'mid', 'm4a', 'pdf', 'ps', 'ai', 'rar', 'swf', 'zip'
                        , 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx'];
                    if (env == 'test') {
                        action = '/netdisk/upload';
                    }
                    else {
                        action = 'http://upload-file.genshuixue.com/netdisk/upload';
                    }
                    data = {
                        path: store.get('path'),
                        user_number: userNumber
                    };

                }

                if (exports.uploader) {
                    exports.uploader.dispose();
                }

                var uploader =
                exports.uploader = new Uploader({  //文件上传
                    element: exports.toolbar.find(':file'),
                    multiple: true,
                    accept: accept,
                    action: action,
                    data: data,
                    onFileChange: function () {
                        var files = this.getFiles();
                        files = formatFiles(files);

                        if (!_.every(files, function(item) {
                            return item.size <= 25000000;
                        })) {
                            new NetdiskTipDialog({
                                message: '抱歉，目前暂不支持上传超过25MB的文件，请重新选择文件'
                            });
                            uploader.reset();
                            return;
                        }

                        var curFiles = store.get('curFiles');
                        var same = [];
                        if (!_.every(files, function (item) {
                            var f = _.findWhere(curFiles, { name: item.name, type: item.type });
                            if (f) {
                                same.push(f.name);
                            }
                            return !f;
                        })) {
                            var message = ''
                                    +   '你上传的资料<span class="text-primary">' + same.join(';') + '</span>'
                                    +   '在当前目录下存在重名文件（夹），请修改后再上传';

                            new NetdiskTipDialog({
                                message: message
                            });
                            uploader.reset();
                            return;
                        }

                        if (!_.every(files, function(item) {
                            return !(/[,%]/.test(item.name));
                        })) {

                            new NetdiskTipDialog({
                                message: '请勿上传文件名带有英文逗号，百分号的文件'
                            });
                            uploader.reset();
                            return;
                        }

                        if (files.length > 0) {

                            new FileUploadDialog({
                                files: files,
                                outerUploader: uploader,
                                otherFiles: curFiles,
                                action: action,
                                accept: accept,
                                data: data,
                                onAfterHide: function () {
                                    loadTable();
                                }
                            });

                        }
                    }
                });
            }
        });
    }

    exports.init = function () {
        env = store.get('env');
        editForm = container.find('#edit-form');

        var toolbar =
        exports.toolbar = container.find('.tool-bar');

        var table = container.find('#netdisk-table');

        var card = container.find('.card');
        $(window).scroll(function () {

            if (pageScrollTop() >= 170) {
                card.addClass('fixed-card');
            }
            else {
                card.removeClass('fixed-card');
            }
        })

        storeCurFiles(table);

        store.set('mode', {
            type: 'path',
            value: store.get('path')
        });

        initUploader();

        container
        .on('click', '.tool-bar button', function () { // toolbar 事件分发
            var action = $(this).data('action');
            var selected = table.find('tbody :checkbox:checked');
            var files = getFilesByTriggers(selected);

            if (validateToolbar(action, files)) {
                doAction(action, files);
            }
        })

        .on('click', '.dilatation', function () { // 扩容
            if (store.get('isOrgTeacher')) { // 机构老师
                alert({
                    title: '温馨提示',
                    content: '机构老师不可以单独扩容'
                });
            }
        })

        .on('click', '#netdisk-table tr .actions .icon', function () { // hover icon 事件分发

            var action = $(this).data('action');
            var files = getFilesByTriggers($(this));
            // var type = $(this).data('type'); // 删除有时需要二次判断

            if(validateToolbar(action, files)) {
                doAction(action, files);
            }
        })

        .on('change', '#netdisk-table thead :checkbox', function () { //联动header checkbox 和 body checkbox

            var checkboxes = table.find('tbody :checkbox');

            if (this.checked) {
                checkboxes.prop('checked', true);
            }
            else {
                checkboxes.prop('checked', false);
            }
        })

        .on('click', '#netdisk-table .header .path b', function () { // 顶部路径跳转

            var path = $(this).data('path');
            loadTable(path);
        })

        .on('click', '#netdisk-table tr .folder-trigger', function () { // 文件夹跳转

            var path = $(this).closest('tr').data('path');
            loadTable(path);
        })

        .on('click', '#netdisk-table .cat b', function () {

            var cat = $(this).data('cat');
            loadCatTable(cat);
        })

        .on('click', '#netdisk-table thead .sort', function () { //排序

            var direction = $(this).data('direction');

            if (!direction) { //若没有排序 择触发升序
                direction = 'asc';
            }
            else {
                if (direction == 'asc') {
                    direction = 'desc';
                }
                else {
                    direction = 'asc';
                }
            }

            var sortBy = $(this).data('sortby');

            var mode = store.get('mode'); //获取当前浏览模式

            switch(mode.type) {
                case 'path':
                    loadTable(null, sortBy, direction);//当前路径加载表格
                    break;
                case 'cat':
                    loadCatTable(mode.value, sortBy, direction);
                    break;
                case 'search':
                    loadSearchTable(mode.value, sortBy, direction);
                    break;
                default:
                    break;
            }

        });

        var searchInput = container.find('#search-form input');
        var searchHandler = function (e) {
            e.preventDefault();

            var query = searchInput.val();

            if (!query) return false;

            loadSearchTable(query);

        }

        container
        .on('submit', '#search-form', searchHandler)
        .on('click', '#search-btn', searchHandler);

    }
});