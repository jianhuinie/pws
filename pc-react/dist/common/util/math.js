define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var math = {};
    math.clamp = function (num, min, max) {
        return num < min ? min : num > max ? max : num;
    };
    math.computeDistance = function () {
        var degreeToRadian = function degreeToRadian(deg) {
            return deg * (Math.PI / 180);
        };
        var computeScaleBetween = function computeScaleBetween(a, b) {
            var c = degreeToRadian(a.lat);
            var d = degreeToRadian(b.lat);
            return 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((c - d) / 2), 2) + Math.cos(c) * Math.cos(d) * Math.pow(Math.sin((degreeToRadian(a.lng) - degreeToRadian(b.lng)) / 2), 2)));
        };
        var EARTH_RADIUS = 6378136.49;
        return function (latlng1, latlng2, c) {
            return computeScaleBetween(latlng1, latlng2) * (c || EARTH_RADIUS);
        };
    }();
    exports.default = math;
});