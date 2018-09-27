define('cobble/form/Date',['require','exports','module','../function/jquerify','../function/lifeCycle','../function/contains','../function/lpad','../function/init','../function/replaceWith','../ui/Calendar','../helper/Popup','../util/date'],function(require){'use strict';function e(e){return n.init(this,e);}var t=require('../function/jquerify'),n=require('../function/lifeCycle'),i=require('../function/contains'),r=require('../function/lpad'),o=require('../function/init'),a=require('../function/replaceWith'),u=require('../ui/Calendar'),l=require('../helper/Popup'),s=require('../util/date');return e.prototype={constructor:e,type:'Date',init:function(){var e,t=this,n=t.element,r=t.calendarSelector;if(1===n.find(r).length)e=n,n=t.element=e.find(':text');else e=$(t.template),a(n,e),a(e.find(':text'),n);var o=e.find(r);if(o.is(':visible'))o.hide();if('string'!==$.type(t.value))t.value=n.val();if(t.calendar=new u({element:o,mode:'month',date:t.date,today:t.today,template:t.calendarTemplate,renderTemplate:$.proxy(t.renderCalendarTemplate,t),prevSelector:t.prevSelector,nextSelector:t.nextSelector,onChange:function(){t.setValue(this.value);}}),t.popup=new l({element:n,layer:o,show:{trigger:'focus'},hide:{trigger:'click'},onBeforeHide:function(e){if('eventPhase'in e){var t=$(e.target);if(t[0]===n[0]||!i(document,t)||i(o,t))return!1;}}}),t.value)t.setValue(t.value,{force:!0,silence:!0});},open:function(){this.popup.open();},close:function(){this.popup.close();},getValue:function(){return this.value;},setValue:function(e,t){var n=this;e='string'===$.type(e)?$.trim(e):'',t=t||{};var i,r=e.match(n.pattern);if(r){if(r.length<4)throw new Error('[form/Date]pattern 必须包含 3 个分组.');i=s.parse(parseInt(r[1],10),parseInt(r[2],10),parseInt(r[3],10));}else e='';if(t.force||e!==n.value){n.value=e;var o=n.calendar;if(i&&!o.inRange(i))o.render(i);if(o.setValue(e,{silence:!0}),n.element.val(e),n.popup.close(),!t.silence)n.emit('change');}},render:function(e){this.calendar.render(e);},dispose:function(){var e=this;n.dispose(e),e.calendar.dispose(),e.popup.dispose(),e.calendar=e.popup=null;}},t(e.prototype),e.defaultOptions={template:'<div class="form-date"><input type="text" /><div class="calendar"></div></div>',disablePast:!0,prevSelector:'.icon-chevron-left',nextSelector:'.icon-chevron-right',calendarSelector:'.calendar',calendarTemplate:'',pattern:/^(\d{4})-(\d{2})-(\d{2})$/,renderCalendarTemplate:function(e){var t=this.disablePast;$.each(e.list,function(e,t){t.text=[t.year,r(t.month),r(t.date)].join('-');});var n=['<div class="calendar-header">','<i class="icon icon-chevron-left"></i>','<strong>',e.year,'年',e.month,'月</strong>','<i class="icon icon-chevron-right"></i>','</div>','<table>','<thead>','<tr>','<th>一</th>','<th>二</th>','<th>三</th>','<th>四</th>','<th>五</th>','<th>六</th>','<th>日</th>','</tr>','</thead>','<tbody>'];return $.each(e.list,function(e,i){if(e%7===0)n.push(0===e?'<tr>':'</tr>');n.push('<td class="'+i.phase);var r=!t||'past'!==i.phase;if(!r)n.push(' date-disabled');if(n.push('"'),r)n.push(' data-value="'+i.text+'"');n.push(' data-year="'+i.year+'"'),n.push(' data-month="'+i.month+'"'),n.push(' data-date="'+i.date+'">'),n.push(i.date),n.push('</td>');}),n.push('</tbody></table>'),n.join('');}},e.init=o(e),e;}),define('cobble/form/Text',['require','exports','../helper/Input','../helper/Placeholder','../function/init','../function/jquerify','../function/lifeCycle'],function(require){'use strict';function e(e){return o.init(this,e);}var t=require('../helper/Input'),n=require('../helper/Placeholder'),i=require('../function/init'),r=require('../function/jquerify'),o=require('../function/lifeCycle');return e.prototype={constructor:e,type:'Text',init:function(){var e=this,i=e.element;e.placeholder=new n({element:i,simple:e.placeholderSimple,nativeFirst:e.placeholderNativeFirst,placeholderSelector:e.placeholderSelector,template:e.template});var r=e.action;if(r)$.each(r,function(t,n){r[t]=$.proxy(n,e);});e.input=new t({element:i,onChange:function(t){e.emit(t);},onKeyDown:function(t){e.emit(t);},action:r});},getValue:function(){return $.trim(this.element.val());},setValue:function(e,t){var n=this;if(t=t||{},t.force||n.getValue()!==e){if(n.element.val(e),n.placeholder)n.placeholder.refresh();if(!t.silence)n.emit('change');}},dispose:function(){var e=this;o.dispose(e),e.input.dispose(),e.placeholder.dispose(),e.element=e.input=e.placeholder=null;}},r(e.prototype),e.defaultOptions={simple:!1,nativeFirst:!0,placeholderSelector:'.placeholder',template:'<div class="placeholder-wrapper"><div class="placeholder"></div></div>'},e.init=i(e),e;}),define('cobble/form/Validator',['require','exports','module','../function/jquerify','../function/lifeCycle'],function(require){'use strict';function e(e){return r.init(this,e);}function t(e,t){if(e.length>0){var n=e[0].element;if(n.is(':hidden'))n=n.parent();var i=n.offset().top;if(t>0)i-=t;window.scrollTo(window.scrollX,i);}}function n(e){var t=$.Deferred();return $.when.apply($,e).done(function(){t.resolve(arguments);}),t;}var i=require('../function/jquerify'),r=require('../function/lifeCycle');e.prototype={constructor:e,type:'Validator',init:function(){var t=this,n=t.element,i='FORM'===n.prop('tagName')?n:n.find('form');if(i.length>0)i.attr('novalidate','novalidate').on('submit'+a,$.proxy(t.validate,t));$.each(t.fields,function(t,i){var r=n.find('[name="'+t+'"]'),a=i.type;if(!a)a=i.type=r.attr('type')||'text';var u=i.rules;if(!u)u=i.rules={};var l=e.type[a]||[];$.each(l,function(e,t){if(null==u[t]){var n=o[t];if($.isFunction(n))u[t]=n(r,i);}});});var r=t.groupSelector;if(n.on('focusin'+a,function(e){var n=$(e.target).closest(r),i=[t.successClass,t.errorClass,t.requiredClass].join(' ');n.removeClass($.trim(i));}),t.realtime)n.on('focusout'+a,function(e){var n=$(e.target),i=n.prop('name');if(!i)n=n.find('[name]'),i=n.prop('name');if(i)t.validate(i);});},validate:function(e,i){var r=this,o=r.emit('beforeValidate');if(!o.isDefaultPrevented()){var a,u=r.element,l=r.groupSelector;if('string'===$.type(e))e=[e];if($.isArray(e))a=$.map(e,function(e){return u.find('[name="'+e+'"]').closest(l);});else if(a=u.find(l),'boolean'===$.type(e))i=e;var s=[],c=[];$.each(a,function(e,t){var n=r.validateGroup($(t));if(n){if(n.promise)c.push(n),n=n.data;$.merge(s,n);}});var e=[],f=[],d=function(){if($.each(s,function(t,n){if(n.error)f.push(n);e.push(n.element.prop('name'));}),i)t(f,r.scrollGap);r.emit('afterValidate',{fields:e,errors:f});};if(c.length>0)return n(c).done(d);else return d(),0===f.length;}},validateGroup:function(t){if(t.is(':visible')){var i=this,r=[],o=[],a=[];if(t.find('[name]').each(function(t){var n,u,l=this,s=l.name,c=l.value,f=l.disabled,d=$(l);if(!f){var p=i.fields[s];if(p){n=!0,p=$.extend(!0,{},p),p.form=i.element,p.value=$.trim(c);var h;if($.each(e.type[p.type]||[],function(t,n){var i=e.rule[n](p);if(i===!1)return h=n,!1;else if(''===p.value&&'required'===n)return!1;}),h){var m=p.errors;if(m)u=m[h];if(!u)throw new Error(s+' 字段 '+h+' 类型错误信息未定义');}else if($.isFunction(p.custom)){var v=$.Deferred(),y=p.custom(d,function(e){v.resolve(e);});u=null==y||y.done?v:y;}}}if(n)if(t=r.push({element:d,error:u}),u&&u.promise)o.push(u),a.push(t-1);}),o.length>0){var u=n(o).done(function(e){$.each(e,function(e,t){r[a[e]].error=t;}),i.refreshGroup(t,r);});return u.data=r,u;}else return i.refreshGroup(t,r),r;}},refreshGroup:function(e,t){var n=this,i=n.successClass,r=n.errorClass;$.each(t,function(t,o){var a,u=o.element,l=o.error,s=n.errorSelector;if(s)a=e.find(s).eq(t);if(l&&'string'===$.type(l)){if(e.removeClass(i).addClass(r),a){var c=n.renderTemplate;if($.isFunction(c))l=c({text:l},n.errorTemplate);a.html(l).show();var f=n.errorPlacement;if($.isFunction(f))f(u,a);}}else if(o.error='',e.removeClass(r).addClass(i),a)a.html('').hide();});},dispose:function(){var e=this;r.dispose(e),e.element.off(a),e.element=null;}},i(e.prototype),e.defaultOptions={realtime:!1,scrollGap:100,groupSelector:'.form-group',successClass:'has-success',errorClass:'has-error',errorSelector:'.error',errorTemplate:'<i class="icon icon-times-circle"></i>&nbsp;${text}',requiredClass:'has-required',requiredSelector:'.required',requiredTemplate:'${text}',renderTemplate:function(e,t){return t.replace(/\${(\w+)}/g,function(t,n){return e[n]||'';});},errorPlacement:function(e,t){if('hidden'===e.prop('type'))e=e.parent();t.css({position:'static',width:'auto'});var n=t.outerWidth(!0)+5;t.css({position:'absolute',width:n});var i=e.parent();if(i.is('.placeholder-wrapper'))e=i;var r=e.position();t.css({left:r.left+e.outerWidth()-37,top:r.top-t.outerHeight()+8});}},e.type={text:['required','pattern','min','max','minlength','maxlength'],hidden:['required'],password:['required','pattern','minlength','maxlength','equals'],number:['required','pattern','min','max','step'],range:['required','pattern','min','max','step'],tel:['required','pattern'],url:['required','pattern'],email:['required','pattern'],mobile:['required','pattern'],money:['required','pattern','min','max'],idcard:['required','pattern'],'int':['required','pattern','min','max'],internationalMobile:['required','pattern']},e.rule={required:function(e){if(e.value.length>0)return!0;else if(e.rules.required)return!1;},pattern:function(e){var t=e.rules.pattern;if(t)return t.test(e.value);else return void 0;},minlength:function(e){var t=e.rules.minlength;if($.isNumeric(t))return e.value.length>=+t;else return void 0;},maxlength:function(e){var t=e.rules.maxlength;if($.isNumeric(t))return e.value.length<=+t;else return void 0;},min:function(e){var t=e.rules.min;if($.isNumeric(t))return e.value>=+t;else return void 0;},max:function(e){var t=e.rules.max;if($.isNumeric(t))return e.value<=+t;else return void 0;},step:function(e){var t=e.rules.step;if($.isNumeric(t)){var n=e.rules.min||1;return(e.value-n)%t===0;}},equals:function(e){var t=e.rules.equals;if(t){var n=e.form.find('[name="'+t+'"]');return e.value===$.trim(n.val());}}},e.pattern={number:/^[\d.]*$/,'int':/^\d+$/,url:/^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/,tel:/^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/,mobile:/^1[3-9]\d{9}$/,email:/^(?:[a-z0-9]+[_\-+.]+)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i,money:/^[\d.]*$/,idcard:/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i,internationalMobile:/^\d{7,20}$/};var o={required:function(e){return'required'===e.attr('required');},pattern:function(t,n){var i=t.attr('pattern')||e.pattern[n.type];if('string'===$.type(i))i=new RegExp(i);return i;},minlength:function(e){return e.attr('minlength');},maxlength:function(e){return e.attr('maxlength');},min:function(e){return e.attr('min');},max:function(e){return e.attr('max');},step:function(e){return e.attr('step');},equals:function(e){return e.attr('equals');}},a='.cobble_form_validator';return e;}),define('cobble/function/around',['require','exports','module'],function(){'use strict';return function(e,t,n,i){var r='string'===$.type(t),o=r?e[t]:e;if(!r)i=n,n=t;var a=function(){var e,t=arguments;if($.isFunction(n))e=n.apply(this,t);if(e!==!1){if($.isFunction(o))e=o.apply(this,t);if($.isFunction(i)){var r=i.apply(this,t);if('undefined'!==$.type(r))e=r;}return e;}};return r?e[t]=a:a;};}),define('cobble/function/call',['require','exports','module'],function(){'use strict';return function(e,t,n){if($.isFunction(e)){var i=$.isArray(n)?'apply':'call';return e[i](t,n);}};}),define('cobble/function/contains',['require','exports','module'],function(){'use strict';return function(e,t){if(e=e.jquery?e[0]:e,t=t.jquery?t[0]:t,!e||!t)return!1;if(e===t)return!0;else return $.contains(e,t);};}),define('cobble/function/init',['require','exports','module'],function(){'use strict';return function(e){return function(t,n){var i=[];return t.each(function(){i.push(new e($.extend({element:$(this)},n)));}),i;};};}),define('cobble/function/isHidden',['require','exports','module'],function(){'use strict';return function(e){e.css('display');return'none'===e.css('display')||0==e.css('opacity')||'hidden'===e.css('visibility');};}),define('cobble/function/jquerify',['require','exports','module'],function(){'use strict';function e(e){return e.faker||e.element;}var t=$.prototype,n={on:function(){return t.on.apply(e(this),arguments),this;},off:function(){return t.off.apply(e(this),arguments),this;},emit:function(n,i){var r=this,o=e(r);if(o){if(!n[$.expando])n='string'===$.type(n)?$.Event(n):$.Event(null,n);n.cobble=r;var a=[n];if(i)a.push(i);var u=r[$.camelCase('on-'+n.type)];if($.isFunction(u)&&u.apply(r,a)===!1)n.preventDefault();if(!n.isPropagationStopped())t.trigger.apply(o,a);return n;}},before:function(t){e(this).before(t);},after:function(t){e(this).after(t);},appendTo:function(t){e(this).appendTo(t);},prependTo:function(t){e(this).prependTo(t);}};return function(e){$.each(n,function(t,n){if(null==e[t])e[t]=n;});};}),define('cobble/function/lifeCycle',['require','exports'],function(require,exports){'use strict';exports.init=function(e,t){var n=e.constructor,i='__cobble__'+n.prototype.type,r=t.element;if(r&&r.data(i))e=r.data(i);else if($.extend(e,n.defaultOptions,t),e.init(),r)r.data(i,e);return e;},exports.dispose=function(e){var t='__cobble__'+e.constructor.prototype.type,n=e.element;if(n)n.removeData(t);};}),define('cobble/function/lpad',['require','exports','module'],function(){'use strict';return function(e,t){if(null==t)t=2;var n=new Array(t-(''+e).length+1);return n.join('0')+e;};}),define('cobble/function/replaceWith',['require'],function(){'use strict';return function(e,t){e=e[0],t=t[0],e.parentNode.replaceChild(t,e);};}),define('cobble/function/split',['require','exports','module'],function(){'use strict';return function(e,t){var n=[];return $.each(e.split(t),function(e,t){if(t=$.trim(t))n.push(t);}),n;};}),define('cobble/helper/Input',['require','exports','module','../function/around','../function/jquerify','../function/lifeCycle','../util/keyboard','../util/input','./Keyboard'],function(require){'use strict';function e(e){return n.init(this,e);}var t=(require('../function/around'),require('../function/jquerify')),n=require('../function/lifeCycle'),i=require('../util/keyboard'),r=require('../util/input'),o=require('./Keyboard');e.prototype={constructor:e,type:'Input',init:function(){var e=this,t=e.element;r.init(t);var n=e.action;if(n)$.each(n,function(t,i){n[t]=$.proxy(i,e);});var u,l;e.keyboard=new o({element:t,action:n,longPress:e.longPress,onKeyDown:function(t){e.emit(t);},onKeyUp:function(t){e.emit(t);},onBeforeLongPress:function(){u=t.val(),l=!0,e.emit('beforeLongPress');},onAfterLongPress:function(n){if(l=!1,e.emit('afterLongPress'),u!==t.val()&&(i.isCharKey(n.keyCode)||i.isDeleteKey()))e.emit('change');}}),t.on('input'+a,function(){if(!l||!e.smart)e.emit('change');});},autoWidth:function(){var e=this,t=e.element;e.on('change',function(){if(t.scrollLeft()>0)t.width(t.prop('scrollWidth'));});},autoHeight:function(){var e=this,t=e.element;if('hidden'!==t.css('overflow-y'))t.css('overflow-y','hidden');var n,i=t.height(),r=i,o=parseInt(t.css('font-size'),10),a=t.innerHeight()-i;e.on('change',function(){if(r!==i)r=i,t.height(i);if(n=t.prop('scrollHeight')-a,Math.abs(n-r)>o)t.height(n),r=n;});},dispose:function(){var e=this;n.dispose(e);var t=e.element;r.dispose(t),t.off(a),e.keyboard.dispose(),e.element=e.keyboard=null;}},t(e.prototype),e.defaultOptions={smart:!0,longPress:!1};var a='.cobble_helper_input';return e;}),define('cobble/helper/Keyboard',['require','exports','module','../function/call','../function/split','../function/jquerify','../util/keyboard'],function(require){'use strict';function e(t){$.extend(this,e.defaultOptions,t),this.init();}function t(e){var t=[];return $.each(e,function(e,n){var i=[],r='plus',a=o(e.replace(/\$\+/g,r),'+');if($.each(u.combinationKey,function(e){if($.inArray(e,a)<0)a.push('!'+e);}),$.each(a,function(e,t){var n=0===t.indexOf('!');if(n)t=t.substr(1);if(t===r)t='$+';if(u.combinationKey[t])i.push((n?'!':'')+'e.'+t+'Key');else if(u[t])i.push('e.keyCode==='+u[t]);else return i.length=0,!1;}),i.length>0)t.push({test:new Function('e','return '+i.join('&')),handler:n});}),t;}function n(e){var t=e.data,n=e.keyCode,i=t.cache,o=i.counter;if(i.keyCode===n&&o>0){if(1===o)t.emit({type:'beforeLongPress',keyCode:n});o++;}else i.keyCode=n,o=1;if(i.counter=o,t.longPress||1===o)$.each(i.action,function(n,i){if(i.test(e))r(i.handler,t,e);});e.type='keyDown',t.emit(e);}function i(e){var t=e.data,n=t.cache;if(n.keyCode=null,n.counter>1)t.emit({type:'afterLongPress',keyCode:e.keyCode}),n.counter=0;e.type='keyUp',t.emit(e);}var r=require('../function/call'),o=require('../function/split'),a=require('../function/jquerify'),u=require('../util/keyboard');e.prototype={constructor:e,type:'Keyboard',init:function(){var e=this;e.cache={counter:0,action:t(e.action||{})},e.element.on('keydown'+l,e,n).on('keyup'+l,e,i);},dispose:function(){var e=this;e.element.off(l),e.element=e.cache=null;}},a(e.prototype),e.defaultOptions={longPress:!1};var l='.cobble_helper_keyboard';return e;}),define('cobble/helper/Placeholder',['require','exports','module','../function/init','../function/jquerify','../function/lifeCycle','../function/replaceWith','../util/input'],function(require){'use strict';function e(e){return i.init(this,e);}var t=require('../function/init'),n=require('../function/jquerify'),i=require('../function/lifeCycle'),r=require('../function/replaceWith'),o=require('../util/input');e.prototype={constructor:e,type:'Placeholder',init:function(){var e=this,t=e.element,n=t.attr('placeholder');if(null==e.value)e.value=n||'';var i;if(l)if(e.nativeFirst)i='native';else if(n)t.removeAttr('placeholder');if(!i)i=e.simple?'simple':'complex';if(i=s[i],$.extend(e,i),i.init)e.init();if(e.refresh)e.refresh();}},n(e.prototype),e.defaultOptions={simple:!1,nativeFirst:!0,simpleClass:'placeholder-active',placeholderSelector:'.placeholder',template:'<div class="placeholder-wrapper"><div class="placeholder"></div></div>'},e.init=t(e);var a='.cobble_helper_placeholder',u=$('<input type="text" />')[0],l='placeholder'in u;u=null;var s={'native':{show:$.noop,hide:$.noop,refresh:$.noop,dispose:function(){var e=this;i.dispose(e),e.element=null;}},simple:{init:function(){var e=this,t=$.proxy(e.refresh,e);e.element.on('focus'+a,t).on('blur'+a,t);},show:function(){var e=this;e.element.addClass(e.simpleClass).val(e.value);},hide:function(){var e=this;e.element.removeClass(e.simpleClass).val('');},refresh:function(){var e=this,t=e.element;if(document.activeElement===t[0]){if(t.hasClass(e.simpleClass))e.hide();}else if(!t.val())e.show();},dispose:function(){var e=this;i.dispose(e),e.element.off(a),e.element=null;}},complex:{init:function(){var e=this,t=e.element,n=$(e.template);r(t,n),n.append(t),e.faker=n.find(e.placeholderSelector);var i=$.proxy(e.refresh,e);o.init(t),t.on('focus'+a,i).on('blur'+a,i).on('input'+a,i);},show:function(){var e=this;e.faker.html(e.value).show();},hide:function(){this.faker.hide();},refresh:function(){var e=this,t=e.element.val();if($.trim(t))e.hide();else e.show();},dispose:function(){var e=this;i.dispose(e);var t=e.element;o.dispose(t),t.off(a),e.faker=e.element=null;}}};return e;}),define('cobble/helper/Popup',['require','exports','module','../function/split','../function/isHidden','../function/contains','../function/jquerify','../function/lifeCycle','../util/instance'],function(require){'use strict';function e(e){return D.init(this,e);}function t(e,t){$.each(e.showConfigList,function(n,i){i[t](e);});}function n(e,t){$.each(e.hideConfigList,function(n,i){i[t](e);});}function i(e,t){if(e)e.type=t;else e=t;return e;}function r(e){var t=e.currentTarget;return t&&'HTML'===t.tagName?null:t;}function o(e,t){return e.emit(i(t,'beforeShow'));}function a(e,i){return e.layer.data(S,r(i)),t(e,'off'),n(e,'on'),e.emit('afterShow');}function u(e,t){return e.emit(i(t,'beforeHide'));}function l(e){return e.layer.removeData(S),n(e,'off'),t(e,'on'),e.emit('afterHide');}function s(){return $.now();}function c(e){return'__'+e+'Handler__';}function f(e,t){return null==e[t];}function d(e,t){return e.layer.data(S)!==r(t);}function p(e,t,n){return!t||t(e,n);}function h(e,t){return t-e[P]>50;}function m(t,n){return function(i){var r=i.data,o=s(i);if(f(r,T)&&d(r,i)&&p(r,n,i))r[P]=o,y({popup:r,delay:r.show.delay,toggle:e.trigger.show[t].delay,timer:T,success:function(){var e=function(){r.open(i);},t=r[k];if(t)t.done(e);else e();}});};}function v(t,n){return function(i){var r=i.data,o=s(i);if(f(r,j)&&p(r,n,i)&&h(r,o))r[P]=o,r[k]=$.Deferred(),y({popup:r,delay:r.hide.delay,toggle:e.trigger.hide[t].delay,timer:j,success:function(){r.close(i),r[k].resolve();},fail:function(){r[k]=null;}});};}function y(e){var t=e.delay,n=e.success;if(t>0){var i=e.popup,r=e.timer,o=e.toggle||{},a=o.on||$.noop,u=o.off||$.noop,l=e.fail||$.noop,s=function(){clearTimeout(i[r]),u(i,c),i[r]=null;},c=function(e){var t=i[r];if(t)s();if(t&&e===P)n();else l();};a(i,c),i[r]=setTimeout(function(){c(P);},t);}else n();}function g(e){var t=this,n=t.type,i=t.handler,r=c(n);if(e[r]!==i)e.element.on(n,e.selector,e,i),e[r]=i;}function b(e){var t=this;if(!e.selector){var n=t.type;e.element.off(n,t.handler),e[c(n)]=null;}}var x=require('../function/split'),w=require('../function/isHidden'),q=require('../function/contains'),C=require('../function/jquerify'),D=require('../function/lifeCycle'),_=require('../util/instance');e.prototype={constructor:e,type:'Popup',init:function(){var i=this,r=i.showConfigList=[],o=i.hideConfigList=[],a=i.show.trigger,u=i.hide.trigger;if(a)$.each(x(a,','),function(t,n){var i=e.trigger.show[n];if(i)r.push(i);});if(u)$.each(x(i.hide.trigger,','),function(t,n){var i=e.trigger.hide[n];if(i)o.push(i);});if(i.hidden=w(i.layer))t(i,'on');else n(i,'on');},open:function(){var e=this,t=arguments[0];if(!t)e[P]=s();if(t=o(e,t),!t.isDefaultPrevented()){var n=e.layer,i=e.show.animation;if($.isFunction(i))i.call(e,n);else n.show();e.hidden=!1,a(e,t);}},close:function(){var e=this;if(!e.hidden){var t=arguments[0];if(!t)e[P]=s();if(t=u(e,t),!t.isDefaultPrevented()){var n=e.layer,i=e.hide.animation;if($.isFunction(i))i.call(e,n);else n.hide();e.hidden=!0,l(e);}}},dispose:function(){var e=this;D.dispose(e),e.close(),t(e,'off'),e.element=e.layer=null;}},C(e.prototype),e.defaultOptions={show:{trigger:'click'},hide:{trigger:'click'}};var k='__hidePromise__',T='__showTimer__',j='__hideTimer__',P='__lastTriggerTime__',S='__sourceElement__',F=function(e,t){if(!t)return!1;else return q(e.layer,t);};return e.trigger={show:{focus:{type:'focusin',handler:m('focus'),on:g,off:b},click:{type:'click',handler:m('click'),on:g,off:b},over:{type:'mouseenter',handler:m('over'),on:g,off:b,delay:{on:function(e,t){e.element.on('mouseleave',e.selector,t);},off:function(e,t){e.element.off('mouseleave',t);}}},context:{type:'contextmenu',handler:m('context'),on:g,off:b}},hide:{blur:{type:'focusout',handler:v('blur'),on:g,off:b},click:{type:'click',handler:function(){return v(this.type,function(e,t){return!F(e,t.target);});},on:function(e){var t=this;_.document.on(t.type,e,e.clickHandler=t.handler());},off:function(e){_.document.off(this.type,e.clickHandler);}},out:{type:'mouseleave',handler:v('out'),on:function(e){var t=this.type,n=this.handler;e.layer.on(t,e,n),e.element.on(t,e.selector,e,n);},off:function(e){var t=this.type,n=this.handler;e.element.off(t,n),e.layer.off(t,n);},delay:{on:function(e,t){e.element.on('mouseenter',e.selector,t),e.layer.on('mouseenter',t);},off:function(e,t){e.element.off('mouseenter',t),e.layer.off('mouseenter',t);}}},context:{type:'contextmenu',handler:function(){return v('context',function(e,t){return!F(e,t.target);});},on:function(e){var t=this;_.document.on(t.type,e,e.contextHandler=t.handler());},off:function(e){_.document.off(this.type,e.contextHandler);}}}},e;}),define('cobble/ui/Calendar',['require','../function/jquerify','../function/lifeCycle','../util/date'],function(require){'use strict';function e(e){return i.init(this,e);}function t(e,t,n){for(var i,o=[],a=e;t>=a;a+=r.DAY){if(i=r.simplify(a),a>n)i.phase='future';else if(n>a)i.phase='past';else i.phase='today';o.push(i);}return o;}var n=require('../function/jquerify'),i=require('../function/lifeCycle'),r=require('../util/date');e.prototype={constructor:e,type:'Calendar',init:function(){var e=this,t=e.today||new Date();if(e.today=t.setHours(0,0,0,0),e.render(e.date||new Date()),e.value)e.setValue(e.value,{force:!0,silence:!0});var n='click'+o,i=e.element;i.on(n,'[data-value]',function(){var t,n=$(this),i=e.activeClass,r=n.hasClass(i);if(r)if(e.toggle)t='',n.removeClass(i);else return;else t=n.data('value');e.setValue(t);});var r=e.prevSelector;if(r)i.on(n,r,$.proxy(e.prev,e));var a=e.nextSelector;if(a)i.on(n,a,$.proxy(e.next,e));},getValue:function(){return this.value;},setValue:function(e,t){var n=this,i=n.element,r=i.find('[data-value="'+e+'"]');if(1!==r.length)e='';if(t=t||{},t.force||n.value!=e){n.value=e;var o=n.activeClass,a=i.find('.'+o);if(e){if(!n.multiple)a.removeClass(o);r.addClass(o);}else a.removeClass(o);if(!t.silence)n.emit('change');}},prev:function(){var e=this,t=e.date;t='week'===e.mode?r.prevWeek(t):r.prevMonth(t),e.render(t),e.emit('prev');},next:function(){var e=this,t=e.date;t='week'===e.mode?r.nextWeek(t):r.nextMonth(t),e.render(t),e.emit('next');},inRange:function(e){var t=this.data,n=r.parse(t.start),i=r.parse(t.end);return e>=n&&i>=e;},createData:function(e){var n=this,i=n.firstDay;e=e.setHours(0,0,0,0);var o,a;if('week'===n.mode)o=r.getWeekFirstDay(e,i),a=r.getWeekLastDay(e,i);else{var u=r.getMonthFirstDay(e),l=r.getMonthLastDay(e);o=r.getWeekFirstDay(u,i),a=r.getWeekLastDay(l,i);}var s=t(+o,+a,n.today);return $.extend(r.simplify(e),{start:s[0],end:s[s.length-1],list:s});},render:function(e){var t=this;t.date=e;var n=t.data=t.createData(e);t.emit('beforeRender',n),t.element.html(t.renderTemplate(n,t.template)),t.emit('afterRender',n);},dispose:function(){var e=this;i.dispose(e),e.element.off(o),e.element=null;}},n(e.prototype),e.defaultOptions={firstDay:1,mode:'month',toggle:!1,multiple:!1,activeClass:'active'};var o='.cobble_ui_calendar';return e;}),define('cobble/util/date',['require','exports','module'],function(require,exports){'use strict';exports.parse=function(e,t,n){var i=!1;if($.isNumeric(e)&&$.isNumeric(t)&&$.isNumeric(n))i=!0;else if(1===arguments.length)if(i=!0,$.isPlainObject(e))n=e.date,t=e.month,e=e.year;else if('string'===$.type(e)){var r=e.split('-');e=r[0],t=r[1],n=r[2];}if(i)if(t>=1&&12>=t&&n>=1&&31>=n)return new Date(e,t-1,n);},exports.stringify=function(e){if('number'===$.type(e))e=new Date(e);var t=e.getFullYear(),n=e.getMonth()+1,e=e.getDate();if(10>n)n='0'+n;if(10>e)e='0'+e;return[t,n,e].join('-');},exports.simplify=function(e){if('number'===$.type(e))e=new Date(e);return{year:e.getFullYear(),month:e.getMonth()+1,date:e.getDate(),day:e.getDay()};},exports.getWeekFirstDay=function(e,t){if('number'===$.type(e))e=new Date(e);var n=e.getDay();return n=n>=t?n:n+7,new Date(e.getTime()-(n-t)*exports.DAY);},exports.getWeekLastDay=function(e,t){return e=exports.getWeekFirstDay(e,t),e.setTime(e.getTime()+6*exports.DAY),e;},exports.getMonthFirstDay=function(e){var t='number'===$.type(e)?e:e.getTime();return e=new Date(t),e.setDate(1),e;},exports.getMonthLastDay=function(e){var t='number'===$.type(e)?e:e.getTime();return e=new Date(t),e.setDate(1),e.setMonth(e.getMonth()+1),e.setDate(0),e;},exports.prevMonth=function(e){var t='number'===$.type(e)?e:e.getTime();return e=new Date(t),e.setDate(1),e.setTime(e.getTime()-exports.WEEK),e;},exports.nextMonth=function(e){var t='number'===$.type(e)?e:e.getTime();return e=new Date(t),e.setDate(28),e.setTime(e.getTime()+exports.WEEK),e;},exports.prevWeek=function(e){return exports.subtract(e,7);},exports.nextWeek=function(e){return exports.add(e,7);},exports.add=function(e,t){if('date'===$.type(e))e=e.getTime();return new Date(e+t*exports.DAY);},exports.subtract=function(e,t){if('date'===$.type(e))e=e.getTime();return new Date(e-t*exports.DAY);},exports.DAY=86400000,exports.WEEK=7*exports.DAY;}),define('cobble/util/input',['require','exports','module','../function/around'],function(require,exports){'use strict';function e(){}function t(e){var t=e.val(),i=!1;e.on('propertychange'+o,function(n){if(i)return void(i=!1);if('value'===n.originalEvent.propertyName){var r=e.val();if(r!==t)e.trigger('input'),t=r;}}),n(e,'val',function(){if(0!==arguments.length)i=!0;});}var n=require('../function/around'),i=$('<input type="text" />')[0],r='oninput'in i;i=null;var o='.cobble_util_input';exports.init=r?e:t,exports.dispose=function(e){e.off(o);};}),define('cobble/util/instance',['require','exports','module'],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body);}),define('cobble/util/keyboard',['require','exports','module'],function(require,exports){'use strict';function e(e){var t={};return $.each(e,function(e,n){t[n]=e;}),t;}var t={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,'`':192,'-':173,'=':61,'[':219,']':221,'\\':220,';':59,"'":222,',':188,'.':190,'/':191,$0:96,$1:97,$2:98,$3:99,$4:100,$5:101,$6:102,$7:103,$8:104,$9:105,'$.':110,'$+':107,'$-':109,'$*':106,'$/':111,space:32,tab:9},n={backspace:8,'delete':46},i={f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,enter:13,esc:27,capslock:20,insert:45,home:36,end:35,pageup:33,pagedown:34,left:37,right:39,up:38,down:40},r={shift:16,ctrl:17,meta:91,alt:18};$.extend(exports,t,i,r),exports.charKey=t,exports.deleteKey=n,exports.functionKey=i,exports.combinationKey=r,exports.isCharKey=function(n){return n in e(t);},exports.isDeleteKey=function(t){return t in e(n);},exports.isFunctionKey=function(t){return t in e(i);},exports.isCombinationKey=function(t){return t in e(r);};}),define('common/component/Editor_c19cafc60f',['require','cobble/form/Text'],function(require){'use strict';function e(e){$.extend(this,e),this.init();}var t=require('cobble/form/Text');e.prototype={constructor:e,init:function(){var e=this,n=this.element,i=this.minLength||0,r=this.maxLength,o=(this.flexHeight||!1,this.autoHint||!1),a=n.find('.form-hint');if(i)a.html('还需要输入<strong>'+i+'</strong>个字');else if(!o)a.html('还可以输入<strong>'+r+'</strong>个字');var u=this.textarea=n.find('textarea'),l=function(){var t,n=u.val();if(n.length<i)t=i-n.length,a.html('还需要输入<strong>'+t+'</strong>个字');else if(n.length>=i&&n.length<=r)if(!o||n.length>=o)t=r-n.length,a.html('还可以输入<strong>'+t+'</strong>个字');else a.html('');else if(r<n.length)t=n.length-r,a.html('<span class="text-error">已超出<strong>'+t+'</strong>个字</span>');e.autoHeight();};this.textInput=new t({element:u,placeholderNativeFirst:!1,placeholderSimple:!1,onChange:l}),l();},getValue:function(){return this.textarea.val();},setValue:function(e){this.textInput.setValue(e),this.autoHeight();},autoHeight:function(){if(this.flexHeight){var e=this.textarea[0].scrollHeight+'px';this.textarea.css('height',e);}},validate:function(){return this.maxLength>=this.getValue().length;}};return e;}),define('common/component/SaveButton_b1f301d041',['require'],function(){'use strict';function e(e){$.extend(this,e),this.init();}return e.prototype={init:function(){var e=this,t=e.element,n=t.html();if('BUTTON'!==t.prop('tagName'))throw new Error('SaveButton 必须使用 button 标签');var i=function(){var i=e.save();if(i)t.focus(),t.prop('disabled',!0),t.html(e.saveText||'正在保存...'),i.always(function(){setTimeout(function(){t.prop('disabled',!1),t.html(n);},10);});return!1;};if(t.click(i),e.form)e.form.submit(function(){return i(),!1;});}},e;}),define('common/form_2ef59f4d41',['require','exports','cobble/form/Validator'],function(require,exports){'use strict';function e(e){var t={},n=e.find('[name]');return n.each(function(){var e=this.name,n=this.value,i='radio'===this.type||'checkbox'===this.type;if(i){if(this.checked)t[e]=n;}else{var r=t[e];if(null==r)t[e]=n;else r=t[e]=[r],r.push(n);}}),$.each(t,function(e,n){t[e]=$.isArray(n)?n.join(','):$.trim(n);}),t;}function t(e,t){$.each(t,function(t,i){if(i){var r=e.find('[name="'+t+'"]'),o=r.closest('.form-group');o.removeClass('has-success').addClass('has-error');var a=o.find('.error');a.html(i),n.defaultOptions.errorPlacement(r,a);}});}var n=require('cobble/form/Validator');exports.parse=function(t){return e(t);},exports.get=function(n,i){return $.ajax({url:i,type:'get',dataType:'json',data:n.jquery?e(n):n}).done(function(e){if(e.code){var i=e.data;if(i)t(n,i);}return e;});},exports.post=function(n,i){return $.ajax({url:i,type:'post',dataType:'json',data:n.jquery?e(n):n}).done(function(e){if(e.code){var i=e.data;if(i)t(n,i);}return e;});};}),define('teacherCenter/addCoupon',['require','exports','common/form_2ef59f4d41','cobble/form/Date','common/component/Editor_c19cafc60f','cobble/form/Validator','common/component/SaveButton_b1f301d041','common/service_9c322508d3'],function(require,exports){'use strict';function e(){var e=t.parse(l),n=e.balance,i=e.total_count,r=l.find('.total-balance');if(n&&i){var o=n*i;r.html(o);}}var t=require('common/form_2ef59f4d41'),n=require('cobble/form/Date'),i=require('common/component/Editor_c19cafc60f'),r=require('cobble/form/Validator'),o=require('common/component/SaveButton_b1f301d041'),a=require('common/service_9c322508d3'),u=$('#content'),l=u.find('.form-add-coupon');exports.init=function(){var u=(new n({element:l.find('input[name="start_date"]')}),new n({element:l.find('input[name="end_date"]')}),new i({element:l.find('.form-editor'),maxLength:30}),new r({element:l,realtime:!0,fields:{balance:{rules:{required:!0,min:5,max:2000,pattern:/^\d+$/},errors:{required:'请输入优惠券面值',min:'优惠券面值最低 5 元',max:'优惠券面值最高 2000 元',pattern:'请输入正确的面值'}},total_count:{rules:{required:!0,min:1,max:1000,pattern:/^\d+$/},errors:{required:'请输入优惠券张数',min:'至少要发放 1 张哦~',max:'优惠券单次最多只能发放 1000 张',pattern:'请输入正确的张数'}},cond_threshold:{rules:{max:100000},errors:{max:'使用上限不可超过 100000 元'}},start_date:{rules:{required:!0},errors:{required:'请选择有效期开始日期'}},end_date:{rules:{required:!0},errors:{required:'请选择有效期结束日期'}},remark:{rules:{maxlength:30},errors:{maxlength:'请将字数控制在 30 字以内'}}}}));new o({element:l.find('.btn-save'),save:function(){var e=t.parse(l);if(u.validate()){var n,i=e.threshold;if(0==i)n=0;else if(1==i){if(!e.cond_threshold)return void alert('尚未设置使用条件');n=e.cond_threshold;}var r=new Date(Date.parse(e.start_date.replace(/-/g,'/'))),o=new Date(Date.parse(e.end_date.replace(/-/g,'/')));return a.addCoupon({balance:e.balance,totalCount:e.total_count,condThreshold:n,effectTime:r.getTime()/1000,expireTime:o.getTime()/1000,maxRecvCount:e.max_recv_count,remark:e.remark}).done(function(e){if(0===e.code)success('新建优惠券成功',function(){window.location.href='/teacher_center/addCouponSuccess?serial='+e.data.serial_num+'&qrurl='+e.data.qr_url+'&dturl='+e.data.dt_url;});});}}}),l.on('blur','input[name="balance"], input[name="total_count"]',function(){e();}).on('focus','input[name="cond_threshold"]',function(){$(this).prev().find(':radio').click();});};});