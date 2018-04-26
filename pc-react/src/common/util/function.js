/**
 * 函数操作
 */
import utilArray from './array';

var fun = {};

fun.singleton = function (cons, options) {
    if (!cons.hasOwnProperty('__instance__')) {
        cons['__instance__'] = new cons(options);
    }
    return cons['__instance__'];
};

fun.bind = function (fn, context) {
    const args = utilArray.argsToArray(arguments, 2);
    return function () {
        return fn.apply(context, args.concat(utilArray.argsToArray(arguments)));
    };
};

fun.lazyConst = function (f) {
    let c;
    return function () {
        if (f) {
            c = f();
            f = null;
        }
        return c;
    };
};

fun.nop = function () {};

fun.counter = (n, fn) => {
    if (!n) {
        fn();
    } else {
        return function () {
            --n || fn();
        };
    }
};

export default fun;