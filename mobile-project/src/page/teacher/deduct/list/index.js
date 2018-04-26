/**
 * Created by wx on 16/02/24.
 */
define(function(require,exports){

    var $ = require("zepto");

    $('#punish').on('click', function () {
        $('.punish-content').toggle();
    });

    $('.punish-content').on('click', function () {
        $(this).hide();
    });

});