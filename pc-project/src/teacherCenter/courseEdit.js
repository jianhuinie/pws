/**
 * @file 添加编辑课程信息
 * @author zhujialu, wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Editor = require('common/component/Editor');
    var Text = require('cobble/form/Text');
    var Select = require('cobble/form/Select');
    var Validator = require('cobble/form/Validator');
    var store = require('common/store');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var AddressDialog = require('common/component/AddressDialog');
    var courseClassify = require('teacherCenter/course/courseClassify');
    var form = require('common/form');

    var container = $('#content');
    var subjectForm = container.find('.subject-form');
    var hasLocation; // 地址

    exports.init = function () {

        var me = this;
        me.data = store.get('courseData') || { }; // 课程数据

        hasLocation = me.data.has_location;

        // 课程推荐
        courseClassify.init(me, subjectRefresh, 'subject');

        // 课程标题
        new Editor({
            element: container.find('.course-name'),
            maxLength: 20
        });
        me.courseName = new Text({
            element: subjectForm.find('[name="course_name"]')
        });

        // 科目一级分类
        me.catSelect1 = new Select({
            element: container.find('.category1'),
            name: 'category1',
            onChange: function () {
                getSubjectList(this.value)
                .done(function (response) {
                    if (response.code === 0) {
                        me.catSelect2.refresh({
                            data: convert(response.data.list)
                        });

                        if (me.data.subject_path && me.data.subject_path[1]) {
                            me.catSelect2.setValue(
                                me.data.subject_path[1].id
                            );
                        }
                    }
                });
            }
        });

        // 二级分类
        me.catSelect2 = new Select({
            element: container.find('.category2'),
            name: 'category2',
            onChange: function () {
                getSubjectList(this.value)
                .done(function (response) {
                    if (response.code === 0) {
                        me.catSelect3.refresh({
                            data: convert(response.data.list)
                        });
                        if (me.data.subject_path && me.data.subject_path[2]) {
                            me.catSelect3.setValue(
                                me.data.subject_path[2].id
                            );
                        }
                    }
                });
            }
        });

        // 三级分类
        me.catSelect3 = new Select({
            element: container.find('.category3'),
            name: 'category3'
        });

        getSubjectList()
        .done(function (response) {
            if (response.code === 0) {
                me.catSelect1.refresh({
                    data: convert(response.data.list)
                });

                // 编辑刷新
                if (me.data.id) {
                    refresh(me);
                }

            }
        });

        // 专业背景介绍
        new Editor({
            element: container.find('.course-remark'),
            maxLength: 140
        });
        me.courseRemark = new Text({
            element: subjectForm.find('[name="course_remark"]')
        });

        /*
         * 验证
         */
        var validator = new Validator({
            element: subjectForm,
            fields: {
                course_name: {
                    rules: {
                        required: true,
                        maxlength: 20
                    },
                    errors: {
                        required: '课程标题不能为空',
                        maxlength: '请将字数控制在 20 字以内'
                    }
                },
                course_remark: {
                    rules: {
                        required: true,
                        maxlength: 140
                    },
                    errors: {
                        required: '专业背景介绍不能为空',
                        maxlength: '请将字数控制在 140 字以内'
                    }
                },
                teacher_price: {
                    errors: {
                        required: '请输入老师上门的价格',
                        pattern: '请输入整数',
                        min: '价格最低为 1 元/时',
                        max: '价格最高为 999999 元/时'
                    }
                },
                student_price: {
                    errors: {
                        required: '请输入学生上门的价格',
                        pattern: '请输入整数',
                        min: '价格最低为 1 元/时',
                        max: '价格最高为 999999 元/时'
                    }
                },
                discuss_price: {
                    errors: {
                        required: '请输入协商地点的价格',
                        pattern: '请输入整数',
                        min: '价格最低为 1 元/时',
                        max: '价格最高为 999999 元/时'
                    }
                },
                online_price: {
                    errors: {
                        required: '请输入在线教学的价格',
                        pattern: '请输入整数',
                        min: '价格最低为 1 元/时',
                        max: '价格最高为 999999 元/时'
                    }
                }
            }
        });

        container
        .on('click', ':checkbox', function (e) { // 授课方式的启用和置灰

            var target = $(e.currentTarget);
            var group = target.closest('.form-group');

            if (target.prop('checked')) {
                enableTeachingMethod(group);
            }
            else {
                disableTeachingMethod(group);
            }
        });

        // 保存表单
        me.saveButton = new SaveButton({
            element: container.find('.btn-save'),
            save: function () {

                if (!validator.validate()) {
                    return;
                }

                var formData = form.parse(subjectForm);
                var error;

                var subjectId = formData.category3;
                var teacherPrice = getPrice(subjectForm.find('[data-way="8"]'));//获取老师上门的课时费
                var studentPrice = getPrice(subjectForm.find('[data-way="4"]'));//获取学生上门的课时费
                var discussPrice = getPrice(subjectForm.find('[data-way="1"]'));//获取协商地点的课时费
                var onlinePrice = getPrice(subjectForm.find('[data-way="2"]'));//获取在线教学的课时费

                if (!subjectId) {
                    error = '请选择科目分类';
                }
                // 至少设置了一种费用
                else if (
                    teacherPrice === ''
                 && studentPrice === ''
                 && discussPrice === ''
                 && onlinePrice === ''
                ) {
                    error = '请至少设置一种授课方式及费用';
                }

                if (error) {
                    alert(error);
                    return;
                }

                // 线下课，保证老师地址薄有数据
                if (hasLocation == false) {
                    if (teacherPrice !== '' || studentPrice !== '' || discussPrice !== '') {
                        confirm({
                            title: '温馨提示',
                            content: '由于您选择了线下授课，为方便学生找到您，<br>请设置一个常用地址，后续您可以在<em class="text-primary">地址管理</em>中增添修改',
                            buttons: [
                                        {
                                            text: '设置地址',
                                            type: 'primary',
                                            handler: function () {
                                                this.hide();
                                                new AddressDialog({
                                                    onSuccess: function () {
                                                        hasLocation = true;
                                                        container.find('.btn-save').trigger('click');
                                                    }
                                                });
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
                        return;
                    }
                }

                var teacherPrice2 = teacherPrice == ''? 100 : teacherPrice;
                var studentPrice2 = studentPrice == ''? 100 : studentPrice;
                var onlinePrice2 = onlinePrice == ''? 100 : onlinePrice;
                var discussPrice2 = discussPrice == ''? 100 : discussPrice;
                //判断输入的价格是否大于10
                var lowerPrice = function(){
                    if(teacherPrice2 < 10 || studentPrice2 < 10 || onlinePrice2 < 10 || discussPrice2 < 10) {
                        return true;
                    } else {
                      return false;
                    }
                };
                function getMinPriceClass() {
                    var text="";
                    if(teacherPrice2 <= studentPrice2){
                        if(teacherPrice2 <= onlinePrice2){
                            if(teacherPrice2 <= discussPrice2){
                                text="?teacherPrice="+teacherPrice2;
                            }else{
                                text="?discussPrice="+discussPrice2;
                            }
                        }else{
                            if(onlinePrice2 <= discussPrice2){
                                text="?onlinePrice="+onlinePrice2;
                            }else{
                                text="?discussPrice="+discussPrice2;
                            }
                        }

                    } else{
                        if(studentPrice2 <= onlinePrice2){
                            if(studentPrice2 <= discussPrice2){
                                text="?studentPrice="+studentPrice2;
                            }else{
                                text="?discussPrice="+discussPrice2;
                            }
                        }else{
                            if(onlinePrice2 <= discussPrice2){
                                text="?onlinePrice="+onlinePrice2;
                            }else{
                                text="?discussPrice="+discussPrice2;
                            }
                        }
                    }
                    return text;
                }
                //判断是否是白名单用户
                var whiteUser = function(){
                    return window.whiteTrialFlag == 1;
                };

                // 判断是否已经开启了试听课,开启返回true，否则返回false
                var offAuditioned = function(){
                    return window.SiteTrialFlag == 1;
                };

                //一对一价格警示提示设置试听课
                //如果是白名单用户，且尚未开设试听课，价格小于10元，提示开始试听课
                if(lowerPrice() && whiteUser() && !offAuditioned()){
                    confirm({
                        title: '温馨提示',
                        content: '您设置的一对一课程价格较低，小秘书建议您设置试听课哦<br>试听课设置只需一步，是否马上设置？',
                        buttons: [
                            {
                                text: '设置试听',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                    var text = getMinPriceClass();
                                    window.location.href="/teacher_center/upsertTrialCourse"+text;
                                }
                            },
                            {
                                text: '暂不设置',
                                handler: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                }






                service
                .upsertCourse({
                    id: me.data.id,
                    subjectId: subjectId,
                    courseName: formData.course_name,
                    courseRemark: formData.course_remark,
                    teacher: teacherPrice,
                    student: studentPrice,
                    discuss: discussPrice,
                    online: onlinePrice,
                    labelIds: ''
                })
                .done(function (response) {
                    if (response.code === 0) {
                        success('修改成功 稍后生效', function () {
                            location.href = "/teacher_course/list_admin";
                        });
                    }
                });

            }
        });

        /*
         * 刷新科目分类下拉框数据
         */
        function subjectRefresh() {

            // 科目分类
            if (me.data && me.data.subject_path.length > 0) {
                $.each(me.data.subject_path, function (index, item) {
                    var catNum = index + 1;
                    var cat = 'catSelect' + catNum;
                    me[cat].setValue(item.id);
                });

            }
        }
    };

    /**
     * 启用授课方式
     *
     * @inner
     * @param {jQuery} element 授课方式的容器元素
     */
    function enableTeachingMethod(element) {

        var text = element.find('.form-text');
        var input = element.find('[type="money"]');

        text.removeClass('disabled');
        input.prop('disabled', false);
        input.focus();
    }

    /**
     * 禁用授课方式
     *
     * @inner
     * @param {jQuery} element 授课方式的容器元素
     */
    function disableTeachingMethod(element) {

        var text = element.find('.form-text');
        var input = element.find('[type="money"]');

        text.addClass('disabled');
        input.prop('disabled', true);
    }

    /**
     * 科目缓存
     *
     * @inner
     * @type {Object}
     */
    var cache = { };
    function getSubjectList(id) {

        if (cache[id]) {

            var promise = $.Deferred();

            setTimeout(
                function () {
                    promise.resolve(cache[id]);
                },
                0
            );

            return promise;
        }

        return service
        .getSubjectList({ id: id })
        .done(function (response) {
            if (response.code === 0) {
                cache[id] = response;
            }
            return response;
        });
    }

    function getPrice(element) {

        var checkbox = element.find('[name="price"]');
        var price;

        if (checkbox.prop('checked')) {
            var money = element.find('[type="money"]');
            price = $.trim(money.val());
        }

        return $.isNumeric(price) ? price : '';
    }

    /**
     * 转换数据源
     *
     * @inner
     * @param {Array} datasource
     * @return {Array}
     */
    function convert(datasource) {
        return $.map(
            datasource,
            function (item) {
                return {
                    text: item.name,
                    value: item.id
                };
            }
        );
    }

    /*
     * 编辑课程科目表单
     *
     * @property {Object} data 后端传来的数据
     * @property {Object} data.id            一对一课程ID
     * @property {string} data.name          课程标题
     * @property {string} data.remark        专业背景介绍
     * @property {Object} data.subject_path        科目分类
     * @property {string} data.subject_path.id     科目ID
     * @property {string} data.subject_path.name   科目名称
     * @property {Object} data.subject_path.level  科目级别
     * @property {Object} data.label_ids           科目对应标签
     * @property {string} data.lesson_way      上课方式
     * @property {string} data.price_discuss   1协商地点价位
     * @property {string} data.price_online    2在线教学价位
     * @property {string} data.price_student   4学生上门价位
     * @property {string} data.price_teacher   8老师上门价位
     * @property {string} data.verify_status   审核状态 0审核中 1通过 2未通过
     * @property {Object} data.reasons         审核被拒原因
     * @property {Object} data.has_region      是否设置了可上门授课范围
     * @property {Object} data.has_location    是否有地址薄
     */
    function refresh(me) {
        var data = me.data || { };

        // 课程标题
        me.courseName.setValue(data.name);

        // 科目分类
        if (data.subject_path && data.subject_path.length > 0) {
            $.each(data.subject_path, function (index, item) {
                var catNum = index + 1;
                var cat = 'catSelect' + catNum;
                me[cat].setValue(item.id);
            });
        }

        // 专业背景介绍
        me.courseRemark.setValue(data.remark);

        // 授课方式
        var lessonWay = parseFloat(data.lesson_way);
        var lessonWayMap = {
            1: 'price_discuss',
            2: 'price_online',
            4: 'price_student',
            8: 'price_teacher'
        };

        subjectForm
        .find('.lesson-way')
        .each(function () {

            var target = $(this);
            var bit = parseFloat(target.data('way'));
            var checkbox = target.find(':checkbox');
            var input = target.find('[type="money"]');

            var price = lessonWayMap[bit];
            if (bit & lessonWay) {
                input.val(data[price]);
                checkbox.prop('checked', true);
                enableTeachingMethod(target);
            }
            else {
                input.val('');
                checkbox.prop('checked', false);
                disableTeachingMethod(target);
            }

        });

    }


});