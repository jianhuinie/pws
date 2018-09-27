define('cobble/function/contains',['require','exports','module'],function(){'use strict';return function(e,n){if(e=e.jquery?e[0]:e,n=n.jquery?n[0]:n,!e||!n)return!1;if(e===n)return!0;else return $.contains(e,n);};}),define('cobble/function/isHidden',['require','exports','module'],function(){'use strict';return function(e){e.css('display');return'none'===e.css('display')||0==e.css('opacity')||'hidden'===e.css('visibility');};}),define('cobble/function/jquerify',['require','exports','module'],function(){'use strict';function e(e){return e.faker||e.element;}var n=$.prototype,t={on:function(){return n.on.apply(e(this),arguments),this;},off:function(){return n.off.apply(e(this),arguments),this;},emit:function(t,o){var i=this,r=e(i);if(r){if(!t[$.expando])t='string'===$.type(t)?$.Event(t):$.Event(null,t);t.cobble=i;var c=[t];if(o)c.push(o);var u=i[$.camelCase('on-'+t.type)];if($.isFunction(u)&&u.apply(i,c)===!1)t.preventDefault();if(!t.isPropagationStopped())n.trigger.apply(r,c);return t;}},before:function(n){e(this).before(n);},after:function(n){e(this).after(n);},appendTo:function(n){e(this).appendTo(n);},prependTo:function(n){e(this).prependTo(n);}};return function(e){$.each(t,function(n,t){if(null==e[n])e[n]=t;});};}),define('cobble/function/lifeCycle',['require','exports'],function(require,exports){'use strict';exports.init=function(e,n){var t=e.constructor,o='__cobble__'+t.prototype.type,i=n.element;if(i&&i.data(o))e=i.data(o);else if($.extend(e,t.defaultOptions,n),e.init(),i)i.data(o,e);return e;},exports.dispose=function(e){var n='__cobble__'+e.constructor.prototype.type,t=e.element;if(t)t.removeData(n);};}),define('cobble/function/split',['require','exports','module'],function(){'use strict';return function(e,n){var t=[];return $.each(e.split(n),function(e,n){if(n=$.trim(n))t.push(n);}),t;};}),define('cobble/helper/Popup',['require','exports','module','../function/split','../function/isHidden','../function/contains','../function/jquerify','../function/lifeCycle','../util/instance'],function(require){'use strict';function e(e){return k.init(this,e);}function n(e,n){$.each(e.showConfigList,function(t,o){o[n](e);});}function t(e,n){$.each(e.hideConfigList,function(t,o){o[n](e);});}function o(e,n){if(e)e.type=n;else e=n;return e;}function i(e){var n=e.currentTarget;return n&&'HTML'===n.tagName?null:n;}function r(e,n){return e.emit(o(n,'beforeShow'));}function c(e,o){return e.layer.data(L,i(o)),n(e,'off'),t(e,'on'),e.emit('afterShow');}function u(e,n){return e.emit(o(n,'beforeHide'));}function f(e){return e.layer.removeData(L),t(e,'off'),n(e,'on'),e.emit('afterHide');}function a(){return $.now();}function l(e){return'__'+e+'Handler__';}function s(e,n){return null==e[n];}function d(e,n){return e.layer.data(L)!==i(n);}function p(e,n,t){return!n||n(e,t);}function m(e,n){return n-e[D]>50;}function h(n,t){return function(o){var i=o.data,r=a(o);if(s(i,H)&&d(i,o)&&p(i,t,o))i[D]=r,v({popup:i,delay:i.show.delay,toggle:e.trigger.show[n].delay,timer:H,success:function(){var e=function(){i.open(o);},n=i[C];if(n)n.done(e);else e();}});};}function y(n,t){return function(o){var i=o.data,r=a(o);if(s(i,P)&&p(i,t,o)&&m(i,r))i[D]=r,i[C]=$.Deferred(),v({popup:i,delay:i.hide.delay,toggle:e.trigger.hide[n].delay,timer:P,success:function(){i.close(o),i[C].resolve();},fail:function(){i[C]=null;}});};}function v(e){var n=e.delay,t=e.success;if(n>0){var o=e.popup,i=e.timer,r=e.toggle||{},c=r.on||$.noop,u=r.off||$.noop,f=e.fail||$.noop,a=function(){clearTimeout(o[i]),u(o,l),o[i]=null;},l=function(e){var n=o[i];if(n)a();if(n&&e===D)t();else f();};c(o,l),o[i]=setTimeout(function(){l(D);},n);}else t();}function g(e){var n=this,t=n.type,o=n.handler,i=l(t);if(e[i]!==o)e.element.on(t,e.selector,e,o),e[i]=o;}function _(e){var n=this;if(!e.selector){var t=n.type;e.element.off(t,n.handler),e[l(t)]=null;}}var b=require('../function/split'),w=require('../function/isHidden'),x=require('../function/contains'),T=require('../function/jquerify'),k=require('../function/lifeCycle'),q=require('../util/instance');e.prototype={constructor:e,type:'Popup',init:function(){var o=this,i=o.showConfigList=[],r=o.hideConfigList=[],c=o.show.trigger,u=o.hide.trigger;if(c)$.each(b(c,','),function(n,t){var o=e.trigger.show[t];if(o)i.push(o);});if(u)$.each(b(o.hide.trigger,','),function(n,t){var o=e.trigger.hide[t];if(o)r.push(o);});if(o.hidden=w(o.layer))n(o,'on');else t(o,'on');},open:function(){var e=this,n=arguments[0];if(!n)e[D]=a();if(n=r(e,n),!n.isDefaultPrevented()){var t=e.layer,o=e.show.animation;if($.isFunction(o))o.call(e,t);else t.show();e.hidden=!1,c(e,n);}},close:function(){var e=this;if(!e.hidden){var n=arguments[0];if(!n)e[D]=a();if(n=u(e,n),!n.isDefaultPrevented()){var t=e.layer,o=e.hide.animation;if($.isFunction(o))o.call(e,t);else t.hide();e.hidden=!0,f(e);}}},dispose:function(){var e=this;k.dispose(e),e.close(),n(e,'off'),e.element=e.layer=null;}},T(e.prototype),e.defaultOptions={show:{trigger:'click'},hide:{trigger:'click'}};var C='__hidePromise__',H='__showTimer__',P='__hideTimer__',D='__lastTriggerTime__',L='__sourceElement__',j=function(e,n){if(!n)return!1;else return x(e.layer,n);};return e.trigger={show:{focus:{type:'focusin',handler:h('focus'),on:g,off:_},click:{type:'click',handler:h('click'),on:g,off:_},over:{type:'mouseenter',handler:h('over'),on:g,off:_,delay:{on:function(e,n){e.element.on('mouseleave',e.selector,n);},off:function(e,n){e.element.off('mouseleave',n);}}},context:{type:'contextmenu',handler:h('context'),on:g,off:_}},hide:{blur:{type:'focusout',handler:y('blur'),on:g,off:_},click:{type:'click',handler:function(){return y(this.type,function(e,n){return!j(e,n.target);});},on:function(e){var n=this;q.document.on(n.type,e,e.clickHandler=n.handler());},off:function(e){q.document.off(this.type,e.clickHandler);}},out:{type:'mouseleave',handler:y('out'),on:function(e){var n=this.type,t=this.handler;e.layer.on(n,e,t),e.element.on(n,e.selector,e,t);},off:function(e){var n=this.type,t=this.handler;e.element.off(n,t),e.layer.off(n,t);},delay:{on:function(e,n){e.element.on('mouseenter',e.selector,n),e.layer.on('mouseenter',n);},off:function(e,n){e.element.off('mouseenter',n),e.layer.off('mouseenter',n);}}},context:{type:'contextmenu',handler:function(){return y('context',function(e,n){return!j(e,n.target);});},on:function(e){var n=this;q.document.on(n.type,e,e.contextHandler=n.handler());},off:function(e){q.document.off(this.type,e.contextHandler);}}}},e;}),define('cobble/util/instance',['require','exports','module'],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body);}),define('information/infoDetail/comment_4330fa0091',['require','exports','cobble/helper/Popup','common/service_9c322508d3','common/store_a1a35b3dfc'],function(require,exports){'use strict';function e(){return t.getTeacherCommentList({teacherId:o.get('teacherId'),page:o.get('page'),pageSize:10,face:o.get('face'),comment:o.get('comment')}).done(function(e){if(0===e.code){var t=e.data,r=t.tpl;if(!o.get('face')&&0===t.comment_nav.score.comment_type.all)i.find('.overview').hide(),i.find('.tab-nav').hide();else i.find('.overview').html(r.comment_overview),i.find('.tab-nav').html(r.comment_nav);i.find('.nav-content').html(r.comment_list);var c=i.find('.nav-item-all'),u=c.find('i');new n({element:c,layer:i.find('.nav-list'),show:{trigger:'over',delay:100},hide:{trigger:'out',delay:100},onAfterShow:function(){u.removeClass('icon-angle-down').addClass('icon-angle-up');},onAfterHide:function(){u.removeClass('icon-angle-up').addClass('icon-angle-down');}});}});}var n=require('cobble/helper/Popup'),t=require('common/service_9c322508d3'),o=require('common/store_a1a35b3dfc'),i=$('#teacher-comment');exports.init=function(){o.set('page',1),o.set('comment',0),e(),i.on('click','[data-page]',function(n){var t=$(n.currentTarget);return o.set('page',t.data('page')),e(),!1;}).on('click','[data-face]',function(n){var t=$(n.currentTarget);return o.set('face',t.data('face')),e(),!1;}).on('click','[data-comment]',function(n){var t=$(n.currentTarget);return o.set('comment',t.data('comment')),o.set('face',''),e(),!1;});};});