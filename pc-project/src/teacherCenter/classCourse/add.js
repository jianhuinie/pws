/**
 * @file 班课设置
 * @author zhangshaolong
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');

    var SaveButton = require('common/component/SaveButton');
    var bindScroll = require('common/bindScroll');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var Dialog = require('cobble/ui/Dialog');

    var basicInfo = require('./add/basicInfo');
    var schedue = require('./add/schedue');
    var photo = require('./add/photo');
    var detailInfo = require('./add/detailInfo');
    var quit = require('./add/quit');
    var template = require('./add/template');
    var preview = require('./add/preview/preview');
    require('tpl!./add.tpl');

    var browser = require('cc/util/browser');


    var holder;
    var navChildren;

    var courseNumber = '';
    var org_id = '';

    var _showDialog = function (courseInfor) {
        if (org_id == 0) {
            alert({
                title: '温馨提示',
                content: courseInfor.content,
                width: 300,
                skinClass: 'vip-dialog',
                buttons: [
                    {
                        text: '立即开通',
                        type: 'primary',
                        handler: function () {
                            location.href = "/teacher_center/vip_center";
                            this.hide();
                        }
                    },
                    {
                        text: '了解详情',
                        type: 'default',
                        handler: function () {
                            location.href = "/teacher_center/vip_detail?type=freeLive";
                            this.hide();
                        }
                    }
                ]
            });
        }
        else {
            alert({
                title: '温馨提示',
                content: courseInfor.content,
                width: 300,
                skinClass: 'vip-dialog',
                buttons: [
                    {
                        text: '我知道了',
                        type: 'primary',
                        handler: function () {
                            this.hide();
                        }
                    }
                ]
            });
        }
        return false;
        holder.find('input[name="maxStudent"]').val(0).focus();
    }

    //判断老师免费在线授课人数
    var judgeMember = function () {
        var vipLevel = store.get('vip_level');
        var checkbox = holder.find('input[name="lesson_way"]');
        var live, content;
        $.each(checkbox, function(i, obj){
            var me = $(obj);
            if (me.is(':checked')) {
                live = i;
            }
        });
        if(live == 1) {
            if(holder.find('input[name="price"]').val() == 0) {
                var max_student = holder.find('input[name="maxStudent"]').val();
                if (vipLevel == 0 && max_student > 500) {
                    if (org_id == 0) {
                        content = '非会员用户免费直播课最高上限500人，开通会员获得更高上限'
                    }
                    else {
                        content = '非会员用户免费直播课最高上限500人，联系机构开通会员获得更高上限'
                    }
                    _showDialog({ content: content })
                }
                else if (vipLevel == 1 && max_student > 1000) {
                    if (org_id == 0) {
                        content = '普通会员用户免费直播课最高上限1000人，开通会员获得更高上限'
                    }
                    else {
                        content = '普通会员用户免费直播课最高上限1000人，联系机构开通更高级别会员获得更高上限'
                    }
                    _showDialog({ content: content });
                }
                else if (vipLevel == 2 && max_student > 3000) {
                    if (org_id == 0) {
                        content = '高级会员用户免费直播课最高上限3000人，开通超级会员获得更高上限'
                    }
                    else {
                        content = '高级会员用户免费直播课最高上限3000人，联系机构开通更高级别会员获得更高上限'
                    }
                    _showDialog({ content: content });
                }
            }
        }
    }

    var initFixedNav = function () {
        var navNode = holder.find('.module-nav');
        var children = holder.find('[data-module-path]');
        var parentNode = navNode.parent();
        navChildren = navNode.children();
        var top = navNode.offset().top;

        var activeNode = function (pageTop) {
            var hasActived = false;
            children.each(function (idx) {
                var $node = $(this);
                var $item = $(navChildren[idx]);
                if (!hasActived && ($node.offset().top + $node.height() + 30) > pageTop) {
                    hasActived = true;
                    $item.addClass('active');
                } else {
                    $item.removeClass('active');
                }
            });
        };

        var fixedNavHandler = function () {
            var pageTop = pageScrollTop();
            if (pageTop > top) {
                parentNode.addClass('fixed');
            } else {
                parentNode.removeClass('fixed');
            }
            activeNode(pageTop);
        };

        bindScroll(window, fixedNavHandler, 1);

        fixedNavHandler();
    };

    // 实时更新还能输入字数
    var updateMaxInputCount = function () {
        var $this = $(this);
        var count = $this.prop('maxlength') - $this.val().length;
        $this.next().find('.input-tip span').text(count > 0 ? count : 0);
    };

    // 编辑操作时，需要减去当前输入框已输入的字数
    var initMaxInputCount = function () {
        holder.find('input[maxlength]').each(updateMaxInputCount);
    };

    // 定位到出错的元素
    var positionInvalid = function (firstInvalid) {
        if (firstInvalid == -1) {
            return;
        }
        var offset = null;
        if (firstInvalid == 3) {
            offset = $(holder.find('.class-course-content > [data-module-path]')
            .get(firstInvalid)).offset();
            holder.find('#class-course-detail .input-tip-container').show();
        } else {
            offset = $(holder.find('.class-course-content > [data-module-path]')
            .get(firstInvalid)).find('.invalid:eq(0)').offset();
        }
        if (offset) {
            $('html,body').scrollTop(offset.top - 30);
        }

    };

    // 验证报班退班模块
    var validateQuit = function (firstInvalid, callback) {
        var submitData = ({
            number: courseNumber,
            basicData: basicInfo.getData(),
            schedueData: schedue.getData(),
            photoData: photo.getData(),
            detailData: detailInfo.getData(),
            quitData: quit.getData(),
            template_m: template.getData().template_m,
            template_pc: template.getData().template_pc
        });

        var firstClass = submitData.schedueData.planList[0];

        quit.setDependsData(submitData.basicData);
        quit.setDependsData({
            allClass: (firstClass ? submitData.schedueData.planList.length : null),
            startTime: (firstClass ? firstClass.startTime : null)
        });
        quit.validate().done(function (result){
            var navNode = $(navChildren[4]);
            if (!result) {
                navNode.find('.icon-info-circle').show();
                navNode.find('.icon-check-circle').hide();
                if (firstInvalid === -1) {
                    firstInvalid = 4;
                }
            } else {
                navNode.find('.icon-check-circle').show();
                navNode.find('.icon-info-circle').hide();
            }
            if (firstInvalid === -1) {
                var info = store.get('basicInfo');
                if (info.number) {
                    submitData.number = info.number;
                }
                callback(submitData);
            }
            positionInvalid(firstInvalid);
        })
    }



    // 点击保存时，整体检查所填数据
    var validateAllForms = function (callback) {
        $.when(
            basicInfo.validate(),
            schedue.validate(),
            photo.validate(),
            detailInfo.validate()
        ).done(function () {
            var valid = 1;
            var firstInvalid = -1;
            for (var i = 0, len = arguments.length; i < len; i++) {
                var status = arguments[i];
                valid = valid && status;
                var navNode = $(navChildren[i]);
                if (!status) {
                    navNode.find('.icon-info-circle').show();
                    navNode.find('.icon-check-circle').hide();
                    if (firstInvalid === -1) {
                        firstInvalid = i;
                    }
                } else {
                    navNode.find('.icon-check-circle').show();
                    navNode.find('.icon-info-circle').hide();
                }
            }
            validateQuit(firstInvalid, callback);
        })
    };

    // 预览和保存草稿时验证已填内容的正确性
    var validateInputs = function (callback) {
        var needValidates = [];
        needValidates.push(basicInfo.validate('name'));
        needValidates.push(basicInfo.validate('category'));
        needValidates.push(basicInfo.validate('courseInfor'));
        var basicData = basicInfo.getData();
        var photoData = photo.getData();
        var detailData = detailInfo.getData();
        var getDeferred = function () {
            var deferred = $.Deferred();
            deferred.resolve(true);
            return deferred.promise();
        };
        if ($('#class-course-schedue .plan-item').length) {
            needValidates.push(schedue.validate('schedule'));
        } else {
            needValidates.push(getDeferred());
        }
        if (photoData.photos.length) {
            needValidates.push(photo.validate('photo'));
        } else {
            needValidates.push(getDeferred());
        }
        if (detailData.introduction) {
            needValidates.push(detailInfo.validate());
        } else {
            needValidates.push(getDeferred());
        }
        $.when.apply(null, needValidates)
        .done(function () {
            var idx = 0;
            var firstInvalid = -1;
            for (var i = 0, len = arguments.length; i < len; i++) {
                var status = arguments[i];
                var navNode;
                if (i == 0 || i == 1) {
                    idx = 0;
                    status = arguments[0] && arguments[1];
                } else {
                    idx = i - 1;
                }
                navNode = $(navChildren[idx]);
                if (!status) {
                    navNode.find('.icon-info-circle').show();
                    navNode.find('.icon-check-circle').hide();
                    if (firstInvalid === -1) {
                        firstInvalid = idx;
                    }
                } else {
                    var invalids = $('#class-course-basic').find('.invalid');
                    if (invalids.length > 0) {
                        $.each(invalids, function (idx, item) {
                            var val = $.trim($(item).parents('.form-controls').find('[type="text"]').val());
                            if (val) {
                                navNode = $(navChildren[0]);
                                navNode.find('.icon-info-circle').show();
                                navNode.find('.icon-check-circle').hide();
                                firstInvalid = 0;
                                return false;
                            }
                        });
                    } else {
                        navNode.find('.icon-check-circle').show();
                        navNode.find('.icon-info-circle').hide();
                    }

                }

            }

            validateQuit(firstInvalid, function (submitData) {
                callback(submitData);
            });

        });
    }

    // 拼接敏感字符并提示
    var showSenseContent = function (sense, module, trueFlag) {
        var result = '';
        var validTip = module.ele.parent().parent().find('.input-tip-container');
        if (sense && sense.length) {
            result += '你在' + (module.txt||'') +'中输入的内容包含';
            $.each(sense, function (index, item) {
                result += '“' + item + '”，';
            });
            result += '请删除后重新输入';
            validTip.removeClass('valid').addClass('invalid').addClass('block-invalid').show();
            validTip.find('.icon-info-circle').text(result);
            return trueFlag;
        }
        return 0;
    };

    /**
     * 初始化
     */
    exports.init = function () {

        holder = this;
        var vipLevel = store.get('vip_level');
        //班课模版加的参数
        var preview_url_m = '';
        var m_index = 0;

        var m_temp = holder.find('.templates_m');
        var pc_temp = holder.find('.templates_pc');

        var m_mode = m_temp.find('.mode');
        var pc_mode = pc_temp.find('.mode');

        $.each(m_mode, function(i, obj){
            var me = $(obj);
            if (me.data('template') == store.get('template_m')) {
                me.addClass('active')
            }
        });
         $.each(pc_mode, function(i, obj){
            var me = $(obj);
            if (me.data('template') == store.get('template_pc')) {
                me.addClass('active')
            }
        });
        service
        .getUserBasicInfo()
        .done(function (response) {
            if (response.code === 0) {
                org_id = response.data.org_id;
            }
        });

        initFixedNav();

        holder
        .on('click', '.back-class-list', function () {
            confirm({
                content: '班课信息未保存，确认要返回班课列表吗？',
                title: '温馨提示',
                buttons: [
                    {
                        text: '确定返回',
                        type: 'primary',
                        handler: function () {
                            location.href = '/teacher_center/classCourseSearch';
                        }
                    },
                    {
                        text: '取消',
                        handler: function () {
                            this.hide();
                        }
                    }
                ]
            });
        })

        .on('click', '.reject-reason', function () {
            var basicinfo = store.get('basicInfo');
            var reason_list = basicinfo.reason_list;
            var content = Simplite.render('reject-reson', reason_list);
            var dialog = new Dialog({
                title: '温馨提示',
                skinClass: 'dialog-reject-reason',
                content: content,
                width: 680
            });
            var ele = dialog.element;
            ele
            .on('click', '.dialog-close', function(e) {
                dialog.hide();
            })
            .on('click', '.btn-confirm', function(e) {
                dialog.hide();
            });
        })

        .on('click', '.publish-action', function (e) { // 发布班课
            var target = $(e.currentTarget);
            //判断手机模板选择是否正确
            var m_templates = holder.find('.templates_m');
            var m_temp = m_templates.find('.active');
            var m_vip = m_temp.data('vip');
            if ( !m_vip) {
                m_vip = 0;
            }
            //判断网页模板选择是否正确
            var pc_templates = holder.find('.templates_pc');
            var pc_temp = pc_templates.find('.active');
            var pc_vip = pc_temp.data('vip');
            if ( !pc_vip) {
                pc_vip = 0;
            }

            if(vipLevel < m_vip ) {
                if ( org_id == 0) {
                    var content = '';
                    if (m_vip == '1') {
                        content = '您选择的手机模板为会员模板，开通会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                    else if (m_vip == '2') {
                        content = '您选择的手机模板为高级会员模板，开通高级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                    else if (m_vip == '3') {
                        content = '您选择的手机模板为超级会员模板，开通超级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                    alert({
                        title: '温馨提示',
                        content: content,
                        width: 382,
                        skinClass: 'vip-dialog',
                        buttons: [
                            {
                                text: '立即开通',
                                type: 'error',
                                handler: function () {
                                    location.href = "/teacher_center/vip_center";
                                    this.hide();
                                }
                            },
                            {
                                text: '了解详情',
                                type: 'default',
                                handler: function () {
                                    location.href = "/teacher_center/vip_detail?type=pageDress";
                                    this.hide();
                                }
                            }
                        ]
                    });
                }
                else {
                    var content = '';
                    if (m_vip == '1') {
                        content = '您选择的手机模板为会员模板，请联系机构开通会员。';
                    }
                    else if (m_vip == '2') {
                        content = '您选择的手机模板为高级会员模板，请联系机构开通高级会员。';
                    }
                    else if (m_vip == '3') {
                        content = '您选择的手机模板为超级会员模板，请联系机构开通超级会员。';
                    }
                    alert({
                        title: '温馨提示',
                        content: content,
                        width: 382,
                        skinClass: 'vip-dialog',
                        buttons: [
                            {
                                text: '我知道了',
                                type: 'error',
                                handler: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                }
            }
            else if (vipLevel < pc_vip) {
                if ( org_id == 0) {
                    var content = '';
                    if (pc_vip == '1') {
                        content = '您选择的网页模板为会员模板，开通会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                    else if (pc_vip == '2') {
                        content = '您选择的网页模板为高级会员模板，开通高级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                    else if (pc_vip == '3') {
                        content = '您选择的网页模板为超级会员模板，开通超级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                    alert({
                        title: '温馨提示',
                        content: content,
                        width: 382,
                        skinClass: 'vip-dialog',
                        buttons: [
                            {
                                text: '立即开通',
                                type: 'error',
                                handler: function () {
                                    location.href = "/teacher_center/vip_center";
                                    this.hide();
                                }
                            },
                            {
                                text: '了解详情',
                                type: 'default',
                                handler: function () {
                                    location.href = "/teacher_center/vip_detail?type=pageDress";
                                    this.hide();
                                }
                            }
                        ]
                    });
                }
                else {
                    var content = '';
                    if (pc_vip == '1') {
                        content = '您选择的网页模板为会员模板，请联系机构开通会员。';
                    }
                    else if (pc_vip == '2') {
                        content = '您选择的网页模板为高级会员模板，请联系机构开通高级会员。';
                    }
                    else if (pc_vip == '3') {
                        content = '您选择的网页模板为超级会员模板，请联系机构开通超级会员。';
                    }
                    alert({
                        title: '温馨提示',
                        content: content,
                        width: 382,
                        skinClass: 'vip-dialog',
                        buttons: [
                            {
                                text: '我知道了',
                                type: 'error',
                                handler: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                }
            }
            else {
                validateAllForms(function (submitData) {
                    //是否需要限制班课人数
                    //2016-01-19 24:00:00之前创建的课程人数不做限制
                    var is_limit = 1;
                    var create_time = store.get('basicInfo').create_time
                    if (create_time < '1453219200') {
                        is_limit = 0;
                    }
                    //验证班课最大人数
                    if (is_limit) {
                        //判断班课最大人数
                        var is_fail = judgeMember();
                        if (is_fail == false) {
                            return false;
                        }
                    }


                    target.prop('disabled', true);
                    target.html('正在发布..');

                    var scheduleData = submitData.schedueData;
                    if (scheduleData) {
                        scheduleData = JSON.stringify(scheduleData);
                    }

                    submitData.schedueData = scheduleData;
                    service
                    .submitClassCourse(submitData, {
                        errorHandler: {
                            '100061': function (response) {
                                // 敏感词过滤
                                var map = {
                                    'arrangement': {
                                        'txt': '课程安排',
                                        'ele': $('#class-course-schedue').find('.plan-description')
                                    },
                                    'schedules': {
                                        'txt': '课程内容'
                                    },
                                    'introduction': {
                                        'txt': '课程描述',
                                        'ele': $('#class-course-detail').find('.class-course-detail-editor')
                                    },
                                    'name': {
                                        'txt': '课程名称',
                                        'ele': $('#class-course-basic').find('input[name="name"]')
                                    },
                                    // 'target': {
                                    //     'txt': '教学目标',
                                    //     'ele': $('#class-course-basic').find('input[name="target"]')
                                    // },
                                    // 'student_desc': {
                                    //     'txt': '适学人群',
                                    //     'ele': $('#class-course-basic').find('input[name="crowd"]')
                                    // }
                                    'courseInfor': {
                                        'txt': '课程信息',
                                        'ele': $('#class-course-basic').find('textarea[name="courseInfor"]')
                                    },
                                };
                                var errorMsg = response.data;
                                var firstInvalid = 0;

                                // 课程名称
                                firstInvalid = showSenseContent(errorMsg.name, map.name, 1);

                                firstInvalid = showSenseContent(errorMsg.information, map.courseInfor, 1);

                                // 时间安排
                                firstInvalid = firstInvalid | showSenseContent(errorMsg.arrangement, map.arrangement, 2);

                                // 教学计划 - 第N节课程内容
                                if (errorMsg.schedules && errorMsg.schedules.length) {
                                    var classCourseWrapper = $('#class-course-schedue');
                                    $.each(errorMsg.schedules, function (index, item) {
                                        var content = '', selector = '';
                                        if (item.words.length) {
                                            content += '输入的内容包含';
                                            $.each(item.words, function (i, j) {
                                                content += '“' + j + '”，';
                                            });
                                            content += '请删除后重新输入';
                                            selector = '.plan-item:eq('  + (item.s - 1) + ')';
                                            schedue.showCheckError(selector, content);
                                        }
                                    });
                                    firstInvalid = firstInvalid | 2;
                                }

                                // 课程描述
                                firstInvalid = firstInvalid | showSenseContent(errorMsg.introduction, map.introduction, 4);

                                if (firstInvalid) {
                                    if (firstInvalid & 1) {
                                        positionInvalid(0);
                                    } else if (firstInvalid & 4) {
                                        positionInvalid(3);
                                    } else {
                                        positionInvalid(1);
                                    }
                                }
                            },
                            '100059': function (response) {
                                var errors = response.data.errors;
                                if (errors && errors.schedules) {
                                    var errors = errors.schedules;
                                    var errorsShow = [];
                                    $.each(errors, function (key, item) {
                                        var error = key.match(/\d*$/)[0];
                                        error = '.plan-item:eq('  + (error - 1) + ')';
                                        var tips_class = '';
                                        var tips_special = '';
                                        var tips_teacher = '';
                                        $.each (item, function (idx, itemi) {
                                            switch (itemi.type + '') {
                                                case '3':
                                                tips_class += itemi.course_name + ' ';
                                                tips_teacher += itemi.teacher_name + ' ';
                                                break;
                                                case '4':
                                                tips_special += itemi.course_name + ' ';
                                                tips_teacher += itemi.teacher_name + ' ';
                                                break;
                                            }
                                        });
                                        schedue.showCheckError(error, '这节课与' + tips_teacher + '老师的 ' + tips_class + tips_special + '课程有冲突');
                                        errorsShow.push(error);
                                    });
                                }
                                if (errorsShow.length) {
                                    positionInvalid(1);
                                }
                            },
                            '230101': function (response) { // 审核顺序

                                var content = '恭喜你，班课已提交审核<br />'
                                            + '但是小秘书发现您的';
                                if (response.data.cert == false) {
                                    content += '<span class="text-info">身份认证&nbsp;</span>';
                                }

                                if (response.data.profile == false) {
                                    content += '<span class="text-info">资料设置&nbsp;</span>';
                                }
                                    content += '仍未完善<br />'
                                    content += '完善后班课才会自动开始审核';
                                var number = response.data.number;
                                alert({
                                    content: content,
                                    title: '温馨提示',
                                    buttons: [
                                        {
                                            text: '我知道了',
                                            type: 'primary',
                                            handler: function () {
                                                this.hide();
                                                window.location.href = '/class_course/success?number=' + number;
                                            }
                                        }
                                    ]
                                });
                            },
                            '700001': function (response) {

                            }
                        }
                    })
                    .done(function (response) {
                        target.prop('disabled', false);
                        target.html('发布班课');
                        if (!response.code) {
                            detailInfo.clearlocaldata();
                            courseNumber = response.data.number;
                            window.location.href = '/class_course/success?number=' + response.data.number;
                        }
                    });
                })
            }

        })

        .on('click', '.keep-action', function (e) { // 保存草稿

            var target = $(e.currentTarget);

            validateInputs(function (submitData) {
                submitData.is_caogao = 1;
                var scheduleData = submitData.schedueData;
                if (scheduleData) {
                    scheduleData = JSON.stringify(scheduleData);
                }
                submitData.schedueData = scheduleData;
                service
                .submitClassCourse(submitData)
                .done(function (response) {

                    target.prop('disabled', false);
                    target.html('保存草稿');

                    if (!response.code) {
                        detailInfo.clearlocaldata();
                        courseNumber = response.data.number;
                        window.location.href = '/teacher_center/classCourseSearch';
                    }
                });
            });
        })
        .on('click', '.prev-temp', function () {
            var prev = holder.find('.prev-temp');
            var next = holder.find('.next-temp');
            m_index = m_index-1;

            var mpreview = holder.find('#m-preview');
            var mobileHtml = holder.find('.html-box');
            var mspreview = holder.find('.pic-box');
            var mobileImg = holder.find('.tem-pic');
            if(m_index > 0) {
                if (browser.chrome) {
                    mpreview.attr('src',preview_url_m[m_index]);
                    mspreview.hide();
                    mobileHtml.show();
                    if(m_index-1 <= 0) {
                        prev.hide();
                        next.show();
                    }
                }
                else {
                    mobileImg.attr('src',store.get('templates_m')[m_index].preview_image);
                    mobileHtml.hide();
                    mspreview.show();
                    if(m_index-1 <= 0) {
                        prev.hide();
                        next.show();
                    }
                }
            }
            else {
                prev.hide();
                next.show();
            }
        })
        .on('click', '.next-temp', function () {
            var prev = holder.find('.prev-temp');
            var next = holder.find('.next-temp');
            m_index = m_index+1;
            if(m_index < store.get('templates_m').length) {
                var mpreview = holder.find('#m-preview');
                var mobileHtml = holder.find('.html-box');
                var mspreview = holder.find('.pic-box');
                var mobileImg = holder.find('.tem-pic');
                if (browser.chrome) {
                    mpreview.attr('src',preview_url_m[m_index]);
                    mspreview.hide();
                    mobileHtml.show();
                    if(m_index+1 >= store.get('templates_m').length) {
                        next.hide();
                        prev.show();
                    }
                }
                else {
                    mobileImg.attr('src',store.get('templates_m')[m_index].preview_image);
                    mobileHtml.hide();
                    mspreview.show();
                    if(m_index+1 >= store.get('templates_m').length) {
                        next.hide();
                        prev.show();
                    }
                }
            }
            else {
                next.hide();
                prev.show();
            }

        })
        .on('click', '.exit-preview', function () {
            var previewPhone = holder.find('.preview-phone');
            var previewMask = holder.find('.preview-mask');
            previewPhone.hide();
            previewMask.hide();

            var target = '/class_course/upsert_form?type=edit&number=' + courseNumber;
            if (location.pathname + location.search === target) {
                location.hash = 'exit';
                setTimeout(
                    function () {
                        location.reload();
                    }
                );
            }
            else {
                location.href = target + '#exit';
            }
        })
        .on('click', '.preview-action', function (e) {
            var tab_nav =  holder.find('.tab-nav');
            var tab = tab_nav.find('.active');
            //当前是pc的模板选择
            if( tab.data('template') == 'templates_pc') {
                var templates = holder.find('.templates_pc');
                var target = templates.find('.active');
                if (target.data('template') == '' || target.data('template') == null) {
                    templates.find('.image').eq(0).addClass('active');
                }
                var target = $(e.currentTarget);

                validateInputs(function (submitData) {
                    submitData.is_caogao = 1;
                    var scheduleData = submitData.schedueData;
                    if (scheduleData) {
                        scheduleData = JSON.stringify(scheduleData);
                    }
                    submitData.schedueData = scheduleData;
                    service
                    .submitClassCourse(submitData)
                    .done(function (response) {
                        if (!response.code) {
                            detailInfo.clearlocaldata();
                            courseNumber = response.data.number;
                            window.open(response.data.preview_url);
                        }
                    });
                });
            } //当前是手机模板选择
            else if (tab.data('template') == 'templates_m') {
                var templates = holder.find('.templates_m');
                var target = templates.find('.active');
                var index = target.data('floor');
                m_index = target.data('floor');
                var templatem_length = templates.find('.template').length;

                var next = holder.find('.next-temp');
                var prev = holder.find('.prev-temp');

                if(index == 0) {
                    prev.hide();
                    next.show();
                }
                else if (m_index == templatem_length) {
                    next.hide();
                    prev.show();
                }
                else {
                    prev.show();
                    next.show();
                }

                validateInputs(function (submitData) {
                    submitData.is_caogao = 1;
                    var scheduleData = submitData.schedueData;
                    if (scheduleData) {
                        scheduleData = JSON.stringify(scheduleData);
                    }
                    submitData.schedueData = scheduleData;
                    service
                    .submitClassCourse(submitData)
                    .done(function (response) {
                        preview_url_m = response.data.preview_url_m;
                        courseNumber = response.data.number;
                        if (!response.code) {
                            detailInfo.clearlocaldata();

                            var previewPhone = holder.find('.preview-phone');
                            var previewMask = holder.find('.preview-mask');
                            previewPhone.show();
                            previewMask.show();
                            var mpreview = holder.find('#m-preview');
                            var mobileHtml = holder.find('.html-box');
                            var mspreview = holder.find('.pic-box');
                            var mobileImg = holder.find('.tem-pic');
                            if (browser.chrome) {
                                mpreview.attr('src',preview_url_m[index]);
                                mspreview.hide();
                                mobileHtml.show();
                            }
                            else {
                                mobileImg.attr('src',store.get('templates_m')[index].preview_image);
                                mobileHtml.hide();
                                mspreview.show();
                            }
                        }
                    });
                });
            }
        })

        .on('focus', 'input[maxlength]', function () {
            $(this).next().removeClass('valid invalid');
        })

        .on('input propertychange', 'input[maxlength]', updateMaxInputCount);

        initMaxInputCount();
    };

});