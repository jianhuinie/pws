define('custom/helper/Draggable',['require','exports','module','cc/helper/Draggable','cc/util/instance'],function(require){'use strict';var e=require('cc/helper/Draggable'),t=require('cc/util/instance').document;return e.defaultOptions={dragAnimation:function(e){e.mainElement.css(e.mainStyle);},init:function(e){var n=e.namespace;e.mainElement.on('mousedown'+n,e.mainSelector,function(i){e.downHandler(i),t.off(n).on('mousemove'+n,e.moveHandler).on('mouseup'+n,function(i){e.upHandler(i),t.off(n);});});}},e;}),define('cc/function/allPromises',['require','exports','module'],function(){'use strict';return function(e){var t=$.Deferred();return $.when.apply($,e).then(function(){t.resolve($.makeArray(arguments));},function(){t.reject($.makeArray(arguments));}),t;};}),define('cc/function/around',['require','exports','module'],function(){'use strict';return function(e,t,n,i){var r='string'===$.type(t),o=r?e[t]:e;if(!r)i=n,n=t;var c=function(){var e,t=$.makeArray(arguments);if($.isFunction(n))e=n.apply(this,t);if(e!==!1){if($.isFunction(o))e=o.apply(this,t);if($.isFunction(i)){t.push(e);var r=i.apply(this,t);if('undefined'!==$.type(r))e=r;}return e;}};return r?e[t]=c:c;};}),define('cc/function/contains',['require','exports','module'],function(){'use strict';return function(e,t){if(e=e.jquery?e[0]:e,t=t.jquery?t[0]:t,!e||!t)return!1;if(e===t)return!0;else return $.contains(e,t);};}),define('cc/function/createEvent',['require','exports','module'],function(){'use strict';return function(e){if(e&&!e[$.expando])e='string'===$.type(e)||e.type?$.Event(e):$.Event(null,e);return e||$.Event();};}),define('cc/function/disableSelection',['require','exports','module'],function(){'use strict';if(document.selection)return function(){document.body.onselectstart=function(){return!1;};};else return $.noop;}),define('cc/function/enableSelection',['require','exports','module'],function(){'use strict';if(document.selection)return function(){document.body.onselectstart=null;};else return $.noop;}),define('cc/function/eventOffset',['require','exports','module'],function(){'use strict';return function(e){var t=e.offsetX,n=e.offsetY;if('number'!==$.type(t)){var i=e.target.getBoundingClientRect();t=e.clientX-i.left,n=e.clientY-i.top;}return{x:t,y:n};};}),define('cc/function/eventPage',['require','exports','module'],function(){'use strict';return function(e){var t=e.pageX,n=e.pageY;if('number'!==$.type(t)){var i=document.documentElement;t=e.clientX+i.scrollLeft,n=e.clientY+i.scrollTop;}return{x:t,y:n};};}),define('cc/function/extend',['require','exports','module'],function(){'use strict';return function(e,t){if($.isPlainObject(t))$.each(t,function(t,n){if(!(t in e))e[t]=n;});};}),define('cc/function/guid',['require','exports','module'],function(){var e=0;return function(){return'cc_'+e++;};}),define('cc/function/innerOffset',['require','exports','module','./toNumber'],function(require){'use strict';var e=require('./toNumber');return function(t){var n=t.offset(),i=t.css('border-left-width'),r=t.css('border-top-width');return{x:n.left+e(i,0,'int'),y:n.top+e(r,0,'int')};};}),define('cc/function/nextTick',['require','exports','module'],function(){'use strict';return function(e){var t=setTimeout(e,0);return function(){clearTimeout(t);};};}),define('cc/function/offsetParent',['require','exports','module'],function(){'use strict';function e(e){return e.is('body')||'static'!==e.css('position');}return function(t){if(t.is('body'))return t;for(var n=t.parent();!e(n);)n=n.parent();return n;};}),define('cc/function/outerOffset',['require','exports','module','./toNumber'],function(require){'use strict';var e=require('./toNumber');return function(t){var n=t.offset(),i=e(t.css('margin-left'),0,'int'),r=e(t.css('margin-top'),0,'int');return{x:n.left-i,y:n.top-r};};}),define('cc/function/page',['require','exports','module','../util/instance'],function(require){'use strict';var e=require('../util/instance');return function(){if(e.body.prop('clientHeight')<e.html.prop('clientHeight'))return e.html;else return e.body;};}),define('cc/function/pageScrollLeft',['require','exports','module'],function(){'use strict';return function(){return Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);};}),define('cc/function/pageScrollTop',['require','exports','module'],function(){'use strict';return function(){return Math.max(document.body.scrollTop,document.documentElement.scrollTop);};}),define('cc/function/position',['require','exports','module','./offsetParent'],function(require){'use strict';var e=require('./offsetParent');return function(t){var n=e(t),i=t.css('position'),r=parseInt(t.css('left'),10),o=parseInt(t.css('top'),10),c=isNaN(r),s=isNaN(o);if(c||s)if(1===n.length){var u=t.offset(),a=n.offset();if(c)r=u.left-a.left-(parseInt(n.css('border-left-width'),10)||0);if(s)o=u.top-a.top-(parseInt(n.css('border-top-width'),10)||0);}else r=o=0;if(!i||'static'===i)i='absolute';return{position:i,left:r,top:o};};}),define('cc/function/replaceWith',['require'],function(){'use strict';return function(e,t){e=e[0],t=t[0],e.parentNode.replaceChild(t,e);};}),define('cc/function/restrain',['require','exports','module'],function(){'use strict';return function(e,t,n){if(t>e)e=t;else if(e>n)e=n;return e;};}),define('cc/function/testTarget',['require','exports','module','../util/instance','./contains'],function(require){'use strict';var e=require('../util/instance'),t=require('./contains');return function(n,i,r){var o=!1;if($.isArray(i))i=i.join(',');if(!r)r=e.document;return r.find(i).each(function(){if(o=t(this,n))return!1;else return void 0;}),o;};}),define('cc/function/toBoolean',['require','exports','module'],function(){'use strict';return function(e,t){if('boolean'!==$.type(e)){if(1===arguments.length)t=!!e;e=t;}return e;};}),define('cc/function/toNumber',['require','exports','module'],function(){'use strict';var e={'int':parseInt,'float':parseFloat};return function(t,n,i){if('number'!==$.type(t)){var r=e[i];if(r)t=r(t,10);else if($.isNumeric(t))t=+t;else t=0/0;}return isNaN(t)?n:t;};}),define('cc/function/ucFirst',['require','exports','module'],function(){'use strict';return function(e){return e.charAt(0).toUpperCase()+e.slice(1);};}),define('cc/function/viewportHeight',['require','exports','module'],function(){'use strict';return function(){return window.innerHeight||document.documentElement.clientHeight;};}),define('cc/function/viewportWidth',['require','exports','module'],function(){'use strict';return function(){return window.innerWidth||document.documentElement.clientWidth;};}),define('cc/function/waitPromises',['require','exports','module','./allPromises'],function(require){'use strict';var e=require('./allPromises');return function(t,n){var i=[],r=[];if($.each(t,function(e,t){if($.isFunction(t.then))i.push(t),r.push(e);}),i.length>0)return e(i).then(function(e){$.each(e,function(e,n){t[r[e]]=n;}),n();});else return n();};}),define('cc/helper/Draggable',['require','exports','module','../function/page','../function/restrain','../function/position','../function/contains','../function/testTarget','../function/innerOffset','../function/outerOffset','../function/pageScrollLeft','../function/pageScrollTop','../function/viewportWidth','../function/viewportHeight','../function/enableSelection','../function/disableSelection','../util/life','../util/touch','../util/instance'],function(require){'use strict';function e(e){v.init(this,e);}var t=require('../function/page'),n=require('../function/restrain'),i=require('../function/position'),r=require('../function/contains'),o=require('../function/testTarget'),c=require('../function/innerOffset'),s=require('../function/outerOffset'),u=require('../function/pageScrollLeft'),a=require('../function/pageScrollTop'),f=require('../function/viewportWidth'),l=require('../function/viewportHeight'),d=require('../function/enableSelection'),p=require('../function/disableSelection'),v=require('../util/life'),m=require('../util/touch'),h=require('../util/instance').body,g=e.prototype;g.type='Draggable',g.init=function(){var e=this,v=e.option('mainElement'),m=e.option('mainSelector');e.inner({main:v});var g=e.option('containerElement');if(!g)g=t();var L,_=e.option('draggingClass'),E=e.option('containerDraggingClass'),P=e.option('bodyDraggingClass')||'dragging',T=function(t){var d;w=m?$(t.currentTarget):v;var p=t[$.expando];if(p){var h=e.option('includeSelector'),_=e.option('excludeSelector'),E=t.target;if(h&&!o(E,h,w)||_&&o(E,_,w))return;$.each(q,function(e,n){if(0===t.type.indexOf(e))return d=n,!1;else return void 0;});}else if(t.type)d=q[t.type];if(!d)d=q.mouse;e.emit('pick',{mainElement:w}),L=i(w),C.left=L.left,C.top=L.top;var P=g.is('html,body'),T=!0;if(!P)T=r(g,w);var D,j,I=s(w),O=c(g);if(p)D=d.absoluteX(t)-I.x,j=d.absoluteY(t)-I.y;else D=t.offsetX,j=t.offsetY;if(T){if(!P)D-=g.scrollLeft(),j-=g.scrollTop();D+=O.x,j+=O.y;}var k,H,A,B,N=f(),F=l(),W=a(),X=u(),Y=X+N,M=W+F,U='fixed'===L.position;if(U)if(P)k=0,H=0;else k=n(O.x,X,Y),H=n(O.y,W,M);else if(P)k=-1*O.x,H=-1*O.y;else if(T)k=0,H=0;else k=O.x,H=O.y;if(null==A)if(!P&&T)A=g.prop('scrollWidth'),B=g.prop('scrollHeight');else A=g.innerWidth(),B=g.innerHeight();if(P){if(N>A)A=N;if(F>B)B=F;}if(U){if(k+A>Y)A=Y-k;if(H+B>M)B=M-H;}A=Math.max(0,A-w.outerWidth(!0)),B=Math.max(0,B-w.outerHeight(!0));var R=e.option('axis');return x='y'===R?S.constant(L.left):S.variable(d[U?'fixedX':'absoluteX'],D,k,k+A),y='x'===R?S.constant(L.top):S.variable(d[U?'fixedY':'absoluteY'],j,H,H+B),b=0,!0;},D=function(t){if(null!=b){C.left=x(t),C.top=y(t);var n;if(0===b){if(L)w.css(L),L=null;if(n=e.emit('beforedrag',$.extend({},C)),n.isDefaultPrevented())return;if(p(),_)w.addClass(_);if(E)g.addClass(E);if(P)h.addClass(P);}if(b++,n=e.emit('drag',$.extend({},C)),!n.isDefaultPrevented())e.execute('dragAnimation',{mainElement:w,mainStyle:C});}},j=function(){if(null!=b){if(b>0){if(d(),_)w.removeClass(_);if(E)g.removeClass(E);if(P)h.removeClass(P);e.emit('afterdrag',$.extend({},C));}e.emit('drop',{mainElement:w}),b=x=y=L=w=null;}};e.execute('init',{mainElement:v,mainSelector:m,namespace:e.namespace(),downHandler:T,moveHandler:D,upHandler:j});},g.dispose=function(){v.dispose(this);},v.extend(g);var x,y,b,w,C={},S={constant:function(e){return function(){return e;};},variable:function(e,t,i,r){return function(o){return n(e(o)-t,i,r);};}},q={};return $.each(m,function(e,t){if(t.support)q[e]={absoluteX:function(e){return t.client(e).x+u();},absoluteY:function(e){return t.client(e).y+a();},fixedX:function(e){return t.client(e).x;},fixedY:function(e){return t.client(e).y;}};}),e;}),define('cc/util/event',['require','exports','module','../function/extend','../function/createEvent'],function(require,exports){'use strict';var e=require('../function/extend'),t=require('../function/createEvent'),n={get$:function(){var e=this;if(!e.$)e.$=$({});return e.$;},on:function(e,t,n){return this.get$().on(e,t,n),this;},once:function(e,t,n){return this.get$().one(e,t,n),this;},off:function(e,t){return this.get$().off(e,t),this;},emit:function(e,n){return e=t(e),this.get$().trigger(e,n),e;}};exports.extend=function(t){e(t,n);};}),define('cc/util/instance',['require','exports','module'],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body);}),define('cc/util/life',['require','exports','module','../function/guid','../function/around','../function/extend','../function/ucFirst','../function/nextTick','../function/toBoolean','../function/createEvent','../function/replaceWith','../function/offsetParent','./event'],function(require,exports){'use strict';function e(e,t,n,i,r){return function(s,u,a){var f=this;if($.isPlainObject(s))return a=u,void $.each(s,function(e,t){f[n](e,t,a);});a=a||{};var l=f[i](s),p=f.constructor[e+'Validator'];if(p)if($.isFunction(p[s]))u=p[s].call(f,u,a);if($.isFunction(r))u=r(f,u,a);if(l!==u||a.force)if(f[t][s]=u,!a.silent){var v={};o(v,a),v.newValue=u,v.oldValue=l;var m={};m[s]=v;var h=function(e){if(e&&e[s])f.execute(e[s],[u,l,v]);};if(h(f.inner('watchSync')),h(f.option('watchSync')),a.sync)return h(f.constructor[e+'Updater']),h(f.option('watch')),void f.emit(e+'change',m);var g=f.inner(e+'Changes');if(!g)g={},f.inner(e+'Changes',g);if($.extend(g,m),!f.inner(d))f.inner(d,c(function(){f.sync(d);}));}};}function t(){this.error('initStruct() can just call one time.');}function n(e,t,n,i,r){var o,c='before'===i?'_'+t:t+'_',s=e[c];if($.isFunction(s))if(o=s.apply(e,n),o!==!1&&!$.isPlainObject(o))o=null;if(o===!1)return!1;var u=!1;if(o&&o.dispatch)u=!0,delete o.dispatch;if(r=$.Event(r),r.type=i+t,e.emit(r,o),u)e.dispatch(r,o);if(r.isDefaultPrevented())return!1;else return void 0;}var i=require('../function/guid'),r=require('../function/around'),o=require('../function/extend'),c=(require('../function/ucFirst'),require('../function/nextTick')),s=require('../function/toBoolean'),u=require('../function/createEvent'),a=require('../function/replaceWith'),f=(require('../function/offsetParent'),require('./event')),l={},d='__update_async__',p={},v={initStruct:function(){var e=this,n=e.option('mainElement'),i=e.option('mainTemplate');if('string'===$.type(i)){var r=e.option('share'),o=e.type+i;if(r)n=p[o];var c;if(!n){if(c=$(i),r)p[o]=c;}else if(e.option('replace'))a(n,c=$(i));else n.html(i);if(c)n=c,e.option('mainElement',n);}var s=e.option('parentSelector');if(s&&!n.parent().is(s))n.appendTo(s);e.initStruct=t;},warn:function(e){if('undefined'!=typeof console)console.warn(['[CC warn]',this.type,e].join(' '));},error:function(e){throw new Error(['[CC error]',this.type,e].join(' '));},live:function(e,t,n){var i=this,r=i.inner('main');if(r)r.on(e+i.namespace(),t,n);return i;},emit:function(e,t){var n=this,i=n.option('context')||n;e=u(e),e.cc=i;var r=[e];if($.isPlainObject(t))r.push(t);e.type=e.type.toLowerCase();var o=i.get$();o.trigger.apply(o,r);var c='on'+e.type;if(!e.isPropagationStopped()&&i.execute(c,r)===!1)e.preventDefault(),e.stopPropagation();return i.execute(c+'_',r),e;},dispatch:function(e,t){if(!e.isPropagationStopped()){if(!e.originalEvent)e.originalEvent={preventDefault:$.noop,stopPropagation:$.noop};var n=$.Event(e);if(n.type='dispatch',this.emit(n,t),n.isPropagationStopped())e.preventDefault(),e.stopPropagation();}},before:function(e,t){return this.on('before'+e.toLowerCase(),t);},after:function(e,t){return this.on('after'+e.toLowerCase(),t);},find:function(e){var t=this.inner('main');if(t){var n=t.find(e);if(n.length)return n;}},appendTo:function(e){var t=this.inner('main');if(t)t.appendTo(e);},prependTo:function(e){var t=this.inner('main');if(t)t.prependTo(e);},execute:function(e,t){var n=this,i=e;if('string'===$.type(e))i=n.option(e);if($.isFunction(i)){var r=n.option('context')||n;if($.isArray(t))return i.apply(r,t);else return i.call(r,t);}},renderWith:function(e,t,n){var i=this;if(!t)if(t=i.option('renderTemplate'),!t)t=i.option('mainTemplate');if(!n)n=i.option('mainElement');var r=i.option('renderSelector');if(r)n=n.find(r);var o;if($.isPlainObject(e)||$.isArray(e))o=i.execute('render',[e,t]);else if('string'===$.type(e))o=e;n.html(o);},namespace:function(){return'.'+this.guid;},option:function(e,t){var n=this;if(1===arguments.length&&'string'===$.type(e))return n.options[e];else{if($.isPlainObject(e))return void $.each(e,function(e,t){n.option(e,t);});n.options[e]=t;}},inner:function(e,t){var n=this,i=n.inners||{};if(1===arguments.length&&'string'===$.type(e))return i[e];else{if($.isPlainObject(e))return void $.each(e,function(e,t){n.inner(e,t);});i[e]=t;}},is:function(e){return this.states[e];},state:e('state','states','state','is',function(e,t){return s(t,!1);}),get:function(e){return this.properties[e];},set:e('property','properties','set','get')},m={sync:function(){var e=this,t=function(t,n,i){$.each(t,function(r,o){return e.execute(n[r],[o.newValue,o.oldValue,i?t:o]);});};if($.each(['property','state'],function(n,i){var r=e.inner(i+'Changes');if(r){e.inner(i+'Changes',null);var o=e.constructor[i+'Updater'];if(o)t(r,o,!0);var c=e.option('watch');if(c)t(r,c);e.emit(i+'change',r);}}),arguments[0]!==d)e.execute(e.inner(d));e.inner(d,!1);},_sync:function(){if(!this.inner(d))return!1;else return void 0;},_init:function(){var e='initCalled';if(this.is(e))return!1;else return void this.state(e,!0);},_dispose:function(){var e='disposeCalled';if(this.is(e))return!1;else return void this.state(e,!0);}};exports.extend=function(e,t){o(e,m),$.each(e,function(i,o){var c=i.indexOf('_');if($.isFunction(o)&&0!==c&&c!==i.length-1)if(!($.isArray(t)&&$.inArray(i,t)>=0)){var s=function(e){return n(this,i,arguments,'before',e);},u=function(e){var t=this,r=arguments,c=function(){return n(t,i,r,'after',e);};if(o.length+1===r.length){var s=r[r.length-1];if(s&&$.isFunction(s.then))return void s.then(c);}c();};r(e,i,s,u);}}),o(e,v),f.extend(e);},exports.init=function(e,t){if(!t)t={};return o(t,e.constructor.defaultOptions),t.onafterinit_=function(){e.state('inited',!0);},t.onafterdispose_=function(){e.state('disposed',!0),e.off();var t=e.inner('main');if(e.option('removeOnDispose')&&t)t.remove();c(function(){delete l[e.guid],e.properties=e.options=e.changes=e.states=e.inners=e.guid=null;});},l[e.guid=i()]=e,e.properties={},e.options=t,e.states={},e.inners={},e.init(),e;},exports.dispose=function(e){e.sync();var t=e.inner('main')||e.option('mainElement');if(t)t.off(e.namespace());};}),define('cc/util/rect',['require','exports','module'],function(require,exports){'use strict';exports.makeRectList=function(e,t){var n=0,i=0;if(t)n=t.scrollLeft(),i=t.scrollTop();return e.map(function(){var e,r,o=$(this);if(t){var c=o.position();e=c.left+n,r=c.top+i;}else{var s=o.offset();e=s.left,r=s.top;}return{left:e,top:r,width:o.outerWidth(),height:o.outerHeight()};});},exports.sortByIntersectionArea=function(e,t){var n=$.map(t,function(t,n){var i=Math.max(e.left,t.left),r=Math.max(e.top,t.top),o=Math.min(e.left+e.width,t.left+t.width),c=Math.min(e.top+e.height,t.top+t.height),s=o-i,u=c-r;return{index:n,area:s>0&&u>0?s*u:0};});return n.sort(function(e,t){if(e.area<t.area)return 1;else if(e.area>t.area)return-1;return 0;}),n;};}),define('cc/util/touch',['require','exports','module','../function/eventPage','../function/eventOffset'],function(require){'use strict';function t(e){return e.originalEvent.changedTouches[0];}var n=require('../function/eventPage'),i=require('../function/eventOffset'),r=document.createElement('div'),o={support:'ontouchend'in r,click:'touchstart',down:'touchstart',move:'touchmove',up:'touchend',page:function(e){var n=t(e);return{x:n.pageX,y:n.pageY};},client:function(e){var n=t(e);return{x:n.clientX,y:n.clientY};},offset:function(e){var n=t(e);return{x:n.offsetX,y:n.offsetY};}},c={support:'onclick'in r,click:'click',down:'mousedown',move:'mousemove',up:'mouseup',page:function(e){return n(e);},client:function(e){return{x:e.clientX,y:e.clientY};},offset:function(){return i(e);}};return r=null,{touch:o,mouse:c};}),define('common/function/compressImage_1539d29a96',function(){function e(e,n,i,r,o){var c=0.05;if(r/o/(i/n)>1+2*c)return'@1e_'+n+'w_1c_0i_1o_90Q_1x.'+e+'%7C0-'+c*n*o/r+'-'+n+'-'+i+'a.'+e.toLowerCase();else return t(e,n,i);}function t(e,t,n,i){return'@'+(i?0:1)+'e_'+t+'w_'+n+'h_1c_0i_1o_90Q_1x.'+e.toLowerCase();}return function(n){var i=n.url,r=i.split('.').pop();if('gif'===r)r='jpg';var o=n.width,c=n.height,s=n.rawWidth,u=n.rawHeight;if(o=Math.floor(o),c=Math.floor(c),null!=s&&null!=u)return s=Math.floor(s),u=Math.floor(u),i+e(r,o,c,s,u);else return i+t(r,o,c,n.noCrop);};}),define('userCenter/common/function/renderImage_b12a57d1e9',['require','exports','module','cc/function/toNumber','common/function/compressImage_1539d29a96'],function(require){'use strict';var e=require('cc/function/toNumber'),t=require('common/function/compressImage_1539d29a96');return function(n){'undefined'!=typeof window.devicePixelRatio?window.devicePixelRatio:1;$('img[data-src]',n).each(function(){var n=$(this),i=n.attr('data-src'),r=e(n.attr('data-width'),0),o=e(n.attr('data-height'),0),c=!e(n.attr('data-crop'),0);if(r>0&&o>0){var s=t({url:i,width:r,height:o,noCrop:c}),u=t({url:i,width:2*r,height:2*o,noCrop:c}),a=t({url:i,width:3*r,height:3*o,noCrop:c}),f=[u+' 2x',a+' 3x'];n.prop({src:s,srcset:f.join(',')}).removeAttr('data-src');}});};}),define('userCenter/common/service_1288b24a55',['require','exports','module'],function(require,exports){'use strict';function e(e,t){var n=e;if(t)n+=$.param(t);return n;}function t(t,n,s){n=n||{},s=$.extend({},i,s);var u,a;if(o[t])a=e(t,n),u=c[a];var f=$.Deferred();if(u)if(!u.response)u.deferredList.push(f);else f.resolve(u.response);else{var l=userData.number||0;if(!r[t])n._user_number=l,$.extend(n,siteData.monkey);if($.ajax({url:t,data:n,method:'post',dataType:'json',timeout:s.timeout,async:s.sync?!1:!0}).then(function(e){if(o[t])u=c[a],u.response=e,$.each(u.deferredList,function(t,n){if(e&&0===e.code)n.resolve(e);else n.reject(e);}),u.deferredList.length=0;else if(e&&0===e.code)f.resolve(e);else{var n=e.msg;if(n&&!s.preventError)alert({title:'提示',content:n});f.reject(e);}},function(e,t){if('timeout'===t||'error'===t)f.reject({code:-1});}),o[t])c[a]={},c[a].deferredList=[f];}return f;}function n(e,t){return $.ajax({url:e,data:t,dataType:'jsonp'});}var i={timeout:5000,sync:!1,stringify:!1,preventError:!1},r={'/area/list':1,'/subject/getList':1},o={'/user/basicInfo':1},c={};exports.post=t,exports.jsonp=n,exports.getUserBasicInfo=function(e){var n;if(e&&null!=e.userId&&null!=e.userType)n={user_id:e.userId,user_type:e.userType};return t('/user/basicInfo',n);},exports.getCourseList=function(){return t('/lesson/list');},exports.getUserType=function(){return t('/user/roles');},exports.sendInviteCode=function(e){var n=$.extend(e.formData||{},{invite_code:e.inviteCode,role:e.role});return t('/user/switch_role_ajax',n);},exports.getCDNSpeedTestUrls=function(){return t('/video/getSpeedTestUrl');};}),define('userCenter/teacherCenter/courseSort/courseSort_html',function(){return'<div class="course-sort card"><div class="header"><h1>课程排序</h1></div><div class="body"><p>该功能已经升级为课程分类功能\u3002目前在<a href="http://www.genshuixue.com/static/app?type=teacher" target="_blank">跟谁学老师版APP</a>\u201C课程管理\u201D模块中已上线\uFF01</p><p>电脑版夜以继日升级中\uFF0C争取早日与您见面\uFF0C敬请期待\uFF01</p><p>如需对课程进行排序\uFF0C请移步<a href="http://www.genshuixue.com/static/app?type=teacher" target="_blank">跟谁学老师版APP</a>\u201C课程管理\u201D模块\uFF0C课程分类更智能\uFF0C推荐排序更便捷\uFF01</p></div><!--div class="body"> 暂时隐藏 2017.1.5<div class="save-sort">{{#if courseList.length}}<div class="btn btn-default btn-save {{saveBtnStatus}}" on-click=\'saveSort()\'>保存排序</div>{{/if}}<div class="hint"><i class="icon icon-info-circle"></i>对尚未结束的课程进行排序\uFF0C保存后的排序将展示在您的主页\u3002</div></div><div class="course-list"><div class="list-header"><div class="course-index">序号</div><div class="course-info">课程信息</div><div class="course-options">操作</div></div><div class="list-body">{{#if courseList.length}}{{#each courseList:index}}<div class="course-item"><div class="course-content"><div class="course-index">{{index + 1}}</div><div class="course-cover"><img src="{{compressImage(image, 70, 70)}}"></div><div class="course-info"><div class="course-detail"><div class="course-name"><label>{{type_cn}}</label>{{name}}</div><div class="course-time">{{expire}}</div><div class="course-price">{{#if price == \'0.00元\'}}<span class="success">免费</span>{{else}}{{price}}{{/if}}</div></div></div><div class="course-options"><span class="move-up {{#if index==0}}disabled{{/if}}" on-click=\'moveUp(index)\'>上移</span><span class="move-down {{#if index==courseList.length-1}}disabled{{/if}}" on-click=\'moveDown(index)\'>下移</span><span class="to-top {{#if index==0}}disabled{{/if}}" on-click=\'toTop(index)\'>置顶</span></div></div></div>{{/each}}{{else}}<div class="no-course"><img src="{{imImageDir}}/expression-50.png" /><p>没有进行中的课程\uFF0C快去开设一门课程吧\u3002<a href="/teacher_center/set_course">点击前往</a></p></div>{{/if}}</div></div></div--></div>';}),define('userCenter/teacherCenter/courseSort/courseSort_2119d7a970',['require','exports','module','../../common/function/renderImage_b12a57d1e9','./service_f19d863c7e','custom/helper/Draggable','cc/util/rect','cc/function/position','cc/function/waitPromises','./courseSort_html'],function(require,exports){'use strict';var e=require('../../common/function/renderImage_b12a57d1e9'),t=require('./service_f19d863c7e'),n=require('custom/helper/Draggable'),i=require('cc/util/rect'),r=require('cc/function/position'),o=require('cc/function/waitPromises');exports.init=function(c){new Ractive({el:'#container',template:require('./courseSort_html'),data:{courseList:c.result,saveBtnStatus:'disabled',originalCourseList:[],imImageDir:siteData.source+'/img/im'},oncomplete:function(){var t=this,c=$(t.getElement()),s=t.listElement=c.find('.list-body');e();var u=[];for(var a in t.get('courseList'))u.push({number:t.get('courseList')[a].number});t.set('originalCourseList',u);var f,l,d,p,v,m,h,g='.course-content',x='active',y='brother',b='active-parent',w=function(){l=d=null,v=c.find(g),m=i.makeRectList(v,s);};w(),t.draggable=new n({mainElement:c,mainSelector:g,containerElement:s,excludeSelector:['.course-cover'],draggingClass:'dragging',onpick:function(e,t){if(!h){f=t.mainElement,f.addClass(x),f.width(f.width());var n=f.closest('.course-item');n.addClass(b).height(n.height()),w();}},onbeforedrag:function(e,n){if(l=v.index(f),h||!t.isDraggable(l))return!1;else return p=n,void(d=null);},ondrag:function(e,n){var r={left:n.left,top:n.top,width:m[l].width,height:m[l].height},o=i.sortByIntersectionArea(r,m);if('number'===$.type(d))v.eq(d).removeClass(y);var c=o[0].index!==l?o[0]:o[1];if(c&&t.isDraggable(c.index)){var s=r.width*r.height;if(s>0&&c.area/s>0.1)return d=c.index,void v.eq(d).addClass(y);}d=null;},onafterdrag:function(){if(null==d)d=l;var n={position:'',left:'',top:''},i=100,c='easeOutQuad',s=[],u=[],a={};if(d!==l){if(l>d){a[l]=d;for(var m=d;l>m;m++)a[m]=m+1;}else{a[l]=d;for(var m=l+1;d>=m;m++)a[m]=m-1;}var g={};g[l]=p;var x=function(e){var t=g[e];if(!t)t=r(v.eq(e)),g[e]=t;return t;};$.each(a,function(e,t){s.push(e),$.each(s,function(e,t){v.eq(t).width(v.eq(t).width());});var r=$.Deferred();u.push(r);{var o=v.eq(t),a=x(t),f=o.parent(),d={left:a.left,top:a.top},p=v.eq(e),m=x(e);({left:m.left,top:m.top});}if(e!=l)p.css(m);p.animate(d,i,c,function(){p.css(n).removeClass(y),f.append(p),r.resolve();});});}else{s.push(l);var b=$.Deferred();u.push(b),f.animate({left:p.left,top:p.top},i,c,function(){f.css(n),b.resolve();});}var C={};$.each(s,function(e,t){C['courseList.'+t+'.animating']=!0;}),t.set(C),h=!0,o(u,function(){var n=t.get('courseList');$.each(s,function(e,t){n[t].animating=!1;});var i=[];$.each(n,function(e,t){if(null!=a[e])i[a[e]]=t;else i[e]=t;}),n.splice(0,n.length),n.push.apply(n,i),e(),h=!1,w();}),t.set('saveBtnStatus','active');},ondrop:function(e,t){if(!h){f=t.mainElement,f.removeClass(x),f.width(f.width());var n=f.closest('.course-item');n.removeClass(b).height('');}}});},isDraggable:function(e){if(0>e)return!1;var t=this.get('courseList');if(t[e].animating)return!1;else return!0;},moveUp:function(t){var n=this;if(0!=t){var i=n.get('courseList').splice(t,1);n.get('courseList').splice(t-1,0,i[0]),e(),n.set('saveBtnStatus','active');}},moveDown:function(t){var n=this;if(t!=n.get('courseList').length-1){var i=n.get('courseList').splice(t,1);n.get('courseList').splice(t+1,0,i[0]),e(),n.set('saveBtnStatus','active');}},toTop:function(t){var n=this;if(0!=t){var i=n.get('courseList').splice(t,1);n.get('courseList').unshift(i[0]),e(),n.set('saveBtnStatus','active');}},saveSort:function(){var e=this;if('active'==e.get('saveBtnStatus')){var n=!0,i=[];for(var r in e.get('courseList')){if(e.get('courseList')[r].number!==e.get('originalCourseList')[r].number)n=!1;i.push({number:e.get('courseList')[r].number,type:e.get('courseList')[r].type});}if(n)tip({content:'<i class="icon icon-info-circle"></i>&nbsp;您未改变课程排序',type:'info'}),e.set('saveBtnStatus','disabled');else t.sortSave({data:i}).then(function(){e.set('saveBtnStatus','disabled'),tip({content:'保存成功',type:'success'});});}}});};}),define('userCenter/teacherCenter/courseSort/service_f19d863c7e',['require','exports','module','../../common/service_1288b24a55'],function(require,exports){'use strict';var e=require('../../common/service_1288b24a55');exports.sortSave=function(t){return e.post('/tcenter/courses/all-courses/sort',t);};});