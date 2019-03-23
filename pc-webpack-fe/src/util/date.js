/**
 * @file 日期相关处理
 * @author dafo<huanghoujin@baijiahulian.com>
 */

/**
 * 返回指定格式的时间字符串 x月x日
 *
 * @param {string|number} dateStr 可用于构建 Date 实例的字符串或数字(时间戳)
 * @return {string} 格式化后的月和日
 */
export const getMdDate = dateStr => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
};

/**
 * 时间格式转换
 * @example 2018-04-08 => 2018.04.08
 *
 * @param {string} time 要置换的日期字符
 * @return {string} 替换 '-' 为 '.' 后的日期字符
 */
export const timeHandler = time =>
    time.slice(0, 10).replace(/-/g, '.');

/**
 * 格式化时间
 * 后端返回格式为2018-04-08 Safari 解析有问题  应改为／
 *
 * @param {string} date 要处理的日期字符
 * @param {string=} [formatter='/'] 分隔字符
 * @return 替换 '-' 为 formatter 指定的字符后的日期
 */
export const formatDate = (date, formatter = '/') => date.replace(/-/g, formatter);
