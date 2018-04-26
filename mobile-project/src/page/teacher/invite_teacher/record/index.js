/**
 * Created by nanci on 16/10/24.
 */
define(function(require,exports){

    'use strict';

    var lazyLoadImage = require('common/lazyLoadImage');

    return function () {
        lazyLoadImage.init();
    }

});