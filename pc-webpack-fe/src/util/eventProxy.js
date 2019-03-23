/**
 * 订阅者模式
 * @file leon
 * @date 2017/12/25
 */
const eventProxy = {
    onObj: {},
    oneObj: {},
    on(key, fn) {
        if (this.onObj[key] === void 0) {
            this.onObj[key] = [];
        }
        this.onObj[key].push(fn);
    },
    one(key, fn) {
        if (this.oneObj[key] === void 0) {
            this.oneObj[key] = [];
        }
        this.oneObj[key].push(fn);
    },
    off(key) {
        this.onObj[key] = [];
        this.oneObj[key] = [];
    },
    trigger(...rest) {
        let key;
        let args;
        console.log(rest);
        if (arguments.length === 0) {
            return false;
        }
        key = rest[0];
        args = [].concat(Array.prototype.slice.call(rest, 1));
        if (this.onObj[key] !== void 0 && this.onObj[key].length > 0) {
            for (let i in this.onObj[key]) {
                this.onObj[key][i].apply(null, args);
            }
        }
        if (this.oneObj[key] !== void 0 && this.oneObj[key].length > 0) {
            for (let i in this.oneObj[key]) {
                this.oneObj[key][i].apply(null, args);
                this.oneObj[key][i] = void 0;
            }
            this.oneObj[key] = [];
        }
        return true;
    }
};
export default eventProxy;
