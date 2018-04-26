define(function (require, exports) {
    var $ = require('zepto');
    var IScroll = require('iscroll');

    var createIScroll = function (options) {
        var myScroll = new IScroll('#wrapper', { probeType: 2, interactiveScrollbars: true, startY: 0, click: true });
        var update = false;
        var pullToRefresh = $('.pull-to-refresh .pull-text');
        var pullIndicator = $('.pull-to-refresh .pull-indicator');
        var pullSpinner = $('.pull-to-refresh .pull-spinner');
        var pullRefresh = $('.pull-to-refresh');

        /*滑动的时候*/
        myScroll.on('scroll', function() {
            pullRefresh.css('display', 'inline-block');
            //boxList.css('margin-top', '0px');
            if (this.y > 10 && update === false) {
                update = true;
                pullToRefresh.html('释放更新');
                pullIndicator.addClass('arrow-rotate-180');
            }

            /*当手指划出屏幕的时候会有没反应，所以滑到最下时就应该自动弹回去*/
            if (update === true) {
                if(window.innerHeight - this.pointY < 1) {
                    myScroll.scrollTo(0, 0 - (+options.height), 300);
                }
            }
        });

        /*手指松开的时候*/
        myScroll.on('scrollEnd', function() {
            //下拉刷新
            if (this.y > -70) {
                if (update === false && this.y <= 0) {
                    myScroll.scrollTo(0, 0 - (+options.height), 600);
                } else {
                    pullIndicator.css('display', 'none');
                    pullToRefresh.css('display', 'none');
                    pullSpinner.css('display', 'block');
                    update = false;
                    myScroll.scrollTo(0, 0 - (+options.height), 600);
                    pullToRefresh.html('下拉刷新');
                    pullIndicator.removeClass('arrow-rotate-180');
                    pullSpinner.css('display', 'none');
                    pullIndicator.css('display', 'inline-block');
                    pullToRefresh.css('display', 'inline-block');
                }
            }
            myScroll.refresh();
        });

        return myScrolll;
    };



    exports.refresh = function (options) {
        return createIScroll(options);
    };
});