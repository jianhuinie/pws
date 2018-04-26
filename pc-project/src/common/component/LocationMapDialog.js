/**
 * @file 地图定位
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');
    var consult = $('#consult');
    var baiduMap = require('common/map/baidu');

    var form = require('common/form');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');

    var currentArea, currentLng, currentLat;

    /*
     * 获取当前用户编辑的省市区地址信息，并定位地图
     * 如果有lng,lat 经纬度优先定位
     * @property area 省市区信息
     * @property lng、lat 经纬度信息
     *
     */
    function getAreaToMap (area, lng, lat) {

        $('dialog-body').find('#big-map').show();
        if (lng && lat) {
            baiduMap.addrReso('big-map', area, lng, lat);
        }
        else {
            baiduMap.addrReso('big-map', area);
        }
    }

    /**
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.teacher_num 老师ID
     * @property {Function=} options.closeDialog 直接关闭窗口，同时销毁地图对象
     * @property {Function=} options.saveAddress “保存位置”，将大地图编辑好地址反显到小地图上
     */
    function LocationMapDialog(options) {
        $.extend(this, options);
        this.init();
    }

    LocationMapDialog.prototype = {

        init: function () {

            var me = this;
            currentArea = me.area;
            currentLng = me.lng;
            currentLat = me.lat;

            var content = '<div class="big-map">'
                        +    '<div id="big-map"></div>'

                        +    '<span class="map-oper">'
                        +        '<button class="small btn-primary btn-over">保存位置</button>'
                        +        '<button class="small btn-default btn-initial">回原位置</button>'
                        +        '<span class="bg"></span>'
                        +    '</span>'

                        +    '<input type="hidden" name="lng" />'
                        +    '<input type="hidden" name="lat" />'
                        +    '<input type="hidden" name="bd_area_name" />'
                        + '</div>';

            var dialog = new Dialog({
                title: '地图定位',
                skinClass: 'location-map-dialog',
                content: content,
                width: 550
            });

            var element = dialog.element;

            if (currentLng && currentLat) {
                getAreaToMap(currentArea, currentLng, currentLat);
            }
            else {
                getAreaToMap(currentArea);
            }

            element
            .on('click', '.btn-over', function () { // 保存位置
                var lng = element.find('input[name="lng"]').val();
                var lat = element.find('input[name="lat"]').val();

                dialog.hide();
                me.closeDialog();
                me.saveAddress(lng, lat);
            })

            .on('click', '.btn-initial', function () { // 回原位置
                baiduMap.makeMarker('big-map', currentArea);
            })

            .on('click', '.dialog-close', function () {
                // 关闭弹窗 - 销毁对象
                me.closeDialog();
            });


        }

    }

    return LocationMapDialog;

});