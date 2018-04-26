/**
 * 验证器通用规则
 * @author zengcheng
 */
define(function (require, exports) {

    exports.max = function (maxVal) {
        return +this.value <= +maxVal;
    },
    exports.min = function (minVal) {
        return +this.value >= +minVal;
    },
    exports.maxLen = function (maxLen) {
        return (this.value + '').length <= +maxLen;
    },
    exports.minLen = function (minLen) {
        return (this.value + '').length >= +minLen;
    },
    exports.required = function (isRequired) {
        var val = this.value + '';
        if (isRequired === 'false') {
            if (!val) {
                return {
                    force: true
                }
            } else {
                return true;
            }
        } else {
            return val.length > 0;
        }
    },
    exports.number = function (isNumber) {
        return (!/^\d+$/g.test(this.value)) ^ (isNumber === 'true');
    },
    exports.isCnNewID = function() {
        var cid = this.value + '';
        var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
        var arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
        if (/^\d{17}\d|x$/i.test(cid)) {
            var sum = 0, idx;
            for (var i = 0; i < cid.length - 1; i++) {
                // 对前17位数字与权值乘积求和
                sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
            }
            // 计算模（固定算法）
            idx = sum % 11;
            // 检验第18为是否与校验码相等
            return arrValid[idx] == cid.substr(17, 1).toUpperCase();
        }
        else {
            return false;
        }
    }
});