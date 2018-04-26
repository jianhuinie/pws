/**
 * @file 可上门授课范围
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var RegionSelect = require('common/component/RegionSelect');
    var service = require('common/service');

    function AccessRegion(options) {
        $.extend(this, options);
        this.init();
    }

    AccessRegion.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var regionSelectBox =
            me.regionSelectBox = element.find('.region-select-box');

            var regionBox =
            me.regionBox = element.find('.region-box');

            var areaList =
            me.areaList = element.find('.area-list');

            var countryList =
            me.countryList = element.find('.country-list');

            var regionSelected =
            me.regionSelected = element.find('.region-selected');

            var regionList =
            me.regionList = element.find('.region-list');

            var regionSelect =
            me.regionsSelect = new RegionSelect({
                element: element,
                eachAll: true,
                prefix: 'region_',
                onProvinceChange: function (data) {

                    // 新建一条可上门授课范围记录
                    me.regionSelected.show();

                    // 添加蓝色可删除标签
                    var data = {
                        'id': data.value,
                        'name': data.text
                    };

                    if (regionList.find('tr div:last').find('[data-id="' + data.id + '"]').length === 0) {

                        var currentTr = me.regionList.find('li:last');
                        var tdCount = currentTr.find('div').length;
                        var isAllProvince = currentTr.find('div:last:contains("全省")');
                        var isAllCity = currentTr.find('div:last:contains("全市")');
                        var lastTd = me.regionList.find('div:last');

                        // “全国”与其他互斥
                        if (data.name == '全国') {
                            confirm({
                                content: '是否要将可上门授课范围设置为全国？',
                                title: '温馨提示',
                                width: 300
                            })
                            .done(function () {
                                regionList.find('li').remove();
                                // 添加蓝色可删除标签
                                regionList.append('<li><div>' + createTag(data) + '</div></li>');
                                // 停止当前选择
                                regionSelectBox.find('.btn-confirm').click();
                            });
                        }
                        else if (tdCount == 1 && isAllProvince.length == 0) {
                            // 变更之前选择省
                            lastTd.html('');
                        }
                        else if (tdCount == 2 && isAllCity.length == 0) {
                            // 删除之前编辑中省市信息
                            currentTr.remove();
                            me.regionList.append('<li><div></div></li>');
                        }
                        else if (currentTr.length == 0) {
                            // 首次添加行
                            me.regionList.append('<li><div></div></li>');
                        }
                        else {
                            // 换行，添加省
                            currentTr.after('<li><div></div></li>');
                        }

                        // 非“全国”
                        if (data.name != '全国') {
                            // 添加不可操作标签
                            me.regionList.find('div:last').append(
                                createEmTag(data)
                            );
                        }
                    }

                    areaList.html('');
                    countryList.html('');
                },
                onCityChange: function (data) {

                    var data = {
                        'id': data.value,
                        'name': data.text
                    };

                    if (data.id != null) {
                        // 如果选择“全省”，则...
                        if (data.name == '全省') {

                            // 将之前的em替换为span“全省”
                            regionList
                            // .find('[data-id="' + data.id + '"]')
                            .find('li:last div:first em')
                            .each(function () {

                                var data = {
                                    'id': $(this).data('id'),
                                    'name': $(this).data('name') + '全省'
                                }
                                var spanTag = createTag(data);
                                $(this).replaceWith(spanTag);
                            });

                            // 本行其他单元格都删掉
                            regionList
                            // .find('[data-id="' + data.id + '"]')
                            .find('li:last div:first')
                            .siblings('div')
                            .each(function () {
                                $(this).remove();
                            });

                            // 停止当前选择
                            regionSelectBox.find('.btn-confirm').click();
                        }
                        else {
                            // 添加不可操作的标签
                            if (regionList.find('[data-id="' + data.id + '"]').length === 0) {

                                var currentTr = me.regionList.find('li:last');
                                var tdCount = currentTr.find('div').length;
                                var isAllCity = currentTr.find('div:last:contains("全市")');
                                var lastTd = me.regionList.find('div:last');

                                if (tdCount == 2 && isAllCity.length == 0) {
                                    // 变更之前选择市
                                    lastTd.html('');
                                }
                                else if ( tdCount > 2 || isAllCity.length != 0) {
                                    // 换行，添加市(补充当前省数据)
                                    var currentPro = regionSelectBox.find('.province').find('[class="active"]');
                                    var proData = {
                                        'id': currentPro.data('value'),
                                        'name': currentPro.text()
                                    };
                                    currentTr.after('<li><div>' + createEmTag(proData) + '</div><div></div></li>');
                                }
                                else {
                                    // 添加市
                                    currentTr.append('<div></div>');
                                }
                                me.regionList.find('div:last').append(
                                    createEmTag(data)
                                );

                            }
                        }

                        // 请求下级数据
                        service
                        .getRegionList({ id: data.id, includeSubway: true })
                        .done(function (response) {

                            // 增加“全市”逻辑
                            response.unshift({
                                'id': data.id,
                                'level': 2,
                                'name': '全市'
                            });

                            var html = createList(response);

                            if (html) {
                                regionBox.show();
                            }

                            areaList.html(html);
                            countryList.html('');

                        });

                    }

                    // regionBox.hide();
                }
            });

            var activeClass = 'active';

            element

            .on('click', '.btn-show', function (e) {
                regionSelectBox.show();
                $(this).remove();
            })

            .on('click', '.area-list li', function (e) {

                var target = $(e.currentTarget);
                if (target.hasClass(activeClass)) {
                    return;
                }

                // 全市 和 其他选项 互斥
                var index = target.index();

                var items = areaList.find('li');
                var allItem = items.first();

                // 全市 是第一个 li
                var isAllActive = allItem.hasClass(activeClass);

                if (isAllActive) { // 全市选中状态
                    if (index > 0) {  // 此时，选择了其他项

                        allItem.removeClass(activeClass);

                        // 将之前“全市”的span替换为em
                        regionList.find('[data-id="' + allItem.data('id') + '"]').each(function () {
                            // 截取“全市”两个字
                            var nameLen = $(this).data('name').length - 2;
                            var data = {
                                'id': $(this).data('id'),
                                'name': $(this).data('name').substring(0, nameLen)
                            }
                            var emTag = createEmTag(data);
                            $(this).replaceWith(emTag);
                        });

                    }
                }
                else { // 非全市状态
                    if (index === 0) { // 此时，选择了全市

                        // 前一项补位“全市”
                        var targetId = target.data('id');

                        regionList
                        .find('[data-id="' + targetId + '"]')
                        .each(function () {

                            var item = $(this);
                            var data = {
                                id: item.data('id'),
                                name: item.data('name') + '全市'
                            }

                            var spanTag = createTag(data);
                            item.replaceWith(spanTag);

                        });

                        areaList
                        .find('.' + activeClass)
                        .each(function () {

                            var item = $(this);
                            item.removeClass(activeClass);
                            regionList.find('[data-id="' + item.data('id') + '"]').closest('div').remove();

                        });

                        countryList
                        .find('.' + activeClass)
                        .each(function () {

                            var item = $(this);
                            item.removeClass(activeClass);
                            regionList.find('[data-id="' + item.data('id') + '"]').closest('div').remove();

                        });

                    }
                }

                var data = target.data();

                if (data.id != null) {

                    if (regionList.find('[data-id="' + data.id + '"]').length === 0) { // 未曾选中的区

                        var currentTr = me.regionList.find('li:last');
                        var tdCount = currentTr.find('div').length;

                        if ( tdCount >= 3 ) {
                            // 换行，添加区(补充之前省市数据)
                            var currentPro = regionSelectBox.find('.province').find('[class="active"]');
                            var proData = {
                                'id': currentPro.data('value'),
                                'name': currentPro.text()
                            };
                            var currentCity = regionSelectBox.find('.city').find('[class="active"]');
                            var cityData = {
                                'id': currentCity.data('value'),
                                'name': currentCity.text()
                            };
                            currentTr.after('<li><div>' + createEmTag(proData) + '</div><div>' + createEmTag(cityData) + '</div><div></div></li>');
                        }
                        else {
                            // 新建最后一级span标签
                            currentTr.append('<div></div>');
                        }

                        // 新建最后一级span标签，默认选中“全部”
                        me.regionList.find('div:last').append(
                            createTag(data)
                        );

                        service
                        .getRegionList({ id: data.id, includeSubway: true })
                        .done(function (response) {

                            countryList.html('');

                            // 第一个是`全部`
                            response.unshift({
                                id: data.id,
                                name: data.name,
                                text: '全部'
                            });

                            countryList.append(
                                createList(response)
                            );

                            // 默认选中全部
                            countryList.find('[data-id="' + data.id + '"]').click();

                            // 自动加上 activeClass
                            regionList
                            .find('li')
                            .each(function () {

                                var id = $(this).data('id');
                                countryList.find('[data-id="' + id + '"]').addClass(activeClass);

                            });

                        });
                    }
                    else if (regionList.find('span[data-id="' + data.id + '"]').length !== 0) { // 已选该区全部

                        service
                        .getRegionList({ id: data.id, includeSubway: true })
                        .done(function (response) {

                            countryList.html('');

                            // 第一个是`全部`
                            response.unshift({
                                id: data.id,
                                name: data.name,
                                text: '全部'
                            });

                            countryList.append(
                                createList(response)
                            );

                            // 为全部加上 activeClass
                            countryList.find('[data-id="' + data.id + '"]').addClass(activeClass);

                        });
                    }
                    else if (regionList.find('em[data-id="' + data.id + '"]').length !== 0) { // 已选，该区中某几项
                        service
                        .getRegionList({ id: data.id, includeSubway: true })
                        .done(function (response) {

                            countryList.html('');

                            // 第一个是`全部`
                            response.unshift({
                                id: data.id,
                                name: data.name,
                                text: '全部'
                            });

                            countryList.append(
                                createList(response)
                            );

                            // 为选中项加上 activeClass
                            var areaSelect = regionList.find('em[data-id="' + data.id + '"]');
                            var countrySelect = areaSelect.closest('li').find('div:last');

                            countrySelect
                            .find('span')
                            .each(function () {

                                var id = $(this).data('id');
                                countryList.find('[data-id="' + id + '"]').addClass(activeClass);

                            });
                        });
                    }

                    // 单选
                    areaList.find('.' + activeClass).removeClass(activeClass);
                    target.addClass(activeClass);

                }
            })

            .on('click', '.country-list li', function (e) {

                var target = $(e.currentTarget);

                if (target.hasClass(activeClass)) {
                    return;
                }

                // 全部 和 其他选项 互斥
                var index = target.index();

                var items = countryList.find('li');
                var allItem = items.first();

                // 全部 是第一个 li
                var isAllActive = allItem.hasClass(activeClass);

                if (isAllActive) { // 全部，点击了其他
                    if (index > 0) {
                        allItem.removeClass(activeClass);

                        // 将之前“全部”的span替换为em
                        regionList.find('[data-id="' + allItem.data('id') + '"]').each(function () {
                            // 截取“全部”两个字
                            var nameLen = $(this).data('name').length - 2;
                            var data = {
                                'id': $(this).data('id'),
                                'name': $(this).data('name').substring(0, nameLen)
                            }
                            var emTag = createEmTag(data);
                            $(this).replaceWith(emTag);
                        });

                    }
                }
                else { // 其他，点击了全部
                    if (index === 0) {

                        // 前一项补位“全部”
                        var targetId = target.data('id');

                        regionList
                        .find('[data-id="' + targetId + '"]')
                        .each(function () {

                            var item = $(this);
                            var data = {
                                id: item.data('id'),
                                name: item.data('name') + '全部'
                            }

                            var spanTag = createTag(data);
                            item.replaceWith(spanTag);

                        });

                        // 清除之前选中标签
                        countryList
                        .find('.' + activeClass)
                        .each(function () {

                            var item = $(this);
                            item.removeClass(activeClass);
                            regionList.find('[data-id="' + item.data('id') + '"]').closest('div').remove();

                        });

                    }
                }

                target.addClass(activeClass);

                var data = target.data();

                // 添加蓝色可删除标签
                if (regionList.find('[data-id="' + data.id + '"]').length === 0) {

                    var lastTr = me.regionList.find('li:last');

                    // 增加当前选择商圈(第四个单元格内)
                    if (me.regionList.find('li:last div').length < 4) {
                        lastTr.append('<div></div>');
                        // 将本行之前的所有span替换为e
                        lastTr.find('span').each(function () {
                            var emTag = createEmTag($(this).data());
                            $(this).replaceWith(emTag);
                        });
                    }
                    me.regionList.find('li div:last').append(
                        createTag(data)
                    );
                }
            })

            .on('click', '.icon-times', function (e) {

                var target = $(e.currentTarget).closest('span');
                var td = target.closest('div');
                var item = target.data();


                if (item.name == '全国' || item.name.indexOf("全省") > 0) { // 删除全国全省，需要confirm
                    confirm({
                        content: '是否确认删除该可上门授课范围？',
                        title: '温馨提示',
                        width: 300
                    })
                    .done(function () {
                        target.remove();
                        countryList.find('[data-id="' + item.id + '"]').removeClass(activeClass);

                        // 整行清空
                        td.closest('li').remove();
                        $('.btn-show').remove();
                        // 停止当前选择
                        regionSelectBox.find('.btn-confirm').click();

                    });
                }
                else {
                    target.remove();
                    areaList.find('[data-id="' + item.id + '"]').removeClass(activeClass);
                    countryList.find('[data-id="' + item.id + '"]').removeClass(activeClass);

                    // 最后一个单元格内容清空，则整行清空
                    var count = td.find('span').length;
                    if (count === 0) {
                        td.closest('li').remove();
                        $('.btn-show').remove();
                        // 停止当前选择
                        regionSelectBox.find('.btn-confirm').click();
                    }
                }
            })

            .on('click', '.btn-confirm', function (e) {
                // 省市区商圈归零
                me.regionsSelect.refresh({
                    provinceId: null,
                    cityId: null
                });
                me.areaList.html('');
                me.countryList.html('');

                // 所有active类归零
                regionSelectBox.find('.active').each(function () {
                    $(this).removeClass('active');
                });

                regionSelectBox.hide();
                regionSelected.find('.form-action').show();
            })

            .on('click', '.btn-add', function (e) {

                if (regionList.find('[data-name=全国]').length !== 0) { // 全国
                    confirm({
                        content: '你的可上门授课范围已经设置为全国，不能继续添加，是否删除后重新添加？',
                        title: '温馨提示',
                        width: 310
                    })
                    .done(function () {
                        regionList.find('li').remove();
                    });
                }
                else {
                    regionSelectBox.show();
                    $(this).closest('.form-action').hide();
                }
            })

            .on('click', '.btn-clear', function (e) {

                var btnClear = $(this);

                confirm({
                    content: '你确定要删除所有可上门授课范围吗？',
                    title: '温馨提示',
                    width: 320
                })
                .done(function () {
                    regionList.find('li').remove();
                });
            });

        },

        /**
         * 获得选中的 ID 数组
         *
         * @return {Array}
         */
        getValue: function () {

            var me = this;
            var data = [ ];

            me
            .regionList
            .find('li')
            .each(function () {

                $(this)
                .find('div:last span')
                .each(function () {

                    data.push(
                        $(this).data('id')
                    );

                });

            });

            return data.join(',');
        },

        refresh: function () {

            var me = this;
            var data = me.data || [ ];

            // 省市区县归零
            me.regionsSelect.refresh({
                provinceId: null,
                cityId: null
            });
            me.areaList.html('');
            me.countryList.html('');

            // 读取已有数据
            me.regionList.html('');

            if (data) {
                regionTree(me.regionList, data, '0');
            }
        }
    };

    function createList(data) {
        var html = [ ];
        $.each(
            data || [ ],
            function (index, item) {
                html.push(
                    createItem(item)
                );
            }
        );
        return html.join('');
    }

    function createItem(item) {
        return '<li data-id="' + item.id + '" data-name="' + item.name + '">'
             +     (item.text || item.name)
             + '</li>';
    }

    // 已选区域 - 标签
    function createTags(data) {
        var html = [ ];
        $.each(
            data || [ ],
            function (index, item) {
                html.push(
                    createTag(item)
                );
            }
        );
        return html.join('');
    }

    function createTag(item) {
        return '<span data-id="' + item.id + '" data-name="' + item.name + '">'
             +     item.name
             +     '<i class="icon icon-times"></i>'
             + '</span>';
    }

    function createEmTag(item) {
        return '<em data-id="' + item.id + '" data-name="' + item.name + '">'
             +     item.name
             + '</em>';
    }

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
                AccessRegion.map[level](regionList, data, item);
            }
        });
    }

    AccessRegion.map = {
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
            regionList.append('<li><div></div></li>');
            regionList.find('div').append(
                createTag({
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

        regionList.append('<li><div></div></li>');

        if (children.length == 0) { // 全省
            regionList.find('div:last').append(
                createTag({
                    id: id,
                    name: name + '全省'
                })
            );
            return;
        }
        else {
            regionList.find('div:last').append(
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

        var currentTr = regionList.find('li:last');
        var tdCount = currentTr.find('div').length;
        var isAllCity = currentTr.find('div:last:contains("全市")');
        var lastTd = regionList.find('div:last');

        if ( tdCount > 2 || isAllCity.length != 0) {
            // 换行，添加市
            currentTr.after('<li><div></div><div></div></li>');
        }
        else {
            // 添加市
            currentTr.append('<div></div>');
        }

        if (children.length == 0) { // 全市
            regionList.find('div:last').append(
                createTag({
                    id: id,
                    name: name + '全市'
                })
            );
            return;
        }
        else {
            regionList.find('div:last').append(
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

        var currentTr = regionList.find('li:last');
        var tdCount = currentTr.find('div').length;
        var isAllArea = currentTr.find('div:last:contains("全部")');
        var lastTd = regionList.find('div:last');

        if ( tdCount > 3 || isAllArea.length != 0) {
            // 换行，添加区
            currentTr.after('<li><div></div><div></div><div></div></li>');
        }
        else {
            // 添加市
            currentTr.append('<div></div>');
        }

        if (children.length == 0) { // 全部
            regionList.find('div:last').append(
                createTag({
                    id: id,
                    name: name + '全部'
                })
            );
            return;
        }
        else {
            regionList.find('div:last').append(
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

        var currentTr = regionList.find('li:last');
        var tdCount = currentTr.find('div').length;
        var lastTd = regionList.find('div:last');

        if ( tdCount < 4) {
            // 首个添加单元格
            currentTr.append('<div></div>');
        }

        regionList.find('div:last').append(
            createTag({
                id: id,
                name: name
            })
        );
        return;
    }

    return AccessRegion;

});