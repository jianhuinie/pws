/**
 * math操作
 */
const math = {};

/**
 * 返回min与max之间的数。
 * */
math.clamp = function (num, min, max) {
    return num < min ? min : num > max ? max : num;
};

/**
 * 计算两个经纬度点之间的距离，单位米
 *
 * @params {object} latlng1 经纬度对象{lat:xxx,lng:xxx}
 * @params {object} latlng2 同上
 * @params {number|null} [c] 球体半径（默认为地球半径）
 * */
math.computeDistance = (function () {
    const degreeToRadian = function (deg) {
        return deg * (Math.PI / 180);
    };
    const computeScaleBetween = function (a, b) {
        const c = degreeToRadian(a.lat);
        const d = degreeToRadian(b.lat);
        return 2 * Math.asin(
                Math.sqrt(
                    Math.pow(Math.sin((c - d) / 2), 2) + Math.cos(c) * Math.cos(d) *
                    Math.pow(Math.sin((degreeToRadian(a.lng) - degreeToRadian(b.lng)) / 2), 2)));
    };
    const EARTH_RADIUS = 6378136.49;
    return function (latlng1, latlng2, c) {
        return computeScaleBetween(latlng1, latlng2) * (c || EARTH_RADIUS);
    };
})();

export default math;