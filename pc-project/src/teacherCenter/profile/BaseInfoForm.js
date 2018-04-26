/**
 * @file 基本信息表单
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var form = require('common/form');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var store = require('common/store');
    var Select = require('cobble/form/Select');
    var DateSelect = require('common/component/DateSelect');
    var Text = require('cobble/form/Text');
    var compressImage = require('common/function/compressImage');
    var Validator = require('cobble/form/Validator');
    var AccessRegion = require('./AccessRegion');
    var AvatarCropDialog = require('common/component/AvatarCropDialog');
    var DefaultAvatarDialog = require('common/component/DefaultAvatarDialog');
    var Editor = require('common/component/Editor');
    var Dialog = require('cobble/ui/Dialog');
    // 添加一个耦合性代码，待升级到模块化之后，此问题解决
    var sidebar = require('./sidebar');

    // 个人主页地址错误提示，优先判断位数，后判断格式
    Validator.type.text = [
        'required', 'minlength', 'maxlength', 'pattern', 'min', 'max'
    ];

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {string} options.realname 真实姓名
     * @property {string} options.sex 性别
     * @property {string} options.nickname 昵称
     * @property {string} options.short_introduce 一句话简介
     * @property {string} options.year 出生年
     * @property {string} options.month 出生月
     * @property {string} options.date 出生日
     * @property {string} options.eduBack 最高学历
     * @property {string} options.school 毕业院校
     * @property {string} options.major 专业
     * @property {string} options.category 身份
     * @property {string} options.regions 可上门授课范围
     * @property {string} options.private_domain 个人主页地址
     *
     */
    function BaseInfoForm(options) {
        $.extend(this, options);
        this.init();
    }

    function selectDefaultAvatar(callback) {

        var dialog = new DefaultAvatarDialog({
            element: $('body'),
            type: $(':radio[name="sex"]:checked').val(),
            avatar: store.get('defAvatar')
        });

        dialog.onSelectdefaultavatar = function (event, data) {
            service.changeDefaultAvatar({
                avatar: data.avatarName
            }).done(function (response) {
                if (response.code === 0) {
                    success('保存成功', function () {
                        $('#content').find('.image-preview img').attr('src', data.avatarPath);
                        store.set('defAvatar', data.avatarName);
                        dialog.hide();
                        if ($.isFunction(callback)) {
                            callback();
                        }
                        sidebar.updateAvatar(data.avatarPath);
                    });
                }
            });
        };
    }

    // 年月日数据
    var birthday;
    var year;
    var month;
    var date;

    BaseInfoForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            var data = me.data;
            if (!data) {
                data = me.data = { };
            }

            me.editor = new Editor({
                element: element.find('.form-editor'),
                maxLength: 20
            });

            me.introduceEditor = new Editor({
                element: element.find('.introduce-editor'),
                maxLength: 200
            })

            // 年月日数据
            birthday = data.birthday;

            if (birthday) {
                var parts = birthday.split('-');
                year = parseInt(parts[0], 10);
                month = parseInt(parts[1], 10);
                date = parseInt(parts[2], 10);
            }

            me.dateSelect = new DateSelect({
                element: element.find('.birthday'),
                year: year,
                month: month,
                date: date
            });

            // 课程设置 - 授课方式
            me.lessonWay = data.lesson_way;

            // 隐藏模式
            me.privateShow = data.private_show;

            // 使用头像裁剪，不需要 file 元素
            element.find('.image-browse :file').remove();

            // 教育背景
            me.eduBackSelect = new Select({
                element: $('.edu-back'),
                defaultText: '- 最高学历 -',
                name: 'edu_back'
            });

            me.accessRegion = new AccessRegion({
                element: element.find('.access-region'),
                data: data.regions
            });

            // 验证对象
            me.validator = new Validator({
                element: element,
                realtime: true,
                fields: {
                    realname: {
                        errors: {
                            minlength: '请将字数控制在2-40个字以内',
                            maxlength: '请将字数控制在2-40个字以内',
                            pattern: '支持中文、字母、空格和点号（大小点）'
                        }
                    },
                    nickname: {
                        errors: {
                            maxlength: '请将字数控制在 10 个字以内',
                            pattern: '昵称不能全是数字'
                        }
                    },
                    short_introduce: {
                        rules: {
                            maxlength: 20
                        },
                        errors: {
                            maxlength: '请将字数控制在20个字以内'
                        }
                    },
                    introduce: {
                        rules: {
                            maxlength: 200
                        },
                        errors: {
                            maxlength: '请将字数控制在200个字以内'
                        }
                    },
                    private_domain: {
                        errors: {
                            required: '个人主页地址不能为空',
                            minlength: '请使用大于6位字符的个人主页地址',
                            maxlength: '请使用小于30位字符的个人主页地址',
                            pattern: '请使用6-30位的数字及字母，不支持纯数字'
                        }
                    }
                }
            });

            var imageBrowse = element.find('.image-browse');

            // 开启隐藏真实头像状态且真实头像审核通过
            if (data.audits.avatar && data.audits.avatar.verify_status == '1' && (data.private_show & 2)) {
                imageBrowse.removeClass('image-browse').addClass('default-browse').find('strong').text('更换默认头像');
            }

            element
            .on('click', '.image-browse', function (e) {

                var dialog = new AvatarCropDialog({
                    onUploadComplete: function (response) {

                        if (response.code === 0) {

                            var data = response.data;

                            service
                            .saveAvatar({
                                id: data.id,
                                userType: store.get('user').type
                            })
                            .done(function (response) {

                                if (response.code === 0) {

                                    success('保存成功');

                                    dialog.hide();

                                    var preview = element.find('.image-preview');
                                    preview.find('img').attr('src', compressImage({
                                        url: data.url,
                                        width: 150,
                                        height: 150
                                    }));
                                }

                            });
                        }
                    }
                })
            })

            .on('click', '.default-browse', selectDefaultAvatar)
            .on('click', '.form-imagetip', function() {
                var content = ''
                    + '<div class="dialog-tipimg">'
                        + '<div class="tip-title"><i class="icon icon-check-o"></i>正确的照片是这样的</div>'
                        + '<div class="tip-con"><i class="icon icon-circle"></i>请上传半身、举止文明、五官清晰的单人照片（请勿使用PS等修图软件过度处理照片）</div>'
                        + '<div class="tip-img">'
                            + '<img height="200px" src="http://img.gsxservice.com/0cms/d/file/content/2015/09/55ef814c933dd.jpg">'
                            + '<img height="200px" src="http://img.gsxservice.com/0cms/d/file/content/2015/09/55ef88a025bd7.png">'
                        +'</div>'
                    + '</div>'
                var imageTipDialog = new Dialog({
                    title: '头像样例',
                    content: content,
                    width: 600
                });

            })
            .on('blur', 'input[name="nickname"]', function () {
                var target = $(this);
                var nickname = $.trim(target.val());
                var tip = target.siblings('.error-tip');
                service.checkNickname({nickname: nickname}).done(function (response) {
                    if (response.data && response.data.is_repeat_nickname == 1) {
                        tip.find('.tip').text('此昵称已被人抢占啦, 换个昵称吧');
                        tip.show();
                    } else {
                        tip.hide();
                    }
                });
            })
            .on('click', '.teacher-intro-tip', function (){
                var _html = '<div class="teacher-intro-body">' +
                                '<div class="block">' +
                                    '填写下方问题自动生成老师介绍，这样的老师介绍更有吸引力哦' +
                                '</div>' +

                                '<div class="form">' +

                                    '<div class="group">' +
                                        '<label class="label">' +
                                            '<span class="icon warning">*</span>' +
                                            '<span class="text">头衔/职务：</span>' +
                                        '</label>' +
                                        '<div class="controls">' +
                                            '<input class="form-text" name="touxian" placeholder="如：前新东方英语名师"/>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="group">' +
                                        '<label class="label">' +
                                            '<span class="icon warning">*</span>' +
                                            '<span class="text">和您的教学科目相关的经历（填写重要的1-3个）：</span>' +
                                        '</label>' +
                                        '<div class="controls">' +
                                            '<input class="form-text" name="jingli" placeholder="如：北京大学毕业、有海外留学经验、多次参与中考阅卷" />' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="group">' +
                                        '<label class="label">' +
                                            '<span class="icon warning">*</span>' +
                                            '<span class="text">您获得过的奖励、荣誉、证书（填写重要的1-3个）：</span>' +
                                        '</label>' +
                                        '<div class="controls">' +
                                            "<input class='form-text' name='jiangli' placeholder='如：北京\"新东方教主\"比拼第一名，托福口语满分' />" +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="group">' +
                                        '<label class="label">' +
                                            '<span class="icon warning">*</span>' +
                                            '<span class="text">从事哪个科目的教学：</span>' +
                                        '</label>' +
                                        '<div class="controls">' +
                                            '<input class="form-text" name="kemu" placeholder="如：初中英语教育" />' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="group">' +
                                        '<label class="label">' +
                                            '<span class="icon warning">*</span>' +
                                            '<span class="text">教龄：</span>' +
                                        '</label>' +
                                        '<div class="controls">' +
                                            '<input class="form-text" name="jiaoling" placeholder="如：8年" />' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="group">' +
                                        '<label class="label">' +
                                            '<span class="icon warning">*</span>' +
                                            '<span class="text">您的教学特点（需要总结1-3点）：</span>' +
                                        '</label>' +
                                        '<div class="controls">' +
                                            '<input class="form-text" name="tedian" placeholder="如：幽默风趣、引导学生在轻松愉快中获取知识" />' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="group">' +
                                        '<label class="label">' +
                                            '<span class="icon warning">*</span>' +
                                            '<span class="text">您擅长该科目中哪方面的教学：</span>' +
                                        '</label>' +
                                        '<div class="controls">' +
                                            '<input class="form-text" name="jiaoxue" placeholder="如：初中生词汇和口语教学" />' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="group">' +
                                        '<div class="label">' +
                                            '老师介绍预览：' +
                                        '</div>' +
                                        '<div class="controls">' +
                                            '<div class="preview-text">' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +

                            '</div>' +
                            '<div class="footer">' +
                                '<div class="buttons">' +
                                    '<div class="button info">生成老师介绍</div>' +
                                '</div>' +
                            '</div>';
                if (me.dia) {
                    me.dia.show();
                } else {
                    me.dia = new Dialog({
                        title: '老师介绍',
                        content: _html,
                        width: 670,
                        disposeOnHide: false,
                        height: 332
                    });

                    var con = me.dia.element;
                    con
                    .on('blur', '.form-text', function(){
                        var touxian = con.find('input[name="touxian"]').val();
                        var jingli = con.find('input[name="jingli"]').val();
                        var jiangli = con.find('input[name="jiangli"]').val();
                        var kemu = con.find('input[name="kemu"]').val();
                        var jiaoling = con.find('input[name="jiaoling"]').val();
                        var tedian = con.find('input[name="tedian"]').val();
                        var jiaoxue = con.find('input[name="jiaoxue"]').val();

                        if(touxian || jingli || jiangli || kemu || jiaoling || tedian || jiaoxue) {

                            var _html = '<em>我是</em>' + touxian + '，' + jingli
                                + '，<em>曾经获得</em>' + jiangli
                                + '，<em>从事</em>' + kemu + jiaoling
                                + '，<em>擅长</em>' + jiaoxue
                                + '，<em>具有</em>' + tedian
                                + '<em>的教学特点</em>';

                            con.find('.preview-text').html(_html);
                            //con.find('.teacher-intro-body').scrollTop(9999);
                        }

                    })
                    .on('click', '.button', function(){
                        var value = con.find('.preview-text').text();
                        if(value) {
                            me.dia.hide();
                            $('.teacher-intro').val(value);
                        }else{
                            return;
                        }

                    })
                }
            })
            .on('click', '.approach-item', function () {
                var element = $(this);
                if (element.hasClass('active')) {
                    element.removeClass('active');
                } else {
                    element.addClass('active');
                }
            });

            // 保存表单
            me.saveButton = new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    var data = form.parse(element);

                    var year = data.year;
                    var month = data.month;
                    var date = data.date;

                    var realname = data.realname;
                    var nickname = data.nickname;
                    var introduce = data.short_introduce;
                    var category = data.category;
                    var eduBack = data.edu_back;
                    var school = data.school;
                    var regions = me.accessRegion.getValue();

                    // 隐藏模式 - 真实姓名
                    if ((me.privateShow & 1) && nickname == '') {
                        alert("你已经开启了“隐藏真实姓名”模式，“昵称”不能为空哦~");
                        return false;
                    }

                    // 验证结果
                    var validate = false;

                    if (data.private_domain === me.data.uid) {
                        validate = me.validator.validate(['realname', 'nickname', 'short_introduce', 'introduce'], true);
                    }
                    else {
                        validate = me.validator.validate(null, true);
                    }

                    var lesson_way_array = [];
                    element.find('.approach-item').each(function(i, item){
                        var elem = $(item);
                        if (elem.hasClass('active')) {
                            lesson_way_array.push(elem.data('val'));
                        }
                    });


                    // 验证后操作
                   if (validate) {

                        // 拼合生日
                        if (year && month && date ) {
                            data.birthday = year + '-' + month + '-' + date;
                        }

                        return service
                        .editTeacherBaseInfo(
                            {
                                realname: data.realname,
                                avatar: data.avatar,
                                sex: data.sex,
                                birthday: data.birthday,
                                nickname: data.nickname,
                                shortIntroduce: data.short_introduce,
                                category: data.category,
                                eduBack: eduBack,
                                school: data.school,
                                major: data.major,
                                regions: regions,
                                privateDomain: (!data.private_domain || data.private_domain === me.data.uid)
                                             ? null
                                             : data.private_domain,
                                introduce: data.introduce,
                                lessonWay: lesson_way_array.join(',')
                            },
                            {
                                errorHandler: {
                                    '100061': function (response) { // 敏感词过滤

                                        var map = {
                                            'nickname': '昵称',
                                            'introduction': '一句话简介',
                                            'school': '毕业院校',
                                            'major': '所学专业',
                                            'domain': '个性域名'
                                        };

                                        var errorMsg = response.data;
                                        var content = '你';  // 你

                                        $.each(errorMsg, function (index, item) {

                                            if (item.length) {
                                                content += '<span class="sensitive">在<em>' + map[index] + '</em>中输入的内容包含';
                                                $.each(item, function (i, j) {
                                                    content += '“<em>' + j + '</em>”';
                                                });
                                                content += '；</span><br />';
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

                                    },
                                    '800053': function () {
                                        var tip = element.find('input[name="nickname"]').siblings('.error-tip');
                                        tip.find('.tip').text('此昵称已被人抢占啦, 换个昵称吧');
                                        tip.show();
                                    }
                                }
                            }
                        )
                        .done(function (response) {

                            if (response.code === 0) {
                                success('保存成功', function(){
                                    location.reload();
                                });
                            }

                        });
                    }

                }
            });

            me.realnameInput = new Text({
                element: element.find('[name="realname"]')
            });

            me.nicknameInput = new Text({
                element: element.find('[name="nickname"]')
            });

            me.slogonInput = new Text({
                element: element.find('[name="short_introduce"]')
            });

            me.schoolInput = new Text({
                element: element.find('[name="school"]')
            });

            me.majorInput = new Text({
                element: element.find('[name="major"]')
            });
        },

        refresh: function () {

            var me = this;
            var element = me.element;
            var data = me.data;

            // 性别
            var sexRadio = element.find('[name="sex"]');
            var maleRadio = sexRadio.filter('[value="1"]');
            var femaleRadio = sexRadio.filter('[value="0"]');

            var sex = data.sex;
            if ($.isNumeric(sex)) {
                sexRadio = sex == 1 ? maleRadio : femaleRadio;
            }

            // 不用点击没法触发 change 事件
            sexRadio.click();

            // 我的身份
            var categoryRadio = element.find('[name="category"]');
            var teacherRadio = categoryRadio.filter('[value="1"]');
            var studentRadio = categoryRadio.filter('[value="2"]');
            var otherRadio = categoryRadio.filter('[value="3"]');

            var category = data.category;
            if ($.isNumeric(category)) {
                categoryRadio = category == 1 ? maleRadio : femaleRadio;
                if (category == 1) {
                    categoryRadio = teacherRadio;
                }
                else if (category == 2) {
                    categoryRadio = studentRadio;
                }
                else if (category == 3) {
                    categoryRadio = otherRadio;
                }
            }

            // 不用点击没法触发 change 事件
            categoryRadio.click();

            // 生日
            me.dateSelect.refresh();

            // 身份证认证通过后的出生日期
            // 不可更改的生日信息
            element.find('[name="dyear"]').val(year);
            element.find('[name="dmonth"]').val(month);
            element.find('[name="ddate"]').val(date);

            // 教育背景
            me.eduBackSelect.setValue(data.edu_back);

            // 可上门授课范围
            me.accessRegion.refresh();

            // 真实姓名
            me.realnameInput.setValue(
                data.realname
            );

            // 真实姓名，已隐藏
            if (data.private_show === 1) {
                element.find('.privacy .text-info').text('（已隐藏）');
            }

            // 昵称
            me.nicknameInput.setValue(
                data.nickname || ''
            );
            // 一句话介绍
            me.slogonInput.setValue(
                data.short_introduce || ''
            );
            // 学校
            me.schoolInput.setValue(
                data.school || ''
            );
            // 专业
            me.majorInput.setValue(
                data.major || ''
            );

            // 主页地址
            var domainInput = element.find('[name="private_domain"]');
            domainInput.val(
                data.domain || data.uid
            );
            if (data.audits.private_domain.verify_status != 2) { // 只要不是审核未通过，都不可编辑
                domainInput.prop('disabled', !!data.domain);
            }

        },

        save: function () {
            this.element.find('.btn-save').click();
        },

        cancel: function () {
            this.element.find('.btn-cancel').click();
        }


    };

    return BaseInfoForm;

});