/**
 * @file 报名加入跟谁学
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Select = require('cobble/form/Select');
    var Uploader = require('cobble/ui/Uploader');
    var File = require('cobble/form/File');
    var service = require('common/service');
    var store = require('common/store');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var consult = $('#consult');
    var validator = null;


    /**
     * 科目缓存
     *
     * @inner
     * @type {Object}
     */
    var cache = { };

    function getSubjectList(add_id, type_id) {
        return service
        .getJobInfoList({ addId: add_id, typeId: type_id })
        .done(function (response) {
            return response;
        });
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

    /**
     * @constructor
     * @param {Object} options
     * @property {Array} options.course
     */
    function OfferDialog(options) {
        $.extend(this, options);
        this.init();
    }

    OfferDialog.prototype = {

        init: function () {

            var content = ''
            + '<div class="form">'

            + '<div class="left-box">'

            + '<div class="form-group">'
            +     '<label class="form-label">工作地址：</label>'
            +     '<div class="form-controls">'
            +         '<div class="dropdown workarea" required>'
            +             '<button class="btn-default">'
            +                 '<i class="caret"></i>'
            +                 '<span>请选择</span>'
            +             '</button>'
            +             '<ul class="dropdown-menu"></ul>'
            +         '</div>'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group allcomponey" style="display:none;">'
            +     '<label class="form-label"></label>'
            +     '<div class="form-controls">'
            +         '<div class="dropdown componeySelect" required>'
            +             '<button class="btn-default">'
            +                 '<i class="caret"></i>'
            +                 '<span>请选择</span>'
            +             '</button>'
            +             '<ul class="dropdown-menu"></ul>'
            +         '</div>'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group">'
            +     '<label class="form-label">工作类型：</label>'
            +     '<div class="form-controls">'
            +         '<div class="dropdown worktype" required>'
            +               '<button class="btn-default">'
            +                   '<i class="caret"></i>'
            +                   '<span>请选择</span>'
            +               '</button>'
            +               '<ul class="dropdown-menu">'
            +               '</ul>'
            +         '</div>'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group">'
            +     '<label class="form-label">岗位选择：</label>'
            +     '<div class="form-controls">'
            +         '<div class="dropdown workjob" required>'
            +               '<button class="btn-default">'
            +                   '<i class="caret"></i>'
            +                   '<span>请选择</span>'
            +               '</button>'
            +               '<ul class="dropdown-menu">'
            +                   '<li data-value="teacher">老师上门</li>'
            +                   '<li data-value="student">学生上门</li>'
            +                   '<li data-value="online">在线授课</li>'
            +                   '<li data-value="discuss">双方协商</li>'
            +               '</ul>'
            +         '</div>'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group">'
            +     '<label class="form-label">学历：</label>'
            +     '<div class="form-controls">'
            +         '<div class="dropdown education" required>'
            +               '<button class="btn-default">'
            +                   '<i class="caret"></i>'
            +                   '<span>请选择</span>'
            +               '</button>'
            +               '<ul class="dropdown-menu">'
            +                   '<li data-value="1">本科</li>'
            +                   '<li data-value="2">研究生</li>'
            +                   '<li data-value="3">博士</li>'
            +               '</ul>'
            +         '</div>'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'


            + '<div class="form-group college-school">'
            +     '<label class="form-label">本科院校：</label>'
            +     '<div class="form-controls">'
            +         '<input type="text" placeholder="院校名称" name="college_school" class="form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group college-major">'
            +     '<label class="form-label">本科专业：</label>'
            +     '<div class="form-controls">'
            +         '<input type="text" placeholder="本科专业" name="college_major" class="form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group master-school" style="display:none;">'
            +     '<label class="form-label">研究生院校：</label>'
            +     '<div class="form-controls">'
            +         '<input type="text" placeholder="研究生就读院校名称" name="master_school" class="form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group master-major" style="display:none;">'
            +     '<label class="form-label">研究生专业：</label>'
            +     '<div class="form-controls">'
            +         '<input type="text" placeholder="研究生就读专业名称" name="master_major" class="form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group doctor-school" style="display:none;">'
            +     '<label class="form-label">博士生院校：</label>'
            +     '<div class="form-controls">'
            +         '<input type="text" placeholder="博士生就读院校名称" name="doctor_school" class="form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group doctor-major" style="display:none;">'
            +     '<label class="form-label">博士生专业：</label>'
            +     '<div class="form-controls">'
            +         '<input type="text" placeholder="博士生就读专业名称" name="doctor_major" class="form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group contact-way">'
            +     '<label class="form-label">姓名：</label>'
            +     '<div class="form-controls">'
            +         '<input type="text" name="name" placeholder="姓名" class="contact form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group">'
            +     '<label class="form-label">性别：</label>'
            +     '<div class="form-controls">'
            +         '<div class="dropdown sex" required>'
            +               '<button class="btn-default">'
            +                   '<i class="caret"></i>'
            +                   '<span>请选择</span>'
            +               '</button>'
            +               '<ul class="dropdown-menu">'
            +                   '<li data-value="1">男</li>'
            +                   '<li data-value="2">女</li>'
            +               '</ul>'
            +         '</div>'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group contact-way">'
            +     '<label class="form-label">手机：</label>'
            +     '<div class="form-controls">'
            +         '<input type="mobile" name="mobile" placeholder="手机号" class="contact form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group contact-way">'
            +     '<label class="form-label">邮箱：</label>'
            +     '<div class="form-controls">'
            +         '<input type="email" name="email" placeholder="邮箱" class="contact form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '</div>'
            + '<div class="right-box">'

            + '<div class="form-group">'
            +     '<label class="form-label graduate-date">毕业日期：</label>'
            +     '<div class="form-controls">'
            +         '<input type="text" name="graduate_date" placeholder="XXXX年XX月" id="graduate_date" class="form-text" required />'
            +         '<span class="error"></span>'
            +     '</div>'
            + '</div>'

            + '<div class="form-group">'
            +     '<label class="form-label remark">附加信息：</label>'
            +     '<div class="form-controls">'
            +         '<div class="form-editor">'
            +         '<div class="wrapper">'
            +             '<textarea type="text" maxlength="300" class="form-text reason" name="remark" placeholder="请输入技能、项目经历或实习经历等其他附加信息" required></textarea>'
            +             '<span class="error"></span>'
            +         '</div>'
            +         '</div>'
            +     '</div>'
            + '</div>'


            +'<div class="dialog-action">附件上传'

            +    '<button class="btn-primary btn-upload btn-upladbg ">'
            +        '选择文件'
            +    '</button>'
            +    '<input class="upfile" type="file"/>'

            +    '<p class="file-tip"></p>'
            +    '<p class="up-tip">可上传不超过5MB的简历文档，或png、jpg图片</p>'
            +'</div>'


            + '<div class="dialog-action">'
            +     '<button class="btn-primary btn-confirm">完成</button>'
            + '</div>'

            + '</div>'
            + '</div>';

            /*
            var componeyDatas = {
                componey: [{
                    id: 'com_1',
                    name: '长春分公司'
                },
                {
                    id: 'com_2',
                    name: '上海分公司'
                },
                {
                    id: 'com_3',
                    name: '南京分公司'
                },
                {
                    id: 'com_4',
                    name: '成都分公司'
                },
                {
                    id: 'com_5',
                    name: '绵阳分公司'
                },
                {
                    id: 'com_6',
                    name: '贵阳分公司'
                },
                {
                    id: 'com_7',
                    name: '重庆分公司'
                },
                {
                    id: 'com_8',
                    name: '广州分公司'
                },
                {
                    id: 'com_9',
                    name: '长沙分公司'
                },
                {
                    id: 'com_10',
                    name: '洛阳分公司'
                },
                {
                    id: 'com_11',
                    name: '合肥分公司'
                },
                {
                    id: 'com_12',
                    name: '芜湖分公司'
                },
                {
                    id: 'com_13',
                    name: '马鞍山分公司'
                },
                {
                    id: 'com_14',
                    name: '南昌分公司'
                },
                {
                    id: 'com_15',
                    name: '厦门分公司'
                },
                {
                    id: 'com_16',
                    name: '深圳分公司'
                },
                {
                    id: 'com_17',
                    name: '武汉分公司'
                },
                {
                    id: 'com_18',
                    name: '石家庄分公司'
                },
                {
                    id: 'com_19',
                    name: '保定分公司'
                },
                {
                    id: 'com_20',
                    name: '宁波分公司'
                },
                {
                    id: 'com_21',
                    name: '西安分公司'
                },
                {
                    id: 'com_22',
                    name: '沈阳分公司'
                },
                {
                    id: 'com_23',
                    name: '咸阳分公司'
                }],
                worktype: [{
                    id: "100",
                    name: "师资类"
                }],
                jobs: [{
                    id: "101",
                    name: "师资拓展专员（分公司职位）"
                },
                {
                    id: "102",
                    name: "师资运营专员（分公司职位）"
                }]
            };
            var cooperativeDatas = {
                cooperatives: [{
                    id: 'coo_1',
                    name: '天津市'
                },
                {
                    id: 'coo_2',
                    name: '吉林省（辽源）'
                },
                {
                    id: 'coo_3',
                    name: '辽宁省（大连）'
                },
                {
                    id: 'coo_4',
                    name: '辽宁省（丹东）'
                },
                {
                    id: 'coo_5',
                    name: '内蒙古（包头）'
                },
                {
                    id: 'coo_6',
                    name: '河北省（唐山）'
                },
                {
                    id: 'coo_7',
                    name: '河北省（沧州）'
                },
                {
                    id: 'coo_8',
                    name: '山西省（太原）'
                },
                {
                    id: 'coo_9',
                    name: '山西省（大同）'
                },
                {
                    id: 'coo_10',
                    name: '山东省（济南）'
                },
                {
                    id: 'coo_11',
                    name: '山东省（东营）'
                },
                {
                    id: 'coo_12',
                    name: '山东省（济宁）'
                },
                {
                    id: 'coo_13',
                    name: '山东省（潍坊）'
                },
                {
                    id: 'coo_14',
                    name: '山东省（烟台）'
                },
                {
                    id: 'coo_15',
                    name: '山东省（临沂）'
                },
                {
                    id: 'coo_16',
                    name: '江苏省（苏州）'
                },
                {
                    id: 'coo_17',
                    name: '江苏省（盐城）'
                },
                {
                    id: 'coo_18',
                    name: '江苏省（无锡）'
                },
                {
                    id: 'coo_19',
                    name: '河南省（郑州）'
                },
                {
                    id: 'coo_20',
                    name: '河南省（商丘）'
                },
                {
                    id: 'coo_21',
                    name: '河南省（开封）'
                },
                {
                    id: 'coo_22',
                    name: '广西省（玉林）'
                },
                {
                    id: 'coo_23',
                    name: '云南省（昆明）'
                }],
                worktype: [{
                    id: "100",
                    name: "代理商职位"
                }],
                jobs: [
                {
                    id: "103",
                    name: "市场专员（代理商职位）"
                },
                {
                    id: "104",
                    name: "平面设计师（代理商职位）"
                }]
            };
             */

            var dialog = new Dialog({
                title: '报名加入跟谁学',
                skinClass: 'consult-dialog',
                content: content,
                width: 730
            });

            var element = dialog.element;

            var fields = {
                education: {
                    errors: {
                        required: '请选择学历'
                    }
                },
                sex: {
                    errors: {
                        required: '请选择性别'
                    }
                },
                name: {
                    errors: {
                        required: '请输您的姓名'
                    }
                },
                mobile: {
                    errors: {
                        required: '请输入联系电话',
                        pattern: '请输入正确的手机号'
                    }
                },
                email: {
                    errors: {
                        required: '请输您的邮箱'
                    }
                },
                workarea: {
                    errors: {
                        required: '请选择工作地址'
                    }
                },
                worktype: {
                    errors: {
                        required: '请选择工作类型'
                    }
                },
                workjob: {
                    errors: {
                        required: '请选择岗位'
                    }
                },
                college_school: {
                    errors: {
                        required: '请输入本科就读院校名称'
                    }
                },
                college_major: {
                    errors: {
                        required: '请输入本科就读专业名称'
                    }
                },
                master_school: {
                    errors: {
                        required: '请输入研究生就读院校名称'
                    }
                },
                master_major: {
                    errors: {
                        required: '请输入研究生就读专业名称'
                    }
                },
                doctor_school: {
                    errors: {
                        required: '请输入博士就读院校名称'
                    }
                },
                doctor_major: {
                    errors: {
                        required: '请输入博士就读专业名称'
                    }
                },
                graduate_date: {
                    errors: {
                        required: '请输入毕业日期'
                    }
                }
            };

            var arealist = this.arealist;
            var type_id = this.type_id;
            var job_id = this.job_id;
            // 工作地址
            var worktypeLock = true;
            var workjobLock = true;
            var workareaSelect = new Select({
                element: element.find('.workarea'),
                name: 'workarea',
                data: arealist,
                onChange: function (e, data) {
                    store.set('add_id',data.value);
                    /*
                    //如果工作地址选择‘其他’
                    if (data.value == 4) {
                        element.find('.allcomponey').show();
                        var componeylist = componeyDatas.componey.concat(cooperativeDatas.cooperatives);
                        componeySelect.refresh({
                            data: convert(componeylist)
                        });
                        componeySelect.setValue(componeylist[0].id);
                        worktypeSelect.refresh({
                            data: convert(componeyDatas.worktype)
                        });
                        worktypeSelect.setValue(componeyDatas.worktype[0].id);
                        workjobSelect.refresh({
                            data: convert(componeyDatas.jobs)
                        });
                        workjobSelect.setValue(componeyDatas.jobs[0].id);
                        return;
                    }
                    */
                    store.set('workareatext', data.text);
                    element.find('.allcomponey').hide();
                    getSubjectList(data.value)
                    .done(function (response) {
                        if (response.code === 0) {
                            worktypeSelect.refresh({
                                data: convert(response.data)
                            });
                            var hasId = false;
                            for (var i = 0, len = response.data.length; i < len; i++) {
                                if (response.data[i].id == type_id) {
                                    hasId = true;
                                    break;
                                }
                            }
                            if (!hasId) {
                                type_id = response.data[0].id;
                            }
                            worktypeSelect.setValue(type_id);
                            /*if (type_id && worktypeLock) {
                                worktypeLock = false;
                                worktypeSelect.setValue(type_id);
                            }*/
                        }
                    });

                }
            });
            /*
            //分公司地址
            var componeySelect = new Select({
                element: element.find('.componeySelect'),
                name: 'componey',
                onChange: function(e, data) {
                    store.set('workareatext', data.text);
                    store.set('otherworktype', data.value);
                    if (data.value.indexOf('com') >= 0) {
                        worktypeSelect.refresh({
                            data: convert(componeyDatas.worktype)
                        });
                        worktypeSelect.setValue(componeyDatas.worktype[0].id);
                        workjobSelect.refresh({
                            data: convert(componeyDatas.jobs)
                        });
                        workjobSelect.setValue(componeyDatas.jobs[0].id);
                    } else {
                        worktypeSelect.refresh({
                            data: convert(cooperativeDatas.worktype)
                        });
                        worktypeSelect.setValue(cooperativeDatas.worktype[0].id);
                        workjobSelect.refresh({
                            data: convert(cooperativeDatas.jobs)
                        });
                        workjobSelect.setValue(cooperativeDatas.jobs[0].id);
                    }
                }
            });
            */

            // 工作类型
            var worktypeSelect = new Select({
                element: element.find('.worktype'),
                name: 'worktype',
                onChange: function (e, data) {
                    store.set('worktypetext', data.text);
                    var otherworktype = store.get('otherworktype');
                    var workarea = store.get('add_id');
                    if (workarea == 4) {
                        return;
                    }
                    getSubjectList(store.get('add_id'), data.value)
                    .done(function (response) {
                        if (response.code === 0) {
                            workjobSelect.refresh({
                                data: convert(response.data)
                            });

                            var hasId = false;
                            for (var i = 0, len = response.data.length; i < len; i++) {
                                if (response.data[i].id == job_id) {
                                    hasId = true;
                                    break;
                                }
                            }
                            if (!hasId) {
                                job_id = response.data[0].id;
                            }
                            workjobSelect.setValue(job_id);
                        }
                    });
                }
            });
            // 岗位选择
            var workjobSelect = new Select({
                element: element.find('.workjob'),
                name: 'workjob',
                onChange: function (e, data) {
                    store.set('workjobtext', data.text);
                }
            });
            workareaSelect.setValue(this.addr_id);


            var educationSelect = new Select({
                element: element.find('.education'),
                name: 'education',
                onChange: function (e, data) {

                    if (data.value == 1) {
                        element.find('.college-school input').prop('placeholder', '请输入院校名称');
                        element.find('.college-major input').prop('placeholder', '请输入专业名称');
                        element.find('.master-school').hide();
                        element.find('.master-major').hide();
                        element.find('.doctor-school').hide();
                        element.find('.doctor-major').hide();

                        fields.master_school = null;
                        fields.master_major = null;
                        fields.doctor_school = null;
                        fields.doctor_major = null;
                        validator = new Validator({
                            realtime: true,
                            element: element,
                            fields: fields
                        });
                    } else if (data.value == 2) {
                        element.find('.college-school input').prop('placeholder', '本科就读院校名称');
                        element.find('.college-major input').prop('placeholder', '本科就读专业名称');
                        element.find('.master-school').show();
                        element.find('.master-major').show();
                        element.find('.doctor-school').hide();
                        element.find('.doctor-major').hide();

                        /*fields.master_school =  {
                            errors: {
                                required: '请输入研究生就读院校名称'
                            }
                        };
                        fields.doctor_school = null;
                        validator = new Validator({
                            realtime: true,
                            element: element,
                            fields: fields
                        });*/
                    } else if (data.value == 3) {
                        element.find('.college-school input').prop('placeholder', '本科就读院校名称');
                        element.find('.college-major input').prop('placeholder', '本科就读专业名称');
                        element.find('.master-school').show();
                        element.find('.master-major').show();
                        element.find('.doctor-school').show();
                        element.find('.doctor-major').show();

                        /*fields.master_school = {
                            errors: {
                                required: '请输入研究生就读院校名称'
                            }
                        };
                        fields.doctor_school = {
                            errors: {
                                required: '请输入博士就读院校名称'
                            }
                        };
                        validator = new Validator({
                            realtime: true,
                            element: element,
                            fields: fields
                        });*/
                    }
                }
            });

            var sexSelect = new Select({
                element: element.find('.sex'),
                name: 'sex'
            });

            validator = new Validator({
                realtime: true,
                element: element,
                fields: fields
            });


            element
            .on('click', '.btn-confirm', function (e) {
                if (validator.validate()) {
                    var formData = form.parse(element);

                    var data = {
                        name: formData.name,
                        sex: formData.sex,
                        jobCity: store.get('workareatext'),
                        jobType: store.get('worktypetext'),
                        jobName: store.get('workjobtext'),
                        affixUrl: store.get('affixurl'),
                        mobile: formData.mobile,
                        email: formData.email,
                        education: formData.education,
                        collegeSchool: element.find('.college-school input').val() + '-' + element.find('.college-major input').val(),
                        masterSchool: element.find('.master-school input').val() + '-' + element.find('.master-major input').val(),
                        doctorSchool: element.find('.doctor-school input').val() + '-' + element.find('.doctor-major input').val(),
                        gruduateDate: formData.graduate_date,
                        remark: formData.remark
                    };

                    service
                    .applyJob(
                        data
                    )
                    .done(function (response) {
                        if (response.code === 0) {
                            dialog.hide();
                            alert('提交成功！');
                        }
                    });
                }

            })
            .on('mouseover', '.upfile', function(e) {
                element.find('.btn-upload').toggleClass('btn-upladbg');
            })
            .on('mouseout', '.upfile', function(e) {
                element.find('.btn-upload').toggleClass('btn-upladbg');
            });
            var ele = element.find('.upfile');
            var accept = ['png','jpg','doc','docx'];
            var maxSize = 5;
            var M_SIZE = 1024 * 1024;
            var btnBrowse = element.find('.btn-upload');
            //设置affix_url参数默认为空
            store.set('affixurl','');
            var uploader = new Uploader({
                element: ele,
                action: '/guide/upload',
                accept: accept,
                onFileChange: function () {
                    var fileItem = this.getFiles()[0];
                    if (fileItem) {
                        var file = fileItem.file;
                        var index = $.inArray(file.type, this.accept);
                        if (index === -1) {
                            alert('文件格式错误，请上传 ' + accept.join('、') + ' 等格式的文件');
                            return;
                        }

                        if (maxSize && file.size / M_SIZE > maxSize) {
                            alert('请不要上传超过 ' + maxSize + 'M 的文件');
                            return;
                        }
                    }
                    this.upload();
                },
                onUploadStart: function () {
                    btnBrowse.prop('disabled', true);
                },
                onUploadSuccess: function (e, data) {
                    if (data.responseText) {
                        var response = $.parseJSON(data.responseText);
                        if (response.code === 0) {
                            var url = response.data.url;
                            element.find('.btn-upload').html('上传成功');
                            element.find('.file-tip').html(response.data.name);
                            store.set('affixurl',url);
                        } else {
                            element.find('.file-tip').html(response.msg);
                        }
                    }

                },
                onUploadComplete: function () {
                    btnBrowse.prop('disabled', false);
                }
            });

        }

    }

    return OfferDialog;

});