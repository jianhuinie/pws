/**
 * @file 考研--搜索结果页面
 * @author caoying
 * @date 2016-02-17
 */
define(function(require) {

    var service = require('common/service');
    var store = require('common/store');
    var lazyImage = require('common/lazyImage');
    var Slider = require('common/component/Slider');
    var header = require('./component/header');
    var consult = require('./component/consult');

    var container = $("#main");

    // 点击底部名师团队，左右滑动按钮
    var sliderFamous = function(){
        var len = container.find('.famous-slider-container .slider-li').length;
        new Slider({
            element: $('.famous-slider-container'),
            itemSelector: '.slider-li',
            prevSelector: '.icon-chevron-left',
            nextSelector: '.icon-chevron-right',
            click: 'click',
            duration: 50,
            autoPlay: false,
            delay: 3000,
            onChange: function (e, data) {
                var from = data.form;
                var to = data.to;
                if (to == 0) {
                    container.find('.icon-chevron-left').addClass('disable');
                    container.find('.icon-chevron-right').removeClass('disable');
                } else if (to == len - 1) {
                    container.find('.icon-chevron-right').addClass('disable');
                    container.find('.icon-chevron-left').removeClass('disable');
                } else {
                    container.find('.icon-chevron-left').removeClass('disable');
                    container.find('.icon-chevron-right').removeClass('disable');
                }
            }
        });
    };

    // 科目和老师筛选
    var searchFilter = function(){
        var conditions = container.find('.search-condition');
        var subjects = container.find('.ul-subjects');
        var teachers = container.find('.ul-teachers');
        var classWay = container.find('.class-way');

        function search(parentClass) {

            // 取得科目、老师和上课方式的值，传递至后台查找对应的老师列表
            var subjectCode = subjects.find('.active').data('code');   // 科目类型
            var teacherCode = teachers.find('.active').data('code');   // 老师
            var courseType = classWay.find('.play-way');
            var className = parentClass.attr('class');
            var playWay = 0;
            var length = courseType.length;
            var playType;
            var url="";

            $.each(courseType,function(){
                if($(this).find('input')[0].checked) {
                    playType = $(this).find('input')[0].value;
                    playWay++;
                }
            });

            if (playWay == length) {
                playType = "";
            }

            if(!subjectCode) {
                subjectCode = store.get('subject_id');
            }
            if(teacherCode && className != 'ul-subjects' ){
                url = '&teacher_number=' + teacherCode;
            }
            if (playType) {
                url = url + '&course_type=' + playType;
            }

            location.href = location.origin + '/courses?subject_id='+ subjectCode + url;
        };

        conditions
            .on('click','li', function(){
                var parentClass = $(this).closest('ul');
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
                search(parentClass);
            });

        classWay.find('input').change(function(){
            var parentClass = $(this).closest('label');
            // 取得科目、老师和上课方式的值，传递至后台查找对应的老师列表
            search(parentClass);
        });

    };

    return{
        init: function(){
            lazyImage.init();
            consult.init();
            sliderFamous();

            searchFilter();
            header.init();
        }
    }

});