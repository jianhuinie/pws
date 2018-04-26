/**
 * Created by wangtianhua
 */
define(function(require) {

    'use strict';

    var lazyLoadImage = require("common/lazyLoadImage");
    var openAppWindow = require("common/openAppWindow");
    var app = require("common/app");
    var url = require("util/url");
    var template = require('artTemplate');
    var liRender = template.compile(require("text!./list.tpl"));
    var urlParams = url().params;

    //添加app搜索功能
    function addSearchShow () {
        if( app.isApp() ) {
            app.send("setSearchInfo");
        }
    }

    function moreListInit () {

        function getMoreList (page, done) {

            require(["common/service"], function (service) {

                service.get(
                    "/k12/localCourse",
                    {
                        grade: urlParams.grade,
                        page: page,
                        render: "json"
                    },
                    function (res) {

                        res = res || {};

                        var data = res.data || {};

                        if(res.code == "0"){
                            done && done(data.list, data.page.has_more);
                        }else {
                            done && done(false);
                        }
                    }
                )
            });

        };

        $(".more-button").click(function(){

            var me = this;
            var page = $(this).data("page");

            var nextPage = + page + 1;

            $(me).addClass('loading');

            getMoreList(nextPage, function(list, hasMore){

                $(me).removeClass("loading");

                if(list && list.length){

                    var listTemplate = liRender({
                        $list: list
                    });

                    $(".course-wrapper").append(listTemplate);

                    lazyLoadImage.init();

                    $(me).data("page",nextPage);

                    if(!hasMore){
                        $(".more-button").remove();
                    }

                }
            });
        });

    }

    return function(){

        addSearchShow();

        lazyLoadImage.init();

        openAppWindow.init();

        moreListInit();

    }
});