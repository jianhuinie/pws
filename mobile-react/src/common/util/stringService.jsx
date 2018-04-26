export default {

    /**
     * 获取字符数
     * @param {string} str 
     */
    getCharacterLength(str) {
        const lenth = str.length;
        let count = 0;
        for (let i = 0; i < lenth; i++) {
            if (/[^\x00-\xff]/.test(str[i])) { // 中文字符
                count += 2;
            } else {
                count++;
            }
        }
        return count;
    }
};