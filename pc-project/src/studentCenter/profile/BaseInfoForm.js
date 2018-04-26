/**
 * @file 基本信息表单
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var form = require('common/form');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var store = require('common/store');

    var DateSelect = require('common/component/DateSelect');
    // var ImageUploader = require('common/component/ImageUploader');
    var Select = require('cobble/form/Select');
    var Text = require('cobble/form/Text');
    var Editor = require('common/component/Editor');
    var compressImage = require('common/function/compressImage');
    var Validator = require('cobble/form/Validator');
    var AvatarCropDialog = require('common/component/AvatarCropDialog');
    var MoreSubjectForm = require('common/component/MoreSubjectForm'); // 感兴趣课程
    var baiduMap = require('common/map/baidu');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {string} options.realname 真实姓名
     * @property {string} options.nickname 昵称
     * @property {string} options.sex 性别
     * @property {string} options.birthday 生日
     * @property {string} options.year 出生年
     * @property {string} options.month 出生月
     * @property {string} options.date 出生日
     * @property {string} options.private_domain 域名
     * @property {string} options.short_introduce 简介
     * @property {string} options.address 所在地
     * @property {string} options.address.lat 经纬度
     * @property {string} options.address.lng 经纬度
     * @property {string} options.address.regular_address.province 省
     * @property {string} options.address.regular_address.city 市
     * @property {string} options.address.regular_address.area 区
     * @property {string} options.address.regular_address.location_addr 常住地具体位置
     * @property {string} options.subjects 感兴趣科目
     *
     */
    function BaseInfoForm(options) {
        $.extend(this, options);
        this.init();
    }

    BaseInfoForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var data = me.data;
            if (!data) {
                data = me.data = { };
            }

            // 使用头像裁剪，不需要 file 元素
            element.find('.image-browse :file').remove();

            // 简介
            me.editor = new Editor({
                element: element.find('.introduce .form-editor'),
                maxLength: 20
            });

            // 年月日数据
            var birthday = data.birthday;
            var year;
            var month;
            var date;

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

            // 感兴趣课程
            me.moreSubjectForm = new MoreSubjectForm({
                element: element.find('.form-subjects')
            });

            // 验证对象
            me.validator = new Validator({
                element: element,
                realtime: true,
                fields: {
                    realname: {
                        errors: {
                            minlength: '请将字数控制在2-30个字以内',
                            maxlength: '请将字数控制在2-30个字以内',
                            pattern: '支持中文、字母、空格和点号（大小点）'
                        }
                    },
                    introduce: {
                        rules: {
                            maxlength: 20
                        },
                        errors: {
                            maxlength: '请将字数控制在 20 字以内'
                        }
                    }
                }
            });

            element
            .on('click', '.image-browse', function (e) { // 上传头像

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
                                    preview.find('img').remove();
                                    preview.append(
                                      '<img src="'
                                    + compressImage({
                                        url: data.url,
                                        width: 150,
                                        height: 150
                                    })
                                    +'" />'
                                    );

                                }

                            });

                        }
                    }
                });

            })

            .on('change', ':radio', function (e) {

                if (data.has_avatar == false) {

                    var radio = $(e.currentTarget);

                    var value = radio.prop('value');
                    var url; // 头像链接

                    if (value == 1) { // 男1
                        url = data.default_avatars.male;
                    }
                    else { // 女0
                        url = data.default_avatars.female;
                    }

                    var img = '<img src="'
                            + compressImage({
                                url: url,
                                width: 150,
                                height: 150
                              })
                            + '" />';
                    element.find('.image-preview img').remove();
                    element.find('.image-preview').append(img);

                }

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
            });

            // 保存整个基本信息表单
            var baseinfoSubmit = function (data) {
                return service
                .editStudentBaseInfo(
                    {
                        realname: data.realname,
                        nickname: data.nickname,
                        sex: data.sex,
                        birthday: data.birthday,
                        introduce: data.introduce,
                        areaId: data.finalLoc,
                        address: data.location_addr,
                        lng: data.lng,
                        lat: data.lat,
                        subjects: data.subTags
                    },
                    {
                        errorHandler: {
                            '100061': function (response) { // 敏感词过滤

                                var map = {
                                    'nickname': '昵称',
                                    'short_introduce': '简介'
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

                    var isSuccess = response.code === 0;

                    element.trigger(
                        'save',
                        {
                            isSuccess: isSuccess
                        }
                    );

                    return response;

                });
            };

            // 保存表单前优先保存用户当前位置
            var checkAddrOK = false;
            // 保存表单
            new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    var data = form.parse(element);

                    var year = data.year;
                    var month = data.month;
                    var date = data.date;

                    var province = data.province;
                    var city = data.city;
                    var area = data.area;
                    var country = data.country;
                    // var finalLoc; 用户可以不选择最终级
                    if (country) {
                        data.finalLoc = country;
                    }
                    else if (area) {
                        data.finalLoc = area;
                    }
                    else if (city) {
                        data.finalLoc = city;
                    }
                    else if (province) {
                        data.finalLoc = province;
                    }

                    // 感兴趣课程
                    data.subTags = me.moreSubjectForm.getValue();
                    // 拼合生日
                    data.birthday = year + '-' + month + '-' + date;

                    if (me.validator.validate()) {

                        // 保证地图已出现
                        if (!element.find('#map').is(':visible')) {
                            alert({
                                title: '温馨提示',
                                width: 300,
                                content: '填写详细地址后请点击“地图定位”标注你的位置吧~',
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
                            return false;
                        }

                        // 优先保存位置
                        var mapBtns = element.find('.map-oper');
                        if (checkAddrOK) {
                            if (baiduMap.getConfidence() < 80) {
                                confirm({
                                    content: '你提供的地址不够准确，将可能影响到你的搜索排序，是否仍然强行保存？',
                                    title: '温馨提示',
                                    width: 335
                                })
                                .done(function () {
                                    baseinfoSubmit(data);
                                });
                            }
                            else {
                                baseinfoSubmit(data);
                            }
                        }
                        else {

                            var bdAreaName = element.find('input[name="bd_area_name"]').val();
                            var cityId = element.find('input[name="city"]').val();
                            var areaId = element.find('input[name="area"]').val();
                            var userAreaName = element.find('.area span').text();

                            if (!cityId || !areaId) {
                                alert('请选择你的所在地');
                                return;
                            }

                            if (!data.location_addr) {
                                alert('请提供你的地址信息');
                                return;
                            }

                            // 保存位置
                            return service
                            .checkAddress({
                                cityId: cityId,
                                areaName: bdAreaName
                            })
                            .done(function (response) {
                                if (response.code === 0) {

                                    checkAddrOK = true;
                                    mapBtns.hide();

                                    // element.find('.map-oper').hide();
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
                                                            store.get('addressForm').setAreaChangeSrc('saveAddr'); // 牵涉区变动地图刷新与否
                                                            store.get('addressForm').regionSelect.areaSelect.setValue(response.data.match_area.id);
                                                            this.hide();
                                                            // 保存表单
                                                            data.finalLoc = $('input[name="area"]').val(); // 重新解析区
                                                            baseinfoSubmit(data);
                                                        }
                                                    },
                                                    {
                                                        text: '不修改',
                                                        handler: function () {
                                                            this.hide();
                                                            // 保存表单
                                                            baseinfoSubmit(data);
                                                        }
                                                    }
                                                ]
                                            });
                                        }
                                        else {
                                            baseinfoSubmit(data);
                                        }

                                    }

                                }
                            });
                        }
                    }
                }
            });

            me.realnameInput = new Text({
                element: element.find('[name="realname"]')
            });

            me.nicknameInput = new Text({
                element: element.find('[name="nickname"]')
            });

            /*me.domainInput = new Text({
                element: element.find('[name="domain"]')
            });*/

            me.introduceInput = new Text({
                element: element.find('[name="introduce"]')
            });

            me.refresh();

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
            else {
                sex = 1;
                // 默认是男性
                sexRadio = maleRadio;
            }
            sexRadio.click();

            var avatar = data.has_avatar
                       ? data.avatar
                       : sex == 0
                         ? data.default_avatars.female
                         : data.default_avatars.male;

            var img = '<img src="'
                    + compressImage({
                        url: avatar,
                        width: 150,
                        height: 150
                      })
                    + '" />';
            element.find('.image-preview img').remove();
            element.find('.image-preview').append(img);

            // 生日
            me.dateSelect.refresh();

            // 真实姓名
            me.realnameInput.setValue(
                data.realname || ''
            );

            // 昵称
            me.nicknameInput.setValue(
                data.nickname || ''
            );

            // 一句话简介
            me.introduceInput.setValue(
                data.short_introduce || ''
            );

            /*/ 域名
            me.domainInput.setValue(
                data.private_domain || ''
            );*/

            /*/ 域名
            var domainInput = element.find('[name="domain"]');
            domainInput.val(
                data.private_domain || data.uid
            );*/
            /*if (data.private_domain) { // 但凡有值，则不可再编辑
                domainInput.prop('disabled', !!data.private_domain);
            }*/

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