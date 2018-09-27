define("cobble/function/jquerify",["require","exports","module"],function(){"use strict";function e(e){return e.faker||e.element}var t=$.prototype,i={on:function(){return t.on.apply(e(this),arguments),this},off:function(){return t.off.apply(e(this),arguments),this},emit:function(i,n){var o=this,r=e(o);if(r){if(!i[$.expando])i="string"===$.type(i)?$.Event(i):$.Event(null,i);i.cobble=o;var f=[i];if(n)f.push(n);var u=o[$.camelCase("on-"+i.type)];if($.isFunction(u)&&u.apply(o,f)===!1)i.preventDefault();if(!i.isPropagationStopped())t.trigger.apply(r,f);return i}},before:function(t){e(this).before(t)},after:function(t){e(this).after(t)},appendTo:function(t){e(this).appendTo(t)},prependTo:function(t){e(this).prependTo(t)}};return function(e){$.each(i,function(t,i){if(null==e[t])e[t]=i})}}),define("cobble/function/lifeCycle",["require","exports"],function(require,exports){"use strict";exports.init=function(e,t){var i=e.constructor,n="__cobble__"+i.prototype.type,o=t.element;if(o&&o.data(n))e=o.data(n);else if($.extend(e,i.defaultOptions,t),e.init(),o)o.data(n,e);return e},exports.dispose=function(e){var t="__cobble__"+e.constructor.prototype.type,i=e.element;if(i)i.removeData(t)}}),define("cobble/function/toNumber",["require","exports","module"],function(){"use strict";var e={"int":parseInt,"float":parseFloat};return function(t,i,n){if("number"!==$.type(t)){var o=e[n];if(t=o?o(t,10):+t,isNaN(t))t=i}return t}}),define("cobble/helper/Switchable",["require","exports","module","../function/jquerify","../function/lifeCycle","../function/toNumber"],function(require){"use strict";function e(e){return i.init(this,e)}var t=require("../function/jquerify"),i=require("../function/lifeCycle"),n=require("../function/toNumber");e.prototype={constructor:e,type:"Switchable",init:function(){var e=this,t=e.element,i=e.selector,f=e.items=t.find(i),u=n(e.index,r),c=e.activeClass;if(u===r&&c)u=f.index(t.find("."+c));if(i){var s=e.trigger;if("click"===s)t.on("click"+o,i,function(){e.to(f.index(this))});else if("over"===s)t.on("mouseenter"+o,i,function(){var t=this;e.timer=setTimeout(function(){if(e.element)e.to(f.index(t))},150)}),t.on("mouseleave"+o,i,function(){if(e.timer)clearTimeout(e.timer),e.timer=null})}if(e.index=r,u>=0)e.to(u)},to:function(e){var t=this;e=n(e,r);var i=t.index;if(e!==i){var o=t.activeClass,f=t.items;if(o){if(i>=0)f.eq(i).removeClass(o);if(e>=0)f.eq(e).addClass(o)}t.index=e,t.change({from:i,to:e})}},dispose:function(){var e=this;i.dispose(e),e.element.off(o),e.element=e.items=null}},t(e.prototype),e.defaultOptions={index:0,trigger:"click"};var o=".cobble_helper_switchable",r=-1;return e});