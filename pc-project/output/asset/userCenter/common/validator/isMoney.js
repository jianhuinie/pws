define('cc/function/decimalLength',['require','exports','module'],function(){'use strict';return function(e){var n=(''+e).split('.');return 2===n.length?n[1].length:0;};}),define('cc/function/toNumber',['require','exports','module'],function(){'use strict';var e={'int':parseInt,'float':parseFloat};return function(n,r,t){if('number'!==$.type(n)){var i=e[t];if(i)n=i(n,10);else if($.isNumeric(n))n=+n;else n=0/0;}return isNaN(n)?r:n;};}),define('userCenter/common/validator/isLessThanDecimalLength_8d4a01dcd0',['require','exports','module','cc/function/decimalLength'],function(require){'use strict';var e=require('cc/function/decimalLength');return function(n,r){return e(n)<r;};}),define('userCenter/common/validator/isMoney',['require','exports','module','./isNumber_5f1a7f7202','./isLessThanDecimalLength_8d4a01dcd0'],function(require){'use strict';var e=require('./isNumber_5f1a7f7202'),n=require('./isLessThanDecimalLength_8d4a01dcd0');return function(r){return e(r)&&n(r,3);};}),define('userCenter/common/validator/isNumber_5f1a7f7202',['require','exports','module','cc/function/toNumber'],function(require){'use strict';var e=require('cc/function/toNumber');return function(n){return null!==e(n,null);};});