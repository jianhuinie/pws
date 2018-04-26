/**
 * @file 百度地图
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var guid = 0;

    function createGuid() {
        return 'map' + guid++;
    }

    return Ractive.extend({
        template: require('html!./BaiduMap.html'),
        data: function () {
            return {
                options: {
                    address: '',
                    lng: null,
                    lat: null,
                    // 是否需要 marker
                    // 如果有 marker，拖拽它会改变 address、lng、lat
                    needMarker: true
                }
            };
        },
        oninit: function () {
            this.set('id', createGuid());
        },
        onrender: function () {

            var me = this;

            var map =
            me.map = new BMap.Map(
                me.get('id')
            );

            // 左上角的缩放控件
            map.addControl(
                new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    type: BMAP_NAVIGATION_CONTROL_ZOOM
                })
            );

            // 启用滚轮缩放
            map.enableScrollWheelZoom();

            var needMarker = me.get('options.needMarker');
            var addMarker = function (point) {
                if (needMarker) {
                    me.addMarker(point);
                }
            };

            var searchByAddress = function () {

                var address = me.get('options.address');
                if (address === me.address) {
                    return;
                }

                if (address) {
                    me
                    .searchByAddress(address)
                    .then(addMarker);
                }

            };

            var searchByGeo = function () {

                var lng = me.get('options.lng');
                var lat = me.get('options.lat');
                if (lng === me.lng && lat === me.lat) {
                    return;
                }

                if (lng != null && lat != null) {
                    addMarker(
                        me.searchByGeo(lng, lat)
                    );
                }
            };

            var address = me.get('options.address');
            if (address) {
                searchByAddress();
            }
            else {
                searchByGeo();
            }

            me.observe('options.address', searchByAddress);
            me.observe('options.lng + options.lat', searchByGeo);

        },

        searchByAddress: function (address) {

            var deferred = $.Deferred();

            var me = this;
            var myGeo = new BMap.Geocoder();

            myGeo.getPoint(
                address,
                function (point) {
                    if (point) {

                        me.saveGeo(point.lng, point.lat);
                        me.saveAddress(address);

                        me.map.centerAndZoom(point, 16);
                        deferred.resolve(point);

                    }
                    else {
                        deferred.reject();
                    }
                },
                '北京市'
            );

            return deferred;

        },

        searchByGeo: function (lng, lat) {

            this.saveGeo(lng, lat);

            var point = new BMap.Point(lng, lat);
            this.map.centerAndZoom(point, 16);

            return point;

        },

        addMarker: function (point) {

            var me = this;

            var map = me.map;
            map.clearOverlays();

            var marker = new BMap.Marker(point);
            map.addOverlay(marker);

            marker.enableDragging();
            marker.addEventListener('dragend', function () {
                var position = marker.getPosition();
                var geo = new BMap.Geocoder();
                geo.getLocation(position, function (response){

                    response = response || { };

                    var point = response.point || { };
                    me.saveGeo(point.lng, point.lat);

                    me.saveAddress(
                        response.address
                    );

                    me.set(
                        'options.detail',
                        response.addressComponents
                    );

                });
            });
        },

        saveGeo: function (lng, lat) {

            var data = { };

            this.lng =
            data['options.lng'] = lng;

            this.lat =
            data['options.lat'] = lat;

            this.set(data);

        },

        saveAddress: function (address) {

            this.address = address;

            this.set('options.address', address);

        },

        onteardown: function () {

        }
    });

});