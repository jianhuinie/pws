define("cobble/function/imageDimension",["require","exports","module"],function(){"use strict";var e=[];return function(t,n){var i=new Image,o=e.push(i);i.onload=function(){var t=i.height;if(null!=t&&t>0)n(i.width,t),delete e[o-1],i=null;else setTimeout(i.onload,10)},i.src=t}}),define("cobble/function/jquerify",["require","exports","module"],function(){"use strict";function e(e){return e.faker||e.element}var t=$.prototype,n={on:function(){return t.on.apply(e(this),arguments),this},off:function(){return t.off.apply(e(this),arguments),this},emit:function(n,i){var o=this,r=e(o);if(r){if(!n[$.expando])n="string"===$.type(n)?$.Event(n):$.Event(null,n);n.cobble=o;var u=[n];if(i)u.push(i);var f=o[$.camelCase("on-"+n.type)];if($.isFunction(f)&&f.apply(o,u)===!1)n.preventDefault();if(!n.isPropagationStopped())t.trigger.apply(r,u);return n}},before:function(t){e(this).before(t)},after:function(t){e(this).after(t)},appendTo:function(t){e(this).appendTo(t)},prependTo:function(t){e(this).prependTo(t)}};return function(e){$.each(n,function(t,n){if(null==e[t])e[t]=n})}}),define("cobble/function/lifeCycle",["require","exports"],function(require,exports){"use strict";exports.init=function(e,t){var n=e.constructor,i="__cobble__"+n.prototype.type,o=t.element;if(o&&o.data(i))e=o.data(i);else if($.extend(e,n.defaultOptions,t),e.init(),o)o.data(i,e);return e},exports.dispose=function(e){var t="__cobble__"+e.constructor.prototype.type,n=e.element;if(n)n.removeData(t)}}),define("cobble/function/offsetParent",["require","exports","module"],function(){"use strict";function e(e){return e.is("body")||"static"!==e.css("position")}return function(t){if(t.is("body"))return t;for(var n=t.parent();!e(n);)n=n.parent();return n}}),define("cobble/ui/Zoom",["require","exports","module","../function/jquerify","../function/lifeCycle","../function/offsetParent","../function/imageDimension","../util/instance"],function(require){"use strict";function e(e){return n.init(this,e)}var t=require("../function/jquerify"),n=require("../function/lifeCycle"),i=require("../function/offsetParent"),o=require("../function/imageDimension"),r=require("../util/instance");e.prototype={constructor:e,type:"Zoom",init:function(){var e=this,t=e.element;if(t.is(":hidden"))throw new Error("Zoom element must be visible!");var n=t.width(),f=t.height(),c=e.viewport,s=e.finder,a=s.outerWidth(!0),p=s.outerHeight(!0);s.hide(),c.hide();var l=e.url;o(l,function(e,o){var d=n/e,m=f/o,h=a/d,b=p/m;c.css({width:h,height:b,background:"url("+l+") no-repeat"});var v=t.offset(),y={left:0,top:0},g=v.left,w=v.top,$=g+n,x=w+f,_=i(t);if(_.is("body"))v=y;var q=i(s),T=v;if(_[0]!==q[0]){if(!q.is("body"))s.appendTo("body");T=y}var D="mouseenter"+u,C="mousemove"+u;t.on(D,function(){s.show(),c.show(),r.document.on(C,function(t){var n=t.pageX,i=t.pageY;if(g>n||n>$||w>i||i>x)return s.hide(),c.hide(),void r.document.off(C);if(n-=.5*a,i-=.5*p,g>n)n=g;else if(n>$-a)n=$-a;if(w>i)i=w;else if(i>x-p)i=x-p;if(s.css({left:n-T.left,top:i-T.top}),n=(n-v.left)/d,i=(i-v.top)/m,n>e-h)n=e-h;if(i>o-b)i=o-b;c.css({"background-position":"-"+n+"px -"+i+"px"})})})})},dispose:function(){var e=this;n.dispose(e),r.document.off(u),e.element.off(u),e.element=e.finder=e.viewport=null}},t(e.prototype),e.defaultOptions={};var u=".cobble_ui_zoom";return e}),define("cobble/util/instance",["require","exports","module"],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body)});