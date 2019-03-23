/**
 * @file 数值处理
 * @author dafo<huanghoujin@baijiahulian.com>
 */

/**
 * 补零
 *
 * @param {number} number 输入的数字
 * @return {string} 补零为两位的字符
 */
export const addZero = number => {
    if (typeof number !== 'number') {
        number = Number(number);
    }

    if (number < 10) {
        return `0${number}`;
    }

    return String(number);
};


/**
 * 格式化价格
 *
 * @param {number|string} price 单位为分的价格
 * @return {number} 单位转为元后的价格
 */
export const formatPrice = price => ((price * 100 | 0) / 100 / 100);


/**
 * 限时折扣价格展示
 *
 * @param {Object} discount 优惠折扣
 * @param {number|string} originalPrice 原价
 * @param {number} price 价格
 * @param {number} countDownStatus 倒计时状态
 * @return {Object} 经过计算后显示的价格信息
 */
export const priceHander = (discount, originalPrice, price, countDownStatus) => {
    const showPriceObj = {};

    // 没走折扣价判断时return；
    if (countDownStatus === 0) {
        return showPriceObj;
    }

    if (discount) {
        // 有限时折扣区分是预告还是折扣中  1 = 预告； 2 = 折扣中； 3 = 折扣过期；
        switch (countDownStatus) {
            case 1:
                showPriceObj.type = countDownStatus;
                showPriceObj.nowPrice = price;
                showPriceObj.prevPrice = discount.price;
                break;
            case 2:
                showPriceObj.type = countDownStatus;
                showPriceObj.nowPrice = discount.price;
                showPriceObj.prevPrice = price;
                break;
            case 3:
                showPriceObj.type = countDownStatus;
                showPriceObj.nowPrice = price;
                showPriceObj.prevPrice = originalPrice || '';
                break;
            default:
                break;
        }
    }
    else {
        showPriceObj.type = 3;
        showPriceObj.nowPrice = price;
        showPriceObj.prevPrice = originalPrice || '';
    }

    return showPriceObj;
};
