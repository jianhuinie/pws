/**
 * @file 老师中心 资料管理 移动文件对话框
 * @author liucong
 */
define(function (require, exports) {

    'use strict';
    var Dialog= require('cobble/ui/Dialog');
    var etpl = require('cobble/util/etpl');
    var service = require('common/service');
    var _ = require('underscore');

    var tpl = '' //对话框模板
        + '<div class="header">'
        +     '<i class="icon icon-file-${file.type} small"></i>'
        +     '<div>'
        +     '<!-- if: ${count} > 1 -->'
        +         '<div class="name">${file.name}等${count}个文件</div>'
        +     '<!-- else -->'
        +         '<div class="name">${file.name}</div>'
        +     '<!-- /if -->'
        +         '<div class="size">${file.size}</div>'
        +     '</div>'
        + '</div>'
        + '<div class="dest">'
        +     '<div class="header">移动到：<span class="path-name"></span></div>'
        +     '<div class="tree-container">'
        +         '<div class="tree">'
        +             '<ul class="root"></ul>'
        +         '</div>'
        +     '</div>'
        + '</div>'
        + '<div class="action">'
        +     '<button class="btn-primary new confirm">确认</button>'
        +     '<button class="btn-default cancel">取消</button>'
        + '</div>'

    var tplFolders = '' //文件夹模板
        + '<!-- for: ${folders} as ${folder} -->'
        + '<li>'
        +     '<div class="node" data-path="${folder.path}" data-name="${folder.name}" style="padding-left:${left}px" }>'
        +         '<i class="trigger icon icon-caret-down"></i>'
        +         '<i class="trigger icon icon-caret-right"></i>'
        +         '<i class="icon icon-file-folder tiny"></i>'
        +         '<!-- if: ${folder.alias} -->'
        +         '<span class="name">${folder.alias}</span>'
        +         '<!-- else -->'
        +         '<span class="name">${folder.name}</span>'
        +         '<!-- /if -->'
        +     '</div>'
        +     '<ul></ul>'
        + '</li>'
        + '<!-- /for -->'

    /**
     * 构建文件夹节点 并附加在响应节点上
     * @param  {object} root    文件夹节点 jq object
     * @param  {Array} folders  { name, path }
     */
    function buildNode(root, folders) {

        var level = root.parentsUntil('.tree', 'ul').length; //获取当前节点的深度 用于计算左内边距

        var el = $(etpl.compile(tplFolders)({
            folders: folders,
            left: (level * 20)
        }));

        if (root.is('.root')) {
            root.append(el);
        }
        else {
            root.find(' > ul').append(el);
        }
    }

    /**
     * 获取某一节点下面的文件夹
     * @param  {object} root  文件夹节点 jq object
     * @param  {object} path  全路径
     * @param  {object} cache 缓存 用于避免多次获取相同路径下的文件夹
     */
    function fetchDir(root, path, cache) {

        var isRoot = (path == '');

        service
        .netdiskDir({
            path: path
        })
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data;
                var list = data.list;
                var folders = [];

                if (isRoot) {

                    folders.push({
                        path: data.path,
                        name: '我的资料库',
                        alias: ''
                    });

                    buildNode(root, folders);

                }
                else if (list.length > 0) {

                    folders = _.filter(list, function (item) { //过滤掉非文件夹
                        return /\/$/.test(item.Key);
                    })

                    folders = _.map(folders, function(item) {

                        cache[item.Key] = false;
                        cache[path] = true;

                        return {
                            path: item.Key,
                            name: item.Name,
                            alias: item.Alias
                        }
                    });

                    buildNode(root, folders);

                    //console.log(cache);
                }
            }
        });
    }


    /**
     * 构造函数
     * @param {Array}  options.files 文件队列
     *                {
     *                    name: '文件名',
     *                    size: '512300',
     *                    type: 'doc' //doc txt xls ...
     *                }
     * @param {Function=} options.onSuccess 成功后的回调
     */
    function FileMoveDialog(options) {
        $.extend(this, options);
        this.init();
    }

    FileMoveDialog.prototype = {
        init: function () {
            var me = this;
            var cache = {};
            var curActive = '';

            var dialog = new Dialog({
                title: '选择存储位置',
                content: etpl.compile(tpl)({
                    file: me.files[0],
                    count: me.files.length
                }),
                width: 425,
                skinClass: 'file-move-dialog'
            });

            var moveTo = dialog.element.find('.dest .path-name');
            var tree = dialog.element.find('.tree > ul');

            fetchDir(tree, '', cache); //获取根路径下的文件夹

            dialog.element
            .on('click', '.node', function (e) { //展开或收取结点，没有数据的话，加载之
                var node = $(this).closest('.node');
                var path = node.data('path');
                var root = $(this).closest('li');
                moveTo.text(node.data('name'));
                moveTo.data('path', node.data('path'));

                node.toggleClass('expend');

                if (curActive && curActive != path) {
                    tree.find('.node[data-path="' + curActive + '"]').removeClass('active');
                    tree.find('.node[data-path="' + path + '"]').addClass('active');
                }

                curActive = path;

                if (!cache[path]) {
                    fetchDir(root, path, cache); //获取某一节点下的文件夹
                }

            })

            .on('click', '.confirm', function () {

                var dest = moveTo.data('path');
                var files = _.map(me.files, function(item) {
                    return item.path;
                });
                files = files.join(',');

                if (!dest) {
                    error('请先选择要移动到的文件夹');
                    return;
                }

                service
                .netdiskMove({
                    srcPath: files,
                    destPath: dest,
                })
                .done(function (response) {
                    if (response.code === 0) {
                        if ($.isFunction(me.onSuccess)) {
                            me.onSuccess();
                        };

                        dialog.hide();
                    }
                })
            })

            .on('click', '.cancel', function () {
                dialog.hide();
            });
        }
    }

    return FileMoveDialog;
});