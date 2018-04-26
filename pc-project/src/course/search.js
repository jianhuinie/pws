/**
 * @file 班课搜索结果
 * @author wuhongjie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var urlUtil = require('cobble/util/url');
    var searchbox = $('#search-box');
    var tabnav = $('#tab-nav');
    var main = $('#main');
    var store = require('common/store');
    var DateCalendar = require('cobble/form/Date'); // 日历
    var searchlist = require('common/component/CourseSearchList');
    var seekTeacher = require('teacher/seekTeacher');
    var AdBanner = require('common/component/AdBanner');
    var goldCertOrg = require('main/mods/goldCertOrg');
    var relatedcourse = require('teacher/search/relatedcourse');


    function rtrim(str) {
        var length = str.length;
        var idx = length;
        var flag = true;

        for (var i = length-1; i > 0; i--) {
            if (str[i] == '-'&&flag) {
                idx = i;
            } else {
                flag = false;
            }
        }
        return str.substr(0, idx);
    }

    function getUrl(type, data) {

        var condition = store.get('condition');
        var url = '' ;
        url += '/sc/';
        if(store.get('abtest')){
            url += store.get('city_pinyin')+'/';
        }


        //关键词
        if (condition.query) {
            var reg = new RegExp('-','gmi');
            var query = condition.query ;
            url += encodeURIComponent(query.replace(reg,''));
        }
        // 课程类型
        url += '-';
        if (condition.course_type ) {
            url += condition.course_type;
        }
        //科目
        url += '-';
        if (condition.sub_id_1) {
            url += condition.sub_id_1;
            //二级科目
            if (condition.sub_id_2) {
                url = url + "_" + condition.sub_id_2;
                //三级科目
                if (condition.sub_id_3) {
                    url = url + "_" + condition.sub_id_3;
                }
            }
        }
        //商区
        url += '-';
        if (condition.area) {
            url += condition.area;
            // 二级商区
            if (condition.business) {
                url = url + "_" + condition.business;
            }
        }
        // 排序方式
        url += '-';
        if (condition.sort && condition.sort != 'all') {
            url += condition.sort;
        }
        // 是否免费
        url += '-';
        if (condition.is_free ) {
            url += condition.is_free;
        }
        // 授课方式
        url += '-';
        if (condition.course_lesson_way) {
            url += condition.course_lesson_way;
        }
        // 老师身份
        url += '-';
        if (condition.teacher_type ) {
            url += condition.teacher_type;
        }

        // 老师资质
        url += '-';
        if ((condition.teacher_qualification) || (type=='zizhi' && data.zizhi)) {
            var str = "";
            if (type == 'zizhi') {
                str += data.zizhi;
            }
            else {
                str += condition.teacher_qualification;
            }
            url += str;
        }

        // 授课主体
        url += '-';
        if (condition.course_lesson_body) {
            url += condition.course_lesson_body;
        }

        // 教龄
        url += '-';
        if (condition.school_age ) {
            url += condition.school_age;
        }

        // 老师资质
        url += '-';
        if ((condition.week) || (type=='week' && data.week)) {
            var str = "";
            if (type == 'week') {
                str += data.week;
            }
            else{
                str += condition.week;
            }
            url += str;
        }
        // 老师性别
        url += '-';
        if (condition.sex ) {
            url += condition.sex;
        }

        // 机构性质
        url += '-';
        if (condition.org_type ) {
            url += condition.org_type;
        }
        // 是否免费
        url += '-';
        if (condition.begin_time) {
            url += condition.begin_time;
        }

        url = rtrim(url);
        url += '.html?source=search';

        var searchDebug = urlUtil.parseQuery(location.search)["sd"]
        if (searchDebug) {
            url = url + '&sd=' + searchDebug;
        }

        return url ;
    }

    exports.init = function () {

        goldCertOrg.init('coursesearch');
        /**
         * 初始化搜索列表页事件
         */
        searchlist.init();
        seekTeacher.init();
        relatedcourse.init();


        // 初始化广告位
        new AdBanner({
            ele: $('#sidebar .ad-wrappers').eq(0)
        });


        searchbox
        //更多选项
        .on("click",".seemorechoose",function(e){
            var element = $(this);
            var show = element.attr("data-show");
            if(show == 1){
                element.attr("data-show",2);
                element.find(".open").hide();
                element.find(".close").show();
                element.parent().find(".card-body").find(".hide-start").show();
                element.find(".icon").removeClass("icon-caret-down").addClass("icon-caret-up");
            }else{
                element.attr("data-show",1);
                element.find(".close").hide();
                element.find(".open").show();
                element.find(".icon").removeClass("icon-caret-up").addClass("icon-caret-down");
                element.parent().find(".card-body").find(".hide-start").hide();
            }
        })
        //点击更多
        .on('click', '.more', function (e) {
            var element = $(this),show=element.attr("data-show");
            if(show == 1){
                element.attr("data-show","2");
                element.find(".open").hide();
                element.find(".close").show();
                element.parent().find(".more-item").removeClass("hide");
            }else{
                element.attr("data-show",1);
                element.find(".close").hide();
                element.find(".open").show();
                element.parent().find(".more-item").addClass("hide");
            }
        })
        .on("mouseenter","#orther-select .item .title",function(e){
            var element =  $(this);
            element.parent().find(".content ul").show();
        })
        .on("mouseleave","#orther-select .item",function(){
            var element =  $(this);
            element.parent().find(".content ul").hide();
        })
        .on("click",".teach-zizhi-confirm",function(e){
            var eles = $(this).parent().parent().find("li").find("[type='checkbox']:checked");
            var array = [];
            for(var i = 0; i < eles.length; i++){
                var value = $(eles[i]).attr("data-value");
                array.push(value);
            }
            location.href = getUrl("zizhi",{zizhi:array.join(',')});
        })
        .on("click",".week-confirm",function(e){
            var eles = $(this).parent().parent().find("li").find("[type='checkbox']:checked");
            var array = [];
            for(var i = 0; i < eles.length; i++){
                var value = $(eles[i]).attr("data-value");
                array.push(value);
            }
            location.href = getUrl("week",{week:array.join(',')});
        });

        /**
         * 按价格排序显隐浮动框
         */
        tabnav

            .on('mouseenter', '.drift', function (e) {
                var $this = $(this).find("ul");
                $this && $this.show();
            })

            .on('mouseleave', '.drift', function(e){
                var $this = $(this).find("ul");
                $this && $this.hide();
            })

    };
});