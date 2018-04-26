/**
 * @file 我的收藏 - 机构收藏
 * @author caoying
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var Tooltip = require('cobble/ui/Tooltip');
    var service = require('common/service');


    var content = $("#content");
    var orgBody = content.find('.org-body');
    var orgPager = content.find('.pager-block');

    exports.init = function () {

        content
        // 机构简介标签
        .on('mouseenter', '.org-brief', function(e) {
            new Tooltip({
                element: $(this).find('[data-title]')
            });
        })

        .on('click', ".btn-primary", function(e) {
            var data = $(this).closest('.org-info').data('content');

            window.open(data.url, '_blank');
        })

        .on('click', ".org-delete", function(e) {
            var data = $(this).closest('.org-info').data('content');
            var pager = $(this).data('pager');
            var orgId = data.number;
            var user = store.get('user');

            confirm({
                title: "温馨提示",
                content: "确定删除?",
                buttons: [
                    {
                        text: '确定',
                        type: 'primary',
                        handler: function () {

                            var that = this;
                            // 调用ajax删除机构收藏
                            service
                            .deleteFavor ({
                                number: orgId,
                                type: 'org'
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
                                            location.href = "/collection/list/org?page=" + currentPage;
                                       }
                                       else {
                                             location.href = "/collection/list/org?page=" + pager.page;
                                       }
                                    }
                                    else {
                                        location.href = "/collection/list/org";
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

        .on('click', '.pager [data-page]', function () { // 点击分页

            var page = $(this).data('page');

            // 调用ajax请求翻页数据
            service
            .getFavorList({
                page: page,
                type:'org'
            })
            .done(function (response) {

                var responseData = response.data;

                if(response.code == 0) {
                    orgBody.html(responseData.tpl.collections);
                }
            });

            $(window).scrollTop(0);
            return false;
        });

    };
});