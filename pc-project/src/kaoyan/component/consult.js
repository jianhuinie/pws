/**
 * @file 考研--右侧悬浮框
 * @author caoying
 * @date 2016-02-18
 */

define(function(require,exports) {
    var Popup = require('cobble/helper/Popup');
    var lazyImage = require('common/lazyImage');

    var rightConsult = $(".right-consult");

    // 点击在线咨询，弹出提示框
    var qqConsult = function() {
        rightConsult
            .on('click', '.consult-online', function(){

                var qqNumber = $(this).data('number');
                alert({
                    title: '温馨提示',
                    content: '考研相关咨询请联系QQ：' + qqNumber,
                    buttons: [
                        {
                            text: "我知道了",
                            type: 'primary',
                            handler: function () {
                                this.hide();
                            }
                        }
                    ]
                });
            });
    };

    exports.init = function(){
        qqConsult();
    };

});