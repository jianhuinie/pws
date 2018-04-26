/**
 *
 * @file 活动主场的旋转模块
 * @author zengcheng
 *
 */
define(function (require, exports) {

    var store = require('common/store');

    var ANIMATE_STYLE = [
        {
            'width': '204px',
            'height': '284px',
            'left': '48px',
            'top': '68px',
            'font-size': '17px',
            'z-index': 40
        },
        {
            'width': '246px',
            'height': '348px',
            'left': '200px',
            'top': '30px',
            'font-size': '20px',
            'z-index': 70
        },
        {
            'width': '295px',
            'height': '420px',
            'left': '384px',
            'top': '0px',
            'font-size': '24px',
            'z-index': 100,
        },
        {
            'width': '246px',
            'height': '348px',
            'left': '616px',
            'top': '30px',
            'font-size': '20px',
            'z-index': 70
        },
        {
            'width': '204px',
            'height': '284px',
            'left': '810px',
            'top': '68px',
            'font-size': '17px',
            'z-index': 40
        }
    ];

    /**
     * 旋转构造函数
     * @param {object} options 必选的选项
     * @property {jQuery} options.element 绑定的元素
     */
    function Round(options) {
        if (!options || !options.element) {
            return null;
        }

        //绑定参数
        this.options = $.extend({}, options);

        //初始化组件
        this.init();
    }

    function rotate(step) {
        if (this.rotating) {
            return false;
        }
        //处理
        var roundItems = this.roundItems;
        var len = roundItems.length;
        var me = this;

        //设置为旋转中
        me.rotating = true;

        //旋转函数
        if (me.clockwise) {
            while(step--){
                roundItems.push(roundItems.shift());
            }
        } else {
            while(step--){
                roundItems.unshift(roundItems.pop());
            }
        }

        //开始旋转
        for (var i = 0; i < len; i++) {
            //roundItems[i].animate(ANIMATE_STYLE[i], 5000, (function (i) {
            animate(roundItems[i], ANIMATE_STYLE[i], 600, (function (i) {
                return function(){
                    var current = roundItems[i];
                    if (i == 2) {
                        current.removeClass('disabled');
                    } else {
                        current.addClass('disabled');
                    }
                    current.data('index', i);

                    if(i === len - 1){
                        me.rotating = false;
                    }
                }
            })(i));
        }
    }

    //动画函数
    function animate(ele, lastStyle, duration, cb) {
        var currentStyle = ele[0].style;
        var cachedStartStyle = {}, cachedStepStyle = {};
        var step = 60;
        var times = Math.ceil(duration / step);
        var time = 1;

        //获取当前的样式
        var getCurrentStyle = function (time) {
            var newStyle = {};
            var start;
            for (var key in lastStyle) {
                start = cachedStartStyle[key];
                end = parseInt(lastStyle[key]);
                if (time < times) {
                    newStyle[key] = (start + (cachedStepStyle[key] * time)) + (key === 'z-index' ? '' : 'px');
                }
                else {
                    newStyle[key] = end + (key === 'z-index' ? '' : 'px');
                }
            }
            return newStyle;
        };

        //元素移动函数
        var move = function (time) {
            var style = getCurrentStyle(time);
            ele.css(style);
        };

        //执行动画
        var onece = function () {
            setTimeout(function(){
                if (time <= times) {
                    move(time++);
                    onece();
                }
                else {
                    cb && cb()
                }
            }, step);
        };

        //初始化开始样式
        for (var key in lastStyle) {
            cachedStartStyle[key] = parseInt(currentStyle[key]);
            cachedStepStyle[key] = (parseInt(lastStyle[key]) - cachedStartStyle[key]) / times;
        }

        onece();
    }

    /**
     * 绑定事件处理
     */
    function bindEvents() {
        var me = this;
        this.options.element.find('.round-prev')
            .on('click', '.icon', function () {
                //设置顺时针旋转
                me.clockwise = true;
                //旋转一个区域
                me.rotate(1);

                return false;
            });

        this.options.element.find('.round-next')
            .on('click', '.icon', function () {
                //设置逆时针旋转
                me.clockwise = false;
                //旋转一个区域
                me.rotate(1);

                return false;
            });

        this.options.element
            .on('click', '.round-item', function () {
                var that = $(this);
                var key = $(this).data('key');
                var source = {
                    'dxzc': 'gsx_daxue_pc',
                    'xcgzc': 'gsx_zhongxiao_pc',
                    'bpsjb': 'gsx_baopin_pc',
                    'lxzc': 'gsx_chuguo_pc',
                    'ysxqzc': 'gsx_yishu_pc'
                };
                if (that.hasClass('disabled')) {
                    var dis = that.data('index') - 2;
                    me.clockwise = (dis > 0);
                    me.rotate(Math.abs(dis));
                } else {
                    window.open( 'http://www.genshuixue.com/track/source?id=' + source[key] + '&url=' + encodeURIComponent(me.host + 'subject=' + key), '_blank');
                }
                return false;
            })
    }

    /**
     * 初始化组件
     * @inner
     */
    function init() {
        var me = this;
        var currentClass = ['first', 'second', 'third', 'four', 'five'];

        //当前旋转方向：顺时针
        this.clockwise = false;
        //当前旋转状态
        this.rotating = false;

        //存储当前的旋转顺序索引
        var roundItems =
            this.roundItems = [];
        $.each($(this.options.element.find('.round-item')),
                function (i, item) {
                    roundItems.push($(item).css(ANIMATE_STYLE[i]).removeClass(currentClass[i]));
                }
            );

        //绑定事件处理
        this.bindEvents();
    }

    function bindHost(host) {
        this.host = host || '';
    }

    Round.prototype = {

        constructor: Round,

        init: init,

        bindEvents: bindEvents,

        rotate: rotate,

        bindHost: bindHost

    };

    return Round;
});