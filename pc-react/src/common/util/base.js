/**
 * 基础操作
 */
const base = {};
const op = Object.prototype;

base.getUid = (function () {
    let uid = 0;
    const magic = '__GSX__';

    return function (obj, isReset) {
        return (!isReset && obj[magic]) || (obj[magic] = ++uid);
    };
})();

base.isString = (o) => {
    return op.toString.call(o) === '[object String]';
};
base.isNumber = (o) => {
    return op.toString.call(o) && isFinite(o) === '[object Number]';
};
base.isBoolean = (o) => {
    return op.toString.call(o) === '[object Boolean]';
};
base.isUndefined = (o) => {
    return typeof o === 'undefined';
};
base.isNull = (o) => {
    return o === null;
};
base.isFunction = (o) => {
    return op.toString.call(o) === '[object Function]';
};
base.isObject = (o) => {
    return op.toString.apply(o) === '[object Object]';
};
base.isArray = (o) => {
    return Array.isArray ? Array.isArray(o) : op.toString.call(o) === '[object Array]';
};
base.isDom = (function () {
    if (base.isObject(window.HTMLElement)) {
        return function (o) {
            return o instanceof HTMLElement;
        }
    } else {
        return function (o) {
            return o &&
                1 === o.nodeType &&
                base.isString(o.nodeName);
        };
    }
})();

base.union = function () {
    const args = arguments;
    const len = args.length;
    return function () {
        for (let i = 0; i < len; ++i) {
            if (args[i].apply(this, arguments)) {
                return true;
            }
        }
        return false;
    };
};

export default base;