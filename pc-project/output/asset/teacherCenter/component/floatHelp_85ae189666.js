define('cobble/util/cookie',['require','exports','module'],function(require,exports){'use strict';function e(e){if(0===e.indexOf('"'))e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');var o={};try{e=decodeURIComponent(e.replace(/\+/g,' ')),$.each(e.split(';'),function(e,t){var i=t.split('='),l=$.trim(i[0]),n=$.trim(i[1]);if(l)o[l]=n;});}catch(t){}return o;}function o(e,o,i){var l=i.expires;if($.isNumeric(l)){var n=l;l=new Date(),l.setTime(l.getTime()+n*t);}document.cookie=[encodeURIComponent(e),'=',encodeURIComponent(o),l?';expires='+l.toUTCString():'',i.path?';path='+i.path:'',i.domain?';domain='+i.domain:'',i.secure?';secure':''].join('');}var t=3600000;exports.get=function(o){var t=e(document.cookie);return'string'===$.type(o)?t[o]:t;},exports.set=function(e,t,i){if($.isPlainObject(e))i=t,t=null;if(i=$.extend({},exports.defaultOptions,i),null===t)$.each(e,function(e,t){o(e,t,i);});else o(e,t,i);},exports.remove=function(e,t){if(null!=e)t=t||{},t.expires=-1,o(e,'',$.extend({},exports.defaultOptions,t));},exports.defaultOptions={path:'/'};}),define('teacherCenter/component/floatHelp_85ae189666',['require','exports','cobble/util/cookie'],function(require,exports){'use strict';var e=require('cobble/util/cookie'),o=function(e){var o=$(window).width(),t=$(window).height(),i=1000+(o-1000)/2+20,l=t/2-180;e.css({left:i+'px',bottom:l+'px'});};exports.init=function(){o($('#float-help')),$(window).resize(function(){o($('#float-help'));});var t=e.get('floatHelpCookie');if(void 0==t||'show'==t)$('#float-help').removeClass('float-close');else $('#float-help').addClass('float-close');$('#float-help').on('click','.help-content',function(){if($('#float-help').hasClass('float-close'))$('#float-help').removeClass('float-close'),e.set('floatHelpCookie','show');}),$('#float-help').on('click','.close',function(o){$('#float-help').addClass('float-close'),e.set('floatHelpCookie','hide'),o.stopPropagation();}),$('#float-help').show();};});