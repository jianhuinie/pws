/**
 * 正则表达式
 */
const parseUrl = url => {
    const urlObj = {};
    const reg = /([^?|&]+)=([^&]+)/g;
    // const reg = /[?|&]([^?|&]+)=([^&]+)/g;
    while ((result = reg.exec(url)) !== null) {
        console.log(result);
        urlObj[result[1]] = result[2];
    }
    console.log(urlObj);
}
parseUrl('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions?name=niejianhui&age=25&bobby=basketball&sex=male&weight=55');