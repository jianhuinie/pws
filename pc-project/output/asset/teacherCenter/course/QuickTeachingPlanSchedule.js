define('cobble/form/Select',['require','exports','module','../ui/ComboBox','../function/jquerify','../function/lifeCycle'],function(require){'use strict';function e(e){return i.init(this,e);}var t=require('../ui/ComboBox'),n=require('../function/jquerify'),i=require('../function/lifeCycle');return e.prototype={constructor:e,type:'Select',init:function(){var e=this,n=e.element,i='<input type="hidden" name="'+e.name+'"';if(null!=e.value)i+=' value="'+e.value+'"';if(n.attr('required'))i+=' required';i+=' />';var r=e.input=$(i);n.append(r),e.comboBox=new t({element:n,button:n.find(e.buttonSelector),menu:n.find(e.menuSelector),data:e.data,value:e.value,show:e.show,hide:e.hide,defaultText:e.defaultText,template:e.template,renderTemplate:e.renderTemplate,activeClass:e.activeClass,openClass:e.openClass,setText:$.proxy(e.setText,e),onChange:function(t,n){if(e.setValue(n.value),!e.silence)e.emit('change',n);},onAfterShow:function(){n.trigger('focusin');},onAfterHide:function(){n.trigger('focusout');}});},disable:function(){var e=this,t=e.element;t.find(e.buttonSelector).prop('disabled',!0);},enable:function(){var e=this,t=e.element;t.find(e.buttonSelector).prop('disabled',!1);},getValue:function(){return this.value;},setValue:function(e,t){var n=this;if(t=t||{},t.force||e!=n.value)n.value=e,n.input.val(null==e?'':e),n.silence=t.silence,n.comboBox.setValue(e),delete n.silence;},refresh:function(e){this.comboBox.refresh(e);},dispose:function(){var e=this;i.dispose(e),e.comboBox.dispose(),e.input=e.element=e.comboBox=null;}},n(e.prototype),e.defaultOptions={defaultText:'请选择',buttonSelector:'.btn-default',menuSelector:'.dropdown-menu',labelSelector:'.btn-default span',activeClass:'active',openClass:'open',renderTemplate:function(e){var t=[];return $.each(e,function(e,n){var i=[];$.each(n,function(e,t){if('text'!==e&&null!=t)i.push('data-'+e+'="'+t+'"');}),t.push('<li '+i.join(' ')+'>'+n.text+'</li>');}),t.join('');},setText:function(e){this.element.find(this.labelSelector).html(e);}},e;}),define('cobble/form/Validator',['require','exports','module','../function/jquerify','../function/lifeCycle'],function(require){'use strict';function e(e){return r.init(this,e);}function t(e,t){if(e.length>0){var n=e[0].element;if(n.is(':hidden'))n=n.parent();var i=n.offset().top;if(t>0)i-=t;window.scrollTo(window.scrollX,i);}}function n(e){var t=$.Deferred();return $.when.apply($,e).done(function(){t.resolve(arguments);}),t;}var i=require('../function/jquerify'),r=require('../function/lifeCycle');e.prototype={constructor:e,type:'Validator',init:function(){var t=this,n=t.element,i='FORM'===n.prop('tagName')?n:n.find('form');if(i.length>0)i.attr('novalidate','novalidate').on('submit'+a,$.proxy(t.validate,t));$.each(t.fields,function(t,i){var r=n.find('[name="'+t+'"]'),a=i.type;if(!a)a=i.type=r.attr('type')||'text';var s=i.rules;if(!s)s=i.rules={};var u=e.type[a]||[];$.each(u,function(e,t){if(null==s[t]){var n=o[t];if($.isFunction(n))s[t]=n(r,i);}});});var r=t.groupSelector;if(n.on('focusin'+a,function(e){var n=$(e.target).closest(r),i=[t.successClass,t.errorClass,t.requiredClass].join(' ');n.removeClass($.trim(i));}),t.realtime)n.on('focusout'+a,function(e){var n=$(e.target),i=n.prop('name');if(!i)n=n.find('[name]'),i=n.prop('name');if(i)t.validate(i);});},validate:function(e,i){var r=this,o=r.emit('beforeValidate');if(!o.isDefaultPrevented()){var a,s=r.element,u=r.groupSelector;if('string'===$.type(e))e=[e];if($.isArray(e))a=$.map(e,function(e){return s.find('[name="'+e+'"]').closest(u);});else if(a=s.find(u),'boolean'===$.type(e))i=e;var l=[],f=[];$.each(a,function(e,t){var n=r.validateGroup($(t));if(n){if(n.promise)f.push(n),n=n.data;$.merge(l,n);}});var e=[],c=[],p=function(){if($.each(l,function(t,n){if(n.error)c.push(n);e.push(n.element.prop('name'));}),i)t(c,r.scrollGap);r.emit('afterValidate',{fields:e,errors:c});};if(f.length>0)return n(f).done(p);else return p(),0===c.length;}},validateGroup:function(t){if(t.is(':visible')){var i=this,r=[],o=[],a=[];if(t.find('[name]').each(function(t){var n,s,u=this,l=u.name,f=u.value,c=u.disabled,p=$(u);if(!c){var d=i.fields[l];if(d){n=!0,d=$.extend(!0,{},d),d.form=i.element,d.value=$.trim(f);var h;if($.each(e.type[d.type]||[],function(t,n){var i=e.rule[n](d);if(i===!1)return h=n,!1;else if(''===d.value&&'required'===n)return!1;}),h){var m=d.errors;if(m)s=m[h];if(!s)throw new Error(l+' 字段 '+h+' 类型错误信息未定义');}else if($.isFunction(d.custom)){var v=$.Deferred(),g=d.custom(p,function(e){v.resolve(e);});s=null==g||g.done?v:g;}}}if(n)if(t=r.push({element:p,error:s}),s&&s.promise)o.push(s),a.push(t-1);}),o.length>0){var s=n(o).done(function(e){$.each(e,function(e,t){r[a[e]].error=t;}),i.refreshGroup(t,r);});return s.data=r,s;}else return i.refreshGroup(t,r),r;}},refreshGroup:function(e,t){var n=this,i=n.successClass,r=n.errorClass;$.each(t,function(t,o){var a,s=o.element,u=o.error,l=n.errorSelector;if(l)a=e.find(l).eq(t);if(u&&'string'===$.type(u)){if(e.removeClass(i).addClass(r),a){var f=n.renderTemplate;if($.isFunction(f))u=f({text:u},n.errorTemplate);a.html(u).show();var c=n.errorPlacement;if($.isFunction(c))c(s,a);}}else if(o.error='',e.removeClass(r).addClass(i),a)a.html('').hide();});},dispose:function(){var e=this;r.dispose(e),e.element.off(a),e.element=null;}},i(e.prototype),e.defaultOptions={realtime:!1,scrollGap:100,groupSelector:'.form-group',successClass:'has-success',errorClass:'has-error',errorSelector:'.error',errorTemplate:'<i class="icon icon-times-circle"></i>&nbsp;${text}',requiredClass:'has-required',requiredSelector:'.required',requiredTemplate:'${text}',renderTemplate:function(e,t){return t.replace(/\${(\w+)}/g,function(t,n){return e[n]||'';});},errorPlacement:function(e,t){if('hidden'===e.prop('type'))e=e.parent();t.css({position:'static',width:'auto'});var n=t.outerWidth(!0)+5;t.css({position:'absolute',width:n});var i=e.parent();if(i.is('.placeholder-wrapper'))e=i;var r=e.position();t.css({left:r.left+e.outerWidth()-37,top:r.top-t.outerHeight()+8});}},e.type={text:['required','pattern','min','max','minlength','maxlength'],hidden:['required'],password:['required','pattern','minlength','maxlength','equals'],number:['required','pattern','min','max','step'],range:['required','pattern','min','max','step'],tel:['required','pattern'],url:['required','pattern'],email:['required','pattern'],mobile:['required','pattern'],money:['required','pattern','min','max'],idcard:['required','pattern'],'int':['required','pattern','min','max'],internationalMobile:['required','pattern']},e.rule={required:function(e){if(e.value.length>0)return!0;else if(e.rules.required)return!1;},pattern:function(e){var t=e.rules.pattern;if(t)return t.test(e.value);else return void 0;},minlength:function(e){var t=e.rules.minlength;if($.isNumeric(t))return e.value.length>=+t;else return void 0;},maxlength:function(e){var t=e.rules.maxlength;if($.isNumeric(t))return e.value.length<=+t;else return void 0;},min:function(e){var t=e.rules.min;if($.isNumeric(t))return e.value>=+t;else return void 0;},max:function(e){var t=e.rules.max;if($.isNumeric(t))return e.value<=+t;else return void 0;},step:function(e){var t=e.rules.step;if($.isNumeric(t)){var n=e.rules.min||1;return(e.value-n)%t===0;}},equals:function(e){var t=e.rules.equals;if(t){var n=e.form.find('[name="'+t+'"]');return e.value===$.trim(n.val());}}},e.pattern={number:/^[\d.]*$/,'int':/^\d+$/,url:/^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/,tel:/^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/,mobile:/^1[3-9]\d{9}$/,email:/^(?:[a-z0-9]+[_\-+.]+)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i,money:/^[\d.]*$/,idcard:/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i,internationalMobile:/^\d{7,20}$/};var o={required:function(e){return'required'===e.attr('required');},pattern:function(t,n){var i=t.attr('pattern')||e.pattern[n.type];if('string'===$.type(i))i=new RegExp(i);return i;},minlength:function(e){return e.attr('minlength');},maxlength:function(e){return e.attr('maxlength');},min:function(e){return e.attr('min');},max:function(e){return e.attr('max');},step:function(e){return e.attr('step');},equals:function(e){return e.attr('equals');}},a='.cobble_form_validator';return e;}),define('cobble/function/contains',['require','exports','module'],function(){'use strict';return function(e,t){if(e=e.jquery?e[0]:e,t=t.jquery?t[0]:t,!e||!t)return!1;if(e===t)return!0;else return $.contains(e,t);};}),define('cobble/function/isHidden',['require','exports','module'],function(){'use strict';return function(e){e.css('display');return'none'===e.css('display')||0==e.css('opacity')||'hidden'===e.css('visibility');};}),define('cobble/function/jquerify',['require','exports','module'],function(){'use strict';function e(e){return e.faker||e.element;}var t=$.prototype,n={on:function(){return t.on.apply(e(this),arguments),this;},off:function(){return t.off.apply(e(this),arguments),this;},emit:function(n,i){var r=this,o=e(r);if(o){if(!n[$.expando])n='string'===$.type(n)?$.Event(n):$.Event(null,n);n.cobble=r;var a=[n];if(i)a.push(i);var s=r[$.camelCase('on-'+n.type)];if($.isFunction(s)&&s.apply(r,a)===!1)n.preventDefault();if(!n.isPropagationStopped())t.trigger.apply(o,a);return n;}},before:function(t){e(this).before(t);},after:function(t){e(this).after(t);},appendTo:function(t){e(this).appendTo(t);},prependTo:function(t){e(this).prependTo(t);}};return function(e){$.each(n,function(t,n){if(null==e[t])e[t]=n;});};}),define('cobble/function/lifeCycle',['require','exports'],function(require,exports){'use strict';exports.init=function(e,t){var n=e.constructor,i='__cobble__'+n.prototype.type,r=t.element;if(r&&r.data(i))e=r.data(i);else if($.extend(e,n.defaultOptions,t),e.init(),r)r.data(i,e);return e;},exports.dispose=function(e){var t='__cobble__'+e.constructor.prototype.type,n=e.element;if(n)n.removeData(t);};}),define('cobble/function/split',['require','exports','module'],function(){'use strict';return function(e,t){var n=[];return $.each(e.split(t),function(e,t){if(t=$.trim(t))n.push(t);}),n;};}),define('cobble/helper/Popup',['require','exports','module','../function/split','../function/isHidden','../function/contains','../function/jquerify','../function/lifeCycle','../util/instance'],function(require){'use strict';function e(e){return T.init(this,e);}function t(e,t){$.each(e.showConfigList,function(n,i){i[t](e);});}function n(e,t){$.each(e.hideConfigList,function(n,i){i[t](e);});}function i(e,t){if(e)e.type=t;else e=t;return e;}function r(e){var t=e.currentTarget;return t&&'HTML'===t.tagName?null:t;}function o(e,t){return e.emit(i(t,'beforeShow'));}function a(e,i){return e.layer.data(S,r(i)),t(e,'off'),n(e,'on'),e.emit('afterShow');}function s(e,t){return e.emit(i(t,'beforeHide'));}function u(e){return e.layer.removeData(S),n(e,'off'),t(e,'on'),e.emit('afterHide');}function l(){return $.now();}function f(e){return'__'+e+'Handler__';}function c(e,t){return null==e[t];}function p(e,t){return e.layer.data(S)!==r(t);}function d(e,t,n){return!t||t(e,n);}function h(e,t){return t-e[_]>50;}function m(t,n){return function(i){var r=i.data,o=l(i);if(c(r,q)&&p(r,i)&&d(r,n,i))r[_]=o,g({popup:r,delay:r.show.delay,toggle:e.trigger.show[t].delay,timer:q,success:function(){var e=function(){r.open(i);},t=r[E];if(t)t.done(e);else e();}});};}function v(t,n){return function(i){var r=i.data,o=l(i);if(c(r,R)&&d(r,n,i)&&h(r,o))r[_]=o,r[E]=$.Deferred(),g({popup:r,delay:r.hide.delay,toggle:e.trigger.hide[t].delay,timer:R,success:function(){r.close(i),r[E].resolve();},fail:function(){r[E]=null;}});};}function g(e){var t=e.delay,n=e.success;if(t>0){var i=e.popup,r=e.timer,o=e.toggle||{},a=o.on||$.noop,s=o.off||$.noop,u=e.fail||$.noop,l=function(){clearTimeout(i[r]),s(i,f),i[r]=null;},f=function(e){var t=i[r];if(t)l();if(t&&e===_)n();else u();};a(i,f),i[r]=setTimeout(function(){f(_);},t);}else n();}function y(e){var t=this,n=t.type,i=t.handler,r=f(n);if(e[r]!==i)e.element.on(n,e.selector,e,i),e[r]=i;}function b(e){var t=this;if(!e.selector){var n=t.type;e.element.off(n,t.handler),e[f(n)]=null;}}var x=require('../function/split'),w=require('../function/isHidden'),C=require('../function/contains'),D=require('../function/jquerify'),T=require('../function/lifeCycle'),k=require('../util/instance');e.prototype={constructor:e,type:'Popup',init:function(){var i=this,r=i.showConfigList=[],o=i.hideConfigList=[],a=i.show.trigger,s=i.hide.trigger;if(a)$.each(x(a,','),function(t,n){var i=e.trigger.show[n];if(i)r.push(i);});if(s)$.each(x(i.hide.trigger,','),function(t,n){var i=e.trigger.hide[n];if(i)o.push(i);});if(i.hidden=w(i.layer))t(i,'on');else n(i,'on');},open:function(){var e=this,t=arguments[0];if(!t)e[_]=l();if(t=o(e,t),!t.isDefaultPrevented()){var n=e.layer,i=e.show.animation;if($.isFunction(i))i.call(e,n);else n.show();e.hidden=!1,a(e,t);}},close:function(){var e=this;if(!e.hidden){var t=arguments[0];if(!t)e[_]=l();if(t=s(e,t),!t.isDefaultPrevented()){var n=e.layer,i=e.hide.animation;if($.isFunction(i))i.call(e,n);else n.hide();e.hidden=!0,u(e);}}},dispose:function(){var e=this;T.dispose(e),e.close(),t(e,'off'),e.element=e.layer=null;}},D(e.prototype),e.defaultOptions={show:{trigger:'click'},hide:{trigger:'click'}};var E='__hidePromise__',q='__showTimer__',R='__hideTimer__',_='__lastTriggerTime__',S='__sourceElement__',O=function(e,t){if(!t)return!1;else return C(e.layer,t);};return e.trigger={show:{focus:{type:'focusin',handler:m('focus'),on:y,off:b},click:{type:'click',handler:m('click'),on:y,off:b},over:{type:'mouseenter',handler:m('over'),on:y,off:b,delay:{on:function(e,t){e.element.on('mouseleave',e.selector,t);},off:function(e,t){e.element.off('mouseleave',t);}}},context:{type:'contextmenu',handler:m('context'),on:y,off:b}},hide:{blur:{type:'focusout',handler:v('blur'),on:y,off:b},click:{type:'click',handler:function(){return v(this.type,function(e,t){return!O(e,t.target);});},on:function(e){var t=this;k.document.on(t.type,e,e.clickHandler=t.handler());},off:function(e){k.document.off(this.type,e.clickHandler);}},out:{type:'mouseleave',handler:v('out'),on:function(e){var t=this.type,n=this.handler;e.layer.on(t,e,n),e.element.on(t,e.selector,e,n);},off:function(e){var t=this.type,n=this.handler;e.element.off(t,n),e.layer.off(t,n);},delay:{on:function(e,t){e.element.on('mouseenter',e.selector,t),e.layer.on('mouseenter',t);},off:function(e,t){e.element.off('mouseenter',t),e.layer.off('mouseenter',t);}}},context:{type:'contextmenu',handler:function(){return v('context',function(e,t){return!O(e,t.target);});},on:function(e){var t=this;k.document.on(t.type,e,e.contextHandler=t.handler());},off:function(e){k.document.off(this.type,e.contextHandler);}}}},e;}),define('cobble/ui/ComboBox',['require','exports','module','../function/jquerify','../function/lifeCycle','../helper/Popup'],function(require){'use strict';function e(e){return n.init(this,e);}var t=require('../function/jquerify'),n=require('../function/lifeCycle'),i=require('../helper/Popup');e.prototype={constructor:e,type:'ComboBox',init:function(){var e=this,t=e.button,n=e.menu,o=e.element||t,a=e.openClass,s=e.show,u=e.hide,l=s.animation;if($.isFunction(l))s.animation=$.proxy(l,e);if(l=u.animation,$.isFunction(l))u.animation=$.proxy(l,e);if(e.popup=new i({element:t,layer:n,show:s,hide:u,onBeforeShow:function(t){e.emit(t);},onBeforeHide:function(t){e.emit(t);},onAfterShow:function(t){if(a)o.addClass(a);e.emit(t);},onAfterHide:function(t){if(a)o.removeClass(a);e.emit(t);}}),null==e.value){var f=n.find('.'+e.activeClass);if(1===f.length)e.value=f.data('value');}if(e.data)n.html(e.renderTemplate(e.data,e.template));if(null!=e.value)e.setValue(e.value,{force:!0,silence:!0});n.on('click'+r,'[data-value]',function(){e.setValue($(this).data('value')),e.close();});},getValue:function(){return this.value;},setValue:function(e,t){var n,i=this,r=i.menu,o=r.find('[data-value="'+e+'"]');if(1===o.length){if(n=o.data(),null==n.text)n.text=o.html();}else n={};if(t=t||{},t.force||e!=i.value){var a=i.activeClass;if(a)r.find('.'+a).removeClass(a);if(1===o.length){if(i.value=e,a)o.addClass(a);}else i.value=null;if(!t.silence)i.emit('change',n);}if($.isFunction(i.setText))i.setText(n.text||i.defaultText);},refresh:function(e){var t=this,n=t.value,i={};if(e){var r=e.data;if(r)t.menu.html(t.renderTemplate(r,t.template));if('value'in e)n=e.value,i.force=!0;}t.setValue(n,i);},open:function(){this.popup.open();},close:function(){this.popup.close();},dispose:function(){var e=this;n.dispose(e),e.menu.off(r),e.popup.dispose(),e.popup=e.element=e.button=e.menu=null;}},t(e.prototype),e.defaultOptions={show:{trigger:'click'},hide:{trigger:'click'}};var r='.cobble_ui_combobox';return e;}),define('cobble/util/date',['require','exports','module'],function(require,exports){'use strict';exports.parse=function(e,t,n){var i=!1;if($.isNumeric(e)&&$.isNumeric(t)&&$.isNumeric(n))i=!0;else if(1===arguments.length)if(i=!0,$.isPlainObject(e))n=e.date,t=e.month,e=e.year;else if('string'===$.type(e)){var r=e.split('-');e=r[0],t=r[1],n=r[2];}if(i)if(t>=1&&12>=t&&n>=1&&31>=n)return new Date(e,t-1,n);},exports.stringify=function(e){if('number'===$.type(e))e=new Date(e);var t=e.getFullYear(),n=e.getMonth()+1,e=e.getDate();if(10>n)n='0'+n;if(10>e)e='0'+e;return[t,n,e].join('-');},exports.simplify=function(e){if('number'===$.type(e))e=new Date(e);return{year:e.getFullYear(),month:e.getMonth()+1,date:e.getDate(),day:e.getDay()};},exports.getWeekFirstDay=function(e,t){if('number'===$.type(e))e=new Date(e);var n=e.getDay();return n=n>=t?n:n+7,new Date(e.getTime()-(n-t)*exports.DAY);},exports.getWeekLastDay=function(e,t){return e=exports.getWeekFirstDay(e,t),e.setTime(e.getTime()+6*exports.DAY),e;},exports.getMonthFirstDay=function(e){var t='number'===$.type(e)?e:e.getTime();return e=new Date(t),e.setDate(1),e;},exports.getMonthLastDay=function(e){var t='number'===$.type(e)?e:e.getTime();return e=new Date(t),e.setDate(1),e.setMonth(e.getMonth()+1),e.setDate(0),e;},exports.prevMonth=function(e){var t='number'===$.type(e)?e:e.getTime();return e=new Date(t),e.setDate(1),e.setTime(e.getTime()-exports.WEEK),e;},exports.nextMonth=function(e){var t='number'===$.type(e)?e:e.getTime();return e=new Date(t),e.setDate(28),e.setTime(e.getTime()+exports.WEEK),e;},exports.prevWeek=function(e){return exports.subtract(e,7);},exports.nextWeek=function(e){return exports.add(e,7);},exports.add=function(e,t){if('date'===$.type(e))e=e.getTime();return new Date(e+t*exports.DAY);},exports.subtract=function(e,t){if('date'===$.type(e))e=e.getTime();return new Date(e-t*exports.DAY);},exports.DAY=86400000,exports.WEEK=7*exports.DAY;}),define('cobble/util/etpl',function(){function e(e,t){for(var n in t)if(t.hasOwnProperty(n))e[n]=t[n];return e;}function t(){this.raw=[],this.length=0;}function n(){return'___'+q++;}function i(e,t){var n=new Function();n.prototype=t.prototype,e.prototype=new n(),e.prototype.constructor=e;}function r(e){return R[e];}function o(e){return'"'+e.replace(/\x5C/g,'\\\\').replace(/"/g,'\\"').replace(/\x0A/g,'\\n').replace(/\x09/g,'\\t').replace(/\x0D/g,'\\r')+'"';}function a(e){return e.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+]/g,function(e){return'\\'+e;});}function s(e){var t=arguments;return e.replace(/\{([0-9]+)\}/g,function(e,n){return t[n-0+1];});}function u(e){return e=e.replace(/^\s*\*/,''),s('gv({0},["{1}"])',o(e),e.replace(/\[['"]?([^'"]+)['"]?\]/g,function(e,t){return'.'+t;}).split('.').join('","'));}function l(e,t,n,i,r,o){for(var a=n.length,s=e.split(t),u=0,l=[],f=0,c=s.length;c>f;f++){var p=s[f];if(f){var d=1;for(u++;;){var h=p.indexOf(n);if(0>h){l.push(u>1&&d?t:'',p);break;}if(u=i?u-1:0,l.push(u>0&&d?t:'',p.slice(0,h),u>0?n:''),p=p.slice(h+a),d=0,0===u)break;}if(0===u)r(l.join('')),o(p),l=[];}else p&&o(p);}if(u>0&&l.length>0)o(t),o(l.join(''));}function f(e,t,n){var i,r=[],a=t.options,s='',c='',p='',d='';if(n)s='ts(',c=')',p=O,d=N,i=a.defaultFilter;return l(e,a.variableOpen,a.variableClose,1,function(e){if(n&&e.indexOf('|')<0&&i)e+='|'+i;var o=e.indexOf('|'),a=(o>0?e.slice(0,o):e).replace(/^\s+/,'').replace(/\s+$/,''),l=o>0?e.slice(o+1):'',h=0===a.indexOf('*'),m=[h?'':s,u(a),h?'':c];if(l){l=f(l,t);for(var v=l.split('|'),g=0,y=v.length;y>g;g++){var b=v[g];if(/^\s*([a-z0-9_-]+)(\((.*)\))?\s*$/i.test(b)){if(m.unshift('fs["'+RegExp.$1+'"]('),RegExp.$3)m.push(',',RegExp.$3);m.push(')');}}}r.push(p,m.join(''),d);},function(e){r.push(p,n?o(e):e,d);}),r.join('');}function c(e,t){this.value=e,this.engine=t;}function p(e,t){this.value=e,this.engine=t,this.children=[],this.cloneProps=[];}function d(e,t){var n=e.stack,i=t?n.find(function(e){return e instanceof t;}):n.bottom();if(i){for(var r;(r=n.top())!==i;){if(!r.autoClose)throw new Error(r.type+' must be closed manually: '+r.value);r.autoClose(e);}i.close(e);}return i;}function h(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*(\(\s*master\s*=\s*([a-z0-9\/_-]+)\s*\))?\s*/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.master=RegExp.$3,this.name=RegExp.$1,p.call(this,e,t),this.blocks={};}function m(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*$/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.name=RegExp.$1,p.call(this,e,t),this.cloneProps=['name'];}function v(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*$/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.name=RegExp.$1,p.call(this,e,t),this.cloneProps=['name','state','blocks'],this.blocks={};}function g(e,t){if(!/^\s*([a-z0-9_]+)\s*=([\s\S]*)$/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.name=RegExp.$1,this.expr=RegExp.$2,p.call(this,e,t),this.cloneProps=['name','expr'];}function y(e,t){if(!/^\s*([a-z0-9_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.name=RegExp.$1,this.args=RegExp.$3,p.call(this,e,t),this.cloneProps=['name','args'];}function b(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.name=RegExp.$1,this.args=RegExp.$3,p.call(this,e,t),this.cloneProps=['name','args'];}function $(e,t){var n=new RegExp(s('^\\s*({0}[\\s\\S]+{1})\\s+as\\s+{0}([0-9a-z_]+){1}\\s*(,\\s*{0}([0-9a-z_]+){1})?\\s*$',a(t.options.variableOpen),a(t.options.variableClose)),'i');if(!n.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.list=RegExp.$1,this.item=RegExp.$2,this.index=RegExp.$4,p.call(this,e,t),this.cloneProps=['list','item','index'];}function x(e,t){p.call(this,e,t);}function w(e,t){x.call(this,e,t);}function C(e,t){p.call(this,e,t);}function D(e,t){t.target=e;var n=t.engine,i=e.name;if(n.targets[i])switch(n.options.namingConflict){case'override':n.targets[i]=e,t.targets.push(i);case'ignore':break;default:throw new Error('Target exists: '+i);}else n.targets[i]=e,t.targets.push(i);}function T(e,t){j[e]=t,t.prototype.type=e;}function k(t){this.options={commandOpen:'<!--',commandClose:'-->',commandSyntax:/^\s*(\/)?([a-z]+)\s*(?::([\s\S]*))?$/,variableOpen:'${',variableClose:'}',defaultFilter:'html'},this.config(t),this.targets={},this.filters=e({},_);}function E(e,n){function i(){var e;if(h.length>0&&(e=h.join(''))){var t=new c(e,n);if(t.beforeAdd(f),u.top().addChild(t),h=[],n.options.strip&&f.current instanceof p)t.value=e.replace(/^[\x20\t\r]*\n/,'');f.current=t;}}var r,o=n.options.commandOpen,a=n.options.commandClose,s=n.options.commandSyntax,u=new t(),f={engine:n,targets:[],stack:u,target:null},h=[];return l(e,o,a,0,function(e){var t=s.exec(e);if(t&&(r=j[t[2].toLowerCase()])&&'function'==typeof r){i();var u=f.current;if(n.options.strip&&u instanceof c)u.value=u.value.replace(/\r?\n[\x20\t]*$/,'\n');if(t[1])u=d(f,r);else{if(u=new r(t[3],n),'function'==typeof u.beforeOpen)u.beforeOpen(f);u.open(f);}f.current=u;}else if(!/^\s*\/\//.test(e))h.push(o,e,a);r=null;},function(e){h.push(e);}),i(),d(f),f.targets;}t.prototype={push:function(e){this.raw[this.length++]=e;},pop:function(){if(this.length>0){var e=this.raw[--this.length];return this.raw.length=this.length,e;}},top:function(){return this.raw[this.length-1];},bottom:function(){return this.raw[0];},find:function(e){for(var t=this.length;t--;){var n=this.raw[t];if(e(n))return n;}}};var q=178245,R={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'},_={html:function(e){return e.replace(/[&<>"']/g,r);},url:encodeURIComponent,raw:function(e){return e;}},S='var r="";',O='r+=',N=';',P='return r;';if('undefined'!=typeof navigator&&/msie\s*([0-9]+)/i.test(navigator.userAgent)&&RegExp.$1-0<8)S='var r=[],ri=0;',O='r[ri++]=',P='return r.join("");';c.prototype={getRendererBody:function(){var e=this.value,t=this.engine.options;if(!e||t.strip&&/^\s*$/.test(e))return'';else return f(e,this.engine,1);},clone:function(){return this;}},p.prototype={addChild:function(e){this.children.push(e);},open:function(e){var t=e.stack.top();t&&t.addChild(this),e.stack.push(this);},close:function(e){if(e.stack.top()===this)e.stack.pop();},getRendererBody:function(){for(var e=[],t=this.children,n=0;n<t.length;n++)e.push(t[n].getRendererBody());return e.join('');},clone:function(){for(var e=new this.constructor(this.value,this.engine),t=0,n=this.children.length;n>t;t++)e.addChild(this.children[t].clone());for(var t=0,n=this.cloneProps.length;n>t;t++){var i=this.cloneProps[t];e[i]=this[i];}return e;}};var A='data=data||{};var v={},fs=engine.filters,hg=typeof data.get=="function",gv=function(n,ps){var p=ps[0],d=v[p];if(d==null){if(hg){return data.get(n);}d=data[p];}for(var i=1,l=ps.length;i<l;i++)if(d!=null)d = d[ps[i]];return d;},ts=function(s){if(typeof s==="string"){return s;}if(s==null){s="";}return ""+s;};';i(h,p),i(m,p),i(v,p),i(g,p),i(y,p),i(b,p),i($,p),i(x,p),i(w,x),i(C,x);var B={READING:1,READED:2,APPLIED:3,READY:4};v.prototype.applyMaster=h.prototype.applyMaster=function(e){function t(e){var i=e.children;if(i instanceof Array)for(var r=0,o=i.length;o>r;r++){var a=i[r];if(a instanceof m&&n[a.name])a=i[r]=n[a.name];t(a);}}if(this.state>=B.APPLIED)return 1;var n=this.blocks,i=this.engine.targets[e];if(i&&i.applyMaster(i.master))return this.children=i.clone().children,t(this),this.state=B.APPLIED,1;else return void 0;},h.prototype.isReady=function(){function e(i){for(var r=0,o=i.children.length;o>r;r++){var a=i.children[r];if(a instanceof v){var s=t.targets[a.name];n=n&&s&&s.isReady(t);}else if(a instanceof p)e(a);}}if(this.state>=B.READY)return 1;var t=this.engine,n=1;if(this.applyMaster(this.master))return e(this),n&&(this.state=B.READY),n;else return void 0;},h.prototype.getRenderer=function(){if(this.renderer)return this.renderer;if(this.isReady()){var e=new Function('data','engine',[A,S,this.getRendererBody(),P].join('\n')),t=this.engine;return this.renderer=function(n){return e(n,t);},this.renderer;}return null;},h.prototype.open=function(e){d(e),p.prototype.open.call(this,e),this.state=B.READING,D(this,e);},g.prototype.open=b.prototype.open=function(e){e.stack.top().addChild(this);},m.prototype.open=function(e){p.prototype.open.call(this,e),(e.imp||e.target).blocks[this.name]=this;},w.prototype.open=function(e){var t=new C();t.open(e);var n=d(e,x);n.addChild(this),e.stack.push(this);},C.prototype.open=function(e){var t=d(e,x);t.addChild(this),e.stack.push(this);},v.prototype.open=function(e){this.parent=e.stack.top(),this.target=e.target,p.prototype.open.call(this,e),this.state=B.READING,e.imp=this;},b.prototype.close=g.prototype.close=function(){},v.prototype.close=function(e){p.prototype.close.call(this,e),this.state=B.READED,e.imp=null;},h.prototype.close=function(e){p.prototype.close.call(this,e),this.state=this.master?B.READED:B.APPLIED,e.target=null;},v.prototype.autoClose=function(e){var t=this.parent.children;t.push.apply(t,this.children),this.children.length=0;for(var n in this.blocks)this.target.blocks[n]=this.blocks[n];this.blocks={},this.close(e);},b.prototype.beforeOpen=v.prototype.beforeOpen=g.prototype.beforeOpen=$.prototype.beforeOpen=y.prototype.beforeOpen=m.prototype.beforeOpen=x.prototype.beforeOpen=c.prototype.beforeAdd=function(e){if(!e.stack.bottom()){var t=new h(n(),e.engine);t.open(e);}},v.prototype.getRendererBody=function(){return this.applyMaster(this.name),p.prototype.getRendererBody.call(this);},b.prototype.getRendererBody=function(){return s('{0}engine.render({2},{{3}}){1}',O,N,o(this.name),f(this.args,this.engine).replace(/(^|,)\s*([a-z0-9_]+)\s*=/gi,function(e,t,n){return(t||'')+o(n)+':';}));},g.prototype.getRendererBody=function(){if(this.expr)return s('v[{0}]={1};',o(this.name),f(this.expr,this.engine));else return'';},x.prototype.getRendererBody=function(){return s('if({0}){{1}}',f(this.value,this.engine),p.prototype.getRendererBody.call(this));},C.prototype.getRendererBody=function(){return s('}else{{0}',p.prototype.getRendererBody.call(this));},$.prototype.getRendererBody=function(){return s('var {0}={1};if({0} instanceof Array)for (var {4}=0,{5}={0}.length;{4}<{5};{4}++){v[{2}]={4};v[{3}]={0}[{4}];{6}}else if(typeof {0}==="object")for(var {4} in {0}){v[{2}]={4};v[{3}]={0}[{4}];{6}}',n(),f(this.list,this.engine),o(this.index||n()),o(this.item),n(),n(),p.prototype.getRendererBody.call(this));},y.prototype.getRendererBody=function(){var e=this.args;return s('{2}fs[{5}]((function(){{0}{4}{1}})(){6}){3}',S,P,O,N,p.prototype.getRendererBody.call(this),o(this.name),e?','+f(e,this.engine):'');};var j={};T('target',h),T('block',m),T('import',v),T('use',b),T('var',g),T('for',$),T('if',x),T('elif',w),T('else',C),T('filter',y),k.prototype.config=function(t){e(this.options,t);},k.prototype.compile=k.prototype.parse=function(e){if(e){var t=E(e,this);if(t.length)return this.targets[t[0]].getRenderer();}return new Function('return ""');},k.prototype.getRenderer=function(e){var t=this.targets[e];if(t)return t.getRenderer();else return void 0;},k.prototype.render=function(e,t){var n=this.getRenderer(e);if(n)return n(t);else return'';},k.prototype.addFilter=function(e,t){if('function'==typeof t)this.filters[e]=t;};var F=new k();return F.Engine=k,F;}),define('cobble/util/instance',['require','exports','module'],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body);}),define('cobble/util/time',['require','exports','module'],function(require,exports){'use strict';exports.parse=function(e,t,n){var i=!1;if($.isNumeric(e)&&$.isNumeric(t)){if(i=!0,!$.isNumeric(n))n=0;}else if(1===arguments.length)if('string'===$.type(e)){var r=e.split(':');if(r.length>1&&r.length<4)i=!0,e=+$.trim(r[0]),t=+$.trim(r[1]),n=+$.trim(r[2]);}else if($.isPlainObject(e))i=!0,n=e.second||0,t=e.minute||0,e=e.hour;if(i)if(e>=0&&23>=e&&t>=0&&59>=t&&n>=0&&59>=n){var o=new Date();return o.setHours(e),o.setMinutes(t),o.setSeconds(n),o;}},exports.stringify=function(e,t){var n=e.getHours(),i=e.getMinutes(),r=e.getSeconds();if(10>n)n='0'+n;if(10>i)i='0'+i;if(10>r)r='0'+r;var o=[];if(!t)t={hour:!0,minute:!0};if(t.hour)o.push(n);if(t.minute)o.push(i);if(t.second)o.push(r);return o.join(':');},exports.simplify=function(e){return{hour:e.getHours(),minute:e.getMinutes(),second:e.getSeconds()};},exports.add=function(e,t){var n=0;if('number'===$.type(t.hour))n+=exports.HOUR*t.hour;if('number'===$.type(t.minute))n+=exports.MINUTE*t.minute;if('number'===$.type(t.second))n+=exports.SECOND*t.second;return new Date(e.getTime()+n);},exports.subtract=function(e,t){var n=0;if('number'===$.type(t.hour))n+=exports.HOUR*t.hour;if('number'===$.type(t.minute))n+=exports.MINUTE*t.minute;if('number'===$.type(t.second))n+=exports.SECOND*t.second;return new Date(e.getTime()-n);},exports.SECOND=1000,exports.MINUTE=60*exports.SECOND,exports.HOUR=60*exports.MINUTE;}),define('common/component/DaytimeSelect_ae43c2a42c',['require','cobble/helper/Popup','cobble/util/time'],function(require){'use strict';function e(t){$.extend(this,e.defaultOptions,t),this.init();}var t=require('cobble/helper/Popup'),n=require('cobble/util/time');e.prototype={init:function(){var e=this;e.refresh();var n=e.element,i=n.find('.form-text');i.blur(function(){if(!e.disabled)e.setValue(this.value);});var r=n.find('.dropdown-menu'),o=e.popup=new t({element:n.find('.trigger, input[class="form-text"]'),layer:r,show:{trigger:'click'},hide:{trigger:'click'},onAfterShow:function(){n.addClass('open');},onAfterHide:function(){n.removeClass('open');},onBeforeShow:function(){if(e.disabled)return!1;else return void 0;}});r.on('click','[data-value]',function(t){var n=$(t.currentTarget);r.find('.active').removeClass('active'),n.addClass('active'),o.close(),e.setValue($(t.currentTarget).data('value'));});},disable:function(){this.popup.onBeforeShow=function(){return!1;},this.disabled=!0;},enable:function(){this.popup.onBeforeShow=function(){return!0;},this.disabled=!1;},refresh:function(e){if(e)$.extend(this,e);var t=this.element;if(this.selectFirst)t.find(':text').val(n.stringify(n.parse(this.min)));else t.find(':text').prop('placeholder',this.defaultText);var r=n.parse(this.min),o=n.parse(this.max);if(r>o)o.setTime(o.getTime()+i);for(var a=this.step*n.MINUTE,s='',u=0,l=+r;o>=l;l+=a)u++,s+=this.itemRender({index:u,text:n.stringify(new Date(l))});t.find('.dropdown-menu').html(s);},getValue:function(){return this.element.find(':text').val();},setValue:function(e,t){var i,r=this;if(r.validate(e))i=n.parse(e);else i=n.parse(r.min);if(this.element.find(':text').val(n.stringify(i)),$.isFunction(r.onChange)&&(!t||!t.silence))r.onChange();},validate:function(e){var t=n.parse(e),i=n.parse(this.min),r=n.parse(this.max);return t>=i&&r>=t;}},e.defaultOptions={min:{hour:0,minute:0},max:{hour:23,minute:59},step:30,selectFirst:!0,defaultText:'',disabled:!1,itemRender:function(e){return'<li data-index="'+e.index+'" data-value="'+e.text+'">'+e.text+'</li>';}};var i=24*n.HOUR;return e;}),define('teacherCenter/course/QuickTeachingPlanSchedule',['require','exports','common/component/DaytimeSelect_ae43c2a42c','cobble/util/date','cobble/util/time','cobble/form/Select','cobble/util/etpl','moment','cobble/form/Validator'],function(require){'use strict';function e(e){var t=p,n=o.parse(t.min),i=o.parse(t.max);e.refresh({min:o.simplify(n),max:o.simplify(i)});}function t(e,t){for(var n,i=o.add(t,{minute:30}),r=p,a=o.add(o.parse(r.max),{minute:30}),s=[],u=+i;a>=u;u+=d){n=new Date(u);var l=(n.getTime()-t.getTime())/o.HOUR;s.push({value:o.stringify(n),hour:l});}e.refresh({data:s,value:null});}function n(e,t){e=e.clone();var n=t.split(':'),i=n[0],r=n[1];if(0==i&&0==r)e.add(1,'d');return e.add(i,'h').add(r,'m');}function i(e){$.extend(this,e),this.init();}var r=require('common/component/DaytimeSelect_ae43c2a42c'),o=(require('cobble/util/date'),require('cobble/util/time')),a=require('cobble/form/Select'),s=require('cobble/util/etpl'),u=require('moment'),l=require('cobble/form/Validator'),f='<div class="form"><div class="time"><div class="form-group inline"><label class="form-label">上课时间</label><div class="form-controls"><div class="dropdown start-time"><input type="text" class="form-text" name="start_time" required/><span class="trigger"><i class="caret"></i></span><ul class="dropdown-menu"></ul></div><span class="error"></span></div></div><span class="to">&nbsp;&nbsp;至&nbsp;&nbsp;</span><div class="form-group inline"><label class="form-label">下课时间</label><div class="form-controls"><div class="dropdown end-time" required><button class="btn-default"><i class="caret"></i><span>下课时间</span></button><ul class="dropdown-menu"></ul></div><span class="error"></span></div></div></div><div class="week-day form-group inline">'+$.map([{labelName:'周一',value:'1'},{labelName:'周二',value:'2'},{labelName:'周三',value:'3'},{labelName:'周四',value:'4'},{labelName:'周五',value:'5'},{labelName:'周六',value:'6'},{labelName:'周日',value:'0'},{labelName:'全选',value:'all'}],function(e){return'<label class="day"><div>'+e.labelName+'</div><div class="day-check"><input type="checkbox" name="week_day" value="'+e.value+'"></div></label>';}).join('')+'<span class="error"></span></div><div class="actions"><b class="delete">删除时段</b></div></div>',c='.QuickTeachingPlanSchedule',p={min:{hour:6,minute:0},max:{hour:23,minute:30}},d=30*o.MINUTE,h=s.compile('<!-- for: ${list} as ${item} --><li data-value="${item.value}" data-text="${item.value}">${item.value}<small class="text-info">${item.hour}小时</small></li><!-- /for -->');return i.prototype={init:function(){var n=this,i=n.element=$(f);if(n.container){n.container.append(i);var s=n.startTime=new r({element:i.find('.start-time'),selectFirst:!1,defaultText:'上课时间',onChange:function(){var e=this.element.find(':text').val();t(u,o.parse(e));}});e(s);var u=n.endTime=new a({element:i.find('.end-time'),defaultText:'下课时间',name:'end_time',renderTemplate:function(e){return h({list:e});}});n.validator=new l({element:i,fields:{start_time:{errors:{required:'请选择上课时间'}},end_time:{errors:{required:'请选择下课时间'}},week_day:{custom:function(){if(i.find('.week-day :checked').length>0)return!1;else return'请至少选择一项';}}}});}i.on('click'+c,'.delete',function(){n.container.trigger('removeschedule',n);}).on('click','.week-day [value="all"]',function(){if($(this).is(':checked'))n.element.find('.week-day :checkbox').prop('checked',!0);else n.element.find('.week-day :checkbox').prop('checked',!1);});},remove:function(){this.endTime.dispose(),this.endTime=null,this.element.off(c).remove();},getCalculatedSchedule:function(){for(var e=this,t=$.map(e.element.find('.week-day :checked').filter('[value!="all"]'),function(e){return Number($(e).val());}),i=u(e.startDate),r=u(e.endDate),o=e.startTime.getValue(),a=e.endTime.getValue(),s=[],l=i;r>=l;l.add(1,'d'))if(-1!=$.inArray(l.day(),t))s.push({begin:n(l,o)._d.getTime()/1000,end:n(l,a)._d.getTime()/1000});return s;},validate:function(){return this.validator.validate();},refresh:function(e){this.startDate=e.startDate,this.endDate=e.endDate;}},i;});