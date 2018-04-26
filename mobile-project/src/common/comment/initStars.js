/**
 * author huangshiming
 * 评价控件
 *    - 初始化评价星星的
 */
define(function (require, exports) {
    var $ = require('zepto');

    /**
     * @param {Dom} dom 存在星星的dom
     * 该dom必须要有data-scores属性，值为该条评论的分数
     */    
    exports.initStars = function (dom) {
        var number = dom.attr('data-scores');
        var num = parseInt(number);
        var starsHtml = '';
        for (var i = 1; i <= num; i++) {
            starsHtml +='<i class="icon icon-star_all active-star"></i>';
        }


        var mius = +number - num;
        if (mius > 0.5) {
            starsHtml += '<i class="icon icon-star_all active-star"></i>';
        } else if ((+number - num) > 0 && (+number - num) <= 0.5) {
            starsHtml = starsHtml 
                        +   '<span class="star-icon">'
                        +       '<i class="icon icon-star_all grey-star"></i>'
                        +       '<i class="icon icon-star_half active-star"></i>'
                        +   '</span>';
        }

        for(var j = 0; j < 5 - Math.ceil(number); j++) {
            starsHtml = starsHtml
                        + '<i class="icon icon-star_all grey-star"></i>';
        }

        dom.html(starsHtml);
    };
});