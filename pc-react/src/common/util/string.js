/**
 * 字符串.
 */
const string = {};

/**
 * 把字符串的首字母编程大写
 * */
string.initcap = (function () {
    const cache = {};
    return function (str) {
        return cache[str] || (cache[str] = str.substr(0, 1).toUpperCase() + str.substr(1));
    };
})();

string.trim = function (str) {
    return str == null ? '' : String.prototype.trim.call(str);
};
/**
 * 编码html特殊字符
 */
string.encodeHTML = (function () {
    const tempDom = document.createElement('div');
    return function (txt) {
        const t = document.createTextNode(txt);
        const res = tempDom.appendChild(t).parentNode.innerHTML;
        tempDom.innerHTML = '';
        return res;
    };
})();

/**
 * 对字符串进行 HTML 解码
 *
 * @param {string} source 字符串
 * @return {string}
 */
string.decodeHTML = function (source) {
    const str = String(source)
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

    // 处理转义的中文和实体字符
    return str.replace(
        /&#([\d]+);/g,
        function ($0, $1) {
            return String.fromCharCode(parseInt($1, 10));
        }
    );
};

/**
 * 给指定长度字符串中间加入padString
 * @params {string} target 要处理字符串，默认
 * @params {number} targetLength 字符串总长度
 * @params {string} padString 开始字符串
 * @return {string} 处理后的字符串
 */
string.padStart = function (target, targetLength, padString) {
    target = target === undefined ? '' : target;
    padString = padString === undefined ? ' ' : padString;
    if (target.length >= targetLength) {
        return target;
    }
    const padLen = [];
    padLen.length = targetLength - target.length + 1;
    return padLen.join(padString) + target;
};

export default string;