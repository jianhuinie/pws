/**
 * author huangshiming
 * 评价控件
 *    - 初始化评价总的信息
 */

define(function (require, exports) {
    var $ = require('zepto');
    var template = require('artTemplate');
    var render = template.compile(require('text!./addition.tpl'));
    var service = require('common/service');
    var initStars = require('common/comment/initStars');
    
    /**
     * 功能: 
     *  -ajax函数，控制着获取评论信息的接口
     *  @param {Object} params
     *  @property {String} params.key 评价类型
     *  @property {String} params.value 课程/老师/订单number
     *  @param {Function} Func 回调函数，接口数据回来后执行的函数
     */
    function AjaxService (params, Func) {
        service.get('/comment/summary', 
            params, 
            function (response) {
                Func(response);
        });
    }

     /**
     * 评价信息的构造函数
     * @param {Object} pageData 所需要的数据
     */
    function Addition (pageData) {
        this.dom = pageData.dom;
        this.key = pageData.key;
        this.value = pageData.value;
    }

     /**
     * 功能：
     *  - 初始化dom
     * @param {Object} responese ajax获取到的评论数据
     */
    Addition.prototype.initDom = function (response) {
        if (+response.code === 0) {
            var html = render({
                commentSummary: response.data.comment_summary,
            });

            this.dom.html(html);
            initStars.initStars(this.dom.find('.infos .stars-lines'));
            this.initLines(this.dom.find('.total-lines .item'));
        }
    };

     /**
     * 功能：
     *  - 初始化评价条
     * @param {Dom} dom 进度条的dom
     */
    Addition.prototype.initLines = function (dom) {
        var that = this;
        dom.each(function () {
            var there = $(this);
            var line = there.find('.line .line-orange');
            var rateNumber = there.find('.rate');
            var rate = line.attr('data-rate');
            line.css('width', (rate * 100).toFixed(2) + '%');
            rateNumber.html((rate * 100).toFixed(2) + '%');
        });
    };

    exports.init = function (pageData) {
        var commentAddition = new Addition(pageData);
        AjaxService({
            key: pageData.key,
            value: pageData.value
        }, commentAddition.initDom.bind(commentAddition));
    };
});