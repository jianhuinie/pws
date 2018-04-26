/**
 * @file 学生订单搜索、删除功能
 * @author wanglu
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    var etpl = require('cobble/util/etpl');
    var string = require('cobble/util/string');
    var Dialog = require('cobble/ui/Dialog');
    var etplFilter = require('common/util/etplFilter');
    var orderEtplFilter = require('./orderEtplFilter');
    var Pager = require('cobble/ui/Pager');
    var Tooltip = require('cobble/ui/Tooltip');
    var commonOrderList = require('common/center/orderList');

    exports.init = function () {
        var container = $('#content');
        var currentPage, currentStatus = 1;
        var searchInput, currentDataStatus, newPageCount, pageSize, storeCurrentPage, initOrderList, isdeleteOrder;
        var isSearch = false;
        var currentPageNode, nextPageNode, prePageNode, currentPage, prePage, nextPage, lastPage;

        etplFilter.init();
        orderEtplFilter.init();
        commonOrderList.init();

        var deleteContent = '<div class="make-sure">您确定要删除该订单吗？</div>'
                          + '<div class="no-renew">订单删除之后不可恢复</div>';

        var orderSearchInput = '<input class="search-input" type="text" placeholder="输入课程名称或科目名称进行搜索" />'
                             + '<button class="search-button" type="submit">订单搜索</button>';

        var listTabTpl =  etpl.compile( 
            require('text!./orderListTab.tpl')
        ); 

        var listHeadTpl =  etpl.compile( 
            require('text!./cardHeader.tpl')
        ); 

        var listTpl =  etpl.compile( 
            require('text!./orderList.tpl')
        );

        var noListTpl =  etpl.compile( 
            require('text!./orderListNoData.tpl')
        );
        

        var getPage = function (pagination) {  // 分页
            var page, page_size, page_count, count, show_count, start, end, nofollow;
            var pageContent = '';
            if (!pagination.page) {
                page = 1; 
            }
            else {
                page = +pagination.page;
            }
            if (!pagination.page_size || pagination.page_size == 0) {
                page_size = 10; 
            }
            else {
                page_size = +pagination.page_size;
            }
            if (!pagination.count) {
                count = 1; 
            }
            else {
                count = +pagination.count;
            }
            page_count = Math.ceil((count / page_size));

            if (!pagination.show_count) {
                show_count = 4; 
            }
            else {
                show_count = +pagination.show_count;
            }
            if ((show_count % 2) == 1) {
                show_count -= 1; 
            }
            if (page_count > 1) {
                pageContent += '<div class="pager">';
                if (page > 1) {
                    pageContent += '<a  class="preText"';
                    if (pagination.nofollow) {
                        pageContent += 'rel="nofollow"';
                    }
                    pageContent += '>'
                                +  '<i class="icon icon-chevron-left"></i> 上一页'
                                +  '</a>';
                }
                
                if (page_count <= (show_count + 1) ) {
                    start = 1;
                    end = page_count;
                }
                else if (page_count <= (page + show_count)) {
                    end = page_count;
                    start = page_count - show_count;
                }
                else if (page <= (show_count/2)) {
                    start = 1;
                    end = 1 + show_count;
                }
                else {
                    start = page - (show_count/2);
                    end = page + (show_count/2);
                }
                if (start > 2) {
                    pageContent += '<a data-page="1"  class="page-child"';
                    if (pagination.nofollow) {
                        pageContent +=      'rel="nofollow"';
                    }
                    pageContent += '>'
                                + 1
                                + '</a>'
                                + '<b class="ellipsis">...</b>';
                }
                for (var i = start;i <= end; i++) {
                    if (i == +page) {
                        pageContent += '<a class="active page-child" data-page="' + i + '"';
                        if (pagination.nofollow) {
                            pageContent += 'rel="nofollow"';
                        }
                        else {
                            pageContent += '>' 
                                    + i 
                                    + '</a>'; 
                        }
                    }
                    else {
                        pageContent += '<a class="page-child" data-page="' + i + '"';
                        if (pagination.nofollow) {
                            pageContent += 'rel="nofollow"';
                        } 
                        pageContent += '>' 
                                    + i 
                                    + '</a>'; 
                    }
                        
                }
                if (end < page_count) {
                    pageContent += '<b class="ellipsis">...</b>'
                                + '<a data-page="' 
                                + page_count 
                                + '"  class="page-child"';
                    if (pagination.nofollow) {
                        pageContent += 'rel="nofollow"';
                    } 
                    pageContent += '>'
                                + page_count
                                + '</a>';
                }
                if (page < page_count) {
                    pageContent += '<a class="nextText"';
                    if (pagination.nofollow) {
                        pageContent +=  'rel="nofollow"';
                    } 
                    pageContent += '>' 
                                +  '下一页<i class="icon icon-chevron-right"></i>'
                                + '</a>';
                }
                pageContent += '</div>';
            }
            return pageContent;
        }

        var setOrderInterval = function (purchaseId, expiredLength) { // 给订单增加失效时间定时器
            (function () {
                var elem = $('#count-down-' + purchaseId);
                if (elem.length > 0) {
                    var timestamp = expiredLength;
                    function pad(num) {
                        return num < 10 ? ('0' + num) : num;
                    }
                    var timer = window.setInterval(
                        function () {
                            timestamp -= 1;
                            if (timestamp < 1) {
                                clearInterval(timer);
                                alert(
                                    '编号为' + purchaseId + '的订单已失效'
                                );
                            }
                            var hours = Math.floor( timestamp / 3600 );
                            var minutes = Math.floor( ( timestamp % 3600 ) / 60 );
                            var seconds = Math.floor( ( timestamp % 3600 ) % 60 );
                            var timerHtml = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
                                        
                            elem.html(timerHtml);
                        },1000
                    );
                }
                
            })();
        }

        var isOrderInvalid = function () { // 判断订单是否失效
            if ($('.getExpiredLength')) {  
                var expiredLength, purchaseid;
                $('.getExpiredLength').each(function () {
                    var me = $(this);
                    expiredLength = me.text();
                    purchaseid = me.next('.getPurchaseId').text(); 
                    setOrderInterval(purchaseid, expiredLength);
                });
            }
        }

        var ajaxTabOrder = function (isdeleteOrder) {  // 发送ajax请求 渲染tab
            service
            .studentTabOrder()
            .done(function (response) {
                if (response && response.code == 0) { // 学生订单tab
                    var data = response.data;
                    container.find('.tab-nav').html(listTabTpl(response));

                    if (isdeleteOrder) {  // 删除订单后刷新tab并保留当前tab状态
                        $('.nav-item').each(function(){
                            if ($(this).attr('data-status') == currentStatus) {
                                $(this).addClass('active').siblings().removeClass('active');
                            }
                        });
                    }
                }
            });
        };

        var ajaxOrderList = function (currentStatus, pageSize, storeCurrentPage, initOrderList, isdeleteOrder) {  // 订单列表接口
            service 
                .studentOrderList({
                    status: currentStatus,
                    page: pageSize
                })
                .done(function (response) {
                    if (response && response.code == 0) {  // 学生订单列表
                        
                        var data = response.data;

                        if (initOrderList) {  // 初始化页面 头部 和 搜索框
                            container.find('.card-header').html(listHeadTpl(response));
                            container.find('.search-order').html(orderSearchInput);
                        }
                        else if (!isdeleteOrder){  // 删除订单不需要清空（初始化）
                            container.find('.no-data').html('');
                            container.find('.order-list').html('');
                            container.find('.pager-block').html('');
                        }

                        if (storeCurrentPage) { // 需要改变page属性
                            data.pagination.page = pageSize;
                        }
                        if (isdeleteOrder) { // 如果是删除订单时
                            var pageText = getPage(data.pagination);
                            container.find('.pager-block').html(pageText);
                        }
                        else {
                            var pageText = getPage(data.pagination);

                            if (data.order_list.length !== 0) {  // 订单存在
                                container.find('.order-list').html(listTpl(data));
                                container.find('.pager-block').html(pageText);

                                Tooltip.init(container.find('[data-title]'));
                                isOrderInvalid(); // 判断订单是否失效
                                
                            }
                            else if (data.order_list.length == 0) {  // 订单不存在
                                container.find('.no-data').html(noListTpl());
                                container.find('.pager-block').html('');
                            }
                        }
                    }
                });
        };

         var ajaxOrderSearch = function (searchInput, pageSize, storeCurrentPage, isdeleteOrder) {  // 订单搜索下接口
             service
                .studentSearchOrder({
                    search: searchInput,
                    page: pageSize
                })
                .done(function (response) {
                    if (response && response.code == 0) {
                        
                        var data = response.data; 
                        
                        if (storeCurrentPage) { // 需要改变page属性,存储当前页码
                            data.pagination.page = pageSize;
                        }

                        if (isdeleteOrder) { // 如果是删除订单时
                            var pageText = getPage(data.pagination);
                            container.find('.pager-block').html(pageText);
                            return false;
                        }

                        var pageText = getPage(data.pagination);
                        
                        container.find('.order-list').html('');
                        container.find('.no-data').html('');
                        container.find('.pager-block').html('');

                        if (data.order_list.length !== 0) {  // 订单存在
                            container.find('.order-list').html(listTpl(data));
                            container.find('.pager-block').html(pageText);
                            Tooltip.init(container.find('[data-title]'));
                            isOrderInvalid(); // 判断订单是否失效
                            
                        }
                        else if (data.order_list.length == 0) {  // 订单不存在
                            container.find('.no-data').html(noListTpl());
                            container.find('.pager-block').html('');
                        }
                    }
                });
        };
        
        ajaxTabOrder();
        ajaxOrderList(1, 1, 0, 1, 0 );

        var getStatusPage = function (isTab) {
            currentPageNode = $('.pager').children('.active');
            currentPage = (+(currentPageNode.attr('data-page')));
            currentStatus = $('.tab-nav').children('.active').attr('data-status');
            if (!isTab) {
                nextPageNode = currentPageNode.next();
                prePageNode = currentPageNode.prev();
                prePage = currentPage - 1;
                nextPage = currentPage + 1;
                
                lastPage = $('.nextText').prev().attr('data-page');
            }
        }
        
        container
            .on('click', '.nav-item', function(e) {  // tab点击绑定事件 
                var target = $(e.target);
                target.addClass('active').siblings().removeClass('active');
                getStatusPage(1);
                isSearch = false;  // tab 点击后不再展示订单搜索列表

                var inputNode = $('input[class="search-input"]')
                inputNode.val('');

                ajaxOrderList(currentStatus, 1, 1, 0, 0);
            })
            .on('click', ".page-child", function(e) {  // 分页点击绑定事件
                var target = $(e.target);
                target.addClass('active').siblings().removeClass('active');
                getStatusPage();

                if (currentPage == 1) {
                    $('.preText').hide();
                }
                if (currentPage > 1) {
                    $('.preText').show();
                }
                if (currentPage < lastPage) {
                    $('.nextText').show();
                } else {
                    $('.nextText').hide();
                }

                currentDataStatus = $('.tab-nav').children('.active').attr('data-status');
                
                if (searchInput && currentDataStatus == 1 && isSearch) {  // 订单搜索下分页
                    ajaxOrderSearch(searchInput, currentPage, 1);
                }
                else {  // 订单列表
                    ajaxOrderList(currentStatus, currentPage, 1, 0, 0);
                }
            })
            .on('click', '.preText', function () {  // 点击上一页
                getStatusPage();

                if (prePage == 2) {
                    $('.preText').hide();
                }
                if (currentPage > 1) {
                    $('.preText').show();
                }

                prePageNode.addClass('active').siblings().removeClass('active');

                // container.find('.pager-block').html('');
                
                if (searchInput && currentDataStatus == 1 && isSearch) {  // 订单搜索 ———上一页
                    ajaxOrderSearch(searchInput, prePage, 1);
                }
                else {  // 订单列表 ———上一页
                    ajaxOrderList(currentStatus, prePage, 1, 0, 0);
                }

            })
            .on('click', '.nextText', function () {  // 点击下一页
                getStatusPage();
                nextPageNode.addClass('active').siblings().removeClass('active');

                if (nextPage < lastPage) {
                    $('.nextText').show();
                } else {
                    $('.nextText').hide();
                }

                // container.find('.pager-block').html('');

                if (searchInput && currentDataStatus == 1 && isSearch) {  // 订单搜索 ———下一页
                    ajaxOrderSearch(searchInput, nextPage, 1);
                }
                else {  // 订单列表 ———下一页
                    ajaxOrderList(currentStatus, nextPage, 1, 0, 0);
                }

            })
            .on('click', '.search-button', function(e) {  // 学生搜索订单
                var inputNode = $('input[class="search-input"]')
                searchInput = inputNode.val(); // 用户输入值
                inputNode.val(searchInput);
                
                if (searchInput) { 
                    isSearch = true;
                }
                else {
                    isSearch = false;
                }

                if (searchInput) {  // 存在用户输入值
                    ajaxTabOrder();
                    ajaxOrderSearch(searchInput, 1, 0);
                }
                else {
                    ajaxOrderList(1, 1, 0, 0, 0);
                }
                
            })

            .on('click', '.delete-order', function(e) { //学生删除订单
                var target = $(e.currentTarget);
                
                confirm({
                    content: deleteContent,
                    skinClass: 'dialog-confirm',
                    buttons: [
                        {
                            text: '取消',
                            handler: function () {
                                this.hide();
                            }
                        },
                        {
                            text: '确定',
                            type: 'primary',
                            handler: function () {  // 删除订单
                                service
                                    .studentDeleteOrder({
                                        purchase_id: target.data('id')
                                    })
                                    .done(function (response) {
                                        if (response && response.code == 0) {
                                            var data = response.data;

                                            container.find('.no-data').html('');
                                            currentPageNode = $('.pager').children('.active');
                                            currentPage = (+(currentPageNode.attr('data-page')));
                                            currentDataStatus = $('.tab-nav').children('.active').attr('data-status');

                                            if (data.is_success) {  // 删除成功 被删除元素隐藏
                                                target.parents('.order-item').hide();  
                                                target.parents('.order-item').addClass('isHide');  // 订单被隐藏并添加isHide类
                                                currentStatus = $('.tab-nav').children('.active').attr('data-status');
                                                
                                                // 刷新tab
                                                ajaxTabOrder(1);

                                                // 遍历所有订单 判断是否所有订单都被隐藏
                                                var str = 0;
                                                $('.order-item').each(function () {  
                                                    if(!($(this).hasClass('isHide'))) {  // 如果有订单没有被隐藏
                                                        str = 1;
                                                    } 
                                                });
                                                if (!str) {  // 如果所有订单都被隐藏 
                                                    container.find('.no-data').html(noListTpl());
                                                    container.find('.pager-block').html('');
                                                }
                                                else {  // 如果有订单没有被隐藏 刷新分页
                                                    if (searchInput && currentDataStatus == 1 && isSearch) {  // 订单搜索——刷新分页
                                                        ajaxOrderSearch(searchInput, currentPage, 1, 1);
                                                    }
                                                    else { // 订单列表——刷新分页
                                                        ajaxOrderList(currentStatus, currentPage, 1, 0, 1);
                                                    }
                                                }
                                            }
                                            else {
                                                alert('删除失败');
                                            }
                                        }
                                    });        
                                this.hide();
                            }
                        }
                        
                    ]
                });
            });

        $(document).keyup(function(e){  // 回车也能触发搜索
            if(e.keyCode ==13){
                $(".search-button").trigger("click");
            }
        });

    };
});