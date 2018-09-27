define('cobble/form/Validator',['require','exports','module','../function/jquerify','../function/lifeCycle'],function(require){'use strict';function e(e){return i.init(this,e);}function t(e,t){if(e.length>0){var n=e[0].element;if(n.is(':hidden'))n=n.parent();var r=n.offset().top;if(t>0)r-=t;window.scrollTo(window.scrollX,r);}}function n(e){var t=$.Deferred();return $.when.apply($,e).done(function(){t.resolve(arguments);}),t;}var r=require('../function/jquerify'),i=require('../function/lifeCycle');e.prototype={constructor:e,type:'Validator',init:function(){var t=this,n=t.element,r='FORM'===n.prop('tagName')?n:n.find('form');if(r.length>0)r.attr('novalidate','novalidate').on('submit'+u,$.proxy(t.validate,t));$.each(t.fields,function(t,r){var i=n.find('[name="'+t+'"]'),u=r.type;if(!u)u=r.type=i.attr('type')||'text';var a=r.rules;if(!a)a=r.rules={};var f=e.type[u]||[];$.each(f,function(e,t){if(null==a[t]){var n=o[t];if($.isFunction(n))a[t]=n(i,r);}});});var i=t.groupSelector;if(n.on('focusin'+u,function(e){var n=$(e.target).closest(i),r=[t.successClass,t.errorClass,t.requiredClass].join(' ');n.removeClass($.trim(r));}),t.realtime)n.on('focusout'+u,function(e){var n=$(e.target),r=n.prop('name');if(!r)n=n.find('[name]'),r=n.prop('name');if(r)t.validate(r);});},validate:function(e,r){var i=this,o=i.emit('beforeValidate');if(!o.isDefaultPrevented()){var u,a=i.element,f=i.groupSelector;if('string'===$.type(e))e=[e];if($.isArray(e))u=$.map(e,function(e){return a.find('[name="'+e+'"]').closest(f);});else if(u=a.find(f),'boolean'===$.type(e))r=e;var c=[],s=[];$.each(u,function(e,t){var n=i.validateGroup($(t));if(n){if(n.promise)s.push(n),n=n.data;$.merge(c,n);}});var e=[],l=[],d=function(){if($.each(c,function(t,n){if(n.error)l.push(n);e.push(n.element.prop('name'));}),r)t(l,i.scrollGap);i.emit('afterValidate',{fields:e,errors:l});};if(s.length>0)return n(s).done(d);else return d(),0===l.length;}},validateGroup:function(t){if(t.is(':visible')){var r=this,i=[],o=[],u=[];if(t.find('[name]').each(function(t){var n,a,f=this,c=f.name,s=f.value,l=f.disabled,d=$(f);if(!l){var p=r.fields[c];if(p){n=!0,p=$.extend(!0,{},p),p.form=r.element,p.value=$.trim(s);var m;if($.each(e.type[p.type]||[],function(t,n){var r=e.rule[n](p);if(r===!1)return m=n,!1;else if(''===p.value&&'required'===n)return!1;}),m){var h=p.errors;if(h)a=h[m];if(!a)throw new Error(c+' 字段 '+m+' 类型错误信息未定义');}else if($.isFunction(p.custom)){var v=$.Deferred(),y=p.custom(d,function(e){v.resolve(e);});a=null==y||y.done?v:y;}}}if(n)if(t=i.push({element:d,error:a}),a&&a.promise)o.push(a),u.push(t-1);}),o.length>0){var a=n(o).done(function(e){$.each(e,function(e,t){i[u[e]].error=t;}),r.refreshGroup(t,i);});return a.data=i,a;}else return r.refreshGroup(t,i),i;}},refreshGroup:function(e,t){var n=this,r=n.successClass,i=n.errorClass;$.each(t,function(t,o){var u,a=o.element,f=o.error,c=n.errorSelector;if(c)u=e.find(c).eq(t);if(f&&'string'===$.type(f)){if(e.removeClass(r).addClass(i),u){var s=n.renderTemplate;if($.isFunction(s))f=s({text:f},n.errorTemplate);u.html(f).show();var l=n.errorPlacement;if($.isFunction(l))l(a,u);}}else if(o.error='',e.removeClass(i).addClass(r),u)u.html('').hide();});},dispose:function(){var e=this;i.dispose(e),e.element.off(u),e.element=null;}},r(e.prototype),e.defaultOptions={realtime:!1,scrollGap:100,groupSelector:'.form-group',successClass:'has-success',errorClass:'has-error',errorSelector:'.error',errorTemplate:'<i class="icon icon-times-circle"></i>&nbsp;${text}',requiredClass:'has-required',requiredSelector:'.required',requiredTemplate:'${text}',renderTemplate:function(e,t){return t.replace(/\${(\w+)}/g,function(t,n){return e[n]||'';});},errorPlacement:function(e,t){if('hidden'===e.prop('type'))e=e.parent();t.css({position:'static',width:'auto'});var n=t.outerWidth(!0)+5;t.css({position:'absolute',width:n});var r=e.parent();if(r.is('.placeholder-wrapper'))e=r;var i=e.position();t.css({left:i.left+e.outerWidth()-37,top:i.top-t.outerHeight()+8});}},e.type={text:['required','pattern','min','max','minlength','maxlength'],hidden:['required'],password:['required','pattern','minlength','maxlength','equals'],number:['required','pattern','min','max','step'],range:['required','pattern','min','max','step'],tel:['required','pattern'],url:['required','pattern'],email:['required','pattern'],mobile:['required','pattern'],money:['required','pattern','min','max'],idcard:['required','pattern'],'int':['required','pattern','min','max'],internationalMobile:['required','pattern']},e.rule={required:function(e){if(e.value.length>0)return!0;else if(e.rules.required)return!1;},pattern:function(e){var t=e.rules.pattern;if(t)return t.test(e.value);else return void 0;},minlength:function(e){var t=e.rules.minlength;if($.isNumeric(t))return e.value.length>=+t;else return void 0;},maxlength:function(e){var t=e.rules.maxlength;if($.isNumeric(t))return e.value.length<=+t;else return void 0;},min:function(e){var t=e.rules.min;if($.isNumeric(t))return e.value>=+t;else return void 0;},max:function(e){var t=e.rules.max;if($.isNumeric(t))return e.value<=+t;else return void 0;},step:function(e){var t=e.rules.step;if($.isNumeric(t)){var n=e.rules.min||1;return(e.value-n)%t===0;}},equals:function(e){var t=e.rules.equals;if(t){var n=e.form.find('[name="'+t+'"]');return e.value===$.trim(n.val());}}},e.pattern={number:/^[\d.]*$/,'int':/^\d+$/,url:/^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/,tel:/^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/,mobile:/^1[3-9]\d{9}$/,email:/^(?:[a-z0-9]+[_\-+.]+)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i,money:/^[\d.]*$/,idcard:/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i,internationalMobile:/^\d{7,20}$/};var o={required:function(e){return'required'===e.attr('required');},pattern:function(t,n){var r=t.attr('pattern')||e.pattern[n.type];if('string'===$.type(r))r=new RegExp(r);return r;},minlength:function(e){return e.attr('minlength');},maxlength:function(e){return e.attr('maxlength');},min:function(e){return e.attr('min');},max:function(e){return e.attr('max');},step:function(e){return e.attr('step');},equals:function(e){return e.attr('equals');}},u='.cobble_form_validator';return e;}),define('cobble/function/contains',['require','exports','module'],function(){'use strict';return function(e,t){if(e=e.jquery?e[0]:e,t=t.jquery?t[0]:t,!e||!t)return!1;if(e===t)return!0;else return $.contains(e,t);};}),define('cobble/function/isHidden',['require','exports','module'],function(){'use strict';return function(e){e.css('display');return'none'===e.css('display')||0==e.css('opacity')||'hidden'===e.css('visibility');};}),define('cobble/function/jquerify',['require','exports','module'],function(){'use strict';function e(e){return e.faker||e.element;}var t=$.prototype,n={on:function(){return t.on.apply(e(this),arguments),this;},off:function(){return t.off.apply(e(this),arguments),this;},emit:function(n,r){var i=this,o=e(i);if(o){if(!n[$.expando])n='string'===$.type(n)?$.Event(n):$.Event(null,n);n.cobble=i;var u=[n];if(r)u.push(r);var a=i[$.camelCase('on-'+n.type)];if($.isFunction(a)&&a.apply(i,u)===!1)n.preventDefault();if(!n.isPropagationStopped())t.trigger.apply(o,u);return n;}},before:function(t){e(this).before(t);},after:function(t){e(this).after(t);},appendTo:function(t){e(this).appendTo(t);},prependTo:function(t){e(this).prependTo(t);}};return function(e){$.each(n,function(t,n){if(null==e[t])e[t]=n;});};}),define('cobble/function/lifeCycle',['require','exports'],function(require,exports){'use strict';exports.init=function(e,t){var n=e.constructor,r='__cobble__'+n.prototype.type,i=t.element;if(i&&i.data(r))e=i.data(r);else if($.extend(e,n.defaultOptions,t),e.init(),i)i.data(r,e);return e;},exports.dispose=function(e){var t='__cobble__'+e.constructor.prototype.type,n=e.element;if(n)n.removeData(t);};}),define('cobble/function/split',['require','exports','module'],function(){'use strict';return function(e,t){var n=[];return $.each(e.split(t),function(e,t){if(t=$.trim(t))n.push(t);}),n;};}),define('cobble/helper/Popup',['require','exports','module','../function/split','../function/isHidden','../function/contains','../function/jquerify','../function/lifeCycle','../util/instance'],function(require){'use strict';function e(e){return C.init(this,e);}function t(e,t){$.each(e.showConfigList,function(n,r){r[t](e);});}function n(e,t){$.each(e.hideConfigList,function(n,r){r[t](e);});}function r(e,t){if(e)e.type=t;else e=t;return e;}function i(e){var t=e.currentTarget;return t&&'HTML'===t.tagName?null:t;}function o(e,t){return e.emit(r(t,'beforeShow'));}function u(e,r){return e.layer.data(P,i(r)),t(e,'off'),n(e,'on'),e.emit('afterShow');}function a(e,t){return e.emit(r(t,'beforeHide'));}function f(e){return e.layer.removeData(P),n(e,'off'),t(e,'on'),e.emit('afterHide');}function c(){return $.now();}function s(e){return'__'+e+'Handler__';}function l(e,t){return null==e[t];}function d(e,t){return e.layer.data(P)!==i(t);}function p(e,t,n){return!t||t(e,n);}function m(e,t){return t-e[H]>50;}function h(t,n){return function(r){var i=r.data,o=c(r);if(l(i,j)&&d(i,r)&&p(i,n,r))i[H]=o,y({popup:i,delay:i.show.delay,toggle:e.trigger.show[t].delay,timer:j,success:function(){var e=function(){i.open(r);},t=i[k];if(t)t.done(e);else e();}});};}function v(t,n){return function(r){var i=r.data,o=c(r);if(l(i,S)&&p(i,n,r)&&m(i,o))i[H]=o,i[k]=$.Deferred(),y({popup:i,delay:i.hide.delay,toggle:e.trigger.hide[t].delay,timer:S,success:function(){i.close(r),i[k].resolve();},fail:function(){i[k]=null;}});};}function y(e){var t=e.delay,n=e.success;if(t>0){var r=e.popup,i=e.timer,o=e.toggle||{},u=o.on||$.noop,a=o.off||$.noop,f=e.fail||$.noop,c=function(){clearTimeout(r[i]),a(r,s),r[i]=null;},s=function(e){var t=r[i];if(t)c();if(t&&e===H)n();else f();};u(r,s),r[i]=setTimeout(function(){s(H);},t);}else n();}function g(e){var t=this,n=t.type,r=t.handler,i=s(n);if(e[i]!==r)e.element.on(n,e.selector,e,r),e[i]=r;}function b(e){var t=this;if(!e.selector){var n=t.type;e.element.off(n,t.handler),e[s(n)]=null;}}var q=require('../function/split'),x=require('../function/isHidden'),_=require('../function/contains'),w=require('../function/jquerify'),C=require('../function/lifeCycle'),T=require('../util/instance');e.prototype={constructor:e,type:'Popup',init:function(){var r=this,i=r.showConfigList=[],o=r.hideConfigList=[],u=r.show.trigger,a=r.hide.trigger;if(u)$.each(q(u,','),function(t,n){var r=e.trigger.show[n];if(r)i.push(r);});if(a)$.each(q(r.hide.trigger,','),function(t,n){var r=e.trigger.hide[n];if(r)o.push(r);});if(r.hidden=x(r.layer))t(r,'on');else n(r,'on');},open:function(){var e=this,t=arguments[0];if(!t)e[H]=c();if(t=o(e,t),!t.isDefaultPrevented()){var n=e.layer,r=e.show.animation;if($.isFunction(r))r.call(e,n);else n.show();e.hidden=!1,u(e,t);}},close:function(){var e=this;if(!e.hidden){var t=arguments[0];if(!t)e[H]=c();if(t=a(e,t),!t.isDefaultPrevented()){var n=e.layer,r=e.hide.animation;if($.isFunction(r))r.call(e,n);else n.hide();e.hidden=!0,f(e);}}},dispose:function(){var e=this;C.dispose(e),e.close(),t(e,'off'),e.element=e.layer=null;}},w(e.prototype),e.defaultOptions={show:{trigger:'click'},hide:{trigger:'click'}};var k='__hidePromise__',j='__showTimer__',S='__hideTimer__',H='__lastTriggerTime__',P='__sourceElement__',D=function(e,t){if(!t)return!1;else return _(e.layer,t);};return e.trigger={show:{focus:{type:'focusin',handler:h('focus'),on:g,off:b},click:{type:'click',handler:h('click'),on:g,off:b},over:{type:'mouseenter',handler:h('over'),on:g,off:b,delay:{on:function(e,t){e.element.on('mouseleave',e.selector,t);},off:function(e,t){e.element.off('mouseleave',t);}}},context:{type:'contextmenu',handler:h('context'),on:g,off:b}},hide:{blur:{type:'focusout',handler:v('blur'),on:g,off:b},click:{type:'click',handler:function(){return v(this.type,function(e,t){return!D(e,t.target);});},on:function(e){var t=this;T.document.on(t.type,e,e.clickHandler=t.handler());},off:function(e){T.document.off(this.type,e.clickHandler);}},out:{type:'mouseleave',handler:v('out'),on:function(e){var t=this.type,n=this.handler;e.layer.on(t,e,n),e.element.on(t,e.selector,e,n);},off:function(e){var t=this.type,n=this.handler;e.element.off(t,n),e.layer.off(t,n);},delay:{on:function(e,t){e.element.on('mouseenter',e.selector,t),e.layer.on('mouseenter',t);},off:function(e,t){e.element.off('mouseenter',t),e.layer.off('mouseenter',t);}}},context:{type:'contextmenu',handler:function(){return v('context',function(e,t){return!D(e,t.target);});},on:function(e){var t=this;T.document.on(t.type,e,e.contextHandler=t.handler());},off:function(e){T.document.off(this.type,e.contextHandler);}}}},e;}),define('cobble/util/instance',['require','exports','module'],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body);}),define('common/center/cashBack_fc0df7ec80',['require','exports','common/service_9c322508d3','common/store_a1a35b3dfc','cobble/helper/Popup','common/form_2ef59f4d41','cobble/form/Validator','common/component/SaveButton_b1f301d041'],function(require,exports){'use strict';function e(e){i.getCashbackRecord({page:e,page_size:4,number:t,type:n}).done(function(e){if(0===e.code){var t=e.data,n=t.tpl;r.find('.records').html(n.cash_back_record);}});}var t,n,r,i=require('common/service_9c322508d3'),i=(require('common/store_a1a35b3dfc'),require('cobble/helper/Popup'),require('common/form_2ef59f4d41'),require('cobble/form/Validator'),require('common/component/SaveButton_b1f301d041'),require('common/service_9c322508d3'));exports.init=function(){r=$('#content'),r.on('click','.pager a',function(t){var n=$(t.currentTarget);if(n.hasClass('active'))return!1;var r=n.data('page');return e(r),!1;});};}),define('common/component/SaveButton_b1f301d041',['require'],function(){'use strict';function e(e){$.extend(this,e),this.init();}return e.prototype={init:function(){var e=this,t=e.element,n=t.html();if('BUTTON'!==t.prop('tagName'))throw new Error('SaveButton 必须使用 button 标签');var r=function(){var r=e.save();if(r)t.focus(),t.prop('disabled',!0),t.html(e.saveText||'正在保存...'),r.always(function(){setTimeout(function(){t.prop('disabled',!1),t.html(n);},10);});return!1;};if(t.click(r),e.form)e.form.submit(function(){return r(),!1;});}},e;}),define('common/form_2ef59f4d41',['require','exports','cobble/form/Validator'],function(require,exports){'use strict';function e(e){var t={},n=e.find('[name]');return n.each(function(){var e=this.name,n=this.value,r='radio'===this.type||'checkbox'===this.type;if(r){if(this.checked)t[e]=n;}else{var i=t[e];if(null==i)t[e]=n;else i=t[e]=[i],i.push(n);}}),$.each(t,function(e,n){t[e]=$.isArray(n)?n.join(','):$.trim(n);}),t;}function t(e,t){$.each(t,function(t,r){if(r){var i=e.find('[name="'+t+'"]'),o=i.closest('.form-group');o.removeClass('has-success').addClass('has-error');var u=o.find('.error');u.html(r),n.defaultOptions.errorPlacement(i,u);}});}var n=require('cobble/form/Validator');exports.parse=function(t){return e(t);},exports.get=function(n,r){return $.ajax({url:r,type:'get',dataType:'json',data:n.jquery?e(n):n}).done(function(e){if(e.code){var r=e.data;if(r)t(n,r);}return e;});},exports.post=function(n,r){return $.ajax({url:r,type:'post',dataType:'json',data:n.jquery?e(n):n}).done(function(e){if(e.code){var r=e.data;if(r)t(n,r);}return e;});};});