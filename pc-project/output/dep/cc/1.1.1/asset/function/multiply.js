define("cc/function/decimalLength",["require","exports","module"],function(){"use strict";return function(e){var t=(""+e).split(".");return 2===t.length?t[1].length:0}}),define("cc/function/float2Int",["require","exports","module"],function(){"use strict";return function(e,t){var n,r=(""+e).split(".");if(t>=0);else t=0;if(1===r.length)n=e+new Array(t+1).join("0");else t=Math.max(0,t-r[1].length),n=r.join("")+new Array(t+1).join("0");return+n}}),define("cc/function/multiply",["require","exports","module","./decimalLength","./float2Int"],function(require){"use strict";var e=require("./decimalLength"),t=require("./float2Int");return function(n,r){var i=Math.max(e(n),e(r));n=t(n,i),r=t(r,i);var u=Math.pow(10,i);return n*r/(u*u)}});