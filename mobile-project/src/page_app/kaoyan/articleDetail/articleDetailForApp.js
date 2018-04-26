/**
 * @file 文章详情页
 * @author hanzhaohang @ 2015-07-29
 */
define(function(require, exports) {
    'use strict';

    /*var setShare = require('common/function/setShare');*/
    var lazyLoadImage = require('common/lazyLoadImage');
    var appController = require('common/app');
    var $ = require('zepto');
    var service = require('common/service');
    var ui = require("common/ui");
    /*var clickLog = require('common/log-click');*/
    var pageData = null;
    var store = {
        get: function(key) {
            if (pageData[key]) {
                return pageData[key];
            } else {
                return '';
            }
        }
    }

    /*var store = require('common/store');*/
    /*var Dialog = require('cobble/ui/Dialog');*/
    var observer = require('common/mvc/observer');
    var m_article_number;

    /*var cityMgr = require('common/function/cityMgr');*/

    /*var util = require('common/util');*/

    var curCity;


    var newCDom = $('#new-comments-ul');
    var topCDom = $('#hot-comments-ul');


    /*评论系列----------------start*/
    /**
     * 定位到评论位置
     */
    function toCommentPosition() {
        Jockey.on('scrollToComment', function() {
            scrollToComment();
        });
    }


    var scrollToComment = (function() {
        var i = 0;
        var beforeTop;

        return function(className) {
            if (className) {
                scrollTo($('.comments').position().top);
            } else {
                if (++i % 2) {
                    beforeTop = $(window).scrollTop();
                    scrollTo($('.comments').position().top);
                } else if (util.lang.isNumber(beforeTop)) {
                    scrollTo(beforeTop);
                }
            }
        }
    })();


    /**
     * 页面滚动到指定位置
     * @param  {value} value 滚动到的位置
     */
    function scrollTo(value) {
        var bd = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        window.scrollTo(0, value);
    }

    /**
     * 对app打开收藏功能
     * @return {[type]} [description]
     */
   function openCollection() {
        function setFavouriteInfo(options) {

            if (!options.number) {
                return;
            }
            Jockey.send("setFavouriteInfo", {
                fav_status: '' + options.favorite_status,
                type: '' + options.type,
                number: '' + options.number
            });

        }
        setFavouriteInfo(store.get('favorite_info') || {});
    }

    /**
     * 评论过长时，展开收起评论
     * @return {[type]} [description]
     */
    function showAllContent() {
        function showOrHide(me) {
            var contentDom = me.parent().find('.content');
            if (me.html() == '收起') {
                contentDom.addClass('ellipsis');
                me.html('查看全部');
            } else {
                contentDom.removeClass('ellipsis');
                me.html('收起');
            }
        }

        newCDom.on('click', '.show-more', function() {
            showOrHide($(this));
        });
        topCDom.on('click', '.show-more', function() {
            showOrHide($(this));
        });
    }

    /**
     * 删除评论
     */
    function deleteComment() {

        function handle() {
            var me = $(this);
            var comment_id = me.attr('comment_id');

            ui.confirm({
                title: '温馨提示',
                content: '确定删除这条评论吗？'
            }).done(function() {
                service.post('/article_comment/delete', {
                        comment_id: comment_id
                    },
                    function(e) {
                        if (e.code == 0) {
                            $('li[comment_id="' + comment_id + '"]').remove();
                            if (!newCDom.has_more && newCDom.children().length == 0) {
                                $('.none-comment').show();
                                $('.new-comment').hide();
                            }
                            if (e.data && Number(e.data.total_comments) == e.data.total_comments) {
                                setAppCommentNum(e.data.total_comments);
                            }
                        }
                    },
                    function() {
                        ui.remind('删除失败，请稍后再试。');
                    }
                );

            })
        }

        newCDom.on('click', '.delete-comment', handle);
        topCDom.on('click', '.delete-comment', handle);
    }

    /**
     * 绑定评论事件
     * @return {[type]} [description]
     */
    function doComment() {
        function bindComment(cDom, parentDom) {
            var commentId = cDom.attr('comment_id');
            var text = parentDom.find('li[comment_id="' + commentId + '"] .content').text();

            var placeHolder = '回复@' + cDom.attr('user_name') + '：' + text.substring(0, 20);
            Jockey.send('writeComment', {
                place_holder: placeHolder,
                article_number: '' + m_article_number,
                comment_id: commentId
            });
        }

        var callback = bindComment;

        topCDom.on('click', '.do-commenent', function() {
            callback($(this), topCDom);
        });
        newCDom.on('click', '.do-commenent', function() {
            callback($(this), newCDom);
        });
    }

    /**
     * 评论点赞
     */
    function commentDianzan() {
        function zan(cDom) {
            var commentId = cDom.attr('comment_id');
            var action = cDom.attr('supported') == 1 ? 'unsupported' : 'supported';
            var zanNum = cDom.attr('support_num');

            send('/article_comment/support', {
                comment_id: commentId,
                action: action
            }, function() {
                zanNum = Number(zanNum) == zanNum && zanNum >= 0 ? Number(zanNum) : 0;

                if (action == 'supported') {
                    cDom.addClass('on').attr('supported', '1');
                    zanNum++;
                } else {
                    cDom.removeClass('on').attr('supported', '0');
                    zanNum--;
                }
                zanNum = zanNum >= 0 ? zanNum : 0;
                cDom.find('.support_num').html(zanNum == 0 ? '赞' : zanNum);
                cDom.attr('support_num', zanNum);
            }, function() {
                ui.remind('网络繁忙，请稍后再试');
            });


            /*$.ajax({
                url: '/article_comment/support',
                data: {
                    comment_id: commentId,
                    action: action
                },
                method: 'post',
                dataType: 'json'
            }).done(function() {
                zanNum = Number(zanNum) == zanNum && zanNum >= 0 ? Number(zanNum) : 0;

                if (action == 'supported') {
                    cDom.addClass('on').attr('supported', '1');
                    zanNum++;
                } else {
                    cDom.removeClass('on').attr('supported', '0');
                    zanNum--;
                }
                zanNum = zanNum >= 0 ? zanNum : 0;
                cDom.find('.support_num').html(zanNum == 0 ? '赞' : zanNum);
                cDom.attr('support_num', zanNum);
            }).fail(function() {
                ui.remind('网络繁忙，请稍后再试');
            })*/
        }

        topCDom.on('click', '.zan', function() {
            zan($(this));
        });
        newCDom.on('click', '.zan', function() {
            zan($(this));
        });
    }


    /**
     * 接收从app端传回的评价数据，评发布出去
     * @return {[type]} [description]
     */
    function requestComment() {
        Jockey.on('sendComment', function(contentObj) {
            addComment(contentObj);
        })
    }

    /**
     * 增加评论
     */
    function addComment(commentObj) {
        var param = {
            article_number: m_article_number,
            content: commentObj.content
        };
        commentObj.comment_id && (param.comment_id = commentObj.comment_id);
        service.post('/article_comment/create', param,
            function(e) {
                if (e.code == 0) {
                    scrollToComment('new-comments');
                    var commentHtml = commentTpl(e.data.comment);
                    var tDom = $(commentHtml);
                    newCDom.prepend(tDom);
                    if (newCDom.children().length >= 0) {
                        $('.none-comment').hide();
                        $('.new-comment').show();
                    }
                    tDom.find('.content').each(function(index, item) {
                        if (item.offsetHeight < item.scrollHeight) {
                            $(item.nextSibling).show();
                        }
                    });
                    lazyLoadImage.init(newCDom);
                    setAppCommentNum(e.data.total_comments);
                } else {
                    ui.remind(e.msg);
                }
            },
            function() {
                ui.remind('评论失败，请稍后再试');
            });
    }

    /**
     * 点击加载更多
     */
    function loadMoreComments() {
        var loadText = '正在加载中，请稍后...';
        $('.more-comment').on('click', function() {
            var cDom = $(this);
            var next_cursor = cDom.attr('next_cursor');
            var type = cDom.attr('type');
            if (cDom.html() == loadText) {
                return;
            }
            cDom.html(loadText);
            var params = {
                article_number: m_article_number,
                next_cursor: next_cursor
            };
            if (type == 'hot-comments-ul') {
                params['top_comment'] = 1;
            }
            service.post('/article_comment/comments', params, function(response) {
                if (response.code == 0) {
                    var data = response.data;
                    loadComments(data.comments, '#' + type);
                    if (data.has_more) {
                        cDom.attr('next_cursor', data.next_cursor).html(cDom.attr('text'));
                        cDom.has_more = true;
                    } else {
                        cDom.hide();
                        cDom.has_more = false;
                    }
                } else if (response.code == -1) {
                    cDom.html(cDom.attr('text'));
                };
            });

        });
    }

    /**
     * 组装单条评论
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    function commentTpl(obj) {
        var htmlArr = [];
        htmlArr.push('<li comment_id="' + obj.id + '">');
        htmlArr.push('<div class="author-head">');
        var stuUrl = obj.url ? obj.url : (obj.number ? '/x/' + obj.number : '###');
        /*htmlArr.push('<a href="' + stuUrl + '">');*/
        htmlArr.push('<img data-src="' + obj.avatar + '" width="100%" whs="1" height="auto"/>');
        /*htmlArr.push('</a>');*/
        htmlArr.push('</div><div class="author-detail">');
        htmlArr.push('<div class="name">' + obj.name + '</div>');
        htmlArr.push('<div class="content ellipsis">' + obj.content + '</div>');
        htmlArr.push('<div class="show-more">查看全部</div>');
        var isSupport = obj.supported == 1 ? 'on' : '';
        htmlArr.push('<div class="icons"><div class="time">' + obj.create_time);
        if (obj.can_delete == 1) {
            htmlArr.push('<span class="delete-comment" comment_id="' + obj.id + '">删除</span>')
        }
        var supNum = ((!!obj.support && Number(obj.support) >= 0) ? obj.support : 0);
        htmlArr.push('</div><div support_num="' + supNum + '" comment_id="' + obj.id + '" supported="' + obj.supported + '" class="zan ' + isSupport + '">');
        htmlArr.push('<span class="icon-like"></span><span class="support_num">' + (supNum == 0 ? '赞' : supNum) + '</span></div>');
        htmlArr.push('<div user_name="' + obj.name + '" comment_id="' + obj.id + '" class="do-commenent"><span class="icon-edit"></span>回复');
        htmlArr.push('</div></div></div></li>');
        return htmlArr.join('');
    }

    /**
     * 组装整体评论
     * @param  {[type]} comments [description]
     * @param  {[type]} selector [description]
     * @return {[type]}          [description]
     */
    function loadComments(comments, selector) {
        var pDom = $(selector);
        var htmlArr = [];
        if (pDom.length) {
            for (var i = 0; i <= comments.length - 1; i++) {
                htmlArr.push(commentTpl(comments[i]));
            }
            pDom.append($(htmlArr.join('')));
            lazyLoadImage.init(pDom);
            pDom.find('.content').each(function(index, item) {
                if (item.offsetHeight < item.scrollHeight) {
                    $(item.nextSibling).show();
                }
            });
        }
    }


    /**
     * 初始化评论系统
     */
    function initComments() {
        var comments = store.get('comments');
        if (!comments || !comments.comments.length) {
            $('.none-comment').show();
            $('.new-comment').hide();
        } else {
            loadComments(comments.comments, newCDom);
            if (comments.has_more) {
                newCDom.parent().find('.more-comment').show();
                newCDom.has_more = true;
            }
            var hotComments = store.get('top_comments');
            if (hotComments && hotComments.comments.length) {
                loadComments(hotComments.comments, topCDom);
                $('#hot-comments').show();
                if (hotComments.has_more) {
                    topCDom.parent().find('.more-comment').show();
                    topCDom.has_more = true;
                }
            }
        }
        // 绑定回复评论
        doComment();
        // 绑定点赞事件
        commentDianzan();
        // 点击加载更多
        loadMoreComments();
        // 删除评论
        deleteComment();
        // 展开或者收起评论
        showAllContent();
        // 接收评论
        requestComment();
    }

    /*评论系列----------------end*/


    /**
     * 点击查看大图
     * @return {[type]} [description]
     */
    function initImgMask() {
        var me = $('#showBigPic');
        var showBigPic = function(e) {
            var bdom = me.find('img');
            var that = $(e.target);
            var dom = Boolean(e) ? that : bdom;
            var dh = dom.height(),
                dw = dom.width(),
                wh = $(window).height(),
                ww = $(window).width();
            if (ww / dw * dh >= wh) {
                bdom.height(wh);
                bdom.width(Math.floor(wh / dh * dw));
            } else {
                bdom.width(ww);
                bdom.height(Math.floor(ww / dw * dh));
            }
            e && bdom.attr('src', that.attr('src'));
            me.css({
                'height': wh + 'px',
                'line-height': wh + 'px'
            });

            me.show();
            e && e.stopPropagation();
            e && e.preventDefault();
            return false;
        };

        // 判断图片外是否包含跟谁学的link---20151227-hanzhaohang
        function isGSXLink(linkDom) {
            var url = linkDom.attr('href');
            var preUrl = ('string' == typeof url) ? url.split('?')[0] : '';
            if (preUrl == '' || ((preUrl.indexOf('http://') > -1 || preUrl.indexOf('https://') > -1) && preUrl.indexOf('genshuixue') == -1)) {
                return false;
            } else {
                if (!(preUrl.indexOf('http://') > -1 || preUrl.indexOf('https://') > -1)) {
                    if (url.indexOf('/') == 0) {
                        url = location.origin + url;
                    } else {
                        url = location.origin + '/' + url;
                    }
                }
                appController.openNewWindow(url);
            }
            return false;
        }


        var atd = $('#article-content');
        atd.on('click', 'img', function(e) {
            var hasLink = $(this).closest('a');
            if (!(hasLink.length && isGSXLink(hasLink))) {
                showBigPic(e);
                e && e.stopPropagation();
                e && e.preventDefault();
            }
        });
        me.bind('touchmove', function(e) {
            e.preventDefault();
            return false;
        });

        me.bind('click', function(e) {
            e.preventDefault();
            $(this).hide();
            e.stopPropagation();
            return false;
        });
    }

    function send(url, data, onSuccess, onError) {
        return service.post(url, data, function(response) {
            if (response.code == 0) {
                onSuccess && onSuccess(response);
            } else if (response.code == -1) {
                if (onError) {
                    onError(response);
                } else if (response.msg) {
                    ui.remind(response.msg);
                }
            }
        });
        /*return $.ajax({
            url: url,
            data: data,
            method: 'post',
            dataType: 'json'
        }).done(function(response) {
            var resultCode = response.code;
            if (resultCode == 0) {
                onSuccess && onSuccess(response);
            } else {
                if (onError) {
                    onError(response);
                } else if (response.msg) {
                    ui.remind(response.msg);
                }
            }
        });*/
    }

    /**
     * 初始化点赞系列功能
     */
    function initRecommendBtn() {
        var addRecommend = $('#add_recommend');
        var addRecommendDom = $('#add_recommend_dom');
        addRecommend.on('webkitTransitionEnd', function() {
            addRecommend.removeClass('add_one_on').html('');
        });
        var lastAjax = null;
        $('#recommend-btn').on('click', function() {
            // 如果正在执行点赞，就忽略本次操作；
            if (addRecommend.hasClass('add_one_on')) {
                return
            }
            var cDom = $(this);
            var recvalue = cDom.hasClass('active') ? 0 : 1;
            var action = recvalue ? 'like' : 'unlike';

            function setUiType() {
                var endvalue = '+1';
                var endClass = "recommend-btn active";
                if (!recvalue) {
                    // 取消赞的状态
                    endvalue = '-1';
                    endClass = 'recommend-btn'
                }

                addRecommend.html(endvalue);
                cDom.attr('class', endClass);
                setTimeout(function() {
                    addRecommend.addClass('add_one_on');
                    var rcount = parseInt(addRecommendDom.html());
                    addRecommendDom.html(rcount + parseInt(endvalue));
                }, 10);

                setTimeout(function() {
                    addRecommend.removeClass('add_one_on').html('');
                }, 1000);
            }

            setUiType();

            if (lastAjax) {
                lastAjax.abort()
            }

            lastAjax = send('/article/support', {
                article_number: m_article_number,
                action: action
            }, function() {}, function() {});
        })
    }

    var keyType = "detail_article";

    /**
     * 根据异步获取来的数据拼接
     * @param  {[Object]} response 异步数据
     */
    function initHtml(response) {
        return;
        if (response.code == 0) {
            var clickLog = [];
            var clickLogStr = '';
            var tad = response.data.article_author;

            if (tad && tad.teacher_number) {
                /*var parentDom = $('#article_teacher');
                clickLog = [];
                clickLog.push(' role="' + tad.role); // 用户角色
                clickLog.push('" search_form="' + tad.search_form);
                clickLog.push('" qid="' + tad.qid);
                clickLog.push('" data-log="' + keyType);
                clickLog.push('" number="' + tad.number);
                clickLog.push('" content_type="' + tad.content_type + '"');
                clickLogStr = clickLog.join('');

                var tHtml = [];
                tHtml.push('<a teacher-number="' + tad.teacher_number + '" data-app="teacher|' + tad.teacher_number + '" rank="1" data-log="' + keyType + '" ' + clickLogStr + ' href="' + tad.teacher_home_url + '">');
                tHtml.push('<div class="child-content"><div class="item-content">');
                tHtml.push('<h3 class="single-line">' + tad.author + '</h3>');
                if (tad.teacher_number != '920323318') {
                    tHtml.push('<p class="news-teacher-name single-line">' + tad.school_age + '&nbsp' + tad.subject_name + '</p>');
                }

                tHtml.push('<p class="news-teacher-name single-line">' + tad.summary_ext + '</p>');
                tHtml.push('</div><div class="right-img-content">');
                tHtml.push('<img width="100%" height="100%" ow="172" oh="96" src="' + tad.avatar + '"></div></div></div>');

                parentDom.html(tHtml.join('')).show();
                lazyLoadImage.init(parentDom[0]);
                $('div[teacher-number]').attr('teacher-number', tad.teacher_number);*/
            }

            var data_article = response.data.affiliated_article || [];
            var data_course = response.data.affiliated_course || [];
            var data = data_article.concat(data_course);
            // item的html数组
            var domArr = [];
            // 当前item的html字符串
            var curHtml = '';
            var rankObj = {
                teacher: 1,
                course: 1
            };
            for (var i = 0; i < data.length; i++) {
                var curData = data[i];
                if (!curData.content_type) {
                    // 后端出现过content_type为null的异常情况
                    // 针对content_type为null的情况作兼容                    
                    continue;
                }

                var hasImg = curData.cover ? 'right-image' : '';
                var hasImgDom = '';
                if (hasImg.length > 0) {
                    hasImgDom = '' + '<div class="right-img-content">' + '<img width="100%" height="100%" ow="172" oh="96" data-src="' + curData.cover + '">' + '</div>';
                }

                // 增加埋点信息
                var curKey = curData.content_type.indexOf('course') ? 'course' : 'teacher';
                var rank = rankObj[curKey]++;
                clickLog = [];
                clickLog.push(' rank="' + rank);
                clickLog.push('" role="' + curData.role); // 用户角色
                clickLog.push('" search_form="' + curData.search_form);
                clickLog.push('" qid="' + curData.qid);
                clickLog.push('" data-log="' + keyType);
                clickLog.push('" number="' + curData.number);
                if (curData.content_type == 'course') {
                    if (curData.type_flag == 'class_course') {
                        clickLog.push('" data-app="course|' + curData.number);
                    } else if (curData.type_flag == 'video_course') {
                        clickLog.push('" data-app="videoCourse|' + curData.number + '|');
                    }

                }
                clickLog.push('" content_type="' + curData.content_type + '"');
                clickLogStr = clickLog.join('');

                curHtml = '' + '<li article_number="' + curData.number + '" class="item-content ' + hasImg + '">' + '<a ' + clickLogStr + ' href="' + curData.url + '">' + '<div class="child-content"><div>' + '<h3 class="double-line">' + curData.headline + '</h3>' + '<p class="news-teacher-name"><span class="orange-tag">' + curData.type + '</span>' + (curData.subhead ? curData.subhead : '') + '</p></div>' + hasImgDom + '</div></a></li>';
                domArr.push(curHtml);
            }
            if (false && data.length > 0) {
                var mdom = $('#bottom-article-info');
                mdom.show();
                mdom.find('.relative-info').html($(domArr.join('')));
                lazyLoadImage.init(mdom[0]);
            }
            if (appController.isApp()) {
                $('[teacher-number]').click(function(e) {
                    e.preventDefault();
                    var cLink = $(this);
                    var teacherNumber = cLink.attr('teacher-number');
                    if (appController.isStudentApp()) {
                        appController.redirectTeacherDetail(teacherNumber);
                    } else {
                        appController.openNewWindow(location.origin + '/' + teacherNumber);
                    }
                    return false;
                });

                /*var isStudentApp = appController.isStudentApp();
                var isTeacherApp = appController.isTeacherApp();
                var currentVersionNumber = appController.getAppVersion();
                if ((isStudentApp && currentVersionNumber >= '2.7.0') || (isTeacherApp && currentVersionNumber >= '2.9.0')) {
                    var $links = $('#bottom-article-info').find('li.item-content a[content_type="article"]')
                    $links.attr('target', '_self');
                    $links.click(function(e) {
                        e.preventDefault();
                        Jockey.send('toNews', {
                            url: $(this).attr('href')
                        });
                        return false;
                    });
                }*/
                // 开始初始化埋点；
                /*initLog();*/
            }
        }
    }

    function getRelativeInfo() {
        var ready = false;

        function dataReady() {
            if (ready) {
                return false;
            }
            ready = true;
            $('#relative-info-load').hide();
            $('.comments').show();
            // 初始化评论系统
            initComments();
        }

        // loading菊花消失条件，异步加载完成或者等待超过十秒；
        setTimeout(dataReady, 10000);

        // 获取相关信息，这部分信息需要加埋点；
        function getInfo(data) {
            dataReady();
            /*
                        service.post('/article/affiliated', data, function(response) {
                            dataReady();
                            initHtml(response);
                        });*/
            /*$.ajax({
                url: '/article/affiliated',
                data: data,
                method: 'post',
                dataType: 'json'
            }).done(function(response) {
                
            }).fail(function() {
                ui.remind('加载失败');
            });*/
        }

        //dataReady();
        //initHtml({"code":0,"msg":"succ","data":{"affiliated_article":[{"headline":"\u4f18\u7f8e\u4e14\u9002\u5408\u7ec3\u4e60\u542c\u529b\u768415\u9996\u82f1\u6587\u6b4c\u66f2","cover":"http:\/\/img.gsxservice.com\/zixun\/tfel_uhos\/526185aab519a274ab8c7e7ae25bb3f8.jpeg","subhead":"\u5b9e\u6218\u82f1\u8bed\u53e3\u8bed\u4ea4\u6d41","type":"\u8d44\u8baf","type_flag":"article","content_type":"article","qid":"28a2f2a2-62c9-41b1-9f30-9ae36068f06d","article_form":"search","search_form":"article","role":-1,"number":"44189682469","url":"http:\/\/news.m.genshuixue.com\/44189682469.html"},{"headline":"\u56db\u7ea7\u8003\u8bd5\u4e2d\u6700\u5e38\u8003\u768410\u4e2a\u82f1\u8bed\u5355\u8bcd","cover":"http:\/\/img.gsxservice.com\/zixun\/tfel_uhos\/8608372aa084e7950f3af0dbac77ad6c.jpeg","subhead":"\u82f1\u8bed\u8001\u5e08\u5218\u6c5f\u534e","type":"\u8d44\u8baf","type_flag":"article","content_type":"article","qid":"28a2f2a2-62c9-41b1-9f30-9ae36068f06d","article_form":"search","search_form":"article","role":-1,"number":"44726544677","url":"http:\/\/news.m.genshuixue.com\/44726544677.html"}],"article_author":{"author":"\u5f20\u4fca\u5a25","school_age":"10\u5e74\u6559\u9f84","summary_ext":"GOLD WILL SHINE","avatar":"http:\/\/img.gsxservice.com\/27140_nu62jjfk.jpeg","qid":"-1","article_form":"apiArticleRT","search_form":"apiArticleRT","role":-1,"content_type":"teacher","number":"499983938","subject_name":"\u53e3\u8bed","teacher_number":"499983938","teacher_home_url":"http:\/\/m.genshuixue.com\/499983938"},"affiliated_course":[{"headline":"\u82f1\u8bed\u53e3\u8bed","cover":"http:\/\/img.gsxservice.com\/3083492_4nuumpx2.jpeg","subhead":"\u718a\u57f9\u9e4f","type":"\u8bfe\u7a0b","type_flag":"course","content_type":"course","qid":"87d412fc-0beb-1858-5847-4e7fc2e9bbd2","article_form":"search","search_form":"articleAuthor","role":-1,"number":"150926515851","url":"http:\/\/m.genshuixue.com\/teacher\/classCourseDetail?number=150926515851"},{"headline":"\u82f1\u8bed\u53e3\u8bed","cover":"http:\/\/img.gsxservice.com\/3082796_suu62vlw.jpeg","subhead":"\u5e38\u5764","type":"\u8bfe\u7a0b","type_flag":"course","content_type":"course","qid":"87d412fc-0beb-1858-5847-4e7fc2e9bbd2","article_form":"search","search_form":"articleAuthor","role":-1,"number":"150926581835","url":"http:\/\/m.genshuixue.com\/teacher\/classCourseDetail?number=150926581835"}]},"ts":1443317157});

        var lat = '';
        var lng = '';
        var param = {
            article_number: m_article_number,
            city: ''
        };
        getInfo(param);

        /*function getCity() {
            service.getArea({
                'latitude': (lat ? lat : ''),
                'longitude': (lng ? lng : '')
            }).done(function(response) {
                if (response.code === 0) {
                    param.city = response.data.id;
                }
                getInfo(param);
            });
        }
        getCity();*/

        /*cityMgr.geoLocation(function(lat, lng) {
            // 首先取cookie的经纬度，如果cookie的经纬度不存在，就重新定位；
            // 如果本地cookie不存在经纬度信息，也不再重新定位，避免打扰用户modify by hanzh@08-13
            if (lat && lng) {
                param.lat = lat;
                param.lng = lng
            }
            getCity();
        }, function() {
            getCity();
        }, false, true);*/
    }

    function initReport() {
        // 举报按钮
        var reportBtn = $('#report-btn');
        reportBtn.click(function() {
            if (!reportBtn.attr('reported')) {
                ui.confirm({
                    title: '温馨提示',
                    content: '确定举报该篇文章吗？'
                }).done(function() {
                    function sendMsg() {
                        send('/article/report', {
                            article_number: m_article_number
                        }, function(response) { //onSuccess
                            if (response.code == 0) {
                                var rres = "举报成功";
                                if (!response.data.result) {
                                    rres = "您已经举报过该篇文章"
                                }
                                ui.remind(rres);
                                reportBtn.html('已举报').attr('reported', true);
                            }

                        }).fail(function() {
                            ui.remind('举报失败，请稍后再试。');
                        });
                    }
                    sendMsg();
                });
            }

        });
    }

    var shareConfig = {};

    /**
     * 埋点函数
     */
    function initLog() {

        if (initLog.inited) {
            return;
        }
        initLog.inited = 1;
        clickLog.init({
            url: 'https://click.genshuixue.com/article'
        });
        var platForm = appController.getPlatForm();
        var client_plat = appController.isApp() ? platForm : 'm';
        clickLog.config('detail_article', function(element, defaultParams) {
            // 资讯详情页埋点，字段说明见链接：
            // http://git.baijiahulian.com/search-system/big-data-wiki/wikis/article_statistics
            var time = Date.now();
            var $element = $(element);
            var type = $element.attr('content_type');
            var user_number = store.get('user').id;


            // 判断当前number的类型
            // article 资讯
            // offline_course 线下班课
            // live_course 直播课
            // video_course 视频课
            var sendTypeName = type.indexOf('course') > -1 ? 'course_number' : type + '_number';

            defaultParams.qid = $element.attr('qid');
            defaultParams[sendTypeName] = $element.attr('number');
            defaultParams.rank = $element.attr('rank');
            // defaultParams.platForm = appController.getPlatForm();
            defaultParams.search_form = $element.attr('search_form');
            defaultParams.content_type = $element.attr('content_type');
            defaultParams.client_plat = client_plat;
            if (curCity) {
                defaultParams.city_id = curCity;
            }
            defaultParams.session_id = WAT.getCookie('__guid__');
            if (user_number) {
                defaultParams.user_number = user_number;
            }
            defaultParams.role = $element.attr('role');
            defaultParams.time = time;

        });
    }

    /*function initAppXX() {
        // 清空掉某些长得像乱码的字符
        var remSpeFont = function(str) {
            if (typeof str == 'string') {
                return str.split('&#13;').join('');
            }
            return str;
        };
        var title = remSpeFont(store.get('s_title'));
        var url = store.get('s_url');
        var content = remSpeFont(store.get('s_content'));
        var img = store.get('s_img');
        if (url) {
            var shareObj = {
                url: url,
                content: content,
                title: title,
                img: img
            };
            shareConfig["share_pyq"] = {
                url: url,
                content: title,
                title: title,
                img: img
            };
            shareConfig["share_weixin"] =
                shareConfig["share_qq"] =
                shareConfig["share_qzone"] = shareObj;

            shareConfig["share_weibo"] = {
                url: url,
                content: ' @跟谁学 ' + title + url,
                title: title,
                img: img
            };

            shareConfig["share_sms"] = {
                url: url,
                content: title + url,
                title: title,
                img: img
            };
            shareConfig.content = shareConfig["share_weixin"].content;
            shareConfig.url = url;
            shareConfig.title = shareConfig["share_weixin"].title;
            shareConfig.img = img;

            setShare(shareConfig);
        }

    }*/

    /**
     * 告诉app现在的评论总数
     * @param {[type]} num [description]
     */
    function setAppCommentNum(num) {
        if (Number(num) !== num) {
            return;
        }
        Jockey.send('sendWebMessage', {
            comment_num: '' + num
        });
    }


    return function(page_data) {
        pageData = page_data;

        setAppCommentNum(store.get('total_comments'));
        m_article_number = store.get('news_id');

        // 发送收藏信息
        openCollection();

        // 如果在微信环境下，把nav-bar隐藏掉，modify by hanzh 08-08
        if (store.get('isWeixin')) {
            $('.nav-bar-main').find('.nav-bar').hide();
        }
        // 微需求：如果在app里面，把app上面的标题改为空，modify by hanzh 08-10
        if (store.get('isApp')) {
            document.title = '';
            appController.setPageTitle('');
        }
        // initImgs();

        // by caoying 注释于2015-11-28 改为调用新的分享接口
        // initAppXX();
        /*setShare(JSON.parse(store.get('share_info')));*/

        lazyLoadImage.init();
        // 点赞功能
        initRecommendBtn();
        // 举报功能
        initReport();
        // 初始化图片
        initImgMask();

        if (!appController.isApp()) {
            $('#load_more').show();
        }
        getRelativeInfo();


        /*评论功能 ---  start*/
        // 滚动到评论位置
        toCommentPosition();
        /*评论功能 ---  end*/
    }
});