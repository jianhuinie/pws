define("cc/function/isActiveElement",["require","exports","module"],function(){"use strict";return function(e){if(e.jquery)e=e[0];return document.activeElement===e}});