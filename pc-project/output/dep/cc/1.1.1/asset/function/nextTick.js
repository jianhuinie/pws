define("cc/function/nextTick",["require","exports","module"],function(){"use strict";return function(e){var t=setTimeout(e,0);return function(){clearTimeout(t)}}});