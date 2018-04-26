define(function (require,exports) {
    'use strict';
    exports.init = function (){
        var container = $('#teachOutline');
        container.on('click', '.viewAll', function() {
            $('.details').find('tr').show();
            $(this).hide();
        });
    }
});