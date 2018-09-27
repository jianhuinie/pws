define('userCenter/teacherCenter/videoCourseEdit/component/CourseSection_html',function(){return'<div class="course-section" data-type="{{#if options.payStatus == COURSE_SECTION_PAY_STATUS_TRIAL}}trial{{elseif options.payStatus == COURSE_SECTION_PAY_STATUS_CHARGE}}pay{{elseif options.payStatus == COURSE_SECTION_PAY_STATUS_FREE}}free{{/if}}"><div class="course-index"><strong>{{sectionIndex}}</strong>课节</div><div class="course-name"><div class="small">{{cutString(options.sectionName, 120)}}{{#if options.hasError}}{{#if options.error}}<i class="icon icon-info-circle error" data-title="{{{options.error}}}" data-max-width="27em"></i>{{else}}<i class="icon icon-info-circle error"></i>{{/if}}{{/if}}</div>{{#if options.payStatus == COURSE_SECTION_PAY_STATUS_FREE}}<span class="free-course tiny">免费课</span>{{elseif options.payStatus == COURSE_SECTION_PAY_STATUS_TRIAL}}<span class="trial-course tiny">试听课</span>{{/if}}</div><style>{{style}}</style></div>';}),define('userCenter/teacherCenter/videoCourseEdit/component/CourseSection_2effadd283',['require','exports','module','../constant_a6a781bc96','./CourseSection_html'],function(require){'use strict';var e=require('../constant_a6a781bc96');return Ractive.extend({template:require('./CourseSection_html'),data:function(){return{sectionIndex:1,COURSE_SECTION_PAY_STATUS_FREE:e.COURSE_SECTION_PAY_STATUS_FREE,COURSE_SECTION_PAY_STATUS_TRIAL:e.COURSE_SECTION_PAY_STATUS_TRIAL,COURSE_SECTION_PAY_STATUS_CHARGE:e.COURSE_SECTION_PAY_STATUS_CHARGE,options:{sectionId:'',sectionName:'',videoId:'',videoName:'',payStatus:'',hasError:!1,error:''}};}});}),define('userCenter/teacherCenter/videoCourseEdit/constant_a6a781bc96',['require','exports','module'],function(require,exports){'use strict';exports.COURSE_SECTION_PAY_STATUS_FREE=1,exports.COURSE_SECTION_PAY_STATUS_CHARGE=2,exports.COURSE_SECTION_PAY_STATUS_TRIAL=3,exports.COURSE_SECTION_ACTION_CREATE=1,exports.COURSE_SECTION_ACTION_EDIT=2,exports.COURSE_SECTION_ACTION_DELETE=3,exports.COURSE_STATUS_PUBLISH=1,exports.COURSE_STATUS_WAITING_PUBLISH=2,exports.VIDEO_STATUS_CHECK_FAILURE=2,exports.VIDEO_STATUS_AUDIT_FAILURE=4;});