define('cobble/function/jquerify',['require','exports','module'],function(){'use strict';function e(e){return e.faker||e.element;}var t=$.prototype,i={on:function(){return t.on.apply(e(this),arguments),this;},off:function(){return t.off.apply(e(this),arguments),this;},emit:function(i,n){var o=this,r=e(o);if(r){if(!i[$.expando])i='string'===$.type(i)?$.Event(i):$.Event(null,i);i.cobble=o;var c=[i];if(n)c.push(n);var l=o[$.camelCase('on-'+i.type)];if($.isFunction(l)&&l.apply(o,c)===!1)i.preventDefault();if(!i.isPropagationStopped())t.trigger.apply(r,c);return i;}},before:function(t){e(this).before(t);},after:function(t){e(this).after(t);},appendTo:function(t){e(this).appendTo(t);},prependTo:function(t){e(this).prependTo(t);}};return function(e){$.each(i,function(t,i){if(null==e[t])e[t]=i;});};}),define('cobble/function/lifeCycle',['require','exports'],function(require,exports){'use strict';exports.init=function(e,t){var i=e.constructor,n='__cobble__'+i.prototype.type,o=t.element;if(o&&o.data(n))e=o.data(n);else if($.extend(e,i.defaultOptions,t),e.init(),o)o.data(n,e);return e;},exports.dispose=function(e){var t='__cobble__'+e.constructor.prototype.type,i=e.element;if(i)i.removeData(t);};}),define('cobble/function/pageScrollTop',['require','exports','module'],function(){'use strict';return function(){return Math.max(document.body.scrollTop,document.documentElement.scrollTop);};}),define('cobble/function/toNumber',['require','exports','module'],function(){'use strict';var e={'int':parseInt,'float':parseFloat};return function(t,i,n){if('number'!==$.type(t)){var o=e[n];if(t=o?o(t,10):+t,isNaN(t))t=i;}return t;};}),define('cobble/function/viewportWidth',['require','exports','module'],function(){'use strict';return function(){return window.innerWidth||document.documentElement.clientWidth;};}),define('cobble/helper/Switchable',['require','exports','module','../function/jquerify','../function/lifeCycle','../function/toNumber'],function(require){'use strict';function e(e){return i.init(this,e);}var t=require('../function/jquerify'),i=require('../function/lifeCycle'),n=require('../function/toNumber');e.prototype={constructor:e,type:'Switchable',init:function(){var e=this,t=e.element,i=e.selector,c=e.items=t.find(i),l=n(e.index,r),u=e.activeClass;if(l===r&&u)l=c.index(t.find('.'+u));if(i){var a=e.trigger;if('click'===a)t.on('click'+o,i,function(){e.to(c.index(this));});else if('over'===a)t.on('mouseenter'+o,i,function(){var t=this;e.timer=setTimeout(function(){if(e.element)e.to(c.index(t));},150);}),t.on('mouseleave'+o,i,function(){if(e.timer)clearTimeout(e.timer),e.timer=null;});}if(e.index=r,l>=0)e.to(l);},to:function(e){var t=this;e=n(e,r);var i=t.index;if(e!==i){var o=t.activeClass,c=t.items;if(o){if(i>=0)c.eq(i).removeClass(o);if(e>=0)c.eq(e).addClass(o);}t.index=e,t.change({from:i,to:e});}},dispose:function(){var e=this;i.dispose(e),e.element.off(o),e.element=e.items=null;}},t(e.prototype),e.defaultOptions={index:0,trigger:'click'};var o='.cobble_helper_switchable',r=-1;return e;}),define('cobble/ui/Carousel',['require','exports','module','../function/jquerify','../function/lifeCycle','../helper/Switchable'],function(require){'use strict';function e(e){return i.init(this,e);}var t=require('../function/jquerify'),i=require('../function/lifeCycle'),n=require('../helper/Switchable');e.prototype={constructor:e,type:'Carousel',init:function(){var e=this,t=e.element,i='click'+o,r='mouseenter'+o,c='mouseleave'+o,l=e.prevSelector;if(l)t.on(i,l,$.proxy(e.prev,e));var u=e.nextSelector;if(u)t.on(i,u,$.proxy(e.next,e));var a=e.autoPlay,s=e.itemSelector;if(a&&e.pauseOnHover)t.on(r,s,$.proxy(e.pause,e)).on(c,s,$.proxy(e.play,e));if(e.minIndex=0,e.maxIndex=t.find(s).length-1-(e.showCount-1),e.switcher=new n({element:t,index:e.index,trigger:e.trigger,selector:e.iconSelector,activeClass:e.activeClass,change:function(t){e.index=t.to,e.animation(t),e.emit('change',t);}}),a)e.play();},prev:function(){var e=this,t=e.index-e.step;if(t<e.minIndex)if(e.loop)t=e.maxIndex;else return;e.to(t);},next:function(){var e=this,t=e.index+e.step;if(t>e.maxIndex)if(e.loop)t=e.minIndex;else return;e.to(t);},to:function(e){var t=this;if(t.autoPlay)t.play(e);else t.switcher.to(e);},play:function(e){var t=this;if(t.autoPlay){if(t.playing)t.pause();if(t.playing=!0,t.playTimer=setTimeout($.proxy(t.next,t),t.delay),e!==t.index&&$.isNumeric(e))t.switcher.to(e);}},pause:function(){var e=this;if(e.autoPlay)if(e.playing=!1,e.playTimer)clearTimeout(e.playTimer),e.playTimer=null;},dispose:function(){var e=this;if(i.dispose(e),e.playing)e.pause();e.element.off(o),e.switcher.dispose(),e.element=e.switcher=null;}},t(e.prototype),e.defaultOptions={index:0,step:1,delay:5000,showCount:1,trigger:'over',loop:!0,autoPlay:!0,pauseOnHover:!0};var o='.cobble_ui_carousel';return e;}),define('cobble/util/cookie',['require','exports','module'],function(require,exports){'use strict';function e(e){if(0===e.indexOf('"'))e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');var t={};try{e=decodeURIComponent(e.replace(/\+/g,' ')),$.each(e.split(';'),function(e,i){var n=i.split('='),o=$.trim(n[0]),r=$.trim(n[1]);if(o)t[o]=r;});}catch(i){}return t;}function t(e,t,n){var o=n.expires;if($.isNumeric(o)){var r=o;o=new Date(),o.setTime(o.getTime()+r*i);}document.cookie=[encodeURIComponent(e),'=',encodeURIComponent(t),o?';expires='+o.toUTCString():'',n.path?';path='+n.path:'',n.domain?';domain='+n.domain:'',n.secure?';secure':''].join('');}var i=3600000;exports.get=function(t){var i=e(document.cookie);return'string'===$.type(t)?i[t]:i;},exports.set=function(e,i,n){if($.isPlainObject(e))n=i,i=null;if(n=$.extend({},exports.defaultOptions,n),null===i)$.each(e,function(e,i){t(e,i,n);});else t(e,i,n);},exports.remove=function(e,i){if(null!=e)i=i||{},i.expires=-1,t(e,'',$.extend({},exports.defaultOptions,i));},exports.defaultOptions={path:'/'};}),define('common/bindScroll_f2ce0a166a',function(){'use strict';var e=function(e,t){return e===t.target||e===window&&t.target===document;},t=function(e){for(;e.length>1;)clearTimeout(e.shift());};return function(i,n,o,r){var c=[],l=null,u=$(i);if(i=u[0],isNaN(o)||0>o)if(r)l=n;else l=function(t){if(e(i,t))n(t);};else if(r)l=function(e){c.push(setTimeout(function(){t(c),n(e);},o));};else l=function(r){c.push(setTimeout(function(){if(t(c),e(i,r))n(r);},o));};u.scroll(l);};}),define('common/component/Slider_e976f1c044',['require','exports','module','cobble/ui/Carousel'],function(require){'use strict';function e(t){$.extend(this,e.defaultOptions,t),this.init();}var t=require('cobble/ui/Carousel');return e.prototype={constructor:e,init:function(){{var e,i=this,n=i.element,o=i.itemSelector,r=n.find(o),c=r.parent(),l=r.length,u=2,a=l+u,s=r.eq(0),f=r.eq(l-1),p=s.width(),d=s.height(),m=0,h=!i.isVertical?function(){c.css('left',-1*e*p);}:function(){c.css('top',-1*e*d);};new t({element:n,itemSelector:o,iconSelector:i.iconSelector,prevSelector:i.prevSelector,nextSelector:i.nextSelector,activeClass:'active',trigger:i.trigger,loop:i.loop,delay:i.delay,autoPlay:i.autoPlay,pauseOnHover:!0,onChange:i.onChange,animation:function(t){var n=t.to,o=t.from;if(!(0>o)){if(m>0)if(c.stop(),e>-1)h();{var r;this.element;}if(0===n&&o===l-1)r=a-1,e=1;else if(!i.scrollOneDirection&&n===l-1&&0===o)r=0,e=a-u;else r=n+1,e=-1;m++,c.animate(i.isVertical?{top:-1*r*d}:{left:-1*r*p},this.duration,'easeOutQuad',function(){if(m--,e>-1)h();});}}});}if(s=s.clone(),f=f.clone(),c.prepend(f),c.append(s),!i.isVertical)c.css({width:a*p,left:-1*p});else c.css({height:a*d,top:-1*d});}},e.defaultOptions={duration:300,trigger:'click',isVertical:!1,scrollOneDirection:!1,loop:!0,delay:5000},e;}),define('life/index_59d4be275b',['require','exports','common/component/Slider_e976f1c044','cobble/function/viewportWidth','../social/common/backTop_2714a76f26','common/store_a1a35b3dfc','cobble/util/cookie','cobble/function/pageScrollTop'],function(require,exports){function e(e){var i=$('.promotion-slider-container',e);return new t({element:i,itemSelector:'.promotion-slider-item',iconSelector:'.promotion-slider-navitem',prevSelector:'.promotion-slider-left',nextSelector:'.promotion-slider-right',duration:1500});}var t=require('common/component/Slider_e976f1c044'),i=require('cobble/function/viewportWidth'),n=require('../social/common/backTop_2714a76f26'),o=(require('common/store_a1a35b3dfc'),require('cobble/util/cookie'),require('cobble/function/pageScrollTop')),r=$('#know'),c=function(){var e=i(),t=r.find('.slider-img'),n=0;if(1920>e)var n=-(1920-e)+'px';t.css({marginLeft:n});};exports.init=function(){$('.float-consult');c(),$(window).resize(c),n.init(),modHolder=$(this);var t=modHolder.find('#banner');e(t);for(var i=r.find('.price'),l=0;5>l;l++)if('免费'==i.eq(l).html())i.eq(l).addClass('free');r.on('mouseover','.pic',function(){var e=$(this),t=e.find('.hidedesc'),i=e.find('.hide-mode');i.show(),t.show();}).on('mouseout','.pic',function(){var e=$(this),t=e.find('.hidedesc'),i=e.find('.hide-mode');i.hide(),t.hide();}),$('body').on('mouseenter','.back-top',function(){var e=$(this);e.addClass('back');var t=e.find('.back-img');t.show();}).on('mouseleave','.back-top',function(){var e=$(this);e.removeClass('back');var t=e.find('.back-img');t.hide();});var u=$('.nav-wrapper'),a=(u.offset().top,o(),function(){u.addClass('fixed'),r.css('marginTop','70px');}),s=function(){u.removeClass('fixed'),r.css('marginTop','0');},f=30,p=function(){if(o()>f)a();else s();};p(),$(window).scroll(p);};}),define('social/common/backTop_2714a76f26',['require','exports','common/bindScroll_f2ce0a166a','cobble/function/pageScrollTop'],function(require,exports){var e=require('common/bindScroll_f2ce0a166a'),t=require('cobble/function/pageScrollTop');exports.init=function(i){var n=!1;if(i=i||$('.back-top'),!i||!i.length)return!1;else return i.click(function(){var e=i;n=!0,e.animate({bottom:'1000px'},700,function(){e.hide(),e.css('bottom','');}),$('html, body').animate({scrollTop:'0px'},550,function(){n=!1;});}),void e(window,function(){if(n)return!1;var e=t();if(e>500)i.show();else i.hide();});};});