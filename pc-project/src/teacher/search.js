/**
 * @file 搜索结果
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var urlUtil = require('cobble/util/url');
    var cookie = require('cobble/util/cookie');
    var searchbox = $('#search-box');
    var tabnav = $('#tab-nav');
    var cardHeader = $('.card-header');
    var content = $("#content");
    var searchorg = $('#search-org');
    var store = require('common/store');
    var searchlist = require('common/component/SearchList');
    var recommend = require('./search/recommend');
    var seekTeacher = require('./seekTeacher');
    var relatedcourse = require('./search/relatedcourse');
    var AdBanner = require('common/component/AdBanner');
    var leaveMessageDialog = require('common/component/LeaveMessageDialog');

    function rtrim(str) {
        var length = str.length;
        var idx = length;
        var flag = true;

        for (var i = length - 1; i > 0; i--) {
            if (str[i] == '-' && flag) {
                idx = i;
            } else {
                flag = false;
            }
        }
        return str.substr(0, idx);
    }

    function getUrl(type, data) {

        var condition = store.get('condition');
        var abtest = store.get('abtest');
        var city_pinyin = store.get('city_pinyin');
        var cityDomain = store.get('cityDomain');

        var url = '';
        if (type == 'map') {
            url += '/' + cityDomain + '/sm-';
        } else {
            if (abtest) { // 废弃
                url += '/st/' + city_pinyin + '/';
            } else {
                url += '/' + cityDomain + '/st-';
            }
        }

        if (condition.q) {
            var reg = new RegExp('-', 'gmi');
            var query = condition.q;
            url += encodeURIComponent(query.replace(reg, ''));
        }
        //科目
        url += '-';
        if (condition.course_level1) {
            url += condition.course_level1;
            //二级科目
            if (condition.course_level2) {
                url = url + "_" + condition.course_level2;
                //三级科目
                if (condition.course_level3) {
                    url = url + "_" + condition.course_level3;
                }
            }
        }
        //商区
        url += '-';
        if (condition.area_level1) {
            url += condition.area_level1;
            // 二级商区
            if (condition.area_level2) {
                url =url + "_" + condition.area_level2;
            }
        }
        //排序
        url += '-';
        if (condition.sort && condition.sort != 'all') {
            url += condition.sort;
        }
        url += '-';
        if (condition.course_lesson_ways) {
            url += condition.course_lesson_ways;
        }
        url += '-';
        if (condition.teacher_type) {
            url += condition.teacher_type;
        }
        // 老师资质
        url += '-';
        if ((condition.teacher_qualification) || (type=='zizhi' && data.zizhi)) {
            var str = "";
            if(type == 'zizhi'){
                str += data.zizhi;
            }else{
                str += condition.teacher_qualification;
            }
            url += str;
        }
        url += '-';
        if (condition.school_age) {
            url +=condition.school_age;
        }
        url += '-';
        if (condition.sex || condition.sex == 0) {
            url += condition.sex;
        }

        url = rtrim(url);
        url += '.html';

        if (abtest) { // 废弃
            if (url == ('/st/' + city_pinyin + '/.html')) {
                url = '/st/' + city_pinyin + '/-.html';
            }
        } else {
            if (url == '/' + cityDomain + '/st.html') {
                url = '/' + cityDomain + '/st-.html';
            }
        }

        if (url == '/' + cityDomain + '/sm.html') {
            url = '/' + cityDomain + '/sm-.html';
        }
        url += '?source=search';

        var searchDebug = urlUtil.parseQuery(location.search)["sd"]
        if(searchDebug){
            url= url + '&sd=' + searchDebug;
        }
        return url;
    }

    exports.init = function () {

        /**
         * 快速帮你找老师初始化
         */
        recommend.init();

        seekTeacher.init();
        /**
         * 初始化搜索列表页事件
         */
        searchlist.init();
        relatedcourse.init();

        // 广告位初始化
        new AdBanner({
            ele: $('#sidebar .ad-wrappers').eq(0)
        });


        searchorg.click(function (e) {
            var element = $(e.target);
            if (element.hasClass('comment-box')) {
                var url = element.data('url');
                searchorg.attr('href', url);
            } else {
                var url = searchorg.data('url');
                searchorg.attr('href', url);
            }
        });

        /**
         * 点击地铁弹出地铁信息
         */
        searchbox
        .on('click', '.focus', function (e) {
            var element = $(this);
            var parent = element.parent().parent();
            var subway = parent.parent().find('.next-list');
            var filterarea = searchbox.find('#filter-area');
            var primaryBox = filterarea.find('.area-list:eq(0)');
            var primary = primaryBox.find('.btn-selected');
            if (primary) {
                primary.removeClass('btn-selected').addClass('btn-link');
            }
            element.removeClass('btn-link').addClass('btn-selected');
            subway.show();
        })
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
            for(var i =0;i<eles.length;i++){
                var value = $(eles[i]).attr("data-value");
                array.push(value);
            }
            location.href = getUrl("zizhi",{zizhi:array.join(',')});
        });

        /**
         * 按价格排序显隐浮动框
         */
        tabnav
        .on('mouseenter', '.drift', function (e) {
            var $this = $(this).find("ul");
            $this && $this.show();
        })

        .on('mouseleave', '.drift', function (e) {
            var $this = $(this).find("ul");
            $this && $this.hide();
        });



        // cardHeader
        // .on('click', '.to-map', function (e) {
        //     var element = $(this);
        //     element.prop('href', getUrl('map'));
        // });

        content
        .on('click', '.seek-in', function (e) {
            new leaveMessageDialog({
                teacher: 'search'
            });

            var query = $('input[name="q"]').val();

            var element = $(this);
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'recommend',
                stype: '1',
                client: 'PC',
                page_type: leaveMessPageType,
                track_id: cookie.get('__track_id__'),
                _timestamp: new Date().getTime(),
                user_number: store.get('user').number,
                user_role: store.get('user').type,
                location_type: leaveMessPageType+'_2',
                tid: '',
                cid: '',
                query: query,
            };
            WAT.send(url, params);

        });

        // 解决chrome下placeholder字体变化
        tabnav.find('input[type="text"]').css({'font-size': '12px'});

    };
});