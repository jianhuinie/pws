define('userCenter/common/service_1288b24a55',['require','exports','module'],function(require,exports){'use strict';function e(e,r){var t=e;if(r)t+=$.param(r);return t;}function r(r,t,o){t=t||{},o=$.extend({},n,o);var a,d;if(i[r])d=e(r,t),a=u[d];var c=$.Deferred();if(a)if(!a.response)a.deferredList.push(c);else c.resolve(a.response);else{var f=userData.number||0;if(!s[r])t._user_number=f,$.extend(t,siteData.monkey);if($.ajax({url:r,data:t,method:'post',dataType:'json',timeout:o.timeout,async:o.sync?!1:!0}).then(function(e){if(i[r])a=u[d],a.response=e,$.each(a.deferredList,function(r,t){if(e&&0===e.code)t.resolve(e);else t.reject(e);}),a.deferredList.length=0;else if(e&&0===e.code)c.resolve(e);else{var t=e.msg;if(t&&!o.preventError)alert({title:'提示',content:t});c.reject(e);}},function(e,r){if('timeout'===r||'error'===r)c.reject({code:-1});}),i[r])u[d]={},u[d].deferredList=[c];}return c;}function t(e,r){return $.ajax({url:e,data:r,dataType:'jsonp'});}var n={timeout:5000,sync:!1,stringify:!1,preventError:!1},s={'/area/list':1,'/subject/getList':1},i={'/user/basicInfo':1},u={};exports.post=r,exports.jsonp=t,exports.getUserBasicInfo=function(e){var t;if(e&&null!=e.userId&&null!=e.userType)t={user_id:e.userId,user_type:e.userType};return r('/user/basicInfo',t);},exports.getCourseList=function(){return r('/lesson/list');},exports.getUserType=function(){return r('/user/roles');},exports.sendInviteCode=function(e){var t=$.extend(e.formData||{},{invite_code:e.inviteCode,role:e.role});return r('/user/switch_role_ajax',t);},exports.getCDNSpeedTestUrls=function(){return r('/video/getSpeedTestUrl');};}),define('userCenter/teacherCenter/dataCenter/service_25f2d330c1',['require','exports','module','../../common/service_1288b24a55'],function(require,exports){'use strict';var e=require('../../common/service_1288b24a55');exports.deductAppeal=function(r){return e.post('/teacher/deductAppeal',{deduct_id:r.deduct_id,reason:r.reason,attach_photos:r.photoList});},exports.deductDetail=function(r){return e.post('/teacher/deductAppealDetail',{deduct_id:r.deduct_id});},exports.getVistdate=function(r){return e.post('/teacher_center/visit_data_ajax',{range:r.range});},exports.getUserBasicInfo=function(r){var t;if(r&&null!=r.userId&&null!=r.userType)t={user_id:r.userId,user_type:r.userType};return e.post('/user/basicInfo',t);};});