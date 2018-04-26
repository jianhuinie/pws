/**
 * @file 搜索结果
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');

    var content = $("#content");
    var store = require('common/store');
    var service = require('common/service');
    var teacherlist = require('./map/teacherList');
    var baiduMap = require('common/map/baiduTeacherAddress');
    var Tooltip = require('cobble/ui/Tooltip');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var etpl = require('cobble/util/etpl');

    var price = content.find('#price');
    var list = content.find('#list');
    var sortBox = content.find('#sort');
    var filter = content.find('#filter');
    var select = content.find('#select');
    var header = $('#map-header');
    var mapContainer = $('#map');

    var renderLoginInfo = etpl.compile(

        '<span>你好，</span>'

      + '<a class="user-name" href="http://${env}.genshuixue.com/'
      +     '<!-- if: ${user.user_type} == 0 -->'
      +     'teacher_center/index'
      +     '<!-- else -->'
      +     'lesson/studentLessons'
      +     '<!-- /if -->'
      +     '">'
      +     '<!-- if: ${user.display_name} -->'
      +     '${user.display_name}'
      +     '<!-- else -->'
      +     '${user.user_name}'
      +     '<!-- /if -->'
      + '</a>'

      + '<a class="logout-link" href="/auth/logout?next=/static/login'

      +     '<!-- if: ${isArtActivity} -->'
      +     '?activity=art&next=/jiangzuo'
      +     '<!-- /if -->'

      + '">'

      + '退出'
      + '</a>'
    );

    /*
     * 设置搜索老师的url
     */
    function getUrl() {

        var url = '' ;
        url += '/st/';

        var startNum = price.find('.start-num');
        var endNum = price.find('.end-num');
        var dateList = select.find('.time input');
        var dateArray = [];
        dateList.each(function(i, item){
            var element = $(item);
            if (element.prop('checked')) {
                dateArray.push(element.data('dateid'));
            }
        });
        var sex = select.find('.sex').find('.active').data('value');
        var has_video_course = filter.find('.video').prop('checked') ? 1: 0;
        var approach = filter.find('.online').prop('checked') ? 2: 0;
        var sort = sortBox.find('.active').data('type');
        var video = filter.find('.intro').prop('checked') ? 1: 0;
        var teacher_type = select.find('.identity').find('.active').data('value');
        var has_class = filter.find('.course').prop('checked') ? 1: 0;

        /*
         * 搜索条件
         *
         * condition.q
         * condition.course
         * condition.area
         * condition.sort
         * condition.course_lesson_ways
         * condition.teacher_type
         * condition.teacher_qualifiaction
         * condition.school_age
         * condition.sex
         */
        if (store.get('q')) {
            url += store.get('q') + '-';
        }
        if (store.get('course')) {
            url += store.get('course') + '-';
        }
        if (store.get('area')) {
            url += store.get('area') + '-';
        }
        if (sort != 'all' && sort) {
            url += sort + '-';
        }
        if (approach == 2) { // course_lesson_ways
            url += '2-';
        }
        if (teacher_type) {
            url += teacher_type + '-';
        }
        if (sex || sex === 0) {
            url += sex + '-';
        }
/*
        if (dateArray.join(',')) {
            url += '/date/' + dateArray.join(',');
        }
        if (video) {
            url += '/video/1';
        }
        / **if (condition.local) {
            url += '/local/' + condition.local;
        }** /
        if (startNum.data('price')) {
            url += '/price_start/' + startNum.data('price');
        }
        if (endNum.data('price')) {
            url += '/price_end/' + endNum.data('price');
        }
        if (has_class) {
            url += '/has_class/' + has_class;
        }
        if (has_video_course) {
            url += '/has_video_course/' + has_video_course;
        }
        / **if (condition.page) {
            url += '/page/' + condition.page;
        }** /
*/
        url += '/search.html';

        console.log(url);
        // return url ;
    }

    /**
     * 初始化导航
     *
     * @inner
     */
    function initFixed() {

        var navTop = sortBox.offset().top;
        var apply = function () {
            // 头部导航
            if (pageScrollTop() > navTop) {
                sortBox.addClass('fixed');
                list.css({'margin-top': '40px'});
            } else {
                sortBox.removeClass('fixed');
                list.css({'margin-top': 0});
            }
        };

        // 初始化时先设置一下
        apply();

        // 滚动时再设置
        $(window).scroll(apply);

    }

    function getTeacherList(cb) {

        var q = '',
        course = '',
        area = '',
        approach = '',
        date = '',
        sex = '',
        teacherType = '',
        sort = '',
        video = '',
        videoCourse = '',
        classCourse = '',
        priceStart = '',
        priceEnd = '',
        source = '',
        longitude = '',
        latitude = '',
        radius = '',
        minPriceFirst = '',
        maxPriceFirst = '';

        var startNum = price.find('.start-num');
        var endNum = price.find('.end-num');
        var mapData = baiduMap.getMapData();
        var dateList = select.find('.time input');
        var dateArray = [];
        dateList.each(function(i, item){
            var element = $(item);
            if (element.prop('checked')) {
                dateArray.push(element.data('dateid'));
            }
        });

        q = store.get('q');
        course = store.get('course');
        area = store.get('area');
        approach = filter.find('.online').prop('checked') ? 2: 0;
        date = dateArray.join(',');
        sex = select.find('.sex').find('.active').data('value');
        teacherType = select.find('.identity').find('.active').data('value');
        sort = sortBox.find('.active').data('type');
        video = filter.find('.intro').prop('checked') ? 1: 0;
        videoCourse = filter.find('.video').prop('checked') ? 1: 0;
        classCourse = filter.find('.course').prop('checked') ? 1: 0;
        priceStart = startNum.data('price');
        priceEnd = endNum.data('price');
        longitude = mapData.lng;
        latitude = mapData.lat;
        radius = mapData.radius;
        minPriceFirst = price.data('min');
        maxPriceFirst = price.data('max');

        return service
        .searchMapTeacher({
            q: q,
            course: course,
            area: area,
            approach: approach,
            date: date,
            sex: sex,
            teacherType: teacherType,
            sort: sort,
            video: video,
            videoCourse: videoCourse,
            classCourse: classCourse,
            priceStart: priceStart,
            priceEnd: priceEnd,
            longitude: longitude,
            latitude: latitude,
            radius: radius,
            minPriceFirst: minPriceFirst,
            maxPriceFirst: maxPriceFirst,
            page: store.get('page'),
            pageSize: 20
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                var tpl = data.tpl.mapSearchAjax;

                if (tpl) {
                    list.html(tpl);

                    //清除地图上原来的点
                    baiduMap.deletePoints();
                    //往地图上添加新的点
                    baiduMap.addPoints(data.teachers);

                    Tooltip.init(list.find('[data-title]'));
                } else {

                }

                // 标注搜索到的老师
                var teacher_count = data.pager.result_total;
                if (teacher_count >= 1000) {
                    sortBox.find('.tip').html('超过1000位老师，仅显示前1000位');
                } else {
                    sortBox.find('.tip').html('共'+teacher_count+' 位老师');
                }

                list.scrollTop(0);
                // 搜索完成的回调函数
                if (cb) {
                    cb();
                }
            }
        });
    }

    function priceSlide() {
        //
        var startBeginPosition = {};
        var endBeginPosition = {};
        var startEndPosition = {};
        var endEndPosition = {};
        var startTargetPosition = {x:-395};
        var endTargetPosition = {x:-395}
        var curElement = null ;
        var min = price.data('min');
        var max = price.data('max');
        var bit = (max - min) / (395 - 10);


        price
        .on('mousedown', '.price-btn', function(e) {
            var element = $(this);

                if (element.hasClass('price-start-btn')) {
                    startBeginPosition.x = e.pageX;
                } else {
                    endBeginPosition.x = e.pageX;
                }

            curElement = $(this).parent();

        })
        price.mouseup(function(e) {
            //targetPosition = {x:0,y:0};
            //beginPosition = {};
            curElement = null;
            store.set('page', 1);
            getTeacherList();
        })

        price.mousemove(function(e){
            if (!curElement) {
                return false;
            }

            if (curElement.hasClass('price-start')) {
                startEndPosition.x = e.pageX;
                var xSize = startEndPosition.x - startBeginPosition.x;
                if (startTargetPosition.x + xSize >= -395 &&
                    startTargetPosition.x + xSize + endTargetPosition.x <= -424) {
                    curElement.css({
                        'left': startTargetPosition.x + xSize
                    });
                    startTargetPosition.x = startTargetPosition.x + xSize;
                    startBeginPosition.x = startEndPosition.x;
                    var startPrice = Math.floor((startTargetPosition.x + 395)*bit)+min;
                    var startNum = price.find('.start-num');
                    startNum.html('¥'+startPrice);
                    startNum.data('price',startPrice);
                }
            } else {
                endEndPosition.x = e.pageX;
                var xSize = endEndPosition.x - endBeginPosition.x;
                if (endTargetPosition.x - xSize >= -395 &&
                    startTargetPosition.x - xSize + endTargetPosition.x <= -424) {
                    curElement.css({
                        'right': endTargetPosition.x - xSize
                    });
                    endTargetPosition.x = endTargetPosition.x - xSize;
                    endBeginPosition.x = endEndPosition.x;
                    var endPrice = max - Math.floor((endTargetPosition.x + 395)*bit);
                    var endNum = price.find('.end-num');
                    endNum.html('¥'+endPrice);
                    endNum.data('price',endPrice);
                }
            }
            return false;
        })
    }

    function mapCallback(type,index,cb) {
        if (type == 'mouseover') {
            var wrappers = list.find('.wrapper');
            wrappers.removeClass('active');
            $(wrappers[index]).addClass('active');
        } else if (type == 'mouseout') {
            var wrappers = list.find('.wrapper');
            wrappers.removeClass('active');
        } else if (type == 'search') {
            store.set('page', 1);
            getTeacherList(cb);
        }
    }

    function renderList(list,level,id,subId,cname) {
        var _html = [];
        var name = '';
        var flag = false;
        for(var j = 0 ; j < list.length; j++) {
            if(subId == list[j].id) {
                flag = true;
            }
        }

        _html.push('<li class="cat-item first '+(flag?'':'active')+' level'+(1+parseInt(level))+'"  data-cid="'+ id +'" data-name="'+cname+'">全部类别</li>');

        for( var i = 0 ; i < list.length; i++) {
            var name_cut = list[i].name.length > 4 ? list[i].name.substr(0,4)+'...' : list[i].name;
            _html.push('<li class="cat-item level'+(1+parseInt(level)) +
                        (i == list.length -1 ? ' last' : '') +
                        (subId == list[i].id ? ' active ': '') +
                        '" data-cid="' + list[i].id + '">'+
                        (name_cut == list[i].name ? '<span>' : '<span data-title="'+list[i].name+'">') +
                        name_cut +
                        ((level == 3 || !list[i].next) ? '</span>' : '</span><i>></i>') +
                        '</li>');
            if (subId == list[i].id) {
                name = list[i].name;
                select.find('.category .item-title').html(name);
            }
        }
        return _html.join('');
    }

    function getCategory(pId , sId ,cb) {
        service
        .getSubjectList({ id: pId })
        .done(function (response) {
            if (response.code === 0) {
                var level = response.data.level ;

                var list = response.data.list ;
                var selector = '<ul class="level'+(1+parseInt(level))+'-list" id="cat-'+pId+'" style="display:none;"></ul>';
                var subList = $(selector);
                var box = null;
                if (level == 1) {
                    box = $('.level2-box');
                } else {
                    box = $('.level3-box');
                }
                select.find('.level2-list').hide();
                select.find('.level3-list').hide();
                box.append(subList);
                subList.html(renderList(list,level,pId,sId)).hide();
                if (cb) {
                    cb();
                }
                /*if (element.offset().top + subList.height() > windowElement.height()) {
                    subList.css({'top': (windowElement.height() - subList.height() - 95 -4)});
                } else {
                    subList.css({'top':top});
                }
                element.show();
                subList.show();
                Tooltip.init(select.find('[data-title]'));*/
            }
            return response;
        });
    }

    exports.init = function () {

        service
        .getUserBasicInfo()
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data;
                if (data.avatar) {

                    var html = renderLoginInfo({
                        user: data,
                        env: store.get('env'),
                        isArtActivity: store.get('isArtActivity')
                    });

                    header.find('.login-link').replaceWith(html);

                }
            }
        });

        // 价格滑动
        priceSlide();
        // 教师列表事件绑定
        teacherlist.init();
        // 初始化导航
        //initFixed()
        // 标注老师
        var teachers = store.get('teachers');
        var windowElement = $(window);

        function autoHeight() {
            var browserWidth = windowElement.width();
            var browserHeight = windowElement.height();
            // 500为左侧列表的宽度
            // 95为头部高度
            // 176为筛选栏高度
            var mapWidth = browserWidth - 500;
            var mapHeight = browserHeight - 95;
            var listHeight = browserHeight - 95 - 176 + 62;
            mapContainer.css({'width':mapWidth,'height':mapHeight});
            list.css({'height':listHeight,'max-height':listHeight});
        }

        autoHeight();
        baiduMap.init('map', teachers, mapCallback);

        window.onresize = function () {
            autoHeight();
        }

        //类目自动选中
        var condition = store.get('condition');
        var course = condition.course;
        if (course) {
            var cArray = course.split(',');
            var cList = cArray[0].split('_');
            if (cList.length == 2) {
                getCategory(cList[0], cList[1]);
            } else if (cList.length == 3) {
                getCategory(cList[0], cList[1], function(){
                    getCategory(cList[1], cList[2]);
                })
            }
        }

        // 加载老师
        //getTeacherList();

        list
        .on('click', '[data-page]', function (e) {

            var target = $(e.currentTarget);
            store.set('page', target.data('page'));

            getTeacherList();
            return false;
        })
        .on('mouseenter', '.search-item', function (e) {
            var index = $(this).index();
            baiduMap.openInfoWindow(index);
        })
        .on('mouseleave', '.search-item', function (e) {
            var index = $(this).index();
            baiduMap.hideInfoWindow(index);
        })

        sortBox
        .on('click', 'a', function (e) {
            var element = $(this);
            sortBox.find('a').removeClass('active');
            element.addClass('active');
            var icon = element.find('i');
            if (icon[0]) {
                if (icon.hasClass('arrow-empty')) {
                    icon.removeClass('arrow-empty')
                        .addClass('arrow-up');
                    element.data('type', 'price_asc');
                } else if (icon.hasClass('arrow-up')) {
                    icon.removeClass('arrow-up')
                        .addClass('arrow-down');
                    element.data('type', 'price_desc');
                } else if (icon.hasClass('arrow-down')) {
                    icon.removeClass('arrow-down')
                        .addClass('arrow-up');
                    element.data('type', 'price_asc');
                }
            } else {
                var icon = sortBox.find('i');
                icon.removeClass('arrow-up')
                    .removeClass('arrow-down')
                    .addClass('arrow-empty');
                icon.parent().data('type','');
            }
            store.set('page', 1);
            getTeacherList();
        })


        filter
        .on('click', 'input', function(e){
            store.set('page', 1);
            getTeacherList();
        })

        $('.search-form')
        .on('click', '.btn', function(e){
            var q = header.find('.search-input').val();
            sortBox.find('.active').removeClass('active');
            filter.find('input').prop('checked',false);
            store.set('q',q);
            var icon = sortBox.find('i');
            icon.removeClass('arrow-up')
                .removeClass('arrow-down')
                .addClass('arrow-empty');
            icon.parent().data('type','');


            store.set('course','');
            select.find('.category .list .active').removeClass('active');
            select.find('.level2-list').hide();
            select.find('.level3-list').hide();
            select.find('.category .item-title').html('课程类别');

            var areaList = select.find('.area input');
            areaList.each(function(i, item){
                var tmp = $(item);
                tmp.prop('checked', false);
                tmp.parent().parent().removeClass('active');
            });
            store.set('area','');
            select.find('.area').removeClass('more-mode');
            select.find('.area .item-title').html('授课区域');

            var dateList = select.find('.time input');
            var dateArray = [];
            dateList.each(function(i, item){
                var element = $(item);
                if (element.prop('checked')) {
                    element.prop('checked', false);
                    element.parent().parent().removeClass('active');
                }
            });

            select.find('.sex').find('.active').removeClass('active');
            select.find('.identity').find('.active').removeClass('active');
            sortBox.find('.active').removeClass('active');

            select.find('.sex .item-title').html('老师性别');
            select.find('.identity span').html('老师身份');
            select.find('.time span').html('上课时间');
            store.set('page', 1);
            getTeacherList();
        })
        // 点击placeholder让输入框获取焦点
        .on('click', '.placeholder', function () {
            header.find('.search-input').focus();
        })
        .on('keyup', '.search-input', function (e) {
            var element = $(this);
            if ( e.keyCode === 13 ) {
                header.find('.btn').click();
            } else {
                var text = $.trim(element.val());
                var placeholder = header.find('.placeholder');

                if (text !== '') {
                    placeholder.hide();
                } else {
                    placeholder.show();
                }
            }
        })
        // 如果用户输入空格或连续空格则placeholder显示
        // 否则placeholder隐藏
        .on('change', '.search-input', function (e) {
            var element = $(this);
            var text = $.trim(element.val());
            var placeholder = header.find('.placeholder');

            if (text !== '') {
                placeholder.hide();
            } else {
                placeholder.show();
            }
        })
        header
        .on('click', '.to-search', function (e) {
            // 去搜索结果页找老师
            location.href = getUrl();
        })

        select
        .on('click', '.item', function(e){
            var element = $(this);
            var parent = element.parent();
            parent.find('li').removeClass('active');
            element.addClass('active');
            store.set('page', 1);
            getTeacherList();
            parent.hide();
            var txt = element.html();
            if (txt == '全部') {
                if (parent.parent().hasClass('sex')){
                    txt = '老师性别';
                } else {
                    txt = '老师身份';
                }
            }
            if (txt == '其他（白领、技能达人等）') {
                txt = '其他';
            }
            // 诡异的bug
            if (parent.parent().hasClass('identity')) {
                parent.parent().find('span').html(txt);
            } else {
                parent.parent().find('.item-title').html(txt);
            }

        })
        // 点击日期筛选的确定
        .on('click', '.date-submit', function(e){
            var element = $(this);
            store.set('page', 1);
            getTeacherList();

            var dateList = select.find('.time input');
            var dateArray = [];
            dateList.each(function(i, item){
                var element = $(item);
                if (element.prop('checked')) {
                    dateArray.push(element.data('dateid'));
                }
            });
            var txt = '';
            if (dateArray.length == 0 ) {
                txt = '上课时间';
            } else if (dateArray.length > 1) {
                txt = '多天';
            } else {
                if (dateArray[0] == 1) {
                    txt = '周一';
                } else if (dateArray[0] == 2) {
                    txt = '周二';
                } else if (dateArray[0] == 3) {
                    txt = '周三';
                } else if (dateArray[0] == 4) {
                    txt = '周四';
                } else if (dateArray[0] == 5) {
                    txt = '周五';
                } else if (dateArray[0] == 6) {
                    txt = '周六';
                } else {
                    txt = '周日';
                }
            }

            element.parent().parent().parent().find('span').html(txt);
            element.parent().parent().hide();
        })
        // 点击区域选择的确定
        .on('click', '.area-submit', function(e){
            var element = $(this);
            var areaList = select.find('.area input');
            var areaArray = [];
            var areaArrayTxt = [];
            areaList.each(function(i, item){
                var tmp = $(item);
                if (tmp.prop('checked')) {
                    areaArray.push(tmp.data('areaid'));
                    areaArrayTxt.push($.trim(tmp.parent().text()));
                }
            });
            if (areaArray.length < 1) {
                return false;
            }
            store.set('area',areaArray.join(','));
            store.set('page', 1);
            getTeacherList(function(){
                element.parent().parent().removeClass('more-mode');
            });
            var txt = '';
            if (areaArray.length > 1) {
                txt = '多区域';
            } else {
                txt = areaArrayTxt[0];
            }
            element.parent().parent().parent().find('.item-title').html(txt);
            element.parent().parent().hide();
        })
        // 点击区域选择的取消
        .on('click', '.area-cancel', function(e){
            var element = $(this);
            var areaList = select.find('.area input');

            areaList.each(function(i, item){
                var tmp = $(item);
                tmp.prop('checked', false);
                tmp.parent().parent().removeClass('active');
            });

            store.set('area','');
            element.parent().parent().removeClass('more-mode');
            element.parent().parent().parent().find('.item-title').html('授课区域');
            element.parent().parent().hide();
            store.set('page', 1);
            getTeacherList();
            return false;
        })
        .on('click', '.area .more', function(e){
            var element = $(this);
            var parent = element.parent();
            parent.addClass('more-mode');
        })
        .on('click', '.area-item', function(e){
            var element = $(this);
            var tagName = e.target.nodeName.toUpperCase();
            var parent = element.parent();

            // 单选
            if ((tagName == 'LI' || tagName == 'LABEL' || tagName == 'SPAN') &&
                !parent.hasClass('more-mode')) {

                parent.find('li').removeClass('active');
                parent.find('input').prop('checked',false);
                element.find('input').attr('checked',true);
                //console.log($.trim(element.text()));
                element.parent().parent().find('.item-title').html($.trim(element.text()));
                element.addClass('active');
                store.set('area',element.find('input').data('areaid'));
                store.set('page', 1);
                getTeacherList();
            }

            if (!parent.hasClass('more-mode')) {
                parent.hide();
            } else {
                // 为选中项加上已选标记
                if (element.find('input').prop('checked')) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            }
        })
        .on('click', '.cat-item', function(e){
            var element = $(this);
            var id = element.data('cid');
            var cname = element.text().replace('>','');
            var txt = $.trim(element.find('span').text());
            if (!txt) {
                txt = '全部类别';
            }

            if (txt == '全部类别' && id) {
                txt = element.data('name');
            }

            if (txt == '全部类别' && !id) {
                select.find('.level2-box .active').removeClass('active');
                select.find('.level3-box .active').removeClass('active');
                select.find('.category .list .active').removeClass('active');
                element.addClass('active');
            }

            select.find('.category .item-title').html(txt);
            if (!id) {
                select.find('.category .list').hide();
                select.find('.level3-list').hide();
                select.find('.level2-list').hide();
                store.set('course', '');
                store.set('page', 1);
                getTeacherList();
                return;
            }

            var top = element.offset().top - 135 + 38;
            var type = 'level1';
            var target = select.find('#cat-'+id)[0] ;

            if (element.hasClass('level2')) {
                type = 'level2';
                // 干掉2,3级别的active
                select.find('.level2-box .active').removeClass('active');
                select.find('.level3-box .active').removeClass('active');
            } else if (element.hasClass('level3')) {
                type = 'level3';
                // 干掉3级的active
                select.find('.level3-box .active').removeClass('active');
            } else {
                select.find('.category .list .active').removeClass('active');
                select.find('.level2-box .active').removeClass('active');
                select.find('.level3-box .active').removeClass('active');
            }

            if (type == 'level3') {
                element.addClass('active');
                store.set('course', element.data('cid'));
                select.find('.level3-list').hide();
                select.find('.level2-list').hide();
                select.find('.category .list').hide();
                store.set('page', 1);
                getTeacherList();
                return;
            }
            //select.find('.category .active').removeClass('active');

            if (!target) {

                service
                .getSubjectList({ id: id })
                .done(function (response) {
                    if (response.code === 0) {
                        var level = response.data.level ;
                        /*var parent = null ;
                        if (element.hasClass('level1')) {
                            parent = element.parent();
                        } else {
                            parent = element.parent().parent();
                        }
                        var subling = parent.find('.level'+(level-1));
                        subling.each(function(i, item){
                            $(item).find('.sub-list:first').hide();
                        })*/

                        var list = response.data.list ;
                        var selector = '<ul class="level'+(1+parseInt(level))+'-list" id="cat-'+id+'"></ul>';
                        var subList = $(selector);
                        var box = null;
                        if (type == 'level1') {
                            box = $('.level2-box');
                        } else {
                            box = $('.level3-box');
                        }
                        select.find('.level2-list').hide();
                        select.find('.level3-list').hide();
                        box.append(subList);
                        subList.html(renderList(list,level,id,null,cname));
                        element.parent().show();
                        element.addClass('active');
                        if (element.offset().top + subList.height() > windowElement.height()) {
                            subList.css({'top': (windowElement.height() - subList.height() - 95 -4)});
                        } else {
                            subList.css({'top':top});
                        }
                        subList.show();
                        Tooltip.init(select.find('[data-title]'));
                    }
                    return response;
                });

            } else {
                /*var level = 0;
                if (element.hasClass('level1')) {
                    level = 1 ;
                } else if (element.hasClass('level2')) {
                    level = 2;
                } else {
                    level = 3;
                }
                var parent = null ;
                if (element.hasClass('level1')) {
                    parent = element.parent();
                } else {
                    parent = element.parent().parent();
                }
                var subling = parent.find('.level'+level);
                subling.each(function(i, item){
                    $(item).find('.sub-list:first').hide();
                })
                element.find('.sub-list:first').show();*/
                select.find('.level2-list').hide();
                select.find('.level3-list').hide();
                element.parent().show();
                element.addClass('active');
                $(target).show();
                $(target).find('.first').addClass('active');
            }
            element.addClass('active');
            store.set('course', element.data('cid'));
            store.set('page', 1);
            getTeacherList();
        })
        .on('mouseenter', '.select-item', function(e){
            var element = $(this);
            if (element.hasClass('disabled')) {
                return false;
            }
            var item = element.find('.item-title');
            if (element.hasClass('identity') ||
                element.hasClass('time')) {
                item = element.find('span');
            }
            element.find('.list').show();
            item.css({'color':'#f90'});
            element.find('.icon-caret-down')
                   .removeClass('icon-caret-down')
                   .addClass('icon-caret-up');
            if (element.hasClass('category')) {
                var list = element.find('.list');
                var cat1 = list.find('.active');
                var cid1 = cat1.data('cid');
                if (cid1) {
                    var cat2 = $('#cat-'+cid1);
                    if (cat2[0]) {
                        cat2.show();
                        var cid2item = cat2.find('.active');
                        var cid2 = cid2item.data('cid');
                        if (cid2) {
                            var cat3 = $('#cat-'+cid2);
                            if (cat3[0]) {
                                cat3.show();
                            }
                        }
                    }
                }
            }
        })
        .on('mouseleave', '.select-item', function(e){
            var element = $(this);
            element.find('.list').hide();
            var item = element.find('.item-title');
            if (element.hasClass('identity') ||
                element.hasClass('time')) {
                item = element.find('span');
            }
            item.css({'color':'#6d6d6d'});
            element.find('.level2-list').hide();
            element.find('.level3-list').hide();
            element.find('.icon-caret-up')
                   .removeClass('icon-caret-up')
                   .addClass('icon-caret-down');
            if (element.hasClass('category')) {
                var list = element.find('.list');
                var cat1 = list.find('.active');
                var cid1 = cat1.data('cid');
                if (cid1) {
                    var cat2 = $('#cat-'+cid1);
                    if (cat2[0]) {
                        cat2.hide();
                        var cid2item = cat2.find('.active');
                        var cid2 = cid2item.data('cid');
                        if (cid2) {
                            var cat3 = $('#cat-'+cid2);
                            if (cat3[0]) {
                                cat3.hide();
                            }
                        }
                    }
                }
            }
        })


    };
});