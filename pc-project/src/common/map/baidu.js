/**
 * @file 百度地图
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var exports = $({});

    var peddingQueue;

    exports.init = function (callback) {
        if (typeof BMap === 'undefined') {

            if (!peddingQueue) {
                peddingQueue = [ ];
                require(
                    [
                        'js!http://api.map.baidu.com/api?v=2.0&ak=EMB0bKIvMeOd70lyyG92BZlu'
                    ],
                    function () {
                        $.each(
                            peddingQueue,
                            function (index, fn) {
                                fn();
                            }
                        );
                        peddingQueue = null;
                    }
                );
            }

            peddingQueue.push(callback);

        }
        else {
            setTimeout(callback);
        }

    };

    /**
     * 用来储存已经被初始化过的map控件
     *
     * @inner
     * @type {Object}
     */
    var existedMap = {
    };

    /*
     * 将已有地图对象抛出去，以便清空对象之用
     */
    exports.getExistedMap = function () {
        return existedMap;
    };

    // 需要依赖百度地图 api

    /**
     * 搜索 query 进行标注
     *
     * @param {string} id 元素 ID，不包含 #
     * @param {string} query 搜索词
     * @param {number} longitude 经度
     * @param {number} latitude 纬度
     */
    exports.search = function (id, query, longitude, latitude) {

        var map;

        // js竟然没有参数的默认值~！
        if (longitude == null) {
            longitude = 116.404;
        }
        if (latitude == null) {
            latitude = 39.915;
        }

        if (existedMap[id]) {
            map = existedMap[id];
        }
        else {

            var map = new BMap.Map(id);

            // 初始化地图,设置中心点坐标和地图级别
            map.centerAndZoom(new BMap.Point(longitude, latitude), 16);

            // 添加放大缩小按钮
            var top_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_ZOOM});
            map.addControl(top_left_navigation);

            // 启用滚轮放大缩小
            map.enableScrollWheelZoom();
            existedMap[id] = map;
        }


        var lock = false ;
        var local = new BMap.LocalSearch(
                        map,
                        {
                            renderOptions: {
                                map: map,
                                selectFirstResult: false
                            },
                            pageCapacity: 1,
                            onSearchComplete: function (result) {
                                var count = result.getNumPois();
                                if (count < 1) {

                                    //如果区域+街道的组合搜索不到
                                    //重新搜索区域
                                    var array = query.split('-');
                                    if (!lock && array[0] && array[0] != query) {
                                        lock = true;
                                        local.search(array[0]);
                                    }else{
                                        map.clearOverlays();
                                        map.reset();
                                        return false;
                                    }

                                }

                            }
                        }
                    );

        local.search(query)

    };


    /**
     * 根据城市名设置地图中心点
     *
     * @param {string} id 元素 ID，不包含 #
     * @param {string} areaName 区名
     */
    exports.areaCenter = function (id, areaName) {

        var map;

        if (existedMap[id]) {

            map = existedMap[id];
            // 初始化地图,用城市名设置地图中心点
            map.centerAndZoom(areaName, 16);

        }
        else {

            var map = new BMap.Map(id);

            // 初始化地图,用城市名设置地图中心点
            map.centerAndZoom(areaName, 16);

            // 添加放大缩小按钮
            var top_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_ZOOM});
            map.addControl(top_left_navigation);

            // 启用滚轮放大缩小
            map.enableScrollWheelZoom();
            existedMap[id] = map;
        }

    };


    /**
     * 地址解析
     *
     * @param {string} id 元素 ID，不包含 #
     * @param {string} address 地址
     * @param {boolean} enableScroll 滚轮是否可用
     */
    exports.addrResolution = function (id, address, enableScroll) {

        var map;

        if (existedMap[id]) {
            map = existedMap[id];

            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();

            // 清除全部覆盖物
            map.clearOverlays();

            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(address, function(point){

                if (point) {

                    map.centerAndZoom(point, 16);
                    var marker = new BMap.Marker(point); // 创建标注
                    // console.log(1, address);
                    addLabel(id, marker, address); // 为标注点添加标签
                    addEvt(id, marker, false); // 为标注点添加事件

                    map.addOverlay(marker); // 将标注添加到地图中
                    marker.enableDragging(); // 标注点可拖拽

                }
            }, "北京市");

        }
        else {

            var map = new BMap.Map(id);

            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();

            // 清除全部覆盖物
            map.clearOverlays();

            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(address, function(point){
                if (point) {
                    map.centerAndZoom(point, 16);
                    var marker = new BMap.Marker(point); // 创建标注
                    // console.log(2, address);
                    addLabel(id, marker, address); // 为标注点添加标签
                    addEvt(id, marker, false); // 为标注点添加事件

                    map.addOverlay(marker); // 将标注添加到地图中
                    marker.enableDragging(); // 标注点可拖拽
                }
            }, "北京市");

            // 添加放大缩小按钮
            var top_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_ZOOM});
            map.addControl(top_left_navigation);

            if (enableScroll) {
                // 启用滚轮放大缩小
                map.enableScrollWheelZoom();
            } else {
                map.disableScrollWheelZoom();
            }

            existedMap[id] = map;
        }

    };


    /**
     * 地址解析 - 地址薄 - 操作按钮组
     *
     * @param {string} id 元素 ID，不包含 #
     * @param {string} address 地址
     * @param {?string} lng 经纬度
     * @param {?string} lat 经纬度
     *
     */
    exports.addrReso = function (id, address, lng, lat) {

        var map, mapDiv;
        var dialog = $('.set-address-dialog');
        if (dialog.length) { // 弹窗中的地图区
            mapDiv = dialog.find('.' + id);
        }
        else {
            mapDiv = $('.' + id + ':visible'); // 地图区
        }
        var locationAddrDiv = mapDiv.find('.location-addr'); // 详细地址区
        var locationAddrGroup = locationAddrDiv.closest('.form-group');
        var showError = locationAddrDiv.find('.error');
        var showMessage = locationAddrDiv.find('.message-primary');

        var confidence;

        if (existedMap[id]) {
            map = existedMap[id];
        }
        else {
            var map = new BMap.Map(id);

            // 添加放大缩小按钮
            var top_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_ZOOM});
            map.addControl(top_left_navigation);

            // 启用滚轮放大缩小
            map.enableScrollWheelZoom();
            existedMap[id] = map;
        }

        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 清除全部覆盖物
        map.clearOverlays();

        // 验证地址准确级别
        var url = "http://api.map.baidu.com/geocoder/v2/";
        $.ajax(url, {
            async: false,
            dataType: 'jsonp',
            data: {
                output: 'json',
                ak: 'EMB0bKIvMeOd70lyyG92BZlu',
                address: address
            },
            success: function(response) {

                if (response.status === 0) {

                    confidence = response.result.confidence;
                    if (confidence < 60) {
                        locationAddrGroup.addClass('has-error');
                        showMessage.show();
                        showError.hide();
                    }
                    else {
                        locationAddrGroup.removeClass('has-error');
                        showMessage.hide();
                    }

                }

            }
        });

        exports.getConfidence = function () {
            return confidence;
        };

        // 经纬度 或 地址 定位地图
        if (lng && lat) {
            var point = new BMap.Point(lng, lat);

            map.centerAndZoom(point, 16);
            // 返回地址
            myGeo.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;

                var address = addComp.province; // 重新获取城市

                if (addComp.province != addComp.city ) {
                    // 避免省市相同数据的情况
                    address += addComp.city;
                }

                address += addComp.district + addComp.street + addComp.streetNumber;

                // 地图定位，并添加标签
                var marker = new BMap.Marker(point);  // 创建标注
                // console.log(3, address);
                addLabel(id, marker, address); // 为标注点添加标签
                addEvt(id, marker, true); // 为标注点添加事件
                map.addOverlay(marker);  // 将标注添加到地图中
                marker.enableDragging(); // 标注点可拖拽
                map.panTo(point);
            });
        }
        else {
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(address, function(point){
                if (point) {
                    map.centerAndZoom(point, 16);
                    var marker = new BMap.Marker(point); // 创建标注
                    // console.log(4, address);
                    addLabel(id, marker, address); // 为标注点添加标签
                    addEvt(id, marker, true); // 为标注点添加拖拽事件

                    map.addOverlay(marker); // 将标注添加到地图中
                    marker.enableDragging(); // 标注点可拖拽
                }
            }, "北京市");
        }

        // 查看大图
        mapDiv.find('.amplify').show();
        mapDiv.find('.map-oper').show();

    };


    /**
     * 创建标注点/标签 - 地址
     *
     * @param {string} mapContainer 地图容器，类名
     * @param {object} marker 标注点对象
     * @param {string} address 标注点位置
     */
    function addLabel (mapContainer, marker, address) {

        mapContainer = '.' + mapContainer;

        var opts = {
            offset: new BMap.Size(20, -30) // 设置文本偏移量
        }

        var label = new BMap.Label(address, opts); // 创建文本标注对象
        label.setStyle({
            color: "#3d3d3d",
            fontSize: "12px",
            height: "26px",
            lineHeight: "26px",
            borderColor: "#ff9900",
            paddingLeft: "5px",
            paddingRight: "5px",
            fontFamily: "微软雅黑"
        });

        var mapForm = $(mapContainer);

        mapForm.find('.BMap_Marker label').remove(); // 删除之前的标签
        marker.setLabel(label); // 设置最新的标签

        // 将经纬度返给表单项
        var point = marker.getPosition(); // 获取marker的位置
        mapForm.find('input[name="lng"]').val(point.lng);
        mapForm.find('input[name="lat"]').val(point.lat);

        // 逆地址解析 - 获取百度“区级地区名字”
        var geoc = new BMap.Geocoder();
        geoc.getLocation(point, function(rs){
            var addComp = rs.addressComponents;
            // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
            mapForm.find('input[name="bd_area_name"]').val(addComp.district);
        });


    }

    /*
     * 创建标注点/标签 - “回原位置”
     * @param {string} id 元素 ID，不包含 #
     * @param {string} address 地址
     *
     */
    exports.makeMarker = function (id, address) {
        var map;
        if (existedMap[id]) {
            map = existedMap[id];
        }
        else {
            var map = new BMap.Map(id);
        }

        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();

        // 清除全部覆盖物
        map.clearOverlays();

        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(address, function(point){

            if (point) {

                map.centerAndZoom(point, 16);
                var marker = new BMap.Marker(point); // 创建标注
                addLabel(id, marker, address); // 为标注点添加标签
                addEvt(id, marker, true); // 为标注点添加事件

                map.addOverlay(marker); // 将标注添加到地图中
                marker.enableDragging(); // 标注点可拖拽

            }
        }, "北京市");
    }


    /**
     * 为标注点添加拖拽事件 - 显示当前地址
     *
     * @param {object} id 包含地图的div类
     * @param {object} marker 标注点对象
     * @param {string} toZero true:“回原位置”按钮
     *
     * @return {object} [最初定位的位置对象]
     */
    function addEvt (id, marker, toZero) {

        marker.addEventListener('dragend', attribute);

        function attribute () {

            var p = marker.getPosition(); //获取marker的位置

            var newAddress = $('.new-address');

            // 逆地址解析 - 获取百度“市级地区名字”
            var geoc = new BMap.Geocoder();
            geoc.getLocation(p, function(rs){
                var addComp = rs.addressComponents;
                var mapCity = addComp.city; // 获取地图上的市名称“XX市 XX特别行政区”
                var userCity = newAddress.find('.city .btn-default span').text(); // 用户选择的市名称
                // 拖拽出市，则回原位置
                if (mapCity.indexOf(userCity) == -1) {

                    if (id == 'big-map') { // 地图弹窗
                        $('.big-map').find('.btn-initial').click();
                    }
                    else {
                        newAddress.find('.btn-initial').click();
                    }


                }

            });

            reAddrResolution(id, marker, p.lng, p.lat); // 解析为地址

            // 回原位置
            if (toZero) {
                $('.map-oper').show();
                $('.map-oper').find('.btn-initial').show();
            }
        }

    }


    /**
     * 逆地址解析 - 为标注点添加标签
     *
     * @param {object} id 包含地图的div类
     * @param {object} marker 标注点对象
     * @param {string} lng，lat 经纬度
     * @return address 地址
     */
    function reAddrResolution (id, marker, lng, lat) {

        var point = new BMap.Point(lng, lat);

        // 创建地址解析器实例
        var geoc = new BMap.Geocoder();

        // var promise = $.Deferred(); 佳璐1

        // 返回地址
        geoc.getLocation(point, function(rs){

            var addComp = rs.addressComponents;
            var address = addComp.province; // 重新获取城市

            if (addComp.province != addComp.city ) {
                // 避免省市相同数据的情况
                address += addComp.city;
            }

            address += addComp.district + addComp.street + addComp.streetNumber;
            addLabel(id, marker, address); // 为标注点添加标签

        });

    }


    /**
     * 逆地址解析 - 页面初始刷新
     *
     * @param {string} id id 元素 ID，不包含 #
     * @param {string} lng，lat 经纬度
     *
     */
    exports.reAddress = function (id, lng, lat) {

        // 默认定位到北京
        if (lng == null) {
            lng = 116.404000;
        }
        if (lat == null) {
            lat = 39.915495;
        }

        var point = new BMap.Point(lng, lat);

        // 创建地址解析器实例
        var geoc = new BMap.Geocoder();

        // 返回地址
        geoc.getLocation(point, function(rs){

            var addComp = rs.addressComponents;
            var location = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
            // 地图定位，并添加标签
            exports.addrResolution(id, location);
        });


    }

    /**
     * 逆地址解析 - 同上面的函数功能,不过修正了地图定位不准的问题.
     *
     * @param {string} id id 元素 ID，不包含 #
     * @param {string} lng，lat 经纬度
     * @param {boolean} enableScroll 滚轮是否可用
     */
    exports.modifiedAddress = function (id, lng, lat, enableScroll) {
        // 默认定位到北京
        if (lng == null) {
            lng = 116.404000;
        }
        if (lat == null) {
            lat = 39.915495;
        }

        var point = new BMap.Point(lng, lat);
        // 创建地址解析器实例
        var geoc = new BMap.Geocoder();

        // 返回地址
        geoc.getLocation(point, function(rs){

            var addComp = rs.addressComponents;

            var address = addComp.province; // 重新获取城市

            if (addComp.province != addComp.city ) {
                // 避免省市相同数据的情况
                address += addComp.city;
            }

            address += addComp.district + addComp.street + addComp.streetNumber;

            // 地图定位，并添加标签
            var marker = new BMap.Marker(point);  // 创建标注
            addLabel(id, marker, address); // 为标注点添加标签
            addEvt(id, marker, false); // 为标注点添加事件

            var map = null ;
            if (existedMap[id]) {
                map = existedMap[id];
                // 清除全部覆盖物
                map.clearOverlays();
            } else {

                map = new BMap.Map(id);
                // 清除全部覆盖物
                map.clearOverlays();
                // 初始化地图,设置中心点坐标和地图级别
                map.centerAndZoom(point, 16);

                // 添加放大缩小按钮
                var top_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_ZOOM});
                map.addControl(top_left_navigation);

                if (enableScroll) {
                    // 启用滚轮放大缩小
                    map.enableScrollWheelZoom();
                } else {
                    map.disableScrollWheelZoom();
                }

            }
            map.addOverlay(marker);  // 将标注添加到地图中
            marker.enableDragging(); // 标注点可拖拽
            map.panTo(point);
        });

    }


    return exports;

});