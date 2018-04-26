/**
 * localStorage操作
 */
export default {
    // 默认采用localStorage方式
    storager: window.sessionStorage,
    /**
     * 获取本地存储值
     *   storager存在key，获取，没有直接返回undefined
     *   key对应的value非false，JSON.parse处理
     *
     * @param  {string}   key      存储key值
     * @param  {Function} callback 回调函数
     * @return {*}                 返回值
     */
    get: function (key, callback) {
        let result;
        if (this.storager[key]) {
            result = this.storager.getItem(key);
            if (result) {
                result = JSON.parse(result);
            }
        }

        if (typeof callback === 'function') {
            callback(result);
        }
        return result;
    },
    /**
     * 设置本地存储
     *
     * @param {string}   key      [description]
     * @param {*}   value    [description]
     * @param {Function} callback [description]
     */
    set: function (key, value, callback) {
        if (typeof value !== 'undefined') {
            value = JSON.stringify(value);
            this.storager.setItem(key, value);
        }

        if (typeof callback === 'function') {
            callback(value);
        }
    },
    remove: function (key, callback) {
        this.storager.removeItem(key);
        if (typeof callback === 'function') {
            callback();
        }
    },
    clear: function () {
        this.storager.clear();
    }
};