define("cc/function/autoScrollDown",["require","exports","module"],function(){"use strict";return function(o,e){var r=o.height(),t=o.scrollTop(),c=t+r,i=e.prop("offsetTop")+e.outerHeight(!0);if(t>i||i>c)o.scrollTop(i-r)}});