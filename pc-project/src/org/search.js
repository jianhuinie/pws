/**
 * @file 机构搜索结果
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');

    var searchbox = $('#search-box');
    var tabnav = $('#tab-nav');
    var store = require('common/store');
    var searchlist = require('common/component/OrgSearchList');
    var relatedcourse = require('teacher/search/relatedcourse');
    var seekTeacher = require('teacher/seekTeacher');
    var AdBanner = require('common/component/AdBanner');
    var goldCertOrg = require('main/mods/goldCertOrg');

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
        var abtest = store.get('abtest');
        var city_pinyin = store.get('city_pinyin');
        var url = '' ;

        if (abtest) {
            url += '/so/' + city_pinyin + '/';
        } else {
            url += '/so/';
        }

        if (condition.q) {
            var reg=new RegExp('-','gmi');
            var query = condition.q ;
            url += encodeURIComponent(query.replace(reg,''));
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
        if (condition.sort&&condition.sort != 'all') {
            url += condition.sort;
        }
        //机构类型
        url += '-';
        if (condition.org_type) {
            url += condition.org_type;
        }
        //是否有视频介绍
        url += '-';
        if (condition.video_intro) {
            url += condition.video_intro;
        }
        url += '-';
        if (condition.can_order) {
            url += condition.can_order;
        }
        url += '-';
        if (condition.is_local) {
            url += condition.is_local;
        }
        url += '-';
        if (condition.is_online) {
            url += condition.is_online;
        }

        /*if (condition.page) {
            url += '/page/' + condition.page;
        }*/
        url = rtrim(url);
        url += '.html';

        if (abtest) {
            if (url == ('/so/'+city_pinyin+'/.html')) {
                url = '/so/'+city_pinyin+'/-.html';
            }
        } else {
            if (url == '/so/.html') {
                url = '/so/-.html';
            }
        }

        var citys = [];
        if (condition.city && condition.city.length > 0) {
            for(var i = 0 ; i < condition.city.length; i++) {
                citys.push(condition.city[i].id);
            }
        }
        if (citys.length > 0) {
            url += '?city='+citys.join(',')+'&source=search';
        } else {
            url += '?source=search';
        }
        return url ;
    }

    exports.init = function () {

        goldCertOrg.init('institutionsearch');

        /**
         * 初始化搜索列表页事件
         */
        searchlist.init();
        seekTeacher.init();
        relatedcourse.init();
        
        // 广告系统
        new AdBanner({
            ele: $('#sidebar .ad-wrappers').eq(0)
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
            if( primary ) {
                primary.removeClass('btn-selected').addClass('btn-link');
            }
            element.removeClass('btn-link').addClass('btn-selected');
            subway.show();
        })
        // 课程类目1点击更多隐藏
        .on('click', '.more_course', function (e) {
            var element = $(this);
            element.parent().addClass('more');
            element.hide();
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
        // 展开收缩筛选框
        .on('click', '.switch', function (e) {
            var element = $(this).find('i');
            if (element.hasClass('icon-angle-down')) {
                element.removeClass('icon-angle-down')
                    .addClass('icon-angle-up');
                searchbox.find('.card-body').show();
            } else {
                element.removeClass('icon-angle-up')
                       .addClass('icon-angle-down');
                searchbox.find('.card-body').hide();
            }
        })
        // 区域查看更多
        .on('click', '.area-more', function (e) {
            var element = $(this);
            var areaBox = $('#filter-area');
            var list = areaBox.find('.area-list:eq(0)');
            var subList = areaBox.find('.area-list:eq(1)');
            var nextList = areaBox.find('.next-list');
            nextList.hide();
            list.hide();
            subList.show();
            element.hide();
        })


        // 全国逻辑
        if (searchbox.find('.city-list')[0]) {
            var cityContainer = searchbox.find('.city-container');
            var alphabetList = searchbox.find('.alphabet-list');
            searchbox
            .on('mouseenter', '.alphabet-list li', function(e){
                var element = $(this);
                var key = element.text().toLowerCase();
                alphabetList.find('li').removeClass('active');
                element.addClass('active');
                cityContainer.find('.city-box').removeClass('show');
                cityContainer.find('.class'+key).addClass('show');
            })
            .on('click', '.custom-city', function(e){
                var element = $(this);
                if (element.hasClass('custom-city-style')) {
                    element.removeClass('custom-city-style');
                    searchbox.find('.city-list').hide();
                } else {
                    element.addClass('custom-city-style');
                    searchbox.find('.city-list').show();
                }
            })
            .on('click', '.city-container li', function(e){

                var element = $(this);
                var domain = element.find('input').data('domain');
                var cid = element.find('input').data('cid');
                var name = element.text();
                var flag = true;
                if (element.find('input').is(':checked')) {
                    if (searchbox.find('.selected-city li').length>4) {
                        //alert('最多选择5个城市~');
                        searchbox.find('.select-txt').html('最多选择5个城市~').show();
                        return false;
                    }
                    searchbox.find('.selected-city li').each(function(i, item){
                        if ($(item).text() == name) {
                            flag = false;
                        }
                    });
                    if (flag) {
                        searchbox.find('.selected-city').append('<li><label><input type="checkbox" checked="checked" data-domain="'+domain+'" data-cid="'+cid+'">'+name+'</label></li>');
                    }
                    var length = searchbox.find('.selected-city li').length;
                    //searchbox.find('.select-txt').html('您已选择了'+length+'个城市');
                    searchbox.find('.select-txt').hide();
                }else {
                    searchbox.find('.selected-city li').each(function(i, item){
                        if ($(item).text() == name) {
                            $(item).remove();
                        }
                    });
                    var length = searchbox.find('.selected-city li').length;
                    //searchbox.find('.select-txt').html('您已选择了'+length+'个城市');
                    searchbox.find('.select-txt').hide();
                }
            })
            .on('click', '.selected-city li', function(e){
                var element = $(this);
                var name = element.text();
                searchbox.find('.city-container li').each(function(i, item){
                    if ($(item).text() == name) {
                        $(item).find('input').prop('checked','');
                    }
                })
                element.remove();
                var length = searchbox.find('.selected-city li').length;
                //searchbox.find('.select-txt').html('您已选择了'+length+'个城市');
                searchbox.find('.select-txt').hide();
            })
            // 确定
            .on('click', '.area-confirm', function(e){
                var length = searchbox.find('.selected-city li').length;
                /*if (length < 1) {
                    //alert('请选择城市~');
                    return false;
                }*/

                /*if (length == 1) {
                    var domain = searchbox.find('.selected-city input').data('domain');
                    location.href = 'http://'+domain+'.genshuixue.com/st/-.html';
                } else {*/
                    //searchbox.find('li')
                    var array = [];
                    searchbox.find('.selected-city li').each(function(i, item){
                        var ele = $(item).find('input');
                        array.push(ele.data('cid'));
                    });
                //}


                searchbox.find('.custom-city').removeClass('custom-city-style');
                searchbox.find('.city-list').hide();
                var link = '';
                if (array.length > 1) {
                    link = 'http://www.genshuixue.com'+getUrl()+'&city='+array.join(',');
                } else {
                    link = 'http://www.genshuixue.com'+getUrl();
                }
                location.href = link ;
            })
            // 取消
            .on('click', '.area-cancel', function(e){
                searchbox.find('.city-container li').each(function(i, item){
                    $(item).find('input').prop('checked','');
                })
                searchbox.find('.selected-city').html('');
                searchbox.find('.custom-city').removeClass('custom-city-style');
                searchbox.find('.city-list').hide();
            })
        } else {
            // 多选择区域
            searchbox
            .on('click', '.area-confirm', function (e) {
                var element = $(this);
                var parent = element.parent().parent();
                var list = parent.find('input');
                var ids = [] ;
                list.each(function(i, item) {
                    var tmp = $(item);
                    if (tmp.prop('checked')) {
                        ids.push(encodeURIComponent(tmp.parent().parent().data('aid')));
                    }
                });
                if (ids.length < 1) {
                    return ;
                }
                location.href = getUrl('area', ids.join(','));
            })
            .on('click', '.area-cancel', function (e) {
                var areaBox = $('#filter-area');
                var list = areaBox.find('.area-list:eq(0)');
                var subList = areaBox.find('.area-list:eq(1)');
                list.show();
                subList.hide();
                $('.area-more').show();
            })
            .on('click', '.subway-more', function (e) {
                var element = $(this);
                var areaBox = $('#filter-area');
                var list = areaBox.find('.next-list ul:eq(0)');
                var subList = areaBox.find('.next-list ul:eq(1)');
                list.hide();
                subList.show();
                element.hide();
            })
            .on('click', '.subway-confirm', function (e) {
                var element = $(this);
                var parent = element.parent().parent();
                var list = parent.find('input');
                var ids = [] ;
                list.each(function(i, item) {
                    var tmp = $(item);
                    if (tmp.prop('checked')) {
                        ids.push(encodeURIComponent(tmp.parent().parent().data('aid')));
                    }
                });
                if (ids.length < 1) {
                    return ;
                }
                location.href = getUrl('area', ids.join(','));
            })
            .on('click', '.subway-cancel', function (e) {
                var areaBox = $('#filter-area');
                var list = areaBox.find('.next-list ul:eq(0)');
                var subList = areaBox.find('.next-list ul:eq(1)');
                list.show();
                subList.hide();
                $('.subway-more').show();
            });
        }


    };
});