/*
 * @file 老师文章列表
 * @author wuhongjie
 */

define(function (require, exports) {

    'use strict';

    var CategoryEditor = require('teacher/component/CategoryEditor');
    var service = require('common/service');
    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');
    var header = require('./header');
    var cookie = require('cobble/util/cookie');

    var categoryList = $('#category-list');
    var articleList = $('#article-list-wrapper');
    var draftList = $('#draft-list-wrapper');
    var articleStores = $('#teacher-article .article-store-list');
    var btnWriter = $('#content');
    var categoryEditor = new CategoryEditor();

    categoryList
        //草稿点击分类
        .on('click', '.href-link', function (e) {
            var type = articleStores.find('.article-store-label.active').data('type');
            if (type == 2) {
                var item = $(this).parents('.category-item');
                var categoryId = item.data('id');
                item.addClass('active').siblings().removeClass('active');
                loadDraftList({categoryId: categoryId});
                return false;
            }
        })
        //分类重命名
        .on('click', '.icon-rename', function (e) {
            var editorHolder = $(this).parents('.category-item');
            var category = categoryEditor.getId(editorHolder.data('id'));
            categoryEditor
                .edit(editorHolder, category)
                .onsave(function (data) {
                    service.updateArticleCategory(data)
                        .done(function (response) {
                            if (response.code == 0) {
                                success('分类重命名成功')
                                category.name = data.name;
                                editorHolder.find('.category-name')
                                    .attr('title', data.name)
                                    .text(data.name.substring(0, 10));
                            } else {
                                error('分类重命名失败');
                            }
                        });
                });
            e.stopPropagation();
            return false;
        })
        //删除当前分类
        .on('click', '.icon-recycle-bin', function (e) {
            var editorHolder = $(this).parents('.category-item');
            var categoryId = editorHolder.data('id');
            confirm('删除分类后，该分类下的文章将自动归类到默认分类下，确认删除该分类吗？', '温馨提示')
                .done(function () {
                    service.deleteArticleCategory(categoryId)
                        .done(function (response) {
                            if (response.code == 0) {
                                success('删除分类成功')
                                location.href = '?page=1';
                            }
                        });
                });
            e.stopPropagation();
            return false;
        })
        //新建分类
        .on('click', '.category-new', function () {
            var editorHolder = $(this);
            if (!editorHolder.hasClass('editing')) {
                editorHolder.addClass('editing');
                categoryEditor
                    .edit(editorHolder, {name: ''})
                    .onsave(function (data) {
                        editorHolder.removeClass('editing');
                        service.addArticleCategory(data.name)
                            .done(function (response) {
                                if (response.code == 0) {
                                    success('新建分类成功');
                                    data.id = response.data.id;
                                    //更新分类的列表
                                    categoryEditor.categoryList.push(
                                        {
                                            id: data.id,
                                            name: data.name
                                        }
                                    );
                                    updateCategoryListUI(data);
                                }
                            });
                    })
                    .oncancel(function () {
                        editorHolder.removeClass('editing');
                    });
            }
            return false;
        })
        //查看/收起更多分类
        .on('click', '.category-more', function () {
            var listWrapper = categoryList.find('.category-list');
            var isShowAll = listWrapper.hasClass('first-four-category') ? false : true;
            var actionText = $(this).find('.action-text');
            if (isShowAll) {
                setTimeout(function () {
                    actionText.text('更多分类');
                }, 0);
                listWrapper.removeClass('all-category').addClass('first-four-category');
            } else {
                setTimeout(function () {
                    actionText.text('收起分类');
                }, 0);
                listWrapper.removeClass('first-four-category').addClass('all-category');
            }
        });


    articleStores
        //草稿和文章之间切换
        .on('click', '.article-store-label', function () {
            var currentTab = $(this);
            var listWrapper = categoryList.find('.category-list');
            var type = currentTab.data('type');
            if (!currentTab.hasClass('active')){
                currentTab.siblings().removeClass('active');
                currentTab.addClass('active');
                loadCategoryList({isDraft: (type == 1 ? 0 : 1) });
                if ( type == 1 ){
                    draftList.hide();
                    articleList.show();
                    listWrapper.removeClass('disabled-editable');
                } else {
                    loadDraftList();
                    articleList.hide();
                    draftList.show();
                    listWrapper.addClass('disabled-editable');
                }
            }
        });

    //写文章
    btnWriter
        .on('click', '.btn-writer', function () {
            var article = store.get('article') || {};
            // 老师是否生效
            if (article.is_valid == 1) {
                confirm({
                    title: '温馨提示',
                    content: '<p>未生效老师无法发布文章。</p>'
                    +        '<p>赶快填写认证资料，成为生效老师即可使用更多免费功能！</p>',
                    buttons: [{
                        text: '取消',
                        type: 'default',
                        handler: function () {
                            this.hide();
                        }
                    }, {
                        text: '去生效',
                        type: 'primary',
                        handler: function () {
                            this.hide();
                            window.open('/teacher_center/profile', '_blank');
                        }
                    }]
                });
            } else if (cookie.get('firstClick') == null) {
                // 第一次点击文章管理通知，判断是否第一次点击
                cookie.set('firstClick', true);
                confirm({
                    title: '文章管理迁移至“学习头条”通知',
                    width: 600,
                    content: '<div class="study-head">'
                    +        '<p>老师您好，</p>'
                    +        '<p>跟谁学文章管理功能已迁移至“学习头条”管理后台。此后，您可以登录学习头条后台对您的文章进行编辑、发布等操作。</p>'
                    +        '<p>学习头条自媒体平台作为跟谁学旗下产品，将全面连接其大数据，云视频等基础服务功能，致力于为您提供更好的原创内容生产发布平台，提升您的知名度。在这里，你可以通过创作，分享，完成教育资讯在多平台的扩散、传播，以更好地建立您与家长学生的接触机会，带来粉丝的沉淀与转化。</p>'
                    +        '<span style="color: #fd9827">跟谁学将全力保护您的私密信息安全！</span>'
                    +        '</div>',
                    buttons: [{
                        text: '取消',
                        type: 'default',
                        handler: function () {
                            this.hide();
                        }
                    }, {
                        text: '继续',
                        type: 'primary',
                        handler: function () {
                            this.hide();
                            window.open(article.admin_url, '_blank');
                        }
                    }]
                });
            } else {
                window.open(article.admin_url, '_blank');
            }
        });

    articleList
        //点击文章跳转
        .on('click', '.article', function () {
            var url = $(this).data('url');
            window.open(url, '_blank');
        })
        //编辑
        .on('click', '.operation-edit', function (e) {
            var id = $(this).parents('.article').data('id');
            window.open('/article/write?artid=' + id, '_blank');
            e.stopPropagation();
            return false;
        })
        //删除
        .on('click', '.operation-del', function (e) {
            var articleId = $(this).parents('.article').data('id');
            var tpl = ''
                + '<div>你确定要删除这篇文章吗？一旦删除将不可恢复</div>'
                + '<div class="vcode-wrapper">'
                +     '<div class="left-text">'
                +           '<div>*请输入验证码：</div>'
                +           '<div><input class="input-text" type="text" name="vcode"/></div>'
                +           '<div class="error-tip"></div>'
                +     '</div>'
                +     '<div class="right-vcode" onclick="this.children[0].src = \'/captcha?\' + new Date().getTime()">'
                +           '<img src="/captcha?' + new Date().getTime() + '" width="120px" height="50px"/>'
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
                            service.deleteArticle({
                                articleId: articleId,
                                captcha: vcode
                            }, {
                                110056: function(){
                                    that.element.find('.error-tip')
                                        .text('验证码错误')
                                        .css('visibility', 'visible');
                                }
                            })
                                .done(function(response){
                                    if (response.code == 0) {
                                        var categoryId = categoryList.find('.category-item.active').data('id') || 0;
                                        //清空hash
                                        window.location.hash = '';
                                        location.reload();
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
        });

    draftList
        //点击操作跳转到编辑页
        .on('click', '.article', function () {
            var id = $(this).data('id');
            window.open('/article/write?draftid=' + id, '_blank');
        })
        //编辑草稿
        .on('click', '.operation-edit', function (e) {
            var id = $(this).parents('.article').data('id');
            window.open('/article/write?draftid=' + id, '_blank');
            e.stopPropagation();
            return false;
        })
        //删除草稿
        .on('click', '.operation-del', function (e) {
            var articleId = $(this).parents('.article').data('id');
            var $drafCount = $('#draf-count');
            var count = $drafCount.data('count');
            confirm(
                '确定删除该篇草稿？',
                '温馨提示'
            ).done(function () {
                    service.deleteDraft(articleId)
                        .done(function (response) {
                            if (response.code == 0) {
                                var categoryId = categoryList.find('.category-item.active').data('id') || 0;
                                loadDraftList({categoryId: categoryId});

                                // 草稿数据-1
                                count = count - 1;
                                $drafCount.data('count', count);
                                $drafCount.text('草稿箱(' + count + ')');
                            } else {
                                error('删除草稿失败');
                            }
                        });
                });
            e.preventDefault();
            return false;
        })
        //草稿翻页
        .on('click', 'span[data-page]', function () {
            var page = $(this).data('page');
            if (!page) return false;
            var categoryId = categoryList.find('.category-item.active').data('id') || 0;
            loadDraftList({
                cp: page,
                categoryId: categoryId
            });
        });

    //load草稿列表
    var loadDraftList = function (data) {
        var number = store.get('teacherNum');
        data = $.extend({cp: 1, categoryId: 0, number: number}, data);
        service.getArticleDraftList(data).done(function (response) {
            draftList.html(response.data.tpl.draft_list);
        });
    };

    //load文章分类列表
    var loadCategoryList = function (data, cb) {
        var number = store.get('teacherNum');
        var allCategoryName;
        data = $.extend({isDraft: 0, number: number}, data);
        service.getArticleCategoryList(data).done(function (response) {
            categoryEditor.setAllCategory(response.data.category_list);
            categoryList.html(response.data.tpl.category_list);
            allCategoryName = categoryList.find('.category-list .category-item:eq(0) .category-name');
            if (data.isDraft == 1) {
                allCategoryName.text('全部草稿');
                categoryList.find('.category-list').addClass('disabled-editable');
            } else {
                allCategoryName.text('全部文章');
            }
            //渲染完成后回调
            cb && cb()
        });
    };

    //新增分类后更新UI
    var updateCategoryListUI = function (data) {
        //更新列表的html
        $(''
                + '<li class="category-item" data-id="' + data.id + '">'
                +     '<a class="href-link" href="?cid=' + data.id + '&page=1">'
                +           '<span class="category-name" title="' + data.name + '">' + (data.name.length > 10 ? (data.name.substring(0, 10) + '...') : data.name) + '</span>'
                +           '<span class="category-item-actions">'
                +                '<i class="icon icon-rename"></i>'
                +                '<i class="icon icon-recycle-bin"></i>'
                +           '</span>'
                +           '<span class="cate-article-num">0</span>'
                +     '</a>'
                + '</li>'
        ).insertAfter(categoryList.find('.category-list .category-item:eq(1)'));
        if (categoryEditor.categoryList.length > 100) {
            alert('您的文章分类已达到上限100', '温馨提示');
            categoryList.find('.category-list .category-item.category-new').remove();
        }
        if (categoryEditor.categoryList.length == 5) {
            //显示查看更多按钮
            categoryList.find('.category-list')
                .append($('<li class="category-item category-more"><span class="action-text">展开更多</span><i class="icon icon-angle-down"></i><i class="icon icon-angle-up"></i></li>'));
        }
        if (categoryEditor.categoryList.length >= 5) {
            //第4个分类之后修改为隐藏状态
            categoryList.find('.category-list .category-item:eq(5)')
                .addClass('more-category-item');
        }
    };

    exports.init = function () {
        var isDraft = 0;

        if(store.get('initHeader')){
            header.init();
        }
        //跳转到草稿列表
        if (window.location.hash == '#draft') {
            isDraft = 1;
            articleStores.find('.article-store-label[data-type=2]').trigger('click');
            return;
        }

        //如果当前分类的索引比较大 则默认暂开全部分类
        var categoryId = categoryList.find('.category-list').find('.category-item.active').data('id');
        //加载分类列表
        loadCategoryList({isDraft: isDraft}, function() {
            categoryList.find('.category-list').find('.category-item[data-id=' + categoryId + ']').addClass('active')
                .siblings().removeClass('active');
            if (categoryList.find('.category-list').find('.more-category-item.active').length > 0) {
                categoryList.find('.category-list').find('.category-item.category-more').trigger('click');
            }
        });
    };
});