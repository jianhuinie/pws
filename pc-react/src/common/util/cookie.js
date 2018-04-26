/**
 * cookie
 */
const HOUR_TIME = 60 * 60 * 1000;

function getCookie(name) {
    const regex = new RegExp(name + '=([^;]+)(?:;|$)');
    const match = document.cookie.match(regex);
    return match ? decodeURIComponent(match[1]) : '';
}

/**
 * 设置 cookie
 *
 * @inner
 * @param {string} name
 * @param {string} value
 * @param {Object=} options
 */
function setCookie(name, value, options = {}) {
    let expires = options.expires;
    
    if (!isNaN(expires)) {
        const hours = expires;
        expires = new Date();
        expires.setTime(expires.getTime() + hours * HOUR_TIME);
    }

    let path = options.path;
    if (path == null) {
        // 保证网站全局可用
        path = '/';
    }

    const domain = options.domain;
    document.cookie = [
        encodeURIComponent(name), '=', encodeURIComponent(value),
        expires ? ';expires=' + expires.toUTCString() : '',
        ';path=' + path,
        domain ? ';domain=' + domain : '',
        options.secure ? ';secure' : ''
    ].join('');
}

function remove(key, options) {
    if (key == null) {
        return;
    }

    options = options || {};
    options.expires = -1;

    setCookie(
        key,
        '',
        options
    );
}

exports.set = setCookie;
exports.get = getCookie;
exports.remove = remove;

export default {
    set: setCookie,
    get: getCookie,
    remove: remove
};