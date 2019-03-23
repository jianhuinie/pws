/**
 * @file DOM 相关
 * @author dafo<huanghoujin@baijiahulian.com>
 */

/**
 * 是否支持 classList
 *
 * @type {boolean}
 */
const hasClassList = 'classList' in document.documentElement;

/**
 * 是否包含指定的 class
 *
 * @param {Element} el HTMLElement
 * @param {string} className 待评估是否被包含的 class 名
 */
export const hasClass = hasClassList
    ? (el, className) => el.classList.contains(className)
    : (el, className) => ` ${el.className} `.indexOf(` ${className} `) > -1;

/**
 * 增加 class
 *
 * @param {Element} el HTMLElement
 * @param {string} className 要增加的 class 名
 */
export const addClass = hasClassList
    ? (el, className) => el.classList.add(className)
    : (el, className) => !hasClass(el, className) && (el.className = (`${el.className} ${className}`).trim());

/**
 * 移除 class
 *
 * @param {Element} el HTMLElement
 * @param {string} className 要移除的 class 名
 */
export const removeClass = hasClassList
    ? (el, className) => el.classList.remove(className)
    : (el, className) => (
        el.className = el.className
            .split(/\s+/)
            .filter(name => name !== className)
            .join(' ')
    );

/**
 * 切换 class
 *
 * @param {Element} el HTMLElement
 * @param {string} className 要切换的 class 名
 */
export const toggleClass = hasClassList
    ? (el, className) => el.classList.toggle(className)
    : (el, className) => (hasClass(el, className) ? removeClass : addClass)(el, className);

/**
 * 左导点击后的操作
 */
export const renderLeftSider = () => {
    const els = document.querySelectorAll('.nav-page .path-tab');

    [].forEach.call(els, el => {
        removeClass(el, 'active');

        if (location.hash.indexOf(el.getAttribute('data-path')) >= 0) {
            addClass(el, 'active');
        }
    });
};

/**
 * 通过 postMessage 跨 iframe 通讯
 *
 * @param {Object} data  发送的信息数据
 */
export const postMessage = (data, target = top) => {
    target.postMessage(data, '*');
};

/**
 * 调起客服IM聊天
 */
export const chatToKefuIm = () => {
    postMessage(
        {
            isSetIframeParam: true,
            isChatToKefu: true
        },
        window.frames[0]
    );
};
