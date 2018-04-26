/**
 * author huangshiming
 * 评价列表的公用组件 
 *      - 初始化评价列表
 *      - 下拉加载更多
 */
define(function (require, exports) {
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var template = require('artTemplate');
    var render = template.compile(require('text!./commentList.tpl'));
    var listRender = template.compile(require('text!./list.tpl'));
    var service = require('common/service');
    var initStars = require('common/comment/initStars');
    var ui = require('common/ui');
    var user = require('common/user');
    var ajaxFlag = true;
    var hasMoreDomHeight = 100000000;

    /**
     * 评论列表的构造函数
     * @param {Object} pageData 所需要的数据
     */
    function Comment (pageData) {
        this.dom = pageData.dom;
        this.key = pageData.key;
        this.value = pageData.value;
        this.order_by = pageData.order_by;
    }

    /**
     * 功能: 
     *  -ajax函数，控制着获取评论列表的接口
     *  @param {Object} params
     *  @property {String} params.key 评价类型
     *  @property {String} params.value 课程/老师/订单number
     *  @property {Number} params.page 页码
     *  @property {Number} params.page_seiz 请求评论的个数
     *  @param {Dom} dom 承载这个评论列表的dom节点
     *  @param {Function} Func 回调函数，接口数据回来后执行的函数
     */
    function initService (params, dom, Funcs) {
        if (ajaxFlag) {
            ajaxFlag = false;
            service.get('/comment/list', 
                params, 
                function (responese) {
                    Funcs(responese, dom);
                    ajaxFlag = true; 
            });
        }
    }

    /**
     * 功能：
     *  -初始化评论列表的函数，作为回调函数用作第一次传给initService，随后会刷新创建dom，初始化第一页的评论列表
     * @param {Object} responese ajax获取到的评论数据
     */
    Comment.prototype.initDom = function (responese) {
        //var that = this;
        if (+responese.code === 0) {
            var data = responese.data.comment_paged;
            var html = render({
                list: data.items,
                pager: data.pager
            });
            this.dom.append(html);
            this.hasMoreComment();
            this.initStars();
            this.showAdditionComment();
            this.getTrumpInitStatus();
            this.clickThumb();

            var moreCommentDom = this.dom.find('.has-more');
            if (data.pager.has_more) {
                hasMoreDomHeight = moreCommentDom.position().top;
            } else {
                hasMoreDomHeight = 10000000;
            }

            lazyLoadImage.init();
        }
    };

    /**
     * 功能：
     *  -上拉加载更多数据的时候，作为回调函数传给initService
     * @param {Object} responese ajax获取到的评论数据
     */
    Comment.prototype.initMoreDom = function (responese) {
        if (+responese.code === 0) {
            var data = responese.data.comment_paged;
            var html = listRender({
                list: data.items
            });
            var commentContent = this.dom.find('.comment-content');
            commentContent.append(html);
            var pager = data.pager;

            var moreCommentDom = this.dom.find('.has-more');

            if (pager.has_more) {
                hasMoreDomHeight = moreCommentDom.position().top;
            } else {
                hasMoreDomHeight = 10000000;
            }
            moreCommentDom
                .attr('data-next-cursor', pager.next_page)
                .addClass('hide');
            this.showAdditionComment();
            this.initStars();
            this.getTrumpInitStatus();
            this.clickThumb();
            lazyLoadImage.init();
            
        }
    };


     /**
     * 功能：
     *  -负责上拉加载更多数据的函数
     */
    Comment.prototype.hasMoreComment = function () {
        var moreCommentDom = this.dom.find('.has-more');
        //hasMoreDomHeight = moreCommentDom.position().top;
        var that = this;
        function initMoreComment () {
            if (window.scrollY + window.innerHeight > hasMoreDomHeight - 40) {
                var nextCursor = moreCommentDom.attr('data-next-cursor');
                var param = {
                    key: that.key,
                    value: that.value,
                    page: nextCursor,
                    order_by: that.order_by,
                    page_size: 10,
                };
                moreCommentDom
                    .removeClass('hide')
                    .addClass('loading');
                initService(param, that.dom, that.initMoreDom.bind(that));
            }
        }
        $(window)
            .unbind('scroll', initMoreComment)
            .on('scroll', initMoreComment);

    };

    /**
     * 功能：
     *  -点击查看更多评价的函数
     */
    Comment.prototype.showAdditionComment = function () {
        this.dom.on('click', '.check-more', function () {
            var that = $(this);
            that
                .hide()
                .siblings('.additions').removeClass('hide');
        });
    };

    /**
     * 功能：
     *  -初始化星星
     */
    Comment.prototype.initStars = function () {
        this.dom.find('.comment-content .comment-list').each(function () {
            var that = $(this);
            var starsDom = that.find('.info .point .stars');
            initStars.initStars(starsDom);
            that.find('.additions .fold-content').each(function () {
                var there = $(this);
                var sDom = there.find('.header-line .fold-score .fold-stars');
                initStars.initStars(sDom);
            });
        });
    };

    /**
     * 功能：
     *  -批量获取是否赞
     */
    Comment.prototype.getTrumpInitStatus = function () {
        var trumb = $('.trump');
        var trumbCommentIds = [];
        var recieveCommentIds = [];
        trumb.each(function () {
            var that = $(this);
            trumbCommentIds.push(that.data('id'));
        });

        var userInfo = user.getUserInfo();
        if (userInfo && user.isStudentLogin) {
            service.get('/thumb/check', {
                object_type: 'COMMENT',
                object_ids: JSON.stringify(trumbCommentIds),
                action: 'UP'
            }, function (responese) {
                if (+responese.code === 0) {
                    var data = responese.data.thumbed;
                    data.forEach(function (item) {
                        recieveCommentIds.push(+item.object_id);
                    });

                    trumb.each(function () {
                        var that = $(this);
                        if (recieveCommentIds.indexOf(+that.data('id')) > -1) {
                            that.find('.icon')
                                .removeClass('icon-like')
                                .addClass('icon-ic_tuijian_done');
                            that.attr('data-status', 1);
                        }
                    });
                }
            });
        }
    };

    /**
     * 功能：
     *  -点赞
     */
    Comment.prototype.clickThumb = function () {
        var thumb = $('.trump');
        thumb.unbind('click').on('click', function () {
            var userInfo = user.getUserInfo();
            var that = $(this);
            if (!userInfo) {
                user.loginStudent(function() {
                    location.reload();
                });
            } else if (user.isStudentLogin) {
                if (+that.attr('data-can-trump')) {
                    that.attr('data-can-trump', 0);
                    service.post('/thumb/operate', {
                        object_type: 'COMMENT',
                        object_id: that.data('id'),
                        action: +that.attr('data-status') ? 'CANCEL_UP' : 'UP' 
                    }, function (responese) {
                        if (+responese.code === 0) {
                            var trumpCount = that.attr('data-count');
                            var trumpIcon = that.find('.icon');
                            var trumpCountDom = that.find('.trump-count');
                            if (+that.attr('data-status')) {
                                // 取消赞
                                that.attr('data-status', 0);
                                trumpIcon
                                    .removeClass('icon-ic_tuijian_done')
                                    .addClass('icon-like');
                                
                                trumpCountDom
                                    .text(+trumpCount - 1);

                                that.attr('data-count', +trumpCount - 1);
                            } else {
                                // 赞
                                that.attr('data-status', 1);
                                trumpIcon
                                    .removeClass('icon-like')
                                    .addClass('icon-ic_tuijian_done');
                                
                                trumpCountDom.text(+trumpCount + 1);

                                that.attr('data-count', +trumpCount + 1);
                            }
                            that.attr('data-can-trump', 1);                       
                        }
                    });
                }
            } else if (user.isTeacherLogin) {
                ui.remind('请切换学生身份登录');
            }
        });
    };


    exports.init =  function (pageData) {
        ajaxFlag = true;
        var commentObject = new Comment(pageData);
        initService({
            key: pageData.key,
            value: pageData.value,
            page: 1,
            page_size: 10,
            order_by: pageData.order_by
        }, pageData.dom, commentObject.initDom.bind(commentObject));
    };
});