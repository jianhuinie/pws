/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    var share = require("../_part/pageShare/init");
    var pageInit = require("../_part/common");

    return function(){

        share.init();

        pageInit.init();
    }
});