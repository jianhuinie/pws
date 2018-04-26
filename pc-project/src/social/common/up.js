/**
 * 点赞特效
 */
define(function() {


    /**
     * 点赞加1的动画
     * @param {object} options 参数配置
     * @property {jQuery=} options.container 容器,默认为document
     * @property {selector} options.selector 点赞动作的选择器,默认'.up-btn'
     * @property {string} options.upedSelector 已经点赞的选择器
     * @property {string} options.tpl 动画作用的元素
     */
    function Up(options) {
        var me = this;
        $.extend(this, {
            container: $(document),
            selector: '.up-btn',
            upedSelector: 'uped',
            tpl: '<b style="position:absolute;left:50%;margin-left:-10px;z-index:1;">+1</b>'
        }, options);
        me.init();
    }

    Up.prototype.init = function () {

        var me = this;

        me.container.on('click', me.selector, function () {

            var target = $(this);
            var ele = $(me.tpl);
            var status = 0;
            if (target.hasClass(me.upedSelector)) {
                status = 1;
                ele.text('-1');
            }
            target.css('position', 'relative');
            target.append(ele);
            ele.animate({
                top: '-38px',
                opacity: 0
            }, 800, function (){
                target.css('position', '');
                ele.remove();
            });
        });
    };

    Up.prototype.updateStatus = function (target) {
        var me = this;
        if (target.hasClass(me.upedSelector)) {
            target.removeClass(me.upedSelector);
        } else {
            target.addClass(me.upedSelector);
        }
    };

    return Up;
});