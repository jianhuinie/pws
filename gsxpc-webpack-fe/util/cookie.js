/**
 * @file Cookie 解释
 * @author dafo<huanghoujin@baijiahulian.com>
 */

/**
 * 解释 cookie
 *
 * @param {string=} [cookie=document.cookie]
 * @return {Object} 解释后的 Cookie Map
 */
export const parseCookie = (cookie = document.cookie) =>
    cookie.split(';').reduce((result, item) => {
        const [key, value] = item.split('=');
        result[key.trim()] = value;

        return result;
    }, {});
