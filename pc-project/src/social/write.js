define(function (require, exports) {

    var service = require('common/service');
    var store = require('common/store');
    var Editor = require('common/component/Editor');
    var editorPlugin = require('social/write/addCoursePlugin');
    var ModifyProfileLandingDialog = require('./common/ModifyProfileLandingDialog');

    var initUIEditor = function () {
        var contentContainer = $('#post-editor');
        var content = store.get('content');

        var editor = new UE.ui.Editor({
            focus: false,
            initialFrameHeight: 510,
            maximumWords: 10000,
            autoHeightEnabled: false,
            initialStyle: 'body{color: #333;font-size: 14px;font-family: 微软雅黑; line-height: 24px;} img{max-width:100%;}'
        });

        editor.render(contentContainer[0]);

        editor.addListener('ready', function() {
            if (!content) {
                editor.execCommand('drafts');
            } else {
                editor.setContent(content || '');
            }
        });

        var getContent = function () {
            return $.trim(editor.getContent());
        };

        var getPureContent = function () {
            return $.trim(editor.getContentTxt());
        };

        var clearDrafts = function () {
            editor.execCommand('clearlocaldata');
        };

        return {
            editor: editor,
            getContent: getContent,
            getPureContent: getPureContent,
            clearDrafts: clearDrafts
        }
    };

    var initTitleEditor = function () {
        var titleContainer = $('#post-title-editor');

        var editor = new Editor({
            element: titleContainer.find('.form-editor'),
            maxLength: 100,
            autoHint: 10,
            flexHeight: false
        });

        var getContent = function () {
            return $.trim(editor.getValue());
        };

        return {
            editor: editor,
            getContent: getContent
        };
    };


    var initValidate = function () {

        var validate = function (post) {
            var flag = true;
            if (post) {
                if (!post.name) {
                    flag = false;
                    alert('请输入帖子标题', '温馨提示');
                }
                else if (!post.content) {
                    flag = false;
                    alert('请输入帖子内容', '温馨提示');
                }
                else if (post.name.length > 100) {
                    flag = false;
                    alert('帖子标题不能超过100个字符', '温馨提示');
                } else if (post.pureContent.length > 30000) {
                    flag = false;
                    alert('帖子内容不能超过30000个字符', '温馨提示')
                }
            } else {
                flag = false;
            }
            return flag;
        };

        return {
            validate: validate
        };
    };

    exports.init = function () {

        var contentEditor = initUIEditor();
        var titleEditor = initTitleEditor();
        var validator = initValidate();
        var courseCard = $('#course-card');

        var errorHandler = {
            '800053': function () {
                new ModifyProfileLandingDialog({
                    tpl: 'duply-nickname'
                });
            },
            '800054': function () {
                new ModifyProfileLandingDialog({
                    tpl: 'no-nickname'
                });
            },
            '800055': function () {
                new ModifyProfileLandingDialog({
                    tpl: 'no-avatar'
                });
            }
        };

        $('.post-action')
        .on('click', '.post-btn', function () { // 发表帖子
            var target = $(this).prop('disabled', true);
            setTimeout(function () { target.prop('disabled', false);}, 3000);

            // 课程类型 - 是否含课程卡片
            var courseCardClass = courseCard.find('.course-card');
            var threadType;
            if (courseCardClass.length >= 1) {
                threadType = 3;
            } else {
                threadType = 1;
            }

            // 课程卡片信息组
            var aCourseCard = [];
            courseCardClass
            .each(function (index, item) {
                var temb = {
                    course_number: $(item).data('coursenum'),
                    course_type: $(item).data('coursetype')
                };
                aCourseCard.push(temb);
            });

            var post = {
                pureContent: contentEditor.getPureContent(),
                content: contentEditor.getContent(),
                name: titleEditor.getContent(),
                groupId: store.get('groupId'),
                threadId: store.get('threadId'),
                threadType: threadType,
                courseCard: JSON.stringify(aCourseCard)

            };

            if (validator.validate(post)) {
                var action = 'saveThread';
                if (post.threadId) {
                    action = 'modifyThread';
                }
                service[action](post, errorHandler)
                .done(function (response) {
                    target.prop('disabled', false);
                    if (!response.code) {
                        contentEditor.clearDrafts();
                        success('发帖成功');
                        window.location.href = '/forum/postBrowse/' + response.data.id;
                    }
                });
            }
        })
        .on('click', '.cancel-btn', function () {
            window.location.href = '/forum/threadBrowse/' + store.get('groupId');
        });

        $('#post-title-editor').find('.form-text').focus();

        // 添加课程卡片
        editorPlugin.init();
        courseCard
        .on('click', '.del-course-card', function (e) { // 删除课程卡片
            var target = $(e.currentTarget);
            courseCard.html('').hide();
        })
        .on('click', '.re-course-card', function (e) { // 重新插入卡片
            $('.edui-for-dialogbuttondialog .edui-default').trigger('click');
        });


    }
});