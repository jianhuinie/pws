define('SwfStore/SwfStore',['require'],function(require){'use strict';function e(t){function i(){return'SwfStore_'+t.namespace.replace(r,'_')+'_'+n++;}function c(e){var t=document.createElement('div');if(document.body.appendChild(t),t.id=i(),!e)t.style.position='absolute',t.style.top='-2000px',t.style.left='-2000px';return t;}t=t||{};var u,a={swf_url:require.toUrl('./storage.swf'),namespace:'swfstore',debug:!1,timeout:10,onready:null,onerror:null};for(u in a)if(a.hasOwnProperty(u))if(!t.hasOwnProperty(u))t[u]=a[u];if(t.namespace=t.namespace.replace(o,'_'),e[t.namespace])throw"There is already an instance of SwfStore using the '"+t.namespace+"' namespace. Use that instance or specify an alternate namespace in the config.";if(this.config=t,'undefined'==typeof console){var s=c(!0);this.console={log:function(e){var t=c(!0);t.innerHTML=e,s.appendChild(t);}};}else this.console=console;this.log=function(e,n,o){if(t.debug)if(n='swfStore'===n?'swf':n,'undefined'!=typeof this.console[e])this.console[e]('SwfStore - '+t.namespace+' ('+n+'): '+o);else this.console.log('SwfStore - '+t.namespace+': '+e+' ('+n+'): '+o);},this.log('info','js','Initializing...'),e[t.namespace]=this;var f=c(t.debug),l=i(),p='namespace='+encodeURIComponent(t.namespace);f.innerHTML='<object height="100" width="500" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+l+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">\t<param value="'+t.swf_url+'" name="movie">\t<param value="'+p+'" name="FlashVars">\t<param value="always" name="allowScriptAccess">\t<embed height="375" align="middle" width="500" pluginspage="https://www.macromedia.com/go/getflashplayer" flashvars="'+p+'" type="application/x-shockwave-flash" allowscriptaccess="always" quality="high" loop="false" play="true" name="'+l+'" bgcolor="#ffffff" src="'+t.swf_url+'"></object>',this.swf=document[l]||window[l],this._timeout=setTimeout(function(){e[t.namespace].onerror(new Error(t.swf_url+' failed to load within '+t.timeout+' seconds.'),'js');},1000*t.timeout);}function t(e){if('function'==typeof e)throw new Error('SwfStore Error: Functions cannot be used as keys or values.');}var n=0,o=/[^a-z0-9_\/]/gi,r=/[^a-z0-9_]/gi;return e.prototype={ready:!1,set:function(e,n){var o=this;o._checkReady();var r=function(e,n){if(t(e),t(n),null===n||'undefined'==typeof n)o.swf.clear(e);else o.swf.set(e,n);};if(e)if('object'==typeof e){for(var i in e)if(e.hasOwnProperty(i))r(i,e[i]);}else r(e,n);},get:function(e){return this._checkReady(),t(e),this.swf.get(e);},getAll:function(){this._checkReady();for(var e,t=this.swf.getAll(),n={},o=0,r=t.length;r>o;o++)e=t[o],n[e.key]=e.value;return n;},clear:function(){var e=this.getAll();for(var t in e)if(e.hasOwnProperty(t))this.remove(t);},remove:function(e){this._checkReady(),t(e),this.swf.clear(e);},_checkReady:function(){if(!this.ready)throw'SwfStore is not yet finished initializing. Pass a config.onready callback or wait until this.ready is true before trying to use a SwfStore instance.';},onload:function(){var e=this;setTimeout(function(){if(clearTimeout(e._timeout),e.ready=!0,e.config.onready)e.config.onready();},0);},onerror:function(e,t){if(clearTimeout(this._timeout),!(e instanceof Error))e=new Error(e);if(this.log('error',t||'swf',e.message),this.config.onerror)this.config.onerror(e);}},window.SwfStore=e,e;}),define('cc/function/offsetDate',['require','exports','module','./offsetHour'],function(require){'use strict';var e=require('./offsetHour');return function(t,n){return e(t,24*n);};}),define('cc/function/offsetHour',['require','exports','module','./offsetMinute'],function(require){'use strict';var e=require('./offsetMinute');return function(t,n){return e(t,60*n);};}),define('cc/function/offsetMinute',['require','exports','module','./offsetSecond'],function(require){'use strict';var e=require('./offsetSecond');return function(t,n){return e(t,60*n);};}),define('cc/function/offsetSecond',['require','exports','module'],function(){'use strict';return function(e,t){if('date'===$.type(e))e=e.getTime();return new Date(e+1000*t);};}),define('cc/function/split',['require','exports','module'],function(){'use strict';return function(e,t){var n=[];if('number'===$.type(e))e=''+e;if(e&&'string'===$.type(e))$.each(e.split(t),function(e,t){if(t=$.trim(t))n.push(t);});return n;};}),define('cc/function/supportCanvas',['require','exports','module'],function(){'use strict';return function(){var e=document.createElement('canvas');return e&&e.getContext?!0:!1;};}),define('cc/function/supportFlash',['require','exports','module'],function(){'use strict';return function(){var e,t=navigator.plugins;if(t&&t.length>0)e=t['Shockwave Flash'];else if(document.all)try{e=new ActiveXObject('ShockwaveFlash.ShockwaveFlash');}catch(n){}return!!e;};}),define('cc/function/supportInput',['require','exports','module'],function(){'use strict';return function(){var e=$('<input type="text" />')[0];return'oninput'in e;};}),define('cc/function/supportLocalStorage',['require','exports','module'],function(){'use strict';return function(){return'undefined'!=typeof window.localStorage;};}),define('cc/function/supportPlaceholder',['require','exports','module'],function(){'use strict';return function(){var e=$('<input type="text" />')[0];return'placeholder'in e;};}),define('cc/function/supportWebSocket',['require','exports','module'],function(){'use strict';return function(){return'undefined'!=typeof window.WebSocket;};}),define('cc/util/browser',['require','exports','module'],function(){'use strict';function e(e){var n,o;return $.each(t,function(t,r){var i=r[1].exec(e);if(i){if(n=r[0],o=i[1])if(o=o.replace(/_/g,'.'),r[2])o=parseInt(o,10)+r[2]+'.0';return!1;}}),{name:n||'',version:o||''};}var t=[['alipay',/alipay/],['wechat',/micromessenger/],['baiduApp',/baiduboxapp/],['baidu',/baidubrowser/],['baidu',/bdbrowser/],['uc',/ucbrowser/],['uc',/ucweb/],['qq',/qqbrowser/],['qqApp',/qq/],['ie',/iemobile[ \/]([\d_.]+)/],['ie',/msie[ \/]([\d_.]+)/],['ie',/trident[ \/]([\d_.]+)/,4],['chrome',/chrome[ \/]([\d_.]+)/],['firefox',/firefox[ \/]([\d_.]+)/],['opera',/opera(?:.*version)?[ \/]([\d_.]+)/],['safari',/version[ \/]([\d_.]+) safari/],['safari',/safari/]],n=e(navigator.userAgent.toLowerCase());if(n.name)n[n.name]=!0;return n;}),define('cc/util/cookie',['require','exports','module','../function/split','../function/offsetDate'],function(require,exports){'use strict';function e(e){if(0===e.indexOf('"'))e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');var t={};try{e=decodeURIComponent(e.replace(/\+/g,' ')),$.each(n(e,';'),function(e,o){var r=n(o,'='),i=r[0],c=r[1];if(i)t[i]=c;});}catch(o){}return t;}function t(e,t,n){var r=n.expires;if($.isNumeric(r))r=o(new Date(),r);document.cookie=[encodeURIComponent(e),'=',encodeURIComponent(t),r?';expires='+r.toUTCString():'',n.path?';path='+n.path:'',n.domain?';domain='+n.domain:'',n.secure?';secure':''].join('');}var n=require('../function/split'),o=require('../function/offsetDate');exports.get=function(t){var n=e(document.cookie);return'string'===$.type(t)?n[t]:n;},exports.set=function(e,n,o){if($.isPlainObject(e))o=n,n=null;if(o=$.extend({},exports.defaultOptions,o),null===n)$.each(e,function(e,n){t(e,n,o);});else t(e,n,o);},exports.remove=function(e,n){n=n||{},n.expires=-1,t(e,'',$.extend({},exports.defaultOptions,n));},exports.defaultOptions={};}),define('cc/util/instance',['require','exports','module'],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body);}),define('cc/util/localStorage',['require','exports','module','../function/supportLocalStorage'],function(require,exports){'use strict';function e(t,n){if($.isPlainObject(t))$.each(t,e);else try{localStorage[t]=n;}catch(o){}}function t(e){var t;try{t=localStorage[e];}catch(n){}return t;}function n(e){try{localStorage.removeItem(e);}catch(t){}}var o=require('../function/supportLocalStorage')();if(exports.support=o,o)exports.set=e,exports.get=t,exports.remove=n;else exports.set=exports.get=exports.remove=$.noop;}),define('cc/util/support',['require','exports','module','../function/supportWebSocket','../function/supportLocalStorage','../function/supportFlash','../function/supportCanvas','../function/supportPlaceholder','../function/supportInput'],function(require,exports){'use strict';function e(e){var t=e.charAt(0).toUpperCase()+e.slice(1),r=(e+' '+o.join(t+' ')+t).split(' '),i=!1;return $.each(r,function(e,t){if(t in n)return i=!0,!1;else return void 0;}),i;}var t=document.createElement('musicode'),n=t.style,o=['Webkit','Moz','O','ms'];exports.animation=function(){return e('animationName');},exports.boxShadow=function(){return e('boxShadow');},exports.flexbox=function(){return e('flexWrap');},exports.transform=function(){return e('transform');},exports.webSocket=require('../function/supportWebSocket'),exports.localStorage=require('../function/supportLocalStorage'),exports.flash=require('../function/supportFlash'),exports.canvas=require('../function/supportCanvas'),exports.placeholder=require('../function/supportPlaceholder'),exports.input=require('../function/supportInput');}),define('cc/util/url',['require','exports','module','../function/split'],function(require,exports){'use strict';var e=require('../function/split');exports.parseQuery=function(t){var n={};if('string'===$.type(t)&&t.indexOf('=')>=0){var o=t.charAt(0),r='?'===o||'#'===o?1:0;if(r>0)t=t.substr(r);$.each(e(t,'&'),function(t,o){var r=e(o,'=');if(2===r.length){var i=r[0];if(i)n[i]=decodeURIComponent(r[1]);}});}return n;},exports.parse=function(e){if(null==e)e=document.URL;var t=document.createElement('a');t.href=e,e=t.href;var n='';if(t.protocol&&t.host)n=t.protocol+'//'+t.host;else if(/^(http[s]?:\/\/[^\/]+)(?=\/)/.test(e))n=RegExp.$1;var o=n.split(':');if(0===n.indexOf('http:')&&3===o.length&&80==o[2])o.length=2,n=o.join(':');var r=t.pathname;if(r&&'/'!==r.charAt(0))r='/'+r;return{origin:n,pathname:r,search:t.search,hash:t.hash};},exports.mixin=function(e,t,n){if('boolean'===$.type(t)&&2===arguments.length)n=t,t=null;if(null==t)t=document.URL;var o=exports.parse(t),r=exports.parseQuery(n?o.hash:o.search);if($.extend(r,e),r=$.param(r),t=o.origin+o.pathname,n)t+=o.search;else if(r)t+='?'+r;if(!n)t+=o.hash;else if(r)t+='#'+r;return t;};}),define('userCenter/common/function/isIframe_b70bdee7c7',['require','exports','module','cc/util/url'],function(require){'use strict';var e=require('cc/util/url');return function(){var t=e.parseQuery(location.search);return 1==t.iframe;};}),define('userCenter/common/storage_919e36fb9d',['require','exports','./support_09c7aae609','SwfStore','cc/util/localStorage','cc/util/cookie'],function(require,exports){'use strict';var e,t=require('./support_09c7aae609'),n=require('SwfStore'),o=require('cc/util/localStorage'),r=require('cc/util/cookie');exports.init=function(i){if(i=i||$.noop,t.flash)return e=new n({onready:i}),void(window.swfStore=e);else return e=t.localStorage?o:r,void i();},exports.set=function(t,n){e.set(t,n);},exports.get=function(t){return e.get(t);},exports.remove=function(t){e.remove(t);};}),define('userCenter/common/support_09c7aae609',['require','exports','module','cc/util/support','cc/util/browser','cc/util/instance','./function/isIframe_b70bdee7c7'],function(require,exports){'use strict';var e=require('cc/util/support'),t=require('cc/util/browser'),n=require('cc/util/instance').body,o=require('./function/isIframe_b70bdee7c7');exports.init=function(){var r=[];if(e.animation())exports.animation=!0,r.push('animation');else r.push('no-animation');if(e.boxShadow())exports.boxShadow=!0,r.push('box-shadow');else r.push('no-box-shadow');if(e.flash())exports.flash=!0;if(e.localStorage())exports.localStorage=!0;if(t.ie)r.push('ie'+parseInt(t.version,10));else r.push(t.name);if(o())r.push('iframe');n.addClass(r.join(' '));};});