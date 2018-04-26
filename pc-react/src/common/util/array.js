/**
 * 数组操作
 * @date 2017/12/20
 */
const array = {};

/**
 * 将函数参数对象或节点列表转换成数组。
 * @param {Object} likeArr 类数组对象，函数参数对象或节点列表.
 * @param {?Number} start 数组开始元素是从零开始计算的下标。
 * @param {?Number} end 数组结束元素是从零开始计算的下标.
 */
array.argsToArray = function (likeArr, start, end) {
    // 类数组对象必须有length属性
    if (likeArr.length === undefined) {
        return;
    }
    return [].slice.call(likeArr, start || 0, end || likeArr.length);
};

export default array;