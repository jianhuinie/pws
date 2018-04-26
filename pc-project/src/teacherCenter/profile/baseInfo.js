/**
 * @file 个人信息 - 基本信息
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var BaseInfoForm = require('./BaseInfoForm');
    var store = require('common/store');
    var container = $('#content .baseinfo');
    var triggerElement = container.find('.form-trigger');
    var formElement = container.find('.form');
    var form;
    var status = 'display';

    function display() {
        formElement.hide();
        triggerElement.show();
    }

    function edit() {
        triggerElement.hide();
        form.refresh();
        formElement.show();
    }

    exports.init = function () {

        form = new BaseInfoForm({
            element: formElement,
            data: formElement.data('baseinfo')
        });

        container
        .on('click', '.edit', function (e) {
            container.trigger('edit', { name: 'baseInfo' });
        })

        .on('click', '.btn-cancel', function (e) {
            container.trigger('display', { name: 'baseInfo' });
        })

        .on('click', '.baseinfo-audit', function (e) { // 审核被拒原因
            var audit = store.get('audits');
            var array = [];

            function joinObj(obj) {
                var arr = [];
                for( var p in obj) {
                    arr.push(obj[p]);
                }
                return arr.join(';');
            }
            if (audit) {
                if (audit.realname && audit.realname.verify_status == 2) {
                    array.push('姓名：<span style="color:#f95710;">'+joinObj(audit.realname.reasons)+'</span><br/>');
                }
                if (audit.nickname && audit.nickname.verify_status == 2) {
                    array.push('昵称：<span style="color:#f95710;">'+joinObj(audit.nickname.reasons)+'</span><br/>');
                }
                if (audit.short_introduce && audit.short_introduce.verify_status == 2) {
                    array.push('一句话简介：<span style="color:#f95710;">'+joinObj(audit.short_introduce.reasons)+'</span><br/>');
                }
                if (audit.introduce && audit.introduce.verify_status == 2) {
                    array.push('老师介绍：<span style="color:#f95710;">'+joinObj(audit.introduce.reasons)+'</span><br/>');
                }
                if (audit.graduation_major && audit.graduation_major.verify_status == 2) {
                    array.push('学历：<span style="color:#f95710;">'+joinObj(audit.graduation_major.reasons)+'</span><br/>');
                }
                if (audit.graduation_school && audit.graduation_school.verify_status == 2) {
                    array.push('毕业院校：<span style="color:#f95710;">'+joinObj(audit.graduation_school.reasons)+'</span><br/>');
                }
                if (audit.regions && audit.regions.verify_status == 2) {
                    array.push('可上门授课范围：<span style="color:#f95710;">'+joinObj(audit.regions.reasons)+'</span><br/>');
                }
                if (audit.private_domain && audit.private_domain.verify_status == 2) {
                    array.push('个人主页：<span style="color:#f95710;">'+joinObj(audit.private_domain.reasons)+'</span><br/>');
                }
                if (audit.avatar && audit.avatar.verify_status == 2) {
                    array.push('头像：<span style="color:#f95710;">'+joinObj(audit.avatar.reasons)+'</span><br/>');
                }
                if (array.length > 0) {
                    array.unshift('<div style="text-align:left;margin:0 20px 10px;">');
                    array.push('</div>');
                    array.unshift('<h3 style="font-size:16px;margin-bottom:10px;text-align:left;margin-left:20px;">您的基本信息审核被拒原因为：</h3>');
                    alert({
                        title: '温馨提示',
                        content: array.join(''),
                        width: 400,
                        buttons: [
                            {
                                text: '去修改',
                                type: 'primary',
                                handler: function () {
                                    edit();
                                    this.hide();
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
                }
            }
        })

        var regionList = triggerElement.find('.region-list');
        var regionData = formElement.data('baseinfo').regions;

        // 可上门授课范围
        regionList.html('');
        regionTree(regionList, regionData, '0');

        // 补空格
        if (regionList.find('tr').length != 1) {

            regionList.find('tr').each(function () {
                var tdCount = $(this).find('td').length;
                if (tdCount < 4) {
                    var shortTd = 4 - tdCount;
                    for ( var i = 0; i < shortTd; i++) {
                        $(this).append('<td></td>');
                    }
                }
            });

        }
    };

    exports.status = function (value) {
        if (value !== undefined) {
            status = value;
            if (status == 'display') {
                display();
            }
            else if (status == 'edit') {
                edit();
            }
        }
        else {
            return status;
        }
    };

    exports.save = function () {
        form.save();
    };

    exports.cancel = function () {
        form.cancel();
    };

    exports.edit = edit;

    /*
     * 循环遍历下级列表
     *
     * param regionList Object 已选上课范围
     * param data Array regions列表
     * param children Array 子节点列表
     */
    function allChildren (regionList, data, children) {
        var len = children.length;
        for (var i = 0; i < len; i++) {
            regionTree(regionList, data, children[i]);
        };
    }

    var showRegion = {
        '0': function (regionList, data, item) {
            levelZero(regionList, data, item);
        },
        '1': function (regionList, data, item) {
            levelOne(regionList, data, item);
        },
        '2': function (regionList, data, item) {
            levelTwo(regionList, data, item);
        },
        '3': function (regionList, data, item) {
            levelThree(regionList, data, item);
        },
        '4': function (regionList, data, item) {
            levelFourFive(regionList, data, item);
        },
        '5': function (regionList, data, item) {
            levelFourFive(regionList, data, item);
        }
    }

    /*
     * regions列表递归
     *
     * param regionList Object 已选上课范围
     * param data Array regions列表
     * param id int 地区id
    */
    function regionTree (regionList, data, id) {

        // 以全国为根，开始遍历
        $.each(data, function (i, item) {
            if (id == i) {
                var level = item.data.level;
                showRegion[level](regionList, data, item);
            }
        });

    }

    /*
     * 创建tag
     */
    function createEmTag(item) {
        return '<em data-id="' + item.id + '" data-name="' + item.name + '">'
             +     item.name
             + '</em>';
    }

    /*
     * 处理 - 全国
     *
     * param regionList Object 已选地区显示的地方
     * param data Array regions数据列表
     * param item Object 全国数据
     */
    function levelZero (regionList, data, item) {

        var id = item.data.id;
        var name = item.data.name;
        var children = item.children;

        if (children.length == 0) {
            regionList.append('<tr><td></td></tr>');
            regionList.find('td').append(
                createEmTag({
                    id: id,
                    name: '全国'
                })
            );
            return;
        }
        else {
            // 循环遍历下级列表
            allChildren(regionList, data, children);
        }
    }

    /*
     * 处理 - 省
     *
     * param regionList Object 已选地区显示的地方
     * param data Array regions数据列表
     * param item Object 某省数据
     */
    function levelOne (regionList, data, item) {

        var id = item.data.id;
        var name = item.data.name;
        var children = item.children;

        regionList.append('<tr><td></td></tr>');

        if (children.length == 0) { // 全省
            regionList.find('td:last').append(
                createEmTag({
                    id: id,
                    name: name + '全省'
                })
            );
            return;
        }
        else {
            regionList.find('td:last').append(
                createEmTag({
                    id: id,
                    name: name
                })
            );
            // 循环遍历下级列表
            allChildren(regionList, data, children);
        }
    }

    /*
     * 处理 - 市
     *
     * param regionList Object 已选地区显示的地方
     * param data Array regions数据列表
     * param item Object 某市数据
     */
    function levelTwo (regionList, data, item) {

        var id = item.data.id;
        var name = item.data.name;
        var children = item.children;

        var currentTr = regionList.find('tr:last');
        var tdCount = currentTr.find('td').length;
        var isAllCity = currentTr.find('td:last:contains("全市")');
        var lastTd = regionList.find('td:last');

        if ( tdCount > 2 || isAllCity.length != 0) {
            // 换行，添加市
            currentTr.after('<tr><td></td><td></td></tr>');
        }
        else {
            // 添加市
            currentTr.append('<td></td>');
        }

        if (children.length == 0) { // 全市
            regionList.find('td:last').append(
                createEmTag({
                    id: id,
                    name: name + '全市'
                })
            );
            return;
        }
        else {
            regionList.find('td:last').append(
                createEmTag({
                    id: id,
                    name: name
                })
            );

            // 循环遍历下级列表
            allChildren(regionList, data, children);
        }
    }

    /*
     * 处理 - 地铁/区
     *
     * param regionList Object 已选地区显示的地方
     * param data Array regions数据列表
     * param item Object 某 地铁/区 数据
     */
    function levelThree (regionList, data, item) {

        var id = item.data.id;
        var name = item.data.name;
        var children = item.children;

        var currentTr = regionList.find('tr:last');
        var tdCount = currentTr.find('td').length;
        var isAllArea = currentTr.find('td:last:contains("全部")');
        var lastTd = regionList.find('td:last');

        if ( tdCount > 3 || isAllArea.length != 0) {
            // 换行，添加区
            currentTr.after('<tr><td></td><td></td><td></td></tr>');
        }
        else {
            // 添加市
            currentTr.append('<td></td>');
        }

        if (children.length == 0) { // 全部
            regionList.find('td:last').append(
                createEmTag({
                    id: id,
                    name: name + '全部'
                })
            );
            return;
        }
        else {
            regionList.find('td:last').append(
                createEmTag({
                    id: id,
                    name: name
                })
            );

            // 循环遍历下级列表
            allChildren(regionList, data, children);
        }
    }

    /*
     * 处理 - 商圈
     *
     * param regionList Object 已选地区显示的地方
     * param data Array regions数据列表
     * param item Object 某 商圈/地铁线 数据
     */
    function levelFourFive (regionList, data, item) {

        var id = item.data.id;
        var name = item.data.name;
        var children = item.children;

        var currentTr = regionList.find('tr:last');
        var tdCount = currentTr.find('td').length;
        var lastTd = regionList.find('td:last');

        if ( tdCount < 4) {
            // 首个添加单元格
            currentTr.append('<td></td>');
        }

        regionList.find('td:last').append(
            createEmTag({
                id: id,
                name: name
            })
        );
        return;
    }



});

