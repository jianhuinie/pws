/**
 * @file 字符串处理
 * @author dafo<huanghoujin@baijiahulian.com>
 */

/**
 * 替换字符串中所有空格
 *
 * @param {?string=} input 输入的字符
 * @return {string} 替换空格后的字符
 */
export const replaceSpace = input => {
    if (input == null) {
        return '';
    }

    return input.replace(/\s+/g, '');
};
