/**
 * @file 百度地图 - 批量地址解析
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    /**
     * 用来储存已经被初始化过的map控件
     *
     * @inner
     * @type {Object}
     */
    var existedMap = {

    };


    /**
     * 罗列 areaList 进行标注
     *
     * @param {string} id 元素 ID，不包含 #
     * @param {string} areaList 地址列表
     * @param {number} longitude 经度
     * @param {number} latitude 纬度
     * @param {number} zoom 地图缩放比例
     */
    exports.addAreaList = function (id, areaList, longitude, latitude, zoom) {

        var map;

        if (existedMap[id]) {
            map = existedMap[id];
        }
        else {

            // 百度地图API功能
            map = new BMap.Map(id);

            // 初始化地图,设置中心点坐标和地图级别
            map.centerAndZoom(new BMap.Point(longitude,latitude), zoom);

            // 添加放大缩小按钮
            var top_left_navigation = new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                type: BMAP_NAVIGATION_CONTROL_ZOOM});
            map.addControl(top_left_navigation);

            // 启用滚轮放大缩小
            map.enableScrollWheelZoom();

            existedMap[id] = map;

        }


        var index = 0;
        var myGeo = new BMap.Geocoder();
        var adds = areaList;

        function bdGEO(){
            var p_addr = adds[index].addr;  // 地区标题
            var p_address = adds[index]['address'];  // 具体地址
            index++;
            geocodeSearch(p_addr, p_address);
        }

        function geocodeSearch(addr, address){
            if(index < adds.length){
                setTimeout(bdGEO, 400);
            }
            myGeo.getPoint(address, function(point){
                if (point) {
                    var result = document.getElementById("result");
                    result.innerHTML += "<i class='icon icon-location'></i>";
                    result.innerHTML += "<div class='addr'>" + addr + "</div>";
                    result.innerHTML += "<address>" + address + "</address>";

                    var addDot = new BMap.Point(point.lng, point.lat);
                    addMarker(addDot,new BMap.Label(addr,{offset:new BMap.Size(20,-10)}));
                }
            }, "北京市");
        }

        // 编写自定义函数,创建标注
        function addMarker(point,label){
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
            marker.setLabel(label);
        }


        bdGEO();

    }


});