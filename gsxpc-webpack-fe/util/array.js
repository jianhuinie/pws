/**
 * @file 数组处理
 * @author dafo<huanghoujin@baijiahulian.com>
 */
/**
 * underscore 的 findeWhere 方法
 *
 * @param {Array} target 查找的目标数组
 * @param {string} attribute 要比较的属性名
 * @param {*} value 比较的的属性值
 * @param {?Object} 匹配的数组元素
 */
export const findWhere = (target, attribute, value) => target.filter(item => item[attribute] === value)[0];

/**
 * 获取对象数组的某个属性为特定值的索引值
 *
 * @param {Object[]} target 要查找的目标数组
 * @param {string} attribute 要比较的属性名
 * @param {*} value 比较的的属性值
 * @return {number} 有匹配返回对应的索引值，否则返回 -1
 */
export const getIndexForVal = (target, attribute, value) => {
    const len = target.length;

    for (let i = 0; i < len; i++) {
        if (target[i][attribute] === value) {
            return i;
        }
    }

    return -1;
};


/**
 * 获取更多数据，
 * isClear 为 true 返回 newList,
 * isClear 为 false 拼接 oldList, newList
 *
 * @param {Array} oldList 旧列表
 * @param {Array} newList 新列表
 * @param {boolean} isClear 是否清晰的?
 * @return {Array} 返回的列表
 */
export const contactMoreDataList = (oldList, newList, isClear) => {
    if (isClear) {
        return newList || [];
    }

    if (!oldList || !newList) {
        return oldList || newList || [];
    }

    return oldList.concat(newList);
};
