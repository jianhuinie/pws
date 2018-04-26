import config from './config.js';

function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n
}
const util = {
	formatTime: function (date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hour = date.getHours();
		const minute = date.getMinutes();
		const second = date.getSeconds();
		return [year, month, day].map( formatNumber ).join('/') + ' ' + [hour, minute, second].map( formatNumber ).join(':');
	},
	sendHabo: function (data) {
		debugger;
		wx.request({
            url: config.PATHS.HABO,
            method: 'GET',
            data: data,
            fail: function (err) {
                wx.showModal({
                    title: '提示',
                    content: err,
                });
            }
        });
	},
	/**
	 * 全角转半角
	 */
	toSBC: function (target) {
        var result = '';
        var len = target.length;
        for (var i = 0; i < len; i++) {
            var cCode = target.charCodeAt(i);
            // 全角与半角相差（除空格外）：65248（十进制）
            cCode = (cCode >= 0xFF01 && cCode <= 0xFF5E) ? (cCode - 65248) : cCode;
            // 处理空格
            // cCode = (cCode === 0x03000) ? 0x0020 : cCode;
            // cCode = (cCode === 0x0020) ? '' : cCode;
            result += String.fromCharCode(cCode);
        }
        return result;
	}
};

export default util;