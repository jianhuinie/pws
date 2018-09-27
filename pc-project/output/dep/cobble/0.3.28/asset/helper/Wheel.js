define("cobble/function/jquerify",["require","exports","module"],function(){"use strict";function e(e){return e.faker||e.element}var t=$.prototype,n={on:function(){return t.on.apply(e(this),arguments),this},off:function(){return t.off.apply(e(this),arguments),this},emit:function(n,o){var i=this,r=e(i);if(r){if(!n[$.expando])n="string"===$.type(n)?$.Event(n):$.Event(null,n);n.cobble=i;var u=[n];if(o)u.push(o);var l=i[$.camelCase("on-"+n.type)];if($.isFunction(l)&&l.apply(i,u)===!1)n.preventDefault();if(!n.isPropagationStopped())t.trigger.apply(r,u);return n}},before:function(t){e(this).before(t)},after:function(t){e(this).after(t)},appendTo:function(t){e(this).appendTo(t)},prependTo:function(t){e(this).prependTo(t)}};return function(e){$.each(n,function(t,n){if(null==e[t])e[t]=n})}}),define("cobble/function/lifeCycle",["require","exports"],function(require,exports){"use strict";exports.init=function(e,t){var n=e.constructor,o="__cobble__"+n.prototype.type,i=t.element;if(i&&i.data(o))e=i.data(o);else if($.extend(e,n.defaultOptions,t),e.init(),i)i.data(o,e);return e},exports.dispose=function(e){var t="__cobble__"+e.constructor.prototype.type,n=e.element;if(n)n.removeData(t)}}),define("cobble/helper/Wheel",["require","exports","module","../function/lifeCycle","../function/jquerify","../util/instance"],function(require){"use strict";function e(e){return t.init(this,e)}var t=require("../function/lifeCycle"),n=require("../function/jquerify"),o=require("../util/instance");e.prototype={constructor:e,type:"Wheel",init:function(){var e=this;e.element.on(r+i,function(t){var n=0,o=t.originalEvent;if("mousewheel"===r)n=-o.wheelDelta/120;else n=o.detail/3;t.type="scroll",e.emit(t,{delta:n})})},dispose:function(){var e=this;t.dispose(e),e.element.off(i),e.element=null}},n(e.prototype),e.defaultOptions={element:o.document};var i=".cobble_helper_wheel",r="onmousewheel"in o.body[0]?"mousewheel":"DOMMouseScroll";return e}),define("cobble/util/instance",["require","exports","module"],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body)});