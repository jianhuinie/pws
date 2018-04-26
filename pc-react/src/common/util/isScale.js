/**
 * 判断页面是否被缩放，用于js中
 * huangshiming
 */
export default function () {
    const viewPort = document.getElementById('viewport');
    const ratio = +viewPort.attributes.ratio.nodeValue;
    return (ratio && ratio < 1) ? 1 : 0;
};