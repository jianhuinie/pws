define('cobble/util/cookie',['require','exports','module'],function(require,exports){'use strict';function e(e){if(0===e.indexOf('"'))e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');var t={};try{e=decodeURIComponent(e.replace(/\+/g,' ')),$.each(e.split(';'),function(e,i){var n=i.split('='),o=$.trim(n[0]),r=$.trim(n[1]);if(o)t[o]=r;});}catch(i){}return t;}function t(e,t,n){var o=n.expires;if($.isNumeric(o)){var r=o;o=new Date(),o.setTime(o.getTime()+r*i);}document.cookie=[encodeURIComponent(e),'=',encodeURIComponent(t),o?';expires='+o.toUTCString():'',n.path?';path='+n.path:'',n.domain?';domain='+n.domain:'',n.secure?';secure':''].join('');}var i=3600000;exports.get=function(t){var i=e(document.cookie);return'string'===$.type(t)?i[t]:i;},exports.set=function(e,i,n){if($.isPlainObject(e))n=i,i=null;if(n=$.extend({},exports.defaultOptions,n),null===i)$.each(e,function(e,i){t(e,i,n);});else t(e,i,n);},exports.remove=function(e,i){if(null!=e)i=i||{},i.expires=-1,t(e,'',$.extend({},exports.defaultOptions,i));},exports.defaultOptions={path:'/'};}),define('common/component/CourseSearchList_61f2be6357',['require','exports','cobble/util/cookie','common/store_a1a35b3dfc'],function(require,exports){'use strict';var e=require('cobble/util/cookie'),t=require('common/store_a1a35b3dfc');exports.init=function(){var i=$('#search-list');i.on('click','[log]',function(){var i=$(this),n='http://click.genshuixue.com/w.gif',o=i.attr('log'),r=o.split(','),c=r[0],s=r[1],a=r[2],u=r[3],l=i.data('crank'),d=i.data('number'),m=e.get('__track_id__'),p=new Date().getTime(),f=t.get('user').id?t.get('user').id:-1,h={type:'search',stype:'course',rank:c,item_id:d?d:s,tid:s,qid:a,c_rank:l?l:0,location:u,uid:m,t:p,user_id:f};WAT.send(n,h);}).on('click','.controller-more-course .see-more',function(){$(this).hide(),$(this).parent().find('.close-more').show(),$(this).parent().parent().parent().find('.course-item-list').find('.hide-start').addClass('show-start');}).on('click','.controller-more-course .close-more',function(){$(this).hide(),$(this).parent().find('.see-more').show(),$(this).parent().parent().parent().find('.course-item-list').find('.hide-start').removeClass('show-start');});};});