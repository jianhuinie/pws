/**
 * "
 * "
 */
define(function (require, exports) {

    'use strict';

    var LoginDialog = require('common/component/LoginDialog');
    var ApplyTutorDialog = require('common/component/ApplyTutorDialog');

    var store = require('common/store');
    var service = require('common/service');
    var Validator = require('cobble/form/Validator');

    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var compressImage = require('common/function/compressImage');
    var Popup = require('cobble/helper/Popup');
    var VideoDialog = require('common/component/VideoDialog');

    var tutorInfo =
    [
        {
            "name": "胡小玲",
            "school": "华中师范大学",
            "brief": "《最强大脑》汉字女英雄、世界记忆大师",
            "blog": "http://genshuixue.com/877534278",
            "avatar": "http://img.gsxservice.com/190368_kb6v4m4d.jpeg"
        },
        {
            "name": "肖宝清",
            "school": "武汉大学",
            "brief": "5年家教辅导经验，跟谁学1月学生数榜第一名",
            "blog": "http://genshuixue.com/xiaobaoqing",
            "avatar": "http://img.gsxservice.com/183771_8byt26ed.jpeg"
        },
        {
            "name": "徐雕",
            "school": "武汉大学",
            "brief": "武汉大学新生奖学金、高考数学145分",
            "blog": "http://genshuixue.com/876795048",
            "avatar": "http://img.gsxservice.com/58058_3t23tfxf.png"
        },
        {
            "name": "金凤娟",
            "school": "华中师范大学",
            "brief": "1年家教经验，高考理综270分",
            "blog": "http://genshuixue.com/541556908",
            "avatar": "http://img.gsxservice.com/113416_02iqkpaj.jpeg"
        },
        {
            "name": "余存哲",
            "school": "湖北大学",
            "brief": "自制55讲文理科高中数学的补课系统，高考数学135分",
            "blog": "http://genshuixue.com/gaozhongshuxue007",
            "avatar": "http://img.gsxservice.com/144373_5hx4hm8v.jpeg"
        },
        {
            "name": "刘纯量",
            "school": "华中科技大学",
            "brief": "高分考上北京大学研究生，专业排名第一",
            "blog": "http://genshuixue.com/918934738",
            "avatar": "http://img.gsxservice.com/159368_j8x4cusb.jpeg"
        },
        {
            "name": "张文锐",
            "school": "华中师范大学",
            "brief": "省高中数学竞赛一等奖，高考英语131分",
            "blog": "http://genshuixue.com/500104268",
            "avatar": "http://img.gsxservice.com/114676_4ukk7826.png"
        },
        {
            "name": "刘畅",
            "school": "华中科技大学",
            "brief": "热爱教学，高考英语单科140分",
            "blog": "http://genshuixue.com/lc153324",
            "avatar": "http://img.gsxservice.com/58336_l3cgah34.jpeg"
        },
        {
            "name": "谭舒心",
            "school": "华中师范大学",
            "brief": "汉语言文学专业，3年家教经验",
            "blog": "http://genshuixue.com/667284828",
            "avatar": "http://img.gsxservice.com/168804_ci250t4o.jpeg"
        },
        {
            "name": "李露",
            "school": "湖北省第二师范学院",
            "brief": "5年家教经验，高分考上华中师范大学研究生",
            "blog": "http://genshuixue.com/497585558",
            "avatar": "http://img.gsxservice.com/173142_ob7t795a.jpeg"
        },
        {
            "name": "徐晓宇",
            "school": "武汉大学",
            "brief": "湖北理科高考成绩641，生物竞赛省级一等奖",
            "blog": "http://genshuixue.com/667920508",
            "avatar": "http://img.gsxservice.com/181509_5usog1mg.jpeg"
        }
    ]

    exports.init = function() {
        $('.video-content').click(function(){

                    new VideoDialog({
                        url: 'http://www.genshuixue.com/video/view/2252',
                        title: '免费家教活动（武汉）'
                    });

        });

        var container = $('#main');

        var tutorInfoHtml = '';
        for (var i = 0; i < tutorInfo.length; i++) {
            if (i % 4 === 0) {
                tutorInfoHtml += '<div class="tutor-row">';
            }


            var avatarUrl = compressImage({
                                            url: tutorInfo[i].avatar,
                                            width: 120,
                                            height: 120
                                        });

            tutorInfoHtml += '<a target="_blank" class="tutor-info" href="'+tutorInfo[i].blog+'">'
                           + '<div class="floor-teacher-mask">'
                           + '</div>'
                           + '<img class="circle-avatar" src="'+avatarUrl+'">'
                           + '<p class="teacher-name">'
                           + tutorInfo[i].name
                           + '</p>'
                           + '<p class="teacher-school">'
                           + tutorInfo[i].school
                           + '</p>'
                           + '<p class="teacher-desc">'
                           + tutorInfo[i].brief
                           + '</p>'
                           + '</a>';
            if (i % 4 === 3) {
                tutorInfoHtml += '</div>';
            }
        }

        tutorInfoHtml += '<a class="tutor-info tutor-info-last">'
                       + '<img class="circle-avatar" src="'+compressImage({
                                            url: 'http://img.gsxservice.com/0cms/d/file/content/2015/03/54fa778ded9ef.png',
                                            width: 120,
                                            height: 120
                                        })+'">'
                       + '<div class="rowline"></div>'
                       + '<div class="rowline"></div>'
                       + '<p class="more-tutor">'
                       + '更多家教 敬请期待'
                       + '</p>'
                       + '</a>'
                       + '</div>';

        container.find('.tutor-list').html(tutorInfoHtml);

        container
        .on('click', '.apply-button', function (e) {

            var user = store.get('user');

            var hasLogin = user.id;

            // user.type = 2;
            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                    }
                });
                return;
            }
            else if (user.type === 0) {
                new SwitchRoleDialog({
                    createText: '抱歉，本活动只针对学生开放，需要开通学生身份吗？',
                    switchText: '抱歉，本活动只针对学生开放，需要切换学生身份吗？',
                    switchTo: 'student',
                    onSuccess: function (data) {
                        location.reload();
                    }
                });
                return;
            }

            new ApplyTutorDialog();

            var appForm = $('.apply-tutor-form');

            var validator = new Validator({
                realtime: true,
                element: appForm,
                fields: {
                    name: {
                        errors: {
                            required: '请输入用户名',
                            pattern: '名字格式：一至五个中文字'
                        }
                    },
                    mobile: {
                        errors: {
                            required: '请输入联系方式',
                            pattern: '请输入正确的手机号码'
                        }
                    },
                    qq: {
                        errors: {
                            pattern: '请输入正确的QQ号码'
                        }
                    },
                    address: {
                        errors: {
                            required: '请输入家庭地址',
                            pattern: '地址信息至少10个字'
                        }
                    },
                    grade: {
                        errors: {
                            required: '请输入孩子年级'
                        }
                    },
                    otherneed: {
                        errors: {
                            pattern: '学生状况及家教要求不得低于15字，不高于300字'
                        }
                    }
                }
                // ,
                // onAfterValidate: function (e, data) {
                //     if (data.errors.length > 0) {
                //         error(data.errors[0].error);
                //     }
                // }
            });

            appForm.on('click', '.submit', function (e) {

                var subject = appForm.find('.form-controls [name="math"]')[0].checked ? 'math,':'';
                    subject += appForm.find('.form-controls [name="chinese"]')[0].checked ? 'chinese,':'';
                    subject += appForm.find('.form-controls [name="english"]')[0].checked ? 'english,':'';
                    subject += appForm.find('.form-controls [name="physics"]')[0].checked ? 'physics,':'';
                    subject += appForm.find('.form-controls [name="chemistry"]')[0].checked ? 'chemistry,':'';
                    subject += appForm.find('.form-controls [name="biology"]')[0].checked ? 'biology,':'';
                    subject += appForm.find('.form-controls [name="geography"]')[0].checked ? 'geography,':'';

                subject = subject.substring(0,subject.length - 1);

                var applyData = {
                    name: appForm.find('.parent-name').val(),
                    telephone: appForm.find('.tel').val(),
                    qq: appForm.find('.QQ-no').val(),
                    address: appForm.find('.home-address').val(),
                    grade: appForm.find('.child-grade').val(),
                    subject: subject,
                    other: $.trim(appForm.find('.other-need').val())
                }

                var isValid = validator.validate();

                if (isValid) {
                    var isSelected = subject.split(',');

                    if (subject == "") {
                        error('请至少填写一项辅导科目');
                        isValid = 0;
                    }
                    else if (isSelected.length > 2) {
                        error('最多选择两项辅导科目');
                        isValid = 0;
                    }
                    if (isValid) {
                        appForm.find('.submit').attr('disabled','disabled');
                        service.
                        applyFreeTutor(
                            applyData
                            )
                        .done(function (response) {
                            appForm.find('.submit').removeAttr("disabled");
                            if (response.code === 0) {
                                var responseData = response.data;

                                success(responseData, function () {
                                    location.reload();
                                });
                            }
                            else {
                                // error(response.data);
                            }
                        });
                    }
                }

            });

        });

        var popup = new Popup({
            element: container.find('.share-area'),
            layer: container.find('.baidu-share'),
            show: {
                trigger: 'click'
            },
            hide: {
                trigger: 'click'
            }
        });
    };

});