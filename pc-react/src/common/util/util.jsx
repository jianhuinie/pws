/**
 * 公共方法
 * @file leon
 * @date 2017/11/16
 */


const util = {
    /**
     * underscore的findeWhere方法
     * */
    findWhereNew: (arr, attribute, val) => {
        let i = 0;
        const len = arr.length;

        for (i = 0; i < len; i++) {
            if (arr[i][attribute] === val) {
                return arr[i];
            }
        }
        return null;
    },

    /**
     * 获取对象数组的某个属性为特定值的索引值
     * */
    getIndexForVal: (arr, attribute, val) => {
        let i = 0;
        const len = arr.length;

        for (i = 0; i < len; i++) {
            if (arr[i][attribute] === val) {
                return i;
            }
        }
        return -1;
    },
    
    /**
     * 左导点击后的操作
     * */
    renderLeftSider: () => {
        const eleArr = $('.nav-page .path-tab');
        $.map(eleArr, function (item) {
            const ele = $(item);
            ele.removeClass('active');
            if (location.hash.indexOf(ele.data('path')) >= 0) {
                ele.addClass('active');
            }
        });
    },

    /**
     * 替换字符串中所有空格
     */
    replaceSpace: (str) => {
        if (str === null || str === undefined) {
            return '';
        }
        return str.replace(/\s/g, '');
    },
};

export default util;