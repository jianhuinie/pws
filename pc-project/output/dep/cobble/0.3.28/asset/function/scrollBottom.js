define("cobble/function/scrollBottom",["require","exports","module"],function(){"use strict";return function(o,r){var e=o.prop("scrollHeight"),l=o.innerHeight();if(null!=r)o.prop("scrollTop",e-l-r);else return e-o.prop("scrollTop")-l}});