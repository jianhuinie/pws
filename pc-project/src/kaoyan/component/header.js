/**
 * @file 考研--头部
 * @author caoying
 * @date 2016-02-18
 */

define(function(require,exports) {
    var Popup = require('cobble/helper/Popup');
    var lazyImage = require('common/lazyImage');

    var header = $("#header");

    // 考研客户端二维码选择事件
    var qrCodeChange = function() {
        var switchItem = header.find('.qrCode-switch');
        var activeCode;

        header
            .on('click', '.qrCode-switch', function() {
                var code = $(this).data('code');
                $(this).siblings('.qrCode-switch').removeClass('active');
                if(code != "iphone") {
                    $(this).addClass('active');
                    activeCode = $(this).data('code');
                }

            });

        switchItem.mouseover(function(){
            $(this).addClass('active');
            switchItem.removeClass('active');
        });
        switchItem.mouseout(function(){
            $(this).removeClass('active');
            if(activeCode) {
                $("#header .qrCode-switch[data-code='"+ activeCode+"']").addClass('active');
            }
        })
    };

    // 头部tab点击事件
    var tabClick = function() {
        var subItem = header.find(".subject-item");
        subItem
            .on('click','.item', function(){
                var url = "";
                if($(this).data('href')) {
                    url = $(this).data('href');
                }
                if(url) {
                    window.open(url,'');
                }
            });
    };

    exports.init = function(){

        qrCodeChange();
        tabClick();
        var itemPopup;
        var options = {
            show: {
                trigger: 'over',
                delay: 200,
                animation: function () {
                    this.layer.slideDown(150);
                }
            },
            hide: {
                trigger: 'out',
                delay: 200,
                animation: function () {
                    this.layer.slideUp(150);
                }
            }
        };


        var items = $('.subject-item');
        items.each(function(){
            itemPopup = new Popup($.extend(
                {
                    element: $(this),
                    layer: $(this).find('.menu')
                },
                options
            ));
        });

        $('.subject-item').hover(function(){
            itemPopup.show;
        });

    };

});