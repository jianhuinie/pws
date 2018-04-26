/**
 * @file 我的收藏
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var searchlist = require('common/component/SearchList');
    var service = require("common/service");
    var content = $("#content");

    exports.init = function () {

        searchlist.init();

        content
        .on("click", ".delete-favor", function(e) {

            var number = $(this).data('number');
            var pager = $(this).data('pager');

            confirm({
                title: "温馨提示",
                content: "确定删除?",
                buttons: [
                    {
                        text: '确定',
                        type: 'primary',
                        handler: function () {

                            var that = this;
                            // 调用ajax删除老师收藏
                            service.deleteFavor ({
                                number: number,
                                type: 'teacher'
                            })
                            .done( function (response) {
                                var responseData = response.data;

                                if(response.code == 0) {

                                    that.hide();
                                    success("删除收藏成功！");

                                    var currentPage = Math.ceil((pager.count - 1)/(pager.page_size));
                                    var pageCount = Math.ceil((pager.count)/(pager.page_size));

                                    if(currentPage != 0) {
                                       if(pager.page == pageCount && currentPage == (pageCount - 1)) {
                                            location.href = "/student_center/favourite?page=" + currentPage;
                                       }
                                       else {
                                            location.href = "/student_center/favourite?page=" + pager.page;
                                       }
                                    }
                                    else {
                                        location.href = "/student_center/favourite";
                                    }
                                }
                            });
                        }
                    },
                    {
                        text: '取消',
                        handler: function () {
                            this.hide();
                            result.reject();
                        }
                    }
                ]
            });
        })

    };
});