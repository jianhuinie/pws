define('cobble/function/contains',['require','exports','module'],function(){'use strict';return function(e,t){if(e=e.jquery?e[0]:e,t=t.jquery?t[0]:t,!e||!t)return!1;if(e===t)return!0;else return $.contains(e,t);};}),define('cobble/function/isHidden',['require','exports','module'],function(){'use strict';return function(e){e.css('display');return'none'===e.css('display')||0==e.css('opacity')||'hidden'===e.css('visibility');};}),define('cobble/function/jquerify',['require','exports','module'],function(){'use strict';function e(e){return e.faker||e.element;}var t=$.prototype,n={on:function(){return t.on.apply(e(this),arguments),this;},off:function(){return t.off.apply(e(this),arguments),this;},emit:function(n,i){var o=this,r=e(o);if(r){if(!n[$.expando])n='string'===$.type(n)?$.Event(n):$.Event(null,n);n.cobble=o;var c=[n];if(i)c.push(i);var u=o[$.camelCase('on-'+n.type)];if($.isFunction(u)&&u.apply(o,c)===!1)n.preventDefault();if(!n.isPropagationStopped())t.trigger.apply(r,c);return n;}},before:function(t){e(this).before(t);},after:function(t){e(this).after(t);},appendTo:function(t){e(this).appendTo(t);},prependTo:function(t){e(this).prependTo(t);}};return function(e){$.each(n,function(t,n){if(null==e[t])e[t]=n;});};}),define('cobble/function/lifeCycle',['require','exports'],function(require,exports){'use strict';exports.init=function(e,t){var n=e.constructor,i='__cobble__'+n.prototype.type,o=t.element;if(o&&o.data(i))e=o.data(i);else if($.extend(e,n.defaultOptions,t),e.init(),o)o.data(i,e);return e;},exports.dispose=function(e){var t='__cobble__'+e.constructor.prototype.type,n=e.element;if(n)n.removeData(t);};}),define('cobble/function/split',['require','exports','module'],function(){'use strict';return function(e,t){var n=[];return $.each(e.split(t),function(e,t){if(t=$.trim(t))n.push(t);}),n;};}),define('cobble/function/toNumber',['require','exports','module'],function(){'use strict';var e={'int':parseInt,'float':parseFloat};return function(t,n,i){if('number'!==$.type(t)){var o=e[i];if(t=o?o(t,10):+t,isNaN(t))t=n;}return t;};}),define('cobble/function/viewportHeight',['require','exports','module'],function(){'use strict';return function(){return window.innerHeight||document.documentElement.clientHeight;};}),define('cobble/helper/Popup',['require','exports','module','../function/split','../function/isHidden','../function/contains','../function/jquerify','../function/lifeCycle','../util/instance'],function(require){'use strict';function e(e){return S.init(this,e);}function t(e,t){$.each(e.showConfigList,function(n,i){i[t](e);});}function n(e,t){$.each(e.hideConfigList,function(n,i){i[t](e);});}function i(e,t){if(e)e.type=t;else e=t;return e;}function o(e){var t=e.currentTarget;return t&&'HTML'===t.tagName?null:t;}function r(e,t){return e.emit(i(t,'beforeShow'));}function c(e,i){return e.layer.data(O,o(i)),t(e,'off'),n(e,'on'),e.emit('afterShow');}function u(e,t){return e.emit(i(t,'beforeHide'));}function a(e){return e.layer.removeData(O),n(e,'off'),t(e,'on'),e.emit('afterHide');}function l(){return $.now();}function s(e){return'__'+e+'Handler__';}function f(e,t){return null==e[t];}function d(e,t){return e.layer.data(O)!==o(t);}function p(e,t,n){return!t||t(e,n);}function m(e,t){return t-e[P]>50;}function h(t,n){return function(i){var o=i.data,r=l(i);if(f(o,q)&&d(o,i)&&p(o,n,i))o[P]=r,g({popup:o,delay:o.show.delay,toggle:e.trigger.show[t].delay,timer:q,success:function(){var e=function(){o.open(i);},t=o[k];if(t)t.done(e);else e();}});};}function v(t,n){return function(i){var o=i.data,r=l(i);if(f(o,H)&&p(o,n,i)&&m(o,r))o[P]=r,o[k]=$.Deferred(),g({popup:o,delay:o.hide.delay,toggle:e.trigger.hide[t].delay,timer:H,success:function(){o.close(i),o[k].resolve();},fail:function(){o[k]=null;}});};}function g(e){var t=e.delay,n=e.success;if(t>0){var i=e.popup,o=e.timer,r=e.toggle||{},c=r.on||$.noop,u=r.off||$.noop,a=e.fail||$.noop,l=function(){clearTimeout(i[o]),u(i,s),i[o]=null;},s=function(e){var t=i[o];if(t)l();if(t&&e===P)n();else a();};c(i,s),i[o]=setTimeout(function(){s(P);},t);}else n();}function y(e){var t=this,n=t.type,i=t.handler,o=s(n);if(e[o]!==i)e.element.on(n,e.selector,e,i),e[o]=i;}function b(e){var t=this;if(!e.selector){var n=t.type;e.element.off(n,t.handler),e[s(n)]=null;}}var x=require('../function/split'),w=require('../function/isHidden'),C=require('../function/contains'),_=require('../function/jquerify'),S=require('../function/lifeCycle'),T=require('../util/instance');e.prototype={constructor:e,type:'Popup',init:function(){var i=this,o=i.showConfigList=[],r=i.hideConfigList=[],c=i.show.trigger,u=i.hide.trigger;if(c)$.each(x(c,','),function(t,n){var i=e.trigger.show[n];if(i)o.push(i);});if(u)$.each(x(i.hide.trigger,','),function(t,n){var i=e.trigger.hide[n];if(i)r.push(i);});if(i.hidden=w(i.layer))t(i,'on');else n(i,'on');},open:function(){var e=this,t=arguments[0];if(!t)e[P]=l();if(t=r(e,t),!t.isDefaultPrevented()){var n=e.layer,i=e.show.animation;if($.isFunction(i))i.call(e,n);else n.show();e.hidden=!1,c(e,t);}},close:function(){var e=this;if(!e.hidden){var t=arguments[0];if(!t)e[P]=l();if(t=u(e,t),!t.isDefaultPrevented()){var n=e.layer,i=e.hide.animation;if($.isFunction(i))i.call(e,n);else n.hide();e.hidden=!0,a(e);}}},dispose:function(){var e=this;S.dispose(e),e.close(),t(e,'off'),e.element=e.layer=null;}},_(e.prototype),e.defaultOptions={show:{trigger:'click'},hide:{trigger:'click'}};var k='__hidePromise__',q='__showTimer__',H='__hideTimer__',P='__lastTriggerTime__',O='__sourceElement__',D=function(e,t){if(!t)return!1;else return C(e.layer,t);};return e.trigger={show:{focus:{type:'focusin',handler:h('focus'),on:y,off:b},click:{type:'click',handler:h('click'),on:y,off:b},over:{type:'mouseenter',handler:h('over'),on:y,off:b,delay:{on:function(e,t){e.element.on('mouseleave',e.selector,t);},off:function(e,t){e.element.off('mouseleave',t);}}},context:{type:'contextmenu',handler:h('context'),on:y,off:b}},hide:{blur:{type:'focusout',handler:v('blur'),on:y,off:b},click:{type:'click',handler:function(){return v(this.type,function(e,t){return!D(e,t.target);});},on:function(e){var t=this;T.document.on(t.type,e,e.clickHandler=t.handler());},off:function(e){T.document.off(this.type,e.clickHandler);}},out:{type:'mouseleave',handler:v('out'),on:function(e){var t=this.type,n=this.handler;e.layer.on(t,e,n),e.element.on(t,e.selector,e,n);},off:function(e){var t=this.type,n=this.handler;e.element.off(t,n),e.layer.off(t,n);},delay:{on:function(e,t){e.element.on('mouseenter',e.selector,t),e.layer.on('mouseenter',t);},off:function(e,t){e.element.off('mouseenter',t),e.layer.off('mouseenter',t);}}},context:{type:'contextmenu',handler:function(){return v('context',function(e,t){return!D(e,t.target);});},on:function(e){var t=this;T.document.on(t.type,e,e.contextHandler=t.handler());},off:function(e){T.document.off(this.type,e.contextHandler);}}}},e;}),define('cobble/helper/Switchable',['require','exports','module','../function/jquerify','../function/lifeCycle','../function/toNumber'],function(require){'use strict';function e(e){return n.init(this,e);}var t=require('../function/jquerify'),n=require('../function/lifeCycle'),i=require('../function/toNumber');e.prototype={constructor:e,type:'Switchable',init:function(){var e=this,t=e.element,n=e.selector,c=e.items=t.find(n),u=i(e.index,r),a=e.activeClass;if(u===r&&a)u=c.index(t.find('.'+a));if(n){var l=e.trigger;if('click'===l)t.on('click'+o,n,function(){e.to(c.index(this));});else if('over'===l)t.on('mouseenter'+o,n,function(){var t=this;e.timer=setTimeout(function(){if(e.element)e.to(c.index(t));},150);}),t.on('mouseleave'+o,n,function(){if(e.timer)clearTimeout(e.timer),e.timer=null;});}if(e.index=r,u>=0)e.to(u);},to:function(e){var t=this;e=i(e,r);var n=t.index;if(e!==n){var o=t.activeClass,c=t.items;if(o){if(n>=0)c.eq(n).removeClass(o);if(e>=0)c.eq(e).addClass(o);}t.index=e,t.change({from:n,to:e});}},dispose:function(){var e=this;n.dispose(e),e.element.off(o),e.element=e.items=null;}},t(e.prototype),e.defaultOptions={index:0,trigger:'click'};var o='.cobble_helper_switchable',r=-1;return e;}),define('cobble/ui/Carousel',['require','exports','module','../function/jquerify','../function/lifeCycle','../helper/Switchable'],function(require){'use strict';function e(e){return n.init(this,e);}var t=require('../function/jquerify'),n=require('../function/lifeCycle'),i=require('../helper/Switchable');e.prototype={constructor:e,type:'Carousel',init:function(){var e=this,t=e.element,n='click'+o,r='mouseenter'+o,c='mouseleave'+o,u=e.prevSelector;if(u)t.on(n,u,$.proxy(e.prev,e));var a=e.nextSelector;if(a)t.on(n,a,$.proxy(e.next,e));var l=e.autoPlay,s=e.itemSelector;if(l&&e.pauseOnHover)t.on(r,s,$.proxy(e.pause,e)).on(c,s,$.proxy(e.play,e));if(e.minIndex=0,e.maxIndex=t.find(s).length-1-(e.showCount-1),e.switcher=new i({element:t,index:e.index,trigger:e.trigger,selector:e.iconSelector,activeClass:e.activeClass,change:function(t){e.index=t.to,e.animation(t),e.emit('change',t);}}),l)e.play();},prev:function(){var e=this,t=e.index-e.step;if(t<e.minIndex)if(e.loop)t=e.maxIndex;else return;e.to(t);},next:function(){var e=this,t=e.index+e.step;if(t>e.maxIndex)if(e.loop)t=e.minIndex;else return;e.to(t);},to:function(e){var t=this;if(t.autoPlay)t.play(e);else t.switcher.to(e);},play:function(e){var t=this;if(t.autoPlay){if(t.playing)t.pause();if(t.playing=!0,t.playTimer=setTimeout($.proxy(t.next,t),t.delay),e!==t.index&&$.isNumeric(e))t.switcher.to(e);}},pause:function(){var e=this;if(e.autoPlay)if(e.playing=!1,e.playTimer)clearTimeout(e.playTimer),e.playTimer=null;},dispose:function(){var e=this;if(n.dispose(e),e.playing)e.pause();e.element.off(o),e.switcher.dispose(),e.element=e.switcher=null;}},t(e.prototype),e.defaultOptions={index:0,step:1,delay:5000,showCount:1,trigger:'over',loop:!0,autoPlay:!0,pauseOnHover:!0};var o='.cobble_ui_carousel';return e;}),define('cobble/util/cookie',['require','exports','module'],function(require,exports){'use strict';function e(e){if(0===e.indexOf('"'))e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');var t={};try{e=decodeURIComponent(e.replace(/\+/g,' ')),$.each(e.split(';'),function(e,n){var i=n.split('='),o=$.trim(i[0]),r=$.trim(i[1]);if(o)t[o]=r;});}catch(n){}return t;}function t(e,t,i){var o=i.expires;if($.isNumeric(o)){var r=o;o=new Date(),o.setTime(o.getTime()+r*n);}document.cookie=[encodeURIComponent(e),'=',encodeURIComponent(t),o?';expires='+o.toUTCString():'',i.path?';path='+i.path:'',i.domain?';domain='+i.domain:'',i.secure?';secure':''].join('');}var n=3600000;exports.get=function(t){var n=e(document.cookie);return'string'===$.type(t)?n[t]:n;},exports.set=function(e,n,i){if($.isPlainObject(e))i=n,n=null;if(i=$.extend({},exports.defaultOptions,i),null===n)$.each(e,function(e,n){t(e,n,i);});else t(e,n,i);},exports.remove=function(e,n){if(null!=e)n=n||{},n.expires=-1,t(e,'',$.extend({},exports.defaultOptions,n));},exports.defaultOptions={path:'/'};}),define('cobble/util/instance',['require','exports','module'],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body);}),define('activity/privilege_df27324936',['require','exports','cobble/helper/Popup','common/component/Slider_e976f1c044','common/bindScroll_f2ce0a166a','common/lazyImage_92160e3789','common/component/ClickMonitor_2ea1c7c842','common/store_a1a35b3dfc','cobble/util/cookie'],function(require,exports){'use strict';function e(){new o({element:$('.promotion-slider-container'),itemSelector:'.promotion-slideritem',iconSelector:'.promotion-slider-navitem',prevSelector:'.promotion-slider-left',nextSelector:'.promotion-slider-right',duration:150,onChange:function(e,t){var n=$('.promotion-slideritem[data-index="'+t.to+'"]',this.element);if(n.addClass('active'),t.from>=0)$('.promotion-slideritem[data-index="'+t.from+'"]',this.element).removeClass('active');}});}function t(e,t){for(var n=$(e).find('.course-link-wrapper'),i='',o=0;o<n.length;o++){var r=$(n[o]);i+=r.attr('data-number')+',';}i=i.substr(0,i.length-1);var c='http://click.genshuixue.com/sl.gif',u={type:'search',stype:t,qid:a.get('log_id'),data:i};WAT.send(c,u);}function n(){t('#live-course','juhuixue_1'),t('#video-course','juhuixue_2'),t('#offline-course','juhuixue_3'),t('#one2one-course','juhuixue_4');var e=$(document.body);e.on('click','[data-stype]',function(){var e=$(this),t=e.attr('data-stype'),n=e.data('number'),i=l.get('PHPSESSID'),o='http://click.genshuixue.com/w.gif',r=new Date().getTime(),c=a.get('user').id?a.get('user').id:-1,u=e.parent().attr('data-index'),s={type:'search',stype:t,qid:a.get('log_id'),uid:i?i:'',t:r,user_id:c,item_id:n.split(',')[0],item_type:n.split(',')[1],rank:u};WAT.send(o,s);});}function i(){var e=$('#header'),t=$('#banner'),n=$('#site-nav').height(),i=e.height(),o=[],c=!0,u=function(e,t){for(var n,i=t.length;i--&&(n=t[i],!(e>=n.offsetTop)););n.nav.addClass('active').siblings().removeClass('active');},a=function(){var i=$(window).scrollTop();if(i>=n)e.addClass('nav-fixed'),t.addClass('fixed-nav');else e.removeClass('nav-fixed'),t.removeClass('fixed-nav');c&&u(i,o);};$('.privilege-nav .privilege-nav-item',e).each(function(){o.push({offsetTop:$($('a',this).attr('href')).offset().top-i,nav:$(this)});}),r(window,a),a(),e.on('click','.privilege-nav-item',function(e){e.preventDefault(),c=!1,$(this).addClass('active').siblings().removeClass('active');var t=$($(this).find('a').attr('href')).offset().top;t-=i,setTimeout(function(){$('html, body').stop().animate({scrollTop:t+'px'},1000,function(){c=!0;});},0);});}var o=(require('cobble/helper/Popup'),require('common/component/Slider_e976f1c044')),r=require('common/bindScroll_f2ce0a166a'),c=require('common/lazyImage_92160e3789'),u=require('common/component/ClickMonitor_2ea1c7c842'),a=require('common/store_a1a35b3dfc'),l=require('cobble/util/cookie');exports.init=function(){e(),i(),n(),c.init();new u({monitorUrl:'',isSend:!1,useDataHref:!0});$('.class-list li button').click(function(){return $(this).parents('.pay-button').click(),!1;});};}),define('common/bindScroll_f2ce0a166a',function(){'use strict';var e=function(e,t){return e===t.target||e===window&&t.target===document;},t=function(e){for(;e.length>1;)clearTimeout(e.shift());};return function(n,i,o,r){var c=[],u=null,a=$(n);if(n=a[0],isNaN(o)||0>o)if(r)u=i;else u=function(t){if(e(n,t))i(t);};else if(r)u=function(e){c.push(setTimeout(function(){t(c),i(e);},o));};else u=function(r){c.push(setTimeout(function(){if(t(c),e(n,r))i(r);},o));};a.scroll(u);};}),define('common/component/ClickMonitor_2ea1c7c842',function(){function e(t){$.extend(this,e.defaultOptions,t),this.init();}var t=function(){};return e.defaultOptions={selector:'[data-click-monitor="1"]',monitorUrl:'http://click.genshuixue.com/',defaultParams:{},useDataHref:!0,isSend:!0,interceptor:t},e.prototype.setInterceptor=function(e){this.interceptor=e;},e.prototype.init=function(){var e=this;$(document).on('click',e.selector,function(){var t=$(this),n=e.useDataHref?t.data('href'):'',i={};if(e.interceptor)i=e.interceptor(t);if(e.isSend&&e.monitorUrl)WAT.send(e.monitorUrl,$.extend({},e.defaultParams,i));else console.log($.extend({},e.defaultParams,i));if(n&&window.open(n,'_blank'),e.useDataHref)return!1;else return void 0;});},e;}),define('common/component/Slider_e976f1c044',['require','exports','module','cobble/ui/Carousel'],function(require){'use strict';function e(t){$.extend(this,e.defaultOptions,t),this.init();}var t=require('cobble/ui/Carousel');return e.prototype={constructor:e,init:function(){{var e,n=this,i=n.element,o=n.itemSelector,r=i.find(o),c=r.parent(),u=r.length,a=2,l=u+a,s=r.eq(0),f=r.eq(u-1),d=s.width(),p=s.height(),m=0,h=!n.isVertical?function(){c.css('left',-1*e*d);}:function(){c.css('top',-1*e*p);};new t({element:i,itemSelector:o,iconSelector:n.iconSelector,prevSelector:n.prevSelector,nextSelector:n.nextSelector,activeClass:'active',trigger:n.trigger,loop:n.loop,delay:n.delay,autoPlay:n.autoPlay,pauseOnHover:!0,onChange:n.onChange,animation:function(t){var i=t.to,o=t.from;if(!(0>o)){if(m>0)if(c.stop(),e>-1)h();{var r;this.element;}if(0===i&&o===u-1)r=l-1,e=1;else if(!n.scrollOneDirection&&i===u-1&&0===o)r=0,e=l-a;else r=i+1,e=-1;m++,c.animate(n.isVertical?{top:-1*r*p}:{left:-1*r*d},this.duration,'easeOutQuad',function(){if(m--,e>-1)h();});}}});}if(s=s.clone(),f=f.clone(),c.prepend(f),c.append(s),!n.isVertical)c.css({width:l*d,left:-1*d});else c.css({height:l*p,top:-1*p});}},e.defaultOptions={duration:300,trigger:'click',isVertical:!1,scrollOneDirection:!1,loop:!0,delay:5000},e;}),define('common/lazyImage_92160e3789',['require','common/bindScroll_f2ce0a166a','cobble/util/instance','cobble/function/viewportHeight'],function(require){'use strict';function e(e){if(!e.prop('loading'))e.prop('loading',!0).addClass('img-loading');}function t(e){for(var t=e.height();!t;)e=e.parent(),t=e.height();return t;}var n=require('common/bindScroll_f2ce0a166a'),i=require('cobble/util/instance'),o=require('cobble/function/viewportHeight'),r=i.window,c=i.body,u=0,a=null,exports={init:function(e){n(e||r,exports.scanning,u),exports.scanning(!0),setTimeout(function(){r.scroll();},0);},scanning:function(n,i){var u=o(),l=r.scrollTop(),s=l+u;if(n)i=i?$(i):c,a=i.find('img[data-src]');a.each(function(){var n=$(this),i=n.offset().top,o=t(n);if(s>=i-o-u&&i+o+u>=l){if(!n.prop('loaded'))n.prop('src',n.data('src')).prop('loaded',!0).removeAttr('data-src').removeClass('img-loading');}else e(n);});var f=i.find('iframe'),d=f.length;if(d)for(var p,m=0;d>m;m++){var h=f[m],v=$(h).offset();p=$(f[m].contentWindow.document).find('img[data-src]'),p.each(function(){var n=$(this),i=n.offset().top+v.top,o=t(n);if(s>=i&&i+o+u>=l){if(!n.prop('loaded'))n.prop('src',n.data('src')).prop('loaded',!0).removeAttr('data-src').removeClass('img-loading');}else e(n);});}}};return exports;});