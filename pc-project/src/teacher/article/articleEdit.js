/**
 * @file 老师文章详情页
 * @author zengcheng, wangyujie
 */

define(function(require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    var ArticleCropDialog = require('common/component/ArticleCropDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var moment = require('moment');
    var CategoryEditor = require('../component/CategoryEditor');
    var TagInput = require('common/component/TagInput');
    var CoursePicker = require('../component/CoursePicker');

    var Select = require('cobble/form/Select');
    var Editor = require('common/component/Editor');
    var categoryEditor = new CategoryEditor();
    var articleTitleEditor;
    var editor;
    var coursePicker;
    var selectPower;
    var selectCategory;
    var user;
    var article;
    var categories;
    var tagInput;
    var isSave = false; //是否是保存操作

    var editorContent = $('#article-content');
    var articleProfile = $('#article-profile');
    var articleTitle = $('#article-title');
    var articleCover = $('#article-cover');
    var actions = $('#article-actions');
    var dropdownMenuList = articleProfile.find('.category').find('.dropdown-menu');

    //敏感词汇提示
    function wordSenceHandler(response) {
        var map = {
            'content': '文章内容',
            'tags': '文章标签',
            'title': '文章标题'
        };

        var errorMsg = response.data;
        var content = '您';
        var errorLimit = 0, showErrorLimit = 10;

        $.each(errorMsg, function (index, item) {
            if (item.length) {
                if (errorLimit < showErrorLimit) {
                    content += '<span class="sensitive">在<em>' + map[index] + '</em>中输入的内容包含';
                    $.each(item, function (i, j) {
                        if (errorLimit < showErrorLimit) {
                            errorLimit ++;
                            content += '“<em>' + j + '</em>”';
                        }
                    });
                    content += '；</span><br />';
                }
            }

        });

        content += '请删除后重新输入';

        alert({
            title: '温馨提示',
            content: content,
            width: 450,
            buttons: [
                {
                    text: '确定',
                    type: 'primary',
                    handler: function () {
                        this.hide();
                    }
                }
            ]
        });
    }

    // 获取文章信息
    function getArtilceInfo() {
        var trimWhite = /<p>(?:(?:<br\/>)|\s)*<\/p>/g;
        var articleBase = {
            title: $.trim(articleTitleEditor.getValue()),
            content: editor.getContent().replace(trimWhite, ''),
            permission: selectPower.getValue(),
            categoryId: selectCategory.getValue(),
            tags: tagInput.getValue(),
            subjectId: coursePicker.getValue()[2] || coursePicker.getValue()[0],
            top: $('#set-top').prop('checked') ? 1 : 0
        };
        return articleBase;
    }

    // 验证文章合法性
    function validateArticleInfo(article, callback) {
        var flag = true;
        var validateContent = function () {
            if (article.content) {
                if (editor.getContentTxt().length <= 120000) {
                    if (validateCourse()) {
                        callback && callback(article)
                    }
                } else {
                   return alert('文章内容过长', '温馨提示');
                }
            } else {
                return alert('未填写文章内容', '温馨提示');
            }
        };

        var validateCourse = function () {
            if (!article.subjectId) {
                alert('请选择科目', '温馨提示');
            }
            return !!article.subjectId;
        };

        if (!article.title) {
            confirm({
                title: '温馨提示',
                content: '您尚未填写文章标题，确认使用日期作为默认标题吗？'
            }).done(function () {
                article.title = moment().format('YYYY-MM-DD HH:mm:ss');
                articleTitleEditor.setValue(article.title);
                validateContent();
            });
        } else {
            if (article.title.length <= 100) {
                validateContent();
            }
            else {
                alert('文章标题不能超过100个字符', '温馨提示');
            }
        }
    }

    actions
    .on('click', '.btn-save-draft', function () { // 保存草稿
        var articleInfo = $.extend({}, getArtilceInfo());
        var that = this;
        $(that).prop('disabled', true);
        setTimeout(function () {
            $(that).prop('disabled', false);
        }, 2000);
        articleInfo.id = article.id || 0;
        articleInfo.isDraft = 1;
        articleInfo.cover = store.get('portrait');
        articleInfo.draftId = article.draftid || 0;
        validateArticleInfo(articleInfo, function (article) {
            service.saveArticle(article,
                {
                    errorHandler: {
                        '100061': wordSenceHandler
                    }
                }
            ).done(function (response) {
                if (response.code == 0) {
                    editor.execCommand('clearlocaldata');
                    isSave = true;
                    success('保存草稿成功');
                    window.location.href = '/' + user.number + '/article#draft';
                } else {
                    $(this).prop('disabled', false);
                }

            });
        });
    })

    .on('click', '.btn-cancel-edit', function () { // 取消
        window.location.reload();
    })

    .on('click', '.btn-save-publish', function () { // 发表文章
        if (!store.get('portrait')){
            alert('请上传文章封面~');
            return ;
        }
        var articleInfo = $.extend({}, getArtilceInfo());
        var that = this;
        $(that).prop('disabled', true);
        setTimeout(function () {
            $(that).prop('disabled', false);
        }, 2000);
        articleInfo.id = article.id || 0;
        articleInfo.cover = store.get('portrait');
        articleInfo.isDraft = 0;
        articleInfo.draftId = article.draftid || 0;
        validateArticleInfo(articleInfo, function (article) {

            service.saveArticle(article,
                {
                    errorHandler: {
                        '100061': wordSenceHandler
                    }
                }
            ).done(function (response) {
                if (response.code == 0) {
                    editor.execCommand('clearlocaldata');
                    isSave = true;
                    success('发表文章成功');
                    window.location.href = '/article/detail?id=' + response.data.article_id;
                } else {
                    $(that).prop('disabled', false);
                }
            });
        });
    });

    exports.init = function () {
        user = store.get('user') || {};
        article = store.get('article') || {};
        categories = store.get('categories') || [];

        //离开页面
        $(window).on("beforeunload", function (e) {

          if (!isSave) {
              var confirmationMessage = "确定离开页面，放弃当前进度";
              (e || window.event).returnValue = confirmationMessage;
              return confirmationMessage;
          }
        });

        // 文章标题
        articleTitleEditor = new Editor({
            element: articleTitle.find('.form-editor'),
            maxLength: 100,
            autoHint: 90,
            flexHeight: true
        });

        // 富文本编辑器
        editor = new UE.ui.Editor({
            initialFrameHeight: 510,
            maximumWords: 120000,
            autoHeightEnabled: false,
            initialStyle: 'body{color: #333;font-size: 14px;font-family: 微软雅黑; line-height: 24px;} img{max-width:100%;}'
        });

        // 文章权限
        selectPower = new Select({
            activeClass: 'selected',
            element: articleProfile.find('.power').find('.dropdown'),
            name: "articlePower",
            data: [
                    {text: "公开", value: "0"},
                    {text: "学生可见", value: "1"},
                    {text: "仅自己可见", value: "2"}
                  ],
            value: article.permission || "0"
        });

        // 文章分类
        selectCategory = new Select({
            activeClass: 'selected',
            element: articleProfile.find('.category').find('.dropdown'),
            name: "articleCategory",
            data: $.map(categories, function(item){
                        return {text: item.name, value: item.id};
                    }),
            value: article.category_id || "1"
        });

        //科目分类
        coursePicker = new CoursePicker({
            courses: [
                {
                    name: "category1",
                    selected: (article && article.subject && article.subject.category1 && article.subject.category1.id) || false,
                    element: $('#class-category .course-category:eq(0)').find('.dropdown')
                },
                {
                    name: "category2",
                    selected: (article && article.subject && article.subject.category2 && article.subject.category2.id) || false,
                    element: $('#class-category .course-category:eq(1)').find('.dropdown')
                },
                {
                    name: "category3",
                    selected: (article && article.subject && article.subject.category3 && article.subject.category3.id) || false,
                    element: $('#class-category .course-category:eq(2)').find('.dropdown')
                }
            ]
        });

        //文章tag
         tagInput = new TagInput({
            element: $('#article-tags').find('.article-tags'),
            max: 5,
            validate: function (text) {

                if (text.length > 10) {
                    alert('不能超过10个字', '温馨提示');
                    return false;
                }

                return /^[\w\u4e00-\u9fa5]+$/.test(text);
            }
        });
        //设置默认标签
        tagInput.setValue((article.tags && article.tags.join(',')) || '');

        // 新增分类
        selectCategory.element
        .on('click', '.category-new-btn', function (e) {

                var that = $(this);
                categoryEditor
                .edit($(this), {name: ''})
                .onsave(function (data) {

                    service
                    .addArticleCategory(data.name)
                    .done(function (response) {
                        if (response.code === 0) {
                            categories.push({
                                name: data.name,
                                id: response.data.id
                            });
                            $('<li data-value="' + response.data.id + '">' + data.name + '</li>').insertAfter(dropdownMenuList.find('li:eq(0)'));
                        }
                    });

                });

                e.stopPropagation();
                return false;
            }
        );

        editor.render(editorContent[0]);

        // 显示用户相关信息
        articleProfile.find('.img-wrapper').find('img')
            .attr('src', user.avatar);
        articleProfile.find('.article-info').find('.article-author')
            .text(user.name);
        // 初始化文章信息
        articleTitleEditor.setValue(article.title || '');
        editor.addListener('ready', function() {

            if (!article.content) {
                editor.execCommand('drafts');
            } else {
                // 初始化完成后显示文章类容
                editor.setContent(article.content || '');
            }
        });

        // 分类编辑器绑定所有的分类数组
        categoryEditor.setAllCategory(categories);

        // 返回文章列表或草稿url
        var href = $('#main .panel .panel-back a');
        href.attr('href', '/' + user.number + '/article' + (article.is_draft == 1 ? '#draft' : ''));

        articleCover
        .on('click', '.add-cover, .edit-cover', function(e){

            var dialog = new ArticleCropDialog({
                onUploadComplete: function (response) {

                    if (response.code === 0) {

                        this.hide();
                        var data = response.data;
                        var img = articleCover.find('img');
                        var cutImg = data.url + '@1e_220w_112h_1c_0i_1o_90Q_1x';
                        img.attr('src', cutImg);
                        articleCover.find('.frontcover').show();
                        articleCover.find('.add-cover').hide();
                        articleCover.find('.upload-tip').show();
                        store.set('portrait', data.url);
                        success('保存成功',function(){
                            $('.viewport-mask').remove();
                            $('.dialog-success').remove();
                        });
                    }
                }
            });
        })
    }
});
