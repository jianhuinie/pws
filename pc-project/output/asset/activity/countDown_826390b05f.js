define('cobble/function/contains',['require','exports','module'],function(){'use strict';return function(e,t){if(e=e.jquery?e[0]:e,t=t.jquery?t[0]:t,!e||!t)return!1;if(e===t)return!0;else return $.contains(e,t);};}),define('cobble/function/isHidden',['require','exports','module'],function(){'use strict';return function(e){e.css('display');return'none'===e.css('display')||0==e.css('opacity')||'hidden'===e.css('visibility');};}),define('cobble/function/jquerify',['require','exports','module'],function(){'use strict';function e(e){return e.faker||e.element;}var t=$.prototype,n={on:function(){return t.on.apply(e(this),arguments),this;},off:function(){return t.off.apply(e(this),arguments),this;},emit:function(n,i){var r=this,o=e(r);if(o){if(!n[$.expando])n='string'===$.type(n)?$.Event(n):$.Event(null,n);n.cobble=r;var s=[n];if(i)s.push(i);var a=r[$.camelCase('on-'+n.type)];if($.isFunction(a)&&a.apply(r,s)===!1)n.preventDefault();if(!n.isPropagationStopped())t.trigger.apply(o,s);return n;}},before:function(t){e(this).before(t);},after:function(t){e(this).after(t);},appendTo:function(t){e(this).appendTo(t);},prependTo:function(t){e(this).prependTo(t);}};return function(e){$.each(n,function(t,n){if(null==e[t])e[t]=n;});};}),define('cobble/function/lifeCycle',['require','exports'],function(require,exports){'use strict';exports.init=function(e,t){var n=e.constructor,i='__cobble__'+n.prototype.type,r=t.element;if(r&&r.data(i))e=r.data(i);else if($.extend(e,n.defaultOptions,t),e.init(),r)r.data(i,e);return e;},exports.dispose=function(e){var t='__cobble__'+e.constructor.prototype.type,n=e.element;if(n)n.removeData(t);};}),define('cobble/function/split',['require','exports','module'],function(){'use strict';return function(e,t){var n=[];return $.each(e.split(t),function(e,t){if(t=$.trim(t))n.push(t);}),n;};}),define('cobble/helper/Popup',['require','exports','module','../function/split','../function/isHidden','../function/contains','../function/jquerify','../function/lifeCycle','../util/instance'],function(require){'use strict';function e(e){return _.init(this,e);}function t(e,t){$.each(e.showConfigList,function(n,i){i[t](e);});}function n(e,t){$.each(e.hideConfigList,function(n,i){i[t](e);});}function i(e,t){if(e)e.type=t;else e=t;return e;}function r(e){var t=e.currentTarget;return t&&'HTML'===t.tagName?null:t;}function o(e,t){return e.emit(i(t,'beforeShow'));}function s(e,i){return e.layer.data(I,r(i)),t(e,'off'),n(e,'on'),e.emit('afterShow');}function a(e,t){return e.emit(i(t,'beforeHide'));}function u(e){return e.layer.removeData(I),n(e,'off'),t(e,'on'),e.emit('afterHide');}function c(){return $.now();}function f(e){return'__'+e+'Handler__';}function l(e,t){return null==e[t];}function p(e,t){return e.layer.data(I)!==r(t);}function h(e,t,n){return!t||t(e,n);}function d(e,t){return t-e[T]>50;}function y(t,n){return function(i){var r=i.data,o=c(i);if(l(r,C)&&p(r,i)&&h(r,n,i))r[T]=o,g({popup:r,delay:r.show.delay,toggle:e.trigger.show[t].delay,timer:C,success:function(){var e=function(){r.open(i);},t=r[P];if(t)t.done(e);else e();}});};}function m(t,n){return function(i){var r=i.data,o=c(i);if(l(r,D)&&h(r,n,i)&&d(r,o))r[T]=o,r[P]=$.Deferred(),g({popup:r,delay:r.hide.delay,toggle:e.trigger.hide[t].delay,timer:D,success:function(){r.close(i),r[P].resolve();},fail:function(){r[P]=null;}});};}function g(e){var t=e.delay,n=e.success;if(t>0){var i=e.popup,r=e.timer,o=e.toggle||{},s=o.on||$.noop,a=o.off||$.noop,u=e.fail||$.noop,c=function(){clearTimeout(i[r]),a(i,f),i[r]=null;},f=function(e){var t=i[r];if(t)c();if(t&&e===T)n();else u();};s(i,f),i[r]=setTimeout(function(){f(T);},t);}else n();}function v(e){var t=this,n=t.type,i=t.handler,r=f(n);if(e[r]!==i)e.element.on(n,e.selector,e,i),e[r]=i;}function b(e){var t=this;if(!e.selector){var n=t.type;e.element.off(n,t.handler),e[f(n)]=null;}}var x=require('../function/split'),w=require('../function/isHidden'),R=require('../function/contains'),E=require('../function/jquerify'),_=require('../function/lifeCycle'),k=require('../util/instance');e.prototype={constructor:e,type:'Popup',init:function(){var i=this,r=i.showConfigList=[],o=i.hideConfigList=[],s=i.show.trigger,a=i.hide.trigger;if(s)$.each(x(s,','),function(t,n){var i=e.trigger.show[n];if(i)r.push(i);});if(a)$.each(x(i.hide.trigger,','),function(t,n){var i=e.trigger.hide[n];if(i)o.push(i);});if(i.hidden=w(i.layer))t(i,'on');else n(i,'on');},open:function(){var e=this,t=arguments[0];if(!t)e[T]=c();if(t=o(e,t),!t.isDefaultPrevented()){var n=e.layer,i=e.show.animation;if($.isFunction(i))i.call(e,n);else n.show();e.hidden=!1,s(e,t);}},close:function(){var e=this;if(!e.hidden){var t=arguments[0];if(!t)e[T]=c();if(t=a(e,t),!t.isDefaultPrevented()){var n=e.layer,i=e.hide.animation;if($.isFunction(i))i.call(e,n);else n.hide();e.hidden=!0,u(e);}}},dispose:function(){var e=this;_.dispose(e),e.close(),t(e,'off'),e.element=e.layer=null;}},E(e.prototype),e.defaultOptions={show:{trigger:'click'},hide:{trigger:'click'}};var P='__hidePromise__',C='__showTimer__',D='__hideTimer__',T='__lastTriggerTime__',I='__sourceElement__',O=function(e,t){if(!t)return!1;else return R(e.layer,t);};return e.trigger={show:{focus:{type:'focusin',handler:y('focus'),on:v,off:b},click:{type:'click',handler:y('click'),on:v,off:b},over:{type:'mouseenter',handler:y('over'),on:v,off:b,delay:{on:function(e,t){e.element.on('mouseleave',e.selector,t);},off:function(e,t){e.element.off('mouseleave',t);}}},context:{type:'contextmenu',handler:y('context'),on:v,off:b}},hide:{blur:{type:'focusout',handler:m('blur'),on:v,off:b},click:{type:'click',handler:function(){return m(this.type,function(e,t){return!O(e,t.target);});},on:function(e){var t=this;k.document.on(t.type,e,e.clickHandler=t.handler());},off:function(e){k.document.off(this.type,e.clickHandler);}},out:{type:'mouseleave',handler:m('out'),on:function(e){var t=this.type,n=this.handler;e.layer.on(t,e,n),e.element.on(t,e.selector,e,n);},off:function(e){var t=this.type,n=this.handler;e.element.off(t,n),e.layer.off(t,n);},delay:{on:function(e,t){e.element.on('mouseenter',e.selector,t),e.layer.on('mouseenter',t);},off:function(e,t){e.element.off('mouseenter',t),e.layer.off('mouseenter',t);}}},context:{type:'contextmenu',handler:function(){return m('context',function(e,t){return!O(e,t.target);});},on:function(e){var t=this;k.document.on(t.type,e,e.contextHandler=t.handler());},off:function(e){k.document.off(this.type,e.contextHandler);}}}},e;}),define('cobble/util/etpl',function(){function e(e,t){for(var n in t)if(t.hasOwnProperty(n))e[n]=t[n];return e;}function t(){this.raw=[],this.length=0;}function n(){return'___'+C++;}function i(e,t){var n=new Function();n.prototype=t.prototype,e.prototype=new n(),e.prototype.constructor=e;}function r(e){return D[e];}function o(e){return'"'+e.replace(/\x5C/g,'\\\\').replace(/"/g,'\\"').replace(/\x0A/g,'\\n').replace(/\x09/g,'\\t').replace(/\x0D/g,'\\r')+'"';}function s(e){return e.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+]/g,function(e){return'\\'+e;});}function a(e){var t=arguments;return e.replace(/\{([0-9]+)\}/g,function(e,n){return t[n-0+1];});}function u(e){return e=e.replace(/^\s*\*/,''),a('gv({0},["{1}"])',o(e),e.replace(/\[['"]?([^'"]+)['"]?\]/g,function(e,t){return'.'+t;}).split('.').join('","'));}function c(e,t,n,i,r,o){for(var s=n.length,a=e.split(t),u=0,c=[],f=0,l=a.length;l>f;f++){var p=a[f];if(f){var h=1;for(u++;;){var d=p.indexOf(n);if(0>d){c.push(u>1&&h?t:'',p);break;}if(u=i?u-1:0,c.push(u>0&&h?t:'',p.slice(0,d),u>0?n:''),p=p.slice(d+s),h=0,0===u)break;}if(0===u)r(c.join('')),o(p),c=[];}else p&&o(p);}if(u>0&&c.length>0)o(t),o(c.join(''));}function f(e,t,n){var i,r=[],s=t.options,a='',l='',p='',h='';if(n)a='ts(',l=')',p=O,h=A,i=s.defaultFilter;return c(e,s.variableOpen,s.variableClose,1,function(e){if(n&&e.indexOf('|')<0&&i)e+='|'+i;var o=e.indexOf('|'),s=(o>0?e.slice(0,o):e).replace(/^\s+/,'').replace(/\s+$/,''),c=o>0?e.slice(o+1):'',d=0===s.indexOf('*'),y=[d?'':a,u(s),d?'':l];if(c){c=f(c,t);for(var m=c.split('|'),g=0,v=m.length;v>g;g++){var b=m[g];if(/^\s*([a-z0-9_-]+)(\((.*)\))?\s*$/i.test(b)){if(y.unshift('fs["'+RegExp.$1+'"]('),RegExp.$3)y.push(',',RegExp.$3);y.push(')');}}}r.push(p,y.join(''),h);},function(e){r.push(p,n?o(e):e,h);}),r.join('');}function l(e,t){this.value=e,this.engine=t;}function p(e,t){this.value=e,this.engine=t,this.children=[],this.cloneProps=[];}function h(e,t){var n=e.stack,i=t?n.find(function(e){return e instanceof t;}):n.bottom();if(i){for(var r;(r=n.top())!==i;){if(!r.autoClose)throw new Error(r.type+' must be closed manually: '+r.value);r.autoClose(e);}i.close(e);}return i;}function d(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*(\(\s*master\s*=\s*([a-z0-9\/_-]+)\s*\))?\s*/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.master=RegExp.$3,this.name=RegExp.$1,p.call(this,e,t),this.blocks={};}function y(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*$/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.name=RegExp.$1,p.call(this,e,t),this.cloneProps=['name'];}function m(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*$/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.name=RegExp.$1,p.call(this,e,t),this.cloneProps=['name','state','blocks'],this.blocks={};}function g(e,t){if(!/^\s*([a-z0-9_]+)\s*=([\s\S]*)$/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.name=RegExp.$1,this.expr=RegExp.$2,p.call(this,e,t),this.cloneProps=['name','expr'];}function v(e,t){if(!/^\s*([a-z0-9_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.name=RegExp.$1,this.args=RegExp.$3,p.call(this,e,t),this.cloneProps=['name','args'];}function b(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.name=RegExp.$1,this.args=RegExp.$3,p.call(this,e,t),this.cloneProps=['name','args'];}function x(e,t){var n=new RegExp(a('^\\s*({0}[\\s\\S]+{1})\\s+as\\s+{0}([0-9a-z_]+){1}\\s*(,\\s*{0}([0-9a-z_]+){1})?\\s*$',s(t.options.variableOpen),s(t.options.variableClose)),'i');if(!n.test(e))throw new Error('Invalid '+this.type+' syntax: '+e);this.list=RegExp.$1,this.item=RegExp.$2,this.index=RegExp.$4,p.call(this,e,t),this.cloneProps=['list','item','index'];}function $(e,t){p.call(this,e,t);}function w(e,t){$.call(this,e,t);}function R(e,t){p.call(this,e,t);}function E(e,t){t.target=e;var n=t.engine,i=e.name;if(n.targets[i])switch(n.options.namingConflict){case'override':n.targets[i]=e,t.targets.push(i);case'ignore':break;default:throw new Error('Target exists: '+i);}else n.targets[i]=e,t.targets.push(i);}function _(e,t){z[e]=t,t.prototype.type=e;}function k(t){this.options={commandOpen:'<!--',commandClose:'-->',commandSyntax:/^\s*(\/)?([a-z]+)\s*(?::([\s\S]*))?$/,variableOpen:'${',variableClose:'}',defaultFilter:'html'},this.config(t),this.targets={},this.filters=e({},T);}function P(e,n){function i(){var e;if(d.length>0&&(e=d.join(''))){var t=new l(e,n);if(t.beforeAdd(f),u.top().addChild(t),d=[],n.options.strip&&f.current instanceof p)t.value=e.replace(/^[\x20\t\r]*\n/,'');f.current=t;}}var r,o=n.options.commandOpen,s=n.options.commandClose,a=n.options.commandSyntax,u=new t(),f={engine:n,targets:[],stack:u,target:null},d=[];return c(e,o,s,0,function(e){var t=a.exec(e);if(t&&(r=z[t[2].toLowerCase()])&&'function'==typeof r){i();var u=f.current;if(n.options.strip&&u instanceof l)u.value=u.value.replace(/\r?\n[\x20\t]*$/,'\n');if(t[1])u=h(f,r);else{if(u=new r(t[3],n),'function'==typeof u.beforeOpen)u.beforeOpen(f);u.open(f);}f.current=u;}else if(!/^\s*\/\//.test(e))d.push(o,e,s);r=null;},function(e){d.push(e);}),i(),h(f),f.targets;}t.prototype={push:function(e){this.raw[this.length++]=e;},pop:function(){if(this.length>0){var e=this.raw[--this.length];return this.raw.length=this.length,e;}},top:function(){return this.raw[this.length-1];},bottom:function(){return this.raw[0];},find:function(e){for(var t=this.length;t--;){var n=this.raw[t];if(e(n))return n;}}};var C=178245,D={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'},T={html:function(e){return e.replace(/[&<>"']/g,r);},url:encodeURIComponent,raw:function(e){return e;}},I='var r="";',O='r+=',A=';',B='return r;';if('undefined'!=typeof navigator&&/msie\s*([0-9]+)/i.test(navigator.userAgent)&&RegExp.$1-0<8)I='var r=[],ri=0;',O='r[ri++]=',B='return r.join("");';l.prototype={getRendererBody:function(){var e=this.value,t=this.engine.options;if(!e||t.strip&&/^\s*$/.test(e))return'';else return f(e,this.engine,1);},clone:function(){return this;}},p.prototype={addChild:function(e){this.children.push(e);},open:function(e){var t=e.stack.top();t&&t.addChild(this),e.stack.push(this);},close:function(e){if(e.stack.top()===this)e.stack.pop();},getRendererBody:function(){for(var e=[],t=this.children,n=0;n<t.length;n++)e.push(t[n].getRendererBody());return e.join('');},clone:function(){for(var e=new this.constructor(this.value,this.engine),t=0,n=this.children.length;n>t;t++)e.addChild(this.children[t].clone());for(var t=0,n=this.cloneProps.length;n>t;t++){var i=this.cloneProps[t];e[i]=this[i];}return e;}};var j='data=data||{};var v={},fs=engine.filters,hg=typeof data.get=="function",gv=function(n,ps){var p=ps[0],d=v[p];if(d==null){if(hg){return data.get(n);}d=data[p];}for(var i=1,l=ps.length;i<l;i++)if(d!=null)d = d[ps[i]];return d;},ts=function(s){if(typeof s==="string"){return s;}if(s==null){s="";}return ""+s;};';i(d,p),i(y,p),i(m,p),i(g,p),i(v,p),i(b,p),i(x,p),i($,p),i(w,$),i(R,$);var q={READING:1,READED:2,APPLIED:3,READY:4};m.prototype.applyMaster=d.prototype.applyMaster=function(e){function t(e){var i=e.children;if(i instanceof Array)for(var r=0,o=i.length;o>r;r++){var s=i[r];if(s instanceof y&&n[s.name])s=i[r]=n[s.name];t(s);}}if(this.state>=q.APPLIED)return 1;var n=this.blocks,i=this.engine.targets[e];if(i&&i.applyMaster(i.master))return this.children=i.clone().children,t(this),this.state=q.APPLIED,1;else return void 0;},d.prototype.isReady=function(){function e(i){for(var r=0,o=i.children.length;o>r;r++){var s=i.children[r];if(s instanceof m){var a=t.targets[s.name];n=n&&a&&a.isReady(t);}else if(s instanceof p)e(s);}}if(this.state>=q.READY)return 1;var t=this.engine,n=1;if(this.applyMaster(this.master))return e(this),n&&(this.state=q.READY),n;else return void 0;},d.prototype.getRenderer=function(){if(this.renderer)return this.renderer;if(this.isReady()){var e=new Function('data','engine',[j,I,this.getRendererBody(),B].join('\n')),t=this.engine;return this.renderer=function(n){return e(n,t);},this.renderer;}return null;},d.prototype.open=function(e){h(e),p.prototype.open.call(this,e),this.state=q.READING,E(this,e);},g.prototype.open=b.prototype.open=function(e){e.stack.top().addChild(this);},y.prototype.open=function(e){p.prototype.open.call(this,e),(e.imp||e.target).blocks[this.name]=this;},w.prototype.open=function(e){var t=new R();t.open(e);var n=h(e,$);n.addChild(this),e.stack.push(this);},R.prototype.open=function(e){var t=h(e,$);t.addChild(this),e.stack.push(this);},m.prototype.open=function(e){this.parent=e.stack.top(),this.target=e.target,p.prototype.open.call(this,e),this.state=q.READING,e.imp=this;},b.prototype.close=g.prototype.close=function(){},m.prototype.close=function(e){p.prototype.close.call(this,e),this.state=q.READED,e.imp=null;},d.prototype.close=function(e){p.prototype.close.call(this,e),this.state=this.master?q.READED:q.APPLIED,e.target=null;},m.prototype.autoClose=function(e){var t=this.parent.children;t.push.apply(t,this.children),this.children.length=0;for(var n in this.blocks)this.target.blocks[n]=this.blocks[n];this.blocks={},this.close(e);},b.prototype.beforeOpen=m.prototype.beforeOpen=g.prototype.beforeOpen=x.prototype.beforeOpen=v.prototype.beforeOpen=y.prototype.beforeOpen=$.prototype.beforeOpen=l.prototype.beforeAdd=function(e){if(!e.stack.bottom()){var t=new d(n(),e.engine);t.open(e);}},m.prototype.getRendererBody=function(){return this.applyMaster(this.name),p.prototype.getRendererBody.call(this);},b.prototype.getRendererBody=function(){return a('{0}engine.render({2},{{3}}){1}',O,A,o(this.name),f(this.args,this.engine).replace(/(^|,)\s*([a-z0-9_]+)\s*=/gi,function(e,t,n){return(t||'')+o(n)+':';}));},g.prototype.getRendererBody=function(){if(this.expr)return a('v[{0}]={1};',o(this.name),f(this.expr,this.engine));else return'';},$.prototype.getRendererBody=function(){return a('if({0}){{1}}',f(this.value,this.engine),p.prototype.getRendererBody.call(this));},R.prototype.getRendererBody=function(){return a('}else{{0}',p.prototype.getRendererBody.call(this));},x.prototype.getRendererBody=function(){return a('var {0}={1};if({0} instanceof Array)for (var {4}=0,{5}={0}.length;{4}<{5};{4}++){v[{2}]={4};v[{3}]={0}[{4}];{6}}else if(typeof {0}==="object")for(var {4} in {0}){v[{2}]={4};v[{3}]={0}[{4}];{6}}',n(),f(this.list,this.engine),o(this.index||n()),o(this.item),n(),n(),p.prototype.getRendererBody.call(this));},v.prototype.getRendererBody=function(){var e=this.args;return a('{2}fs[{5}]((function(){{0}{4}{1}})(){6}){3}',I,B,O,A,p.prototype.getRendererBody.call(this),o(this.name),e?','+f(e,this.engine):'');};var z={};_('target',d),_('block',y),_('import',m),_('use',b),_('var',g),_('for',x),_('if',$),_('elif',w),_('else',R),_('filter',v),k.prototype.config=function(t){e(this.options,t);},k.prototype.compile=k.prototype.parse=function(e){if(e){var t=P(e,this);if(t.length)return this.targets[t[0]].getRenderer();}return new Function('return ""');},k.prototype.getRenderer=function(e){var t=this.targets[e];if(t)return t.getRenderer();else return void 0;},k.prototype.render=function(e,t){var n=this.getRenderer(e);if(n)return n(t);else return'';},k.prototype.addFilter=function(e,t){if('function'==typeof t)this.filters[e]=t;};var H=new k();return H.Engine=k,H;}),define('cobble/util/instance',['require','exports','module'],function(require,exports){exports.window=$(window),exports.document=$(document),exports.html=$(document.documentElement),exports.body=$(document.body);}),define('activity/countDown_826390b05f',['require','exports','cobble/helper/Popup','cobble/util/etpl','common/store_a1a35b3dfc'],function(require,exports){'use strict';function e(){var e=r.get('serverTime'),t=Math.floor(e/o),n=e-t*o,i=Math.floor(n/s),u=n-i*s,c=Math.floor(u/a),f=u-c*a,l=Math.floor(f);return{day:{time:t,type:'day',decade:parseInt(t/10),units:t%10},hour:{time:i,type:'hour',decade:parseInt(i/10),units:i%10},minute:{time:c,type:'minute',decade:parseInt(c/10),units:c%10},second:{time:l,type:'second',decade:parseInt(l/10),units:l%10}};}function t(t){var n=e(),i=u(n.day)+u(n.hour)+u(n.minute)+u(n.second);t.html(i);}var n=require('cobble/helper/Popup'),i=require('cobble/util/etpl'),r=require('common/store_a1a35b3dfc'),o=86400,s=3600,a=60,u=i.compile('<div class="timer timer-${type}"><div class="timer-item timer-decade"><div class="timer-count" data-index="front"><span class="half-mask"></span><span class="number">${decade}</span></div></div><div class="timer-item timer-units"><div class="timer-count" data-index="front"><span class="half-mask"></span><span class="number">${units}</span></div></div><div class="time-unit"><!-- if: ${type} == "day" -->日<!-- elif: ${type} == "hour" -->时<!-- elif: ${type} == "minute" -->分<!-- elif: ${type} == "second" -->秒<!-- /if --></div></div>'),c=i.compile('<div class="timer-count" data-index="back"><span class="half-mask"></span><span class="number">${number}</span></div>'),f={lastTimeData:null,init:function(t){var n=this;if(!(r.get('serverTime')<=0))n.element=t.element,n.lastTimeData=e(),n.timerInterval=setInterval(function(){n.updateTime();},1000);},updateTime:function(){var t=this;t.modifyTime();var n=e();$.each(n,function(e,n){var i=t.lastTimeData[e];if(i.time!=n.time){if(i.time=n.time,i.decade!=n.decade)t.rotatePlate(n,'decade');t.rotatePlate(n,'units');}});},rotatePlate:function(e,t){var n=this;n.lastTimeData[e.type][t]=e[t];var i='.timer-'+e.type+' .timer-'+t,r=n.element.find(i),o=c({number:e[t]});r.append(o);var s=r.find('[data-index="front"]'),a=r.find('[data-index="back"]');s.addClass('roll-front'),setTimeout(function(){s.fadeOut(100,function(){s.remove(),a.attr('data-index','front');});},450);},modifyTime:function(){var e=this,t=r.get('serverTime'),n=t-1;if(r.set('serverTime',n),0===n)clearInterval(e.timerInterval),location.href=location.origin+'/activity/birthday_main';}};exports.init=function(){var e=$('.timer-panel');t(e),f.init({element:e}),$('.video-thumbnail').click(function(){$('#iframe').attr('src','http://www.genshuixue.com/video/view/7f1e2db0fe').show(),$(this).hide();});var i=$('#main');new n({element:i.find('.applay'),layer:i.find('.applay .baidu-share'),show:{trigger:'over',delay:100},hide:{trigger:'out',delay:200}});};});