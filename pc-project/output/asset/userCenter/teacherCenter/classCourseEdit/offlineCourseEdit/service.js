define('userCenter/common/service_1288b24a55',['require','exports','module'],function(require,exports){'use strict';function e(e,r){var t=e;if(r)t+=$.param(r);return t;}function r(r,t,i){t=t||{},i=$.extend({},s,i);var a,c;if(o[r])c=e(r,t),a=u[c];var d=$.Deferred();if(a)if(!a.response)a.deferredList.push(d);else d.resolve(a.response);else{var l=userData.number||0;if(!n[r])t._user_number=l,$.extend(t,siteData.monkey);if($.ajax({url:r,data:t,method:'post',dataType:'json',timeout:i.timeout,async:i.sync?!1:!0}).then(function(e){if(o[r])a=u[c],a.response=e,$.each(a.deferredList,function(r,t){if(e&&0===e.code)t.resolve(e);else t.reject(e);}),a.deferredList.length=0;else if(e&&0===e.code)d.resolve(e);else{var t=e.msg;if(t&&!i.preventError)alert({title:'提示',content:t});d.reject(e);}},function(e,r){if('timeout'===r||'error'===r)d.reject({code:-1});}),o[r])u[c]={},u[c].deferredList=[d];}return d;}function t(e,r){return $.ajax({url:e,data:r,dataType:'jsonp'});}var s={timeout:5000,sync:!1,stringify:!1,preventError:!1},n={'/area/list':1,'/subject/getList':1},o={'/user/basicInfo':1},u={};exports.post=r,exports.jsonp=t,exports.getUserBasicInfo=function(e){var t;if(e&&null!=e.userId&&null!=e.userType)t={user_id:e.userId,user_type:e.userType};return r('/user/basicInfo',t);},exports.getCourseList=function(){return r('/lesson/list');},exports.getUserType=function(){return r('/user/roles');},exports.sendInviteCode=function(e){var t=$.extend(e.formData||{},{invite_code:e.inviteCode,role:e.role});return r('/user/switch_role_ajax',t);},exports.getCDNSpeedTestUrls=function(){return r('/video/getSpeedTestUrl');};}),define('userCenter/teacherCenter/classCourseEdit/offlineCourseEdit/service',['require','exports','module','../../../common/service_1288b24a55'],function(require,exports){'use strict';function e(e,r,t){return $.ajax({url:e,data:r,dataType:'jsonp',timeout:t});}var r=require('../../../common/service_1288b24a55');exports.getSubjectList=function(e){return r.post('/tcenter/subjects/list',{keyword:e.keyword});},exports.getAddressList=function(){return r.post('/tcenter/addresses/list-simple');},exports.getAddressSuggestion=function(r){return e('http://api.map.baidu.com/place/v2/suggestion',{query:r.query,region:r.region,output:'json',ak:'EMB0bKIvMeOd70lyyG92BZlu'});},exports.checkAddress=function(e){return r.post('/teacher_center/checkAddress',{city_id:e.cityId,area_name:e.areaName});},exports.upsertAddress=function(e){return r.post('/teacher_center/upsertAddress',{address_id:e.addressId,area_id:e.areaId,address:e.locationAddr,lng:e.lng,lat:e.lat,as_regular_address:e.asRegularAddress},options);},exports.getRelatedCourse=function(){return r.post('/tcenter/courses/all-courses/selling-courses');},exports.getHistorySubject=function(){return r.post('/tcenter/courses/all-courses/history-subjects');},exports.getPhotoGallery=function(){return r.post('/tcenter/courses/photo-gallery/list');},exports.saveOfflineCourse=function(e){return r.post('/tcenter/courses/class-courses/save',{data:e},{preventError:!0,timeout:10000});},exports.getUserBasicInfo=function(e){var t;if(e&&null!=e.userId&&null!=e.userType)t={user_id:e.userId,user_type:e.userType};return r.post('/user/basicInfo',t);};});