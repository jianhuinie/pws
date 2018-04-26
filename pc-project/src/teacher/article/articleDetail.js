/**
 * @file 老师文章详情页
 * @author caoying
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var Popup = require('cobble/helper/Popup');
    var Select = require('cobble/form/Select');
    var service = require('common/service');
    var dateUtil = require('cobble/util/date');
    var timeUtil = require('cobble/util/time');
    var Tooltip = require('cobble/ui/Tooltip');
    var ClickMonitor = require('common/component/ClickMonitor');
    var LoginDialog = require('common/component/LoginDialog');
    var Editor = require('common/component/Editor');

    var content = $('.content');
    var articleSummary = content.find('.article-summary');
    var otherArticle =  content.find('.other-article');
    var articleContent = content.find('.article-content');
    var articleBase = content.find('.article-base');
    var thumbsUpImg = content.find('.thumbs-up-img')
    var commentDetail = content.find('.comment-detail');
    var commentCurrent = commentDetail.find('.comment-current');;
    var imgMore = articleBase.find('.img-more');
    var imgLess = articleBase.find('.img-less');

    // 全局变量的定义
    var userName = "";
    var replyCount = 0;
    var morePicture = false;
    var envMap = {
        dev: 'http://dev.genshuixue.com',
        test: 'http://test.genshuixue.com',
        beta: 'http://beta.genshuixue.com',
        www: 'http://www.genshuixue.com'
    };
    var env = store.get('env');
    var urlDomain = envMap[env] || envMap['www'];

    function moveCaretToEnd(el) {
        if (typeof el.selectionStart == "number") {
            el.selectionStart = el.selectionEnd = el.value.length;
        }
        else if (typeof el.createTextRange != "undefined") {
            el.focus();
            var range = el.createTextRange();
            range.collapse(false);
            range.select();
        }
    }
    //绘制评论列表
    var commentTpl = function(data) {
        var tpl = [];
        for (var i = 0; i < data.length; i++) {
            var comment = data[i]
            var commentId = comment.id;
            var name = comment.name;
            var avatar = comment.avatar;
            var url = comment.url;
            var content = comment.content;
            var create_time = comment.create_time;
            var support = comment.support;
            var can_support = comment.can_support;
            var can_delete = comment.can_delete;
            var supportcss = can_support == 1 ? 'cancel' : 'support';
            tpl.push(
                '<div class="detail" data-delete="',can_delete,'" data-cid="',commentId,'">'
                    ,'<div class="user-img">'
                        ,'<a href="',url,'" target="_blank">'
                            ,'<img src="',avatar,'@40w_40h_1c_1e">'
                        ,'</a>'
                    ,'</div>'
                    ,'<div class="user-content">'
                        ,'<div class="user">'
                            ,'<a href="',url,'" target="_blank" class="user-name">',name,'</a>'
                            ,'<span class="comment-time"> ',create_time,' </span>'
                            ,'<span class="on-delete">删除 </span>'
                            ,'<span class="on-report">举报 </span>'
                        ,'</div>'
                        ,'<div class="comment-reply">'
                            ,'<div class="comment-content">'
                                ,'<div class="content-detail">'
                                    ,content
                                ,'</div>'
                            ,'</div>'
                            ,'<div class="reply">'
                                ,'<div class="on-reply">'
                                    ,'<span class="reply-detail">'
                                        ,'<span class="answer">回复</span>&nbsp;|'
                                    ,'</span>'
                                    ,'<div class="on-thumbs-up">'
                                        ,'<i class="icon icon-thumbs-up ',supportcss,'"></i>'
                                        ,'<span class="count">',support,'</span>'
                                    ,'</div>'
                                ,'</div>'
                            ,'</div>'
                        ,'</div>'
                    ,'</div>'
                    ,'<hr class="current-line">'
                    ,'<div class="detail-comment-input">'
                        ,'<div class="user-img">'
                            ,'<a href="',url,'" target="_blank">'
                                ,'<img src="',avatar,'@40w_40h_1c_1e">'
                            ,'</a>'
                        ,'</div>'
                        ,'<div class="form-group" data-txt="回复',name,'：">'
                            ,'<div class="form-controls">'
                                ,'<div class="placeholder-wrapper">'
                                    ,'<textarea class="form-text" type="text" name="message" required></textarea>'
                                ,'</div>'
                                ,'<div class="form-hint"></div>'
                                ,'<span class="error"></span>'
                            ,'</div>'
                            ,'<div class="form-action" data-cid="',commentId,'">'
                                ,'<button class="btn-comment btn-small btn-info btn-replay">评论</button>'
                                ,'<button class="btn btn-default">取消</button>'
                            ,'</div>'
                        ,'</div>'
                        ,' <hr class="comment-line">'
                    ,' </div>'
                ,'</div>'
            );
        }
        return tpl.join('');
    };
    //获取评论列表
    var getComment = function(page) {
        service
        .getAritcleCommentNew({
            article_number: store.get('article_id'),
            next_cursor: page
        })
        .done(function(response) {
            if (response.code == 0) {
                var data = response.data.comments;
                var htmltxt = commentTpl(data);
                commentDetail.find('.detail-box').append(htmltxt);
                //如果还有评论就显示更多
                if (response.data.has_more == 1) {
                    commentDetail.find('.more-click').data('next',response.data.next_cursor).show();
                } else {
                    commentDetail.find('.comment-more').hide();
                }
            }
        });
    };
    exports.init = function () {
        var thumsUpFlag = store.get('thumsUpFlag');           // 当前用户是否点过赞
        var user = store.get('user');
        var isSelf = store.get('isSelf');
        var hasLogin = user.id;
        
        // 隐藏评论文章的textarea 输入框
        commentCurrent.find('.form-group').hide();
        commentCurrent.find('.comment-line').hide();

        commentDetail.find('.form-group').each(function(e){
            $(this).find('.form-hint').show();
            // 评论内容
            new Editor({
                element: $(this).find('.form-controls'),
                autoHint: 490,
                maxLength: 500
            });
        })

        // 如果非老师本人查看，则展示老师其他最多5篇文章
        if ( isSelf == 0 ){
            otherArticle.show();
            articleSummary.find('.article-button').hide();
            articleSummary.find('.power').hide();
        }
        else{
            otherArticle.hide();
            articleSummary.find('.article-button').show();
            articleSummary.find('.power').show();
             // 文章权限
            var selectPower = new Select({
                element: content.find('.power').find('.dropdown'),
                name: "articlePower",
                onChange : function(e, data){
                    if ( data.value != store.get('permission') ) {
                        // 将修改后的权限传递给后端接口
                        service
                        .getSetPermision({
                            articleId: store.get('article_id'),
                            permission: data.value
                        })
                        .done( function ( response ) {
                            if ( response.code == 0 )
                            {
                                success('权限修改成功！');
                                store.set('permission', data.value);
                            }
                        });
                    }
                }
            });

            selectPower.setValue(store.get('permission'));
        }

        if(store.get('is_exist') == 1) {
            // 文章存在，获取评论
            getComment(1);
        }

        // 初始化点击监听
        var clickMonitor = new ClickMonitor({
            monitorUrl: 'http://click.genshuixue.com/article',
            defaultParams: {
                city_id: store.get('cityId'),
                role: typeof user.type === undefined ? -1 : user.type,
                user_number: user.number || '',
                client_plat: 'pc',
                session_id: WAT.getCookie('__guid__') || '',
                channel_id: '',
            }
        });

        // 参数生成器
        clickMonitor.setInterceptor(function (ele) {

            var params = {};
            params.qid = ele.data('qid');
            params.article_number = ele.data('article-number');
            params.rank = ele.data('rank');
            params.search_form = ele.data('search-form');
            params.time = new Date().getTime();
            params.content_type = ele.data('content-type');
            return params;
        });


        content
        // 文章底部和右侧对文章点赞
        .on('click','.thumbs-up', function(e) {
            // 未登录事件的处理
            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(0);
                    }
                });
                return;
            }
            var valueId = 0;
            if (thumsUpFlag != 'support') {
                valueId = 1;
            } 
            service
            .getArticlethumbsUp({
                articleId: store.get('article_id'),
                valueId: valueId
            })
            .done(function(response) {
                if (response.data == 0) {
                    if (thumsUpFlag == 'support') {
                        thumsUpFlag = 'cancel';
                        content.find('.thumbs-up .icon-thumbs-up').removeClass('support')
                        var count = content.find('.thumbs-up .count');
                        var countnum = parseInt(count.html()) - 1;
                        if (countnum == 0) {
                            countnum = '赞';
                        }
                        count.html(countnum);
                        count.data('count',countnum);
                        count.data('tip','赞');
                        //移除文章底部对应的头像
                        content.find('.thumbs-up-img .thumbs-users').each( function(e) {
                            if ( $(this).data('uid') == store.get('user').id )
                            {
                                $(this).remove();
                            }
                        });

                    } else {
                        thumsUpFlag = 'support';
                        content.find('.thumbs-up .icon-thumbs-up').addClass('support')
                        var count = content.find('.thumbs-up .count');
                        var countnum = count.html();
                        if (countnum == '赞') {
                            countnum = 1;
                        } else {
                            countnum = parseInt(countnum) + 1;
                        }
                        count.html(countnum);
                        count.data('count',countnum);
                        count.data('tip','取消赞');
                        var userUrl = '';
                        if( store.get('user').type == 2 ) {
                            userUrl = urlDomain + '/x/'+ store.get('user').number;
                        } else {
                            userUrl = urlDomain + '/'+ store.get('user').number;
                        }
                        content.find('.thumbs-up-img').prepend(
                            '<div class="thumbs-users">'
                                +'<a data-title="'+ store.get('user').name +'赞过这篇文章" href="' + userUrl + '"><img src="' + store.get('user').avatar + '"></a>'
                                +'<span class="user_id">'+ store.get('user').id +'</span>'
                            +'<div>'
                        );
                        Tooltip.init( thumbsUpImg.find('[data-title]'));
                    }
                }
            });
        })

        articleSummary
        // 右侧评论按钮
        .on('click', '#comment', function(e) {
            commentCurrent.find('.form-text').focus();
        })

        // 编辑文章
        .on('click','#edit-article', function(e) {
            location.href = '/article/write?artid=' + store.get('article_id');
        })

        // 删除文章
        .on('click' , '#delete-article' , function(e) {
            // 未登录事件的处理
            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(0);
                    }
                });
                return;
            }
            else {
                var tpl = ''
                    + '<div>你确定要删除这篇文章吗？一旦删除将不可恢复</div>'
                    + '<div class="vcode-wrapper">'
                    +     '<div class="left-text">'
                    +           '<div>*请输入验证码：</div>'
                    +           '<div><input class="input-text" type="text" name="vcode"/></div>'
                    +           '<div class="error-tip"></div>'
                    +     '</div>'
                    +     '<div class="right-vcode" onclick="this.children[0].src = \'/captcha?captcha_name=delete_article&\' + new Date().getTime()">'
                    +           '<img src="/captcha?captcha_name=delete_article&' + new Date().getTime() + '" width="120px" height="50px"/>'
                    +     '</div>'
                    + '</div>';
                alert({
                    title: '温馨提示',
                    content: tpl,
                    disposeOnHide: true,
                    width: 400,
                    buttons: [
                        {
                            text: "确定",
                            type: 'primary',
                            handler: function () {
                                var vcode = $('.vcode-wrapper .input-text').val();
                                var that = this;
                                //调用后端Ajax删除文章的接口
                                service
                                .deleteArticle({
                                  articleId: store.get('article_id'),
                                  captcha:  vcode,
                                  captchaName: 'delete_article',
                                },
                                {
                                    110056: function(){
                                        that.element.find('.error-tip')
                                            .text('验证码错误')
                                            .css('visibility', 'visible');
                                        }
                                })
                                .done( function ( response ) {

                                    if ( response.code == 0 ){

                                        location.href = store.get('domain') + '/article';
                                    }
                                    else if (response.code != 110056) {
                                        that.hide();
                                    }

                                });
                            }
                        },
                        {
                            text: "取消",
                            handler: function () {
                                this.hide();
                            }
                        }
                     ]
                });
                e.preventDefault();
                return false;
            }

        })

        // 添加分享插件
        var sharePopup = new Popup({
            element: $('#share'),
            layer:  $('.group').find('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 20
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });

        var shareBasePopup = new Popup({
            element: $('#share-base'),
            layer:  $('.group-base').find('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 20
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });

        // 点赞照片提示框
        thumbsUpImg
        .on('mouseenter', 'a', function(e){
            Tooltip.init( $(this).find('[data-title]'));
        })

        // 鼠标hover到评论内容，出现删除和举报按钮
        commentDetail
        .on('mouseenter', '.detail', function(e){
            var deleteFlag = $(this).data('delete');
            if(deleteFlag) {
                $(this).find('.on-delete').show();
                $(this).find('.on-report').show();
            }
            else {
                $(this).find('.on-report').show();
            }
        })

        .on('mouseleave', '.detail', function(e){
            $(this).find('.on-delete').hide();
            $(this).find('.on-report').hide();
        })

        // 页面右侧 鼠标hover效果
        $('.group').hover( function(e){
            var groupId = $(this).attr('id');
            var count = $(this).find('.count');
            if ($(this).find('.icon-thumbs-up').length > 0) {
                if ( $(this).find('.icon-thumbs-up').hasClass('support')) {
                    count.data('tip','取消赞');
                } else {
                    count.data('tip','赞');
                }
            }
           count.html(count.data('tip'));

         },function(e){
            var count = $(this).find('.count');
            if ($(this).find('.icon-thumbs-up').length > 0 && count.data('count') == 0) {
                count.html('赞');
                return false;
            }
            count.html(count.data('count'));
        });
        // 查看点赞人员头像
        imgMore
        .on('click', 'a', function(e) {

            // 点击照片的查看更多，显示所有点果赞的用户头像
            articleBase.find('.img-more').hide();
            articleBase.find('.img-less').show();

            if ( !morePicture ){
                // 调用Ajax请求，显示更多照片
                service
                .getMorePicture({
                    article_id: store.get('article_id')
                })
                .done( function ( response ) {
                     if ( response.code === 0 ) {

                        morePicture = true;
                        var responseData = response.data;
                        var count = responseData.support_users.length ;
                        morePicture = responseData.tpl.supports;
                        if( count > 0 ){

                            articleBase.find('.thumbs-up-img').append( responseData.tpl.supports );
                        }

                     }

                });
            }
            else{
                articleBase.find('.thumbs-users:gt(9)').show();
            }
        })

        // 点击照片的查看更多，显示所有点果赞的用户头像
        imgLess
        .on('click', 'a', function(e) {
            articleBase.find('.img-more').show();
            articleBase.find('.img-less').hide();
            articleBase.find('.thumbs-users:gt(9)').hide();
        })

        // 文章举报
        articleContent
        .on('click', '.report', function(e) {
            // 未登录事件的处理
            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(0);
                    }
                });
                return;
            }
            else {
                alert({
                    title: '温馨提示',
                    content: '您确实要举报该篇文章么？',
                    buttons: [
                        {
                            text: "确定",
                            type: 'primary',
                            handler: function () {
                                this.hide();
                                service
                                .getArticleReport({

                                    articleId: store.get('article_id')
                                })
                                .done( function ( response ) {

                                    if ( response.code == 0 )
                                    {
                                        success('文章举报成功！');
                                    }

                                });
                            }
                        },
                        {
                            text: "取消",
                            handler: function () {
                                this.hide();
                            }
                        }
                     ]
                });
            }

        })

        // 文章评论部分
        // 回复评论页面输入框的变化
        commentDetail
        .on('click', '.reply-detail', function(e) {
            var userContent = $(this).closest('.user-content');
            var detail = userContent.closest('.detail');
            var user = userContent.find('.user');
            var commentInput = detail.find('.detail-comment-input');
            userName = user.find('.user-name');

            commentInput.show();
            detail.find('.current-line').hide();
            commentInput.find('.form-text').text('回复' + $.trim(userName.text()) +'：' );
            commentInput.find('.form-text').focus();
            moveCaretToEnd(commentInput.find('.form-text')[0]);
        })

        // 评论举报
        .on('click', '.on-report', function(e) {
            // 未登录事件的处理
            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(0);
                    }
                });
                return;
            }
            var commentId = $(this).parents('.detail').data('cid');
            alert({
                title: '温馨提示',
                content: '您确实要举报该条评论么？',
                buttons: [
                    {
                        text: "确定",
                        type: 'primary',
                        handler: function() {
                            this.hide();
                            service
                            .reportAritcleComment({
                                comment_id: commentId
                            })
                            .done(function(response) {
                                if (response.code == 0) {
                                    success('评论举报成功！');

                                }
                            });

                        }
                    },
                    {
                        text: "取消",
                        handler: function () {
                            this.hide();
                        }
                    }
                ]
            });
        })

        // 删除评论
        .on('click', '.on-delete', function(e) {
            // 未登录事件的处理
            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(0);
                    }
                });
                return;
            }
            var deleComment = $(this).parents('.detail');
            var commentId = deleComment.data('cid');
            alert({
                title: '温馨提示',
                content: '您确实要删除该条评论么？',
                buttons: [
                    {
                        text: "确定",
                        type: 'primary',
                        handler: function() {
                            this.hide();
                            service
                            .deleteAritcleComment({
                                comment_id: commentId
                            })
                            .done(function(response) {
                                if (response.code == 0) {
                                    deleComment.hide();
                                    var comCount = $('#comment .count');
                                    var count = parseInt(comCount.data('count')) - 1;
                                    if (count == 0) {
                                        count = '评论';
                                    }
                                    comCount.html(count);
                                }
                            });
                        }
                    },
                    {
                        text: "取消",
                        handler: function () {
                            this.hide();
                        }
                    }
                ]
            });
        })


        // 点击评论按钮
        .on('click', '.btn-comment', function(e) {
            // 未登录事件的处理
            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(0);
                    }
                });
                return
            }

            var parent = $(this).parents('.form-group');
            var content = parent.find('.form-text').val();
            var commentId = parent.find('.form-action').data('cid');
            var oldtxt = parent.data('txt');
            var isReplay = false;
            if (content == "" || content == oldtxt) {
                alert("您输入的评论内容为空，不允许进行评论！");
                return;
            }
            if (content.length > 500) {
                return false;
            }
            if ($(this).hasClass('btn-replay')) {
                isReplay = true;
            }
            var oldReg = new RegExp('^' + oldtxt);
            content = content.replace(oldReg,'');
            service
            .creatAritcleComment({
                article_number: store.get('article_id'),
                content: content,
                comment_id: commentId
            })
            .done(function(response) {
                if (response.code == 0) {
                    var data = [];
                    data.push(response.data.comment);
                    var htmltxt = commentTpl(data);
                    if (isReplay) {
                        parent.parents('.detail-comment-input').hide();
                        var content = parent.find('.form-text').val('');
                    } else {
                        parent.parents('.comment-current').find('.form-group-display').show()
                        parent.hide();
                    }
                    commentDetail.find('.detail-box').prepend(htmltxt);
                    //右侧文章评论数加1
                    var comCount = $('#comment .count');
                    var count = parseInt(comCount.data('count')) + 1;
                    comCount.html(count);
                    comCount.data('count',count);
                }
            });
        })

        // 点击取消按钮 页面变化
        .on('click', '.btn-default', function(e) {
            var detail = $(this).parents('.detail');
            detail.find('.detail-comment-input').hide();
            detail.find('.current-line').show();
        })

        // 评论点赞
        .on('click', '.on-thumbs-up', function(e) {
            // 未登录事件的处理
            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(0);
                    }
                });
                return
            }

            var parent = $(this).parents('.detail');
            var commentId = parent.data('cid');
            var $me = $(this);
            service
            .supportAritcleComment({
                comment_id: commentId
            })
            .done(function(response) {
                if (response.code == 0) {
                    var icon = $me.find('.icon-thumbs-up');
                    if (icon.hasClass('support')) {
                        icon.removeClass('support').addClass('cancel');
                        var count = parent.find('.on-thumbs-up .count')
                        count.html(parseInt(count.html()) - 1);
                    } else {
                        icon.removeClass('cancel').addClass('support');
                        var count = parent.find('.on-thumbs-up .count')
                        count.html(parseInt(count.html()) + 1);
                    }
                }
            });
        })

        // 当前文章评论框
        var inputCurrent = commentCurrent.find('.form-number-example');
        inputCurrent.focus( function(e){
            commentCurrent.find('.form-group-display').hide();
            commentCurrent.find('.current-line').hide();
            commentCurrent.find('.form-group').show();
            commentCurrent.find('.form-group').find('.form-text').focus();
            commentCurrent.find('.comment-line').show();
        });

        commentCurrent
        // 点击取消按钮
        .on('click', '.btn-default', function(e) {
            commentCurrent.find('.form-group').hide();
            commentCurrent.find('.comment-line').hide();
            commentCurrent.find('.form-group-display').show();
            commentCurrent.find('.current-line').show();
        })

        commentDetail
        .on('click' , '.more-click', function(e) {
            var next_cursor = $(this).data('next');
            getComment(next_cursor);
        })

    };

});