define('common/component/starPatch_75ca6317ab',['require','exports','common/service_9c322508d3','common/store_a1a35b3dfc'],function(require,exports){'use strict';var e=require('common/service_9c322508d3'),o=require('common/store_a1a35b3dfc');exports.init=function(t,s,r){s=$(s),r=r||'hasfavored';var n={},a=$('.icon-favor',s),c=$('span',s);if(a.removeClass(r),c.text('收藏'),o.get('user'))var i=!!o.get('user').id;else var i=!1;if(i&&0!=o.get('user').type)if(s.length>0)e.checkCollectedAjax(t,n).done(function(e){if(e.data.is_favored)a.addClass(r),c.text('已收藏');else a.removeClass(r),c.text('收藏');});};});