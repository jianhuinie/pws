define('cobble/util/cookie',['require','exports','module'],function(require,exports){'use strict';function e(e){if(0===e.indexOf('"'))e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');var t={};try{e=decodeURIComponent(e.replace(/\+/g,' ')),$.each(e.split(';'),function(e,i){var n=i.split('='),r=$.trim(n[0]),o=$.trim(n[1]);if(r)t[r]=o;});}catch(i){}return t;}function t(e,t,n){var r=n.expires;if($.isNumeric(r)){var o=r;r=new Date(),r.setTime(r.getTime()+o*i);}document.cookie=[encodeURIComponent(e),'=',encodeURIComponent(t),r?';expires='+r.toUTCString():'',n.path?';path='+n.path:'',n.domain?';domain='+n.domain:'',n.secure?';secure':''].join('');}var i=3600000;exports.get=function(t){var i=e(document.cookie);return'string'===$.type(t)?i[t]:i;},exports.set=function(e,i,n){if($.isPlainObject(e))n=i,i=null;if(n=$.extend({},exports.defaultOptions,n),null===i)$.each(e,function(e,i){t(e,i,n);});else t(e,i,n);},exports.remove=function(e,i){if(null!=e)i=i||{},i.expires=-1,t(e,'',$.extend({},exports.defaultOptions,i));},exports.defaultOptions={path:'/'};}),define('cobble/util/url',['require','exports','module'],function(require,exports){'use strict';exports.parseQuery=function(e){var t={};if('string'===$.type(e)&&e.length>1){var i=0,n=e.charAt(0);if('?'===n)i=1;else if('#'===n){i=1;var r=e.charAt(1);if('/'===r)i=2;}if(i>0)e=e.substr(i);$.each(e.split('&'),function(e,i){var n=i.split('=');if(2===n.length){var r=$.trim(n[0]);if(r)t[r]=decodeURIComponent($.trim(n[1]));}});}return t;},exports.getOrigin=function(e){if(!e)e=document.URL;return exports.parse(e).origin;},exports.parse=function(e){var t=document.createElement('a');t.href=e,e=t.href;var i='';if(t.protocol&&t.host)i=t.protocol+'//'+t.host;else if(/^(http[s]?:\/\/[^\/]+)(?=\/)/.test(e))i=RegExp.$1;var n=i.split(':');if(0===i.indexOf('http:')&&3===n.length&&80==n[2])n.length=2,i=n.join(':');var r=t.pathname;if(r&&'/'!==r.charAt(0))r='/'+r;return{origin:i,pathname:r,search:t.search};};}),define('common/function/getAdMonitorUrl_4b5526f5c9',['require','exports','cobble/util/url','cobble/util/cookie'],function(require){'use strict';var e,t=require('cobble/util/url'),i=require('cobble/util/cookie');return function(n,r,o){if(!n)return null;var c=n.indexOf('?'),a={};if(-1!=c)a=n.substring(c),a=t.parseQuery(a);else n+='?';if(r){if(!e)e=i.get('PHPSESSID');a.uuid=e;}if(o&&o.length>0){var u={p:a.p||'',c:o.join(',')};a=u;}var l=Math.ceil(Math.random()*Math.pow(10,13));return $.extend(a,{_:l}),a=$.param(a),n=n.replace(/\?.*$/,'?'+a);};}),define('org/search/orgAd_715554165e',['require','exports','common/service_9c322508d3','common/store_a1a35b3dfc','common/function/getAdMonitorUrl_4b5526f5c9'],function(require,exports){'use strict';function e(e){var t=$('<a target="_blank" data-click-monitor="'+(e.clickMonitor?e.clickMonitor:'')+'" href="'+(e.click?e.click:'javascript:;')+'" title="'+(e.hover?e.hover:'')+'"><img src="'+(e.material?e.material:'')+'"></a>');return t;}function t(t){if(s)u.append(e(t));else u.append(e(r));}function i(e){n(e.monitor);}function n(e){if(e){e=a(e);var t=new Image();t.src=e;}}var r,o=require('common/service_9c322508d3'),c=require('common/store_a1a35b3dfc'),a=require('common/function/getAdMonitorUrl_4b5526f5c9'),u=$('#org-ad'),l={dev:'5',test:'5',beta:'4',www:'4'},s=!1;exports.init=function(){var e=c.get('env'),a=c.get('staticOrigin'),f={};r={material:a+'/asset/img/org/ad20150420.jpg',click:'http://www.genshuixue.com/teacher/classCourseDetail?number=150410547393',hover:'带你横扫2016考研英语'};var m=c.get('sj');if(m){var p=m.split('/');if(p.length>0)m=p[p.length-1];}o.fetchadvertisement({adId:l[e],cityId:c.get('cityId'),sj:m}).done(function(n){var r=n.data;if(r[l[e]]&&r[l[e]].length>0&&r[l[e]][0].material)s=!0,f=r[l[e]][0],i(f);t(f);}).fail(function(){t(null);}),u.on('click','a',function(){var e=$(this).data('click-monitor');n(e);});};});