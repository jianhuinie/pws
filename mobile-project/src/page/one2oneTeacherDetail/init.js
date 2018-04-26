/**
 * 模块控制器
 * author: huangshiming
 */
define(function (require, exports) {
    
    var $ = require('zepto');
    var headerFunc = require('page/one2oneTeacherDetail/header/index');
    var introFunc = require('page/one2oneTeacherDetail/introduction/index');
    var successfulCase = require('page/one2oneTeacherDetail/case/index');
    var exprienceX = require('page/one2oneTeacherDetail/exprience/index');
    var teachLesson = require('page/one2oneTeacherDetail/teacherLesson/index');
    var secureDialogFunc = require('page/one2oneTeacherDetail/secureDialog/index');
    var showRetinaPhotos = require('page/one2oneTeacherDetail/showRetinaPhotos');
    var pay = require('page/one2oneTeacherDetail/buy/index');
    var one2oneBottom = require('page/one2oneTeacherDetail/one2oneBottom/index');
    var comment = require('page/one2oneTeacherDetail/comment/index');
    // var honors = require('page/one2oneTeacherDetail/honors/index');

    var SubClass = function (pageData) {
        var queryOneOnOneCourse = pageData.query_one_on_one_course;
        this.teacherNumber = queryOneOnOneCourse.teacher.number;
        this.courseNumber = queryOneOnOneCourse.number;
        this.score = pageData.comment_summary.score;
        this.successCaseItems = queryOneOnOneCourse.success_cases;
        this.bios = queryOneOnOneCourse.teacher.bios;
        this.skill = queryOneOnOneCourse.teacher.display_skills;
        this.dialog = null;
        this.picsArray = null;
        this.commentNumber = pageData.comment_summary.count;
        this.teachInfo = {
            subject: queryOneOnOneCourse.name,
            lessonWay: queryOneOnOneCourse.lesson_ways,
            categories: queryOneOnOneCourse.categories,
            address: queryOneOnOneCourse.address,
            techerName: queryOneOnOneCourse.teacher.display_name
        };
        // 平台保障的弹窗
        this.secureDialog = secureDialogFunc;
        this.showPics = showRetinaPhotos;
    };

    // 头部 + 平台保障
    SubClass.prototype.header = headerFunc;
    
    // 评价
     SubClass.prototype.comment = comment;

    // 自我介绍
    SubClass.prototype.intro = introFunc;

    // 成功案例
    SubClass.prototype.case = successfulCase;

    // 过往经历
    SubClass.prototype.exprience = exprienceX;

    // 授课信息
    SubClass.prototype.lessonInfo = teachLesson;

    // 购买
    SubClass.prototype.pay = pay;

    // 底导
    SubClass.prototype.one2oneBottom = one2oneBottom;

    // 荣誉
    // SubClass.prototype.honors = honors;


    exports.init = function (pageData) {
        var teacher = new SubClass(pageData);
        // 头部函数
        teacher.header();
        
        //评价
        teacher.comment();

        // 自我介绍
        teacher.intro();

        // 成功案例
        teacher.case();

        // 过往经历
        teacher.exprience();

        // 授课信息
        teacher.lessonInfo();

        // 初始化图片放大
        teacher.showPics();

        // 购买
        teacher.pay();

        // 底导
        teacher.one2oneBottom();

        // 荣誉
        // teacher.honors();
    };
});