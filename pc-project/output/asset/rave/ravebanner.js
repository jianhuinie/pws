define('cobble/util/cookie',['require','exports','module'],function(require,exports){'use strict';function e(e){if(0===e.indexOf('"'))e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');var t={};try{e=decodeURIComponent(e.replace(/\+/g,' ')),$.each(e.split(';'),function(e,n){var i=n.split('='),o=$.trim(i[0]),r=$.trim(i[1]);if(o)t[o]=r;});}catch(n){}return t;}function t(e,t,i){var o=i.expires;if($.isNumeric(o)){var r=o;o=new Date(),o.setTime(o.getTime()+r*n);}document.cookie=[encodeURIComponent(e),'=',encodeURIComponent(t),o?';expires='+o.toUTCString():'',i.path?';path='+i.path:'',i.domain?';domain='+i.domain:'',i.secure?';secure':''].join('');}var n=3600000;exports.get=function(t){var n=e(document.cookie);return'string'===$.type(t)?n[t]:n;},exports.set=function(e,n,i){if($.isPlainObject(e))i=n,n=null;if(i=$.extend({},exports.defaultOptions,i),null===n)$.each(e,function(e,n){t(e,n,i);});else t(e,n,i);},exports.remove=function(e,n){if(null!=e)n=n||{},n.expires=-1,t(e,'',$.extend({},exports.defaultOptions,n));},exports.defaultOptions={path:'/'};}),define('rave/ravebanner',['require','exports','./round_663734b57f','common/service_9c322508d3','common/store_a1a35b3dfc','cobble/util/cookie'],function(require,exports){var e=require('./round_663734b57f'),t=require('common/service_9c322508d3'),n=require('common/store_a1a35b3dfc'),i=require('cobble/util/cookie'),o='raveshowtimes',r='activity_birthday_banner_status',s='activity_birthday_url_main',a='activity_birthday_url_sub',c='no_need_animate',u=function(e){$('#flotage-bottom')[e](),$('#flotage-middle')[e](),$('#flotage-top')[e](),$('.im-toggle-bar')[e]();},d=function(){var t=$('#ravebanner'),r=i.get(s)||t.data('href'),d=i.get(o)||0,p=n.get(c)||!1;if(+d>=3||p)return!1;else i.set(o,+d+1,{domain:'.genshuixue.com',path:'/'});u('hide'),setTimeout(function(){t.css('height','45px'),t.removeClass('hiderave'),t.animate({height:'1200px'},2000,function(){$('.main-wrapper',this).show();});},0);var f=new e({element:$('#raveRound')});f.bindHost(i.get(a)||r+'/sub?'),setTimeout(function(){t.animate({height:'54px'},1000,function(){$('.main-wrapper',this).hide(),$(this).addClass('hiderave');}),u('show');},3000);},p=function(){var e=$('#ravebanner'),t=i.get(s)||e.data('href');e.click(function(e){var n=t,i=$(e.target);if(i.hasClass('anchor'))n+=i.attr('href');window.open('http://www.genshuixue.com/track/source?id=gsx_616dafuceng_pc&url='+encodeURIComponent(n),'_blank');}),$('#ravebanner .banner-img').click(function(){if('/'==window.location.pathname)window.open('http://www.genshuixue.com/track/source?id=gsx_616shouyebanner_pc&url='+encodeURIComponent(t),'_blank');else window.open('http://www.genshuixue.com/track/source?id=gsx_616xiding_pc&url='+encodeURIComponent(t),'_blank');return!1;}),$('#ravebanner > .icon-close').click(function(){return e.remove(),!1;});};exports.init=function(){var e=$('#ravebanner'),n=i.get(r);if(e.length<=0)return!1;if(1==n)e.show(),p(),d();else if('undefined'!=typeof n)return!1;else t.setActicityCookies().done(function(){if(n=i.get(r),1==n)e.show(),p(),d();});};}),define('rave/round_663734b57f',['require','exports','common/store_a1a35b3dfc'],function(require){function e(e){if(!e||!e.element)return null;else return this.options=$.extend({},e),void this.init();}function t(e){if(this.rotating)return!1;var t=this.roundItems,i=t.length,o=this;if(o.rotating=!0,o.clockwise)for(;e--;)t.push(t.shift());else for(;e--;)t.unshift(t.pop());for(var r=0;i>r;r++)n(t[r],s[r],600,function(e){return function(){var n=t[e];if(2==e)n.removeClass('disabled');else n.addClass('disabled');if(n.data('index',e),e===i-1)o.rotating=!1;};}(r));}function n(e,t,n,i){var o=e[0].style,r={},s={},a=60,c=Math.ceil(n/a),u=1,d=function(e){var n,i={};for(var o in t)if(n=r[o],end=parseInt(t[o]),c>e)i[o]=n+s[o]*e+('z-index'===o?'':'px');else i[o]=end+('z-index'===o?'':'px');return i;},p=function(t){var n=d(t);e.css(n);},f=function(){setTimeout(function(){if(c>=u)p(u++),f();else i&&i();},a);};for(var h in t)r[h]=parseInt(o[h]),s[h]=(parseInt(t[h])-r[h])/c;f();}function i(){var e=this;this.options.element.find('.round-prev').on('click','.icon',function(){return e.clockwise=!0,e.rotate(1),!1;}),this.options.element.find('.round-next').on('click','.icon',function(){return e.clockwise=!1,e.rotate(1),!1;}),this.options.element.on('click','.round-item',function(){var t=$(this),n=$(this).data('key'),i={dxzc:'gsx_daxue_pc',xcgzc:'gsx_zhongxiao_pc',bpsjb:'gsx_baopin_pc',lxzc:'gsx_chuguo_pc',ysxqzc:'gsx_yishu_pc'};if(t.hasClass('disabled')){var o=t.data('index')-2;e.clockwise=o>0,e.rotate(Math.abs(o));}else window.open('http://www.genshuixue.com/track/source?id='+i[n]+'&url='+encodeURIComponent(e.host+'subject='+n),'_blank');return!1;});}function o(){var e=['first','second','third','four','five'];this.clockwise=!1,this.rotating=!1;var t=this.roundItems=[];$.each($(this.options.element.find('.round-item')),function(n,i){t.push($(i).css(s[n]).removeClass(e[n]));}),this.bindEvents();}function r(e){this.host=e||'';}var s=(require('common/store_a1a35b3dfc'),[{width:'204px',height:'284px',left:'48px',top:'68px','font-size':'17px','z-index':40},{width:'246px',height:'348px',left:'200px',top:'30px','font-size':'20px','z-index':70},{width:'295px',height:'420px',left:'384px',top:'0px','font-size':'24px','z-index':100},{width:'246px',height:'348px',left:'616px',top:'30px','font-size':'20px','z-index':70},{width:'204px',height:'284px',left:'810px',top:'68px','font-size':'17px','z-index':40}]);return e.prototype={constructor:e,init:o,bindEvents:i,rotate:t,bindHost:r},e;});