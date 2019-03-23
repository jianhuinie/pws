/**
 * @file 数值处理
 * @author dafo<huanghoujin@baijiahulian.com>
 */

/**
 * 防抖动
 *
 * @param {Function} fn 需要防抖动的函数
 * @param {?Object=} context 函数调用时的上下文
 * @return {Function} 包装过的支持防抖动函数
 */
export const debounce = (fn, delay, context) => {
    let timer = null;

    return function debounce() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(fn, delay, context);
    };
};

/**
 * 节流
 *
 * @param {Function} fn 需要节流的函数
 * @param {?Object=} context 函数调用时的上下文
 * @return {Function} 包装过的支持节流函数
 */
export const throttle = (fn, delay, context) => {
    let lastCalledTime = +new Date();

    return function throttled() {
        const nowTime = +new Date();

        if (nowTime - lastCalledTime >= delay) {
            fn.call(context);
            lastCalledTime = nowTime;
        }
    };
};
