define('cobble/function/contains',['require','exports','module'],function(){'use strict';return function(e,t){if(e=e.jquery?e[0]:e,t=t.jquery?t[0]:t,!e||!t)return!1;if(e===t)return!0;else return $.contains(e,t);};}),define('cobble/function/debounce',['require','exports','module'],function(){'use strict';return function(e,t){t='number'===$.type(t)?t:50;var n;return function(){if(!n){var i=arguments;n=setTimeout(function(){n=null,e.apply(null,$.makeArray(i));},t);}};};}),define('cobble/function/decimalLength',['require','exports','module'],function(){'use strict';return function(e){var t=(''+e).split('.');return 2===t.length?t[1].length:0;};}),define('cobble/function/disableSelection',['require','exports','module'],function(){'use strict';var e=$('<i></i>')[0],t='onselectstart'in e,n='MozUserSelect'in e.style;if(e=null,t)return function(e){e=e||document,e.onselectstart=function(){return!1;};};if(n)return function(e){e=e||document.body,e.style.MozUserSelect='none';};else return $.noop;}),define('cobble/function/divide',['require','exports','module','./decimalLength','./float2Int'],function(require){'use strict';var e=require('./decimalLength'),t=require('./float2Int');return function(n,i){var o=Math.max(e(n),e(i));return n=t(n,o),i=t(i,o),n/ i;};}),define('cobble/function/dragGlobal',['require','exports','module','../helper/Draggable','../util/instance','../util/dimension','./pin'],function(require){'use strict';{var e=require('../helper/Draggable'),t=require('../util/instance'),n=require('../util/dimension');require('./pin');}return function(i){return new e({element:i.element,container:t.body,draggingClass:i.draggingClass,handleSelector:i.handleSelector,cancelSelector:i.cancelSelector,rect:function(){var e=i.fixed,t=i.scrollable;return{x:e||t?0:n.getPageScrollLeft(),y:e||t?0:n.getPageScrollTop(),width:e||!t?n.getViewportWidth():n.getPageWidth(),height:e||!t?n.getViewportHeight():n.getPageHeight()};}});};}),define('cobble/function/enableSelection',['require','exports','module'],function(){'use strict';var e=$('<i></i>')[0],t='onselectstart'in e,n='MozUserSelect'in e.style;if(e=null,t)return function(e){e=e||document,e.onselectstart=null;};if(n)return function(e){e=e||document.body,e.style.MozUserSelect='';};else return $.noop;}),define('cobble/function/float2Int',['require','exports','module'],function(){'use strict';return function(e,t){var n,i=(''+e).split('.');if(t>=0);else t=0;if(1===i.length)n=e+new Array(t+1).join('0');else t=Math.max(0,t-i[1].length),n=i.join('')+new Array(t+1).join('0');return+n;};}),define('cobble/function/innerOffset',['require','exports','module','./toNumber'],function(require){'use strict';var e=require('./toNumber');return function(t){var n=t.offset(),i=t.css('border-left-width'),o=t.css('border-top-width');return{left:n.left+e(i,0,'int'),top:n.top+e(o,0,'int')};};}),define('cobble/function/jquerify',['require','exports','module'],function(){'use strict';function e(e){return e.faker||e.element;}var t=$.prototype,n={on:function(){return t.on.apply(e(this),arguments),this;},off:function(){return t.off.apply(e(this),arguments),this;},emit:function(n,i){var o=this,r=e(o);if(r){if(!n[$.expando])n='string'===$.type(n)?$.Event(n):$.Event(null,n);n.cobble=o;var c=[n];if(i)c.push(i);var s=o[$.camelCase('on-'+n.type)];if($.isFunction(s)&&s.apply(o,c)===!1)n.preventDefault();if(!n.isPropagationStopped())t.trigger.apply(r,c);return n;}},before:function(t){e(this).before(t);},after:function(t){e(this).after(t);},appendTo:function(t){e(this).appendTo(t);},prependTo:function(t){e(this).prependTo(t);}};return function(e){$.each(n,function(t,n){if(null==e[t])e[t]=n;});};}),define('cobble/function/lifeCycle',['require','exports'],function(require,exports){'use strict';exports.init=function(e,t){var n=e.constructor,i='__cobble__'+n.prototype.type,o=t.element;if(o&&o.data(i))e=o.data(i);else if($.extend(e,n.defaultOptions,t),e.init(),o)o.data(i,e);return e;},exports.dispose=function(e){var t='__cobble__'+e.constructor.prototype.type,n=e.element;if(n)n.removeData(t);};}),define('cobble/function/offsetParent',['require','exports','module'],function(){'use strict';function e(e){return e.is('body')||'static'!==e.css('position');}return function(t){if(t.is('body'))return t;for(var n=t.parent();!e(n);)n=n.parent();return n;};}),define('cobble/function/outerOffset',['require','exports','module','./toNumber'],function(require){'use strict';var e=require('./toNumber');return function(t){var n=t.offset(),i=e(t.css('margin-left'),0,'int'),o=e(t.css('margin-top'),0,'int');return{left:n.left-i,top:n.top-o};};}),define('cobble/function/page',['require','exports','module','../util/instance'],function(require){'use strict';var e=require('../util/instance');return function(){if(e.body.prop('clientHeight')<e.html.prop('clientHeight'))return e.html;else return e.body;};}),define('cobble/function/pageHeight',['require','exports','module','./page'],function(require){'use strict';var e=require('./page');return function(){var t=e()[0];return Math.max(t.scrollHeight,t.clientHeight);};}),define('cobble/function/pageScrollLeft',['require','exports','module'],function(){'use strict';return function(){return Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);};}),define('cobble/function/pageScrollTop',['require','exports','module'],function(){'use strict';return function(){return Math.max(document.body.scrollTop,document.documentElement.scrollTop);};}),define('cobble/function/pageWidth',['require','exports','module','./page'],function(require){'use strict';var e=require('./page');return function(){var t=e()[0];return Math.max(t.scrollWidth,t.clientWidth);};}),define('cobble/function/parsePercent',['require','exports','module','./divide'],function(require){'use strict';var e=require('./divide'),t=/(-?\d+(\.\d+)?)%/;return function(n){if(t.test(n))return e(RegExp.$1,100);else return void 0;};}),define('cobble/function/pin',['require','exports','module','../util/instance','./parsePercent'],function(require){'use strict';function e(e){var t=o[e.x];if(null==t)t=e.x;if('string'===$.type(t)){var n=i(t);if(null!=n)t=n*(e.width||e.element.outerWidth());}return t;}function t(e){var t=o[e.y];if(null==t)t=e.y;if('string'===$.type(t)){var n=i(t);if(null!=n)t=n*(e.height||e.element.outerHeight());}return t;}var n=require('../util/instance'),i=require('./parsePercent'),o={left:0,top:0,center:'50%',middle:'50%',right:'100%',bottom:'100%'};return function(i){var o=i.element,r=i.attachment||{};if(!r.element)r.element=n.body;var c=r.element.offset(),s=c.left+e(r),u=c.top+t(r),l=s-e(i),a=u-t(i),f=i.offset;if(f){if('number'===$.type(f.x))l+=f.x;if('number'===$.type(f.y))a+=f.y;}var d={left:l,top:a},p=o.css('position');if('absolute'!==p&&'fixed'!==p)d.position='absolute';if(i.silence)return d;else o.css(d);};}),define('cobble/function/pinGlobal',['require','exports','module','./pin','../util/dimension','../function/viewport'],function(require){'use strict';var e=require('./pin'),t=require('../util/dimension'),n=require('../function/viewport');return function(i){var o={silence:!0,element:i.element,x:'50%'===i.x?'50%':0,y:'50%'===i.y?'50%':0,attachment:{element:n(),width:t.getViewportWidth(),height:t.getViewportHeight(),x:i.x,y:i.y}};if(!i.fixed)o.offset={x:t.getPageScrollLeft(),y:t.getPageScrollTop()};return e(o);};}),define('cobble/function/position',['require','exports','module','./offsetParent'],function(require){'use strict';var e=require('./offsetParent');return function(t){var n=e(t),i=t.css('position'),o=parseInt(t.css('left'),10),r=parseInt(t.css('top'),10),c=isNaN(o),s=isNaN(r);if(c||s)if(1===n.length){var u=t.offset(),l=n.offset();if(c)o=u.left-l.left-(parseInt(n.css('border-left-width'),10)||0);if(s)r=u.top-l.top-(parseInt(n.css('border-top-width'),10)||0);}else o=r=0;if(!i||'static'===i)i='absolute';return{position:i,left:o,top:r};};}),define('cobble/function/restrain',['require','exports','module'],function(){'use strict';return function(e,t,n){if(t>e)e=t;else if(e>n)e=n;return e;};}),define('cobble/function/toNumber',['require','exports','module'],function(){'use strict';var e={'int':parseInt,'float':parseFloat};return function(t,n,i){if('number'!==$.type(t)){var o=e[i];if(t=o?o(t,10):+t,isNaN(t))t=n;}return t;};}),define('cobble/function/viewport',['require','exports','module','../util/instance'],function(require){'use strict';var e=require('../util/instance');return function(){if(e.body.prop('clientHeight')>e.html.prop('clientHeight'))return e.html;else return e.body;};}),define('cobble/function/viewportHeight',['require','exports','module'],function(){'use strict';return function(){return window.innerHeight||document.documentElement.clientHeight;};}),define('cobble/function/viewportWidth',['require','exports','module'],function(){'use strict';return function(){return window.innerWidth||document.documentElement.clientWidth;};}),define('cobble/helper/Draggable',['require','exports','module','../function/page','../function/toNumber','../function/restrain','../function/position','../function/contains','../function/jquerify','../function/lifeCycle','../function/innerOffset','../function/outerOffset','../function/pageScrollLeft','../function/pageScrollTop','../function/enableSelection','../function/disableSelection','../util/instance','../util/mouse'],function(require){'use strict';function e(e){return l.init(this,e);}function t(e){var t=b(e),n=y(e);if(S.left!==t||S.top!==n){S.left=t,S.top=n;var i=e.data;if(1===++x){var o=i.draggingClass;if(o)i.element.addClass(o);i.emit('beforeDrag');}if(!i.silence)i.element.css(S);i.emit('drag',S);}}function n(e){m(),h.document.off(w);var t=e.data,n=t.draggingClass;if(n)t.element.removeClass(n);if(x>0)t.emit('afterDrag',S);x=b=y=null;}function i(e,t,n){var i=!1;if($.isArray(t))t=t.join(',');return e.find(t).each(function(){if(i=s(this,n))return!1;else return void 0;}),i;}var o=require('../function/page'),r=(require('../function/toNumber'),require('../function/restrain')),c=require('../function/position'),s=require('../function/contains'),u=require('../function/jquerify'),l=require('../function/lifeCycle'),a=require('../function/innerOffset'),f=require('../function/outerOffset'),d=require('../function/pageScrollLeft'),p=require('../function/pageScrollTop'),m=require('../function/enableSelection'),g=require('../function/disableSelection'),h=require('../util/instance'),v=require('../util/mouse');e.prototype={constructor:e,type:'Draggable',init:function(){var e=this,r=e.element;if(!e.container)e.container=o();r.css(c(r)),$.each(v,function(o,u){if(u.support)r.on(u.mousedown+w,function(l){var d=l.target,p=e.handleSelector,m=e.cancelSelector;if(!(p&&!i(r,p,d)||m&&i(r,m,d))){var v=H[o],$=f(r),k=v.absoluteX(l)-$.left,C=v.absoluteY(l)-$.top,O=e.container;if(s(O,r)){var P=a(O);k+=P.left,C+=P.top;}var D=c(r),T=D.position;S.left=D.left,S.top=D.top;var W=e.axis,A=e.getRectange(!0);b='y'===W?q.constant(S.left):q.change(v[T+'X'],k,A.x,A.x+A.width),y='x'===W?q.constant(S.top):q.change(v[T+'Y'],C,A.y,A.y+A.height),x=0,g(),h.document.on(u.mousemove+w,e,t).on(u.mouseup+w,e,n);}});});},getRectange:function(e){var t=this,n=t.rect;if($.isFunction(n))n=t.rect();if(e){var i=t.element,o=n.width-i.outerWidth(!0),r=n.height-i.outerHeight(!0);n.width=Math.max(0,o),n.height=Math.max(0,r);}return n;},setRectange:function(e){this.rect=e;},dispose:function(){var e=this;l.dispose(e),e.element.off(w),e.element=e.container=null;}},u(e.prototype),e.defaultOptions={rect:function(){var e=this,t=e.container,n={x:0,y:0,width:t.innerWidth(),height:t.innerHeight()};if(!s(t,e.element)){var i=a(t);n.x=i.left,n.y=i.top;}return n;}};var b,y,x,w='.cobble_helper_draggable',S={},q={constant:function(e){return function(){return e;};},change:function(e,t,n,i){return function(o){return r(e(o)-t,n,i);};}},H={};return $.each(v,function(e,t){if(t.support)H[e]={absoluteX:function(e){return t.clientX(e)+d();},absoluteY:function(e){return t.clientY(e)+p();},fixedX:function(e){return t.clientX(e);},fixedY:function(e){return t.clientY(e);}};}),e;}),define('cobble/ui/Dialog',['require','exports','module','../util/instance','../util/dimension','../function/jquerify','../function/lifeCycle','../function/offsetParent','../function/debounce','../function/pinGlobal','../function/dragGlobal'],function(require){'use strict';function e(e){return o.init(this,e);}var t=require('../util/instance'),n=require('../util/dimension'),i=require('../function/jquerify'),o=require('../function/lifeCycle'),r=require('../function/offsetParent'),c=require('../function/debounce'),s=require('../function/pinGlobal'),u=require('../function/dragGlobal');e.prototype={constructor:e,type:'Dialog',init:function(){var e=this,n=e.element||(e.element=$(e.template)),i=[],o=e.skinClass;if(o)i.push(o);var c=e.draggableClass;if(e.draggable&&c)i.push(c);if(i.length>0)n.addClass(i.join(' '));var s=e.removeOnEmpty,u=e.title;if(u)n.find(e.titleSelector).html(u);else if(s)n.find(e.headerSelector).remove();var a=e.content,f=n.find(e.bodySelector);if(a)f.html(a);else if(s)f.remove();var d=e.closeSelector,p=$.proxy(e.hide,e);if(d)n.on('click'+l,d,p);var m={};if(e.width)m.width=e.width;var g=e.fixed?'fixed':'absolute';if(n.css('position')!==g)m.position=g;if(!r(n).is('body'))t.body.append(n);if(e.modal){var h=e.mask||(e.mask=$(e.maskTemplate));if(n.before(h),e.hideOnClickMask)h.on('click'+l,p);var v='zIndex',b=e[v];if(!$.isNumeric(b))if(b=h.css(v),!$.isNumeric(b))b='auto';var y={overflow:'hidden'};y[v]=b,h.css(y),m[v]=b;}if(n.css(m),!e.hidden)e.hidden=!0,e.show();},show:function(){var e=this;if(e.hidden!==!1){var n=e.emit('beforeShow');if(!n.isDefaultPrevented()){var i=e.element,o=e.scrollable;if(e.draggable)e.drager=u({element:i,handleSelector:e.draggableHandleSelector,cancelSelector:e.draggableCancelSelector,draggingClass:e.draggingClass,fixed:e.fixed,scrollable:o});if(e.refresh(),e.showAnimation(),e.mask)e.showMaskAnimation();e.hidden=!1,t.window.resize(e.resizer=c(function(){e.refresh(!0);},50)),e.emit('afterShow');}}},hide:function(){var e=this;if(e.hidden!==!0){var n=e.emit('beforeHide');if(!n.isDefaultPrevented()){if(e.resizer)t.window.off('resize',e.resizer),e.resizer=null;if(e.drager)e.drager.dispose(),e.drager=null;if(e.hideAnimation(),e.mask)e.hideMaskAnimation();if(e.hidden=!0,e.emit('afterHide'),e.disposeOnHide)e.dispose();}}},refresh:function(){var e=this,t=arguments[0];if(!t||e.positionOnResize){var i=e.element,o=s({element:i,x:e.x,y:e.y,fixed:e.fixed});if(t)e.resizeAnimation(o);else i.css(o);}var r=e.mask;if(r)r.css({width:n.getPageWidth(),height:n.getPageHeight()});},dispose:function(){var e=this;if(o.dispose(e),!e.hidden)e.disposeOnHide=!1,e.hide();var t=e.element,n=e.mask;if(t.off(l),n)n.off(l);if(e.removeOnDispose)if(t.remove(),n)n.remove();e.element=e.mask=null;}},i(e.prototype),e.defaultOptions={x:'50%',y:'50%',modal:!0,fixed:!0,hidden:!1,draggable:!0,scrollable:!0,removeOnEmpty:!0,disposeOnHide:!0,removeOnDispose:!0,hideOnClickMask:!1,positionOnResize:!0,draggableClass:'draggable',draggableHandleSelector:'.dialog-header',draggableCancelSelector:['.dialog-header h1','.dialog-close'],headerSelector:'.dialog-header',titleSelector:'.dialog-header h1',closeSelector:'.dialog-close',bodySelector:'.dialog-body',template:'<div class="dialog"><i class="dialog-close">&times;</i><div class="dialog-header"><h1></h1></div><div class="dialog-body"></div></div>',maskTemplate:'<div class="dialog-mask"></div>',showAnimation:function(){this.element.show();},hideAnimation:function(){this.element.hide();},showMaskAnimation:function(){this.mask.show();},hideMaskAnimation:function(){this.mask.hide();},resizeAnimation:function(e){this.element.css(e);}};{var l='.cobble_ui_dialog';t.html.css('overflow'),t.body.css('overflow');}return e;}),define('cobble/util/dimension',['require','exports','module','../function/pageScrollTop','../function/pageScrollLeft','../function/pageWidth','../function/pageHeight','../function/viewportWidth','../function/viewportHeight'],function(require,exports){'use strict';var e=require('../function/pageScrollTop'),t=require('../function/pageScrollLeft'),n=require('../function/pageWidth'),i=require('../function/pageHeight'),o=require('../function/viewportWidth'),r=require('../function/viewportHeight');exports.getPageScrollTop=e,exports.getPageScrollLeft=t,exports.getPageWidth=n,exports.getPageHeight=i,exports.getViewportWidth=o,exports.getViewportHeight=r;}),define('cobble/util/instance',['require','exports','module'],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body);}),define('cobble/util/mouse',['require','exports','module'],function(){'use strict';function e(e){return e.originalEvent.changedTouches[0];}var t=document.createElement('div'),n={support:'ontouchend'in t,click:'touchstart',mousedown:'touchstart',mousemove:'touchmove',mouseup:'touchend',pageX:function(t){return e(t).pageX;},pageY:function(t){return e(t).pageY;},clientX:function(t){return e(t).clientX;},clientY:function(t){return e(t).clientY;}},i={support:'onclick'in t,click:'click',mousedown:'mousedown',mousemove:'mousemove',mouseup:'mouseup',pageX:function(e){return e.pageX;},pageY:function(e){return e.pageY;},clientX:function(e){return e.clientX;},clientY:function(e){return e.clientY;}};return t=null,{touch:n,mouse:i};}),define('common/component/BanLessonDialog',['require','exports','common/service_9c322508d3','./InviteResultDialog_67a8d4ed9e'],function(require){'use strict';function e(t){$.extend(this,e.defaultOptions,t),this.init();}var t=require('common/service_9c322508d3'),n=require('./InviteResultDialog_67a8d4ed9e');return e.prototype={init:function(){var e=this,i=e.next;alert({title:'温馨提示',content:e.text,width:420,buttons:[{text:e.noskip?'确认':e.hasStudentRole?'切换身份':'立即开通',type:'primary',handler:function(){this.hide(),o();}},{text:'取消',handler:function(){if(this.hide(),$.isFunction(e.onCancel))e.onCancel();}}]});var o=function(){var o=function(o){t.sendInviteCode({role:2,formData:o?e.switchRoleData:null}).done(function(t){var r=function(){if($.isFunction(e.onSuccess))e.onSuccess();if(!i)window.location.href=t.data.url;else if('0'!==i)window.location.href=i;};if(0===t.code)if(o)new n({userType:0,status:'succ',onAfterHide:r});else r();else if(o)new n({userType:0,status:'err'});else alert('数据正在维护\uFF01');});};if(e.hasStudentRole)o();else o(!0);};}},e.defaultOptions={hasStudentRole:!1},e;}),define('common/component/InviteResultDialog_67a8d4ed9e',['require','exports','cobble/ui/Dialog'],function(require){'use strict';function e(e){$.extend(this,e),this.init();}var t=require('cobble/ui/Dialog');e.prototype={init:function(){var e=this,i=e.userType,o=e.status,r='',c='';if('2'==i)if('succ'==o)c=n.teacher.succ.title,r=n.teacher.succ.content;else c=n.teacher.err.title,r=n.teacher.err.content;else if('0'==i)if('succ'==o)c=n.student.succ.title,r=n.student.succ.content;else c=n.student.err.title,r=n.student.err.content;var s=new t({title:c,content:r,skinClass:'invite-result-dialog',disposeOnHide:!0,width:450,onAfterHide:function(){if('succ'==o&&$.isFunction(e.onAfterHide))e.onAfterHide();}}),u=s.element,l=u.find('.timer'),a=5,f=setInterval(function(){if(1>a)clearInterval(f),s.hide();a--,l.html(a);},1000);u.on('click','.btn-confirm',function(){s.hide();});}};var n={teacher:{succ:{title:'开通老师身份成功',content:'<div class="invite-result-dialog"><div class="wrapper"><i class="icon icon-check-circle"></i><div class="msg-content"><div class="msg-content-title">恭喜你开通老师身份\uFF01</div><div class="msg-content-words">快去完善个人资料和课程信息吧~~</div><div class="msg-content-time"><span class="timer">5</span>秒后跳转至老师中心</div></div></div><div class="dialog-action"><button class="btn btn-info btn-confirm">立即前往</button></div></div>'},err:{title:'开通老师身份失败',content:'<div class="invite-result-dialog"><div class="wrapper"><i class="icon icon-times-circle"></i><div class="msg-content"><div class="msg-content-title">对不起\uFF0C你的老师身份开通失败</div><div class="msg-content-words">拨打 <span class="phone">4000-910-910</span> 咨询客服</div><div class="msg-content-time"><span class="timer">5</span>秒后自动关闭</div></div></div><div class="dialog-action"><button class="btn btn-info btn-confirm">立即关闭</button></div></div>'}},student:{succ:{title:'开通学生身份成功',content:'<div class="invite-result-dialog"><div class="wrapper"><i class="icon icon-check-circle"></i><div class="msg-content"><div class="msg-content-title">恭喜你开通学生身份\uFF01</div><div class="msg-content-words">快去搜索喜欢的老师和课程吧~~</div><div class="msg-content-time"><span class="timer">5</span>秒后返回</div></div></div><div class="dialog-action"><button class="btn btn-info btn-confirm">立即返回</button></div></div>'},err:{title:'开通学生身份失败',content:'<div class="invite-result-dialog"><div class="wrapper"><i class="icon icon-times-circle"></i><div class="msg-content"><div class="msg-content-title">对不起\uFF0C您的学生身份开通失败</div><div class="msg-content-words">拨打 <span class="phone">4000-910-910</span> 咨询客服</div><div class="msg-content-time"><span class="timer">5</span>秒后自动关闭</div></div></div><div class="dialog-action"><button class="btn btn-info btn-confirm">立即关闭</button></div></div>'}}};return e;});