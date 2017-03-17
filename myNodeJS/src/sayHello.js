define(function(require, exports) {
    var divide = require('cc/function/divide');
    exports.init = function () {
        console.log('require js loaded');
        $(document).ready(function () {
            console.log('document ready');
        });
        var number = divide(9, 3);
        console.log(number);
    };

});