define('cobble/function/around',['require','exports','module'],function(){'use strict';return function(e,t,n,i){var o='string'===$.type(t),r=o?e[t]:e;if(!o)i=n,n=t;var u=function(){var e,t=arguments;if($.isFunction(n))e=n.apply(this,t);if(e!==!1){if($.isFunction(r))e=r.apply(this,t);if($.isFunction(i)){var o=i.apply(this,t);if('undefined'!==$.type(o))e=o;}return e;}};return o?e[t]=u:u;};}),define('cobble/function/call',['require','exports','module'],function(){'use strict';return function(e,t,n){if($.isFunction(e)){var i=$.isArray(n)?'apply':'call';return e[i](t,n);}};}),define('cobble/function/contains',['require','exports','module'],function(){'use strict';return function(e,t){if(e=e.jquery?e[0]:e,t=t.jquery?t[0]:t,!e||!t)return!1;if(e===t)return!0;else return $.contains(e,t);};}),define('cobble/function/debounce',['require','exports','module'],function(){'use strict';return function(e,t){t='number'===$.type(t)?t:50;var n;return function(){if(!n){var i=arguments;n=setTimeout(function(){n=null,e.apply(null,$.makeArray(i));},t);}};};}),define('cobble/function/decimalLength',['require','exports','module'],function(){'use strict';return function(e){var t=(''+e).split('.');return 2===t.length?t[1].length:0;};}),define('cobble/function/disableSelection',['require','exports','module'],function(){'use strict';var e=$('<i></i>')[0],t='onselectstart'in e,n='MozUserSelect'in e.style;if(e=null,t)return function(e){e=e||document,e.onselectstart=function(){return!1;};};if(n)return function(e){e=e||document.body,e.style.MozUserSelect='none';};else return $.noop;}),define('cobble/function/divide',['require','exports','module','./decimalLength','./float2Int'],function(require){'use strict';var e=require('./decimalLength'),t=require('./float2Int');return function(n,i){var o=Math.max(e(n),e(i));return n=t(n,o),i=t(i,o),n/ i;};}),define('cobble/function/dragGlobal',['require','exports','module','../helper/Draggable','../util/instance','../util/dimension','./pin'],function(require){'use strict';{var e=require('../helper/Draggable'),t=require('../util/instance'),n=require('../util/dimension');require('./pin');}return function(i){return new e({element:i.element,container:t.body,draggingClass:i.draggingClass,handleSelector:i.handleSelector,cancelSelector:i.cancelSelector,rect:function(){var e=i.fixed,t=i.scrollable;return{x:e||t?0:n.getPageScrollLeft(),y:e||t?0:n.getPageScrollTop(),width:e||!t?n.getViewportWidth():n.getPageWidth(),height:e||!t?n.getViewportHeight():n.getPageHeight()};}});};}),define('cobble/function/enableSelection',['require','exports','module'],function(){'use strict';var e=$('<i></i>')[0],t='onselectstart'in e,n='MozUserSelect'in e.style;if(e=null,t)return function(e){e=e||document,e.onselectstart=null;};if(n)return function(e){e=e||document.body,e.style.MozUserSelect='';};else return $.noop;}),define('cobble/function/float2Int',['require','exports','module'],function(){'use strict';return function(e,t){var n,i=(''+e).split('.');if(t>=0);else t=0;if(1===i.length)n=e+new Array(t+1).join('0');else t=Math.max(0,t-i[1].length),n=i.join('')+new Array(t+1).join('0');return+n;};}),define('cobble/function/innerOffset',['require','exports','module','./toNumber'],function(require){'use strict';var e=require('./toNumber');return function(t){var n=t.offset(),i=t.css('border-left-width'),o=t.css('border-top-width');return{left:n.left+e(i,0,'int'),top:n.top+e(o,0,'int')};};}),define('cobble/function/jquerify',['require','exports','module'],function(){'use strict';function e(e){return e.faker||e.element;}var t=$.prototype,n={on:function(){return t.on.apply(e(this),arguments),this;},off:function(){return t.off.apply(e(this),arguments),this;},emit:function(n,i){var o=this,r=e(o);if(r){if(!n[$.expando])n='string'===$.type(n)?$.Event(n):$.Event(null,n);n.cobble=o;var u=[n];if(i)u.push(i);var c=o[$.camelCase('on-'+n.type)];if($.isFunction(c)&&c.apply(o,u)===!1)n.preventDefault();if(!n.isPropagationStopped())t.trigger.apply(r,u);return n;}},before:function(t){e(this).before(t);},after:function(t){e(this).after(t);},appendTo:function(t){e(this).appendTo(t);},prependTo:function(t){e(this).prependTo(t);}};return function(e){$.each(n,function(t,n){if(null==e[t])e[t]=n;});};}),define('cobble/function/lifeCycle',['require','exports'],function(require,exports){'use strict';exports.init=function(e,t){var n=e.constructor,i='__cobble__'+n.prototype.type,o=t.element;if(o&&o.data(i))e=o.data(i);else if($.extend(e,n.defaultOptions,t),e.init(),o)o.data(i,e);return e;},exports.dispose=function(e){var t='__cobble__'+e.constructor.prototype.type,n=e.element;if(n)n.removeData(t);};}),define('cobble/function/offsetParent',['require','exports','module'],function(){'use strict';function e(e){return e.is('body')||'static'!==e.css('position');}return function(t){if(t.is('body'))return t;for(var n=t.parent();!e(n);)n=n.parent();return n;};}),define('cobble/function/outerOffset',['require','exports','module','./toNumber'],function(require){'use strict';var e=require('./toNumber');return function(t){var n=t.offset(),i=e(t.css('margin-left'),0,'int'),o=e(t.css('margin-top'),0,'int');return{left:n.left-i,top:n.top-o};};}),define('cobble/function/page',['require','exports','module','../util/instance'],function(require){'use strict';var e=require('../util/instance');return function(){if(e.body.prop('clientHeight')<e.html.prop('clientHeight'))return e.html;else return e.body;};}),define('cobble/function/pageHeight',['require','exports','module','./page'],function(require){'use strict';var e=require('./page');return function(){var t=e()[0];return Math.max(t.scrollHeight,t.clientHeight);};}),define('cobble/function/pageScrollLeft',['require','exports','module'],function(){'use strict';return function(){return Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);};}),define('cobble/function/pageScrollTop',['require','exports','module'],function(){'use strict';return function(){return Math.max(document.body.scrollTop,document.documentElement.scrollTop);};}),define('cobble/function/pageWidth',['require','exports','module','./page'],function(require){'use strict';var e=require('./page');return function(){var t=e()[0];return Math.max(t.scrollWidth,t.clientWidth);};}),define('cobble/function/parsePercent',['require','exports','module','./divide'],function(require){'use strict';var e=require('./divide'),t=/(-?\d+(\.\d+)?)%/;return function(n){if(t.test(n))return e(RegExp.$1,100);else return void 0;};}),define('cobble/function/pin',['require','exports','module','../util/instance','./parsePercent'],function(require){'use strict';function e(e){var t=o[e.x];if(null==t)t=e.x;if('string'===$.type(t)){var n=i(t);if(null!=n)t=n*(e.width||e.element.outerWidth());}return t;}function t(e){var t=o[e.y];if(null==t)t=e.y;if('string'===$.type(t)){var n=i(t);if(null!=n)t=n*(e.height||e.element.outerHeight());}return t;}var n=require('../util/instance'),i=require('./parsePercent'),o={left:0,top:0,center:'50%',middle:'50%',right:'100%',bottom:'100%'};return function(i){var o=i.element,r=i.attachment||{};if(!r.element)r.element=n.body;var u=r.element.offset(),c=u.left+e(r),l=u.top+t(r),s=c-e(i),f=l-t(i),a=i.offset;if(a){if('number'===$.type(a.x))s+=a.x;if('number'===$.type(a.y))f+=a.y;}var d={left:s,top:f},p=o.css('position');if('absolute'!==p&&'fixed'!==p)d.position='absolute';if(i.silence)return d;else o.css(d);};}),define('cobble/function/pinGlobal',['require','exports','module','./pin','../util/dimension','../function/viewport'],function(require){'use strict';var e=require('./pin'),t=require('../util/dimension'),n=require('../function/viewport');return function(i){var o={silence:!0,element:i.element,x:'50%'===i.x?'50%':0,y:'50%'===i.y?'50%':0,attachment:{element:n(),width:t.getViewportWidth(),height:t.getViewportHeight(),x:i.x,y:i.y}};if(!i.fixed)o.offset={x:t.getPageScrollLeft(),y:t.getPageScrollTop()};return e(o);};}),define('cobble/function/position',['require','exports','module','./offsetParent'],function(require){'use strict';var e=require('./offsetParent');return function(t){var n=e(t),i=t.css('position'),o=parseInt(t.css('left'),10),r=parseInt(t.css('top'),10),u=isNaN(o),c=isNaN(r);if(u||c)if(1===n.length){var l=t.offset(),s=n.offset();if(u)o=l.left-s.left-(parseInt(n.css('border-left-width'),10)||0);if(c)r=l.top-s.top-(parseInt(n.css('border-top-width'),10)||0);}else o=r=0;if(!i||'static'===i)i='absolute';return{position:i,left:o,top:r};};}),define('cobble/function/restrain',['require','exports','module'],function(){'use strict';return function(e,t,n){if(t>e)e=t;else if(e>n)e=n;return e;};}),define('cobble/function/split',['require','exports','module'],function(){'use strict';return function(e,t){var n=[];return $.each(e.split(t),function(e,t){if(t=$.trim(t))n.push(t);}),n;};}),define('cobble/function/toNumber',['require','exports','module'],function(){'use strict';var e={'int':parseInt,'float':parseFloat};return function(t,n,i){if('number'!==$.type(t)){var o=e[i];if(t=o?o(t,10):+t,isNaN(t))t=n;}return t;};}),define('cobble/function/viewport',['require','exports','module','../util/instance'],function(require){'use strict';var e=require('../util/instance');return function(){if(e.body.prop('clientHeight')>e.html.prop('clientHeight'))return e.html;else return e.body;};}),define('cobble/function/viewportHeight',['require','exports','module'],function(){'use strict';return function(){return window.innerHeight||document.documentElement.clientHeight;};}),define('cobble/function/viewportWidth',['require','exports','module'],function(){'use strict';return function(){return window.innerWidth||document.documentElement.clientWidth;};}),define('cobble/helper/Draggable',['require','exports','module','../function/page','../function/toNumber','../function/restrain','../function/position','../function/contains','../function/jquerify','../function/lifeCycle','../function/innerOffset','../function/outerOffset','../function/pageScrollLeft','../function/pageScrollTop','../function/enableSelection','../function/disableSelection','../util/instance','../util/mouse'],function(require){'use strict';function e(e){return s.init(this,e);}function t(e){var t=v(e),n=y(e);if(k.left!==t||k.top!==n){k.left=t,k.top=n;var i=e.data;if(1===++x){var o=i.draggingClass;if(o)i.element.addClass(o);i.emit('beforeDrag');}if(!i.silence)i.element.css(k);i.emit('drag',k);}}function n(e){m(),g.document.off(w);var t=e.data,n=t.draggingClass;if(n)t.element.removeClass(n);if(x>0)t.emit('afterDrag',k);x=v=y=null;}function i(e,t,n){var i=!1;if($.isArray(t))t=t.join(',');return e.find(t).each(function(){if(i=c(this,n))return!1;else return void 0;}),i;}var o=require('../function/page'),r=(require('../function/toNumber'),require('../function/restrain')),u=require('../function/position'),c=require('../function/contains'),l=require('../function/jquerify'),s=require('../function/lifeCycle'),f=require('../function/innerOffset'),a=require('../function/outerOffset'),d=require('../function/pageScrollLeft'),p=require('../function/pageScrollTop'),m=require('../function/enableSelection'),h=require('../function/disableSelection'),g=require('../util/instance'),b=require('../util/mouse');e.prototype={constructor:e,type:'Draggable',init:function(){var e=this,r=e.element;if(!e.container)e.container=o();r.css(u(r)),$.each(b,function(o,l){if(l.support)r.on(l.mousedown+w,function(s){var d=s.target,p=e.handleSelector,m=e.cancelSelector;if(!(p&&!i(r,p,d)||m&&i(r,m,d))){var b=S[o],$=a(r),C=b.absoluteX(s)-$.left,H=b.absoluteY(s)-$.top,P=e.container;if(c(P,r)){var O=f(P);C+=O.left,H+=O.top;}var D=u(r),W=D.position;k.left=D.left,k.top=D.top;var L=e.axis,T=e.getRectange(!0);v='y'===L?q.constant(k.left):q.change(b[W+'X'],C,T.x,T.x+T.width),y='x'===L?q.constant(k.top):q.change(b[W+'Y'],H,T.y,T.y+T.height),x=0,h(),g.document.on(l.mousemove+w,e,t).on(l.mouseup+w,e,n);}});});},getRectange:function(e){var t=this,n=t.rect;if($.isFunction(n))n=t.rect();if(e){var i=t.element,o=n.width-i.outerWidth(!0),r=n.height-i.outerHeight(!0);n.width=Math.max(0,o),n.height=Math.max(0,r);}return n;},setRectange:function(e){this.rect=e;},dispose:function(){var e=this;s.dispose(e),e.element.off(w),e.element=e.container=null;}},l(e.prototype),e.defaultOptions={rect:function(){var e=this,t=e.container,n={x:0,y:0,width:t.innerWidth(),height:t.innerHeight()};if(!c(t,e.element)){var i=f(t);n.x=i.left,n.y=i.top;}return n;}};var v,y,x,w='.cobble_helper_draggable',k={},q={constant:function(e){return function(){return e;};},change:function(e,t,n,i){return function(o){return r(e(o)-t,n,i);};}},S={};return $.each(b,function(e,t){if(t.support)S[e]={absoluteX:function(e){return t.clientX(e)+d();},absoluteY:function(e){return t.clientY(e)+p();},fixedX:function(e){return t.clientX(e);},fixedY:function(e){return t.clientY(e);}};}),e;}),define('cobble/helper/Input',['require','exports','module','../function/around','../function/jquerify','../function/lifeCycle','../util/keyboard','../util/input','./Keyboard'],function(require){'use strict';function e(e){return n.init(this,e);}var t=(require('../function/around'),require('../function/jquerify')),n=require('../function/lifeCycle'),i=require('../util/keyboard'),o=require('../util/input'),r=require('./Keyboard');e.prototype={constructor:e,type:'Input',init:function(){var e=this,t=e.element;o.init(t);var n=e.action;if(n)$.each(n,function(t,i){n[t]=$.proxy(i,e);});var c,l;e.keyboard=new r({element:t,action:n,longPress:e.longPress,onKeyDown:function(t){e.emit(t);},onKeyUp:function(t){e.emit(t);},onBeforeLongPress:function(){c=t.val(),l=!0,e.emit('beforeLongPress');},onAfterLongPress:function(n){if(l=!1,e.emit('afterLongPress'),c!==t.val()&&(i.isCharKey(n.keyCode)||i.isDeleteKey()))e.emit('change');}}),t.on('input'+u,function(){if(!l||!e.smart)e.emit('change');});},autoWidth:function(){var e=this,t=e.element;e.on('change',function(){if(t.scrollLeft()>0)t.width(t.prop('scrollWidth'));});},autoHeight:function(){var e=this,t=e.element;if('hidden'!==t.css('overflow-y'))t.css('overflow-y','hidden');var n,i=t.height(),o=i,r=parseInt(t.css('font-size'),10),u=t.innerHeight()-i;e.on('change',function(){if(o!==i)o=i,t.height(i);if(n=t.prop('scrollHeight')-u,Math.abs(n-o)>r)t.height(n),o=n;});},dispose:function(){var e=this;n.dispose(e);var t=e.element;o.dispose(t),t.off(u),e.keyboard.dispose(),e.element=e.keyboard=null;}},t(e.prototype),e.defaultOptions={smart:!0,longPress:!1};var u='.cobble_helper_input';return e;}),define('cobble/helper/Keyboard',['require','exports','module','../function/call','../function/split','../function/jquerify','../util/keyboard'],function(require){'use strict';function e(t){$.extend(this,e.defaultOptions,t),this.init();}function t(e){var t=[];return $.each(e,function(e,n){var i=[],o='plus',u=r(e.replace(/\$\+/g,o),'+');if($.each(c.combinationKey,function(e){if($.inArray(e,u)<0)u.push('!'+e);}),$.each(u,function(e,t){var n=0===t.indexOf('!');if(n)t=t.substr(1);if(t===o)t='$+';if(c.combinationKey[t])i.push((n?'!':'')+'e.'+t+'Key');else if(c[t])i.push('e.keyCode==='+c[t]);else return i.length=0,!1;}),i.length>0)t.push({test:new Function('e','return '+i.join('&')),handler:n});}),t;}function n(e){var t=e.data,n=e.keyCode,i=t.cache,r=i.counter;if(i.keyCode===n&&r>0){if(1===r)t.emit({type:'beforeLongPress',keyCode:n});r++;}else i.keyCode=n,r=1;if(i.counter=r,t.longPress||1===r)$.each(i.action,function(n,i){if(i.test(e))o(i.handler,t,e);});e.type='keyDown',t.emit(e);}function i(e){var t=e.data,n=t.cache;if(n.keyCode=null,n.counter>1)t.emit({type:'afterLongPress',keyCode:e.keyCode}),n.counter=0;e.type='keyUp',t.emit(e);}var o=require('../function/call'),r=require('../function/split'),u=require('../function/jquerify'),c=require('../util/keyboard');e.prototype={constructor:e,type:'Keyboard',init:function(){var e=this;e.cache={counter:0,action:t(e.action||{})},e.element.on('keydown'+l,e,n).on('keyup'+l,e,i);},dispose:function(){var e=this;e.element.off(l),e.element=e.cache=null;}},u(e.prototype),e.defaultOptions={longPress:!1};var l='.cobble_helper_keyboard';return e;}),define('cobble/ui/Dialog',['require','exports','module','../util/instance','../util/dimension','../function/jquerify','../function/lifeCycle','../function/offsetParent','../function/debounce','../function/pinGlobal','../function/dragGlobal'],function(require){'use strict';function e(e){return o.init(this,e);}var t=require('../util/instance'),n=require('../util/dimension'),i=require('../function/jquerify'),o=require('../function/lifeCycle'),r=require('../function/offsetParent'),u=require('../function/debounce'),c=require('../function/pinGlobal'),l=require('../function/dragGlobal');e.prototype={constructor:e,type:'Dialog',init:function(){var e=this,n=e.element||(e.element=$(e.template)),i=[],o=e.skinClass;if(o)i.push(o);var u=e.draggableClass;if(e.draggable&&u)i.push(u);if(i.length>0)n.addClass(i.join(' '));var c=e.removeOnEmpty,l=e.title;if(l)n.find(e.titleSelector).html(l);else if(c)n.find(e.headerSelector).remove();var f=e.content,a=n.find(e.bodySelector);if(f)a.html(f);else if(c)a.remove();var d=e.closeSelector,p=$.proxy(e.hide,e);if(d)n.on('click'+s,d,p);var m={};if(e.width)m.width=e.width;var h=e.fixed?'fixed':'absolute';if(n.css('position')!==h)m.position=h;if(!r(n).is('body'))t.body.append(n);if(e.modal){var g=e.mask||(e.mask=$(e.maskTemplate));if(n.before(g),e.hideOnClickMask)g.on('click'+s,p);var b='zIndex',v=e[b];if(!$.isNumeric(v))if(v=g.css(b),!$.isNumeric(v))v='auto';var y={overflow:'hidden'};y[b]=v,g.css(y),m[b]=v;}if(n.css(m),!e.hidden)e.hidden=!0,e.show();},show:function(){var e=this;if(e.hidden!==!1){var n=e.emit('beforeShow');if(!n.isDefaultPrevented()){var i=e.element,o=e.scrollable;if(e.draggable)e.drager=l({element:i,handleSelector:e.draggableHandleSelector,cancelSelector:e.draggableCancelSelector,draggingClass:e.draggingClass,fixed:e.fixed,scrollable:o});if(e.refresh(),e.showAnimation(),e.mask)e.showMaskAnimation();e.hidden=!1,t.window.resize(e.resizer=u(function(){e.refresh(!0);},50)),e.emit('afterShow');}}},hide:function(){var e=this;if(e.hidden!==!0){var n=e.emit('beforeHide');if(!n.isDefaultPrevented()){if(e.resizer)t.window.off('resize',e.resizer),e.resizer=null;if(e.drager)e.drager.dispose(),e.drager=null;if(e.hideAnimation(),e.mask)e.hideMaskAnimation();if(e.hidden=!0,e.emit('afterHide'),e.disposeOnHide)e.dispose();}}},refresh:function(){var e=this,t=arguments[0];if(!t||e.positionOnResize){var i=e.element,o=c({element:i,x:e.x,y:e.y,fixed:e.fixed});if(t)e.resizeAnimation(o);else i.css(o);}var r=e.mask;if(r)r.css({width:n.getPageWidth(),height:n.getPageHeight()});},dispose:function(){var e=this;if(o.dispose(e),!e.hidden)e.disposeOnHide=!1,e.hide();var t=e.element,n=e.mask;if(t.off(s),n)n.off(s);if(e.removeOnDispose)if(t.remove(),n)n.remove();e.element=e.mask=null;}},i(e.prototype),e.defaultOptions={x:'50%',y:'50%',modal:!0,fixed:!0,hidden:!1,draggable:!0,scrollable:!0,removeOnEmpty:!0,disposeOnHide:!0,removeOnDispose:!0,hideOnClickMask:!1,positionOnResize:!0,draggableClass:'draggable',draggableHandleSelector:'.dialog-header',draggableCancelSelector:['.dialog-header h1','.dialog-close'],headerSelector:'.dialog-header',titleSelector:'.dialog-header h1',closeSelector:'.dialog-close',bodySelector:'.dialog-body',template:'<div class="dialog"><i class="dialog-close">&times;</i><div class="dialog-header"><h1></h1></div><div class="dialog-body"></div></div>',maskTemplate:'<div class="dialog-mask"></div>',showAnimation:function(){this.element.show();},hideAnimation:function(){this.element.hide();},showMaskAnimation:function(){this.mask.show();},hideMaskAnimation:function(){this.mask.hide();},resizeAnimation:function(e){this.element.css(e);}};{var s='.cobble_ui_dialog';t.html.css('overflow'),t.body.css('overflow');}return e;}),define('cobble/util/dimension',['require','exports','module','../function/pageScrollTop','../function/pageScrollLeft','../function/pageWidth','../function/pageHeight','../function/viewportWidth','../function/viewportHeight'],function(require,exports){'use strict';var e=require('../function/pageScrollTop'),t=require('../function/pageScrollLeft'),n=require('../function/pageWidth'),i=require('../function/pageHeight'),o=require('../function/viewportWidth'),r=require('../function/viewportHeight');exports.getPageScrollTop=e,exports.getPageScrollLeft=t,exports.getPageWidth=n,exports.getPageHeight=i,exports.getViewportWidth=o,exports.getViewportHeight=r;}),define('cobble/util/input',['require','exports','module','../function/around'],function(require,exports){'use strict';function e(){}function t(e){var t=e.val(),i=!1;e.on('propertychange'+r,function(n){if(i)return void(i=!1);if('value'===n.originalEvent.propertyName){var o=e.val();if(o!==t)e.trigger('input'),t=o;}}),n(e,'val',function(){if(0!==arguments.length)i=!0;});}var n=require('../function/around'),i=$('<input type="text" />')[0],o='oninput'in i;i=null;var r='.cobble_util_input';exports.init=o?e:t,exports.dispose=function(e){e.off(r);};}),define('cobble/util/instance',['require','exports','module'],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body);}),define('cobble/util/keyboard',['require','exports','module'],function(require,exports){'use strict';function e(e){var t={};return $.each(e,function(e,n){t[n]=e;}),t;}var t={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,'`':192,'-':173,'=':61,'[':219,']':221,'\\':220,';':59,"'":222,',':188,'.':190,'/':191,$0:96,$1:97,$2:98,$3:99,$4:100,$5:101,$6:102,$7:103,$8:104,$9:105,'$.':110,'$+':107,'$-':109,'$*':106,'$/':111,space:32,tab:9},n={backspace:8,'delete':46},i={f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,enter:13,esc:27,capslock:20,insert:45,home:36,end:35,pageup:33,pagedown:34,left:37,right:39,up:38,down:40},o={shift:16,ctrl:17,meta:91,alt:18};$.extend(exports,t,i,o),exports.charKey=t,exports.deleteKey=n,exports.functionKey=i,exports.combinationKey=o,exports.isCharKey=function(n){return n in e(t);},exports.isDeleteKey=function(t){return t in e(n);},exports.isFunctionKey=function(t){return t in e(i);},exports.isCombinationKey=function(t){return t in e(o);};}),define('cobble/util/mouse',['require','exports','module'],function(){'use strict';function e(e){return e.originalEvent.changedTouches[0];}var t=document.createElement('div'),n={support:'ontouchend'in t,click:'touchstart',mousedown:'touchstart',mousemove:'touchmove',mouseup:'touchend',pageX:function(t){return e(t).pageX;},pageY:function(t){return e(t).pageY;},clientX:function(t){return e(t).clientX;},clientY:function(t){return e(t).clientY;}},i={support:'onclick'in t,click:'click',mousedown:'mousedown',mousemove:'mousemove',mouseup:'mouseup',pageX:function(e){return e.pageX;},pageY:function(e){return e.pageY;},clientX:function(e){return e.clientX;},clientY:function(e){return e.clientY;}};return t=null,{touch:n,mouse:i};}),define('common/component/InviteDialog_c5f0f737c8',['require','exports','cobble/ui/Dialog','cobble/helper/Input','common/service_9c322508d3'],function(require){'use strict';function e(e){$.extend(this,e),this.init();}var t=require('cobble/ui/Dialog'),n=require('cobble/helper/Input'),i=require('common/service_9c322508d3');e.prototype={init:function(){var e=this,r=e.userType,u=e.targetRole,c=e.formData,l='',s='',f=e.next;if(0!=r)l=o.teacher.content,s=o.teacher.title;else l=o.student.content,s=o.student.title;var a=new t({title:s,content:l,skinClass:'invite-dialog',disposeOnHide:!0,width:450});e.dialog=a;{var d=a.element,p=d.find('.btn-confirm');new n({element:d.find(':text'),onChange:function(){$.trim(this.element.val());p.prop('disabled',!1);}});}d.on('click','.btn-confirm',function(){a.hide(),i.sendInviteCode({inviteCode:d.find('input').val(),role:u,formData:c}).done(function(t){if(0===t.code){if($.isFunction(e.onSuccess))e.onSuccess();if(f&&'0'!==f)setTimeout(function(){if('2'==u){if(!f)window.location.href=t.data.url;else if(f.length>1)window.location.href=f;}else if('0'==u);},5500);}else if($.isFunction(e.onError))e.onError();});}).on('click','.btn-cancel',function(){a.hide();});}};var o={teacher:{title:'开通老师身份',content:'<div class="title"><span>即将给您开通老师身份\uFF0C是否继续\uFF1F</span></div><div class="form-group invite"><label class="form-label">邀请码\uFF08选填\uFF09\uFF1A</label><div class="form-controls"><input type="text" class="form-text" /><div class="form-block">拨打 <span class="text-info">4000-910-910</span> 获取邀请码</div></div></div><div class="dialog-action"><button class="btn-primary btn-confirm">确定</button><button class="btn-default btn-cancel">取消</button></div>'},student:{title:'开通学生身份',content:'<div class="title"><span>即将给您开通学生身份\uFF0C是否继续\uFF1F</span></div><div class="invite"><span>邀请码\uFF08选填\uFF09</span><input type="text" class="form-text" /></div><div class="dialog-action"><button class="btn-primary btn-confirm">确定</button><button class="btn-default btn-cancel">取消</button></div>'}};return e;});