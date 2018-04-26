/**
 * @file 图片压缩
 * @author zhujialu
 */
define(function () {

    function compressPhoto(extName, width, height, rawWidth, rawHeight) {

        var factor = 0.05;

        if ((rawWidth / rawHeight) / (height / width) > 1 + 2 * factor) {

            return '@1e_'
                 + width
                 + 'w_1c_0i_1o_50Q_1x.'
                 + extName
                 + '%7C0-'
                 + factor * width * rawHeight / rawWidth
                 + '-'
                 + width
                 + '-'
                 + height
                 + 'a.'
                 + extName.toLowerCase();

        }
        else {

            return compressImage(extName, width, height);

        }

    }

    function compressImage(extName, width, height, noCrop, quality) {

        quality = quality || 70;

        return '@'
             + (noCrop ? 0 : 1)
             + 'e_'
             + width
             + 'w_'
             + height
             + 'h_1c_0i_1o_' + quality + 'Q_1x.'
             + extName.toLowerCase();
    }

    /**
     * 压缩图片
     *
     * @param {Object} options
     * @property {string} options.url 原始图片地址
     * @property {number} options.width 显示宽度
     * @property {number} options.height 显示高度
     * @property {number=} options.rawWidth 原图宽度
     * @property {number=} options.rawHeight 原图高度
     * @property {boolean} options.noCrop 是否不裁剪
     * @property {string|number} option.quality 质量度，默认70
     * @return {string} 压缩后的图片地址
     */
    return function (options) {

        var url = options.url;

        var extName = url.split('.').pop();
        if (extName === 'gif') {
            extName = 'jpg';
        }

        var width = options.width;
        var height = options.height;
        var rawWidth = options.rawWidth;
        var rawHeight = options.rawHeight;

        width = Math.floor(width);
        height = Math.floor(height);

        if (rawWidth != null && rawHeight != null) {

            rawWidth = Math.floor(rawWidth);
            rawHeight = Math.floor(rawHeight);

            return url + compressPhoto(extName, width, height, rawWidth, rawHeight);
        }
        else {
            return url + compressImage(extName, width, height, options.noCrop, options.quality);
        }
    };

});
