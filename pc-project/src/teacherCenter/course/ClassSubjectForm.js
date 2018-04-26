/**
 * @file 班课设置 - 课程信息表单
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var form = require('common/form');
    var Editor = require('common/component/Editor');
    var Select = require('cobble/form/Select');
    var Text = require('cobble/form/Text');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var RegionSelect = require('common/component/RegionSelect');
    var underscore = require('underscore');
    var store = require('common/store');
    var Dialog = require('cobble/ui/Dialog');
    var cookie = require('cobble/util/cookie');

    var courseClassify = require('teacherCenter/course/courseClassify');
    var AddressForm = require('../component/AddressForm'); // 地址薄
    var CategorySelect = require('common/center/component/CategorySelect');

    var normalValidateFileds = ['price', 'original_price', 'max_student', 'course_name', 'student_desc', 'target'];
    var hasStudentValidateFields = ['max_student', 'student_desc', 'target'];


    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     *
     * @property {Object} options.data 后端传来的数据
     * @property {Object} options.data.category1
     * @property {string} options.data.category1.name
     * @property {string} options.data.category1.id
     * @property {Object} options.data.category2
     * @property {string} options.data.category2.name
     * @property {string} options.data.category2.id
     * @property {Object} options.data.category3
     * @property {string} options.data.category3.name
     * @property {string} options.data.category3.id
     * @property {string} options.data.remarkname 别名
     *
     * @property {string} options.subject_id 授课科目id
     * @property {Object} options.subject_list 已设科目列表
     * @property {Object} options.subject_list.name 已设科目别名
     * @property {Object} options.subject_list.id 已设科目三级id
     *
     * @property {string} options.name 课程标题
     * @property {string} options.price 总价
     * @property {string} options.max_student 人数上限
     * @property {string} options.student_desc 适学人群
     *
     * @property {string} options.lesson_way 上课方式 1线下授课 2在线授课
     * @property {string} options.use_regular_addr 上课地点 1地址库选择 2新地址
     * @property {string} options.area_id 上课地点    2新地址 - 区id
     * @property {string} options.new_location        2新地址 - 详细地址
     */
    function ClassSubjectForm(options) {
        $.extend(this, options);
        this.init();
    }

    ClassSubjectForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            var data = me.data;

            me.hasStudent = store.get('hasStudent'); //是否有学生报名此班课，有的话，一些字段是不可编辑的。

            if (!data) {
                data = me.data = { };
            }

            // 课程地址三个层
            var addrShow = element.find('.addr-show');
            var addrRadio = element.find('.addr-radio');
            var newAddress = element.find('.new-address');
            // 手机观看
            var classType = element.find('.class-type');

            // 地址薄
            me.addressForm = new AddressForm({
                element: newAddress
            });

            if (!me.hasStudent) {

                // 课程标题
                me.courseName = new Editor({
                    element: element.find('.course-name'),
                    maxLength: 20
                });
            }

            // 适学人群
            me.target = new Editor({
                element: element.find('.target'),
                maxLength: 50
            });

            // 适学人群
            me.studentDesc = new Editor({
                element: element.find('.student-desc'),
                maxLength: 30
            });

            // 授课科目
            if (me.hasStudent && data.selected_subject.path) {
                var remarkName = element.find('.remark-name');
                var html = '<div class="form-static">' + data.selected_subject.path[3].remark_name + '</div>';
                remarkName.append(html);
                remarkName.show();
            }
            else { // 新增科目
                element.find('.new-name').show();
                $('.form-select').show();
            }

            var categorySelect =
            me.categorySelect = new CategorySelect({
                element: me.element,
                onChange: function (e, data) {
                    me.subjectIdInput.setValue(data.value);
                }
            });

            // 判断是否有已设科目
            if (data.subject_list && data.subject_list.length > 0) {
                element.find('.exists-subject').css('display', 'inline-block');
            }

            // 指定科目id(下增加班课)
            me.subjectIdInput = new Text({
                element: element.find('input[name="subject_id"]')
            });

             // 使用新地址或原地址 - 新建 + 编辑
            var isNewOrOld = 'old';

            if (data.location) {
                me.oldAddress = true;
                isNewOrOld = 'old';
            }

            element
            .on('click', '.exists-subject', function (e) {

                var target = $(e.currentTarget);
                var newName = target.closest('.new-name');
                var existsName = newName.next('.exists-name');

                $('.form-select').hide();

                newName.hide();
                existsName.show();

                // 已设科目
                var existsSubject = new Array();
                $.each(data.subject_list, function (index, item) {
                    existsSubject.push({
                        'value': item.id,
                        'text': item.name
                    });
                });

                // 已设科目列表
                me.existsSubjectSelect = new Select({
                    element: element.find('.exists-subject-id'),
                    name: 'exists_id',
                    data: existsSubject
                });

            })

            .on('click', '.new-subject', function (e) {
                var target = $(e.currentTarget);
                var existsName = target.closest('.exists-name');
                var newName = existsName.prev('.new-name');

                existsName.hide();
                newName.show();
                $('.form-select').show();

            });

            if (!$.isEmptyObject(data.address_list)) { // 获取地址库列表
                // 地址库 - 数据
                var addressList = [];
                $.each(data.address_list, function (key, item) {
                    addressList.push({
                        'value': key,
                        'text': item.regular_address.location_addr,
                    });
                });

                // 地址库列表
                me.addressListSelect = new Select({
                    element: element.find('.address-list'),
                    name: 'address_id',
                    data: addressList
                });

                if (data.user_address_id) {
                    me.addressListSelect.setValue(
                        data.user_address_id
                    );
                }
                else {
                    me.addressListSelect.setValue(me.addressListSelect.data[0].value);
                }
            }

            me.changeLessonWay = function (value) {
                if (value == 4) { // 线下授课

                    var addrRadios = element.find(':radio[name="addr_radio"]'); // 上课地点 选项

                    var addrRadioData = form.parse(element);

                    if (addrRadioData.addr_radio == 2) {  // 新地址
                        newAddress.show();
                        isNewOrOld = 'new';
                    }
                    if (!$.isEmptyObject(data.address_list)) { // 获取地址库列表

                        addrRadio.show();

                        // 上课地点 - 默认选择从地址库中选择
                        addrRadios = addrRadios.filter('[value="1"]');
                        addrRadios.click();

                    }
                    else {
                        newAddress.show();
                        isNewOrOld = 'new';
                    }

                    //classType.hide();

                }
                else if (value == 2) { // 在线授课
                    addrShow.hide();
                    addrRadio.hide();
                    newAddress.hide();
                    //classType.show();
                }
            }

            element
            .on('change', ':radio[name="lesson_way"]', function (e) {

                var radio = $(e.currentTarget);
                var value = radio.prop('value');
                me.changeLessonWay(value);
                //如果选中在线授课，弹出提示
                var notip = cookie.get('classCourse-liveinfo-notip');

                if (notip) {
                    return;
                }
                if (value == '2') {
                    var content = [];
                    content.push(''
                        ,'<div class="msg-content-title">'
                            ,'跟谁学直播课须知'
                        ,'</div>'
                        ,'<div class="dialog-content">'
                            ,'<ul class="info-con">'
                                ,'<li>1、请事先熟悉跟谁学直播课<a class="download" href="http://www.genshuixue.com/guide/teacher_layout?a=teacher&op=online" target="_blank">授课流程</a>，注意开课时间，建议直播前半小时进入课堂，提前测试设备及网络环境，等待直播课开始；</li>'
                                ,'<li>2、建议首选联通、电信网络—4M或以上独享带宽，上课时建议用网线连接、不建议WIFI连接，可能会造成直播卡顿，无法进入直播等情况；</li>'
                                ,'<li>3、使用电脑直播授课效果最为流畅，功能也最为完善,强烈推荐使用跟谁学直播助手，<a class="download" href="http://www.genshuixue.com/static/windows" target="_blank" style="color:orange">点击下载</a>；</li>'
                                ,'<li>4、课堂注意事项：直播老师请注意开课时间并提前到课，不迟到、早退、旷课，保证正常直播课的授课效果；</li>'
                                ,'<li>5、如有问题：可通过电话4000-910-910，010-86448910（服务时间9：00-23：00），邮件service@genshuixue.com与跟谁学客服及时取得联系，我们的客服会耐心帮您解决问题；</li>'
                                ,'<li>6、<span class="text-error">如果您在国外</span>，跨国的网络情况可能无法保证，请确保您连通国内所有网站速度正常，谨慎开课；</li>'
                                ,'<li>7、<span class="text-error">老师在开课前4小时可以进入教室上传课件或备课。</span></li>'
                                ,'<li>8、<span class="text-error">如平时想体验直播或备课，可随时使用体验教室。</span></li>'
                            ,'</ul>'
                            ,'<div class="info-checkbox">'
                                ,'<label class="form-checkbox checked">'
                                    ,'<input type="checkbox" name="confirm_check" value="1" checked/>我已阅读并同意该须知'
                                ,'</label>'
                                ,'</br>'
                                ,'<label class="form-checkbox checked">'
                                    ,'<input type="checkbox" name="confirm_check" value="2"/>不再提醒我'
                                ,'</label>'
                            ,'</div>'
                        ,'</div>'
                        ,'<div class="dialog-action">'
                            ,'<button class="btn btn-primary btn-confirm">'
                                ,'我知道了'
                            ,'</button>'
                        ,'</div>'
                    );
                    var dialog = new Dialog({
                        title: '温馨提示',
                        content: content.join(''),
                        width: 880
                    });
                    var ele = dialog.element;
                    var checkresulte = 0;
                    ele
                    .on('change', ':checkbox[name="confirm_check"]', function(e) {
                        var checkbox = ele.find(':checkbox[name="confirm_check"]');
                        checkresulte = 0;
                        $.each(checkbox, function(i, obj){
                            var me = $(obj);
                            if (me.is(':checked')) {
                                checkresulte = checkresulte + parseInt(me.prop('value'));
                            }
                        });

                        //如果只选择不再提醒
                        if (checkresulte == 0 || checkresulte == 2) {
                            ele.find('.btn-confirm').attr('disabled', true);
                            element.find(':radio[value="4"]').click();
                        } else {
                            //选中我知道了
                            ele.find('.btn-confirm').removeAttr('disabled');
                        }
                        //两个都选，才写cookie记录不再提醒


                    })
                    .on('click', '.dialog-close', function(e) {
                        if (checkresulte == 0 || checkresulte == 2) {
                            ele.find('.btn-confirm').attr('disabled', true);
                        }
                        element.find(':radio[value="4"]').click();
                    })
                    .on('click', '.btn-confirm', function(e) {
                        dialog.hide();
                        if (checkresulte == 3) {
                            cookie.set('classCourse-liveinfo-notip', 'true');
                        }
                    });
                }
            })

            .on('change', ':radio[name="addr_radio"]', function (e) {

                var radio = $(e.currentTarget);
                var value = radio.prop('value');

                if (value == 1) { // 使用常用教学地点
                    newAddress.hide();
                    isNewOrOld = 'old';
                }
                else if (value == 2) { // 使用新地址
                    newAddress.show();
                    isNewOrOld = 'new';
                }

            })

            .on('click', '.modify-addr', function (e) {
                isNewOrOld = 'old'; // 新地址
                var target = $(e.currentTarget);
                addrShow.hide();
                addrRadio.show();
                addrRadio.find('.original-addr').show(); // 使用原地址
            })

            .on('click', '.original-addr', function (e) {
                isNewOrOld = 'old'; // 旧地址
                var target = $(e.currentTarget);
                addrRadio.hide();
                newAddress.hide();
                addrShow.show();
            });


            var openRule = element.find('.open-rule');

            me.changeOpenClassRule = function (value) {
                if (value == '2') {
                    openRule.show();
                }
                else if (value == '1') {
                    openRule.hide();
                }
            }

            element
            .on('change', 'input[name="open_class_rule"]', function (e) {
                me.changeOpenClassRule($(this).val());
            });

            // 验证对象
            me.validator = new Validator({
                element: element,
                realtime: false,
                fields: {
                    price: {
                        errors: {
                            required: '您尚未设置课程现价',
                            pattern: '请输入价钱，最多两位小数哦~',
                            min: '价格最低为 0 元',
                            max: '价格最高为 999999.99 元'
                        }
                    },
                    original_price: {
                        errors: {
                            pattern: '请输入价钱，最多两位小数哦~',
                            min: '价格最低为 0 元',
                            max: '价格最高为 999999.99 元'
                        },
                        custom: function (field, callback) {
                            var price = element.find('input[name="price"]').val();
                            var originalPrice = element.find('input[name="original_price"]').val();
                            if (price && originalPrice) {
                                if (Number(price) > Number(originalPrice)) {
                                    return '课程原价不能低于课程现价';
                                }
                            }
                            else {
                                return true;
                            }
                        }
                    },
                    max_student: {
                        errors: {
                            required: '请输入班级人数',
                            pattern: '班级人数设置有误',
                            min: '至少要有一个学生哦~',
                            max: '最多只能设置 999999 个学生哦~'
                        },
                        custom: function (field, callback) {
                            if (element.find('.lesson-way :checked').val() == '2' && Number(field.val()) > 2000) {
                                return '为保障教学质量，在线课最多可选2000个学生哦~';
                            }
                            else {
                                return true;
                            }
                        }
                    },

                    course_name: {
                        rules: {
                            required: true,
                            maxlength: 20
                        },
                        errors: {
                            required: '老师，你忘记填写课程标题了哦',
                            maxlength: '请将字数控制在20个字以内'
                        },
                        custom: function (element) {
                            var value = element.val();
                            if (/<[^>]+?>/.test(value)) {
                                return '不能输入HTML标签';
                            }
                            else {
                                return true;
                            }
                        }
                    },
                    student_desc: {
                        rules: {
                            required: true,
                            maxlength: 30
                        },
                        errors: {
                            maxlength: '请将字数控制在30个字以内',
                            required: '请填写适学人群'
                        },
                        custom: function (element) {
                            var value = element.val();
                            if (/<[^>]+?>/.test(value)) {
                                return '不能输入HTML标签';
                            }
                            else {
                                return true;
                            }
                        }
                    },
                    target: {
                        rules: {
                            maxlength: 50
                        },
                        errors: {
                            required: '请填写教学目标',
                            maxlength: '请将字数控制在50个字以内'
                        },
                        custom: function (element) {
                            var value = element.val();
                            if (/<[^>]+?>/.test(value)) {
                                return '不能输入HTML标签';
                            }
                            else {
                                return true;
                            }
                        }
                    },
                    area: {
                        errors: {
                            required: '请选择地区'
                        }
                    },
                    location_addr: {
                        errors: {
                            required: '请填写新地址'
                        }
                    },
                    address_id: {
                        errors: {
                            required: '请选择地址'
                        }
                    },
                    min_student: {
                        errors: {
                            required: '请填写最少开班人数',
                            pattern: '只能输入大于等于1且小于等于班级人数的正整数',
                            min: '请输入最少为1的学生数'
                        },
                        custom: function (element) {
                            var max = me.maxStudentInput.getValue();

                            if ($.isNumeric(max) && Number(element.val()) > Number(max)) {
                                return '保底人数不能大于班级人数哦';
                            } else if (Number(element.val()) > 100) {
                                return '保底人数不能大于100哦';
                            } else {
                                return  true;
                            }
                        }
                    }
                }
            });

            // 保存表单
            me.saveButton = new SaveButton({
                element: element.find('.btn-save'),
                save: function () {
                    var data = form.parse(element);
                    // 授课科目 - 新增第三级科目
                    var newSubjectId = data.category3;
                    // 授课科目 - 已设科目之一
                    var existsSubjectId = data.exists_id;
                    // 已有科目
                    var hasSubjectId = data.subject_id;

                    var subjectId;

                    if (hasSubjectId) {
                        subjectId = hasSubjectId;
                    }
                    else if (newSubjectId) {
                        subjectId = newSubjectId;
                    }
                    else {
                        subjectId = existsSubjectId;
                    }

                    if (!subjectId) {
                        alert('请选择授课科目');
                        return;
                    }

                    if (me.data.chaban_flag
                        && me.data.chaban_flag !== 1
                        && (+me.data.chaban_price) > data.price
                    ) {
                        alert({
                            title: '温馨提示',
                            content: '插班价格不能低于班课现价哦，请返回修改'
                        });
                        return;
                    }

                    //保底开班
                    if (data.open_class_rule && data.open_class_rule == 1) {
                        data.min_student = 1;
                    }
                    if (data.open_class_rule && data.open_class_rule == 2) {
                        if (!me.validator.validate(['min_student'])) {
                            if (data.min_student - data.max_student > 0) {
                                alert({
                                    title: '温馨提示',
                                    content: '保底开班人数不能超过班级人数哦，请返回修改'
                                });
                            } else if (data.min_student - 100 > 0) {
                                alert({
                                    title: '温馨提示',
                                    content: '保底开班人数不能超过100哦，请返回修改'
                                });
                            }
                            return;
                        }


                    }
                    if (!me.validator.validate(['max_student'])) {
                        if (data.lesson_way == 2 && data.max_student > 2000) {
                            alert({
                                title: '温馨提示',
                                content: '在线课最多可选2000个学生，请返回修改'
                            });
                        }
                        return;
                    }

                    // 上课地点 - 具体地址
                    var addrRadio = data.addr_radio ? data.addr_radio : 2;
                    var location = data.new_location; // 只可添加新地址时

                    // 新地址是否完整
                    var flag = false;
                    if (addrRadio == 1 && data.address_id) { // 地址库
                        flag = true;
                    }
                    else if (addrRadio == 2 && data.location_addr && data.area) { // 新地址
                        flag = true;
                    }

                    //是否支持手机观看
                    // if (data.lesson_way == 2) {
                    //     data.class_type = element.find('[name="class_type"]').val();
                    // }

                    if (element.find('.bs_switch :checkbox').prop('checked')) {
                        data.bs_switch = 0;
                    }
                    else {
                        data.bs_switch = 1;
                    }

                    var validateFields;
                    //有学生报名的情况下，需要特殊的校验规则
                    if (me.hasStudent) {
                        if (element.find('[name="addr_radio"][value="1"]').is(':checked')) {
                            validateFields = $.merge(hasStudentValidateFields, ['address_id']);
                        }
                        else if (element.find('[name="addr_radio"][value="2"]').is(':checked')) {
                            if (element.find('[name="location_addr"]').prop('disabled')) {
                                validateFields = $.merge(hasStudentValidateFields, ['area']);
                            }
                            else {
                                validateFields = $.merge(hasStudentValidateFields, ['location_addr']);
                            }
                        }
                        else {
                            validateFields = hasStudentValidateFields;
                        }
                    }
                    else {
                        if (data.open_class_rule == 2) {
                            validateFields = $.merge(normalValidateFileds, ['min_student']);
                        }
                        validateFields = normalValidateFileds;
                    }
                    if (!me.validator.validate(validateFields)) return;
                    // 优先保存位置
                    var mapBtns = element.find('.map-oper');
                    if (mapBtns.is(':visible')) {

                        var bdAreaName = element.find('input[name="bd_area_name"]').val();
                        var cityId = element.find('input[name="city"]').val();
                        var areaId = element.find('input[name="area"]').val();
                        var userAreaName = element.find('.area span').text();

                        // 保存位置
                        return service
                        .checkAddress({
                            cityId: cityId,
                            areaName: bdAreaName
                        })
                        .done(function (response) {
                            if (response.code === 0) {

                                mapBtns.hide();
                                // 获取地图区级信息 - 只刷新区信息
                                if (response.data.match_area && response.data.match_area.id) {
                                    if (areaId != response.data.match_area.id) {
                                        confirm({
                                            content: '小秘书发现你输入的地址似乎在“' + bdAreaName + '”<br />是否需要小秘书帮你把“' + userAreaName + '”修改为“' + bdAreaName + '”呢？',
                                            title: '温馨提示',
                                            width: 400,
                                            buttons: [
                                                {
                                                    text: '帮我修改',
                                                    type: 'primary',
                                                    handler: function () {
                                                        // 获取地图区级信息 - 只刷新区信息
                                                        me.addressForm.setAreaChangeSrc('saveAddr'); // 牵涉区变动地图刷新与否
                                                        me.addressForm.regionSelect.areaSelect.setValue(response.data.match_area.id);
                                                        this.hide();
                                                        // 触发保存按钮
                                                        element.find('.btn-save').click();
                                                    }
                                                },
                                                {
                                                    text: '不修改',
                                                    handler: function () {
                                                        this.hide();
                                                        // 触发保存按钮
                                                        element.find('.btn-save').click();
                                                    }
                                                }
                                            ]
                                        });
                                    }
                                    else {
                                        // 触发保存按钮
                                        element.find('.btn-save').click();
                                    }

                                }

                            }
                        });
                    }
                    else {
                        if (data.lesson_way == 4 && isNewOrOld == 'new' && flag == false) { //新地址不完整，获取原有地址
                            if (me.oldAddress) { // 有原地址
                                confirm({
                                    content: '你未填写有效的课程地址，小秘书帮你保存了原地址，是否确认保存？',
                                    title: '温馨提示',
                                    width: 300
                                })
                                .done(function () {
                                    return service
                                    .upsertClassCourse(
                                        {
                                            subjectId: subjectId,
                                            name: data.course_name,
                                            price: data.price,
                                            price_old: data.price_old,
                                            maxStudent: data.max_student,
                                            minStudent: data.min_student,
                                            studentDesc: data.student_desc,
                                            target: data.target,
                                            lessonWay: data.lesson_way,
                                            number: data.course_number,
                                            classType: data.class_type,
                                            bsSwitch: data.bs_switch
                                        },
                                        {
                                            errorHandler: {
                                                '100061': function (response) { // 敏感词过滤

                                                    var map = {
                                                        'name': '课程标题',
                                                        'tags': '教学目标',
                                                        'student_desc': '适学人群'
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

                                                }
                                            }
                                        }
                                    )
                                    .done(function (response) {

                                        var isSuccess = response.code === 0;

                                        element.trigger(
                                            'save',
                                            {
                                                isSuccess: isSuccess,
                                                number: response.data.number
                                            }
                                        );
                                        return response;
                                    });
                                });
                            }
                            else { // 没有原地址
                                // 取常用地址id
                                var addressId = element.find('.address-list li:first').data('value');
                                confirm({
                                    content: '你未填写有效的课程地址，小秘书帮你保存了常用地址，是否确认保存？',
                                    title: '温馨提示',
                                    width: 300
                                })
                                .done(function () {
                                    return service
                                    .upsertClassCourse(
                                        {
                                            subjectId: subjectId,
                                            name: data.course_name,
                                            price: data.price,
                                            originalPrice: data.original_price,
                                            maxStudent: data.max_student,
                                            minStudent: data.min_student,
                                            studentDesc: data.student_desc,
                                            target: data.target,
                                            lessonWay: data.lesson_way,
                                            addressId: addressId, // 常用教学地点
                                            number: data.course_number,
                                            classType: data.class_type,
                                            bsSwitch: data.bs_switch
                                        },
                                        {
                                            errorHandler: {
                                                '100061': function (response) { // 敏感词过滤

                                                    var map = {
                                                        'name': '课程标题',
                                                        'target': '教学目标',
                                                        'student_desc': '适学人群'
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

                                                }
                                            }
                                        }
                                    )
                                    .done(function (response) {

                                        var isSuccess = response.code === 0;

                                        element.trigger(
                                            'save',
                                            {
                                                isSuccess: isSuccess,
                                                number: response.data.number
                                            }
                                        );
                                        return response;
                                    });
                                });

                            }
                        }
                        else if (data.lesson_way == 4 && isNewOrOld == 'old') { //用旧有地址
                            return service
                            .upsertClassCourse(
                                {
                                    subjectId: subjectId,
                                    name: data.course_name,
                                    price: data.price,
                                    originalPrice: data.original_price,
                                    maxStudent: data.max_student,
                                    minStudent: data.min_student,
                                    studentDesc: data.student_desc,
                                    target: data.target,
                                    lessonWay: data.lesson_way,
                                    addressId: data.address_id,
                                    number: data.course_number,
                                    classType: data.class_type,
                                    bsSwitch: data.bs_switch
                                },
                                {
                                    errorHandler: {
                                        '100061': function (response) { // 敏感词过滤

                                            var map = {
                                                'name': '课程标题',
                                                'target': '教学目标',
                                                'student_desc': '适学人群'
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

                                        }
                                    }
                                }
                            )
                            .done(function (response) {

                                var isSuccess = response.code === 0;

                                element.trigger(
                                    'save',
                                    {
                                        isSuccess: isSuccess,
                                        number: response.data.number
                                    }
                                );
                                return response;
                            });
                        }
                        else { // 线上 或使用新地址
                            return service
                            .upsertClassCourse(
                                {
                                    subjectId: subjectId,
                                    name: data.course_name,
                                    price: data.price,
                                    originalPrice: data.original_price,
                                    maxStudent: data.max_student,
                                    minStudent: data.min_student,
                                    studentDesc: data.student_desc,
                                    lessonWay: data.lesson_way,
                                    target: data.target,
                                    areaId: data.area,
                                    address: data.location_addr,
                                    lng: data.lng,
                                    lat: data.lat,
                                    asRegularAddress: data.regular_address,
                                    number: data.course_number,
                                    classType: data.class_type,
                                    bsSwitch: data.bs_switch
                                },
                                {
                                    errorHandler: {
                                        '100061': function (response) { // 敏感词过滤

                                            var map = {
                                                'name': '课程标题',
                                                'target': '教学目标',
                                                'student_desc': '适学人群'
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

                                        }
                                    }
                                }
                            )
                            .done(function (response) {

                                var isSuccess = response.code === 0;

                                element.trigger(
                                    'save',
                                    {
                                        isSuccess: isSuccess,
                                        number: response.data.number
                                    }
                                );
                                return response;
                            });
                        }

                    }


                }
            });

            // 课程ID
            if (data.selected_subject.path) {
                var subjectId = data.selected_subject.path[3].id;
                me.subjectIdInput.setValue(
                    subjectId || ''
                );
            }

            // 班课number
            me.courseNumberInput = new Text({
                element: element.find('[name="course_number"]')
            });
            me.courseNumberInput.setValue(
                data.number || ''
            );
            if (!me.hasStudent) {
                // 课程标题
                me.courseNameInput = new Text({
                    element: element.find('[name="course_name"]')
                });
                // 课程总价
                me.priceInput = new Text({
                    element: element.find('[name="price"]')
                });
                // 课程原价
                me.originalPriceInput = new Text({
                   element: element.find('[name="original_price"]')
                });
                //保底开班人数
                me.minStudent = new Text({
                   element: element.find('[name="min_student"]')
                });
            }
            // 班级最多人数
            me.maxStudentInput = new Text({
                element: element.find('[name="max_student"]')
            });
            // 适学人群
            me.studentDescInput = new Text({
                element: element.find('[name="student_desc"]')
            });

            // 常用教学地点 展示
            me.regularAddrShow = element.find('.regular-address');
            if (underscore.keys(data.regular_address).length > 0) {

                var regularAddr = data.regular_address;
                var address = regularAddr.province.name;
                if (regularAddr.city.name != regularAddr.province.name ) {
                    address += regularAddr.city.name;
                }
                address += regularAddr.area.name
                         + regularAddr.location_addr;

                me.regularAddrShow.html('：' + address);

            }

            courseClassify.init(
                me,
                function () {
                    console.log(me.data.subject_path);
                    categorySelect.setValue(me.data.subject_path);
                },
                'subject'
            );
        },

        refresh: function () {

            var me = this;
            var element = me.element;
            var data = me.data || { };

            // 课程地址三个层
            var addrShow = element.find('.addr-show');
            var addrRadio = element.find('.addr-radio');
            var newAddress = element.find('.new-address');
            // 手机观看
            var classType = element.find('.class-type');

            // 课程类目
            if (me.hasStudent) { // 有学生报名，便不能修改类目。
                var subjectId = data.selected_subject.path[3].id;
                me.subjectIdInput.setValue(subjectId);
            }
            else {
                element.find('.remark-name').hide();
                element.find('.new-name').show();
                $('.form-select').show();

                if (data.selected_subject && data.selected_subject.path && data.selected_subject.path['3']) {
                    var catgoryData = [];
                    for (var i = 1; i <= 3; i++) {
                        catgoryData.push({
                            id: data.selected_subject.path[i].id
                        });
                    }
                    me.categorySelect.setValue(catgoryData);
                }
            }

            // 班课编号
            me.courseNumberInput.setValue(
                data.number || ''
            );

            if (!me.hasStudent) {
                // 课程标题
                me.courseNameInput.setValue(
                    data.name || ''
                );
                // 课程总价
                me.priceInput.setValue(
                    data.price || ''
                );
                // 课程原价
                me.originalPriceInput.setValue(
                    data.original_price || ''
                );
                // 保底开班人数
                me.minStudent.setValue(
                    data.min_student || ''
                );
                //开班规则
                if (data.min_student > 1) {
                    element.find('[name="open_class_rule"][value="2"]').prop('checked', true);
                    me.changeOpenClassRule(2);
                }
            }

            // 班级人数
            me.maxStudentInput.setValue(
                data.max_student || ''
            );
            // 适学人群
            me.studentDescInput.setValue(
                data.student_desc || ''
            );

            // 教学目标
            me.target.setValue(
                data.target || ''
            );

            // 上课方式
            if ($.isNumeric(data.lesson_way)) {

                element.find('[name="lesson_way"][value="' + data.lesson_way + '"]').prop('checked', true);
                me.changeLessonWay(data.lesson_way);

                // 支持手机观看
                // classType
                // .find('input[name="class_type"]')
                // .prop('checked', Number(data.class_type))
                // .val(Number(data.class_type));

            }
            // 常用教学地点 地址展示
            if (data.lesson_way == 4 && (data.location)) {
                addrShow.show();
                addrRadio.hide();
            }

            if (data.bs_switch == '0') {
                element.find('.bs_switch :checkbox').prop('checked', true);
            }
        },

        save: function () {
            this.element.find('.btn-save').click();
        },

        cancel: function () {
            this.element.find('.btn-cancel').click();
        }

    };

    return ClassSubjectForm;

});
