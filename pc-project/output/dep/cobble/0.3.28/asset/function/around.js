define("cobble/function/around",["require","exports","module"],function(){"use strict";return function(i,n,t,r){var e="string"===$.type(n),u=e?i[n]:i;if(!e)r=t,t=n;var f=function(){var i,n=arguments;if($.isFunction(t))i=t.apply(this,n);if(i!==!1){if($.isFunction(u))i=u.apply(this,n);if($.isFunction(r)){var e=r.apply(this,n);if("undefined"!==$.type(e))i=e}return i}};return e?i[n]=f:f}});