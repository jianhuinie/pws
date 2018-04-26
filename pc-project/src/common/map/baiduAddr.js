/**
 * @file 百度地图 - 批量地址解析不需要经纬度
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    /**
     * 用来储存已经被初始化过的map控件
     *
     * @inner
     * @type {Object}
     */
    var existedMap = {};


    /**
     * 罗列 areaList 进行标注
     *
     * @param {string} id 元素 ID，不包含 #
     * @param {string} area 地址列表
     */
    exports.addAreaList = function (id, area) {

        if (!area) {
            return;
        }
        var areaList = [];
        for (var i = 0; i < area.length; i++) {
            if (area[i].detail) {
                areaList.push({
                    'name': area[i].name,
                    'detail': area[i].detail,
                    'lng': area[i].longitude,
                    'lat': area[i].latitude
                });
            }
        }

        if (areaList.length < 1) {
            return;
        }

        var coordinate = [];
        var geo = new BMap.Geocoder();
        var index = 0;
        var map;

        // 编写自定义函数,创建标注
        function addMarker(point, label) {
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
            marker.setLabel(label);
        }

        // 搜索地址逻辑
        function doSearch() {
            index++;
            if (index < areaList.length) {
                geo.getPoint(areaList[index].detail, callback, "中国");
            } else {
                // 百度地图API功能
                map = new BMap.Map(id);

                // 初始化地图,设置中心点坐标和地图级别
                map.centerAndZoom(new BMap.Point(coordinate[0].lng,
                    coordinate[0].lat),
                    13);

                // 添加放大缩小按钮
                var top_left_navigation = new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    type: BMAP_NAVIGATION_CONTROL_ZOOM
                });
                map.addControl(top_left_navigation);

                // 启用滚轮放大缩小
                //map.enableScrollWheelZoom();
                map.disableScrollWheelZoom();

                // 遍历存储的坐标点,标注到地图上
                for (var i = 0; i < coordinate.length; i++) {
                    var dot = new BMap.Point(coordinate[i].lng, coordinate[i].lat);
                    addMarker(dot, new BMap.Label(coordinate[i].name, {offset: new BMap.Size(20, -10)}));
                }

            }
        }

        // 回调函数
        function callback(point) {
            if (point) {
                // 存储坐标点
                coordinate.push({
                    'lng': areaList[index].lng ? areaList[index].lng : point.lng,
                    'lat': areaList[index].lat ? areaList[index].lat : point.lat,
                    'name': areaList[index].name,
                    'detail': areaList[index].detail
                });
                doSearch();
            } else {
                doSearch();
            }
        }

        geo.getPoint(areaList[0].detail, callback, "中国");

    }


});