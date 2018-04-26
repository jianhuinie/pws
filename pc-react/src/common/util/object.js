/**
 * 对象.
 */
    const object = {};

    /**
     * 判断是不是空对象
     * */
    object.isEmpty = function (obj) {
        if (obj) {
            const keys = Object.keys(obj);
            return keys.length === 0;
        }
        return false;
    };

    object.toParamUrl = function (data, noCache) {
        const arr = [];
        if (data) {
            for (let key in data) {
                if ('undefined' !== typeof data[key] && null != data[key]) {
                    arr.push(key + '=' + encodeURIComponent(data[key]));
                }
            }
        }
        if (noCache) {
            // 加时间戳
            arr.push('_t=' + (+new Date()).toString(36));
        }
        return arr.join('&');
    };

    export default object;