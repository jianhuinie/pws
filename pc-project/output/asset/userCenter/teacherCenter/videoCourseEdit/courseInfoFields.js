define("userCenter/teacherCenter/videoCourseEdit/courseInfoFields",["require","exports","module"],function(){"use strict";return{cover:{rules:{required:!0},errors:{required:"请设置课程封面"}},title:{rules:{required:!0,maxlength:20},errors:{required:"请输入课程标题",maxlength:"标题请不要超过20个字"}},intro:{rules:{required:!0,maxlength:200},errors:{required:"请输入课程简介",maxlength:"简介请不要超过200个字"}}}});