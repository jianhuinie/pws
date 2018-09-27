define('custom/form/Text',['require','exports','module','cc/form/Text'],function(require){'use strict';var e=require('cc/form/Text');return e.defaultOptions={nativeFirst:!0,inputSelector:'input[type="text"],input[type="password"],textarea',labelSelector:'.placeholder',showPlaceholderAnimation:function(e){e.labelElement.fadeIn(500);},hidePlaceholderAnimation:function(e){e.labelElement.hide();}},e;}),define('cc/form/Text',['require','exports','../helper/Input','../helper/Placeholder','../util/life','./common'],function(require){'use strict';function e(e){i.init(this,e);}var n=require('../helper/Input'),t=require('../helper/Placeholder'),i=require('../util/life'),o=require('./common'),r=e.prototype;return r.type='Text',r.init=function(){var e=this;e.initStruct();var i=new t({mainElement:e.option('mainElement'),value:e.option('placeholder'),hidden:!0,autoTrim:e.option('autoTrim'),nativeFirst:e.option('nativeFirst'),inputSelector:e.option('inputSelector'),labelSelector:e.option('labelSelector'),showAnimation:e.option('showPlaceholderAnimation'),hideAnimation:e.option('hidePlaceholderAnimation')});i.sync();var o=i.inner('input'),r=new n({mainElement:o,shortcut:e.option('shortcut'),value:e.option('value')});r.sync(),i.option('watchSync',{value:function(n){e.set('placeholder',n);}}),r.option('watchSync',{value:function(n){e.set('value',n);}}),e.inner({main:i.inner('main'),'native':o,input:r,placeholder:i}),e.set({name:e.option('name'),value:r.get('value'),placeholder:i.get('value')});},r.dispose=function(){var e=this;i.dispose(e),e.inner('input').dispose(),e.inner('placeholder').dispose();},i.extend(r),e.propertyUpdater={name:function(e){o.prop(this,'name',e);},value:function(e){var n=this.inner('input');n.set('value',e),n.sync(),this.inner('placeholder').render();},placeholder:function(e){this.inner('placeholder').set('value',e);}},e.propertyValidator={name:function(e){return o.validateName(this,e);}},e;}),define('cc/form/common',['require','exports','module'],function(require,exports){'use strict';exports.prop=function(e,n,t){if($.isPlainObject(n))$.each(n,function(n,t){exports.prop(e,n,t);});else{var i=e.inner('native');if(2===arguments.length)return i.prop(n);else{if(i.prop(n)!==t)i.prop(n,t);if('value'===n)i.trigger('change');}}},exports.setClass=function(e,n,t){var i=e.option(n);if(i)e.option('mainElement')[t+'Class'](i);},exports.findNative=function(e,n){var t=e.option('mainElement').find(n);if(0===t.length)e.error('form/'+e.type+' 必须包含一个 ['+n+'].');return t.eq(0);},exports.validateName=function(e,n){if('string'!==$.type(n))if(n=exports.prop(e,'name'),!n||'string'!==$.type(n))e.error('name attribute is missing.');return n;},exports.validateValue=function(e,n){var t=$.type(n);if('number'===t)n=''+n;else if('string'!==t)n=exports.prop(e,'value')||'';return n;};}),define('cc/function/around',['require','exports','module'],function(){'use strict';return function(e,n,t,i){var o='string'===$.type(n),r=o?e[n]:e;if(!o)i=t,t=n;var u=function(){var e,n=$.makeArray(arguments);if($.isFunction(t))e=t.apply(this,n);if(e!==!1){if($.isFunction(r))e=r.apply(this,n);if($.isFunction(i)){n.push(e);var o=i.apply(this,n);if('undefined'!==$.type(o))e=o;}return e;}};return o?e[n]=u:u;};}),define('cc/function/createEvent',['require','exports','module'],function(){'use strict';return function(e){if(e&&!e[$.expando])e='string'===$.type(e)||e.type?$.Event(e):$.Event(null,e);return e||$.Event();};}),define('cc/function/extend',['require','exports','module'],function(){'use strict';return function(e,n){if($.isPlainObject(n))$.each(n,function(n,t){if(!(n in e))e[n]=t;});};}),define('cc/function/guid',['require','exports','module'],function(){var e=0;return function(){return'cc_'+e++;};}),define('cc/function/isHidden',['require','exports','module'],function(){'use strict';return function(e){e.css('display');return'none'===e.css('display')||0==e.css('opacity')||'hidden'===e.css('visibility');};}),define('cc/function/nextTick',['require','exports','module'],function(){'use strict';return function(e){var n=setTimeout(e,0);return function(){clearTimeout(n);};};}),define('cc/function/offsetParent',['require','exports','module'],function(){'use strict';function e(e){return e.is('body')||'static'!==e.css('position');}return function(n){if(n.is('body'))return n;for(var t=n.parent();!e(t);)t=t.parent();return t;};}),define('cc/function/replaceWith',['require'],function(){'use strict';return function(e,n){e=e[0],n=n[0],e.parentNode.replaceChild(n,e);};}),define('cc/function/split',['require','exports','module'],function(){'use strict';return function(e,n){var t=[];if('number'===$.type(e))e=''+e;if(e&&'string'===$.type(e))$.each(e.split(n),function(e,n){if(n=$.trim(n))t.push(n);});return t;};}),define('cc/function/supportInput',['require','exports','module'],function(){'use strict';return function(){var e=$('<input type="text" />')[0];return'oninput'in e;};}),define('cc/function/supportPlaceholder',['require','exports','module'],function(){'use strict';return function(){var e=$('<input type="text" />')[0];return'placeholder'in e;};}),define('cc/function/toBoolean',['require','exports','module'],function(){'use strict';return function(e,n){if('boolean'!==$.type(e)){if(1===arguments.length)n=!!e;e=n;}return e;};}),define('cc/function/toString',['require','exports','module'],function(){'use strict';return function(e,n){var t=$.type(e);if('number'===t)e=''+e;else if('string'!==t){if(1===arguments.length)n='';e=n;}return e;};}),define('cc/function/ucFirst',['require','exports','module'],function(){'use strict';return function(e){return e.charAt(0).toUpperCase()+e.slice(1);};}),define('cc/helper/Input',['require','exports','module','../function/toString','../util/life','../util/input','../util/keyboard','./Keyboard'],function(require){'use strict';function e(e){t.init(this,e);}var n=require('../function/toString'),t=require('../util/life'),i=require('../util/input'),o=require('../util/keyboard'),r=require('./Keyboard'),u=e.prototype;return u.type='Input',u.init=function(){var e=this,n=e.option('mainElement');i.init(n);var t,u=new r({mainElement:n,shortcut:e.option('shortcut')}),s=function(t){if('string'!==$.type(t))t=n.val();e.set('value',t);};u.on('dispatch',function(i,r){var u=i.originalEvent;switch(u.type){case'beforelongpress':t=!0;break;case'afterlongpress':t=!1;var a=r.keyCode;if(o.isCharKey(a)||o.isDeleteKey()||n.is('textarea')&&a===o.enter)s();}e.dispatch(e.emit(u,r),r);});var a=e.namespace();n.on('blur'+a,s).on(i.INPUT+a,function(){if(!t||!e.option('silentOnLongPress'))s();}),e.inner({keyboard:u,main:n}),s(e.option('value'));},u.dispose=function(){var e=this;t.dispose(e),i.dispose(e.inner('main')),e.inner('keyboard').dispose();},t.extend(u),e.propertyUpdater={value:function(e,n,t){var i=this.inner('main');if(i.val()!==e||t.value.force)i.val(e);}},e.propertyValidator={value:function(e){return n(e);}},e;}),define('cc/helper/Keyboard',['require','exports','module','../function/split','../util/life','../util/keyboard'],function(require){'use strict';function e(e){i.init(this,e);}function n(e){var n=[];return $.each(e,function(e,i){var r=[],u='plus',s=t(e.replace(/\$\+/g,u),'+');if($.each(o.combinationKey,function(e){if($.inArray(e,s)<0)s.push('!'+e);}),$.each(s,function(e,n){var t=0===n.indexOf('!');if(t)n=n.substr(1);if(n===u)n='$+';if(o.combinationKey[n])r.push((t?'!':'')+'e.'+n+'Key');else if(o[n])r.push('e.keyCode==='+o[n]);else return r.length=0,!1;}),r.length>0)n.push({test:new Function('e','return '+r.join('&')),handler:i});}),n;}var t=require('../function/split'),i=require('../util/life'),o=require('../util/keyboard'),r=e.prototype;return r.type='Keyboard',r.init=function(){var e=this,t=e.option('shortcut');if($.isPlainObject(t))t=n(t);var i,o=0,r=1,u=function(){return o>r;},s=e.namespace();e.option('mainElement').on('keydown'+s,function(n){var s=n.keyCode;if(i===s&&o>0){if(o===r)e.emit('beforelongpress',{keyCode:s},!0);o++;}else i=s,o=1;if(e.dispatch(e.emit(n)),t){var a={isLongPress:u()},c=[n,a];$.each(t,function(t,i){if(i.test(n))e.execute(i.handler,c);});}}).on('keyup'+s,function(n){if(u())e.emit('afterlongpress',{keyCode:n.keyCode},!0);o=0,i=null,e.dispatch(e.emit(n));});},r.dispose=function(){i.dispose(this);},i.extend(r),e;}),define('cc/helper/Placeholder',['require','exports','module','../function/isHidden','../function/toString','../function/supportPlaceholder','../util/life','../util/input'],function(require){'use strict';function e(e){r.init(this,e);}function n(e,n){var t=e.inner('proxy'),i=t[n];if(i)return i(e);else return void 0;}var t=require('../function/isHidden'),i=require('../function/toString'),o=require('../function/supportPlaceholder')(),r=require('../util/life'),u=require('../util/input'),s=e.prototype;s.type='Placeholder',s.init=function(){var e=this;e.initStruct(),e.inner({proxy:e.option('nativeFirst')&&o?a:c}),n(e,'init'),e.set({value:e.option('value')}),e.state({hidden:e.option('hidden')});},s.show=function(){this.state('hidden',!1);},s._show=function(){if(!this.is('hidden'))return!1;else return void 0;},s.hide=function(){this.state('hidden',!0);},s._hide=function(){if(this.is('hidden'))return!1;else return void 0;},s.render=function(){n(this,'render');},s.dispose=function(){n(this,'dispose'),r.dispose(this);},r.extend(s),e.propertyUpdater={value:function(){this.render();}},e.propertyValidator={value:function(e){if(e=i(e,null),null==e)e=this.inner('input').attr('placeholder');return e||'';}},e.stateUpdater={hidden:function(e){n(this,e?'hide':'show');}},e.stateValidator={hidden:function(e){if('boolean'!==$.type(e))e=n(this,'isHidden');return e;}};var a={init:function(e){var n=e.option('mainElement'),t=e.option('inputSelector'),i=n.prop('tagName');e.inner({main:n,input:'INPUT'===i||'TEXTAREA'===i?n:n.find(t)});},render:function(e){e.inner('input').attr('placeholder',e.get('value'));},isHidden:function(e){return e.inner('input').val().length>0;}},c={init:function(e){var n=e.option('mainElement'),t=e.option('inputSelector'),i=e.option('labelSelector'),o=n.find(t),r=n.find(i);o.removeAttr('placeholder'),e.inner({main:n,input:o,label:r}),u.init(o);var s=$.proxy(e.render,e);s();var a=e.namespace();n.on('click'+a,i,function(){o.focus();}).on('change'+a,t,s).on(u.INPUT+a,t,s);},show:function(e){e.execute('showAnimation',{labelElement:e.inner('label')});},hide:function(e){e.execute('hideAnimation',{labelElement:e.inner('label')});},render:function(e){var n=e.inner('input');e.inner('label').html(e.get('value'));var t=n.val();if(e.option('autoTrim'))t=$.trim(t);if(t)e.hide();else e.show();},dispose:function(e){u.dispose(e.inner('input'));},isHidden:function(e){return t(e.inner('label'));}};return e;}),define('cc/util/event',['require','exports','module','../function/extend','../function/createEvent'],function(require,exports){'use strict';var e=require('../function/extend'),n=require('../function/createEvent'),t={get$:function(){var e=this;if(!e.$)e.$=$({});return e.$;},on:function(e,n,t){return this.get$().on(e,n,t),this;},once:function(e,n,t){return this.get$().one(e,n,t),this;},off:function(e,n){return this.get$().off(e,n),this;},emit:function(e,t){return e=n(e),this.get$().trigger(e,t),e;}};exports.extend=function(n){e(n,t);};}),define('cc/util/input',['require','exports','module','../function/guid','../function/around','../function/supportInput'],function(require,exports){'use strict';function e(e){var n='.'+t();e.data(r,n).on('input'+n,function(n){n.type=u,e.trigger(n);});}function n(e){var n=e.val(),o=!1,s='.'+t();e.data(r,s).on('propertychange'+s,function(t){if(o)return void(o=!1);if('value'===t.originalEvent.propertyName){var i=e.val();if(i!==n)if(t.type=u,e.trigger(t),!t.isDefaultPrevented())n=i;}}),i(e,'val',function(){if(0!==arguments.length)o=!0;});}var t=require('../function/guid'),i=require('../function/around'),o=require('../function/supportInput'),r='cc-util-input',u='cc-input';exports.INPUT=u,exports.init=o()?e:n,exports.dispose=function(e){var n=e.data(r);if(n)e.removeData(r).off(n);};}),define('cc/util/keyboard',['require','exports','module'],function(require,exports){'use strict';function e(e){var n={};return $.each(e,function(e,t){n[t]=e;}),n;}var n={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,'`':192,'-':173,'=':61,'[':219,']':221,'\\':220,';':59,"'":222,',':188,'.':190,'/':191,$0:96,$1:97,$2:98,$3:99,$4:100,$5:101,$6:102,$7:103,$8:104,$9:105,'$.':110,'$+':107,'$-':109,'$*':106,'$/':111,space:32,tab:9},t={backspace:8,'delete':46},i={f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,enter:13,esc:27,capslock:20,insert:45,home:36,end:35,pageup:33,pagedown:34,left:37,right:39,up:38,down:40},o={shift:16,ctrl:17,meta:91,alt:18};$.extend(exports,n,t,i,o),exports.charKey=n,exports.deleteKey=t,exports.functionKey=i,exports.combinationKey=o,exports.isCharKey=function(t){return t in e(n);},exports.isDeleteKey=function(n){return n in e(t);},exports.isFunctionKey=function(n){return n in e(i);},exports.isCombinationKey=function(n){return n in e(o);};}),define('cc/util/life',['require','exports','module','../function/guid','../function/around','../function/extend','../function/ucFirst','../function/nextTick','../function/toBoolean','../function/createEvent','../function/replaceWith','../function/offsetParent','./event'],function(require,exports){'use strict';function e(e,n,t,i,o){return function(s,a,c){var f=this;if($.isPlainObject(s))return c=a,void $.each(s,function(e,n){f[t](e,n,c);});c=c||{};var p=f[i](s),d=f.constructor[e+'Validator'];if(d)if($.isFunction(d[s]))a=d[s].call(f,a,c);if($.isFunction(o))a=o(f,a,c);if(p!==a||c.force)if(f[n][s]=a,!c.silent){var h={};r(h,c),h.newValue=a,h.oldValue=p;var v={};v[s]=h;var m=function(e){if(e&&e[s])f.execute(e[s],[a,p,h]);};if(m(f.inner('watchSync')),m(f.option('watchSync')),c.sync)return m(f.constructor[e+'Updater']),m(f.option('watch')),void f.emit(e+'change',v);var y=f.inner(e+'Changes');if(!y)y={},f.inner(e+'Changes',y);if($.extend(y,v),!f.inner(l))f.inner(l,u(function(){f.sync(l);}));}};}function n(){this.error('initStruct() can just call one time.');}function t(e,n,t,i,o){var r,u='before'===i?'_'+n:n+'_',s=e[u];if($.isFunction(s))if(r=s.apply(e,t),r!==!1&&!$.isPlainObject(r))r=null;if(r===!1)return!1;var a=!1;if(r&&r.dispatch)a=!0,delete r.dispatch;if(o=$.Event(o),o.type=i+n,e.emit(o,r),a)e.dispatch(o,r);if(o.isDefaultPrevented())return!1;else return void 0;}var i=require('../function/guid'),o=require('../function/around'),r=require('../function/extend'),u=(require('../function/ucFirst'),require('../function/nextTick')),s=require('../function/toBoolean'),a=require('../function/createEvent'),c=require('../function/replaceWith'),f=(require('../function/offsetParent'),require('./event')),p={},l='__update_async__',d={},h={initStruct:function(){var e=this,t=e.option('mainElement'),i=e.option('mainTemplate');if('string'===$.type(i)){var o=e.option('share'),r=e.type+i;if(o)t=d[r];var u;if(!t){if(u=$(i),o)d[r]=u;}else if(e.option('replace'))c(t,u=$(i));else t.html(i);if(u)t=u,e.option('mainElement',t);}var s=e.option('parentSelector');if(s&&!t.parent().is(s))t.appendTo(s);e.initStruct=n;},warn:function(e){if('undefined'!=typeof console)console.warn(['[CC warn]',this.type,e].join(' '));},error:function(e){throw new Error(['[CC error]',this.type,e].join(' '));},live:function(e,n,t){var i=this,o=i.inner('main');if(o)o.on(e+i.namespace(),n,t);return i;},emit:function(e,n){var t=this,i=t.option('context')||t;e=a(e),e.cc=i;var o=[e];if($.isPlainObject(n))o.push(n);e.type=e.type.toLowerCase();var r=i.get$();r.trigger.apply(r,o);var u='on'+e.type;if(!e.isPropagationStopped()&&i.execute(u,o)===!1)e.preventDefault(),e.stopPropagation();return i.execute(u+'_',o),e;},dispatch:function(e,n){if(!e.isPropagationStopped()){if(!e.originalEvent)e.originalEvent={preventDefault:$.noop,stopPropagation:$.noop};var t=$.Event(e);if(t.type='dispatch',this.emit(t,n),t.isPropagationStopped())e.preventDefault(),e.stopPropagation();}},before:function(e,n){return this.on('before'+e.toLowerCase(),n);},after:function(e,n){return this.on('after'+e.toLowerCase(),n);},find:function(e){var n=this.inner('main');if(n){var t=n.find(e);if(t.length)return t;}},appendTo:function(e){var n=this.inner('main');if(n)n.appendTo(e);},prependTo:function(e){var n=this.inner('main');if(n)n.prependTo(e);},execute:function(e,n){var t=this,i=e;if('string'===$.type(e))i=t.option(e);if($.isFunction(i)){var o=t.option('context')||t;if($.isArray(n))return i.apply(o,n);else return i.call(o,n);}},renderWith:function(e,n,t){var i=this;if(!n)if(n=i.option('renderTemplate'),!n)n=i.option('mainTemplate');if(!t)t=i.option('mainElement');var o=i.option('renderSelector');if(o)t=t.find(o);var r;if($.isPlainObject(e)||$.isArray(e))r=i.execute('render',[e,n]);else if('string'===$.type(e))r=e;t.html(r);},namespace:function(){return'.'+this.guid;},option:function(e,n){var t=this;if(1===arguments.length&&'string'===$.type(e))return t.options[e];else{if($.isPlainObject(e))return void $.each(e,function(e,n){t.option(e,n);});t.options[e]=n;}},inner:function(e,n){var t=this,i=t.inners||{};if(1===arguments.length&&'string'===$.type(e))return i[e];else{if($.isPlainObject(e))return void $.each(e,function(e,n){t.inner(e,n);});i[e]=n;}},is:function(e){return this.states[e];},state:e('state','states','state','is',function(e,n){return s(n,!1);}),get:function(e){return this.properties[e];},set:e('property','properties','set','get')},v={sync:function(){var e=this,n=function(n,t,i){$.each(n,function(o,r){return e.execute(t[o],[r.newValue,r.oldValue,i?n:r]);});};if($.each(['property','state'],function(t,i){var o=e.inner(i+'Changes');if(o){e.inner(i+'Changes',null);var r=e.constructor[i+'Updater'];if(r)n(o,r,!0);var u=e.option('watch');if(u)n(o,u);e.emit(i+'change',o);}}),arguments[0]!==l)e.execute(e.inner(l));e.inner(l,!1);},_sync:function(){if(!this.inner(l))return!1;else return void 0;},_init:function(){var e='initCalled';if(this.is(e))return!1;else return void this.state(e,!0);},_dispose:function(){var e='disposeCalled';if(this.is(e))return!1;else return void this.state(e,!0);}};exports.extend=function(e,n){r(e,v),$.each(e,function(i,r){var u=i.indexOf('_');if($.isFunction(r)&&0!==u&&u!==i.length-1)if(!($.isArray(n)&&$.inArray(i,n)>=0)){var s=function(e){return t(this,i,arguments,'before',e);},a=function(e){var n=this,o=arguments,u=function(){return t(n,i,o,'after',e);};if(r.length+1===o.length){var s=o[o.length-1];if(s&&$.isFunction(s.then))return void s.then(u);}u();};o(e,i,s,a);}}),r(e,h),f.extend(e);},exports.init=function(e,n){if(!n)n={};return r(n,e.constructor.defaultOptions),n.onafterinit_=function(){e.state('inited',!0);},n.onafterdispose_=function(){e.state('disposed',!0),e.off();var n=e.inner('main');if(e.option('removeOnDispose')&&n)n.remove();u(function(){delete p[e.guid],e.properties=e.options=e.changes=e.states=e.inners=e.guid=null;});},p[e.guid=i()]=e,e.properties={},e.options=n,e.states={},e.inners={},e.init(),e;},exports.dispose=function(e){e.sync();var n=e.inner('main')||e.option('mainElement');if(n)n.off(e.namespace());};}),define('userCenter/common/component/Input_html',function(){return'<div class="input{{#if options.className}} {{options.className}}{{/if}}"><div class="placeholder"></div>{{#if options.multiple}}<textarea name="{{options.name}}" value="{{options.value}}" on-focus="focus" on-blur="blur" on-keydown="keydown"{{#if options.lazy}}{{#if options.lazy === true}} lazy{{else}} lazy="{{options.lazy}}"{{/if}}{{/if}}{{#if options.disabled}} disabled{{/if}}{{#if options.readonly}} readonly{{/if}}{{#if options.autofocus}} autofocus{{/if}}></textarea>{{else}}<input type="{{#if options.type}}{{options.type}}{{else}}text{{/if}}" name="{{options.name}}" value="{{options.value}}" on-focus="focus" on-blur="blur" on-keydown="keydown"{{#if options.lazy}}{{#if options.lazy === true}} lazy{{else}} lazy="{{options.lazy}}"{{/if}}{{/if}}{{#if options.disabled}} disabled{{/if}}{{#if options.readonly}} readonly{{/if}}{{#if options.autofocus}} autofocus{{/if}}{{#if options.maxlength}} maxlength="{{options.maxlength}}"{{/if}}/>{{/if}}<div class="tooltip error right" data-error-for="{{options.name}}"></div><style>{{style}}</style></div>';}),define('userCenter/common/component/Input_12b813ed72',['require','exports','module','custom/form/Text','cc/util/keyboard','./Input_html','./Input_css'],function(require){'use strict';var e=require('custom/form/Text'),n=require('cc/util/keyboard');return Ractive.extend({template:require('./Input_html'),data:function(){return{style:require('./Input_css'),options:{name:'',value:'',type:'',placeholder:'',className:'',multiple:!1,lazy:!1,disabled:!1,readonly:!1,autofocus:!1,maxlength:''}};},onrender:function(){function t(e){function n(){if(o!==i)o=i,e.height(i);if(t=e.prop('scrollHeight')-u,Math.abs(t-o)>r)e.height(t),o=t;}if('hidden'!==e.css('overflow-y'))e.css('overflow-y','hidden');var t,i=e.height(),o=i,r=parseInt(e.css('font-size'),10),u=e.innerHeight()-i;e.on('keyup',n),n();}var i=this,o=$(i.getElement()),r=o.find(':text,textarea'),u=i.formText=new e({mainElement:o,nativeFirst:!1,watch:{value:function(e){if(e!==i.get('options.value'))i.set('options.value',e);}}});i.observe('options.autoHeight',function(e){if(e)t(r);}),i.observe('options.name',function(e){u.set('name',e);}),i.observe('options.value',function(e){u.set('value',e);}),i.observe('options.placeholder',function(e){u.set('placeholder',e);}),i.observe('options.focus',function(e){if(e)r.focus();}),i.observe('options.blur',function(e){if(e)r.blur();}),i.on('focus',function(){i.set({'options.focus':!0,'options.blur':!1});}),i.on('blur',function(){i.set({'options.focus':!1,'options.blur':!0});}),i.on('keydown',function(e){var t={};t[n.enter]='enter';var o=t[e.original.keyCode];if(o)i.fire(o,e);});},onteardown:function(){this.formText&&this.formText.dispose();}});}),define('userCenter/common/component/Input_css',function(){return'';}),define('userCenter/teacherCenter/courseEdit/Checkout_html',function(){return'<label class="checkbox"><input type="checkbox" name="{{options.name}}" value="{{options.value}}" on-click="toggleStatus()"/>{{options.text}}</label><div class="input-group"><div class="label secondary">\uFFE5</div><Input options="{{options.priceInputOptions}}" /><div class="label secondary">元/课时</div></div>';}),define('userCenter/teacherCenter/courseEdit/Checkout_cfa595730f',['require','exports','module','./Checkout_html','../../common/component/Input_12b813ed72'],function(require){'use strict';return Ractive.extend({template:require('./Checkout_html'),data:function(){return{options:{name:'',value:'',text:'',checked:!0,priceInputOptions:{name:'',value:'',placeholder:'',className:'',disabled:!0,focus:!1}}};},toggleStatus:function(){var e=!this.get('options.checked');this.set('options.checked',e),this.set('options.priceInputOptions.focus',e);},onrender:function(){var e=this;e.observe('options.checked',function(n){if('boolean'!==$.type(n))n=!1;if($(e.getElement()).find(':checkbox').prop('checked',n),e.set('options.priceInputOptions.disabled',!n),!n)e.set('options.priceInputOptions.value','');});},components:{Input:require('../../common/component/Input_12b813ed72')}});});